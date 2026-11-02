import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Schriften selbst gehostet: die Seite ersetzt Google Maps bewusst durch eine
// eigene SVG-Karte, damit keine Nutzer-IP an Google geht. Ein Google-Fonts-Link
// haette genau das wieder ausgehebelt.
import '@fontsource-variable/archivo/wdth.css'
import '@fontsource-variable/geist'
import '@fontsource-variable/geist-mono'

import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
