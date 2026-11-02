import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import { nav, firma } from '../data/content.js'
import { zumSeitenanfang } from '../lib/scroll.js'
import Wortmarke from './Wortmarke.jsx'

export default function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Auf der Startseite fuehrt der Router-Link ins Leere: dieselbe Route
  // bedeutet keine Navigation, also auch kein Scroll. Dort scrollen wir
  // selbst nach oben. Von Impressum und Datenschutz aus bleibt es eine
  // echte Navigation, den Rest erledigt ScrollToTop in App.jsx.
  const aufsLogo = (e) => {
    if (pathname !== '/') return
    e.preventDefault()

    if (open) {
      setOpen(false)
      // Das offene Menue sperrt body-overflow; solange die Sperre steht,
      // laeuft ein Scroll ins Leere. Zwei Frames warten, bis der Effekt
      // sie aufgehoben hat.
      requestAnimationFrame(() => requestAnimationFrame(zumSeitenanfang))
      return
    }

    zumSeitenanfang()
  }

  useEffect(() => {
    // Die Seite ist durchgehend hell, die Leiste braucht deshalb nur noch
    // ab dem ersten Scrollen eine deckende Flaeche mit Trennlinie.
    const onScroll = () => {
      setSolid(window.scrollY > 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out ${
          solid
            ? 'border-b border-line bg-bg/95 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="shell flex h-[68px] items-center justify-between">
          <Link
            to="/"
            onClick={aufsLogo}
            aria-label="Zum Seitenanfang"
            className="tap cursor-pointer"
          >
            <Wortmarke />
          </Link>

          <nav aria-label="Hauptnavigation" className="hidden items-center gap-9 lg:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="tap t-label cursor-pointer text-fg-muted transition-colors duration-200 hover:text-fg"
              >
                {n.label}
              </a>
            ))}
            <a href={firma.telefonHref} className="btn-accent btn-sm">
              <Phone size={14} strokeWidth={2.2} aria-hidden="true" />
              {firma.telefon}
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Menü öffnen"
            className="-mr-2 flex h-11 w-11 cursor-pointer items-center justify-center lg:hidden"
          >
            <Menu size={24} aria-hidden="true" />
          </button>
        </div>
      </header>

      {/* Mobiles Vollbildmenü */}
      <div
        className={`fixed inset-0 z-[60] bg-bg transition-opacity duration-300 ease-out lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
      >
        <div className="shell flex h-[68px] items-center justify-between">
          {/* Im offenen Menue ist das die sichtbare Wortmarke oben links -
              sie schliesst das Menue und geht an den Seitenanfang. */}
          <Link
            to="/"
            onClick={aufsLogo}
            tabIndex={open ? 0 : -1}
            aria-label="Zum Seitenanfang"
            className="tap cursor-pointer"
          >
            <Wortmarke />
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Menü schließen"
            className="-mr-2 flex h-11 w-11 cursor-pointer items-center justify-center"
            tabIndex={open ? 0 : -1}
          >
            <X size={24} aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Mobile Navigation" className="shell mt-8 flex flex-col">
          {nav.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              tabIndex={open ? 0 : -1}
              className="hair-b cursor-pointer py-5 font-display text-4xl font-extrabold uppercase transition-colors duration-200 hover:text-accent-deep"
            >
              <span className="mr-4 font-mono text-xs align-super text-accent-deep">
                {String(i + 1).padStart(2, '0')}
              </span>
              {n.label}
            </a>
          ))}
          <a
            href={firma.telefonHref}
            tabIndex={open ? 0 : -1}
            className="btn-accent mt-10 w-full"
          >
            <Phone size={15} aria-hidden="true" />
            {firma.telefon}
          </a>
        </nav>
      </div>
    </>
  )
}
