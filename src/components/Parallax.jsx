import { motion, useScroll, useTransform } from 'motion/react'

/**
 * Verschiebt den Inhalt beim Scrollen leicht gegen die Seite.
 *
 * Bewusst eine eigene Komponente statt eines Hooks in der Sektion:
 * useScroll haengt damit an ihrer Montage. Wer sie auf Touch nicht
 * rendert, hat dort auch keinen Scroll-Listener und keinen Transform
 * auf einer grossen Bildflaeche - und genau das kostet auf dem Handy
 * jeden einzelnen Frame.
 */
export default function Parallax({
  ziel,
  von,
  bis,
  offset = ['start start', 'end start'],
  className,
  children,
}) {
  const { scrollYProgress } = useScroll({ target: ziel, offset })
  const y = useTransform(scrollYProgress, [0, 1], [von, bis])

  return (
    <motion.div className={className} style={{ y }}>
      {children}
    </motion.div>
  )
}
