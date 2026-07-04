import { useEffect, useRef } from 'react'

// SC2-only animated background: rising psionic motes + breathing pylon
// power glow at the bottom of the viewport. Fixed full-screen canvas
// behind all content.
// Perf: DPR capped at 2, mote count scales with viewport, pauses when
// the tab is hidden. Accessibility: prefers-reduced-motion renders a
// single static frame (no animation loop).

import {
  PROTOSS_CYAN_RGB as CYAN,
  PROTOSS_TEAL_RGB as TEAL,
  KHALA_GOLD_RGB as GOLD
} from '../lib/site-theme-context'

function createMotes(w, h) {
  const count = Math.min(80, Math.max(24, Math.floor((w * h) / 26000)))
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 0.8 + Math.random() * 1.8,
    speed: 0.15 + Math.random() * 0.45, // upward drift, px per frame
    sway: 0.3 + Math.random() * 0.7, // horizontal sway factor
    phase: Math.random() * Math.PI * 2,
    color: Math.random() < 0.15 ? GOLD : Math.random() < 0.5 ? CYAN : TEAL,
    alpha: 0.2 + Math.random() * 0.4
  }))
}

const PsionicBackground = () => {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    let motes = []
    let req = null
    let running = false
    let resizeTimer = null
    // Wall-clock time base — animation speed independent of refresh rate
    const startTime = performance.now()
    let lastTime = startTime

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      motes = createMotes(window.innerWidth, window.innerHeight)
    }

    const draw = () => {
      const w = window.innerWidth
      const h = window.innerHeight
      const now = performance.now()
      const t = (now - startTime) * 0.001 // seconds
      const dt = Math.min((now - lastTime) * 0.001, 0.1) // clamp resume jumps
      lastTime = now
      ctx.clearRect(0, 0, w, h)

      // Pylon power glow — breathing radial pool rising from below
      const pulse = reduceMotion ? 0.5 : 0.5 + Math.sin(t * 1.2) * 0.5
      const glow = ctx.createRadialGradient(
        w / 2,
        h + 60,
        0,
        w / 2,
        h + 60,
        h * 0.55
      )
      glow.addColorStop(0, `rgba(${TEAL}, ${0.05 + pulse * 0.06})`)
      glow.addColorStop(1, `rgba(${TEAL}, 0)`)
      ctx.fillStyle = glow
      ctx.fillRect(0, 0, w, h)

      // Rising psionic motes — soft glow via cheap two-pass circles
      // (canvas shadowBlur is CPU-composited and too slow on mobile)
      for (const m of motes) {
        const x = m.x + Math.sin(t * 0.6 * m.sway + m.phase) * 14
        ctx.beginPath()
        ctx.arc(x, m.y, m.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${m.color}, ${m.alpha * 0.15})`
        ctx.fill()
        ctx.beginPath()
        ctx.arc(x, m.y, m.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${m.color}, ${m.alpha})`
        ctx.fill()

        if (!reduceMotion) {
          m.y -= m.speed * dt * 60 // speed tuned in px-per-60fps-frame units
          if (m.y < -8) {
            m.y = h + 8
            m.x = Math.random() * w
          }
        }
      }
    }

    const loop = () => {
      draw()
      req = requestAnimationFrame(loop)
    }

    const start = () => {
      if (running || reduceMotion) return
      running = true
      loop()
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(req)
    }

    const onVisibility = () => {
      if (document.hidden) stop()
      else start()
    }

    // Debounced — raw resize fires per pixel of a window drag
    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(() => {
        resize()
        if (reduceMotion) draw()
      }, 150)
    }

    resize()
    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibility)

    if (reduceMotion) draw() // single static frame, no loop
    else start()

    return () => {
      stop()
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -1,
        pointerEvents: 'none'
      }}
    />
  )
}

export default PsionicBackground
