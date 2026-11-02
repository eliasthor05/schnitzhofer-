import Reveal from '../components/Reveal.jsx'
import CountUp from '../components/CountUp.jsx'
import { kennzahlen } from '../data/content.js'

export default function Manifest() {
  return (
    <section className="hair-t bg-surface py-24 sm:py-32 lg:py-40">
      <div className="shell">
        <Reveal>
          <p className="t-label mb-12 text-fg-muted">
            <span className="text-accent-deep">00</span> &nbsp;/&nbsp; Das Versprechen
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <blockquote className="max-w-[min(100%,900px)]">
            <p className="t-display uppercase">
              Was wir vereinbaren,{' '}
              <span className="text-accent-deep">halten wir zu 100&nbsp;Prozent ein.</span>
            </p>
          </blockquote>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-20">
            <p className="measure text-fg-muted">
              Das Unternehmen Schnitzhofer wird bereits in der dritten Generation
              erfolgreich geführt. Im Transport- und Erdbewegungsgewerbe läuft nicht
              immer alles nach Plan – aber auf unser Wort können Sie sich verlassen.
            </p>
            <p className="measure text-fg-muted">
              In jedem Fall und bei jedem Projekt geben wir unser Bestes: von Zu- und
              Abtransporten über Grabungen bis zu Kranarbeiten. Erfahrung, moderne
              Ausrüstung und eine saubere Abwicklung – Ihre Zufriedenheit ist unsere
              Prämisse.
            </p>
          </div>
        </Reveal>

        {/* Kennzahlen */}
        <div className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-card border border-line bg-line lg:grid-cols-4">
          {kennzahlen.map((k, i) => (
            <Reveal key={k.label} delay={0.06 * i} className="bg-bg">
              <div className="p-6 sm:p-8">
                <p className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold leading-none text-accent-deep">
                  <CountUp to={k.wert} suffix={k.suffix} />
                </p>
                <p className="mt-4 font-mono text-[0.68rem] uppercase leading-relaxed tracking-[0.14em] text-fg-muted">
                  {k.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
