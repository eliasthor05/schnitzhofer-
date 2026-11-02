/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Helle Markenwelt nach der Visitenkarte: Tuerkis auf Weiss.
        // Die Token-Namen sind aus der dunklen Fassung uebernommen, nur die
        // Werte sind gekippt - dadurch tragen sich die bestehenden Klassen mit um.
        bg: '#FFFFFF',
        surface: '#F2F5F6',
        'surface-2': '#E7EDEF',
        fg: '#16191B',
        'fg-muted': '#5C6569',

        // Zwei Tuerkistoene, bewusst getrennt:
        // accent traegt Flaechen und Grafik, accent-deep alles mit kleiner Schrift.
        // Weiss auf #0098AD liegt bei 3.45:1 und faellt bei Button-Labels durch AA,
        // weiss auf #00707F erreicht 5.2:1.
        accent: '#0098AD',
        'accent-deep': '#00707F',
        'accent-soft': '#E6F5F8',
        'accent-fg': '#FFFFFF',

        // Dunkler Anker: Footer, Telefon-Karte, invertierte Buttons.
        ink: '#0B1416',
        'ink-2': '#162024',

        signal: '#E23B26',
        // Rot fuer helle Flaechen: #E23B26 auf Weiss liegt bei 4.0:1.
        'signal-ink': '#8A1C0E',

        line: 'rgba(11,20,22,0.10)',
        'line-strong': 'rgba(11,20,22,0.22)',
      },
      borderRadius: {
        card: '16px',
        field: '12px',
        pill: '999px',
      },
      fontFamily: {
        // Archivo bleibt fuer die Versalien-Headlines - der schwere,
        // breite Schnitt ist gesetzt. Geist uebernimmt Fliesstext und Labels.
        display: ['Archivo Variable', 'Archivo', 'Arial Black', 'sans-serif'],
        sans: ['Geist Variable', 'Geist', 'system-ui', 'sans-serif'],
        mono: ['Geist Mono Variable', 'Geist Mono', 'ui-monospace', 'monospace'],
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.16, 1, 0.3, 1)',
        in: 'cubic-bezier(0.7, 0, 0.84, 0)',
      },
    },
  },
  plugins: [],
}
