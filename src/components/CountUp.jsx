import { useEffect, useRef, useState } from 'react'

/**
 * Zählt beim Eintritt in den Viewport auf den Zielwert hoch.
 * Bewusst mit eigenem IntersectionObserver statt useInView:
 * deterministisch, und der Endwert steht in jedem Fall.
 */
export default function CountUp({ to, suffix = '', duration = 1400 }) {
  const ref = useRef(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      setValue(to)
      return
    }

    let raf
    let gestartet = false

    const starten = () => {
      if (gestartet) return
      gestartet = true
      // Startzeit aus dem ersten Frame nehmen: der rAF-Timestamp kann
      // vor performance.now() liegen, was sonst negative Werte ergibt.
      let start = null
      const tick = (now) => {
        if (start === null) start = now
        const p = Math.min(Math.max((now - start) / duration, 0), 1)
        // ease-out cubic
        setValue(Math.round(to * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }

    // Wird der Tab währenddessen versteckt, pausiert rAF. Damit keine
    // angebrochene Zahl stehen bleibt, direkt den Endwert zeigen.
    const beiVerstecken = () => {
      if (document.hidden && gestartet) {
        cancelAnimationFrame(raf)
        setValue(to)
      }
    }
    document.addEventListener('visibilitychange', beiVerstecken)

    const io = new IntersectionObserver(
      (eintraege) => {
        if (eintraege.some((e) => e.isIntersecting)) {
          starten()
          io.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    io.observe(el)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
      document.removeEventListener('visibilitychange', beiVerstecken)
    }
  }, [to, duration])

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  )
}
