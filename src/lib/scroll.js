/**
 * Zugriff auf den Seitenscroll von ueberall her.
 *
 * Auf dem Desktop laeuft Lenis und faengt window.scrollTo ab - wer dort
 * nativ scrollt, kaempft gegen die Glaettung. Auf Touch laeuft Lenis
 * bewusst nicht (siehe lib/media.js), dort ist der native Scroll richtig.
 * Diese Datei haelt deshalb fest, welcher Weg gerade der richtige ist.
 */

let lenis = null

/** Wird von App.jsx aufgerufen, sobald Lenis startet bzw. endet. */
export function lenisSetzen(instanz) {
  lenis = instanz
}

/** Zurueck an den Seitenanfang - ueber den Hero, ganz nach oben. */
export function zumSeitenanfang() {
  if (lenis) {
    lenis.scrollTo(0)
    return
  }

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}
