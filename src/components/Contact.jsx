import { useState, useRef, useEffect } from 'react'

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/meevkbln' // ← replace with your real Formspree form ID after signup at formspree.io

const EmailIcon = () => (
  <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)
const LinkedInIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)
const GhIcon = () => (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const contactCards = [
  {
    Icon: EmailIcon,
    label: 'Email',
    value: 'dkt0887@gmail.com',
    href: 'mailto:dkt0887@gmail.com',
  },
  {
    Icon: LinkedInIcon,
    label: 'LinkedIn',
    value: 'dhirendra-kumar-thakur',
    href: 'https://www.linkedin.com/in/dhirendra-kumar-thakur-794955365/',
  },
  {
    Icon: GhIcon,
    label: 'GitHub',
    value: 'Dhirendra10251',
    href: 'https://github.com/Dhirendra10251',
  },
]

function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Name is required.'
  if (!form.email.trim()) errors.email = 'Email is required.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = 'Enter a valid email.'
  if (!form.message.trim()) errors.message = 'Message cannot be empty.'
  else if (form.message.trim().length < 20) errors.message = 'At least 20 characters needed.'
  return errors
}

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)   // null | 'sending' | 'success' | 'error'

  const headRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  function useRevealRef(ref) {
    useEffect(() => {
      const el = ref.current; if (!el) return
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
        { threshold: 0.12 }
      )
      obs.observe(el)
      return () => obs.disconnect()
    }, [])
  }
  useRevealRef(headRef)
  useRevealRef(leftRef)
  useRevealRef(rightRef)

  const handleChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(err => ({ ...err, [e.target.name]: undefined }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStatus('sending')
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      })
      if (res.ok) {
        setStatus('success')
        setForm({ name: '', email: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const isSending = status === 'sending'

  return (
    <section id="contact" className="section contact">
      <div className="contact-bg-text" aria-hidden="true">CONTACT</div>
      <div className="container">
        <div ref={headRef} className="reveal">
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">Let's <span className="accent">Connect</span></h2>
        </div>

        <div className="contact-grid">
          {/* Left */}
          <div ref={leftRef} className="reveal-left">
            <p className="contact-subtitle">
              Open to internships, collaborations, hackathon teams, and interesting ideas.
              Drop me a message and I'll get back within 24 hours.
            </p>
            <div className="contact-info-cards">
              {contactCards.map(card => (
                <a
                  key={card.label}
                  href={card.href}
                  target={card.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="contact-card"
                  aria-label={`${card.label}: ${card.value}`}
                >
                  <span className="cc-icon"><card.Icon /></span>
                  <span>
                    <p className="cc-label">{card.label}</p>
                    <p className="cc-value">{card.value}</p>
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div ref={rightRef} className="reveal-right">
            <form
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
              aria-label="Contact form"
            >
              <div className="form-group">
                <label htmlFor="contact-name">Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                  aria-describedby={errors.name ? 'err-name' : undefined}
                  disabled={isSending}
                />
                {errors.name && <span id="err-name" className="form-error" role="alert">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="contact-email">Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                  aria-describedby={errors.email ? 'err-email' : undefined}
                  disabled={isSending}
                />
                {errors.email && <span id="err-email" className="form-error" role="alert">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="contact-message">Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  placeholder="Tell me about the opportunity, project, or just say hi..."
                  value={form.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                  aria-describedby={errors.message ? 'err-msg' : undefined}
                  disabled={isSending}
                />
                {errors.message && <span id="err-msg" className="form-error" role="alert">{errors.message}</span>}
              </div>

              {status === 'success' && (
                <div className="form-status success" role="status">
                  ✅ Message sent! I'll get back to you shortly.
                </div>
              )}
              {status === 'error' && (
                <div className="form-status error" role="alert">
                  ❌ Something went wrong. Try emailing directly at dkt0887@gmail.com
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary form-submit"
                disabled={isSending}
                aria-busy={isSending}
              >
                {isSending ? '⏳ Sending…' : '↗ Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer inside contact section */}
      <Footer />
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <p className="footer-text">
          Built with passion by <strong>Dhirendra Kumar Thakur</strong> &middot; 2026
        </p>
        <div className="footer-links">
          <a
            href="https://github.com/Dhirendra10251"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
            aria-label="GitHub"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/dhirendra-kumar-thakur-794955365/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-icon"
            aria-label="LinkedIn"
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}
