import Rechtsseite, { Abschnitt } from './Rechtsseite.jsx'
import { firma } from '../data/content.js'

export default function Datenschutz() {
  return (
    <Rechtsseite titel="Datenschutz&shy;erklärung">
      <p className="text-[0.95rem]">
        Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir
        verarbeiten Ihre Daten ausschließlich auf Grundlage der gesetzlichen Bestimmungen
        (DSGVO, TKG 2021).
      </p>

      <Abschnitt titel="Verantwortlicher">
        <p className="text-fg">{firma.name}</p>
        <p>
          {firma.strasse}, {firma.plz} {firma.ort}, {firma.land}
          <br />
          Telefon: {firma.telefon}
          <br />
          E-Mail: {firma.email}
        </p>
      </Abschnitt>

      <Abschnitt titel="Kontaktaufnahme">
        <p>
          Wenn Sie uns per Formular, E-Mail oder Telefon kontaktieren, werden Ihre Angaben
          zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns
          gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche
          Maßnahmen) beziehungsweise lit. f DSGVO (berechtigtes Interesse an der
          Beantwortung Ihrer Anfrage).
        </p>
        <p>
          Diese Daten geben wir nicht ohne Ihre Einwilligung weiter und löschen sie, sobald
          der Zweck der Verarbeitung entfällt und keine gesetzlichen Aufbewahrungsfristen
          entgegenstehen.
        </p>
      </Abschnitt>

      <Abschnitt titel="Server-Logfiles">
        <p>
          Der Webhoster erhebt und speichert automatisch Informationen in sogenannten
          Server-Logfiles, die Ihr Browser übermittelt: Browsertyp und -version, verwendetes
          Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der
          Serveranfrage und IP-Adresse. Diese Daten werden nicht mit anderen Datenquellen
          zusammengeführt und dienen der technischen Sicherheit sowie dem stabilen Betrieb
          (Art. 6 Abs. 1 lit. f DSGVO).
        </p>
      </Abschnitt>

      <Abschnitt titel="Cookies">
        <p>
          Diese Website verwendet keine Cookies zu Analyse- oder Marketingzwecken.
          Technisch notwendige Daten werden nur im Rahmen des Seitenaufrufs verarbeitet.
        </p>
      </Abschnitt>

      <Abschnitt titel="Schriftarten">
        <p>
          Die verwendeten Schriftarten werden lokal von diesem Server ausgeliefert. Es
          besteht keine Verbindung zu Google Fonts oder einem anderen externen Anbieter,
          und es wird dabei keine IP-Adresse an Dritte übertragen.
        </p>
      </Abschnitt>

      <Abschnitt titel="Ihre Rechte">
        <p>
          Ihnen stehen grundsätzlich die Rechte auf Auskunft, Berichtigung, Löschung,
          Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch zu. Wenden
          Sie sich dazu an die oben genannten Kontaktdaten.
        </p>
        <p>
          Wenn Sie glauben, dass die Verarbeitung Ihrer Daten gegen das Datenschutzrecht
          verstößt, können Sie sich bei der Österreichischen Datenschutzbehörde
          beschweren:{' '}
          <a
            href="https://www.dsb.gv.at"
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-fg transition-colors duration-200 hover:text-accent-deep"
          >
            dsb.gv.at
          </a>
        </p>
      </Abschnitt>
    </Rechtsseite>
  )
}
