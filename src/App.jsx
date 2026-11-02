import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Lenis from 'lenis'
import Home from './pages/Home.jsx'
import Impressum from './pages/Impressum.jsx'
import Datenschutz from './pages/Datenschutz.jsx'

function useSmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true })
    // Im Dev-Modus greifbar machen: Lenis fängt window.scrollTo ab,
    // sonst lässt sich die Seite weder testen noch debuggen.
    if (import.meta.env.DEV) window.__lenis = lenis
    let frame
    const raf = (time) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    // Anker-Links über Lenis laufen lassen
    const onClick = (e) => {
      const a = e.target.closest('a[href^="#"]')
      if (!a) return
      const el = document.querySelector(a.getAttribute('href'))
      if (!el) return
      e.preventDefault()
      lenis.scrollTo(el, { offset: -72 })
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  useSmoothScroll()
  return (
    <>
      <ScrollToTop />
      <a
        href="#inhalt"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-pill focus:bg-accent-deep focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
      >
        Zum Inhalt springen
      </a>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/impressum" element={<Impressum />} />
        <Route path="/datenschutz" element={<Datenschutz />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  )
}
