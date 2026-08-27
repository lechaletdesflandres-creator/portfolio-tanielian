import { useEffect, useState } from 'react'
import { useI18n } from '../i18n/LanguageContext.jsx'
import { site } from '../data/site.js'
import LanguageToggle from './LanguageToggle.jsx'
import './Header.css'

const links = [
  { id: 'about', key: 'nav.about' },
  { id: 'projects', key: 'nav.projects' },
  { id: 'skills', key: 'nav.skills' },
  { id: 'contact', key: 'nav.contact' },
]

export default function Header() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Empêche le scroll du body quand le menu mobile est ouvert.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header className={`header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="container header__inner">
        <a href="#top" className="header__brand" onClick={close}>
          <span className="header__brand-mark">NT</span>
          <span className="header__brand-name">Norayr Tanielian</span>
        </a>

        <nav className={`header__nav ${open ? 'is-open' : ''}`} aria-label="Navigation principale">
          {links.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={close}>
              {t(l.key)}
            </a>
          ))}
          <div className="header__nav-actions">
            <CvButton t={t} onClick={close} />
            <LanguageToggle />
          </div>
        </nav>

        <div className="header__right">
          <div className="header__right-desktop">
            <CvButton t={t} />
            <LanguageToggle />
          </div>
          <button
            type="button"
            className={`header__burger ${open ? 'is-open' : ''}`}
            aria-label={t('nav.menu')}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        </div>

      </header>

      {/* Hors du <header> : celui-ci porte un backdrop-filter, ce qui en fait le bloc
          conteneur de ses descendants position:fixed -> le voile se retrouvait haut de 0. */}
      {open && <button className="header__scrim" aria-hidden="true" tabIndex={-1} onClick={close} />}
    </>
  )
}

// Rien n'est rendu tant que le CV n'est pas déposé : un bouton grisé promet un
// document qui n'existe pas. Voir le point de branchement dans data/site.js.
function CvButton({ t, onClick }) {
  if (!site.cvReady) return null
  return (
    <a className="btn btn--ghost header__cv" href={site.cv} download onClick={onClick}>
      {t('nav.cv')}
    </a>
  )
}
