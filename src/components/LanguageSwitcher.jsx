// Language switcher, reachable from the app shell on every screen including the
// quick-reference mode. Opens a thumb-friendly bottom sheet. The choice is
// written to progress state and to i18next, so it persists across sessions.
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LANGUAGES } from '../i18n/languages.js'
import { useStore } from '../state/store.jsx'

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false)
  const { state, setLang } = useStore()
  const { i18n, t } = useTranslation()
  const current = LANGUAGES.find((l) => l.code === state.lang) || LANGUAGES[0]

  const choose = (code) => {
    setLang(code)
    i18n.changeLanguage(code)
    setOpen(false)
  }

  return (
    <>
      <button
        className="lang-btn"
        onClick={() => setOpen(true)}
        aria-label={t('nav.language')}
        aria-haspopup="dialog"
      >
        <span aria-hidden="true" className="lang-globe">◌</span>
        <span className="lang-code">{current.code.toUpperCase()}</span>
      </button>

      {open && (
        <div className="sheet-scrim" onClick={() => setOpen(false)} role="presentation">
          <div
            className="sheet"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-label={t('nav.language')}
          >
            <div className="sheet-grip" />
            <p className="eyebrow">{t('nav.language')}</p>
            <ul className="list-reset">
              {LANGUAGES.map((l) => (
                <li key={l.code}>
                  <button
                    className={`lang-row ${l.code === state.lang ? 'active' : ''}`}
                    onClick={() => choose(l.code)}
                  >
                    <span className="lang-row-label">{l.label}</span>
                    <span className="lang-row-meta">
                      {!l.translated && <span className="draft">Untranslated</span>}
                      {l.code === state.lang && <span aria-hidden="true">✓</span>}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  )
}
