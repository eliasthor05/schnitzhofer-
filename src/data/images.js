// Zentrale Bildregistratur. Quellen: Originalfotos der Bestandsseite,
// per KI auf 4K hochskaliert, anschließend zu WebP konvertiert
// (siehe scripts/build-images.mjs).

import erdbewegung1600 from '../assets/img/erdbewegung-1600.webp'
import erdbewegung2560 from '../assets/img/erdbewegung-2560.webp'
import steinsatz1600 from '../assets/img/steinsatz-1600.webp'
import steinsatz2560 from '../assets/img/steinsatz-2560.webp'
import rodung1600 from '../assets/img/rodung-1600.webp'
import rodung2560 from '../assets/img/rodung-2560.webp'
import forstweg1600 from '../assets/img/forstweg-1600.webp'
import forstweg2560 from '../assets/img/forstweg-2560.webp'
import baugrube1600 from '../assets/img/baugrube-1600.webp'
import baugrube2560 from '../assets/img/baugrube-2560.webp'
import abbruch1600 from '../assets/img/abbruch-1600.webp'
import abbruch2560 from '../assets/img/abbruch-2560.webp'
import fertigA1600 from '../assets/img/fertig-a-1600.webp'
import fertigA2560 from '../assets/img/fertig-a-2560.webp'
import fertigB1600 from '../assets/img/fertig-b-1600.webp'
import fertigB2560 from '../assets/img/fertig-b-2560.webp'
import winter1600 from '../assets/img/winter-1600.webp'
import winter2560 from '../assets/img/winter-2560.webp'

// Strichzeichnung aus der Visitenkarte: LKW mit Kran, der von einem
// Kettenbagger beladen wird. Freigestellt und auf Marken-Tuerkis gefaerbt,
// erzeugt von scripts/build-illustration.mjs
import illu900 from '../assets/img/illu-lkw-bagger-900.webp'
import illu1800 from '../assets/img/illu-lkw-bagger-1800.webp'

export const images = {
  erdbewegung: { w1600: erdbewegung1600, w2560: erdbewegung2560 },
  steinsatz: { w1600: steinsatz1600, w2560: steinsatz2560 },
  rodung: { w1600: rodung1600, w2560: rodung2560 },
  forstweg: { w1600: forstweg1600, w2560: forstweg2560 },
  baugrube: { w1600: baugrube1600, w2560: baugrube2560 },
  transporte: { w1600: baugrube1600, w2560: baugrube2560 },
  abbruch: { w1600: abbruch1600, w2560: abbruch2560 },
  'fertig-a': { w1600: fertigA1600, w2560: fertigA2560 },
  'fertig-b': { w1600: fertigB1600, w2560: fertigB2560 },
  winter: { w1600: winter1600, w2560: winter2560 },
}

/** Die Marken-Illustration steht ausserhalb der Fotoliste - anderes Seitenverhaeltnis, Alphakanal. */
export const illustration = {
  w900: illu900,
  w1800: illu1800,
  alt: 'Strichzeichnung: Kipper-LKW von Schnitzhofer wird von einem Kettenbagger beladen',
}

// Alt-Texte, getrennt gepflegt (Barrierefreiheit)
export const alts = {
  erdbewegung: 'Kettenbagger von Schnitzhofer bei Rodungsarbeiten an einem bewaldeten Steilhang',
  steinsatz: 'Massive Steinsatz-Stützmauer vor einem Rohbau, ausgeführt von Schnitzhofer',
  rodung: 'Bagger mit Holzgreifer bei Schlägerungsarbeiten im Wald',
  forstweg: 'Bagger beim Forstwegebau an einer Felswand im steilen Gelände',
  baugrube: 'Kipper-LKW und Bagger bei einem Baugrubenaushub vor Bergpanorama',
  transporte: 'Kipper-LKW und Bagger von Schnitzhofer im Einsatz auf einer Baustelle',
  abbruch: 'Bagger beim Abbruch eines alten Wohnhauses',
  'fertig-a': 'Fertiggestellte Zufahrt mit Steinsatz-Hangsicherung an einem Wohnhaus',
  'fertig-b': 'Wohnhaus mit fertiggestellten Natursteinmauern und angelegter Wiese',
  winter: 'Traktor mit Schneepflug beim Winterdienst auf einer verschneiten Straße',
}
