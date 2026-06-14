// Optional Cloudflare Pages Function: persist certification records.
// Disabled until a KV namespace is bound (see wrangler.toml). Until then this
// returns 501 and the app keeps its local record — nothing breaks.
//
// To enable:
//   1. wrangler kv namespace create NON_ACADEMY_PROGRESS
//   2. Uncomment the [[kv_namespaces]] binding (named PROGRESS) in wrangler.toml
//   3. Redeploy. Records key on an anonymous client id you add to the body.
export async function onRequestPost(context) {
  const { request, env } = context
  if (!env.PROGRESS) {
    return new Response(
      JSON.stringify({ ok: false, reason: 'persistence not configured' }),
      { status: 501, headers: { 'content-type': 'application/json' } },
    )
  }
  try {
    const body = await request.json()
    const { role, date, clientId } = body
    if (!role || !clientId) {
      return new Response(JSON.stringify({ ok: false, reason: 'missing fields' }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      })
    }
    const key = `cert:${clientId}:${role}`
    await env.PROGRESS.put(key, JSON.stringify({ role, date }))
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'content-type': 'application/json' },
    })
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, reason: String(err) }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}
