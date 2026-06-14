// Progress store. Client-side first: everything autosaves to localStorage and
// resumes on next visit. Certification records can later sync to a Worker + KV
// (see syncCertification stub) without changing this API.
//
// The selected language lives in this same state, so it holds across sessions
// and across both tracks and the quick-reference mode.
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'

import { DEFAULT_LANG, LANGUAGES } from '../i18n/languages.js'

const KEY = 'non-academy:v1'

const EMPTY = {
  version: 1,
  role: null, // 'rep' | 'venue'
  lang: DEFAULT_LANG,
  segments: {}, // { [moduleId]: { [segmentId]: true } }
  modulesComplete: {}, // { [moduleId]: true }
  quizzes: {}, // { [quizId]: { best, passed, lastScore } }
  certs: {}, // { venue|rep: { earned: true, date } }
  lastLocation: null, // route string for Resume
  updatedAt: null,
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...EMPTY }
    const parsed = JSON.parse(raw)
    // forward-compatible merge
    return { ...EMPTY, ...parsed }
  } catch {
    return { ...EMPTY }
  }
}

const StoreCtx = createContext(null)

export function StoreProvider({ children }) {
  const [state, setState] = useState(load)
  const firstRun = useRef(true)

  // Autosave on every change (debounced via microtask batching of setState).
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false
    }
    try {
      localStorage.setItem(KEY, JSON.stringify({ ...state, updatedAt: Date.now() }))
    } catch {
      // storage may be unavailable (private mode); the app still works in-memory.
    }
  }, [state])

  const api = useMemo(() => {
    const update = (patch) => setState((s) => ({ ...s, ...patch }))

    return {
      state,

      setRole: (role) => update({ role }),

      setLang: (lang) => {
        if (LANGUAGES.some((l) => l.code === lang)) update({ lang })
      },

      setLastLocation: (path) => update({ lastLocation: path }),

      completeSegment: (moduleId, segmentId) =>
        setState((s) => {
          const mod = { ...(s.segments[moduleId] || {}), [segmentId]: true }
          return { ...s, segments: { ...s.segments, [moduleId]: mod } }
        }),

      isSegmentDone: (moduleId, segmentId) =>
        Boolean(state.segments[moduleId]?.[segmentId]),

      segmentsDone: (moduleId) =>
        Object.values(state.segments[moduleId] || {}).filter(Boolean).length,

      completeModule: (moduleId) =>
        setState((s) => ({
          ...s,
          modulesComplete: { ...s.modulesComplete, [moduleId]: true },
        })),

      isModuleComplete: (moduleId) => Boolean(state.modulesComplete[moduleId]),

      recordQuiz: (quizId, score, threshold) =>
        setState((s) => {
          const prev = s.quizzes[quizId] || { best: 0, passed: false }
          const best = Math.max(prev.best, score)
          const passed = prev.passed || score >= threshold
          return {
            ...s,
            quizzes: { ...s.quizzes, [quizId]: { best, passed, lastScore: score } },
          }
        }),

      quiz: (quizId) => state.quizzes[quizId] || null,

      earnCertification: (role) =>
        setState((s) => {
          if (s.certs[role]?.earned) return s
          const date = new Date().toISOString().slice(0, 10)
          // fire-and-forget sync; never blocks the UI
          syncCertification(role, date)
          return { ...s, certs: { ...s.certs, [role]: { earned: true, date } } }
        }),

      hasCertification: (role) => Boolean(state.certs[role]?.earned),

      reset: () => setState({ ...EMPTY }),
    }
  }, [state])

  return <StoreCtx.Provider value={api}>{children}</StoreCtx.Provider>
}

export function useStore() {
  const ctx = useContext(StoreCtx)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}

// Optional persistence to a Cloudflare Worker + KV. No-op until the endpoint
// exists (see functions/api/cert.js and wrangler.toml). Failures are swallowed
// so offline / on-shift use is never blocked.
async function syncCertification(role, date) {
  try {
    await fetch('/api/cert', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ role, date }),
    })
  } catch {
    // offline or endpoint not deployed yet; local record stands.
  }
}
