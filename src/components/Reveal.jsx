import { motion, useReducedMotion } from 'motion/react'

/**
 * Scroll-Reveal mit Clip-Path. Respektiert prefers-reduced-motion:
 * dann wird der Inhalt sofort und vollständig gezeigt.
 */
export default function Reveal({ children, delay = 0, y = 28, className = '', as = 'div' }) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  if (reduce) return <div className={className}>{children}</div>

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      transition={{ duration: 0.75, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  )
}

/** Zeilenweiser Auftritt für große Headlines. */
export function RevealLines({ lines, className = '', delay = 0 }) {
  const reduce = useReducedMotion()

  return (
    <span className={className}>
      {lines.map((line, i) => (
        <span key={i} className="t-line">
          {reduce ? (
            <span className="block">{line}</span>
          ) : (
            <motion.span
              className="block"
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{
                duration: 1,
                delay: delay + i * 0.09,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {line}
            </motion.span>
          )}
        </span>
      ))}
    </span>
  )
}
