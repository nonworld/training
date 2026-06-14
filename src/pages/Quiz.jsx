// Formative knowledge-check quiz. One question at a time, immediate feedback,
// scored against the module pass threshold. Records best score and pass state.
// Passing the quiz completes the module.
import { useState } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useStore } from '../state/store.jsx'
import { getModule } from '../content/registry.js'

export default function Quiz() {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { state, recordQuiz, completeModule } = useStore()

  const mod = getModule(state.lang, moduleId)
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [correctCount, setCorrect] = useState(0)
  const [done, setDone] = useState(false)
  const [finalScore, setFinalScore] = useState(0)

  if (!mod || mod.status !== 'ready') return <Navigate to="/home" replace />

  const quiz = mod.quiz
  const questions = quiz.questions
  const q = questions[i]

  const submit = () => {
    if (picked === null) return
    const right = picked === q.answer
    if (right) setCorrect((c) => c + 1)
    setRevealed(true)
  }

  const next = () => {
    const last = i === questions.length - 1
    if (last) {
      const score = Math.round(((correctCount) / questions.length) * 100)
      setFinalScore(score)
      recordQuiz(quiz.id, score, quiz.threshold)
      if (score >= quiz.threshold) completeModule(mod.id)
      setDone(true)
    } else {
      setI((n) => n + 1)
      setPicked(null)
      setRevealed(false)
    }
  }

  const retake = () => {
    setI(0)
    setPicked(null)
    setRevealed(false)
    setCorrect(0)
    setDone(false)
    setFinalScore(0)
  }

  if (done) {
    const passed = finalScore >= quiz.threshold
    return (
      <div className="center" style={{ paddingTop: 24 }}>
        <p className="eyebrow">{t('quiz.title')}</p>
        <div className={`score-ring ${passed ? 'pass' : 'fail'}`}>{finalScore}%</div>
        <h1 style={{ marginTop: 18 }}>{passed ? t('quiz.pass') : t('quiz.fail')}</h1>
        <p>{t('quiz.passThreshold', { threshold: quiz.threshold })}</p>
        <div className="stack" style={{ marginTop: 18 }}>
          {passed ? (
            <button className="btn" onClick={() => navigate('/certification')}>
              {t('home.certification')}
            </button>
          ) : (
            <button className="btn" onClick={retake}>{t('quiz.retake')}</button>
          )}
          <button className="btn ghost" onClick={() => navigate(`/learn/${mod.id}`)}>
            {t('quiz.backToModule')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <>
      <p className="eyebrow">{t('quiz.question', { current: i + 1, total: questions.length })}</p>
      <div className="bar" style={{ marginBottom: 18 }}>
        <span style={{ width: `${((i + 1) / questions.length) * 100}%` }} />
      </div>

      <h2 style={{ fontSize: 22 }}>{q.prompt}</h2>

      <div className="stack" style={{ marginTop: 16 }}>
        {q.options.map((opt, oi) => {
          let cls = 'opt'
          if (revealed) {
            if (oi === q.answer) cls += ' correct'
            else if (oi === picked) cls += ' wrong'
          } else if (oi === picked) cls += ' picked'
          return (
            <button
              key={oi}
              className={cls}
              disabled={revealed}
              onClick={() => setPicked(oi)}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {revealed && (
        <div className={`feedback ${picked === q.answer ? 'ok' : 'no'}`}>
          <strong>{picked === q.answer ? t('quiz.correct') : t('quiz.incorrect')}</strong>
          <p style={{ margin: '6px 0 0' }}>{q.explanation}</p>
        </div>
      )}

      <div className="seg-nav">
        {!revealed ? (
          <button className="btn" onClick={submit} disabled={picked === null}>
            {t('quiz.submit')}
          </button>
        ) : (
          <button className="btn" onClick={next}>
            {i === questions.length - 1 ? t('quiz.finish') : t('quiz.next')}
          </button>
        )}
      </div>
    </>
  )
}
