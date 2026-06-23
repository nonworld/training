// Badge glyphs: simple SVG line icons in the NON palette, replacing the earlier
// emoji (which broke the no-emoji brand rule and looked off on the shareable
// certification card). Module glyphs draw in currentColor; certification seals
// draw in NON raspberry. One glyph per module/cert, some shared by kind.

const MAP = {
  // shared core
  'brand-story': 'book',
  'product-foundation': 'glass',
  'product-pairing': 'glass',
  'category-context': 'chart',
  // rep track
  'rep-list-placement': 'doc',
  'rep-reading-program': 'search',
  'rep-objections': 'shield',
  'rep-distributor': 'box',
  'rep-account-planning': 'pin',
  // venue track
  'venue-recommending': 'plate',
  'venue-trade-up': 'arrow',
  'venue-serve-ritual': 'glass',
  'venue-pairing-menu': 'plate',
  'venue-sceptical-guest': 'chat',
  // certifications
  'cert-venue': 'seal',
  'cert-rep': 'seal',
}

const GLYPHS = {
  book: (
    <>
      <path d="M4 5a2 2 0 0 1 2-2h6v16H6a2 2 0 0 0-2 2V5Z" />
      <path d="M20 5a2 2 0 0 0-2-2h-6v16h6a2 2 0 0 1 2 2V5Z" />
    </>
  ),
  glass: (
    <>
      <path d="M7 3h10l-1 7a4 4 0 0 1-8 0L7 3Z" />
      <line x1="12" y1="14" x2="12" y2="20" />
      <line x1="8" y1="21" x2="16" y2="21" />
    </>
  ),
  chart: (
    <>
      <polyline points="4 16 9 11 13 14 20 6" />
      <polyline points="20 10 20 6 16 6" />
    </>
  ),
  doc: (
    <>
      <rect x="6" y="3" width="12" height="18" rx="1.5" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <line x1="20" y1="20" x2="15.5" y2="15.5" />
    </>
  ),
  shield: <path d="M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6l7-3Z" />,
  box: (
    <>
      <path d="M3 7l9-4 9 4-9 4-9-4Z" />
      <path d="M3 7v10l9 4 9-4V7" />
      <line x1="12" y1="11" x2="12" y2="21" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6 7-12a7 7 0 1 0-14 0c0 6 7 12 7 12Z" />
      <circle cx="12" cy="9" r="2.5" />
    </>
  ),
  plate: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3.5" />
    </>
  ),
  arrow: (
    <>
      <line x1="12" y1="20" x2="12" y2="5" />
      <polyline points="6 11 12 5 18 11" />
    </>
  ),
  chat: <path d="M4 5h16v11H9l-5 4V5Z" />,
  seal: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8l1.2 2.6 2.8.3-2.1 1.9.6 2.8L12 14.8 9.5 16l.6-2.8L8 11.3l2.8-.3L12 8Z" />
    </>
  ),
}

export function BadgeGlyph({ id, size = 34 }) {
  const key = MAP[id] || 'seal'
  const isSeal = key === 'seal'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={isSeal ? 'var(--non-accent)' : 'currentColor'}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {GLYPHS[key]}
    </svg>
  )
}
