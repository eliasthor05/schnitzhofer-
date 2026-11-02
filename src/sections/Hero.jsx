import { useRef } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { ArrowRight, Phone } from 'lucide-react'
import { RevealLines } from '../components/Reveal.jsx'
import { images, alts, illustration } from '../data/images.js'
import { firma } from '../data/content.js'
import { useDesktopEffekte } from '../lib/media.js'
import Parallax from '../components/Parallax.jsx'

export default function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  // Die Zeichnung faehrt beim Scrollen leicht mit - genug, dass die
  // Flaeche lebt, wenig genug, dass nichts flimmert. Auf dem Handy
  // stapeln sich beide Bilder ohnehin, dort traegt der Versatz nichts.
  const parallax = useDesktopEffekte() && !reduce

  const foto = images.erdbewegung

  return (
    <section ref={ref} id="inhalt" className="relative overflow-hidden bg-bg">
      <div className="shell relative w-full pb-14 pt-32 sm:pt-36 lg:pb-20">
        <motion.p
          className="t-label mb-7 flex flex-wrap items-center gap-x-4 gap-y-2 text-accent-deep"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
        >
          <span>Seit drei Generationen</span>
          <span className="h-px w-8 bg-accent/60" aria-hidden="true" />
          <span className="text-fg-muted">Abtenau · Tennengau</span>
        </motion.p>

        <h1 className="t-hero uppercase">
          <RevealLines
            lines={[
              'Schnitzhofer',
              'steht für',
              <span key="b" className="text-accent-deep">
                Bewegung
              </span>,
            ]}
            delay={0.25}
          />
        </h1>

        <motion.div
          className="mt-9 flex flex-col gap-8 border-t border-line pt-8 lg:flex-row lg:items-end lg:justify-between"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="measure text-base text-fg-muted sm:text-lg">
            Erdbewegung, Transporte, Kranarbeiten und Winterdienst im Raum {firma.gebiet}.
            Zwei Sparten, ein Fuhrpark, ein Ansprechpartner – von der ersten Schaufel bis
            zum letzten Kubikmeter.
          </p>

          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <a href="#kontakt" className="btn-accent">
              Projekt anfragen
              <ArrowRight size={17} strokeWidth={2.2} aria-hidden="true" />
            </a>
            <a href={firma.telefonHref} className="btn-ghost">
              <Phone size={16} strokeWidth={2.2} aria-hidden="true" />
              {firma.telefon}
            </a>
          </div>
        </motion.div>

        {/* Bildband: links die Zeichnung aus dem Firmenlogo,
            rechts ein Foto von der Baustelle. */}
        <motion.div
          className="mt-12 grid gap-6 lg:mt-16 lg:grid-cols-[1.45fr_1fr] lg:gap-8"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.95 }}
        >
          {(() => {
            const zeichnung = (
              <img
                src={illustration.w900}
                srcSet={`${illustration.w900} 900w, ${illustration.w1800} 1800w`}
                sizes="(min-width: 1024px) 58vw, 100vw"
                alt={illustration.alt}
                width={1800}
                height={1087}
                fetchPriority="high"
                decoding="sync"
                className="w-full"
              />
            )
            const baustellenfoto = (
              <img
                src={foto.w1600}
                srcSet={`${foto.w1600} 1600w, ${foto.w2560} 2560w`}
                sizes="(min-width: 1024px) 40vw, 100vw"
                alt={alts.erdbewegung}
                width={2560}
                height={1920}
                loading="eager"
                decoding="async"
                className="graded h-full min-h-[240px] w-full object-cover lg:min-h-[340px]"
              />
            )
            const rahmen = 'overflow-hidden rounded-card bg-surface'

            if (!parallax) {
              return (
                <>
                  <div>{zeichnung}</div>
                  <div className={rahmen}>{baustellenfoto}</div>
                </>
              )
            }

            return (
              <>
                <Parallax ziel={ref} von="0%" bis="-9%">
                  {zeichnung}
                </Parallax>
                <Parallax ziel={ref} von="0%" bis="6%" className={rahmen}>
                  {baustellenfoto}
                </Parallax>
              </>
            )
          })()}
        </motion.div>
      </div>
    </section>
  )
}
