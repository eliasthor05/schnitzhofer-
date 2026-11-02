import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import Marquee from '../components/Marquee.jsx'
import Hero from '../sections/Hero.jsx'
import Manifest from '../sections/Manifest.jsx'
import Sparten from '../sections/Sparten.jsx'
import LeistungsIndex from '../sections/LeistungsIndex.jsx'
import Referenzen from '../sections/Referenzen.jsx'
import Fuhrpark from '../sections/Fuhrpark.jsx'
import Winterdienst from '../sections/Winterdienst.jsx'
import Einsatzgebiet from '../sections/Einsatzgebiet.jsx'
import Kontakt from '../sections/Kontakt.jsx'
import { marquee } from '../data/content.js'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div className="hair-t bg-bg">
          <Marquee items={marquee} />
        </div>
        <Manifest />
        <Sparten />
        <LeistungsIndex />
        <Referenzen />
        <Fuhrpark />
        <Winterdienst />
        <Einsatzgebiet />
        <Kontakt />
      </main>
      <Footer />
    </>
  )
}
