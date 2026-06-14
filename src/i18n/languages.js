// Launch languages for NON Academy.
// English is the fully-populated base. The rest are scaffolded stubs flagged for
// human translation — never machine-translated. Adding a market means adding one
// entry here plus one UI-label file and one content file; nothing else changes.
//
// `translated: false` makes the app fall back to English content and show a
// clear "awaiting translation" banner, so a half-finished locale is honest
// rather than broken.
//
// `dir` is reserved for future RTL markets (Arabic, Hebrew); none stubbed yet.
export const LANGUAGES = [
  { code: 'en', label: 'English', translated: true, dir: 'ltr' },
  { code: 'de', label: 'Deutsch', translated: false, dir: 'ltr' },
  { code: 'fr', label: 'Français', translated: false, dir: 'ltr' },
  { code: 'es', label: 'Español', translated: false, dir: 'ltr' },
  { code: 'ja', label: '日本語', translated: false, dir: 'ltr' },
]

export const DEFAULT_LANG = 'en'

export const isTranslated = (code) =>
  LANGUAGES.find((l) => l.code === code)?.translated ?? false
