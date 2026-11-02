import { useEffect, useState } from 'react'

/**
 * Laeuft die Seite auf einem grossen Bildschirm mit feinem Zeiger?
 *
 * Alle teuren Scroll-Effekte haengen an dieser Frage: Smooth-Scroll,
 * Parallax und das gepinnte Referenz-Band kosten auf dem Handy jeden
 * Frame, sind dort aber kaum zu sehen - die Sektionen stapeln sich
 * ohnehin einspaltig. Auf Touch bleibt deshalb der native Scroll stehen,
 * der fluessiger laeuft als alles, was wir daruebersetzen koennten.
 *
 * Startwert false: so rendert der erste Frame die guenstige Variante.
 * Auf dem Desktop springt nichts, weil die Effekte bei Scrollposition 0
 * ohnehin bei null stehen.
 */
export function useDesktopEffekte() {
  const [an, setAn] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (pointer: fine)')
    const setzen = () => setAn(mq.matches)
    setzen()
    mq.addEventListener('change', setzen)
    return () => mq.removeEventListener('change', setzen)
  }, [])

  return an
}
