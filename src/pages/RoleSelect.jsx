// Role selector — the entry point. Routes to the right track. Product knowledge
// is shared; the skills are role-specific. Also reachable later via "Change role".
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import Logotype from '../components/Logotype.jsx'
import LanguageSwitcher from '../components/LanguageSwitcher.jsx'
import TranslateBanner from '../components/TranslateBanner.jsx'
import { useStore } from '../state/store.jsx'

export default function RoleSelect() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  const { setRole } = useStore()

  const choose = (role) => {
    setRole(role)
    navigate('/home')
  }

  return (
    <div className="shell">
      <header className="appbar">
        <Logotype height={18} />
        <LanguageSwitcher />
      </header>
      <main className="page">
        <p className="eyebrow">{t('app.name')}</p>
        <h1>{t('role.title')}</h1>
        <p className="lede">{t('role.intro')}</p>
        <TranslateBanner />

        <div className="stack" style={{ marginTop: 8 }}>
          <button className="card role-card" onClick={() => choose('venue')}>
            <div className="card-row">
              <h2 style={{ margin: 0 }}>{t('role.venue')}</h2>
              <span className="card-chev">›</span>
            </div>
            <p style={{ margin: '8px 0 0' }}>{t('role.venueBlurb')}</p>
          </button>

          <button className="card role-card" onClick={() => choose('rep')}>
            <div className="card-row">
              <h2 style={{ margin: 0 }}>{t('role.rep')}</h2>
              <span className="card-chev">›</span>
            </div>
            <p style={{ margin: '8px 0 0' }}>{t('role.repBlurb')}</p>
          </button>
        </div>

        <p className="muted center" style={{ marginTop: 20, fontSize: 13 }}>
          {t('role.shared')}
        </p>
      </main>
    </div>
  )
}
