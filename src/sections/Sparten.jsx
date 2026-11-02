import { useState } from 'react'
import { ArrowUpRight, Check } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { sparten } from '../data/content.js'
import { images, alts } from '../data/images.js'

export default function Sparten() {
  const [aktiv, setAktiv] = useState(null)

  return (
    <section id="sparten" className="hair-t bg-bg">
      <div className="shell py-16 sm:py-20">
        <Reveal>
          <p className="t-label text-fg-muted">
            <span className="text-accent-deep">01</span> &nbsp;/&nbsp; Zwei Sparten, ein
            Betrieb
          </p>
        </Reveal>

        {/* Foto als eigene Bildkarte über dem Text. Auf der hellen Flaeche
            traegt ein Foto den Text nicht mehr - frueher lag er mit einem
            Abdunkler direkt im Bild. Der Hover weitet weiterhin das Panel. */}
        <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:gap-8">
          {sparten.map((s) => {
            const istAktiv = aktiv === s.id
            const istAndere = aktiv !== null && !istAktiv
            const img = images[s.bild]

            return (
              <article
                key={s.id}
                id={s.id}
                onMouseEnter={() => setAktiv(s.id)}
                onMouseLeave={() => setAktiv(null)}
                className="group relative flex flex-1 flex-col transition-[flex-grow] duration-[600ms] ease-out"
                style={{ flexGrow: istAktiv ? 1.4 : istAndere ? 0.8 : 1 }}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-card bg-surface">
                  <img
                    src={img.w1600}
                    srcSet={`${img.w1600} 1600w, ${img.w2560} 2560w`}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    alt={alts[s.bild]}
                    width={2560}
                    height={1920}
                    loading="lazy"
                    decoding="async"
                    className="fill-abs graded transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                </div>

                <div className="pt-7">
                  <p className="t-label mb-4 text-accent-deep">{s.nummer}</p>

                  <h2 className="t-section uppercase">{s.titel}</h2>
                  <p className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-fg-muted">
                    {s.untertitel}
                  </p>

                  <p className="measure mt-6 text-sm leading-relaxed text-fg-muted sm:text-base">
                    {s.text}
                  </p>

                  <ul className="mt-7 grid gap-2.5">
                    {s.leistungen.map((l) => (
                      <li key={l} className="flex items-start gap-3 text-sm text-fg">
                        <Check
                          size={15}
                          className="mt-1 shrink-0 text-accent-deep"
                          strokeWidth={2.5}
                          aria-hidden="true"
                        />
                        {l}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#kontakt"
                    className="tap mt-7 cursor-pointer gap-2 text-sm font-semibold text-accent-deep transition-[gap] duration-200 hover:gap-3.5"
                  >
                    Anfrage stellen
                    <ArrowUpRight size={16} strokeWidth={2.2} aria-hidden="true" />
                  </a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
