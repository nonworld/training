// A lineup of NON bottles for the lessons: the six at a glance, or a subset
// (the sparkling four, the still two). Uses the official product shots; the
// white image ground multiply-blends into the card. Each bottle is labelled
// with its code and format.
import { useStore } from '../state/store.jsx'
import { getSkus } from '../content/registry.js'

export default function SkuLineup({ ids, caption }) {
  const { state } = useStore()
  const all = getSkus(state.lang)
  const skus = (ids || all.map((s) => s.id))
    .map((id) => all.find((s) => s.id === id))
    .filter(Boolean)

  return (
    <figure className="lineup">
      <div className={`lineup-grid count-${skus.length}`}>
        {skus.map((s) => (
          <div key={s.id} className="lineup-item">
            {s.image && (
              <img className="lineup-bottle" src={s.image} alt={`${s.code} ${s.name}`} loading="lazy" />
            )}
            <span className="lineup-code">{s.code}</span>
            <span className="lineup-format">{s.format}</span>
          </div>
        ))}
      </div>
      {caption && <figcaption className="lineup-caption">{caption}</figcaption>}
    </figure>
  )
}
