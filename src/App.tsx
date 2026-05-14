import Nav from './components/Nav'
import Hero from './components/Hero'
import MarqueeStrip from './components/MarqueeStrip'
import ThesisSection from './components/ThesisSection'
import DivideSection from './components/DivideSection'
import WorldMapSection from './components/WorldMapSection'
import StackSection from './components/StackSection'
import FaqSection from './components/FaqSection'
import ClosingSection from './components/ClosingSection'
import SectionDivider from './components/shared/SectionDivider'

export default function App() {
  return (
    <div className="bg-bg text-primary font-sans">
      <div className="grain-overlay" aria-hidden="true" />
      <Nav />
      <Hero />
      <MarqueeStrip />
      {/* dark → dark */}
      <SectionDivider label="The Context" style={{ background: '#0B0A08' }} />
      <ThesisSection />
      <SectionDivider label="The Divide" style={{ background: '#0B0A08' }} />
      <DivideSection />
      <SectionDivider label="Global Reach" style={{ background: '#0B0A08' }} />
      <WorldMapSection />
      <SectionDivider label="The Stack" style={{ background: '#0B0A08' }} />
      <StackSection />
      <SectionDivider label="Questions" style={{ background: '#0B0A08' }} />
      <FaqSection />
      <ClosingSection />
      <footer className="border-t border-hairline py-6 text-center">
        <p className="text-xs text-faint font-mono">© 2026 Cosmoplex AI, Inc. All rights reserved.</p>
      </footer>
    </div>
  )
}
