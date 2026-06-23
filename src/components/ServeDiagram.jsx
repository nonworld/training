// Serve & glassware diagram: a wine glass filled to a sensible pour line, with
// the NON serve guidance (a wine glass, chilled). Line-art SVG in the brand
// palette, raspberry accent for the fill. Teaches the ritual at a glance.
import { useTranslation } from 'react-i18next'

export default function ServeDiagram() {
  const { t } = useTranslation()
  return (
    <figure className="diagram">
      <svg viewBox="0 0 240 200" className="diagram-svg" role="img" aria-label="Serve in a chilled wine glass">
        {/* wine glass: bowl, stem, base */}
        <path
          d="M70 28 h100 a8 8 0 0 1 8 9 c-2 46 -26 70 -58 74 v44 h26 a3 3 0 0 1 3 3 H61 a3 3 0 0 1 3 -3 h26 v-44 c-32 -4 -56 -28 -58 -74 a8 8 0 0 1 8 -9 Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* pour line + fill (about a third, served chilled) */}
        <path
          d="M44 78 c8 26 28 40 76 40 s68 -14 76 -40 a8 8 0 0 0 0 0 c-3 8 -8 14 -14 18 H58 c-6 -4 -11 -10 -14 -18 Z"
          fill="var(--non-accent)"
          opacity="0.85"
        />
        <line x1="44" y1="78" x2="196" y2="78" stroke="var(--non-accent)" strokeWidth="2.5" strokeDasharray="2 5" opacity="0.7" />
      </svg>
      <figcaption className="diagram-caption">
        <span className="diagram-pill">{t('diagram.glass')}</span>
        <span className="diagram-pill">{t('diagram.chilled')}</span>
        <span className="diagram-pill">{t('diagram.pour')}</span>
      </figcaption>
    </figure>
  )
}
