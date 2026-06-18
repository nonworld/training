// Full-screen completion celebration. Confetti, the NON logotype, XP counting
// up, a badge reveal, and a mute toggle. Timed to hold for a beat so finishing
// feels like winning. Used for module completion and certification.
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import Logotype from './Logotype.jsx'
import { burst } from '../lib/confetti.js'
import { playFanfare } from '../lib/sound.js'
import { useStore } from '../state/store.jsx'

export default function Celebration({
  title,
  badgeTitle,
  badgeEmoji = '🏅',
  xpGained = 0,
  levelName,
  leveledUp = false,
  ctaLabel,
  onContinue,
}) {
  const { t } = useTranslation()
  const { state, toggleSound } = useStore()
  const canvasRef = useRef(null)
  const [xp, setXp] = useState(0)
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    const stop = canvasRef.current ? burst(canvasRef.current) : null
    playFanfare(state.soundMuted)

    // Count XP up over ~900ms with an ease-out.
    const dur = 900
    const t0 = performance.now()
    let raf = 0
    const tick = (now) => {
      const k = Math.min(1, (now - t0) / dur)
      const eased = 1 - Math.pow(1 - k, 3)
      setXp(Math.round(eased * xpGained))
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const revealTimer = setTimeout(() => setRevealed(true), 450)
    return () => {
      stop?.()
      cancelAnimationFrame(raf)
      clearTimeout(revealTimer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="celebrate">
      <canvas ref={canvasRef} className="celebrate-confetti" aria-hidden="true" />

      <button
        className="celebrate-mute"
        onClick={toggleSound}
        aria-label={state.soundMuted ? 'Unmute' : 'Mute'}
      >
        {state.soundMuted ? 'Sound off' : 'Sound on'}
      </button>

      <div className="celebrate-inner">
        <Logotype height={22} />
        <p className="celebrate-eyebrow">{t('celebrate.complete')}</p>
        <h1 className="celebrate-title">{title}</h1>

        <div className={`celebrate-badge ${revealed ? 'in' : ''}`}>
          <div className="badge-mark earned">
            <span className="badge-glyph">{badgeEmoji}</span>
          </div>
          <p className="celebrate-badge-title">{badgeTitle}</p>
        </div>

        <div className="celebrate-xp">
          <span className="celebrate-xp-num">+{xp}</span>
          <span className="celebrate-xp-label">XP</span>
        </div>

        {leveledUp && levelName && (
          <p className="celebrate-level">{t('celebrate.levelUp', { level: levelName })}</p>
        )}

        <button className="btn" style={{ marginTop: 26 }} onClick={onContinue}>
          {ctaLabel || t('celebrate.continue')}
        </button>
      </div>
    </div>
  )
}
