import Hero from '../components/Hero'
import MarqueeStrip from '../components/MarqueeStrip'
import ThesisSection from '../components/ThesisSection'
import DivideSection from '../components/DivideSection'
import WorldMapSection from '../components/WorldMapSection'
import StackSection from '../components/StackSection'
import FaqSection from '../components/FaqSection'
import ClosingSection from '../components/ClosingSection'
import SectionDivider from '../components/shared/SectionDivider'
import { useLang } from '../i18n/LanguageContext'

export default function HomePage() {
  const { t } = useLang()
  return (
    <>
      <Hero />
      <MarqueeStrip />
      {/* dark → dark */}
      <SectionDivider label={t('thesis.eyebrow')} style={{ background: '#0B0A08' }} />
      <ThesisSection />
      <SectionDivider label={t('divide.eyebrow')} style={{ background: '#0B0A08' }} />
      <DivideSection />
      <SectionDivider label={t('world.eyebrow')} style={{ background: '#0B0A08' }} />
      <WorldMapSection />
      <SectionDivider label={t('stack.eyebrow')} style={{ background: '#0B0A08' }} />
      <StackSection />
      <SectionDivider label={t('faq.eyebrow')} style={{ background: '#0B0A08' }} />
      <FaqSection />
      <ClosingSection />
    </>
  )
}
