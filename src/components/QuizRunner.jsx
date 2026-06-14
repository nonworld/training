// Reusable quiz engine, shared by per-module formative quizzes and the final
// certification exam. One question at a time, immediate feedback, scored against
// the quiz's pass threshold. The parent supplies the result-screen actions.
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

export default function QuizRunner({ quiz, onScore, renderResultActions }) {
  const { t } = useTranslation()
  const [i, setI] = useState(0)
  const [picked, setPicked] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [correctCount, setCorrect] = useState(0)
  const [done, setDone] = useState(false)
  const [finalScore, setFinalScore] = useState(0)

  const questions = quiz.questions
  const q = questions[i]

  const submit = () => {
    if (picked === null) return
    if (picked === q.answer) setCorrect((c) => c + 1)
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
          {renderResultActions?.(score(finalScore, quiz.threshold), retake)}
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

// passed flag helper kept inline so the result render prop stays simple.
function score(finalScore, threshold) {
  return { value: finalScore, passed: finalScore >= threshold }
}
