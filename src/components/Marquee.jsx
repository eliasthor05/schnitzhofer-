import { useReducedMotion } from 'motion/react'

/**
 * Endlos laufendes Leistungsband auf Marken-Tuerkis - greift das
 * Unterband der Visitenkarte auf. Bei reduzierter Bewegung wird
 * daraus eine statische, umbrechende Liste.
 */
export default function Marquee({ items, speed = 46 }) {
  const reduce = useReducedMotion()

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
        className="flex w-max gap-10 will-change-transform sm:gap-14"
        style={{ animation: `marquee ${speed}s linear infinite` }}
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
