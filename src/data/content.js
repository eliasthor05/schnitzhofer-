// ---------------------------------------------------------------------------
// Alle Inhalte stammen 1:1 von m.trans-schnitzhofer.at (Stand 09/2026).
// Nichts hier ist erfunden. Ein Ort zum Pflegen.
// ---------------------------------------------------------------------------

export const firma = {
  name: 'Schnitzhofer Transporte u. Erdbewegung GmbH',
  kurz: 'Schnitzhofer',
  claim: 'Schnitzhofer steht für Bewegung',
  gf: 'Johann Matthias Schnitzhofer',
  strasse: 'Döllerhof 110',
  plz: '5441',
  ort: 'Abtenau',
  land: 'Österreich',
  telefon: '+43 6243 2321-0',
  telefonHref: 'tel:+43624323210',
  fax: '+43 6243 2321-4',
  email: 'trans.schnitzhofer@aon.at',
  uid: 'ATU64534515',
  fnr: '316311p',
  fgericht: 'Landesgericht Salzburg',
  gewerbe: 'Güterbeförderungsgewerbe, Erdbeweger, Steinbruchunternehmer',
  kammer: 'WKO Salzburg',
  behoerde: 'Bezirkshauptmannschaft Hallein',
  gebiet: 'Tennengau und Umgebung',
  maps: 'https://www.google.com/maps/search/?api=1&query=D%C3%B6llerhof+110+5441+Abtenau',
}

export const nav = [
  { label: 'Sparten', href: '#sparten' },
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Referenzen', href: '#referenzen' },
  { label: 'Fuhrpark', href: '#fuhrpark' },
  { label: 'Kontakt', href: '#kontakt' },
]

// Marquee — greift den Claim "Bewegung" wörtlich auf
export const marquee = [
  'Aushubarbeiten',
  'Kippertransporte',
  'Steinsätze',
  'Forstwegebau',
  'Abbrucharbeiten',
  'Kranarbeiten',
  'Kanalbau',
  'Tieflader',
  'Landschaftsbau',
  'Schneeräumung',
  'Stückgut',
  'Mischgut',
]

export const kennzahlen = [
  { wert: 3, suffix: '', label: 'Generationen im Familienbetrieb' },
  { wert: 100, suffix: '%', label: 'der Vereinbarungen werden eingehalten' },
  { wert: 1, suffix: '', label: 'eigene Deponie für Bodenaushub' },
  { wert: 2, suffix: '', label: 'Sparten aus einer Hand' },
]

export const sparten = [
  {
    id: 'erdbewegung',
    nummer: '01',
    titel: 'Erdbewegung',
    untertitel: 'Ihr verlässlicher Partner auf dem Bau',
    text: 'Im Bereich Erdbauarbeiten verfügt die Schnitzhofer GmbH über einen exzellent ausgestatteten Fuhrpark an Gerätschaften. Für uns ist es unerheblich, ob es sich um eine kleine Baustelle oder eine Großbaustelle handelt – wir arbeiten stets präzise, termintreu und sauber.',
    bild: 'erdbewegung',
    leistungen: [
      'Sämtliche Aushubarbeiten',
      'Straßen- und Forstwegebau',
      'Steinsätze für Bachverbauungen und Gartenmauern',
      'Landschaftsbau',
      'Leitungs- und Kanalbau',
      'Abbrucharbeiten',
    ],
  },
  {
    id: 'transporte',
    nummer: '02',
    titel: 'Transporte',
    untertitel: 'Alles, was Sie für Ihr Bauvorhaben brauchen',
    text: 'Ob Schotter, Steine, Erdmaterial, Sand, Mischgut oder Humus – wir transportieren mit unseren LKWs alles sicher und zuverlässig zu Ihrer Baustelle. Täglicher Stückgutverkehr von der Botenzentrale Salzburg bis ins Lammertal.',
    bild: 'transporte',
    leistungen: [
      'Kippertransporte',
      'Tägliche Stückguttransporte · Botendienst · Paketdienst',
      'Aushubtransporte inkl. Übernahme auf eigene Deponie',
      'Stein- und Schottertransporte',
      'Mischguttransporte',
      'Hebe- und Kranarbeiten',
      'Tiefladertransporte',
    ],
  },
]

// Leistungsverzeichnis — vom Kunden freigegebene Liste (Stand 09/2026)
export const leistungen = [
  { t: 'Transporte', s: 'Transporte', b: 'transporte' },
  { t: 'Botendienst – Paketdienst – Stückguttransport', s: 'Transporte', b: 'transporte' },
  { t: 'Tiefladetransporte', s: 'Transporte', b: 'transporte' },
  { t: 'Erdbewegung – Baggerarbeiten', s: 'Erdbewegung', b: 'erdbewegung' },
  { t: 'Abbrucharbeiten', s: 'Erdbewegung', b: 'abbruch' },
  { t: 'Kranarbeiten', s: 'Transporte', b: 'baugrube' },
  { t: 'Schneeräumung', s: 'Winterdienst', b: 'winter' },
]

// TODO Kunde: Bildunterschriften sind aus den Fotos interpretiert
// und müssen von Schnitzhofer bestätigt werden.
export const referenzen = [
  { b: 'erdbewegung', titel: 'Hangrodung', ort: 'Forstweg, Tennengau' },
  { b: 'steinsatz', titel: 'Steinsatz-Stützmauer', ort: 'Neubau, Abtenau' },
  { b: 'rodung', titel: 'Schlägerung mit Greifer', ort: 'Waldbestand' },
  { b: 'forstweg', titel: 'Forstwegebau am Steilhang', ort: 'Lammertal' },
  { b: 'baugrube', titel: 'Baugrubenaushub', ort: 'Ortsgebiet Abtenau' },
  { b: 'abbruch', titel: 'Abbruch Altbestand', ort: 'Tennengau' },
  { b: 'fertig-a', titel: 'Zufahrt & Hangsicherung', ort: 'Wohnbau' },
  { b: 'fertig-b', titel: 'Steinmauern, fertiggestellt', ort: 'Wohnbau' },
  { b: 'winter', titel: 'Winterdienst im Schneefall', ort: 'Tennengau' },
]

export const fuhrpark = [
  { titel: 'Kettenbagger', text: 'Für Aushub jeder Größenordnung – vom Hausbau bis zur Großbaustelle.' },
  { titel: 'Kipper-LKW', text: 'Schotter, Steine, Erdmaterial, Sand, Mischgut und Humus.' },
  { titel: 'Tieflader', text: 'Transport schwerer Gerätschaften und Maschinen.' },
  { titel: 'Kran', text: 'Hebe- und Kranarbeiten direkt auf der Baustelle.' },
  { titel: 'Winterdienstgerät', text: 'Schneepflug und Streutechnik für die kalte Jahreszeit.' },
]

export const projektarten = [
  'Erdbewegung / Aushub',
  'Transport / Kipper',
  'Steinsatz / Landschaftsbau',
  'Abbruch',
  'Kranarbeiten',
  'Winterdienst',
  'Sonstiges',
]
