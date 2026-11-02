import { Link } from 'react-router-dom'
import { firma } from '../data/content.js'
import Wortmarke from './Wortmarke.jsx'

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="shell grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          <Wortmarke invert />
          <p className="measure mt-6 text-sm text-white/60">
            Erdbewegung, Transporte und Winterdienst im Raum {firma.gebiet}. Seit drei
            Generationen aus {firma.ort}.
          </p>
        </div>

        <div>
          <h2 className="t-label mb-5 text-white/60">Kontakt</h2>
          <address className="space-y-2.5 text-sm not-italic">
            <p>
              {firma.strasse}
              <br />
              {firma.plz} {firma.ort}, {firma.land}
            </p>
            <p>
              <a
                href={firma.telefonHref}
                className="tap cursor-pointer transition-colors duration-200 hover:text-accent"
              >
                {firma.telefon}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${firma.email}`}
                className="tap cursor-pointer break-all transition-colors duration-200 hover:text-accent"
              >
                {firma.email}
              </a>
            </p>
          </address>
        </div>

        <div>
          <h2 className="t-label mb-5 text-white/60">Rechtliches</h2>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link
                to="/impressum"
                className="tap cursor-pointer transition-colors duration-200 hover:text-accent"
              >
                Impressum
              </Link>
            </li>
            <li>
              <Link
                to="/datenschutz"
                className="tap cursor-pointer transition-colors duration-200 hover:text-accent"
              >
                Datenschutzerklärung
              </Link>
            </li>
          </ul>
          <p className="mt-6 font-mono text-[0.68rem] leading-relaxed text-white/60">
            UID {firma.uid}
            <br />
            FN {firma.fnr}
          </p>
        </div>
      </div>

      <div className="hair-t-dark">
        <div className="shell flex flex-col gap-3 py-6 font-mono text-[0.66rem] uppercase tracking-[0.18em] text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {new Date().getFullYear()} {firma.name}
          </span>
          <span>Abtenau · Tennengau · Salzburg</span>
        </div>
      </div>
    </footer>
  )
}
