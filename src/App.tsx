import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/shared/Footer'
import HomePage from './pages/HomePage'
import AILiteracyPage from './pages/AILiteracyPage'
import AppliedAIPage from './pages/AppliedAIPage'

// Scroll to top on navigation; smooth-scroll to a hash target if present
function ScrollManager() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      // wait a frame for the target section to mount
      requestAnimationFrame(() => {
        const el = document.getElementById(id)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
        else window.scrollTo(0, 0)
      })
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="bg-bg text-primary font-sans">
        <div className="grain-overlay" aria-hidden="true" />
        <Nav />
        <ScrollManager />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/ai-literacy" element={<AILiteracyPage />} />
          <Route path="/applied-ai" element={<AppliedAIPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
