import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import StarField from '../components/shared/StarField'
import RevealLine from '../components/shared/RevealLine'
import WaitlistModal from '../components/WaitlistModal'

const EASE_OUT = [0.23, 1, 0.32, 1] as const

const curriculum = [
  { k: '01', t: 'What AI actually is', d: 'Plain-language foundations — no jargon, no maths. What these tools are, and what they are not.' },
  { k: '02', t: 'What it can do for you', d: 'Real, everyday uses — writing, translating, learning, running a small business, getting things done faster.' },
  { k: '03', t: 'How to use it well', d: 'How to ask, how to check answers, and where the limits are — so you stay in control of the tool.' },
  { k: '04', t: 'Using it safely', d: 'Privacy, misinformation, and scams — the judgement to use AI with confidence and care.' },
]

const delivery = [
  { t: 'In your language', d: 'Curated and taught in local Indian languages — not translated as an afterthought.' },
  { t: 'Voice-first', d: 'Learn by speaking and listening, on the phone you already own. No typing, no English required.' },
  { t: 'On WhatsApp', d: 'Delivered where India already is — bite-sized, at your own pace, no app to install.' },
  { t: 'Certification', d: 'Finish with a recognised AI-literacy certificate — proof of a skill the economy now rewards.' },
]

const LANGS = ['हिंदी', 'বাংলা', 'தமிழ்', 'తెలుగు', 'मराठी', 'ಕನ್ನಡ', 'മലയാളം', 'ਪੰਜਾਬੀ', 'ગુજરાતી', '+ more']

export default function AILiteracyPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="relative overflow-hidden" style={{ background: '#0B0A08' }}>
      <StarField count={200} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 30% 0%, rgba(212,168,67,0.06) 0%, transparent 60%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-24">

        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-14">
          <span>←</span> Back to home
        </Link>

        {/* Header */}
        <div className="mb-6">
          <RevealLine delay={0}>
            <p className="text-xs font-mono font-semibold tracking-[0.24em] text-accent uppercase mb-6">
              Pillar 01 · AI Literacy
            </p>
          </RevealLine>
          <RevealLine delay={0.08}>
            <h1 className="text-[clamp(2.4rem,6vw,4.6rem)] font-bold tracking-tighter text-primary leading-[1.02]">
              AI 101, in the
            </h1>
          </RevealLine>
          <RevealLine delay={0.16}>
            <h1 className="text-[clamp(2.4rem,6vw,4.6rem)] font-bold tracking-tighter text-accent leading-[1.02]">
              language you think in.
            </h1>
          </RevealLine>
        </div>

        <motion.p
          className="text-lg md:text-xl text-muted leading-relaxed max-w-[54ch] mb-20"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT }}
        >
          The next four billion don't need simpler AI — they need it in their own
          language. We're curating a foundational course that teaches what AI is
          and how to use it, delivered in local languages for the hundreds of
          millions who were never taught in English.
        </motion.p>

        {/* Curriculum */}
        <div className="mb-20">
          <p className="text-sm font-mono tracking-[0.16em] text-faint uppercase mb-8">What the course covers</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {curriculum.map((c, i) => (
              <motion.div
                key={c.k}
                className="rounded-2xl border border-hairline p-6 md:p-7"
                style={{ background: '#141310' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE_OUT }}
              >
                <p className="text-xs font-mono text-accent mb-4">{c.k}</p>
                <h3 className="text-lg font-semibold text-primary mb-2">{c.t}</h3>
                <p className="text-sm text-muted leading-relaxed">{c.d}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Delivery */}
        <div className="mb-20">
          <p className="text-sm font-mono tracking-[0.16em] text-faint uppercase mb-8">How it reaches people</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {delivery.map((d, i) => (
              <motion.div
                key={d.t}
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
          <p className="text-sm font-mono tracking-[0.16em] text-faint uppercase mb-6">Launching in</p>
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
            Be first to learn.
          </h2>
          <p className="text-base text-muted mb-8 max-w-[44ch] mx-auto">
            The AI 101 course is being curated now. Join the waitlist to get early access in your language.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-3 bg-accent text-bg font-semibold px-8 py-4 rounded-full text-sm hover:bg-primary transition-colors duration-250"
          >
            Join the waitlist
          </button>
        </div>
      </div>

      {modalOpen && <WaitlistModal onClose={() => setModalOpen(false)} />}
    </section>
  )
}
