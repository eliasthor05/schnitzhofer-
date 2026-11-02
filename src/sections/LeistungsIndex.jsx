import { useRef, useState } from 'react'
import { motion, useReducedMotion, useSpring, useMotionValue } from 'motion/react'
import Reveal from '../components/Reveal.jsx'
import { leistungen } from '../data/content.js'
import { images, alts } from '../data/images.js'

export default function LeistungsIndex() {
  const [hover, setHover] = useState(null)
  const wrapRef = useRef(null)
  const reduce = useReducedMotion()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 260, damping: 32, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 260, damping: 32, mass: 0.6 })

  const onMove = (e) => {
    if (reduce) return
    const r = wrapRef.current?.getBoundingClientRect()
    if (!r) return
    const x = e.clientX - r.left
    const y = e.clientY - r.top

    // Beim ersten Eintritt ohne Federung positionieren, sonst
    // fliegt das Vorschaubild sichtbar aus der linken oberen Ecke ein.
    if (hover === null) {
      mx.jump(x)
      my.jump(y)
      sx.jump(x)
      sy.jump(y)
    }

    mx.set(x)
    my.set(y)
  }

  const aktuell = hover !== null ? leistungen[hover] : null

  return (
    <section id="leistungen" className="hair-t bg-surface py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <div className="mb-14 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="t-label text-fg-muted">
                <span className="text-accent-deep">02</span> &nbsp;/&nbsp; Leistungsverzeichnis
              </p>
              <h2 className="t-section mt-6 uppercase">
                Alles aus
                <br />
                einer Hand
              </h2>
            </div>
            <p className="measure text-sm text-fg-muted">
              Von der Baggerarbeit über den Tiefladetransport bis zur Schneeräumung. Was
              bewegt werden muss, bewegen wir.
            </p>
          </div>
        </Reveal>

        {/* Index */}
        <div
          ref={wrapRef}
          onMouseMove={onMove}
          onMouseLeave={() => setHover(null)}
          className="relative"
        >
          <ul className="border-t border-line">
            {leistungen.map((l, i) => (
              <li key={l.t}>
                <a
                  href="#kontakt"
                  onMouseEnter={() => setHover(i)}
                  onFocus={() => setHover(i)}
                  onBlur={() => setHover(null)}
                  className="group relative flex cursor-pointer items-baseline gap-4 border-b border-line py-5 transition-[padding-left,color] duration-300 ease-out hover:pl-4 focus-visible:pl-4 sm:gap-8 sm:py-6"
                >
                  {/* Akzentbalken */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 h-full w-0 bg-accent/10 transition-[width] duration-500 ease-out group-hover:w-full group-focus-visible:w-full"
                  />
                  <span className="relative z-10 w-8 shrink-0 font-mono text-[0.7rem] text-fg-muted transition-colors duration-300 group-hover:text-accent-deep">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="relative z-10 flex-1 font-display text-[clamp(1.25rem,3.4vw,2.6rem)] font-extrabold uppercase leading-tight tracking-tight transition-colors duration-300 group-hover:text-accent-deep">
                    {l.t}
                  </span>
                  <span className="relative z-10 hidden shrink-0 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-fg-muted sm:block">
                    {l.s}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          {/* Cursor-Foto – nur auf Zeigegeräten mit feiner Eingabe */}
          {!reduce && (
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute left-0 top-0 z-20 hidden h-[260px] w-[360px] overflow-hidden border border-accent/70 [@media(pointer:fine)]:block"
              style={{
                x: sx,
                y: sy,
                translateX: '-50%',
                translateY: '-50%',
                opacity: aktuell ? 1 : 0,
                transition: 'opacity 320ms cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              {aktuell && (
                <img
                  src={images[aktuell.b].w1600}
                  alt=""
                  width={360}
                  height={260}
                  className="h-full w-full object-cover graded"
                />
              )}
            </motion.div>
          )}
        </div>
      </div>
      {/* Alt-Text-Referenz, damit die Bildbeschreibungen gepflegt bleiben */}
      <span className="sr-only">{alts.baugrube}</span>
    </section>
  )
}
