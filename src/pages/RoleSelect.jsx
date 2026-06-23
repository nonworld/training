// Onboarding in three taps: role, language, go. Previews what each track gives
// before selecting, then drops the user straight in. No app explainer, no
// signup. The first screen should make them feel it, not read about it.
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Logotype from '../components/Logotype.jsx'
import TranslateBanner from '../components/TranslateBanner.jsx'
import { LANGUAGES } from '../i18n/languages.js'
import { useStore } from '../state/store.jsx'

export default function RoleSelect() {
  const navigate = useNavigate()
  const { t, i18n } = useTranslation()
  const { state, setRole, setLang } = useStore()
  const [role, setSelRole] = useState(null)

  const start = () => {
    if (!role) return
    setRole(role)
    navigate('/home')
  }

  const chooseLang = (code) => {
    setLang(code)
    i18n.changeLanguage(code)
  }

  const tracks = [
    { id: 'venue', label: t('role.venue'), blurb: t('role.venueBlurb'), gives: t('role.venueGives', { returnObjects: true }) },
    { id: 'rep', label: t('role.rep'), blurb: t('role.repBlurb'), gives: t('role.repGives', { returnObjects: true }) },
  ]

  return (
    <div className="shell">
      <header className="appbar">
        <Logotype height={18} />
      </header>
      <main className="page">
        <p className="eyebrow">{t('app.name')}</p>
        <h1>{t('role.title')}</h1>
        <TranslateBanner />

        {/* Tap 1: role, with a preview of what the track gives. */}
        <div className="stack" style={{ marginTop: 8 }}>
          {tracks.map((tr) => (
            <button
              key={tr.id}
              className={`card role-card ${role === tr.id ? 'selected' : ''}`}
              onClick={() => setSelRole(tr.id)}
              aria-pressed={role === tr.id}
            >
              <div className="card-row">
                <h2 style={{ margin: 0 }}>{tr.label}</h2>
                <span className="card-chev">{role === tr.id ? '✓' : '›'}</span>
              </div>
              <p style={{ margin: '8px 0 0' }}>{tr.blurb}</p>
              {Array.isArray(tr.gives) && (
                <ul className="give-list">
                  {tr.gives.map((g, i) => <li key={i}>{g}</li>)}
                </ul>
              )}
            </button>
          ))}
        </div>

        {/* Tap 2: language. */}
        <p className="eyebrow" style={{ marginTop: 22 }}>{t('nav.language')}</p>
        <div className="lang-chips">
          {LANGUAGES.map((l) => (
            <button
              key={l.code}
              className={`lang-chip ${state.lang === l.code ? 'active' : ''}`}
              onClick={() => chooseLang(l.code)}
            >
              <span aria-hidden="true" className="lang-flag">{l.flag}</span>
              {l.label}
              {!l.translated && <span className="lang-chip-flag" aria-hidden="true">·</span>}
            </button>
          ))}
        </div>

        {/* Tap 3: go. */}
        <button className="btn" style={{ marginTop: 24 }} disabled={!role} onClick={start}>
          {role ? t('role.continueAs', { role: role === 'venue' ? t('role.venue') : t('role.rep') }) : t('role.pickToStart')}
        </button>
      </main>
    </div>
  )
}
