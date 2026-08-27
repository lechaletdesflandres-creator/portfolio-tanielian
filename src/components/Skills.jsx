import { useI18n } from '../i18n/LanguageContext.jsx'
import { skillGroups } from '../data/skills.js'
import Reveal from './Reveal.jsx'
import './Skills.css'

export default function Skills() {
  const { t } = useI18n()
  return (
    <section className="section" id="skills">
      <div className="container">
        <Reveal className="section__head">
          <span className="section__eyebrow">{t('skills.eyebrow')}</span>
          <h2 className="section__title">{t('skills.title')}</h2>
        </Reveal>

        <div className="skills__grid">
          {skillGroups.map((group, i) => (
            <Reveal key={group.groupKey} style={{ transitionDelay: `${i * 50}ms` }}>
              <div className="skills__card" data-group={group.groupKey}>
                <h3 className="skills__group-title">{t(`skills.groups.${group.groupKey}`)}</h3>
                <ul className="skills__list">
                  {group.items.map((item) => (
                    <li className="tag" key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
