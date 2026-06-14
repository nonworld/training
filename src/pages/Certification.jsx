// Certification. Every module in the track must be complete, then the guest
// sits the final role-specific exam. Passing earns the badge (NON Certified
// Sommelier / NON Rep Accreditation) and unlocks the on-shift quick reference.
import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import QuizRunner from '../components/QuizRunner.jsx'
import TranslateBanner from '../components/TranslateBanner.jsx'
import { useStore } from '../state/store.jsx'
import { getCertification, getModule } from '../content/registry.js'

export default function Certification() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { state, isModuleComplete, recordQuiz, earnCertification, hasCertification } = useStore()
  const [examMode, setExamMode] = useState(false)

  if (!state.role) return <Navigate to="/" replace />

  const role = state.role
  const cert = getCertification(state.lang, role)
  const earned = hasCertification(role)
  const record = state.certs[role]
  const requirementsMet = cert.requires.every((id) => isModuleComplete(id))

  // Final exam in progress.
  if (examMode && !earned) {
    const onScore = (score, passed) => {
      recordQuiz(cert.exam.id, score, cert.exam.threshold)
      if (passed) earnCertification(role)
    }
    const actions = ({ passed }, retake) =>
      passed ? (
        <button className="btn" onClick={() => setExamMode(false)}>
          {t('cert.unlocked')}
        </button>
      ) : (
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

      {earned ? (
        <button className="btn" onClick={() => navigate('/reference')}>
          {t('nav.reference')}
        </button>
      ) : requirementsMet ? (
        <>
          <h2>{t('cert.readyTitle')}</h2>
          <p>{t('cert.readyBody')}</p>
          <button className="btn" onClick={() => setExamMode(true)}>
            {t('cert.startExam')}
          </button>
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
