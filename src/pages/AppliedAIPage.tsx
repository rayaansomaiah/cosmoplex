import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import StarField from '../components/shared/StarField'
import RevealLine from '../components/shared/RevealLine'
import WaitlistModal from '../components/WaitlistModal'
import { useLang } from '../i18n/LanguageContext'

const EASE_OUT = [0.23, 1, 0.32, 1] as const

const beyondIcons = ['🎬', '🚆', '⋯']

export default function AppliedAIPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)
  const { t, tv } = useLang()
  const flow = tv<{ t: string; d: string }[]>('appliedAI.flow')
  const features = tv<string[]>('appliedAI.features')
  const beyond = tv<{ t: string; d: string }[]>('appliedAI.beyond')

  const toggleSound = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
    if (!v.muted) v.play().catch(() => {})
  }

  return (
    <section className="relative overflow-hidden" style={{ background: '#0B0A08' }}>
      <StarField count={200} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 70% 0%, rgba(212,168,67,0.06) 0%, transparent 60%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-24">

        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-14">
          <span>←</span> {t('appliedAI.back')}
        </Link>

        {/* Header */}
        <div className="mb-6">
          <RevealLine delay={0}>
            <p className="text-xs font-mono font-semibold tracking-[0.24em] text-accent uppercase mb-6">
              {t('appliedAI.eyebrow')}
            </p>
          </RevealLine>
          <RevealLine delay={0.08}>
            <h1 className="text-[clamp(2.4rem,6vw,4.6rem)] font-bold tracking-tighter text-primary leading-[1.02]">
              {t('appliedAI.h1a')}
            </h1>
          </RevealLine>
          <RevealLine delay={0.16}>
            <h1 className="text-[clamp(2.4rem,6vw,4.6rem)] font-bold tracking-tighter text-accent leading-[1.02]">
              {t('appliedAI.h1b')}
            </h1>
          </RevealLine>
        </div>

        <motion.p
          className="text-lg md:text-xl text-muted leading-relaxed max-w-[54ch] mb-20"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT }}
        >
          {t('appliedAI.para')}
        </motion.p>

        {/* Featured product — WiseOrder */}
        <motion.div
          className="rounded-3xl border border-hairline overflow-hidden mb-16"
          style={{ background: '#141310' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          <div className="p-8 md:p-12"
            style={{ background: 'radial-gradient(ellipse 90% 80% at 15% 0%, rgba(212,168,67,0.08) 0%, transparent 60%)' }}>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-10 md:gap-12 items-center">

              {/* Left — copy */}
              <div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
                  <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-accent">{t('appliedAI.featured')}</span>
                  <span className="text-[11px] font-mono tracking-[0.14em] uppercase px-2.5 py-1 rounded-full border border-hairline text-faint">{t('appliedAI.live')}</span>
                </div>

                <h2 className="text-3xl md:text-5xl font-bold text-primary tracking-tighter mb-2">{t('appliedAI.productName')}</h2>
                <p className="text-lg text-accent font-medium mb-6">{t('appliedAI.tagline')}</p>

                <p className="text-base text-muted leading-relaxed max-w-[52ch] mb-4">
                  {t('appliedAI.desc')}
                </p>

                {/* Spoken-order mock */}
                <div className="inline-flex items-center gap-3 rounded-2xl border border-hairline px-5 py-3 my-4"
                  style={{ background: 'rgba(11,10,8,0.6)' }}>
                  <span className="text-accent text-lg">◉</span>
                  <span className="text-base text-primary">“ಎರಡು ಮಸಾಲಾ ದೋಸೆ, ಒಂದು ಫಿಲ್ಟರ್ ಕಾಫಿ”</span>
                </div>
                <p className="text-xs text-faint font-mono mb-2">{t('appliedAI.spokenNote')}</p>
              </div>

              {/* Right — phone demo */}
              <div className="justify-self-center md:justify-self-end flex-shrink-0">
                <div className="relative w-[210px] md:w-[240px]">
                  <video
                    ref={videoRef}
                    autoPlay muted loop playsInline preload="auto"
                    onClick={toggleSound}
                    className="block w-full rounded-[30px] cursor-pointer"
                    style={{ boxShadow: '0 30px 70px -25px rgba(0,0,0,0.75)' }}
                  >
                    <source src="/wiseorder.mp4" type="video/mp4" />
                  </video>

                  {/* Sound toggle */}
                  <button
                    onClick={toggleSound}
                    aria-label={muted ? 'Unmute video' : 'Mute video'}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 inline-flex items-center gap-2
                               rounded-full px-3.5 py-1.5 text-xs font-medium text-primary
                               border border-hairline transition-colors duration-200 hover:border-accent"
                    style={{ background: 'rgba(11,10,8,0.72)', backdropFilter: 'blur(8px)' }}
                  >
                    <span>{muted ? '🔇' : '🔊'}</span>
                    {muted && <span>{t('appliedAI.tapForSound')}</span>}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-hairline">
            {flow.map((f, i) => (
              <div key={i} className={`p-7 md:p-8 ${i < 2 ? 'md:border-r border-hairline' : ''} border-b md:border-b-0 last:border-b-0`}>
                <p className="text-xs font-mono text-accent mb-3">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-lg font-semibold text-primary mb-2">{f.t}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="p-8 md:p-12 border-t border-hairline">
            <p className="text-sm font-mono tracking-[0.16em] text-faint uppercase mb-6">{t('appliedAI.whatItDoes')}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
              {features.map((f, i) => (
                <div key={i} className="flex gap-3">
                  <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
                  <p className="text-sm text-muted leading-relaxed">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Cost differentiator */}
        <motion.div
          className="rounded-2xl border border-hairline p-8 md:p-12 mb-20"
          style={{ background: 'radial-gradient(ellipse 70% 100% at 50% 50%, rgba(212,168,67,0.06) 0%, transparent 70%), #0B0A08' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
        >
          <p className="text-base md:text-lg text-muted leading-relaxed max-w-[52ch] mb-6">
            {t('appliedAI.costLead')}
          </p>
          <p className="text-[clamp(2rem,5vw,3.6rem)] font-bold tracking-tighter text-primary leading-[1.05]">
            {t('appliedAI.costBig')} <span className="text-accent">{t('appliedAI.costAccent')}</span>
          </p>
        </motion.div>

        {/* Beyond restaurants */}
        <div className="mb-20">
          <p className="text-sm font-mono tracking-[0.16em] text-faint uppercase mb-8">{t('appliedAI.beyondLabel')}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {beyond.map((b, i) => (
              <motion.div
                key={i}
                className="rounded-2xl border border-hairline p-6"
                style={{ background: '#141310' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE_OUT }}
              >
                <div className="text-2xl mb-4">{beyondIcons[i]}</div>
                <h3 className="text-lg font-semibold text-primary mb-2">{b.t}</h3>
                <p className="text-sm text-muted leading-relaxed">{b.d}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Coming soon */}
        <div className="rounded-2xl border border-dashed border-hairline p-8 md:p-10 mb-16 text-center">
          <p className="text-sm font-mono tracking-[0.16em] text-accent uppercase mb-3">{t('appliedAI.comingSoonLabel')}</p>
          <p className="text-base md:text-lg text-muted leading-relaxed max-w-[48ch] mx-auto">
            {t('appliedAI.comingSoonBody')}
          </p>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-hairline p-8 md:p-12 text-center"
          style={{ background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(212,168,67,0.07) 0%, transparent 70%), #0B0A08' }}>
          <h2 className="text-2xl md:text-3xl font-bold text-primary tracking-tight mb-3">
            {t('appliedAI.ctaTitle')}
          </h2>
          <p className="text-base text-muted mb-8 max-w-[46ch] mx-auto">
            {t('appliedAI.ctaBody')}
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-3 bg-accent text-bg font-semibold px-8 py-4 rounded-full text-sm hover:bg-primary transition-colors duration-250"
          >
            {t('appliedAI.ctaBtn')}
          </button>
        </div>
      </div>

      {modalOpen && (
        <WaitlistModal
          onClose={() => setModalOpen(false)}
          source="Applied AI"
          eyebrow={t('appliedAI.modalEyebrow')}
          title={t('appliedAI.modalTitle')}
          submitLabel={t('appliedAI.modalSubmit')}
        />
      )}
    </section>
  )
}
