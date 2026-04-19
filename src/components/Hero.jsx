import { useState, useEffect, useRef } from 'react'

const roles = [
  'AI/ML Enthusiast',
  'Hackathon Builder',
  'Full Stack Developer',
  'Prompt Engineer',
  'Always a Learner',
]

function Typewriter() {
  const [text, setText] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const role = roles[roleIdx]
    const speed = deleting ? 40 : 80

    if (!deleting && text === role) {
      timeoutRef.current = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && text === '') {
      setDeleting(false)
      setRoleIdx(i => (i + 1) % roles.length)
    } else {
      timeoutRef.current = setTimeout(() => {
        setText(deleting
          ? role.slice(0, text.length - 1)
          : role.slice(0, text.length + 1))
      }, speed)
    }
    return () => clearTimeout(timeoutRef.current)
  }, [text, deleting, roleIdx])

  return (
    <div className="hero-typewriter">
      <span className="tw-prefix">&gt;&nbsp;</span>
      <span>{text}</span>
      <span className="tw-cursor" aria-hidden="true" />
    </div>
  )
}

export default function Hero() {
  // Mount-based stagger: add 'hero-in' class after mount 
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 80)
    return () => clearTimeout(id)
  }, [])

  return (
    <section id="home" className="hero noise-overlay">
      {/* Background */}
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-grid-lines" />
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
      </div>

      <div className="container">
        {/* ── LEFT ── */}
        <div className={`hero-left${mounted ? ' hero-in' : ''}`}>
          <p className="hero-label anim-item" style={{ '--d': '0ms' }}>Hi, I am</p>

          <h1 className="hero-name anim-item" style={{ '--d': '100ms' }}>
            Dhirendra<br />
            <span className="accent">Kumar</span><br />
            Thakur
          </h1>

          <div className="anim-item" style={{ '--d': '200ms' }}>
            <Typewriter />
          </div>

          <p className="hero-bio anim-item" style={{ '--d': '300ms' }}>
            Building intelligent systems &amp; competing in the digital arena —
            one commit at a time.
          </p>

          <div className="hero-cta anim-item" style={{ '--d': '400ms' }}>
            <a href="#contact" className="btn btn-primary">↗ Hire Me</a>
            <a
              href="https://github.com/Dhirendra10251"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              ↓ Download CV
            </a>
          </div>

          <div className="hero-social anim-item" style={{ '--d': '500ms' }}>
            {/* GitHub */}
            <a
              href="https://github.com/Dhirendra10251"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="GitHub profile"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/dhirendra-kumar-thakur-794955365/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn profile"
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>

        {/* ── RIGHT ── */}
        <div className={`hero-visual${mounted ? ' hero-visual-in' : ''}`} aria-hidden="true">
          <div className="hero-code-window">
            <div className="code-window-header">
              <span className="dot dot-r" />
              <span className="dot dot-y" />
              <span className="dot dot-g" />
              <span className="code-window-tab">dkt_profile.py</span>
            </div>
            <div className="code-window-body">
              <span className="cl c-comment"># Who am I?</span>
              <span className="cl">&nbsp;</span>
              <span className="cl"><span className="c-key">class</span> <span className="c-fn">Developer</span><span className="c-punct">:</span></span>
              <span className="cl c-indent"><span className="c-key">def</span> <span className="c-fn">__init__</span><span className="c-punct">(self):</span></span>
              <span className="cl c-indent2"><span className="c-key">self</span><span className="c-punct">.name</span> = <span className="c-str">"Dhirendra Kumar Thakur"</span></span>
              <span className="cl c-indent2"><span className="c-key">self</span><span className="c-punct">.uni</span>  = <span className="c-str">"VIT Bhopal"</span></span>
              <span className="cl c-indent2"><span className="c-key">self</span><span className="c-punct">.batch</span> = <span className="c-num">2025</span><span className="c-punct">–</span><span className="c-num">2029</span></span>
              <span className="cl c-indent2"><span className="c-key">self</span><span className="c-punct">.skills</span> = <span className="c-punct">[</span></span>
              <span className="cl" style={{ paddingLeft: '72px' }}><span className="c-str">"AI/ML"</span><span className="c-punct">,</span> <span className="c-str">"CTF"</span><span className="c-punct">,</span></span>
              <span className="cl" style={{ paddingLeft: '72px' }}><span className="c-str">"Hackathons"</span><span className="c-punct">,</span></span>
              <span className="cl" style={{ paddingLeft: '72px' }}><span className="c-str">"Building Things"</span></span>
              <span className="cl c-indent2"><span className="c-punct">]</span></span>
              <span className="cl c-indent2"><span className="c-key">self</span><span className="c-punct">.rank</span> = <span className="c-str">"9th / 248 🏆"</span></span>
              <span className="cl">&nbsp;</span>
              <span className="cl c-indent"><span className="c-key">def</span> <span className="c-fn">contact</span><span className="c-punct">(self):</span></span>
              <span className="cl c-indent2"><span className="c-key">return</span> <span className="c-str">"dkt0887@gmail.com"</span></span>
            </div>
          </div>

          <div className="hero-badge">🏆 AMD Slingshot #9 / 248</div>
          <div className="hero-stat-float">
            <span className="float-num">36th</span>
            <span className="float-label">HackZero<br />CTF Rank</span>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="hero-stats-bar" aria-label="Quick highlights">
        <div className="container">
          <div className="stat-item">
            <span className="stat-num">5+</span>
            <span className="stat-label">Hackathons Participated</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">9th/248</span>
            <span className="stat-label">AMD Slingshot Rank</span>
          </div>
          <div className="stat-item">
            <span className="stat-num">Top 36</span>
            <span className="stat-label">HackZero CTF</span>
          </div>
        </div>
      </div>
    </section>
  )
}
