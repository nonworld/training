// Shows when the active language is a flagged stub. Honest about the fallback:
// English is being shown because this market is not translated yet.
import { useTranslation } from 'react-i18next'

import { isTranslated } from '../i18n/languages.js'
import { useStore } from '../state/store.jsx'

export default function TranslateBanner() {
  const { state } = useStore()
  const { t } = useTranslation()
  if (isTranslated(state.lang)) return null
  return <div className="translate-note">{t('common.untranslated')}</div>
}
