import { useRef } from 'react'
import { useReducedMotion } from 'motion/react'
import { ArrowRight } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import Parallax from '../components/Parallax.jsx'
import { images, alts } from '../data/images.js'
import { useDesktopEffekte } from '../lib/media.js'

export default function Winterdienst() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  // Vollflaechiges Foto mit Farbfilter: wird es zusaetzlich pro Frame
  // verschoben, muss das Handy die gefilterte Flaeche staendig neu
  // zusammensetzen. Auf Touch steht das Bild deshalb still.
  const parallax = useDesktopEffekte() && !reduce

  const img = images.winter

  return (
    <section
      ref={ref}
      className="relative isolate flex min-h-[80svh] items-end overflow-hidden bg-accent-deep"
    >
      {(() => {
        const foto = (
          <img
            src={img.w1600}
            srcSet={`${img.w1600} 1600w, ${img.w2560} 2560w`}
            sizes="100vw"
            alt={alts.winter}
            width={2560}
            height={1920}
            loading="lazy"
            decoding="async"
            className="fill-abs graded-cold"
            // Ohne Parallax braucht das Bild keine Reserve am Rand und
            // kann in voller Schaerfe stehen bleiben.
            style={parallax ? { transform: 'scale(1.12)' } : undefined}
          />
        )

        return parallax ? (
          <Parallax
            ziel={ref}
            von="-8%"
            bis="8%"
            offset={['start end', 'end start']}
            className="absolute inset-0 -z-10"
          >
            {foto}
          </Parallax>
        ) : (
          <div className="absolute inset-0 -z-10">{foto}</div>
        )
      })()}

      {/* Markenfarbe statt Schwarz als Abdunkler: unten kraeftig genug,
          dass Weiss durchgehend ueber 7:1 liegt, oben bleibt das Motiv sichtbar. */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'linear-gradient(to top, rgba(0,74,85,0.96) 0%, rgba(0,86,99,0.9) 38%, rgba(0,110,125,0.72) 100%)',
        }}
      />

      <div className="shell py-20 sm:py-24">
        <Reveal>
          <span className="mb-7 inline-flex items-center gap-2.5 rounded-pill border border-white/45 bg-white/10 px-4 py-1.5 font-mono text-[0.74rem] sm:text-[0.64rem] uppercase tracking-[0.18em] text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
            Winterdienst
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="t-section max-w-[16ch] uppercase text-white">
            Wenn es zugeht,
            <br />
            fahren wir raus.
          </h2>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <p className="measure text-white/85">
              Schneeräumung mit verschiedenen Geräten sowie Aufräumarbeiten nach
              Lawinenabgang. Im Tennengau zählt im Winter jede Stunde – und wir sind
              flexibel genug, um kurzfristig zu reagieren.
            </p>
            <a href="#kontakt" className="btn-invert shrink-0">
              Winterdienst anfragen
              <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
