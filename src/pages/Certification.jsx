// Certification. Eligibility comes from the required modules being complete.
// Passing earns the role badge: NON Certified Sommelier (venue) or NON
// Accreditation (rep), which unlocks the on-shift quick-reference cards.
import { Navigate, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import TranslateBanner from '../components/TranslateBanner.jsx'
import { useStore } from '../state/store.jsx'
import { getCertification } from '../content/registry.js'

export default function Certification() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { state, isModuleComplete, earnCertification, hasCertification } = useStore()

  if (!state.role) return <Navigate to="/" replace />

  const role = state.role
  const cert = getCertification(state.lang, role)
  const earned = hasCertification(role)
  const record = state.certs[role]

  const requirementsMet = cert.requires.every((id) => isModuleComplete(id))

  return (
    <>
      <p className="eyebrow">{t('home.certification')}</p>
      <h1>{cert.title}</h1>
      <p className="lede">{cert.intro}</p>
      <TranslateBanner />

      <div className={`badge ${earned ? 'earned' : ''}`}>
        <div className="badge-mark">NON</div>
        <p className="badge-title">{cert.title}</p>
        <p className="badge-state">
          {earned ? t('cert.earnedOn', { date: record?.date }) : t('cert.locked')}
        </p>
      </div>

      {!earned && (
        <>
          <h2 style={{ marginTop: 8 }}>Requirements</h2>
          <ul className="objectives">
            {cert.requires.map((id) => (
              <li key={id} className={isModuleComplete(id) ? 'met' : ''}>
                {isModuleComplete(id) ? '✓ ' : ''}Pass the module quiz: {id}
              </li>
            ))}
          </ul>

          <button
            className="btn"
            style={{ marginTop: 16 }}
            disabled={!requirementsMet}
            onClick={() => earnCertification(role)}
          >
            {requirementsMet ? 'Claim certification' : t('home.locked')}
          </button>
        </>
      )}

      {earned && (
        <button className="btn" style={{ marginTop: 8 }} onClick={() => navigate('/reference')}>
          {t('nav.reference')}
        </button>
      )}
    </>
  )
}
