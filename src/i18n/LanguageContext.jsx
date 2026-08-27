import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import fr from './fr.json'
import en from './en.json'

const dictionaries = { fr, en }
const STORAGE_KEY = 'portfolio-lang'

const LanguageContext = createContext(null)

function detectInitialLang() {
  if (typeof window === 'undefined') return 'fr'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'fr' || stored === 'en') return stored
  const nav = window.navigator.language || 'fr'
  return nav.toLowerCase().startsWith('en') ? 'en' : 'fr'
}

/** Résout une clé "a.b.c" dans un objet imbriqué. */
function resolve(dict, key) {
  return key.split('.').reduce((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) return acc[part]
    return undefined
  }, dict)
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectInitialLang)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang)
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => {
    const dict = dictionaries[lang]
    /** t('section.title') → string ; renvoie la clé si absente (utile en dev). */
    const t = (key) => {
      const out = resolve(dict, key)
      return out === undefined ? key : out
    }
    const toggle = () => setLang((l) => (l === 'fr' ? 'en' : 'fr'))
    return { lang, setLang, toggle, t }
  }, [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useI18n() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useI18n doit être utilisé dans <LanguageProvider>')
  return ctx
}
