// Per-module formative knowledge check. Wraps the shared QuizRunner and records
// the result. Passing the quiz completes the module.
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import QuizRunner from '../components/QuizRunner.jsx'
import { useStore } from '../state/store.jsx'
import { getModule } from '../content/registry.js'

export default function Quiz() {
  const { moduleId } = useParams()
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { state, recordQuiz, completeModule } = useStore()

  const mod = getModule(state.lang, moduleId)
  if (!mod || mod.status !== 'ready') return <Navigate to="/home" replace />

  const quiz = mod.quiz

  const onScore = (score, passed) => {
    recordQuiz(quiz.id, score, quiz.threshold)
    if (passed) completeModule(mod.id)
  }

  const resultActions = ({ passed }, retake) => (
    <>
      {passed ? (
        <button className="btn" onClick={() => navigate('/certification')}>
          {t('home.certification')}
        </button>
      ) : (
        <button className="btn" onClick={retake}>{t('quiz.retake')}</button>
      )}
      <button className="btn ghost" onClick={() => navigate(`/learn/${mod.id}`)}>
        {t('quiz.backToModule')}
      </button>
    </>
  )

  return <QuizRunner quiz={quiz} onScore={onScore} renderResultActions={resultActions} />
}
