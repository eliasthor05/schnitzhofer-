import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { referenzen } from '../data/content.js'
import { images, alts } from '../data/images.js'

gsap.registerPlugin(ScrollTrigger)

export default function Referenzen() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const wide = window.matchMedia('(min-width: 1024px)').matches
    if (reduce || !wide) return

    const ctx = gsap.context(() => {
      const track = trackRef.current
      const distance = track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: -distance,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${distance + window.innerHeight * 0.6}`,
          pin: true,
          scrub: 0.85,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="referenzen"
      ref={sectionRef}
      className="relative overflow-hidden bg-bg text-fg lg:h-[100svh]"
    >
      <div className="shell pt-20 lg:pt-16">
        <p className="font-mono text-[0.72rem] uppercase tracking-[0.22em] text-fg-muted">
          <span className="text-accent-deep">03</span> &nbsp;/&nbsp; Ausgeführte Arbeiten
        </p>
        <h2 className="t-section mt-5 uppercase">Aus dem Tennengau</h2>
      </div>

      {/* Desktop: horizontal gepinnt. Mobil: Swipe-Slider. */}
      <div
        ref={trackRef}
        className="no-bar mt-10 flex gap-4 overflow-x-auto px-5 pb-10 sm:gap-6 sm:px-8 lg:mt-12 lg:overflow-visible lg:px-12"
        style={{ scrollSnapType: 'x mandatory' }}
      >
        {referenzen.map((r, i) => (
          <figure
            key={r.titel}
            className="relative isolate w-[78vw] shrink-0 sm:w-[52vw] lg:w-[36vw]"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-surface">
              <img
                src={images[r.b].w1600}
                srcSet={`${images[r.b].w1600} 1600w, ${images[r.b].w2560} 2560w`}
                sizes="(max-width: 640px) 78vw, (max-width: 1024px) 52vw, 36vw"
                alt={alts[r.b]}
                width={2560}
                height={1920}
                loading="lazy"
                decoding="async"
                className="fill-abs"
                style={{ filter: 'contrast(1.04) saturate(0.86)' }}
              />
            </div>
            <figcaption className="mt-4 flex items-baseline justify-between gap-4 border-t border-bg/20 pt-3">
              <span>
                <span className="block font-display text-lg font-extrabold uppercase leading-tight">
                  {r.titel}
                </span>
                <span className="mt-1 block font-mono text-[0.66rem] uppercase tracking-[0.16em] text-fg-muted">
                  {r.ort}
                </span>
              </span>
              <span className="font-mono text-[0.66rem] text-fg-muted">
                {String(i + 1).padStart(2, '0')}
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
