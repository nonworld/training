import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'

import App from './App.jsx'
import { StoreProvider } from './state/store.jsx'
import { initI18n } from './i18n/index.js'
import { DEFAULT_LANG } from './i18n/languages.js'

import './styles/theme.css'
import './styles/components.css'

// Read the persisted language before first paint so the UI renders in the right
// language with no flash. (Same key the store uses.)
function persistedLang() {
  try {
    const raw = localStorage.getItem('non-academy:v1')
    return raw ? JSON.parse(raw).lang || DEFAULT_LANG : DEFAULT_LANG
  } catch {
    return DEFAULT_LANG
  }
}

const i18n = initI18n(persistedLang())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <I18nextProvider i18n={i18n}>
      <StoreProvider>
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <App />
        </BrowserRouter>
      </StoreProvider>
    </I18nextProvider>
  </StrictMode>,
)
