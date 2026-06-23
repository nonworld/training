// Cloudflare Pages Function: capture learner participation into D1.
// POST /api/events  { learner: {email, name, role, market, venue, consent}, events: [{id,type,meta,ts}] }
//
// Idempotent: events use client-generated ids and INSERT OR IGNORE, so the
// client can safely resend its whole funnel. Disabled (501) until the D1
// database is bound as `DB` (see wrangler.toml + schema.sql). Requires consent.
export async function onRequestPost(context) {
  const { request, env } = context
  if (!env.DB) {
    return json({ ok: false, reason: 'data capture not configured' }, 501)
  }

  let body
  try {
    body = await request.json()
  } catch {
    return json({ ok: false, reason: 'invalid json' }, 400)
  }

  const learner = body?.learner || {}
  const email = String(learner.email || '').trim().toLowerCase()
  if (!email || !learner.consent) {
    return json({ ok: false, reason: 'email and consent required' }, 400)
  }

  const now = new Date().toISOString()

  try {
    await env.DB.prepare(
      `INSERT INTO learners (email, name, role, market, venue, consent, created_at, updated_at)
       VALUES (?1, ?2, ?3, ?4, ?5, 1, ?6, ?6)
       ON CONFLICT(email) DO UPDATE SET
         name = excluded.name,
         role = excluded.role,
         market = excluded.market,
         venue = excluded.venue,
         consent = 1,
         updated_at = excluded.updated_at`,
    )
      .bind(
        email,
        learner.name || null,
        learner.role || null,
        learner.market || null,
        learner.venue || null,
        now,
      )
      .run()

    const events = Array.isArray(body.events) ? body.events.filter((e) => e && e.id) : []
    if (events.length) {
      const stmt = env.DB.prepare(
        `INSERT OR IGNORE INTO events (id, email, type, meta, ts) VALUES (?1, ?2, ?3, ?4, ?5)`,
      )
      await env.DB.batch(
        events.map((e) =>
          stmt.bind(
            String(e.id),
            email,
            e.type || 'unknown',
            e.meta ? JSON.stringify(e.meta) : null,
            e.ts || now,
          ),
        ),
      )
    }

    return json({ ok: true, events: events.length })
  } catch (err) {
    return json({ ok: false, reason: String(err) }, 500)
  }
}

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json' },
  })
}
