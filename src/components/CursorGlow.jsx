import { useEffect } from 'react'

export default function CursorGlow() {
  useEffect(() => {
    const glow = document.querySelector('.cursor-glow')
    const ring = document.querySelector('.cursor-ring')

    let ringX = 0, ringY = 0
    let rafId

    const onMove = (e) => {
      const x = e.clientX
      const y = e.clientY
      if (glow) {
        glow.style.left = x + 'px'
        glow.style.top  = y + 'px'
      }
      // Ring follows with lag
      const animate = () => {
        ringX += (x - ringX) * 0.12
        ringY += (y - ringY) * 0.12
        if (ring) {
          ring.style.left = ringX + 'px'
          ring.style.top  = ringY + 'px'
        }
        rafId = requestAnimationFrame(animate)
      }
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(animate)
    }

    const onEnter = () => {
      if (glow) glow.style.opacity = '1'
      if (ring) ring.style.opacity = '1'
    }
    const onLeave = () => {
      if (glow) glow.style.opacity = '0'
      if (ring) ring.style.opacity = '0'
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)
    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <>
      <div className="cursor-glow" style={{ opacity: 0 }} />
      <div className="cursor-ring"  style={{ opacity: 0 }} />
    </>
  )
}
