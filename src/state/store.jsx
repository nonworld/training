// Progress + gamification store. Client-side first: everything autosaves to
// localStorage and resumes on next visit. The same state can later sync to a
// Worker + KV/D1 (see syncCertification / event sync) without changing this API.
//
// The selected language lives here too, so it holds across sessions and across
// both tracks and the quick-reference mode.
import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'

import { DEFAULT_LANG, LANGUAGES } from '../i18n/languages.js'
import { XP, levelInfo, advanceStreak, today } from './gamification.js'

const KEY = 'non-academy:v1'

const EMPTY = {
  version: 2,
  role: null, // 'rep' | 'venue'
  lang: DEFAULT_LANG,
  segments: {}, // { [moduleId]: { [segmentId]: true } }
  modulesComplete: {}, // { [moduleId]: true }
  quizzes: {}, // { [quizId]: { best, passed, lastScore } }
  certs: {}, // { venue|rep: { earned: true, date } }
  lastLocation: null, // route string for Resume

  // gamification
  xp: 0,
  badges: {}, // { [id]: { date } } — module badges + certification badges
  streak: { current: 0, longest: 0, lastActive: null },
  awarded: {}, // dedupe ledger: { [key]: true } so XP is never double-counted
  flashcards: {}, // { [cardId]: { box, lastSeen } } — simple spaced repetition
  soundMuted: false,

  // data capture (populated later, at first point of real value)
  profile: null, // { name, email, role, market, venue }
  events: [], // local funnel log: { type, ts, meta } — synced in a later phase

  updatedAt: null,
}

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { ...EMPTY }
    const parsed = JSON.parse(raw)
    return { ...EMPTY, ...parsed } // forward-compatible merge
  } catch {
    return { ...EMPTY }
  }
}

const StoreCtx = createContext(null)

export function StoreProvider({ children }) {
  const [state, setState] = useState(load)

  // Autosave on every change.
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ ...state, updatedAt: Date.now() }))
    } catch {
      // storage unavailable (private mode); app still works in-memory.
    }
  }, [state])

  // Advance the streak once per mount (a return visit).
  const streakTouched = useRef(false)
  useEffect(() => {
    if (streakTouched.current) return
    streakTouched.current = true
    setState((s) => ({ ...s, streak: advanceStreak(s.streak) }))
  }, [])

  const api = useMemo(() => {
    const update = (patch) => setState((s) => ({ ...s, ...patch }))

    // Append a funnel event. Local for now; flushed to the Worker later.
    const logEvent = (s, type, meta) => ({
      ...s,
      events: [...s.events, { type, ts: new Date().toISOString(), meta: meta || null }],
    })

    // Award XP once per dedupe key. Returns gained amount via the awarded ledger.
    const awardXp = (s, key, amount) => {
      if (s.awarded[key]) return s
      return { ...s, xp: s.xp + amount, awarded: { ...s.awarded, [key]: true } }
    }

    return {
      state,
      level: levelInfo(state.xp),

      // ---- identity / settings ----
      setRole: (role) => update({ role }),
      setLang: (lang) => {
        if (LANGUAGES.some((l) => l.code === lang)) update({ lang })
      },
      setLastLocation: (path) => update({ lastLocation: path }),
      toggleSound: () => setState((s) => ({ ...s, soundMuted: !s.soundMuted })),
      setProfile: (profile) =>
        setState((s) => logEvent({ ...s, profile }, 'signup', { role: profile?.role })),

      // ---- segments ----
      completeSegment: (moduleId, segmentId) =>
        setState((s) => {
          const mod = { ...(s.segments[moduleId] || {}), [segmentId]: true }
          let next = { ...s, segments: { ...s.segments, [moduleId]: mod } }
          next = awardXp(next, `seg:${moduleId}/${segmentId}`, XP.SEGMENT)
          return next
        }),
      isSegmentDone: (moduleId, segmentId) => Boolean(state.segments[moduleId]?.[segmentId]),
      segmentsDone: (moduleId) =>
        Object.values(state.segments[moduleId] || {}).filter(Boolean).length,

      // ---- quizzes ----
      // Awards XP per first-time-correct question; deduped by question key.
      awardQuizCorrect: (quizId, questionId) =>
        setState((s) => awardXp(s, `q:${quizId}/${questionId}`, XP.QUIZ_CORRECT)),
      recordQuiz: (quizId, score, threshold) =>
        setState((s) => {
          const prev = s.quizzes[quizId] || { best: 0, passed: false }
          const best = Math.max(prev.best, score)
          const passed = prev.passed || score >= threshold
          return {
            ...logEvent(s, 'quiz_score', { quizId, score }),
            quizzes: { ...s.quizzes, [quizId]: { best, passed, lastScore: score } },
          }
        }),
      quiz: (quizId) => state.quizzes[quizId] || null,
      recordPreCheck: (moduleId) =>
        setState((s) => awardXp(s, `precheck:${moduleId}`, XP.PRECHECK)),

      // ---- flashcards (simple Leitner-style spaced repetition) ----
      gradeFlashcard: (cardId, got) =>
        setState((s) => {
          const prev = s.flashcards[cardId] || { box: 0, lastSeen: null }
          const box = got ? Math.min(prev.box + 1, 4) : 0
          let next = {
            ...s,
            flashcards: { ...s.flashcards, [cardId]: { box, lastSeen: today() } },
          }
          if (got) next = awardXp(next, `card:${cardId}`, XP.FLASHCARD)
          return next
        }),

      // ---- module completion with rewards ----
      // Idempotent. Returns the celebration payload (xp gained, badge, level-up)
      // computed from the current state, then commits the state update.
      completeModuleWithRewards: (moduleId, badge) => {
        const already = state.modulesComplete[moduleId]
        const beforeLevel = levelInfo(state.xp).level
        const willAward = !already && !state.awarded[`mod:${moduleId}`]
        const xpGained = willAward ? XP.MODULE : 0
        const after = levelInfo(state.xp + xpGained)
        const payload = {
          xpGained,
          newBadge: willAward,
          leveledUp: after.level > beforeLevel,
          levelName: after.name,
          badge,
        }
        setState((s) => {
          let next = { ...s, modulesComplete: { ...s.modulesComplete, [moduleId]: true } }
          if (!s.awarded[`mod:${moduleId}`]) {
            next = awardXp(next, `mod:${moduleId}`, XP.MODULE)
            next = { ...next, badges: { ...next.badges, [badge.id]: { date: today() } } }
            next = logEvent(next, 'module_completed', { moduleId })
          }
          return next
        })
        return payload
      },
      isModuleComplete: (moduleId) => Boolean(state.modulesComplete[moduleId]),
      hasBadge: (id) => Boolean(state.badges[id]),

      // ---- certification ----
      earnCertification: (role, certBadge) =>
        setState((s) => {
          if (s.certs[role]?.earned) return s
          const date = today()
          syncCertification(role, date)
          let next = {
            ...s,
            certs: { ...s.certs, [role]: { earned: true, date } },
            badges: { ...s.badges, [certBadge?.id || `cert-${role}`]: { date } },
          }
          next = awardXp(next, `cert:${role}`, XP.CERT)
          next = logEvent(next, 'certified', { role })
          return next
        }),
      hasCertification: (role) => Boolean(state.certs[role]?.earned),

      // ---- diagnostics ----
      completionPct: (totalModules) =>
        totalModules
          ? Math.round(
              (Object.values(state.modulesComplete).filter(Boolean).length / totalModules) * 100,
            )
          : 0,

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

// Optional persistence to a Cloudflare Worker + KV. No-op (501) until the
// endpoint is configured. Failures are swallowed so offline use never blocks.
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
