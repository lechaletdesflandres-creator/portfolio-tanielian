import { useState } from 'react'
import { useI18n } from '../i18n/LanguageContext.jsx'
import { site } from '../data/site.js'
import Reveal from './Reveal.jsx'
import Timeline from './Timeline.jsx'
import './About.css'

export default function About() {
  const { t } = useI18n()
  // Repli sur le placeholder si la photo n'est pas (encore) déposée dans /public.
  const [photoFailed, setPhotoFailed] = useState(false)
  const showPhoto = site.photoReady && !photoFailed
  return (
    <section className="section" id="about">
      <div className="container">
        <Reveal className="section__head">
          <span className="section__eyebrow">{t('about.eyebrow')}</span>
          <h2 className="section__title">{t('about.title')}</h2>
        </Reveal>

        <div className="about__grid">
          <Reveal className="about__text">
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
            <p>{t('about.p3')}</p>
          </Reveal>

          <Reveal className="about__aside">
            <figure className="about__photo">
              {showPhoto ? (
                <img
                  className="about__photo-img"
                  src={site.photo}
                  srcSet={site.photoSrcSet}
                  sizes={site.photoSizes}
                  alt={t('about.photoAlt')}
                  width="640"
                  height="800"
                  loading="lazy"
                  decoding="async"
                  onError={() => setPhotoFailed(true)}
                />
              ) : (
                <div className="about__photo-placeholder" aria-label={t('about.photoAlt')}>
                  <span className="about__photo-mark">NT</span>
                  <span className="about__photo-caption">{t('about.photoPlaceholder')}</span>
                </div>
              )}
            </figure>
          </Reveal>
        </div>

        <Reveal>
          <h3 className="about__timeline-title">{t('about.timelineTitle')}</h3>
          <Timeline />
        </Reveal>
      </div>
    </section>
  )
}
