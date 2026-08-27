import { useEffect, useRef, useState } from 'react'

/** Ajoute la classe `is-visible` quand l'élément entre dans le viewport. */
export function useReveal(options = { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || visible) return
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true)
      return
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.unobserve(entry.target)
        }
      })
    }, options)
    obs.observe(el)
    return () => obs.disconnect()
  }, [visible, options])

  return [ref, visible]
}
