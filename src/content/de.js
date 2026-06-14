// de course content — STUB / translation template.
// Currently re-exports the English content unchanged, so the app shows English
// as an honest fallback (NOT a machine translation) while this market awaits a
// human translator. This locale is flagged `translated: false` in
// i18n/languages.js, which drives the "awaiting translation" banner.
//
// To translate this market:
//   1. Replace the re-export below with a full copy of en.js's structure.
//   2. Translate every string. Keep the NON1–NON9 codes untouched.
//   3. Set `translated: true` for "de" in i18n/languages.js.
export { skus, modules, certifications, default } from './en.js'
