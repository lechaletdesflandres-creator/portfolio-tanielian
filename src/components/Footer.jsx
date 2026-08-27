import { useI18n } from '../i18n/LanguageContext.jsx'
import './Footer.css'

export default function Footer() {
  const { t } = useI18n()
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div>
          <p className="footer__name">Norayr Tanielian</p>
          <p className="footer__tagline">{t('footer.tagline')}</p>
        </div>
        <div className="footer__meta">
          <p>{t('footer.built')}</p>
          <p className="footer__rights">© {year} Norayr Tanielian. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  )
}
