// Module overview: an optional pre-check, observable objectives, the 5-minute
// segments, a flashcard practice entry, the practical task, and the knowledge
// check. The pre-check lets confident staff prove they know the basics and skip
// ahead, and makes the content feel relevant to everyone else.
import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import QuizRunner from '../components/QuizRunner.jsx'
import { useStore } from '../state/store.jsx'
import { getModule } from '../content/registry.js'

export default function Module() {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { state, isSegmentDone, quiz, recordPreCheck } = useStore()
  const [precheck, setPrecheck] = useState(false)

  const mod = getModule(state.lang, moduleId)
  if (!mod || mod.status !== 'ready') return <Navigate to="/home" replace />

  const q = quiz(mod.quiz.id)
  const hasFlashcards = mod.id === 'product-mastery'

  // Inline pre-check.
  if (precheck && mod.preCheck) {
    const pc = { id: mod.preCheck.id, threshold: mod.preCheck.passToSkip, questions: mod.preCheck.questions }
    const onScore = () => recordPreCheck(mod.id)
    const actions = ({ passed }, retake) => (
      <>
        {passed ? (
          <button className="btn" onClick={() => navigate(`/quiz/${mod.id}`)}>
            {t('module.skipToQuiz')}
          </button>
        ) : (
          <button className="btn" onClick={() => setPrecheck(false)}>{t('module.startLearning')}</button>
        )}
        <button className="btn ghost" onClick={() => setPrecheck(false)}>{t('quiz.backToModule')}</button>
      </>
    )
    return (
      <>
        <p className="eyebrow">{mod.title} · {t('module.preCheck')}</p>
        <QuizRunner quiz={pc} onScore={onScore} renderResultActions={actions} />
      </>
    )
  }

  return (
    <>
      <p className="eyebrow">{mod.eyebrow}</p>
      <h1>{mod.title}</h1>
      <p className="lede">{mod.summary}</p>

      {mod.preCheck && (
        <button className="precheck-cta" onClick={() => setPrecheck(true)}>
          <div>
            <h3 style={{ margin: 0 }}>{t('module.preCheckTitle')}</h3>
            <p style={{ margin: '4px 0 0', fontSize: 13 }}>{t('module.preCheckBody')}</p>
          </div>
          <span className="card-chev">›</span>
        </button>
      )}

      <div className="divider" />

      <h2>{t('module.objectives')}</h2>
      <ul className="objectives">
        {mod.objectives.map((o, i) => <li key={i}>{o}</li>)}
      </ul>

      <div className="divider" />

      <h2>{t('module.segments')}</h2>
      {mod.segments.map((seg, i) => {
        const done = isSegmentDone(mod.id, seg.id)
        return (
          <button key={seg.id} className="card" onClick={() => navigate(`/learn/${mod.id}/${seg.id}`)}>
            <div className="card-row">
              <div style={{ minWidth: 0 }}>
                <h3 style={{ margin: 0 }}>
                  <span className="seg-index">{i + 1}</span> {seg.title}
                </h3>
                <p style={{ margin: '6px 0 0', fontSize: 13 }}>
                  {t('module.minutes', { count: seg.minutes })}
                </p>
              </div>
              {done ? <span className="chip done">✓</span> : <span className="card-chev">›</span>}
            </div>
          </button>
        )
      })}

      {hasFlashcards && (
        <button className="card" onClick={() => navigate('/flashcards')}>
          <div className="card-row">
            <div>
              <p className="eyebrow" style={{ margin: '0 0 6px' }}>{t('flash.title')}</p>
              <h3 style={{ margin: 0 }}>{t('module.practise')}</h3>
            </div>
            <span className="card-chev">›</span>
          </div>
        </button>
      )}

      <div className="divider" />

      <h2>{mod.practical.title}</h2>
      <p>{mod.practical.body}</p>

      <button className="btn" style={{ marginTop: 12 }} onClick={() => navigate(`/quiz/${mod.id}`)}>
        {q?.passed ? `✓ ${t('module.quizCta')}` : t('module.quizCta')}
      </button>
    </>
  )
}
