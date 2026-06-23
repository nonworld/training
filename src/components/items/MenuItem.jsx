// Performance task: pair an (unseen) menu. For each course the learner picks one
// SKU and writes a one-line reason. The SKU choice is graded against the course's
// accepted set; the reason is the learner's articulation, captured and shown back
// in feedback. Controlled component: reports its answer up via onChange.
import { useStore } from '../../state/store.jsx'
import { getSkus } from '../../content/registry.js'

export default function MenuItem({ item, value, onChange, revealed }) {
  const { state } = useStore()
  const skus = getSkus(state.lang)
  const picks = value?.picks || {}
  const reasons = value?.reasons || {}

  const setPick = (courseId, skuId) =>
    onChange({ picks: { ...picks, [courseId]: skuId }, reasons })
  const setReason = (courseId, text) =>
    onChange({ picks, reasons: { ...reasons, [courseId]: text } })

  return (
    <div className="task">
      {item.menu.name && <p className="task-source">{item.menu.name}</p>}
      {item.menu.courses.map((c) => {
        const picked = picks[c.id]
        const ok = revealed && c.accept.includes(picked)
        return (
          <div key={c.id} className={`task-course ${revealed ? (ok ? 'ok' : 'no') : ''}`}>
            <p className="task-course-label">{c.course}</p>
            <p className="task-dish">{c.dish}</p>
            <div className="sku-choice">
              {skus.map((s) => (
                <button
                  key={s.id}
                  className={`sku-pill ${picked === s.id ? 'on' : ''}`}
                  disabled={revealed}
                  onClick={() => setPick(c.id, s.id)}
                >
                  {s.code}
                </button>
              ))}
            </div>
            <input
              className="field task-reason"
              placeholder={item.reasonPrompt || 'Why this pour?'}
              value={reasons[c.id] || ''}
              onChange={(e) => setReason(c.id, e.target.value)}
              disabled={revealed}
              maxLength={120}
            />
            {revealed && (
              <p className="task-accept">
                Sound choices: {c.accept.join(', ')}
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}
