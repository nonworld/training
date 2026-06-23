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
// `flag` is the emoji shown beside each language in the switcher.
export const LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧', translated: true, dir: 'ltr' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪', translated: false, dir: 'ltr' },
  { code: 'fr', label: 'Français', flag: '🇫🇷', translated: false, dir: 'ltr' },
  { code: 'es', label: 'Español', flag: '🇪🇸', translated: false, dir: 'ltr' },
  { code: 'ja', label: '日本語', flag: '🇯🇵', translated: false, dir: 'ltr' },
  { code: 'ko', label: '한국어', flag: '🇰🇷', translated: false, dir: 'ltr' },
  { code: 'nl', label: 'Nederlands', flag: '🇳🇱', translated: false, dir: 'ltr' },
  // "Belgium" added as Belgian Dutch (Flemish). Switch label/flag to Belgian
  // French if that is the intended market.
  { code: 'nl-BE', label: 'Nederlands (België)', flag: '🇧🇪', translated: false, dir: 'ltr' },
  { code: 'pl', label: 'Polski', flag: '🇵🇱', translated: false, dir: 'ltr' },
  { code: 'th', label: 'ไทย', flag: '🇹🇭', translated: false, dir: 'ltr' },
  { code: 'zh', label: '简体中文', flag: '🇨🇳', translated: false, dir: 'ltr' },
]

export const DEFAULT_LANG = 'en'

export const isTranslated = (code) =>
  LANGUAGES.find((l) => l.code === code)?.translated ?? false
