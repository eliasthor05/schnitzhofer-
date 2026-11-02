import Reveal from '../components/Reveal.jsx'
import { fuhrpark } from '../data/content.js'

export default function Fuhrpark() {
  return (
    <section id="fuhrpark" className="hair-t bg-surface py-24 sm:py-32">
      <div className="shell">
        <Reveal>
          <div className="mb-14 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="t-label text-fg-muted">
                <span className="text-accent-deep">04</span> &nbsp;/&nbsp; Gerät
              </p>
              <h2 className="t-section mt-6 uppercase">
                Hochmoderner
                <br />
                Fuhrpark
              </h2>
            </div>
            <p className="measure text-sm text-fg-muted">
              Unsere Mitarbeiter sind bestens ausgebildet im Umgang mit den Erdbau-Geräten.
              Durch ihre jahrelange Erfahrung bedienen sie sämtliche Geräte und das Zubehör
              einwandfrei. Unsere Fahrer verfügen über aktuelle Zertifizierungen.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {fuhrpark.map((f, i) => (
            <Reveal key={f.titel} delay={0.05 * i} className="bg-bg">
              <div className="group h-full p-7 transition-colors duration-300 hover:bg-accent-soft sm:p-9">
                <p className="font-mono text-[0.75rem] sm:text-[0.68rem] text-fg-muted">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-5 font-display text-2xl font-extrabold uppercase transition-colors duration-300 group-hover:text-accent-deep">
                  {f.titel}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-muted">{f.text}</p>
                <span
                  aria-hidden="true"
                  className="mt-7 block h-px w-10 bg-accent-deep transition-[width] duration-500 ease-out group-hover:w-20"
                />
              </div>
            </Reveal>
          ))}

          {/* Abschlusskachel */}
          <Reveal delay={0.25} className="bg-accent-soft text-fg">
            <div className="flex h-full flex-col justify-between p-7 sm:p-9">
              <p className="font-mono text-[0.75rem] sm:text-[0.68rem] uppercase tracking-[0.18em]">
                Preis-Leistung
              </p>
              <p className="mt-8 font-display text-xl font-extrabold uppercase leading-tight">
                Ein sehr faires Preis-Leistungs-Verhältnis – auf Anfrage.
              </p>
              <a href="#kontakt" className="btn-accent mt-8 w-full">
                Angebot einholen
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
