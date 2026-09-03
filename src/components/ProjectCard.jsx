import { useI18n } from '../i18n/LanguageContext.jsx'
import './ProjectCard.css'

export default function ProjectCard({ project }) {
  const { t } = useI18n()
  const base = `projects.items.${project.id}`

  return (
    <article
      className={`pcard ${project.featured ? 'pcard--featured' : ''}`}
      data-project={project.id}
    >
      {project.featured && <span className="pcard__badge">★ {t('projects.eyebrow')}</span>}

      <h3 className="pcard__title">{t(`${base}.name`)}</h3>

      <Metrics base={base} t={t} />

      <div className="pcard__block">
        <span className="pcard__label">{t('projects.contextLabel')}</span>
        <p>{t(`${base}.context`)}</p>
      </div>

      <div className="pcard__block">
        <span className="pcard__label">{t('projects.doneLabel')}</span>
        <p>{t(`${base}.done`)}</p>
      </div>

      <div className="pcard__block">
        <span className="pcard__label">{t('projects.valueLabel')}</span>
        <p>{t(`${base}.value`)}</p>
      </div>

      <div className="pcard__stack" aria-label={t('projects.stackLabel')}>
        {project.stack.map((s) => (
          <span className="tag" key={s}>
            {s}
          </span>
        ))}
      </div>

      {project.link && (
        <a
          className="pcard__link"
          href={project.link.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t(project.link.labelKey)}
          <span aria-hidden="true">→</span>
        </a>
      )}
    </article>
  )
}

// Bandeau de chiffres cles, rendu seulement si le projet en declare dans l'i18n
// sous `projects.items.<id>.metrics` (tableau de { value, label }).
function Metrics({ base, t }) {
  const metrics = t(`${base}.metrics`)
  if (!Array.isArray(metrics) || metrics.length === 0) return null
  return (
    <dl className="pcard__metrics">
      {metrics.map((m) => (
        <div className="pcard__metric" key={m.label}>
          <dt className="pcard__metric-value">{m.value}</dt>
          <dd className="pcard__metric-label">{m.label}</dd>
        </div>
      ))}
    </dl>
  )
}
