import { useRef } from 'react'
import { motion } from 'framer-motion'
import LanguageNetworkCanvas from './LanguageNetworkCanvas'
import StarField from './shared/StarField'
import AnimatedNumber from './shared/AnimatedNumber'

const EASE_OUT = [0.23, 1, 0.32, 1] as const

function LineReveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode; delay?: number; className?: string
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: '108%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.0, delay, ease: EASE_OUT }}
      >
        {children}
      </motion.div>
    </div>
  )
}

function CTAButton() {
  return (
    <motion.a
      href="#thesis"
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-3 text-sm font-semibold px-7 py-3.5 rounded-full
                 border border-accent text-accent group hover:bg-accent hover:text-bg
                 transition-colors duration-[250ms]"
    >
      Explore the thesis
      <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>
    </motion.a>
  )
}

const stats = [
  { value: 1.2, suffix: 'B', decimals: 1, label: 'People who have ever used an AI tool', source: 'Microsoft AI Diffusion 2025' },
  { value: 4.3, suffix: 'B', decimals: 1, label: 'Internet users who have never accessed AI', source: 'Microsoft AI Diffusion 2025' },
  { value: 600, suffix: 'M+', decimals: 0, label: 'Vernacular speakers in India alone', source: 'Our target market' },
]

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[100dvh] flex flex-col overflow-hidden">

      {/* Stars — full-bleed background */}
      <div className="absolute inset-0 z-0">
        <StarField count={220} />
        {/* Top vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(11,10,8,0.7) 0%, transparent 18%)' }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent 55%, #0B0A08 92%)' }}
        />
      </div>

      {/* Globe — full bleed on mobile, right half on desktop */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[55%] z-0">
        <LanguageNetworkCanvas />
        {/* Fade left edge */}
        <div
          className="absolute inset-y-0 left-0 w-full md:w-40 pointer-events-none"
          style={{ background: 'linear-gradient(to right, #0B0A08 40%, transparent)' }}
        />
        {/* Fade right edge */}
        <div
          className="absolute inset-y-0 right-0 w-24 pointer-events-none"
          style={{ background: 'linear-gradient(to left, #0B0A08, transparent)' }}
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #0B0A08)' }}
        />
        {/* Mobile: heavy overlay so text stays readable */}
        <div
          className="absolute inset-0 pointer-events-none md:hidden"
          style={{ background: 'rgba(11,10,8,0.55)' }}
        />
      </div>

      {/* Text content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-14 lg:px-20 pt-28 md:pt-24 w-full md:max-w-[52%]">
        <div className="space-y-1 mb-7 md:mb-10">
          <LineReveal delay={0.18}>
            <h1 className="text-[clamp(1.1rem,4.5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.02em] text-primary">
              AI literacy and applied AI
            </h1>
          </LineReveal>
          <LineReveal delay={0.3}>
            <h1 className="text-[clamp(1.1rem,4.5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.02em] text-primary">
              for the next
            </h1>
          </LineReveal>
          <LineReveal delay={0.44}>
            <h1 className="text-[clamp(3.5rem,18vw,10rem)] font-bold leading-[0.88] tracking-[-0.04em]">
              <span className="text-accent">4</span>
              <span className="text-primary"> billion</span>
            </h1>
          </LineReveal>
          <LineReveal delay={0.58}>
            <h1 className="text-[clamp(1.1rem,4.5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.02em] text-primary">
              users
            </h1>
          </LineReveal>
        </div>

        <motion.p
          className="text-sm md:text-base leading-relaxed text-primary max-w-[38ch] mb-8 md:mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.72, ease: EASE_OUT }}
        >
          Building the AI literacy infrastructure for India's 600 million
          vernacular speakers. Certification as the business model.
          Language as the moat.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: EASE_OUT }}
        >
          <CTAButton />
        </motion.div>
      </div>

      {/* Stats bar */}
      <motion.div
        className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 border-t border-hairline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1, ease: EASE_OUT }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-hairline">
          {stats.map(({ value, suffix, decimals, label, source }) => (
            <div key={label} className="py-7 md:px-10 first:pl-0 last:pr-0">
              <div className="font-mono text-[2rem] font-semibold text-primary tracking-tight leading-none mb-2">
                <AnimatedNumber value={value} suffix={suffix} decimals={decimals} duration={2000} />
              </div>
              <p className="text-sm text-muted leading-snug max-w-[28ch]">{label}</p>
              <p className="text-[11px] text-muted mt-1 font-mono">{source}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
