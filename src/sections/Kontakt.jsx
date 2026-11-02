import { useState } from 'react'
import { Phone, Mail, MapPin, Check, Loader2 } from 'lucide-react'
import Reveal from '../components/Reveal.jsx'
import { firma, projektarten } from '../data/content.js'

const LEER = { name: '', telefon: '', email: '', art: '', nachricht: '' }

export default function Kontakt() {
  const [werte, setWerte] = useState(LEER)
  const [fehler, setFehler] = useState({})
  const [status, setStatus] = useState('idle') // idle | senden | fertig

  const setzen = (feld) => (e) => {
    setWerte((v) => ({ ...v, [feld]: e.target.value }))
    if (fehler[feld]) setFehler((f) => ({ ...f, [feld]: undefined }))
  }

  const pruefen = () => {
    const f = {}
    if (!werte.name.trim()) f.name = 'Bitte geben Sie Ihren Namen an.'
    if (!werte.telefon.trim() && !werte.email.trim())
      f.telefon = 'Bitte Telefonnummer oder E-Mail angeben, damit wir antworten können.'
    if (werte.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(werte.email))
      f.email = 'Diese E-Mail-Adresse sieht nicht vollständig aus.'
    if (!werte.nachricht.trim())
      f.nachricht = 'Beschreiben Sie kurz Ihr Vorhaben – Ort, Umfang, Wunschtermin.'
    return f
  }

  const absenden = (e) => {
    e.preventDefault()
    const f = pruefen()
    setFehler(f)
    if (Object.keys(f).length > 0) {
      document.querySelector('[aria-invalid="true"]')?.focus()
      return
    }
    setStatus('senden')
    // DEMO: kein Backend angebunden. Später Resend / Formspree / n8n-Webhook.
    setTimeout(() => setStatus('fertig'), 850)
  }

  const feldKlasse = (feld) =>
    `w-full rounded-field border bg-bg px-4 py-3.5 text-[16px] text-fg outline-none transition-colors duration-200 placeholder:text-fg-muted focus:border-accent-deep ${
      fehler[feld] ? 'border-signal-ink' : 'border-line-strong'
    }`

  const vorname = werte.name.trim().split(/\s+/)[0]

  return (
    <section id="kontakt" className="hair-t bg-surface text-fg">
      <div className="shell grid gap-14 py-24 lg:grid-cols-[1fr_1.15fr] lg:gap-20 lg:py-32">
        {/* Linke Spalte: Ansprache + Daten */}
        <div>
          <Reveal>
            <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-fg-muted">
              <span className="text-accent-deep">06</span> &nbsp;/&nbsp; Kontakt
            </p>
          </Reveal>

          <Reveal delay={0.06}>
            <h2 className="t-section mt-6 max-w-[12ch] uppercase">
              Reden wir über Ihr Projekt.
            </h2>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="measure mt-6 text-fg-muted">
              Sie benötigen einen Baugrubenaushub, ein Biotop oder eine Zufahrt? Rufen Sie
              uns an – gerne besprechen wir die Details.
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="mt-12 border-t border-line">
              <a
                href={firma.telefonHref}
                className="flex cursor-pointer items-center gap-4 border-b border-line py-5"
              >
                <Phone size={18} strokeWidth={2.2} aria-hidden="true" />
                <span>
                  <span className="block font-mono text-[0.72rem] sm:text-[0.62rem] uppercase tracking-[0.2em] text-fg-muted">
                    Telefon
                  </span>
                  <span className="mt-1 block font-display text-xl font-extrabold">
                    {firma.telefon}
                  </span>
                </span>
              </a>

              <a
                href={`mailto:${firma.email}`}
                className="flex cursor-pointer items-center gap-4 border-b border-line py-5"
              >
                <Mail size={18} strokeWidth={2.2} aria-hidden="true" />
                <span className="min-w-0">
                  <span className="block font-mono text-[0.72rem] sm:text-[0.62rem] uppercase tracking-[0.2em] text-fg-muted">
                    E-Mail
                  </span>
                  <span className="mt-1 block break-all font-display text-lg font-extrabold">
                    {firma.email}
                  </span>
                </span>
              </a>

              <div className="flex items-center gap-4 border-b border-line py-5">
                <MapPin size={18} strokeWidth={2.2} aria-hidden="true" />
                <span>
                  <span className="block font-mono text-[0.72rem] sm:text-[0.62rem] uppercase tracking-[0.2em] text-fg-muted">
                    Standort
                  </span>
                  <span className="mt-1 block font-display text-lg font-extrabold">
                    {firma.strasse}, {firma.plz} {firma.ort}
                  </span>
                </span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Rechte Spalte: Formular */}
        <Reveal delay={0.1}>
          {status === 'fertig' ? (
            <div
              role="status"
              className="flex h-full min-h-[380px] flex-col items-start justify-center rounded-card border border-line bg-bg p-10"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-pill bg-accent-deep text-white">
                <Check size={22} strokeWidth={2.6} aria-hidden="true" />
              </span>
              <h3 className="mt-7 font-display text-3xl font-extrabold uppercase">
                Anfrage notiert
              </h3>
              <p className="measure mt-4 text-fg-muted">
                Vielen Dank{vorname ? `, ${vorname}` : ''}. Wir melden uns in der Regel noch
                am selben Werktag. Wenn es eilt, rufen Sie uns direkt an.
              </p>
              <a href={firma.telefonHref} className="btn-dark mt-8">
                <Phone size={15} aria-hidden="true" />
                {firma.telefon}
              </a>
            </div>
          ) : (
            <form onSubmit={absenden} noValidate className="space-y-5">
              <div>
                <label
                  htmlFor="k-name"
                  className="mb-2 block font-mono text-[0.75rem] sm:text-[0.66rem] uppercase tracking-[0.18em]"
                >
                  Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="k-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  value={werte.name}
                  onChange={setzen('name')}
                  aria-invalid={Boolean(fehler.name)}
                  aria-describedby={fehler.name ? 'k-name-fehler' : undefined}
                  className={feldKlasse('name')}
                  placeholder="Vor- und Nachname"
                />
                {fehler.name && (
                  <p id="k-name-fehler" role="alert" className="mt-2 text-sm text-signal-ink">
                    {fehler.name}
                  </p>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="k-tel"
                    className="mb-2 block font-mono text-[0.75rem] sm:text-[0.66rem] uppercase tracking-[0.18em]"
                  >
                    Telefon
                  </label>
                  <input
                    id="k-tel"
                    name="telefon"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={werte.telefon}
                    onChange={setzen('telefon')}
                    aria-invalid={Boolean(fehler.telefon)}
                    aria-describedby={fehler.telefon ? 'k-tel-fehler' : undefined}
                    className={feldKlasse('telefon')}
                    placeholder="+43 …"
                  />
                  {fehler.telefon && (
                    <p id="k-tel-fehler" role="alert" className="mt-2 text-sm text-signal-ink">
                      {fehler.telefon}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="k-mail"
                    className="mb-2 block font-mono text-[0.75rem] sm:text-[0.66rem] uppercase tracking-[0.18em]"
                  >
                    E-Mail
                  </label>
                  <input
                    id="k-mail"
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={werte.email}
                    onChange={setzen('email')}
                    aria-invalid={Boolean(fehler.email)}
                    aria-describedby={fehler.email ? 'k-mail-fehler' : undefined}
                    className={feldKlasse('email')}
                    placeholder="name@firma.at"
                  />
                  {fehler.email && (
                    <p id="k-mail-fehler" role="alert" className="mt-2 text-sm text-signal-ink">
                      {fehler.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="k-art"
                  className="mb-2 block font-mono text-[0.75rem] sm:text-[0.66rem] uppercase tracking-[0.18em]"
                >
                  Art des Projekts
                </label>
                <select
                  id="k-art"
                  name="art"
                  value={werte.art}
                  onChange={setzen('art')}
                  className={`${feldKlasse('art')} cursor-pointer`}
                >
                  <option value="">Bitte wählen …</option>
                  {projektarten.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="k-text"
                  className="mb-2 block font-mono text-[0.75rem] sm:text-[0.66rem] uppercase tracking-[0.18em]"
                >
                  Ihr Vorhaben <span aria-hidden="true">*</span>
                </label>
                <textarea
                  id="k-text"
                  name="nachricht"
                  rows={5}
                  value={werte.nachricht}
                  onChange={setzen('nachricht')}
                  aria-invalid={Boolean(fehler.nachricht)}
                  aria-describedby={fehler.nachricht ? 'k-text-fehler' : 'k-text-hilfe'}
                  className={`${feldKlasse('nachricht')} resize-y`}
                  placeholder="Ort der Baustelle, Umfang, Wunschtermin …"
                />
                {fehler.nachricht ? (
                  <p id="k-text-fehler" role="alert" className="mt-2 text-sm text-signal-ink">
                    {fehler.nachricht}
                  </p>
                ) : (
                  <p id="k-text-hilfe" className="mt-2 text-sm text-fg-muted">
                    Je konkreter, desto genauer können wir kalkulieren.
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'senden'}
                className="btn-accent w-full disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === 'senden' ? (
                  <>
                    <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                    Wird gesendet
                  </>
                ) : (
                  'Anfrage absenden'
                )}
              </button>

              <p className="text-xs text-fg-muted">
                Pflichtfelder sind mit * gekennzeichnet. Ihre Angaben werden ausschließlich
                zur Bearbeitung der Anfrage verwendet.
              </p>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
