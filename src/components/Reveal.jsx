import { useReveal } from '../hooks/useReveal.js'

/** Wrapper qui révèle son contenu au scroll. */
export default function Reveal({ as: Tag = 'div', className = '', style, children }) {
  const [ref, visible] = useReveal()
  return (
    <Tag
      ref={ref}
      style={style}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`.trim()}
    >
      {children}
    </Tag>
  )
}
