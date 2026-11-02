# Schnitzhofer — Stand 02.11.2026 (4. Sitzung: Deployment + Mobil-Optimierung)

Akquise-Demo für **Schnitzhofer Transporte u. Erdbewegung GmbH**, Döllerhof 110, 5441 Abtenau.
Alle Inhalte stammen von der Bestandsseite `m.trans-schnitzhofer.at` und von der
Visitenkarte — nichts erfunden.

## Starten
```bash
cd schnitzhofer
npm install
npm run dev     # http://localhost:5173
npm run build   # grün
npm run lint    # sauber
```

## Live

**https://schnitzhofer.vercel.app** — GitHub `eliasthor05/schnitzhofer-`, Vercel-Team Thor.
Auto-Deploy bei jedem Push auf `main`.

`vercel.json` traegt den SPA-Rewrite: ohne ihn laufen `/impressum` und `/datenschutz`
beim Direktaufruf in einen 404, weil der Router im Browser sitzt.

`src/assets/up/` (107 MB 4K-Upscales) ist gitignored — reine Zwischenstufe fuer
`scripts/build-images.mjs`. Die ausgelieferten WebPs in `src/assets/img/` sind
versioniert; die Upscales liegen nur lokal.

## Mobil (4. Sitzung)

Auf Touch lief bis dahin die volle Desktop-Maschinerie mit, obwohl dort kaum etwas
davon zu sehen ist. Schalter fuer alles Folgende ist `src/lib/media.js`
(`useDesktopEffekte`: ab 1024px **und** feiner Zeiger).

| Abgeschaltet auf Touch | Warum |
|---|---|
| **Lenis** | glaettet das Mausrad; auf Touch gibt es keins, es blieb der Dauer-rAF-Loop, der gegen den nativen Momentum-Scroll arbeitet |
| **Hero-Parallax** | zwei grosse Bilder pro Frame verschoben, auf dem gestapelten Mobil-Layout kaum sichtbar |
| **Winterdienst-Parallax** | 2560px-Vollbild, das pro Frame **gefiltert und** verschoben wurde |
| **Cursor-Vorschau (LeistungsIndex)** | war nur per CSS versteckt, lief als Federanimation samt 1600px-Foto trotzdem mit |

Beide Parallax-Stellen stecken jetzt in `src/components/Parallax.jsx`. Bewusst eine
Komponente statt eines Hooks in der Sektion: `useScroll` haengt damit an ihrer Montage
und laeuft auf dem Handy gar nicht erst an.

**Ankerspruenge.** Ohne Lenis springt der Browser selbst. Dafuer steht
`scroll-margin-top: 84px` an `section[id]` in `src/index.css` — sonst verschwindet die
Sektionsueberschrift unter der 68px-Leiste. Alle fuenf Nav-Anker landen exakt bei 84px.

**Laufband.** `will-change` entfernt: die laufende Transform befoerdert die Ebene
ohnehin, der Hinweis hielt die 6863px breite Flaeche nur zusaetzlich dauerhaft im
Speicher. Dazu pausiert es per IntersectionObserver, sobald es aus dem Bild ist.

**Lesbarkeit.** Die Mono-Labels blieben auf dem Handy bei 10,2–10,9px. 22 Stellen auf
`text-[0.75rem] sm:text-[0.66rem]` o.ae. gehoben — Mobil mindestens 12px, ab `sm`
zurueck auf den entworfenen Wert. **Nicht wieder auf einen festen Kleinwert
zurueckdrehen.** Der Kennzahlen-Block steht unter 420px einspaltig; im Zweierraster
brach "der Vereinbarungen werden eingehalten" sonst ueber vier Zeilen.

### Gemessen bei 375px (gegen die Live-Seite)

| | |
|---|---|
| Horizontaler Ueberlauf | **0** |
| Klickflaechen unter 44px | **0** |
| Text unter 11,5px | nur das Ampersand der Wortmarke (Logo-Lockup, bleibt) |
| Eingabefelder unter 16px | **0** — kein iOS-Autozoom |
| CLS | **0,0023** |
| JS-Fehler | **0** |

Desktop gegengeprueft: Lenis aktiv, Hero-Parallax gegenlaeufig (−47px / +32px),
Cursor-Vorschau montiert, Laufband laeuft synchron.

> **Hinweis zur Messmethodik:** Scroll-FPS liessen sich hier *nicht* belastbar messen.
> Im nicht fokussierten Fenster drosselt Chrome `requestAnimationFrame` auf 1 Hz — die
> Ausreisser von exakt 1000 ms stammen von der Drosselung, nicht von der Seite. CLS,
> Ueberlauf, Klickflaechen und Schriftgroessen sind davon unabhaengig und belastbar.


## Die Marke

Vorlage: `src/assets/originals/visitenkarte.jpg` (aus dem Downloads-Ordner ins Projekt
übernommen). Daraus ausgelesen:

| Element | Wert |
|---|---|
| Markenfarbe | **`#0098AD`** Petrol/Türkis — dominanter Farbcluster der Karte |
| Grundfläche | Reinweiß |
| Wortmarke | „SCHNITZHOFER", fett, schräg gestellt, türkis |
| Subline | „TRANSPORTE **&** ERDBEWEGUNG GmbH", Anthrazit mit türkisem `&` |
| Illustration | Strichzeichnung LKW mit Kran + Kettenbagger |

Das frühere Baustellen-Amber `#F2A20C` war eine Annahme aus einem Logo-Foto und ist raus.

## Was diese Sitzung geändert hat

**Von „Dark Industrial" auf helle Markenwelt.**
Die Token-Namen sind geblieben, nur ihre Werte wurden gekippt (`tailwind.config.js`) —
dadurch haben sich die meisten der 68 `accent`-Klassen und alle Rechtsseiten von selbst
mitgetragen.

```
bg  #FFFFFF   surface #F2F5F6   surface-2 #E7EDEF
fg  #16191B   fg-muted #5C6569
accent #0098AD   accent-deep #00707F   accent-soft #E6F5F8
ink #0B1416      line / line-strong auf dunkle Haarlinien
```

**Zwei Türkistöne, bewusst getrennt.** Weiße Schrift auf dem hellen `#0098AD` erreicht nur
3.45:1 und fiele bei Button-Labels durch AA. Deshalb trägt `accent` die Flächen
(Marquee-Band, Winterdienst) und `accent-deep` alles mit kleiner Schrift — weiß darauf 5.2:1,
auf Weiß als Textfarbe 5.8:1. Entfallen sind `machine` (war selbst Türkis, wäre mit dem
Akzent verschwommen) und `stone`.

**Sektionsrhythmus** — Weiß und Hellgrau im Wechsel, zwei Türkis-Bänder als Taktgeber,
Footer als einziger dunkler Anker:

Hero weiß · Marquee **türkis** · Manifest grau · Sparten weiß · Leistungen grau ·
Referenzen weiß · Fuhrpark grau · Winterdienst **türkis** · Einsatzgebiet weiß ·
Kontakt grau · Footer **dunkel**

**Typografie** — Archivo bleibt für die Versalien-Headlines (so gewünscht), Geist ersetzt
Inter Tight im Fließtext, Geist Mono ersetzt JetBrains Mono bei den Labels.
Alle drei **selbst gehostet** über `@fontsource-variable/*`, importiert in `src/main.jsx`.
Der Google-Fonts-Link in `index.html` ist raus: die Seite ersetzt Google Maps bewusst durch
eine eigene SVG-Karte, um keine Nutzer-IP an Google zu geben — die Schrift-Einbindung hat
genau das wieder ausgehebelt. Der Abschnitt „Schriftarten" in `src/pages/Datenschutz.jsx`
beschreibt jetzt den tatsächlichen Zustand.

**Buttons auf Pill** — voller Radius, Sans statt Mono-Versalien, engerer Sperrsatz,
Pfeil der beim Hover 3 px wandert. Dazu eine Radiusskala (`rounded-card` 16 px,
`rounded-field` 12 px, `rounded-pill`), angewandt auf Karten, Fotorahmen und Formularfelder —
runde Buttons neben messerscharfen Karten hätten nach Versehen ausgesehen.
Neue Variante `.btn-invert` für die Türkisfläche. Die Primäraktion ist überall türkis.

**Wortmarke neu** (`src/components/Wortmarke.jsx`) — nach der echten Karte: schräg
gestelltes „SCHNITZHOFER" in Türkis, darunter die Subline mit türkisem `&`. Das alte
Behelfs-Lockup mit Baggerarm-Icon ist weg. Umgesetzt als Typo-Lockup mit `skewX(-9deg)`,
nicht als nachgezeichnete SVG-Pfade — zwölf Buchstabenformen von Hand zu vektorisieren wäre
ungenau und wartungsfeindlich.

**Hero neu** (`src/sections/Hero.jsx`) — helle Fläche statt Vollbildfoto mit Abdunkler.
Headline mit „BEWEGUNG" in Türkis, darunter ein Bildband: links die freigestellte
Strichzeichnung, rechts ein gerahmtes Baustellenfoto. Beide mit leichtem Parallax.

**Sparten umgebaut** (`src/sections/Sparten.jsx`) — lag vorher als Text direkt auf
abgedunkelten Fotos, das trägt auf heller Fläche nicht mehr. Jetzt Bildkarte oben, Text
darunter; der Hover weitet weiterhin das Panel.

## Die Illustration

`scripts/build-illustration.mjs`, dreistufig:

```bash
node scripts/build-illustration.mjs crop    # 1) Ausschnitt aus der Visitenkarte
#                                             2) illu-quelle.png 4x hochskalieren
#                                                -> src/assets/up/illu-4k.png
node scripts/build-illustration.mjs build   # 3) retuschieren, freistellen, einfärben
```

Drei Dinge, die dabei nötig waren:

1. **Erst hochskalieren, dann freistellen.** Der Upscaler kommt mit weißem Grund besser
   klar als mit Alpha. Ein Lanczos-Upscale wurde zum Vergleich getestet und war bei 1800 px
   deutlich zu weich.
2. **Retusche.** Der Upscaler hat auf der LKW-Tür und am Baggerarm Schriftzüge erfunden
   („9IM9E9", „MODLL TOO18", „MWWWAAHO"). Die Stellen werden mit einer stark
   weichgezeichneten Kopie ihrer selbst übermalt — weiß füllen ging nicht, die Flächen
   tragen einen leichten Grauton und ein weißer Fleck blieb als Rechteck sichtbar.
3. **Auslieferung ohne Alphakanal.** Mit Alpha wog die 1800px-WebP 667 kB, ohne 94 kB.
   Die Zeichnung steht im Hero auf Weiß, der Alphakanal war also reiner Ballast. Der
   Master mit Alpha bleibt als `illu-lkw-bagger.png` für spätere Verwendung liegen.

## Audit nach dem Umbau

Die invertierte Palette hat jeden früheren Messwert ungültig gemacht, deshalb komplett neu
im Browser gemessen — Kontrast jedes Textknotens gegen seinen tatsächlich gerenderten
Hintergrund (halbtransparente Schichten korrekt übereinandergelegt), Klickflächen,
Heading-Hierarchie.

| | 1920 px | 768 px | 390 px |
|---|---|---|---|
| Kontrastfehler | **0** | **0** | **0** |
| Klickflächen unter 44 px | **0** | **0** | **0** |
| Horizontaler Überlauf | 0 | 0 | 0 |

Eine `h1`, Heading-Folge 1,2,2,2,2,2,3,3,3,3,3,2,2,2,2,2 ohne Sprünge. Alle Bilder mit
`alt`, `lang="de"`, Skip-Link vorhanden. `/impressum` und `/datenschutz` geprüft.

Gefunden und behoben: die Kartenbeschriftung „Schematische Darstellung" in
`Einsatzgebiet.jsx` lag bei 2.46:1 (halbtransparentes Grau auf Hellgrau, 9,3 px) → volle
Deckkraft und größer gesetzt.

Bundle: JS 576 kB (192 kB gzip), CSS 30 kB (6,7 kB gzip).

## Offen — hier weitermachen

1. **Echtes Vektorlogo bei Schnitzhofer anfordern** (AI/EPS/SVG) — ersetzt das nachgebaute
   Typo-Lockup in `src/components/Wortmarke.jsx`
2. **Marquee und Sparten führen noch die alte, längere Leistungsliste.** Das
   Leistungsverzeichnis wurde auf die sieben freigegebenen Positionen gekürzt
   (`src/data/content.js`, `leistungen`), das Laufband, die beiden Sparten-Panels und das
   Dropdown „Projektart" im Kontaktformular laufen noch mit der alten Aufzählung
3. **Referenz-Bildunterschriften bestätigen lassen** — Titel und Orte in `content.js`
   (`referenzen`) sind aus den Fotos interpretiert, nicht belegt
4. **Kontaktformular ohne Backend** — `src/sections/Kontakt.jsx`, aktuell lokaler
   Success-State. Später Resend / Formspree / n8n-Webhook
5. **Öffnungszeiten** — auf der Bestandsseite nirgends angegeben, Sektion nicht gebaut
6. **OG-Bild** fehlt noch (`index.html` verweist auf `/og.jpg`)
7. **JS-Bundle 576 kB** (192 kB gzip) — GSAP + motion. Bei Bedarf ScrollTrigger dynamisch
   importieren
8. Noch nicht geprüft: `prefers-reduced-motion` zur Laufzeit, Tastatur-Durchlauf

## Hinweise

- `window.__lenis` ist im Dev-Modus gesetzt (`src/App.jsx`) — Lenis fängt `window.scrollTo`
  ab, ohne diesen Zugriff lässt sich die Seite nicht automatisiert testen.
- Das Fenster ließ sich in dieser Umgebung nicht verkleinern; die Breiten 390 px und 768 px
  wurden über einen iframe gemessen, in dem Media Queries korrekt greifen.
- Sicherungskopie des Stands vor dem Umstyling: `../schnitzhofer-backup-src-20260916-1806/`
