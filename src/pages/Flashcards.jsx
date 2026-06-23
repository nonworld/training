// Flashcard / active-recall mode for SKU tasting notes and pairings. Scenario
// first: the card leads with a guest moment, you recall the SKU and its facts,
// then flip to check. Self-grading feeds the simple spaced-repetition box in the
// store, and "got it" awards a little XP. Cards marked for review re-queue.
import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useStore } from '../state/store.jsx'
import { getSkus } from '../content/registry.js'

export default function Flashcards() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { state, gradeFlashcard, completeFlashcardRound } = useStore()
  const skus = getSkus(state.lang)

  // Build the queue once. "Review" answers push the card to the back.
  const initial = useMemo(() => skus.map((s) => s.id), [skus])
  const [queue, setQueue] = useState(initial)
  const [flipped, setFlipped] = useState(false)
  const [seen, setSeen] = useState(0)

  if (queue.length === 0) {
    return (
      <div className="center" style={{ paddingTop: 32 }}>
        <p className="eyebrow">{t('flash.title')}</p>
        <h1>{t('flash.doneTitle')}</h1>
        <p>{t('flash.doneBody', { count: seen })}</p>
        <div className="stack" style={{ marginTop: 18 }}>
          <button className="btn" onClick={() => { setQueue(initial); setSeen(0); setFlipped(false) }}>
            {t('flash.again')}
          </button>
          <button className="btn ghost" onClick={() => navigate(-1)}>{t('nav.back')}</button>
        </div>
      </div>
    )
  }

  const sku = skus.find((s) => s.id === queue[0])

  const grade = (got) => {
    gradeFlashcard(`sku:${sku.id}`, got)
    setSeen((n) => n + 1)
    setFlipped(false)
    setQueue((q) => {
      const nextQ = got ? q.slice(1) : [...q.slice(1), q[0]]
      if (nextQ.length === 0) completeFlashcardRound() // a full round done
      return nextQ
    })
  }

  return (
    <>
      <p className="eyebrow">{t('flash.title')}</p>
      <div className="bar" style={{ marginBottom: 16 }}>
        <span style={{ width: `${(seen / (seen + queue.length)) * 100}%` }} />
      </div>

      <button
        className={`flashcard ${flipped ? 'flipped' : ''}`}
        onClick={() => setFlipped((f) => !f)}
        aria-label={flipped ? t('flash.tapBack') : t('flash.tapReveal')}
      >
        {!flipped ? (
          <div className="flashcard-face">
            <p className="eyebrow">{t('flash.scenario')}</p>
            <p className="flashcard-scenario">{sku.scenario}</p>
            <p className="flashcard-hint">{t('flash.tapReveal')}</p>
          </div>
        ) : (
          <div className="flashcard-face">
            <div className="card-row">
              <span className="sku-code">{sku.code}</span>
              <span className="chip">{sku.format}</span>
            </div>
            <h2 className="sku-name">{sku.name}</h2>
            <p className="flashcard-tasting">{sku.tasting}</p>
            <div className="pair-row">
              {sku.pairings.map((p) => <span key={p} className="chip">{p}</span>)}
            </div>
            {sku.draft && <span className="draft" style={{ marginTop: 12 }}>Draft copy</span>}
          </div>
        )}
      </button>

      {flipped && (
        <div className="seg-nav">
          <button className="btn ghost" onClick={() => grade(false)}>{t('flash.review')}</button>
          <button className="btn" onClick={() => grade(true)}>{t('flash.gotIt')}</button>
        </div>
      )}
    </>
  )
}
