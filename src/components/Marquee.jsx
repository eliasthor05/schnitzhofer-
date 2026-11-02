import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'motion/react'

/**
 * Endlos laufendes Leistungsband auf Marken-Tuerkis - greift das
 * Unterband der Visitenkarte auf. Bei reduzierter Bewegung wird
 * daraus eine statische, umbrechende Liste.
 */
export default function Marquee({ items, speed = 46 }) {
  const reduce = useReducedMotion()
  const bandRef = useRef(null)
  const [sichtbar, setSichtbar] = useState(false)

  // Das Band ist ein paar tausend Pixel breit. Laeuft es weiter, waehrend
  // es ausserhalb des Bildes liegt, haelt es den Compositor und damit den
  // Akku wach - auf dem Handy der teuerste Dauerlaeufer der Seite.
  useEffect(() => {
    const el = bandRef.current
    if (!el) return

    const io = new IntersectionObserver(
      (eintraege) => setSichtbar(eintraege.some((e) => e.isIntersecting)),
      { rootMargin: '120px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  if (reduce) {
    return (
      <div className="bg-accent">
        <div className="shell flex flex-wrap gap-x-8 gap-y-3 py-10">
          {items.map((it) => (
            <span key={it} className="t-label text-white">
              {it}
            </span>
          ))}
        </div>
      </div>
    )
  }

  const row = [...items, ...items]

  return (
    <div className="relative overflow-hidden bg-accent py-8 sm:py-11">
      <div
        ref={bandRef}
        className="flex w-max gap-10 sm:gap-14"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          // Kein will-change: die laufende Transform befoerdert die Ebene
          // ohnehin: der Hinweis haette sie nur zusaetzlich dauerhaft im
          // Speicher gehalten - bei dieser Breite ein spuerbarer Posten.
          animationPlayState: sichtbar ? 'running' : 'paused',
        }}
      >
        {row.map((it, i) => (
          <span
            key={i}
            aria-hidden={i >= items.length}
            className="font-display text-[clamp(1.5rem,4vw,3.4rem)] font-extrabold uppercase leading-none tracking-tight text-white"
          >
            {it}
            <span className="mx-6 text-white/45 sm:mx-9">·</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translate3d(0,0,0) } to { transform: translate3d(-50%,0,0) } }`}</style>
    </div>
  )
}
