// Certification. Every module in the track must be complete, then the final
// role exam. Passing earns the badge (NON Certified Sommelier / NON Rep
// Accreditation), awards XP, celebrates, and reveals the shareable card, which
// also unlocks the on-shift quick reference.
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import QuizRunner from '../components/QuizRunner.jsx'
import CertCard from '../components/CertCard.jsx'
import TranslateBanner from '../components/TranslateBanner.jsx'
import { useStore } from '../state/store.jsx'
import { XP, levelInfo } from '../state/gamification.js'
import { BadgeGlyph } from '../state/badges.jsx'
import { getCertification, getModule } from '../content/registry.js'

export default function Certification() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { state, isModuleComplete, recordQuiz, earnCertification, hasCertification } = useStore()
  const [examMode, setExamMode] = useState(false)

  if (!state.role) return <Navigate to="/" replace />

  const role = state.role
  const cert = getCertification(state.lang, role)
  const certBadgeId = `cert-${role}`
  const earned = hasCertification(role)
  const record = state.certs[role]
  const requirementsMet = cert.requires.every((id) => isModuleComplete(id))

  // Final exam in progress.
  if (examMode && !earned) {
    const onScore = (score, passed) => {
      recordQuiz(cert.exam.id, score, cert.exam.threshold)
      if (passed) {
        const beforeLevel = levelInfo(state.xp).level
        const after = levelInfo(state.xp + XP.CERT)
        earnCertification(role, { id: `cert-${role}` })
        navigate('/celebrate', {
          state: {
            kind: 'cert',
            title: cert.title,
            badgeTitle: cert.title,
            badgeId: certBadgeId,
            xpGained: XP.CERT,
            leveledUp: after.level > beforeLevel,
            levelName: after.name,
          },
          replace: true,
        })
      }
    }
    const actions = (_r, retake) => (
      <>
        <button className="btn" onClick={retake}>{t('cert.retakeExam')}</button>
        <button className="btn ghost" onClick={() => setExamMode(false)}>
          {t('quiz.backToModule')}
        </button>
      </>
    )
    return (
      <>
        <p className="eyebrow">{cert.title} · {t('cert.examTitle')}</p>
        <QuizRunner quiz={cert.exam} onScore={onScore} renderResultActions={actions} />
      </>
    )
  }

  // Earned: badge + shareable card + quick reference.
  if (earned) {
    return (
      <>
        <p className="eyebrow">{t('home.certification')}</p>
        <h1>{cert.title}</h1>
        <p className="lede">{t('cert.earnedLede')}</p>

        <CertCard badgeTitle={cert.title} date={record?.date} />

        <div className="incentive">
          <p className="eyebrow" style={{ margin: '0 0 6px' }}>{t('cert.rewardTitle')}</p>
          {/* PLACEHOLDER incentive: set the real reward in content (see PLACEHOLDERS.md). */}
          <p style={{ margin: 0 }}>
            {t('cert.rewardBody')} <span className="draft">Set reward</span>
          </p>
        </div>

        <button className="btn ghost" style={{ marginTop: 18 }} onClick={() => navigate('/reference')}>
          {t('nav.reference')}
        </button>
      </>
    )
  }

  // Not yet earned.
  return (
    <>
      <p className="eyebrow">{t('home.certification')}</p>
      <h1>{cert.title}</h1>
      <p className="lede">{cert.intro}</p>
      <TranslateBanner />

      <div className="badge">
        <div className="badge-mark"><BadgeGlyph id={certBadgeId} size={36} /></div>
        <p className="badge-title">{cert.title}</p>
        <p className="badge-state">{t('cert.locked')}</p>
      </div>

      {requirementsMet ? (
        <>
          <h2>{t('cert.readyTitle')}</h2>
          <p>{t('cert.readyBody')}</p>
          <button className="btn" onClick={() => setExamMode(true)}>{t('cert.startExam')}</button>
        </>
      ) : (
        <>
          <h2>{t('cert.requirements')}</h2>
          <ul className="objectives">
            {cert.requires.map((id) => {
              const m = getModule(state.lang, id)
              const done = isModuleComplete(id)
              return (
                <li key={id} className={done ? 'met' : ''}>
                  {done ? '✓ ' : ''}
                  {t('cert.requirementModule', { title: m ? m.title : id })}
                </li>
              )
            })}
          </ul>
        </>
      )}
    </>
  )
}
