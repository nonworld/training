// Email capture at the first point of real value: claiming the certificate.
// Framed as a benefit (save it, get on the leaderboard), not a gate. Captures
// email, name, market and venue, with explicit consent that progress is shared
// with the learner's manager. On submit it writes the profile, which triggers
// the backend sync (store.jsx). No personal data ever goes in a URL.
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useStore } from '../state/store.jsx'

export default function SignupForm({ onDone }) {
  const { t } = useTranslation()
  const { state, setProfile } = useStore()
  const [name, setName] = useState(state.profile?.name || '')
  const [email, setEmail] = useState(state.profile?.email || '')
  const [market, setMarket] = useState(state.profile?.market || '')
  const [venue, setVenue] = useState(state.profile?.venue || '')
  const [consent, setConsent] = useState(false)
  const [touched, setTouched] = useState(false)

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  const canSubmit = name.trim() && emailOk && consent

  const submit = () => {
    setTouched(true)
    if (!canSubmit) return
    setProfile({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: state.role,
      market: market.trim(),
      venue: venue.trim(),
      consent: true,
    })
    onDone?.()
  }

  return (
    <>
      <p className="eyebrow">{t('signup.eyebrow')}</p>
      <h1>{t('signup.title')}</h1>
      <p className="lede">{t('signup.intro')}</p>

      <div className="form-stack">
        <label className="field-label" htmlFor="su-name">{t('signup.name')}</label>
        <input id="su-name" className="field" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} />

        <label className="field-label" htmlFor="su-email">{t('signup.email')}</label>
        <input
          id="su-email"
          className="field"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={120}
        />
        <p className="evidence-note" style={{ margin: '2px 0 0' }}>{t('signup.emailHint')}</p>
        {touched && !emailOk && <p className="field-error">{t('signup.emailError')}</p>}

        <label className="field-label" htmlFor="su-venue">{t('signup.venue')}</label>
        <input id="su-venue" className="field" value={venue} onChange={(e) => setVenue(e.target.value)} maxLength={80} />

        <label className="field-label" htmlFor="su-market">{t('signup.market')}</label>
        <input id="su-market" className="field" value={market} onChange={(e) => setMarket(e.target.value)} maxLength={60} />

        <label className="attest" style={{ marginTop: 6 }}>
          <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span style={{ fontWeight: 400, fontSize: 14 }}>{t('signup.consent')}</span>
        </label>
        {touched && !consent && <p className="field-error">{t('signup.consentError')}</p>}
      </div>

      <button className="btn" style={{ marginTop: 18 }} disabled={!canSubmit} onClick={submit}>
        {t('signup.cta')}
      </button>
      <p className="muted" style={{ fontSize: 12, marginTop: 12 }}>{t('signup.privacy')}</p>
    </>
  )
}
