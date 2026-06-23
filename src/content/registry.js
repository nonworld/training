// Course-content registry. Maps a language code to its content module.
// Untranslated locales re-export English (see the stub files), so the app is
// always usable. Adding a market = add a content file and one line here, plus an
// entry in i18n/languages.js. Nothing in the components changes.
import en from './en.js'
import de from './de.js'
import fr from './fr.js'
import es from './es.js'
import ja from './ja.js'
import ko from './ko.js'
import nl from './nl.js'
import nlBE from './nl-BE.js'
import pl from './pl.js'
import th from './th.js'

const REGISTRY = { en, de, fr, es, ja, ko, nl, 'nl-BE': nlBE, pl, th }

export function getContent(code) {
  return REGISTRY[code] || en
}

// Convenience selectors used across pages.
export function getModules(code) {
  return getContent(code).modules
}
export function getModule(code, id) {
  return getContent(code).modules.find((m) => m.id === id) || null
}
export function getSkus(code) {
  return getContent(code).skus
}
export function getSku(code, id) {
  return getContent(code).skus.find((s) => s.id === id) || null
}
export function getCertification(code, role) {
  return getContent(code).certifications[role] || null
}
export function getModulesForRole(code, role) {
  // Shared core is shown to everyone; the role track is appended.
  return getModules(code).filter((m) => m.track === 'shared' || m.track === role)
}

// Spaced SKU recall, authored once in en.js as `skuRecallBank`. Returns a stable
// subset of `count` questions, offset per module so different modules surface
// different questions. Shaped as a quiz for QuizRunner.
export function getSkuRecall(code, moduleId, count = 3) {
  const bank = getContent(code).skuRecallBank || []
  if (bank.length === 0) return null
  const offset = [...moduleId].reduce((a, c) => a + c.charCodeAt(0), 0) % bank.length
  const questions = Array.from({ length: Math.min(count, bank.length) }, (_, k) => bank[(offset + k) % bank.length])
  return { id: `recall-${moduleId}`, threshold: 0, questions }
}
