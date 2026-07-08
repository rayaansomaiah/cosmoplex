import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import StarField from '../components/shared/StarField'
import RevealLine from '../components/shared/RevealLine'
import WaitlistModal from '../components/WaitlistModal'
import { useLang } from '../i18n/LanguageContext'

const EASE_OUT = [0.23, 1, 0.32, 1] as const

const LANGS = ['English', 'हिन्दी', 'मराठी', 'తెలుగు', 'தமிழ்', 'ಕನ್ನಡ']

export default function AILiteracyPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const { t, tv } = useLang()
  const curriculum = tv<{ t: string; d: string }[]>('aiLit.curriculum')
  const delivery = tv<{ t: string; d: string }[]>('aiLit.delivery')

  return (
    <section className="relative overflow-hidden" style={{ background: '#0B0A08' }}>
      <StarField count={200} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 30% 0%, rgba(212,168,67,0.06) 0%, transparent 60%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-24">

        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-14">
          <span>←</span> {t('aiLit.back')}
        </Link>

        {/* Header */}
        <div className="mb-6">
          <RevealLine delay={0}>
            <p className="text-xs font-mono font-semibold tracking-[0.24em] text-accent uppercase mb-6">
              {t('aiLit.eyebrow')}
            </p>
          </RevealLine>
          <RevealLine delay={0.08}>
            <h1 className="text-[clamp(2.4rem,6vw,4.6rem)] font-bold tracking-tighter text-primary leading-[1.02]">
              {t('aiLit.h1a')}
            </h1>
          </RevealLine>
          <RevealLine delay={0.16}>
            <h1 className="text-[clamp(2.4rem,6vw,4.6rem)] font-bold tracking-tighter text-accent leading-[1.02]">
              {t('aiLit.h1b')}
            </h1>
          </RevealLine>
        </div>

        <motion.p
          className="text-lg md:text-xl text-muted leading-relaxed max-w-[54ch] mb-20"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT }}
        >
          {t('aiLit.para')}
        </motion.p>

        {/* Curriculum */}
        <div className="mb-20">
          <p className="text-sm font-mono tracking-[0.16em] text-faint uppercase mb-8">{t('aiLit.curriculumLabel')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {curriculum.map((c, i) => (
              <motion.div
                key={i}
                className="rounded-2xl border border-hairline p-6 md:p-7"
                style={{ background: '#141310' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE_OUT }}
              >
                <p className="text-xs font-mono text-accent mb-4">{String(i + 1).padStart(2, '0')}</p>
                <h3 className="text-lg font-semibold text-primary mb-2">{c.t}</h3>
                <p className="text-sm text-muted leading-relaxed">{c.d}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Delivery */}
        <div className="mb-20">
          <p className="text-sm font-mono tracking-[0.16em] text-faint uppercase mb-8">{t('aiLit.deliveryLabel')}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {delivery.map((d, i) => (
              <motion.div
                key={i}
                className="flex gap-4"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: EASE_OUT }}
              >
                <div className="mt-1 w-2 h-2 rounded-full bg-accent flex-shrink-0" />
                <div>
                  <h3 className="text-base font-semibold text-primary mb-1">{d.t}</h3>
                  <p className="text-sm text-muted leading-relaxed max-w-[42ch]">{d.d}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Languages */}
        <div className="mb-20">
          <p className="text-sm font-mono tracking-[0.16em] text-faint uppercase mb-6">{t('aiLit.launchingIn')}</p>
          <div className="flex flex-wrap gap-3">
            {LANGS.map((l, i) => (
              <motion.span
                key={l}
                className="text-base px-4 py-2 rounded-full border border-hairline text-muted"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                {l}
              </motion.span>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-hairline p-8 md:p-12 text-center"
          style={{ background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(212,168,67,0.07) 0%, transparent 70%), #0B0A08' }}>
          <h2 className="text-2xl md:text-3xl font-bold text-primary tracking-tight mb-3">
            {t('aiLit.ctaTitle')}
          </h2>
          <p className="text-base text-muted mb-8 max-w-[44ch] mx-auto">
            {t('aiLit.ctaBody')}
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-3 bg-accent text-bg font-semibold px-8 py-4 rounded-full text-sm hover:bg-primary transition-colors duration-250"
          >
            {t('aiLit.ctaBtn')}
          </button>
        </div>
      </div>

      {modalOpen && (
        <WaitlistModal
          onClose={() => setModalOpen(false)}
          source="AI Literacy"
          eyebrow={t('aiLit.modalEyebrow')}
          title={t('aiLit.modalTitle')}
          submitLabel={t('aiLit.ctaBtn')}
        />
      )}
    </section>
  )
}
