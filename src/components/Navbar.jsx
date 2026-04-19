import { useState, useEffect } from 'react'
import Logo from './Logo'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('#home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)

      // Active section tracking
      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActive('#' + sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menu on outside click / scroll
  useEffect(() => {
    if (menuOpen) {
      const close = () => setMenuOpen(false)
      window.addEventListener('scroll', close, { once: true })
      return () => window.removeEventListener('scroll', close)
    }
  }, [menuOpen])

  const handleMobileNav = (href) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main Navigation">
        <div className="container">
          <a href="#home" className="nav-logo" aria-label="Go to top" style={{ display: 'flex', alignItems: 'center' }}>
            <Logo width={48} height={48} />
          </a>
          <ul className="nav-links" role="list">
            {links.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={active === l.href ? 'active' : ''}
                  aria-current={active === l.href ? 'page' : undefined}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" className="btn btn-primary nav-hire">Contact Me</a>
          <button
            className="hamburger"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(v => !v)}
          >
            <span style={menuOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}} />
            <span style={menuOpen ? { opacity: 0 } : {}} />
            <span style={menuOpen ? { transform: 'rotate(-45deg) translate(5px, -5px)' } : {}} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`} aria-hidden={!menuOpen}>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={() => handleMobileNav(l.href)}>
            {l.label}
          </a>
        ))}
        <a href="#contact" className="btn btn-primary" style={{ marginTop: 24, display: 'inline-flex' }}
          onClick={() => setMenuOpen(false)}>
          Contact Me
        </a>
      </div>
    </>
  )
}
