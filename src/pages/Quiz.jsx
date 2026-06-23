// Per-module formative knowledge check. Wraps the shared QuizRunner. Passing
// completes the module, awards XP and a badge, and routes into the full-screen
// celebration. Failing shows the retake screen.
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import QuizRunner from '../components/QuizRunner.jsx'
import { useStore } from '../state/store.jsx'
import { getModule } from '../content/registry.js'

export default function Quiz() {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { state, recordQuiz, completeModuleWithRewards } = useStore()

  const mod = getModule(state.lang, moduleId)
  if (!mod || mod.status !== 'ready') return <Navigate to="/home" replace />

  const quiz = mod.quiz

  const onScore = (score, passed) => {
    recordQuiz(quiz.id, score, quiz.threshold)
    if (passed) {
      const payload = completeModuleWithRewards(mod.id, {
        id: `badge-${mod.id}`,
        title: mod.title,
      })
      navigate('/celebrate', {
        state: {
          kind: 'module',
          title: mod.title,
          badgeTitle: mod.title,
          badgeId: mod.id,
          xpGained: payload.xpGained,
          leveledUp: payload.leveledUp,
          levelName: payload.levelName,
          moduleId: mod.id,
        },
        replace: true,
      })
    }
  }

  // Only the fail path reaches the result actions (pass navigates away).
  const resultActions = (_result, retake) => (
    <>
      <button className="btn" onClick={retake}>{t('quiz.retake')}</button>
      <button className="btn ghost" onClick={() => navigate(`/learn/${mod.id}`)}>
        {t('quiz.backToModule')}
      </button>
    </>
  )

  return <QuizRunner quiz={quiz} onScore={onScore} renderResultActions={resultActions} />
}
