// App shell: sticky appbar with the NON logotype, optional back, a one-tap
// quick-reference link, and the always-available language switcher. Below it, a
// persistent progress top bar. Wraps every routed page.
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Logotype from './Logotype.jsx'
import LanguageSwitcher from './LanguageSwitcher.jsx'
import TopBar from './TopBar.jsx'
import { useStore } from '../state/store.jsx'

export default function AppShell({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { t } = useTranslation()
  const { state } = useStore()
  const atRoot = location.pathname === '/' || location.pathname === '/home'
  const onReference = location.pathname === '/reference'

  return (
    <div className="shell">
      <header className="appbar">
        <div className="appbar-left">
          {!atRoot && (
            <button className="appbar-back" onClick={() => navigate(-1)} aria-label={t('nav.back')}>
              ‹
            </button>
          )}
          <button className="appbar-logo" onClick={() => navigate('/home')} aria-label={t('nav.home')}>
            <Logotype height={18} />
          </button>
        </div>
        <div className="appbar-right">
          {state.role && !onReference && (
            <button
              className="appbar-ref"
              onClick={() => navigate('/reference')}
              aria-label={t('nav.reference')}
            >
              {t('nav.cards')}
            </button>
          )}
          <LanguageSwitcher />
        </div>
      </header>
      <TopBar />
      <main className="page">{children}</main>
    </div>
  )
}
