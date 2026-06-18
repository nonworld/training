// One coherent gamification layer. All XP values, level thresholds and streak
// rules live here so the mechanics stay consistent across the app rather than
// being scattered through components.

// XP awarded per meaningful action. Each is deduped in the store so XP cannot
// be farmed by repeating an action.
export const XP = {
  SEGMENT: 10, // viewing a learning segment to the end
  QUIZ_CORRECT: 5, // each quiz question answered correctly (first time)
  MODULE: 50, // completing a module (passing its quiz)
  CERT: 200, // earning a role certification
  FLASHCARD: 3, // grading a flashcard "got it" (first time per card)
  PRECHECK: 5, // completing a module pre-check
}

// Levels unlock as cumulative XP accrues. Each entry is the XP required to
// reach that level. Names give each tier a sense of progression in NON voice.
export const LEVELS = [
  { level: 1, at: 0, name: 'Taster' },
  { level: 2, at: 80, name: 'Apprentice' },
  { level: 3, at: 200, name: 'Pourer' },
  { level: 4, at: 400, name: 'Server' },
  { level: 5, at: 700, name: 'Specialist' },
  { level: 6, at: 1100, name: 'Sommelier' },
  { level: 7, at: 1600, name: 'Master' },
]

// Resolve XP to a level plus progress into the next one (for the top bar).
export function levelInfo(xp) {
  let current = LEVELS[0]
  for (const l of LEVELS) if (xp >= l.at) current = l
  const next = LEVELS.find((l) => l.at > current.at && xp < l.at) || null
  const floor = current.at
  const ceil = next ? next.at : current.at
  const span = ceil - floor
  const into = xp - floor
  const pct = next ? Math.round((into / span) * 100) : 100
  return { ...current, next, into, span, pct, atMax: !next }
}

// Date helpers for streaks. Local app code, so Date is fine here.
export function today() {
  return new Date().toISOString().slice(0, 10)
}
function daysBetween(a, b) {
  const da = new Date(a + 'T00:00:00')
  const db = new Date(b + 'T00:00:00')
  return Math.round((db - da) / 86400000)
}

// Given the stored streak and "now", return the updated streak. A visit on the
// next calendar day extends it; a gap resets it to 1; same day is a no-op.
export function advanceStreak(streak, now = today()) {
  if (!streak.lastActive) return { current: 1, longest: 1, lastActive: now }
  const gap = daysBetween(streak.lastActive, now)
  if (gap <= 0) return streak // same day, no change
  const current = gap === 1 ? streak.current + 1 : 1
  const longest = Math.max(streak.longest || 0, current)
  return { current, longest, lastActive: now }
}
