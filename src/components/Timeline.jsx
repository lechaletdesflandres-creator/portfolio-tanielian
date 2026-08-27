import { useI18n } from '../i18n/LanguageContext.jsx'
import './Timeline.css'

// Ordre d'affichage de la timeline (clés sous about.timeline.*)
const entries = ['current', 'resto', 'cvc', 'formation']

export default function Timeline() {
  const { t } = useI18n()
  return (
    <ol className="timeline">
      {entries.map((key) => (
        <li className="timeline__item" data-entry={key} key={key}>
          <span className="timeline__dot" aria-hidden="true" />
          <span className="timeline__period">{t(`about.timeline.${key}.period`)}</span>
          <h4 className="timeline__role">{t(`about.timeline.${key}.role`)}</h4>
          <p className="timeline__place">{t(`about.timeline.${key}.place`)}</p>
          <p className="timeline__desc">{t(`about.timeline.${key}.desc`)}</p>
        </li>
      ))}
    </ol>
  )
}
