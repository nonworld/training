// Track dashboard. Shared core plus the role track, a resume affordance, the
// certification card, and a route into quick reference.
import { Navigate, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import TranslateBanner from '../components/TranslateBanner.jsx'
import { useStore } from '../state/store.jsx'
import { getModulesForRole, getCertification } from '../content/registry.js'

function ModuleCard({ mod, onOpen }) {
  const { t } = useTranslation()
  const { segmentsDone, isModuleComplete } = useStore()
  const total = mod.segments.length
  const done = segmentsDone(mod.id)
  const complete = isModuleComplete(mod.id)
  const pct = total ? Math.round((done / total) * 100) : 0
  const planned = mod.status !== 'ready'

  return (
    <button
      className="card"
      onClick={() => !planned && onOpen(mod.id)}
      disabled={planned}
      style={planned ? { opacity: 0.55, cursor: 'default' } : undefined}
    >
      <div className="card-row">
        <div style={{ minWidth: 0 }}>
          <p className="eyebrow" style={{ margin: '0 0 6px' }}>{mod.eyebrow}</p>
          <h3 style={{ margin: 0 }}>{mod.title}</h3>
        </div>
        {complete ? (
          <span className="chip done">✓ {t('module.completed')}</span>
        ) : planned ? (
          <span className="chip">Soon</span>
        ) : (
          <span className="card-chev">›</span>
        )}
      </div>
      <p style={{ margin: '10px 0 0', fontSize: 14 }}>{mod.summary}</p>
      {!planned && total > 0 && (
        <div style={{ marginTop: 14 }}>
          <div className="bar"><span style={{ width: `${pct}%` }} /></div>
        </div>
      )}
    </button>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { state, hasCertification } = useStore()

  if (!state.role) return <Navigate to="/" replace />

  const role = state.role
  const mods = getModulesForRole(state.lang, role)
  const shared = mods.filter((m) => m.track === 'shared')
  const track = mods.filter((m) => m.track === role)
  const cert = getCertification(state.lang, role)
  const certified = hasCertification(role)

  const open = (id) => navigate(`/learn/${id}`)

  return (
    <>
      <p className="eyebrow">{t('app.name')} · {role === 'venue' ? t('home.venueTrack') : t('home.repTrack')}</p>
      <h1>{t('home.welcome')}</h1>
      <TranslateBanner />

      {state.lastLocation && (
        <button className="btn" style={{ marginBottom: 18 }} onClick={() => navigate(state.lastLocation)}>
          {t('home.resume')}
        </button>
      )}

      <h2 style={{ marginTop: 8 }}>{t('home.sharedCore')}</h2>
      {shared.map((m) => <ModuleCard key={m.id} mod={m} onOpen={open} />)}

      <h2 style={{ marginTop: 22 }}>{role === 'venue' ? t('home.venueTrack') : t('home.repTrack')}</h2>
      {track.map((m) => <ModuleCard key={m.id} mod={m} onOpen={open} />)}

      <div className="divider" />

      <button
        className="card"
        onClick={() => navigate('/certification')}
        style={{ borderColor: certified ? 'rgba(143,209,158,0.4)' : undefined }}
      >
        <div className="card-row">
          <div>
            <p className="eyebrow" style={{ margin: '0 0 6px' }}>{t('home.certification')}</p>
            <h3 style={{ margin: 0 }}>{cert.title}</h3>
          </div>
          <span className={certified ? 'chip done' : 'card-chev'}>
            {certified ? `✓ ${t('cert.unlocked')}` : '›'}
          </span>
        </div>
      </button>

      <button className="card" onClick={() => navigate('/reference')}>
        <div className="card-row">
          <div>
            <p className="eyebrow" style={{ margin: '0 0 6px' }}>{t('nav.reference')}</p>
            <h3 style={{ margin: 0 }}>{t('reference.allSkus')}</h3>
          </div>
          <span className="card-chev">›</span>
        </div>
      </button>

      <button className="card" onClick={() => navigate('/team')}>
        <div className="card-row">
          <div>
            <p className="eyebrow" style={{ margin: '0 0 6px' }}>{t('team.title')}</p>
            <h3 style={{ margin: 0 }}>{t('team.card')}</h3>
          </div>
          <span className="card-chev">›</span>
        </div>
      </button>
    </>
  )
}
