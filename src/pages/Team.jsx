// Light team layer for distributor rollout. Shows the learner their own
// completion against their venue or distributor. Team-wide totals need the
// backend (KV/D1 sync, a later phase), so that figure is clearly flagged as
// pending rather than faked.
import { Navigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { useStore } from '../state/store.jsx'
import { getModulesForRole } from '../content/registry.js'

export default function Team() {
  const { t } = useTranslation()
  const { state, completionPct, isModuleComplete } = useStore()
  if (!state.role) return <Navigate to="/" replace />

  const ready = getModulesForRole(state.lang, state.role).filter((m) => m.status === 'ready')
  const total = ready.length
  const done = ready.filter((m) => isModuleComplete(m.id)).length
  const pct = completionPct(total)
  const team = state.profile?.venue || state.profile?.market || null

  return (
    <>
      <p className="eyebrow">{t('team.title')}</p>
      <h1>{team || t('team.noTeam')}</h1>
      <p className="lede">{t('team.intro')}</p>

      <div className="team-stat">
        <div className="team-stat-num">{pct}%</div>
        <div className="team-stat-label">{t('team.yourCompletion')}</div>
        <div className="bar" style={{ marginTop: 12 }}>
          <span style={{ width: `${pct}%` }} />
        </div>
        <p className="muted" style={{ marginTop: 10, fontSize: 13 }}>
          {t('team.modulesDone', { done, total })}
        </p>
      </div>

      <div className="incentive" style={{ marginTop: 16 }}>
        <p className="eyebrow" style={{ margin: '0 0 6px' }}>{t('team.teamTotal')}</p>
        <p style={{ margin: 0 }}>
          {t('team.teamTotalPending')} <span className="draft">Backend</span>
        </p>
      </div>
    </>
  )
}
