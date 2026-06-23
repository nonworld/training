// Standard i18next setup for UI labels.
// One resource file per language under ./locales. English is the base; every
// other language falls back to English per-key until a human translates it.
// The active language is also persisted into progress state (see store.js) so it
// holds across sessions and across both tracks and the quick-reference mode.
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { LANGUAGES, DEFAULT_LANG } from './languages.js'
import en from './locales/en.js'
import de from './locales/de.js'
import fr from './locales/fr.js'
import es from './locales/es.js'
import ja from './locales/ja.js'
import ko from './locales/ko.js'
import nl from './locales/nl.js'
import nlBE from './locales/nl-BE.js'
import pl from './locales/pl.js'
import th from './locales/th.js'
import zh from './locales/zh.js'

const resources = {
  en: { translation: en },
  de: { translation: de },
  fr: { translation: fr },
  es: { translation: es },
  ja: { translation: ja },
  ko: { translation: ko },
  nl: { translation: nl },
  'nl-BE': { translation: nlBE },
  pl: { translation: pl },
  th: { translation: th },
  zh: { translation: zh },
}

export function initI18n(initialLang) {
  const lng = LANGUAGES.some((l) => l.code === initialLang)
    ? initialLang
    : DEFAULT_LANG
  i18n.use(initReactI18next).init({
    resources,
    lng,
    fallbackLng: DEFAULT_LANG,
    interpolation: { escapeValue: false },
    returnEmptyString: false,
  })
  return i18n
}

export default i18n
