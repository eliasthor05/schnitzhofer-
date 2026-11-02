// Holt die Strichzeichnung (LKW mit Kran + Kettenbagger) aus der Visitenkarte,
// stellt sie frei und faerbt sie auf Marken-Tuerkis.
//
// Ablauf:
//   1) node scripts/build-illustration.mjs crop
//      schneidet den Illustrationsbereich aus der Visitenkarte aus
//      -> src/assets/originals/illu-quelle.png  (noch mit weissem Grund)
//   2) diese Datei per Higgsfield 4x hochskalieren
//      -> src/assets/up/illu-4k.png
//   3) node scripts/build-illustration.mjs build
//      retuschiert, stellt frei, faerbt ein, schreibt die Auslieferungsdateien
//
// Bewusst erst hochskalieren, dann freistellen: der Upscaler kommt mit
// weissem Grund besser klar als mit Alpha, und die Kanten der duennen
// Linien werden bei hoher Aufloesung sauberer getrennt.
import sharp from 'sharp'
import { existsSync } from 'node:fs'
import { mkdir } from 'node:fs/promises'

const KARTE = 'src/assets/originals/visitenkarte.jpg'
const CROP = 'src/assets/originals/illu-quelle.png'
const UP = 'src/assets/up/illu-4k.png'
const OUT = 'src/assets/img'

// Vermessen an der 500x333-Vorlage: links der Textblock, rechts und unten
// der tuerkise Rahmen - dazwischen liegt die Zeichnung.
const BOX = { left: 251, top: 162, width: 217, height: 131 }

// Ab diesem Helligkeitswert gilt ein Pixel als Hintergrund. Knapp unter
// Reinweiss, damit die JPEG-Artefakte rund um die Linien nicht als
// grauer Schleier stehen bleiben.
const WEISS_SCHWELLE = 244

// Der Upscaler hat auf der LKW-Tuer und am Baggerarm Schriftzuege erfunden
// ("9IM9E9", "MODLL TOO18", "MWWWAAHO"). Die Stellen werden mit einer stark
// weichgezeichneten Kopie ihrer selbst uebermalt - schlicht weiss fuellen
// ginge nicht, die Flaechen tragen einen leichten Grauton und ein weisser
// Fleck bliebe als Rechteck sichtbar.
// Koordinaten beziehen sich auf das 1800px breite Zwischenbild.
const RETUSCHE_BREITE = 1800
const RETUSCHE = `
  <rect x="380" y="653" width="163" height="44" rx="8"/>
  <rect x="578" y="654" width="64" height="34" rx="8"/>
  <rect x="382" y="713" width="150" height="38" rx="8"/>
  <polygon points="1146,236 1352,376 1342,404 1136,266"/>
`

/** Weiss zu Alpha, Linienfarbe auf einen Tuerkis-Verlauf gelegt. */
function freistellenUndFaerben(data, info) {
  const px = info.width * info.height
  const out = Buffer.alloc(px * 4)

  // Zwei Stopps: kraeftige Linien tief petrol, feine Schraffuren hell tuerkis.
  const TIEF = [11, 61, 70]
  const HELL = [116, 198, 212]

  for (let i = 0; i < px; i++) {
    const r = data[i * 4]
    const g = data[i * 4 + 1]
    const b = data[i * 4 + 2]

    const l = 0.2126 * r + 0.7152 * g + 0.0722 * b

    if (l >= WEISS_SCHWELLE) {
      out[i * 4 + 3] = 0
      continue
    }

    const a = 1 - l / 255
    // t = wie kraeftig die Linie ist; 0.85 als Deckel, damit auch die
    // dunkelsten Stellen nicht in reines Schwarzgruen kippen.
    const t = Math.min(1, a / 0.85)
    out[i * 4] = Math.round(HELL[0] + (TIEF[0] - HELL[0]) * t)
    out[i * 4 + 1] = Math.round(HELL[1] + (TIEF[1] - HELL[1]) * t)
    out[i * 4 + 2] = Math.round(HELL[2] + (TIEF[2] - HELL[2]) * t)
    out[i * 4 + 3] = Math.round(Math.min(1, a * 1.18) * 255)
  }

  return sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
}

async function crop() {
  await sharp(KARTE).extract(BOX).png().toFile(CROP)
  console.log(`  \u2713 ${CROP}  (${BOX.width}\u00d7${BOX.height})`)
  console.log('\n  Naechster Schritt: diese Datei 4x hochskalieren nach', UP)
}

async function build() {
  const quelle = existsSync(UP) ? UP : CROP
  if (quelle === CROP) {
    console.warn('  ! kein Upscale gefunden - baue aus der Originalaufloesung')
  }
  await mkdir(OUT, { recursive: true })

  // Auf Arbeitsbreite bringen, damit die Retusche-Koordinaten passen.
  const basis = await sharp(quelle).resize({ width: RETUSCHE_BREITE }).png().toBuffer()
  const hoehe = (await sharp(basis).metadata()).height

  const maskeSvg = Buffer.from(
    '<svg width="' + RETUSCHE_BREITE + '" height="' + hoehe + '" xmlns="http://www.w3.org/2000/svg">' +
      '<rect width="100%" height="100%" fill="#000000"/>' +
      '<g fill="#ffffff" filter="url(#w)">' + RETUSCHE + '</g>' +
      '<defs><filter id="w"><feGaussianBlur stdDeviation="5"/></filter></defs>' +
      '</svg>'
  )
  // flatten + removeAlpha: sonst liegt der Alphakanal der SVG mit im Rohpuffer.
  const maske = await sharp(maskeSvg)
    .flatten({ background: '#000000' })
    .greyscale()
    .removeAlpha()
    .raw()
    .toBuffer()
  if (maske.length !== RETUSCHE_BREITE * hoehe) {
    throw new Error('Maske hat ' + maske.length + ' Bytes, erwartet ' + RETUSCHE_BREITE * hoehe)
  }

  // Die Maske von Hand einmischen statt ueber joinChannel: sharp markiert
  // den angehaengten Kanal nicht als Alpha, beim PNG-Export faellt er weg.
  const scharf = await sharp(basis).removeAlpha().raw().toBuffer()
  const unscharf = await sharp(basis).blur(20).removeAlpha().raw().toBuffer()
  const gemischt = Buffer.alloc(scharf.length)
  for (let i = 0; i < maske.length; i++) {
    const m = maske[i] / 255
    for (let k = 0; k < 3; k++) {
      const j = i * 3 + k
      gemischt[j] = Math.round(scharf[j] * (1 - m) + unscharf[j] * m)
    }
  }

  const bereinigt = await sharp(gemischt, {
    raw: { width: RETUSCHE_BREITE, height: hoehe, channels: 3 },
  })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  const fertig = freistellenUndFaerben(bereinigt.data, bereinigt.info)
  console.log(`  Quelle: ${quelle} -> ${RETUSCHE_BREITE}x${hoehe}, retuschiert und eingefaerbt`)

  // Master mit Alphakanal - Ausgangspunkt, falls die Zeichnung spaeter
  // auf einer anderen Flaeche als Weiss stehen soll.
  const png = `${OUT}/illu-lkw-bagger.png`
  await fertig.clone().png({ compressionLevel: 9 }).toFile(png)
  console.log(`  \u2713 ${png}  (Master mit Alpha)`)

  // Auslieferung ohne Alphakanal: die Zeichnung steht im Hero auf Weiss,
  // und der Alphakanal kostet hier das Sechsfache an Dateigroesse
  // (667 kB mit, 108 kB ohne). Der leichte Medianfilter nimmt zusaetzlich
  // das Papierrauschen der Vorlage heraus.
  const flach = await fertig.clone().flatten({ background: '#ffffff' }).median(3).png().toBuffer()

  for (const w of [900, 1800]) {
    const ziel = `${OUT}/illu-lkw-bagger-${w}.webp`
    await sharp(flach)
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(ziel)
    console.log(`  \u2713 ${ziel}`)
  }
}

const modus = process.argv[2] ?? 'build'
if (modus === 'crop') await crop()
else await build()
