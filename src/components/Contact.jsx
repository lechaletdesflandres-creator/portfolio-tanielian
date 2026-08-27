import { useI18n } from '../i18n/LanguageContext.jsx'
import { site } from '../data/site.js'
import Reveal from './Reveal.jsx'
import './Contact.css'

export default function Contact() {
  const { t } = useI18n()
  return (
    <section className="section section--alt" id="contact">
      <div className="container">
        <Reveal className="section__head">
          <span className="section__eyebrow">{t('contact.eyebrow')}</span>
          <h2 className="section__title">{t('contact.title')}</h2>
          <p className="section__lead">{t('contact.lead')}</p>
        </Reveal>

        <Reveal className="contact__cards">
          <a className="contact__card" href={`mailto:${site.email}`}>
            <span className="contact__label">{t('contact.emailLabel')}</span>
            <span className="contact__value">{site.email}</span>
          </a>

          <a
            className="contact__card"
            href={site.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="contact__label">{t('contact.linkedinLabel')}</span>
            <span className="contact__value">in/norayr-tanielian</span>
          </a>

          <a className="contact__card" href={`tel:${site.phone}`}>
            <span className="contact__label">{t('contact.phoneLabel')}</span>
            <span className="contact__value">{site.phoneDisplay}</span>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
