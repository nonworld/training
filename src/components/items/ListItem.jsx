// Performance task: read an (unseen) beverage list, identify the gap, then pick
// the SKUs to pitch with a reason. Gap is graded against the answer; SKU picks
// against an accepted set; the reason is captured and shown back. Controlled.
import { useStore } from '../../state/store.jsx'
import { getSkus } from '../../content/registry.js'

export default function ListItem({ item, value, onChange, revealed }) {
  const { state } = useStore()
  const skus = getSkus(state.lang)
  const gap = value?.gap
  const picks = value?.picks || []
  const reason = value?.reason || ''

  const setGap = (idx) => onChange({ gap: idx, picks, reason })
  const togglePick = (skuId) => {
    let next
    if (picks.includes(skuId)) next = picks.filter((p) => p !== skuId)
    else if (picks.length < item.pick.count) next = [...picks, skuId]
    else next = [...picks.slice(1), skuId] // replace oldest when at limit
    onChange({ gap, picks: next, reason })
  }
  const setReason = (text) => onChange({ gap, picks, reason: text })

  return (
    <div className="task">
      {item.list.name && <p className="task-source">{item.list.name}</p>}
      <ul className="task-list">
        {item.list.lines.map((line, i) => (
          <li key={i}>{line}</li>
        ))}
      </ul>

      <p className="task-q">{item.gap.prompt}</p>
      <div className="stack">
        {item.gap.options.map((opt, oi) => {
          let cls = 'opt'
          if (revealed) {
            if (oi === item.gap.answer) cls += ' correct'
            else if (oi === gap) cls += ' wrong'
          } else if (oi === gap) cls += ' picked'
          return (
            <button key={oi} className={cls} disabled={revealed} onClick={() => setGap(oi)}>
              {opt}
            </button>
          )
        })}
      </div>

      <p className="task-q">{item.pick.prompt} ({picks.length}/{item.pick.count})</p>
      <div className="sku-choice">
        {skus.map((s) => {
          const on = picks.includes(s.id)
          const good = revealed && on && item.pick.accept.includes(s.id)
          const bad = revealed && on && !item.pick.accept.includes(s.id)
          return (
            <button
              key={s.id}
              className={`sku-pill ${on ? 'on' : ''} ${good ? 'good' : ''} ${bad ? 'bad' : ''}`}
              disabled={revealed}
              onClick={() => togglePick(s.id)}
            >
              {s.code}
            </button>
          )
        })}
      </div>
      <input
        className="field task-reason"
        placeholder={item.reasonPrompt || 'Why these?'}
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        disabled={revealed}
        maxLength={140}
      />
      {revealed && (
        <p className="task-accept">Sound picks: {item.pick.accept.join(', ')}</p>
      )}
    </div>
  )
}
