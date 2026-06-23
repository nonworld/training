// A single 5-minute segment. Vertical, thumb-friendly. Marks complete on finish
// and records last location for resume. Advances to the next segment, or to the
// quiz at the end of the module.
import { useEffect } from 'react'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useStore } from '../state/store.jsx'
import { getModule } from '../content/registry.js'
import SkuLineup from '../components/SkuLineup.jsx'
import ServeDiagram from '../components/ServeDiagram.jsx'
import PairingSpectrum from '../components/PairingSpectrum.jsx'

export default function Segment() {
  const { moduleId, segmentId } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { state, completeSegment, setLastLocation } = useStore()

  const mod = getModule(state.lang, moduleId)
  const idx = mod?.segments.findIndex((s) => s.id === segmentId) ?? -1
  const seg = idx >= 0 ? mod.segments[idx] : null

  // Autosave resume point whenever a segment opens.
  useEffect(() => {
    if (seg) setLastLocation(`/learn/${moduleId}/${segmentId}`)
  }, [moduleId, segmentId, seg, setLastLocation])

  if (!mod || mod.status !== 'ready' || !seg) return <Navigate to="/home" replace />

  const total = mod.segments.length
  const isLast = idx === total - 1

  const finish = () => {
    completeSegment(mod.id, seg.id)
    if (isLast) navigate(`/quiz/${mod.id}`)
    else navigate(`/learn/${mod.id}/${mod.segments[idx + 1].id}`)
  }

  return (
    <>
      <div className="seg-top">
        <p className="eyebrow" style={{ margin: 0 }}>
          {mod.title} · {t('module.segmentOf', { current: idx + 1, total })}
        </p>
        <div className="bar" style={{ marginTop: 10 }}>
          <span style={{ width: `${((idx + 1) / total) * 100}%` }} />
        </div>
      </div>

      <h1 style={{ marginTop: 18 }}>{seg.title}</h1>

      {seg.gallery && <SkuLineup ids={seg.gallery} />}
      {seg.diagram === 'serve' && <ServeDiagram />}
      {seg.diagram === 'pairing' && <PairingSpectrum />}

      <div className="prose">
        {seg.body.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      {seg.points?.length > 0 && (
        <div className="keypoints">
          <p className="eyebrow">Key points</p>
          <ul className="objectives">
            {seg.points.map((pt, i) => (
              <li key={i}>{pt}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="seg-nav">
        {idx > 0 && (
          <button
            className="btn ghost"
            onClick={() => navigate(`/learn/${mod.id}/${mod.segments[idx - 1].id}`)}
          >
            {t('module.prevSegment')}
          </button>
        )}
        <button className="btn" onClick={finish}>
          {isLast ? t('module.quizCta') : t('module.nextSegment')}
        </button>
      </div>
    </>
  )
}
