import { useI18n } from '../i18n/LanguageContext.jsx'
import './LanguageToggle.css'

export default function LanguageToggle() {
  const { lang, toggle, t } = useI18n()
  return (
    <button
      type="button"
      className="lang-toggle"
      onClick={toggle}
      aria-label={t('lang.switchTo')}
      title={t('lang.switchTo')}
    >
      <span className={lang === 'fr' ? 'is-active' : ''}>FR</span>
      <span className="lang-toggle__sep" aria-hidden="true">/</span>
      <span className={lang === 'en' ? 'is-active' : ''}>EN</span>
    </button>
  )
}
