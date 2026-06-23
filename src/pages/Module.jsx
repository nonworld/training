// Module overview. Now supports:
//  - a spaced SKU-recall opener (mod.spacedRecall) drawn from the shared bank,
//    shown at the top until completed, for retention across pairing modules;
//  - a mandatory flashcard round (mod.requireFlashcards) that gates the quiz,
//    used by "The Six and the Structure";
//  - a worked example (mod.workedExample): an annotated model performance shown
//    before the practical and quiz, so novices see it modelled first;
//  - the existing optional pre-check.
import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import QuizRunner from '../components/QuizRunner.jsx'
import { useStore } from '../state/store.jsx'
import { getModule, getSkuRecall } from '../content/registry.js'

export default function Module() {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { state, isSegmentDone, quiz, recordPreCheck, markRecallDone, isRecallDone, hasFlashcardRound } =
    useStore()
  const [precheck, setPrecheck] = useState(false)
  const [recall, setRecall] = useState(false)

  const mod = getModule(state.lang, moduleId)
  if (!mod || mod.status !== 'ready') return <Navigate to="/home" replace />

  const q = quiz(mod.quiz.id)
  const recallNeeded = Boolean(mod.spacedRecall) && !isRecallDone(mod.id)
  const flashcardsRequired = Boolean(mod.requireFlashcards)
  const flashcardsDone = hasFlashcardRound(mod.id)
  const quizLocked = flashcardsRequired && !flashcardsDone

  // Inline spaced SKU recall.
  if (recall && mod.spacedRecall) {
    const rq = getSkuRecall(state.lang, mod.id, mod.spacedRecall.count)
    const onScore = () => markRecallDone(mod.id)
    const actions = () => (
      <button className="btn" onClick={() => setRecall(false)}>{t('module.recallContinue')}</button>
    )
    return (
      <>
        <p className="eyebrow">{mod.title} · {t('module.recall')}</p>
        <QuizRunner quiz={rq} onScore={onScore} renderResultActions={actions} />
      </>
    )
  }

  // Inline pre-check.
  if (precheck && mod.preCheck) {
    const pc = { id: mod.preCheck.id, threshold: mod.preCheck.passToSkip, questions: mod.preCheck.questions }
    const onScore = () => recordPreCheck(mod.id)
    const actions = ({ passed }) => (
      <>
        {passed && !quizLocked ? (
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

      {recallNeeded && (
        <button className="precheck-cta" onClick={() => setRecall(true)}>
          <div>
            <h3 style={{ margin: 0 }}>{t('module.recallTitle')}</h3>
            <p style={{ margin: '4px 0 0', fontSize: 13 }}>
              {t('module.recallBody', { count: mod.spacedRecall.count })}
            </p>
          </div>
          <span className="card-chev">›</span>
        </button>
      )}

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

      {mod.workedExample && (
        <>
          <div className="divider" />
          <div className="worked">
            <p className="eyebrow" style={{ margin: '0 0 8px' }}>{t('module.worked')}</p>
            <h3 style={{ margin: '0 0 8px' }}>{mod.workedExample.label}</h3>
            <p className="worked-setup">{mod.workedExample.setup}</p>
            {mod.workedExample.model.map((line, i) => (
              <p key={i} className="worked-model">{line}</p>
            ))}
            {mod.workedExample.callouts?.length > 0 && (
              <>
                <p className="eyebrow" style={{ margin: '14px 0 6px' }}>{t('module.whyItWorks')}</p>
                <ul className="objectives">
                  {mod.workedExample.callouts.map((c, i) => <li key={i}>{c}</li>)}
                </ul>
              </>
            )}
          </div>
        </>
      )}

      {flashcardsRequired && (
        <button className={`card ${quizLocked ? 'card-required' : ''}`} onClick={() => navigate('/flashcards')}>
          <div className="card-row">
            <div>
              <p className="eyebrow" style={{ margin: '0 0 6px' }}>
                {t('flash.title')} · {quizLocked ? t('module.required') : t('module.completed')}
              </p>
              <h3 style={{ margin: 0 }}>{t('module.flashRound')}</h3>
            </div>
            {flashcardsDone ? <span className="chip done">✓</span> : <span className="card-chev">›</span>}
          </div>
        </button>
      )}

      <div className="divider" />

      <h2>{mod.practical.title}</h2>
      <p>{mod.practical.body}</p>

      <button
        className="btn"
        style={{ marginTop: 12 }}
        disabled={quizLocked}
        onClick={() => navigate(`/quiz/${mod.id}`)}
      >
        {quizLocked ? t('module.flashFirst') : q?.passed ? `✓ ${t('module.quizCta')}` : t('module.quizCta')}
      </button>
    </>
  )
}
