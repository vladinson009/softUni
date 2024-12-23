import { Route, Routes } from 'react-router-dom'
import './App.css'

import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'
import Copyright from './components/Copyright'
import Footer from './components/Footer'
import Header from './components/Header'
import Navigation from './components/Navigationi'
import PortfolioSectioin from './components/PortfolioSection'

function App() {

  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/portfolio" element={<PortfolioSectioin />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/contact" element={<ContactSection />} />
      </Routes>

      <Footer />
      <Copyright />
    </>
  )
}

export default App
