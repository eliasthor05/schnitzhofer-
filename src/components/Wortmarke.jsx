/**
 * Wortmarke nach der echten Visitenkarte: "SCHNITZHOFER" fett und schraeg
 * gestellt in Marken-Tuerkis, darunter "TRANSPORTE & ERDBEWEGUNG" mit
 * tuerkisem Kaufmanns-Und.
 *
 * Bewusst als Typo-Lockup und nicht als nachgezeichnete SVG-Pfade: die
 * Buchstabenformen von Hand zu vektorisieren wird ungenau und
 * wartungsfeindlich. So ist es in jeder Groesse scharf und per CSS einfaerbbar.
 *
 * Die Schraegstellung kommt per skewX statt ueber den Kursivschnitt - das
 * entspricht der mechanischen Neigung der Vorlage genau und spart eine
 * zusaetzliche Schriftdatei.
 *
 * TODO Kunde: echtes Vektorlogo (AI/EPS/SVG) anfordern und hier eintauschen.
 */
export default function Wortmarke({ className = '', compact = false, invert = false }) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span className="overflow-hidden pr-[0.12em]">
        <span
          className={`block font-display font-extrabold uppercase ${
            invert ? 'text-white' : 'text-accent'
          } ${compact ? 'text-[1.05rem]' : 'text-[1.18rem]'}`}
          style={{
            transform: 'skewX(-9deg)',
            fontVariationSettings: "'wdth' 98",
            letterSpacing: '0.005em',
          }}
        >
          Schnitzhofer
        </span>
      </span>
      {!compact && (
        <span
          className={`mt-[0.34em] font-mono text-[0.5rem] font-medium uppercase tracking-[0.16em] sm:text-[0.54rem] ${
            invert ? 'text-white/70' : 'text-fg'
          }`}
        >
          Transporte <span className="text-accent">&amp;</span> Erdbewegung
        </span>
      )}
    </span>
  )
}
