import { useEffect, useRef } from 'react'

const projects = [
  {
    id: 'aaharai',
    emoji: '🍽️',
    tag: '🏆 AMD Slingshot — Ranked 9th / 248',
    title: 'AaharAI',
    desc: 'AI-powered Indian food & health platform with Hinglish support, multi-stage prompt pipeline, and cultural nutrition intelligence. Built on Antigravity (Gemini-powered).',
    stack: ['Prompt Engineering', 'Gemini API', 'Antigravity', 'Python'],
    bannerBg: 'linear-gradient(135deg, #1a0a00, #2d1200)',
    accentColor: '#FF5500',
    github: 'https://github.com/Dhirendra10251',
    live: 'https://amd-promptathon-395841381776.asia-south1.run.app',
  },
  {
    id: 'vigil',
    emoji: '🛡️',
    tag: '🏛️ VNIT Nagpur Hackathon',
    title: 'VIGIL',
    desc: 'AI-Powered Civic Corruption Intelligence System with CitizenShield (public reporting) and TenderWatch (procurement fraud detection) modules.',
    stack: ['React', 'Python', 'AI/ML', 'Data Analysis'],
    bannerBg: 'linear-gradient(135deg, #1a0500, #280e00)',
    accentColor: '#FF3300',
    github: 'https://github.com/Dhirendra10251',
    live: null,
  },
  {
    id: 'currency',
    emoji: '💱',
    tag: '💻 Personal Project',
    title: 'Currency Converter',
    desc: 'Real-time currency converter React app using the Frankfurter API with live exchange rates, bi-directional sync, and a clean minimal fintech UI.',
    stack: ['React.js', 'Frankfurter API', 'CSS', 'Vite'],
    bannerBg: 'linear-gradient(135deg, #00081a, #001a28)',
    accentColor: '#0082FF',
    github: 'https://github.com/Dhirendra10251',
    live: null,
  },
  {
    id: 'sudoku',
    emoji: '🎮',
    tag: '🎮 Terminal Game',
    title: 'Sudoku Solver',
    desc: 'Polished terminal Sudoku game with ASCII art, ANSI color themes, a smart hint system, and live stopwatch — far beyond a basic solver.',
    stack: ['Python', 'CLI', 'ANSI', 'ASCII Art'],
    bannerBg: 'linear-gradient(135deg, #001a00, #001208)',
    accentColor: '#00C853',
    github: 'https://github.com/Dhirendra10251',
    live: null,
  },
]

// SVG Icons
const GithubIcon = () => (
  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
)
const ExternalIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
  </svg>
)

function ProjectCard({ project, delay }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const el = cardRef.current; if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => el.classList.add('visible'), delay)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <article
      ref={cardRef}
      className="project-card reveal"
      style={{ '--card-accent': project.accentColor }}
    >
      {/* Banner */}
      <div
        className="project-card-banner"
        style={{ background: project.bannerBg }}
        aria-label={`${project.title} project banner`}
      >
        <span style={{ fontSize: 72, filter: 'drop-shadow(0 0 24px rgba(255,85,0,0.4))' }}>
          {project.emoji}
        </span>
      </div>

      {/* Body */}
      <div className="project-card-body">
        <span className="project-tag">{project.tag}</span>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.desc}</p>
        <div className="project-stack">
          {project.stack.map(t => <span key={t} className="stack-tag">{t}</span>)}
        </div>
        <div className="project-links">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="project-link-btn"
            aria-label={`${project.title} GitHub repository`}
          >
            <GithubIcon /> GitHub
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link-btn"
              aria-label={`${project.title} live demo`}
            >
              <ExternalIcon /> Live Demo
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Projects() {
  const headRef = useRef(null)
  useEffect(() => {
    const el = headRef.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } }, { threshold: 0.15 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="projects" className="section projects">
      <div className="container">
        <div ref={headRef} className="reveal">
          <p className="section-label">Portfolio</p>
          <h2 className="section-title">What I've <span className="accent">Built</span></h2>
        </div>
        <div className="projects-grid">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  )
}
