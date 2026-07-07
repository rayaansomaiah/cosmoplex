import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import StarField from '../components/shared/StarField'
import RevealLine from '../components/shared/RevealLine'
import WaitlistModal from '../components/WaitlistModal'

const EASE_OUT = [0.23, 1, 0.32, 1] as const

const flow = [
  { n: '01', t: 'Scan', d: 'Point your phone at the QR code on the table. A welcome screen opens — no app to install.' },
  { n: '02', t: 'Speak', d: '“Two masala dosa and a filter coffee” — in whatever language you’re comfortable in.' },
  { n: '03', t: 'Confirm', d: 'The order is built, read back to you out loud in the same language, and sent to the kitchen.' },
]

const features = [
  'Speak in Kannada, Hindi, Tamil, Telugu, Malayalam, Marathi or English — including mixed speech',
  'Understands real, messy orders — quantities, customizations, and follow-up changes',
  'Confirms the order back out loud, in your language',
  'Order + “your food is ready” alerts on WhatsApp',
  'Visual menu with time-aware availability and smart suggestions',
  'Gets sharper with every order it hears',
]

const beyond = [
  { icon: '🎬', t: 'Movie halls', d: 'Order snacks from your seat over WhatsApp — no queue, no missed scenes.' },
  { icon: '🚆', t: 'Local trains', d: 'Book tickets by voice, in your language, without fighting an English form.' },
  { icon: '⋯', t: 'And more', d: 'The same voice engine, anywhere language and waiting get in the way.' },
]

export default function AppliedAIPage() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="relative overflow-hidden" style={{ background: '#0B0A08' }}>
      <StarField count={200} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 70% 0%, rgba(212,168,67,0.06) 0%, transparent 60%)' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-10 pt-32 md:pt-40 pb-24">

        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors mb-14">
          <span>←</span> Back to home
        </Link>

        {/* Header */}
        <div className="mb-6">
          <RevealLine delay={0}>
            <p className="text-xs font-mono font-semibold tracking-[0.24em] text-accent uppercase mb-6">
              Pillar 02 · Applied AI
            </p>
          </RevealLine>
          <RevealLine delay={0.08}>
            <h1 className="text-[clamp(2.4rem,6vw,4.6rem)] font-bold tracking-tighter text-primary leading-[1.02]">
              AI-native products,
            </h1>
          </RevealLine>
          <RevealLine delay={0.16}>
            <h1 className="text-[clamp(2.4rem,6vw,4.6rem)] font-bold tracking-tighter text-accent leading-[1.02]">
              built vernacular-first.
            </h1>
          </RevealLine>
        </div>

        <motion.p
          className="text-lg md:text-xl text-muted leading-relaxed max-w-[54ch] mb-20"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT }}
        >
          Literacy opens the door. Applied AI is what's on the other side — real
          products built on one principle: people should be able to use technology
          by simply speaking, in their own language.
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

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6">
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-accent">Featured product</span>
              <span className="text-[11px] font-mono tracking-[0.14em] uppercase px-2.5 py-1 rounded-full border border-hairline text-faint">Live</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-bold text-primary tracking-tighter mb-2">WiseOrder</h2>
            <p className="text-lg text-accent font-medium mb-6">Voice-first restaurant ordering.</p>

            <p className="text-base text-muted leading-relaxed max-w-[58ch] mb-4">
              Scan the QR code on your table and just talk. WiseOrder understands the
              order, builds the cart, and reads it back to you in the same language.
              No app, no waiting, no scrolling through a long digital menu.
            </p>

            {/* Spoken-order mock */}
            <div className="inline-flex items-center gap-3 rounded-2xl border border-hairline px-5 py-3 my-4"
              style={{ background: 'rgba(11,10,8,0.6)' }}>
              <span className="text-accent text-lg">◉</span>
              <span className="text-base text-primary">“ಎರಡು ಮಸಾಲಾ ದೋಸೆ, ಒಂದು ಫಿಲ್ಟರ್ ಕಾಫಿ”</span>
            </div>
            <p className="text-xs text-faint font-mono mb-2">— heard, understood, confirmed.</p>
          </div>

          {/* Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-hairline">
            {flow.map((f, i) => (
              <div key={f.n} className={`p-7 md:p-8 ${i < 2 ? 'md:border-r border-hairline' : ''} border-b md:border-b-0 last:border-b-0`}>
                <p className="text-xs font-mono text-accent mb-3">{f.n}</p>
                <h3 className="text-lg font-semibold text-primary mb-2">{f.t}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.d}</p>
              </div>
            ))}
          </div>

          {/* Features */}
          <div className="p-8 md:p-12 border-t border-hairline">
            <p className="text-sm font-mono tracking-[0.16em] text-faint uppercase mb-6">What it does</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4">
              {features.map(f => (
                <div key={f} className="flex gap-3">
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
            Global chains spent <span className="text-primary font-semibold">millions</span> piloting
            voice ordering in their drive-throughs — and mostly pulled it.
          </p>
          <p className="text-[clamp(2rem,5vw,3.6rem)] font-bold tracking-tighter text-primary leading-[1.05]">
            We deliver it at <span className="text-accent">a fraction of the cost.</span>
          </p>
        </motion.div>

        {/* Beyond restaurants */}
        <div className="mb-20">
          <p className="text-sm font-mono tracking-[0.16em] text-faint uppercase mb-8">Beyond restaurants</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {beyond.map((b, i) => (
              <motion.div
                key={b.t}
                className="rounded-2xl border border-hairline p-6"
                style={{ background: '#141310' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.6, delay: i * 0.08, ease: EASE_OUT }}
              >
                <div className="text-2xl mb-4">{b.icon}</div>
                <h3 className="text-lg font-semibold text-primary mb-2">{b.t}</h3>
                <p className="text-sm text-muted leading-relaxed">{b.d}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Coming soon */}
        <div className="rounded-2xl border border-dashed border-hairline p-8 md:p-10 mb-16 text-center">
          <p className="text-sm font-mono tracking-[0.16em] text-accent uppercase mb-3">Coming soon</p>
          <p className="text-base md:text-lg text-muted leading-relaxed max-w-[48ch] mx-auto">
            More applied-AI products are in the works — each built on the same
            vernacular-first foundation as WiseOrder.
          </p>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-hairline p-8 md:p-12 text-center"
          style={{ background: 'radial-gradient(ellipse 80% 100% at 50% 0%, rgba(212,168,67,0.07) 0%, transparent 70%), #0B0A08' }}>
          <h2 className="text-2xl md:text-3xl font-bold text-primary tracking-tight mb-3">
            Want WiseOrder — or something like it?
          </h2>
          <p className="text-base text-muted mb-8 max-w-[46ch] mx-auto">
            Whether you run a restaurant, a cinema, or something we haven't imagined
            yet — let's talk.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-3 bg-accent text-bg font-semibold px-8 py-4 rounded-full text-sm hover:bg-primary transition-colors duration-250"
          >
            Get in touch
          </button>
        </div>
      </div>

      {modalOpen && <WaitlistModal onClose={() => setModalOpen(false)} />}
    </section>
  )
}
