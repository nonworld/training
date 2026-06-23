// Reusable quiz engine, shared by per-module formative quizzes, the spaced
// recall openers, and the final certification exams. One item at a time.
//
// Items can be plain multiple choice or a weighted performance task (menu
// pairing, beverage-list gap). Each item is worth `possible` points; the final
// score is earned/possible across the exam, so a pairing task counts for more
// than a single recall question. Choice-only quizzes score exactly as before.
//
// A correct answer fires a fast micro-celebration. A wrong answer teaches: it
// shows the explanation in NON's voice rather than just marking it incorrect.
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { XP } from '../state/gamification.js'
import { playTick } from '../lib/sound.js'
import { useStore } from '../state/store.jsx'
import { isAnswered, scoreItem } from '../lib/scoreItem.js'
import MenuItem from './items/MenuItem.jsx'
import ListItem from './items/ListItem.jsx'

export default function QuizRunner({ quiz, onScore, renderResultActions }) {
  const { t } = useTranslation()
  const { state, awardQuizCorrect } = useStore()
  const [i, setI] = useState(0)
  const [value, setValue] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [earnedTotal, setEarnedTotal] = useState(0)
  const [possibleTotal, setPossibleTotal] = useState(0)
  const [done, setDone] = useState(false)
  const [finalScore, setFinalScore] = useState(0)
  const [gain, setGain] = useState(false)

  const questions = quiz.questions
  const item = questions[i]
  const type = item.type || 'choice'
  const result = revealed ? scoreItem(item, value) : null

  const submit = () => {
    if (!isAnswered(item, value)) return
    const r = scoreItem(item, value)
    setEarnedTotal((e) => e + r.earned)
    setPossibleTotal((p) => p + r.possible)
    if (r.earned > 0) {
      awardQuizCorrect(quiz.id, item.id)
      playTick(state.soundMuted)
      setGain(true)
      setTimeout(() => setGain(false), 900)
    }
    setRevealed(true)
  }

  const next = () => {
    if (i === questions.length - 1) {
      const score = possibleTotal ? Math.round((earnedTotal / possibleTotal) * 100) : 0
      setFinalScore(score)
      setDone(true)
      onScore?.(score, score >= quiz.threshold)
    } else {
      setI((n) => n + 1)
      setValue(null)
      setRevealed(false)
    }
  }

  const retake = () => {
    setI(0)
    setValue(null)
    setRevealed(false)
    setEarnedTotal(0)
    setPossibleTotal(0)
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

  // Feedback header: full marks, partial, or wrong.
  const fbClass = result ? (result.full ? 'ok' : result.earned > 0 ? 'part' : 'no') : ''
  const fbLabel = result
    ? result.full
      ? t('quiz.correct')
      : result.earned > 0
        ? t('quiz.partial', { earned: result.earned, possible: result.possible })
        : t('quiz.incorrect')
    : ''

  return (
    <>
      <p className="eyebrow">{t('quiz.question', { current: i + 1, total: questions.length })}</p>
      <div className="bar" style={{ marginBottom: 18 }}>
        <span style={{ width: `${((i + 1) / questions.length) * 100}%` }} />
      </div>

      <h2 style={{ fontSize: 22 }}>{item.prompt}</h2>

      {type === 'menu' && (
        <MenuItem item={item} value={value} onChange={setValue} revealed={revealed} />
      )}
      {type === 'list' && (
        <ListItem item={item} value={value} onChange={setValue} revealed={revealed} />
      )}
      {type === 'choice' && (
        <div className="stack" style={{ marginTop: 16 }}>
          {item.options.map((opt, oi) => {
            let cls = 'opt'
            if (revealed) {
              if (oi === item.answer) cls += ' correct'
              else if (oi === value?.choice) cls += ' wrong'
            } else if (oi === value?.choice) cls += ' picked'
            return (
              <button
                key={oi}
                className={cls}
                disabled={revealed}
                onClick={() => setValue({ choice: oi })}
              >
                {opt}
              </button>
            )
          })}
        </div>
      )}

      {gain && <div className="xp-float" aria-hidden="true">+{XP.QUIZ_CORRECT} XP</div>}

      {revealed && (
        <div className={`feedback ${fbClass}`}>
          <strong>{fbLabel}</strong>
          <p style={{ margin: '6px 0 0' }}>{item.explanation}</p>
        </div>
      )}

      <div className="seg-nav">
        {!revealed ? (
          <button className="btn" onClick={submit} disabled={!isAnswered(item, value)}>
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
