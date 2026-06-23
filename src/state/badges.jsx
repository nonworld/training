// Badge glyphs. Per Aaron's call, these are emoji again (overriding the audit's
// no-emoji recommendation). Kept behind the BadgeGlyph component + `id` prop so
// the call sites (celebration, certification) are unchanged, and so this can be
// swapped back to SVG line glyphs later by editing only this file.
const EMOJI = {
  // shared core
  'brand-story': '📖',
  'product-foundation': '🍷',
  'product-pairing': '🥂',
  'category-context': '📈',
  // rep track
  'rep-list-placement': '📝',
  'rep-reading-program': '📋',
  'rep-objections': '🤝',
  'rep-distributor': '📦',
  'rep-account-planning': '🗺️',
  // venue track
  'venue-recommending': '🍽️',
  'venue-trade-up': '⬆️',
  'venue-serve-ritual': '🥂',
  'venue-pairing-menu': '🧀',
  'venue-sceptical-guest': '💬',
  // certifications
  'cert-venue': '🏅',
  'cert-rep': '🎖️',
}

export function badgeEmoji(id) {
  return EMOJI[id] || '🏅'
}

export function BadgeGlyph({ id, size = 34 }) {
  return (
    <span className="badge-glyph" style={{ fontSize: size }} role="img" aria-hidden="true">
      {badgeEmoji(id)}
    </span>
  )
}
