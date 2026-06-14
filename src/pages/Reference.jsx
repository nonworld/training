// Quick-reference mode: the six SKU cards as on-shift cheat sheets. Glassware,
// serve temperature, pairings, tasting note. Offline-readable (static content,
// cached assets). After certification this is the two-tap shift companion.
//
// Draft product specifics carry a visible DRAFT badge until Aaron supplies the
// approved copy.
import { useTranslation } from 'react-i18next'

import TranslateBanner from '../components/TranslateBanner.jsx'
import { useStore } from '../state/store.jsx'
import { getSkus } from '../content/registry.js'

function Field({ label, children, draft }) {
  return (
    <div className="sku-field">
      <p className="sku-field-label">
        {label}
        {draft && <span className="draft">Draft</span>}
      </p>
      <div className="sku-field-val">{children}</div>
    </div>
  )
}

export default function Reference() {
  const { t } = useTranslation()
  const { state, hasCertification } = useStore()
  const skus = getSkus(state.lang)
  const certified = hasCertification('venue') || hasCertification('rep')

  return (
    <>
      <p className="eyebrow">{t('nav.reference')}</p>
      <h1>{t('reference.allSkus')}</h1>
      <p className="lede">{t('reference.intro')}</p>
      <TranslateBanner />

      {!certified && (
        <div className="translate-note" style={{ borderColor: 'rgba(255,255,255,0.18)', color: 'var(--non-dim)', background: 'var(--non-raise)' }}>
          {t('reference.lockedBody')}
        </div>
      )}

      <div className="sku-grid">
        {skus.map((s) => (
          <article key={s.id} className="sku-card">
            <div className="sku-card-head">
              <span className="sku-code">{s.code}</span>
              <span className="chip">{s.format}</span>
            </div>
            <h2 className="sku-name">{s.name}</h2>

            <Field label={t('reference.tasting')} draft={s.draft}>
              {s.tasting}
            </Field>

            <div className="sku-two">
              <Field label={t('reference.glassware')} draft={s.draft}>
                {s.glassware}
              </Field>
              <Field label={t('reference.serveTemp')} draft={s.draft}>
                {s.serveTemp}
              </Field>
            </div>

            <Field label={t('reference.pairing')} draft={s.draft}>
              <div className="pair-row">
                {s.pairings.map((p) => (
                  <span key={p} className="chip">{p}</span>
                ))}
              </div>
            </Field>
          </article>
        ))}
      </div>
    </>
  )
}
