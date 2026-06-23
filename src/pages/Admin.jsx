// Internal admin dashboard for Aaron + Ben. Not part of the learner app and not
// linked from it. Enter the shared access token to pull live participation from
// D1, grouped by region and venue, with a region filter. English only.
import { useState } from 'react'

import Logotype from '../components/Logotype.jsx'

export default function Admin() {
  const [token, setToken] = useState(sessionStorage.getItem('non-admin-token') || '')
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [region, setRegion] = useState('all')

  const load = async () => {
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/admin/report', {
        headers: { authorization: `Bearer ${token}` },
      })
      const body = await res.json()
      if (!res.ok || !body.ok) {
        setError(body.reason === 'unauthorised' ? 'Wrong access token.' : body.reason || 'Failed to load.')
        setData(null)
      } else {
        sessionStorage.setItem('non-admin-token', token)
        setData(body)
      }
    } catch {
      setError('Could not reach the server.')
    }
    setLoading(false)
  }

  const regions = data ? ['all', ...Array.from(new Set(data.rows.map((r) => r.region)))] : ['all']
  const rows = data ? data.rows.filter((r) => region === 'all' || r.region === region) : []

  return (
    <div className="shell">
      <header className="appbar">
        <Logotype height={18} />
        <span className="eyebrow" style={{ margin: 0 }}>Admin</span>
      </header>
      <main className="page">
        <h1>Participation</h1>
        <p className="lede">Live completion by region and venue, from the training data.</p>

        <div className="form-stack" style={{ marginTop: 8 }}>
          <label className="field-label" htmlFor="adm-token">Access token</label>
          <input
            id="adm-token"
            className="field"
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste the admin token"
            onKeyDown={(e) => e.key === 'Enter' && load()}
          />
          <button className="btn" style={{ marginTop: 12 }} disabled={!token || loading} onClick={load}>
            {loading ? 'Loading…' : 'Load report'}
          </button>
          {error && <p className="field-error">{error}</p>}
        </div>

        {data && (
          <>
            <div className="divider" />
            <div className="card-row" style={{ marginBottom: 12 }}>
              <div>
                <span className="topbar-v">{data.totals.learners}</span>{' '}
                <span className="muted">learners</span> ·{' '}
                <span className="topbar-v">{data.totals.certified}</span>{' '}
                <span className="muted">certified</span>
              </div>
            </div>

            <label className="field-label" htmlFor="adm-region">Region</label>
            <select
              id="adm-region"
              className="field"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              style={{ marginBottom: 16 }}
            >
              {regions.map((r) => (
                <option key={r} value={r}>{r === 'all' ? 'All regions' : r}</option>
              ))}
            </select>

            <table className="report">
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Venue</th>
                  <th className="num">Learners</th>
                  <th className="num">Certified</th>
                  <th className="num">Modules</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i}>
                    <td>{r.region}</td>
                    <td>{r.venue}</td>
                    <td className="num">{r.learners}</td>
                    <td className="num">{r.certified}</td>
                    <td className="num">{r.modules_completed}</td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr><td colSpan={5} className="muted">No data yet.</td></tr>
                )}
              </tbody>
            </table>
            <p className="muted" style={{ fontSize: 12, marginTop: 12 }}>
              Generated {data.generatedAt}
            </p>
          </>
        )}
      </main>
    </div>
  )
}
