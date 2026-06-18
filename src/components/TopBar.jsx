// Persistent progress strip under the appbar: level + XP progress, streak, and
// overall completion. Always visible inside the shell so progress is never out
// of sight. Hidden before a role is chosen (nothing to measure yet).
import { useTranslation } from 'react-i18next'

import { useStore } from '../state/store.jsx'
import { getModulesForRole } from '../content/registry.js'

export default function TopBar() {
  const { t } = useTranslation()
  const { state, level, completionPct } = useStore()
  if (!state.role) return null

  const totalModules = getModulesForRole(state.lang, state.role).filter(
    (m) => m.status === 'ready',
  ).length
  const pct = completionPct(totalModules)
  const streak = state.streak.current || 0

  return (
    <div className="topbar" role="status" aria-label={t('topbar.label')}>
      <div className="topbar-cell topbar-level">
        <span className="topbar-k">{t('topbar.level', { level: level.level })}</span>
        <span className="topbar-v">{level.name}</span>
        <div className="topbar-xpbar" aria-hidden="true">
          <span style={{ width: `${level.pct}%` }} />
        </div>
        <span className="topbar-xp">{state.xp} XP</span>
      </div>

      <div className="topbar-cell topbar-streak" title={t('topbar.streakHint')}>
        <span className="topbar-flame" aria-hidden="true">▴</span>
        <span className="topbar-v">{streak}</span>
        <span className="topbar-k">{t('topbar.streak')}</span>
      </div>

      <div className="topbar-cell topbar-complete">
        <span className="topbar-v">{pct}%</span>
        <span className="topbar-k">{t('topbar.complete')}</span>
      </div>
    </div>
  )
}
