// Celebration route. Reads the reward payload passed via navigation state and
// renders the full-screen celebration. Continue routes on: module completions
// go to the module's certification path; certifications go to the share card.
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Celebration from '../components/Celebration.jsx'

export default function Celebrate() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { t } = useTranslation()

  if (!state) return <Navigate to="/home" replace />

  const continueTo = () => {
    if (state.kind === 'cert') navigate('/certification', { replace: true })
    else navigate('/certification', { replace: true })
  }

  return (
    <Celebration
      title={state.title}
      badgeTitle={state.badgeTitle}
      badgeEmoji={state.badgeEmoji}
      xpGained={state.xpGained}
      leveledUp={state.leveledUp}
      levelName={state.levelName}
      ctaLabel={state.kind === 'cert' ? t('celebrate.viewCard') : t('celebrate.continue')}
      onContinue={continueTo}
    />
  )
}
