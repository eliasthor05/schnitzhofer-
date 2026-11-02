import { MapPin, ExternalLink } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { firma } from '../data/content.js'

const orte = [
  { name: 'Abtenau', x: 50, y: 52, haupt: true },
  { name: 'Annaberg', x: 71, y: 62 },
  { name: 'Rußbach', x: 63, y: 38 },
  { name: 'Golling', x: 27, y: 44 },
  { name: 'Kuchl', x: 24, y: 30 },
  { name: 'Hallein', x: 20, y: 17 },
  { name: 'Salzburg', x: 14, y: 6 },
  { name: 'St. Martin', x: 80, y: 48 },
]

export default function Einsatzgebiet() {
  return (
    <section className="hair-t bg-bg py-24 sm:py-32">
      <div className="shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
        <div>
          <Reveal>
            <p className="t-label text-fg-muted">
              <span className="text-accent-deep">05</span> &nbsp;/&nbsp; Einsatzgebiet
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-section mt-6 uppercase">
              Tennengau
              <br />
              und Umgebung
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="measure mt-7 text-fg-muted">
              Unser Standort liegt in {firma.strasse}, {firma.plz} {firma.ort}. Von hier
              aus bedienen wir das gesamte Lammertal und den Tennengau – der tägliche
              Stückgutverkehr reicht von der Botenzentrale Salzburg bis ins Lammertal.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={firma.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                Route planen
                <ExternalLink size={14} strokeWidth={2.2} aria-hidden="true" />
              </a>
              <a href={firma.telefonHref} className="btn-accent">
                Standort anrufen
              </a>
            </div>
          </Reveal>
        </div>

        {/* Stilisierte Karte – bewusst kein Maps-iframe (DSGVO) */}
        <Reveal delay={0.1}>
          <div className="relative aspect-[4/3] w-full rounded-card border border-line bg-surface">
            {/* Raster */}
            <svg
              className="absolute inset-0 h-full w-full text-fg/[0.045]"
              aria-hidden="true"
            >
              <defs>
                <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                  <path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>

            {/* Radius um den Standort */}
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-[52%] h-[62%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/25"
            />
            <span
              aria-hidden="true"
              className="absolute left-1/2 top-[52%] h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40"
            />

            {orte.map((o) => (
              <span
                key={o.name}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
                style={{ left: `${o.x}%`, top: `${o.y}%` }}
              >
                {o.haupt ? (
                  <>
                    <MapPin
                      size={18}
                      className="shrink-0 text-accent-deep"
                      strokeWidth={2.4}
                      aria-hidden="true"
                    />
                    <span className="whitespace-nowrap font-mono text-[0.75rem] sm:text-[0.68rem] uppercase tracking-[0.16em] text-accent-deep">
                      {o.name}
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent-deep"
                      aria-hidden="true"
                    />
                    <span className="whitespace-nowrap font-mono text-[0.72rem] sm:text-[0.62rem] uppercase tracking-[0.14em] text-fg-muted">
                      {o.name}
                    </span>
                  </>
                )}
              </span>
            ))}

            <p className="absolute bottom-3 right-4 font-mono text-[0.75rem] sm:text-[0.66rem] uppercase tracking-[0.16em] text-fg-muted">
              Schematische Darstellung
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
