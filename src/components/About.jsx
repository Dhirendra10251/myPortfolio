import { useEffect, useRef } from 'react'
import portraitImg from '../assets/PersonBehindTheCode.jpg'

function useReveal(options = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); observer.disconnect() } },
      { threshold: 0.15, ...options }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])
  return ref
}

const quickStats = [
  { icon: '🎓', label: 'University', value: 'VIT Bhopal University — B.Tech CSE (AI & ML), 2025–2029' },
  { icon: '📍', label: 'Location', value: 'Hyderabad, India' },
]

export default function About() {
  const headRef = useReveal()
  const leftRef = useReveal()
  const rightRef = useReveal()

  return (
    <section id="about" className="section about">
      <div className="about-diag" aria-hidden="true" />
      <div className="container">
        <div ref={headRef} className="reveal">
          <p className="section-label">About Me</p>
          <h2 className="section-title">The Person<br />Behind The <span className="accent">Code</span></h2>
        </div>

        <div className="about-grid">
          {/* Left */}
          <div ref={leftRef} className="about-portrait reveal-left">
            <div className="portrait-frame" aria-hidden="true">
              <img src={portraitImg} alt="Dhirendra Kumar Thakur" className="portrait-img" />
            </div>
            <div className="about-quick-stats">
              {quickStats.map(s => (
                <div className="quick-stat" key={s.label}>
                  <span className="quick-stat-icon">{s.icon}</span>
                  <span className="quick-stat-text">
                    <strong>{s.label}: </strong>{s.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div ref={rightRef} className="about-content reveal-right">
            <p className="about-bio">
              I'm <strong>Dhirendra Kumar Thakur</strong> — a first-year CSE (AI &amp; ML)
              student at VIT Bhopal, obsessed with cybersecurity, hackathons, and building
              things that matter. I've ranked <strong>9th out of 248</strong> at the AMD
              Slingshot Prompthathon, competed in CTF events,
              and built civic-tech AI platforms that tackle real-world corruption.
              When I'm not coding, I'm shooting photos or writing or involved in fitness activities and sports.
            </p>
            <div className="info-grid">
              <div className="info-card">
                <div className="info-card-icon">🎓</div>
                <div className="info-card-label">University</div>
                <div className="info-card-value">VIT Bhopal University</div>
              </div>
              <div className="info-card">
                <div className="info-card-icon">💻</div>
                <div className="info-card-label">Degree</div>
                <div className="info-card-value">B.Tech CSE — AI &amp; ML<br />2025–2029</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
