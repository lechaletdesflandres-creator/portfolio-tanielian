import { useI18n } from '../i18n/LanguageContext.jsx'
import { projects } from '../data/projects.js'
import ProjectCard from './ProjectCard.jsx'
import Reveal from './Reveal.jsx'
import './Projects.css'

export default function Projects() {
  const { t } = useI18n()
  return (
    <section className="section section--alt" id="projects">
      <div className="container">
        <Reveal className="section__head">
          <span className="section__eyebrow">{t('projects.eyebrow')}</span>
          <h2 className="section__title">{t('projects.title')}</h2>
          <p className="section__lead">{t('projects.lead')}</p>
        </Reveal>

        <div className="projects__grid">
          {projects.map((project, i) => (
            <Reveal key={project.id} style={{ transitionDelay: `${i * 60}ms` }}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
