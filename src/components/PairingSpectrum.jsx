// Pairing weight-to-weight spectrum. The six SKUs ordered light-and-bright to
// full-and-structured, each with a food cue, on a vertical rail. Turns the
// abstract pairing principle into a picture you can scan. Food cues are drawn
// from NON's official pairings.
import { useTranslation } from 'react-i18next'

import { useStore } from '../state/store.jsx'
import { getSkus } from '../content/registry.js'

// Light -> structured, with a one-word food cue from the official pairings.
const ORDER = [
  { id: 'NON5', cue: 'Salads, curry' },
  { id: 'NON1', cue: 'Aperitif, cured meats' },
  { id: 'NON3', cue: 'Seafood, antipasti' },
  { id: 'NON2', cue: 'Cheese, mushrooms' },
  { id: 'NON7', cue: 'Charcuterie, chocolate' },
  { id: 'NON9', cue: 'Steak, ragù' },
]

export default function PairingSpectrum() {
  const { t } = useTranslation()
  const { state } = useStore()
  const all = getSkus(state.lang)

  return (
    <figure className="spectrum">
      <div className="spectrum-end top">{t('diagram.light')}</div>
      <ul className="spectrum-rail">
        {ORDER.map(({ id, cue }) => {
          const s = all.find((x) => x.id === id)
          if (!s) return null
          return (
            <li key={id} className="spectrum-row">
              <span className="spectrum-dot" aria-hidden="true" />
              <span className="spectrum-code">{s.code}</span>
              <span className="spectrum-cue">{cue}</span>
            </li>
          )
        })}
      </ul>
      <div className="spectrum-end bottom">{t('diagram.structured')}</div>
    </figure>
  )
}
