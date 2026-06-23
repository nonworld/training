// Scoring contract for mixed quiz/exam item types. Each item yields points so a
// performance task can be weighted more than a recall question. Choice items are
// worth 1, so existing choice-only quizzes score exactly as before.
//
// Answer value shapes:
//   choice: { choice: <optionIndex> }
//   menu:   { picks: { [courseId]: skuId }, reasons: { [courseId]: text } }
//   list:   { gap: <optionIndex>, picks: [skuId, ...], reasons: { ... } }

export function isAnswered(item, v) {
  if (!v) return false
  if (item.type === 'menu') return item.menu.courses.every((c) => Boolean(v.picks?.[c.id]))
  if (item.type === 'list') {
    return v.gap != null && (v.picks?.length || 0) === item.pick.count
  }
  return v.choice != null
}

export function scoreItem(item, v) {
  if (item.type === 'menu') {
    const possible = item.menu.courses.length
    const earned = item.menu.courses.filter((c) => c.accept.includes(v?.picks?.[c.id])).length
    return { earned, possible, full: earned === possible }
  }
  if (item.type === 'list') {
    const gapOk = v?.gap === item.gap.answer ? 1 : 0
    const picks = v?.picks || []
    const skuOk = picks.filter((p) => item.pick.accept.includes(p)).length
    const earned = gapOk + Math.min(skuOk, item.pick.count)
    const possible = 1 + item.pick.count
    return { earned, possible, full: earned === possible }
  }
  const earned = v?.choice === item.answer ? 1 : 0
  return { earned, possible: 1, full: earned === 1 }
}
