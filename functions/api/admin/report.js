// Internal admin report for Aaron + Ben. Returns participation grouped by
// region (market) and venue, read from D1. Gated by a shared bearer token held
// in the ADMIN_TOKEN secret. Read-only (GET).
//
// Set the token once (only you know the value):
//   CLOUDFLARE_ACCOUNT_ID=701d3513ccebc11ce8a329597b567059 \
//   npx wrangler pages secret put ADMIN_TOKEN --project-name non-academy
export async function onRequestGet(context) {
  const { request, env } = context
  if (!env.DB) return json({ ok: false, reason: 'data capture not configured' }, 501)
  if (!env.ADMIN_TOKEN) return json({ ok: false, reason: 'admin not configured' }, 501)

  const auth = request.headers.get('authorization') || ''
  const token = auth.replace(/^Bearer\s+/i, '')
  if (token !== env.ADMIN_TOKEN) return json({ ok: false, reason: 'unauthorised' }, 401)

  try {
    const { results } = await env.DB.prepare(
      `SELECT
         COALESCE(NULLIF(TRIM(l.market), ''), '(no region)') AS region,
         COALESCE(NULLIF(TRIM(l.venue), ''), '(no venue)') AS venue,
         COUNT(DISTINCT l.email) AS learners,
         COUNT(DISTINCT c.email) AS certified,
         COUNT(DISTINCT mc.id) AS modules_completed
       FROM learners l
       LEFT JOIN events c ON c.email = l.email AND c.type = 'certified'
       LEFT JOIN events mc ON mc.email = l.email AND mc.type = 'module_completed'
       GROUP BY region, venue
       ORDER BY region, venue`,
    ).all()

    const rows = results || []
    const totals = rows.reduce(
      (a, r) => ({
        learners: a.learners + r.learners,
        certified: a.certified + r.certified,
        modules_completed: a.modules_completed + r.modules_completed,
      }),
      { learners: 0, certified: 0, modules_completed: 0 },
    )
    return json({ ok: true, rows, totals, generatedAt: new Date().toISOString() })
  } catch (err) {
    return json({ ok: false, reason: String(err) }, 500)
  }
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json', 'cache-control': 'no-store' },
  })
}
