import Rechtsseite, { Abschnitt } from './Rechtsseite.jsx'
import { firma } from '../data/content.js'

export default function Impressum() {
  return (
    <Rechtsseite titel="Impressum">
      <p className="text-[0.95rem]">
        Offenlegung gemäß § 25 Mediengesetz und Informationspflicht laut § 5 E-Commerce-Gesetz.
      </p>

      <Abschnitt titel="Medieninhaber und Herausgeber">
        <p className="text-fg">{firma.name}</p>
        <p>
          {firma.strasse}
          <br />
          {firma.plz} {firma.ort}
          <br />
          {firma.land}
        </p>
      </Abschnitt>

      <Abschnitt titel="Geschäftsführung">
        <p>{firma.gf}</p>
      </Abschnitt>

      <Abschnitt titel="Kontakt">
        <p>
          Telefon:{' '}
          <a
            href={firma.telefonHref}
            className="cursor-pointer text-fg transition-colors duration-200 hover:text-accent-deep"
          >
            {firma.telefon}
          </a>
        </p>
        <p>Fax: {firma.fax}</p>
        <p>
          E-Mail:{' '}
          <a
            href={`mailto:${firma.email}`}
            className="cursor-pointer break-all text-fg transition-colors duration-200 hover:text-accent-deep"
          >
            {firma.email}
          </a>
        </p>
      </Abschnitt>

      <Abschnitt titel="Unternehmensdaten">
        <p>UID-Nummer: {firma.uid}</p>
        <p>Firmenbuchnummer: {firma.fnr}</p>
        <p>Firmenbuchgericht: {firma.fgericht}</p>
        <p>Rechtsform: Gesellschaft mit beschränkter Haftung</p>
        <p>Unternehmensgegenstand: {firma.gewerbe}</p>
      </Abschnitt>

      <Abschnitt titel="Kammerzugehörigkeit und Aufsicht">
        <p>Mitglied der Wirtschaftskammer Salzburg ({firma.kammer})</p>
        <p>Aufsichtsbehörde: {firma.behoerde}</p>
        <p>
          Anwendbare Rechtsvorschrift: Gewerbeordnung, abrufbar unter{' '}
          <a
            href="https://www.ris.bka.gv.at"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-fg transition-colors duration-200 hover:text-accent-deep"
          >
            ris.bka.gv.at
          </a>
        </p>
      </Abschnitt>

      <Abschnitt titel="Online-Streitbeilegung">
        <p>
          Verbraucher haben die Möglichkeit, Beschwerden an die Online-Streitbeilegungs-
          plattform der EU zu richten:{' '}
          <a
            href="https://ec.europa.eu/odr"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-fg transition-colors duration-200 hover:text-accent-deep"
          >
            ec.europa.eu/odr
          </a>
          . Eine Beschwerde kann auch direkt an die oben angeführte E-Mail-Adresse
          gerichtet werden.
        </p>
      </Abschnitt>

      <Abschnitt titel="Haftung für Inhalte und Links">
        <p>
          Die Inhalte dieser Website werden mit größtmöglicher Sorgfalt erstellt. Für die
          Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr
          übernommen werden.
        </p>
        <p>
          Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte kein
          Einfluss besteht. Für die Inhalte der verlinkten Seiten ist stets der jeweilige
          Anbieter verantwortlich.
        </p>
      </Abschnitt>

      <Abschnitt titel="Urheberrecht">
        <p>
          Die auf dieser Website veröffentlichten Inhalte, Texte und Bilder unterliegen dem
          österreichischen Urheberrecht. Jede Verwertung außerhalb der Grenzen des
          Urheberrechts bedarf der vorherigen schriftlichen Zustimmung.
        </p>
      </Abschnitt>
    </Rechtsseite>
  )
}
