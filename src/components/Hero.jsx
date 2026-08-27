import { useI18n } from '../i18n/LanguageContext.jsx'
import { site } from '../data/site.js'
import './Hero.css'

export default function Hero() {
  const { t } = useI18n()
  return (
    <section className="hero" id="top">
      <div className="container hero__inner">
        <p className="hero__role">{t('hero.role')}</p>
        <h1 className="hero__title">{t('hero.title')}</h1>
        <p className="hero__tagline">{t('hero.tagline')}</p>
        <div className="hero__cta">
          <a className="btn btn--primary" href="#projects">
            {t('hero.ctaProjects')}
          </a>
          <a className="btn btn--ghost" href="#contact">
            {t('hero.ctaContact')}
          </a>
          <a
            className="btn btn--ghost"
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('hero.ctaLinkedin')}
          </a>
        </div>
      </div>
      <div className="hero__grid" aria-hidden="true" />
    </section>
  )
}
