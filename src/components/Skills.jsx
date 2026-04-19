import { useEffect, useRef } from 'react'

const categories = [
  {
    id: 'languages',
    label: '01 — Languages & Core',
    skills: [
      { icon: '🐍', name: 'Python' },
      { icon: '⚡', name: 'JavaScript' },
      { icon: '⚙️', name: 'C / C++' },
      { icon: '🌐', name: 'HTML / CSS' },
      { icon: '🧠', name: 'Prolog' },
      { icon: '🗄️', name: 'SQL' },
    ],
  },
  {
    id: 'frameworks',
    label: '02 — Frameworks & Tools',
    skills: [
      { icon: '⚛️', name: 'React.js' },
      { icon: '⚡', name: 'Vite' },
      { icon: '🐙', name: 'Git & GitHub' },
      { icon: '🔢', name: 'NumPy' },
      { icon: '📊', name: 'Matplotlib' },
      { icon: '🎛️', name: 'Scikit-learn' },
    ],
  },
  {
    id: 'domains',
    label: '03 — Domains',
    skills: [
      { icon: '🤖', name: 'Machine Learning' },
      { icon: '📊', name: 'Data Structures and Algorithms' },
      { icon: '✍️', name: 'Prompt Engineering' },
      { icon: '👁️', name: 'Computer Vision' },
      { icon: '🏛️', name: 'Civic Tech' },
      { icon: '📝', name: 'Creative Writing' },
    ],
  },
]

export default function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const chips = sectionRef.current?.querySelectorAll('.skill-chip') || []
          chips.forEach((chip, i) => {
            setTimeout(() => chip.classList.add('popped'), i * 60)
          })
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const headRef = useRef(null)
  useEffect(() => {
    const el = headRef.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" className="section skills">
      <div className="container">
        <div ref={headRef} className="reveal">
          <p className="section-label">Tech Stack</p>
          <h2 className="section-title">My <span className="accent">Arsenal</span></h2>
        </div>

        <div className="skills-categories" ref={sectionRef}>
          {categories.map(cat => (
            <div key={cat.id} className="skill-category">
              <p className="skill-cat-label">{cat.label}</p>
              <div className="skill-chips" role="list">
                {cat.skills.map(skill => (
                  <div
                    key={skill.name}
                    className="skill-chip"
                    role="listitem"
                    aria-label={skill.name}
                  >
                    <span className="skill-chip-icon" aria-hidden="true">{skill.icon}</span>
                    {skill.name}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
