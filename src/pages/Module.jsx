// Module overview: observable objectives, the 5-minute segments, the practical
// task, and the knowledge-check CTA.
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useStore } from '../state/store.jsx'
import { getModule } from '../content/registry.js'

export default function Module() {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { state, isSegmentDone, quiz } = useStore()

  const mod = getModule(state.lang, moduleId)
  if (!mod || mod.status !== 'ready') return <Navigate to="/home" replace />

  const q = quiz(mod.quiz.id)

  return (
    <>
      <p className="eyebrow">{mod.eyebrow}</p>
      <h1>{mod.title}</h1>
      <p className="lede">{mod.summary}</p>

      <div className="divider" />

      <h2>{t('module.objectives')}</h2>
      <ul className="objectives">
        {mod.objectives.map((o, i) => (
          <li key={i}>{o}</li>
        ))}
      </ul>

      <div className="divider" />

      <h2>{t('module.segments')}</h2>
      {mod.segments.map((seg, i) => {
        const done = isSegmentDone(mod.id, seg.id)
        return (
          <button
            key={seg.id}
            className="card"
            onClick={() => navigate(`/learn/${mod.id}/${seg.id}`)}
          >
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

      <div className="divider" />

      <h2>{mod.practical.title}</h2>
      <p>{mod.practical.body}</p>

      <button className="btn" style={{ marginTop: 12 }} onClick={() => navigate(`/quiz/${mod.id}`)}>
        {q?.passed ? `✓ ${t('module.quizCta')}` : t('module.quizCta')}
      </button>
    </>
  )
}
