// App shell: sticky appbar with the NON logotype, an optional back affordance,
// and the always-available language switcher. Wraps every routed page.
import { useLocation, useNavigate } from 'react-router-dom'

import Logotype from './Logotype.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'

export default function AppShell({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const atRoot = location.pathname === '/' || location.pathname === '/home'

  return (
    <div className="shell">
      <header className="appbar">
        <div className="appbar-left">
          {!atRoot && (
            <button className="appbar-back" onClick={() => navigate(-1)} aria-label="Back">
              ‹
            </button>
          )}
          <button
            onClick={() => navigate('/home')}
            style={{ background: 'transparent', border: 0, padding: 0, cursor: 'pointer' }}
            aria-label="NON Academy home"
          >
            <Logotype height={18} />
          </button>
        </div>
        <LanguageSwitcher />
      </header>
      <main className="page">{children}</main>
    </div>
  )
}
