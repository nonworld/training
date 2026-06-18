// Shareable certification card: live canvas preview with format toggle, native
// share (Web Share API with files) and download. The learner's name is captured
// here if not already known. Full email capture is a later phase; the name alone
// is enough to print a card.
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { renderCard, toBlob, FORMATS } from '../lib/certcard.js'
import { useStore } from '../state/store.jsx'

export default function CertCard({ badgeTitle, date }) {
  const { t } = useTranslation()
  const { state, setProfile } = useStore()
  const canvasRef = useRef(null)
  const [name, setName] = useState(state.profile?.name || '')
  const [format, setFormat] = useState('square')
  const [shared, setShared] = useState('')

  useEffect(() => {
    if (canvasRef.current) {
      renderCard(canvasRef.current, { name, badgeTitle, date, format })
    }
  }, [name, badgeTitle, date, format])

  const persistName = () => {
    if (name && name !== state.profile?.name) {
      setProfile({ ...(state.profile || {}), name })
    }
  }

  const fileName = `non-academy-${badgeTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`

  const onDownload = async () => {
    persistName()
    const blob = await toBlob(canvasRef.current)
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()
    URL.revokeObjectURL(url)
  }

  const onShare = async () => {
    persistName()
    const blob = await toBlob(canvasRef.current)
    const file = new File([blob], fileName, { type: 'image/png' })
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({
          files: [file],
          title: badgeTitle,
          text: t('cert.shareText', { badge: badgeTitle }),
        })
      } catch {
        // user cancelled share; nothing to do
      }
    } else {
      // no native share (most desktops): fall back to download
      await onDownload()
      setShared(t('cert.sharedFallback'))
    }
  }

  return (
    <div className="certcard">
      <canvas
        ref={canvasRef}
        className="certcard-canvas"
        style={{ aspectRatio: `${FORMATS[format].w} / ${FORMATS[format].h}` }}
        aria-label={`${badgeTitle} certificate`}
      />

      <div className="certcard-controls">
        <label className="field-label" htmlFor="cardname">{t('cert.nameLabel')}</label>
        <input
          id="cardname"
          className="field"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={persistName}
          placeholder={t('cert.namePlaceholder')}
          maxLength={40}
        />

        <div className="seg-toggle">
          <button
            className={format === 'square' ? 'active' : ''}
            onClick={() => setFormat('square')}
          >
            {t('cert.square')}
          </button>
          <button
            className={format === 'landscape' ? 'active' : ''}
            onClick={() => setFormat('landscape')}
          >
            {t('cert.landscape')}
          </button>
        </div>

        <div className="seg-nav">
          <button className="btn" onClick={onShare}>{t('cert.share')}</button>
          <button className="btn ghost" onClick={onDownload}>{t('cert.download')}</button>
        </div>
        {shared && <p className="muted center" style={{ fontSize: 13 }}>{shared}</p>}
      </div>
    </div>
  )
}
