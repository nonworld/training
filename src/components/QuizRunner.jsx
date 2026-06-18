// Reusable quiz engine, shared by per-module formative quizzes and the final
// certification exam. One question at a time. A correct answer fires a fast
// micro-celebration (tick + XP float) to keep the effort-reward loop tight. A
// wrong answer teaches: it shows the explanation in NON's voice rather than just
// marking it incorrect. Scored against the quiz's pass threshold.
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { XP } from '../state/gamification.js'
import { playTick } from '../lib/sound.js'
import { useStore } from '../state/store.jsx'

export default function QuizRunner({ quiz, onScore, renderResultActions }) {
  const { t } = useTranslation()
  const { state, awardQuizCorrect } = useStore()
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [correctCount, setCorrect] = useState(0)
  const [done, setDone] = useState(false)
  const [finalScore, setFinalScore] = useState(0)
  const [gain, setGain] = useState(false)

  const questions = quiz.questions
  const q = questions[i]
  const isRight = revealed && picked === q.answer

  const submit = () => {
    if (picked === null) return
    if (picked === q.answer) {
      setCorrect((c) => c + 1)
      awardQuizCorrect(quiz.id, q.id)
      playTick(state.soundMuted)
      setGain(true)
      setTimeout(() => setGain(false), 900)
    }
    setRevealed(true)
  }

  const next = () => {
    if (i === questions.length - 1) {
      const score = Math.round((correctCount / questions.length) * 100)
      setFinalScore(score)
      setDone(true)
      onScore?.(score, score >= quiz.threshold)
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
          {renderResultActions?.({ value: finalScore, passed }, retake)}
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
            <button key={oi} className={cls} disabled={revealed} onClick={() => setPicked(oi)}>
              {opt}
            </button>
          )
        })}
      </div>

      {gain && (
        <div className="xp-float" aria-hidden="true">+{XP.QUIZ_CORRECT} XP</div>
      )}

      {revealed && (
        <div className={`feedback ${isRight ? 'ok' : 'no'}`}>
          <strong>{isRight ? t('quiz.correct') : t('quiz.incorrect')}</strong>
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
