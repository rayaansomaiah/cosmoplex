import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import RevealLine from './shared/RevealLine'
import WaitlistModal from './WaitlistModal'

const EASE_OUT = [0.23, 1, 0.32, 1] as const

function CTA({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-3 bg-accent text-bg font-semibold
                 px-8 py-4 rounded-full text-sm hover:bg-primary transition-colors duration-250"
    >
      {children}
    </a>
  )
}

function Secondary({ children, href }: { children: React.ReactNode; href: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-3 border border-hairline text-muted font-medium
                 px-8 py-4 rounded-full text-sm hover:border-muted hover:text-primary transition-colors duration-250"
    >
      {children}
    </a>
  )
}

// Animated broadcast rings — radiate outward like a signal from India
function BroadcastRings({ isInView }: { isInView: boolean }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      {[180, 320, 480, 640, 800].map((size, i) => (
        <motion.div
          key={size}
          className="absolute rounded-full border border-accent"
          style={{ width: size, height: size }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={isInView ? {
            opacity: [0, 0.18 - i * 0.025, 0],
            scale: [0.6, 1, 1.6],
          } : {}}
          transition={{
            duration: 4,
            delay: i * 0.7,
            repeat: Infinity,
            ease: 'easeOut',
            repeatDelay: 1.5,
          }}
        />
      ))}
      {/* Static centre dot */}
      {isInView && (
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-accent"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.7, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      )}
    </div>
  )
}

export default function ClosingSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: false, margin: '-10% 0px' })
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section id="contact" className="relative overflow-hidden" style={{ background: '#0B0A08' }} ref={ref}>
      <div className="w-full h-px bg-hairline" />

      <div
        className="relative py-20 md:py-28"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(212,168,67,0.055) 0%, transparent 65%)',
        }}
      >
        {/* Broadcast rings */}
        <BroadcastRings isInView={isInView} />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center">
          <RevealLine delay={0}>
            <p className="text-sm font-mono font-semibold tracking-[0.18em] text-primary uppercase mb-12">
              The Thesis in One Line
            </p>
          </RevealLine>

          <div className="mb-4">
            <RevealLine delay={0.1}>
              <p className="text-[clamp(2rem,5vw,4.2rem)] font-bold tracking-tighter text-primary leading-[1.0]">
                Not a translated chatbot.
              </p>
            </RevealLine>
          </div>

          <div className="mb-16">
            <RevealLine delay={0.22}>
              <p className="text-[clamp(2rem,5vw,4.2rem)] font-bold tracking-tighter text-primary leading-[1.0]">
                An AI-native platform
              </p>
            </RevealLine>
            <RevealLine delay={0.34}>
              <p className="text-[clamp(2rem,5vw,4.2rem)] font-light tracking-tighter text-muted leading-[1.2] pb-1">
                built from language up.
              </p>
            </RevealLine>
          </div>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.65, ease: EASE_OUT }}
          >
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-3 bg-accent text-bg font-semibold
                         px-8 py-4 rounded-full text-sm hover:bg-primary transition-colors duration-250"
            >
              Join the waitlist
            </button>
            <Secondary href="#thesis">
              Read the thesis
            </Secondary>
          </motion.div>

          {modalOpen && <WaitlistModal onClose={() => setModalOpen(false)} />}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-hairline py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-8">
            <span className="text-xs font-mono text-muted tracking-widest uppercase">Cosmoplex</span>
            <span className="text-xs text-muted">Applied AI for the next 4 billion users</span>
          </div>
        </div>
      </div>
    </section>
  )
}
