// Wandelt die upgescalten 4K-PNGs in web-taugliche WebP-Varianten um.
// Aufruf: node scripts/build-images.mjs
import sharp from 'sharp'
import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'

const SRC = 'src/assets/up'
const OUT = 'src/assets/img'
const WIDTHS = [1600, 2560]

// Quell-ID -> semantischer Name
const MAP = {
  626327: 'erdbewegung',
  626328: 'steinsatz',
  626329: 'rodung',
  626330: 'forstweg',
  626331: 'baugrube',
  626332: 'abbruch',
  626333: 'fertig-a',
  626334: 'fertig-b',
  626335: 'winter',
}

await mkdir(OUT, { recursive: true })
const files = (await readdir(SRC)).filter((f) => f.endsWith('.png'))

for (const file of files) {
  const id = path.basename(file, '.png')
  const name = MAP[id]
  if (!name) {
    console.warn(`  ? keine Zuordnung für ${id} – übersprungen`)
    continue
  }

  for (const w of WIDTHS) {
    const out = path.join(OUT, `${name}-${w}.webp`)
    await sharp(path.join(SRC, file))
      .resize({ width: w, withoutEnlargement: true })
      .webp({ quality: 82, effort: 5 })
      .toFile(out)
    console.log(`  ✓ ${out}`)
  }
}

console.log(`\nFertig: ${files.length} Quellbilder verarbeitet.`)
