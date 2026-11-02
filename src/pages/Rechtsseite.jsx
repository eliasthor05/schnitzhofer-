import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'

/** Gemeinsames Gerüst für Impressum und Datenschutzerklärung. */
export default function Rechtsseite({ titel, children }) {
  return (
    <>
      <Nav />
      <main id="inhalt" className="bg-bg pb-24 pt-32 sm:pt-40">
        <div className="shell">
          <Link
            to="/"
            className="inline-flex cursor-pointer items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-fg-muted transition-colors duration-200 hover:text-accent-deep"
          >
            <ArrowLeft size={14} aria-hidden="true" />
            Zurück zur Startseite
          </Link>

          <h1 className="t-display mt-10 uppercase">{titel}</h1>

          <div className="mt-14 max-w-[70ch] space-y-10 text-fg-muted">{children}</div>
        </div>
      </main>
      <Footer />
    </>
  )
}

/** Abschnitt innerhalb einer Rechtsseite. */
export function Abschnitt({ titel, children }) {
  return (
    <section>
      <h2 className="mb-4 font-display text-xl font-extrabold uppercase text-fg">
        {titel}
      </h2>
      <div className="space-y-3 text-[0.95rem] leading-relaxed">{children}</div>
    </section>
  )
}
