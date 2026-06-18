// Badge emoji per module and certification. Language-agnostic, so it lives here
// rather than in the per-language content files. Each module earns a distinct
// glyph so the reward feels specific, not generic. Adjust freely.
const BADGE_EMOJI = {
  // shared core
  'brand-story': '📖',
  'product-mastery': '🍷',
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
  return BADGE_EMOJI[id] || '🏅'
}
