import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import RevealLine from './shared/RevealLine'
import { useLang } from '../i18n/LanguageContext'

const EASE_OUT = [0.23, 1, 0.32, 1] as const

// Stable structural metadata; display text comes from translations
const layerMeta: { number: string; href?: string }[] = [
  { number: '01', href: '/ai-literacy' },
  { number: '02', href: '/applied-ai' },
  { number: '03', href: undefined },
]

interface Layer {
  number: string
  href?: string
  title: string
  subtitle: string
  description: string
  tags: string[]
  output: string
}

function LayerCardInner({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  )
}

function LayerCard({ layer, isLast, layerLabel, learnMore }: { layer: Layer; isLast: boolean; layerLabel: string; learnMore: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' })

  return (
    <motion.div
      ref={ref}
      className="relative grid grid-cols-1 md:grid-cols-[56px_1fr] gap-0"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT }}
    >
      {/* Spine */}
      <div className="hidden md:flex flex-col items-center pt-1 mr-8">
        <motion.div
          className="w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 relative z-10"
          style={{ background: '#141310', borderColor: '#252220' }}
          animate={isInView ? { borderColor: '#D4A843' } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-accent"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.35, type: 'spring', bounce: 0.3 }}
          />
        </motion.div>
        {!isLast && (
          <motion.div
            className="flex-1 w-px bg-hairline mt-3"
            initial={{ scaleY: 0 }}
            style={{ originY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.0, delay: 0.5, ease: EASE_OUT }}
          />
        )}
      </div>

      {/* Layer card */}
      <LayerCardInner className="pb-14 pt-2">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-xs font-mono tracking-[0.16em] text-accent uppercase">
            {layerLabel} {layer.number}
          </span>
          <div className="h-px flex-1 bg-hairline max-w-[80px]" />
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-primary tracking-tighter mb-1">{layer.title}</h3>
        <p className="text-base text-accent font-medium mb-5">{layer.subtitle}</p>
        <p className="text-base text-muted leading-relaxed max-w-[52ch] mb-7">{layer.description}</p>

        <div className="flex flex-wrap gap-2 mb-8">
          {layer.tags.map(tag => (
            <motion.span
              key={tag}
              className="text-[11px] font-mono px-2.5 py-1 rounded-sm border border-hairline text-muted tracking-wide"
              whileHover={{ borderColor: 'rgba(212,168,67,0.45)', color: '#EDE8DF' }}
              transition={{ duration: 0.15 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="w-4 h-px bg-accent opacity-60" />
          <p className="text-sm text-muted">{layer.output}</p>
        </div>

        {layer.href && (
          <Link
            to={layer.href}
            className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full
                       border border-accent text-accent hover:bg-accent hover:text-bg transition-colors duration-[250ms]"
          >
            {learnMore}
            <span className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-1">→</span>
          </Link>
        )}
      </LayerCardInner>
    </motion.div>
  )
}

export default function StackSection() {
  const { t, tv } = useLang()
  const tLayers = tv<Omit<Layer, 'number' | 'href'>[]>('stack.layers')
  const layers: Layer[] = layerMeta.map((m, i) => ({ ...m, ...tLayers[i] }))
  return (
    <section id="the-stack" className="relative py-16 md:py-24" style={{ background: '#0B0A08' }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 20% 80%, rgba(212,168,67,0.03) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20">

          {/* Left: sticky label */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <RevealLine delay={0}>
              <p className="text-sm font-mono font-semibold tracking-[0.18em] text-primary uppercase mb-6">{t('stack.eyebrow')}</p>
            </RevealLine>
            <RevealLine delay={0.1}>
              <h2 className="text-[clamp(2rem,4vw,3.2rem)] font-bold tracking-tighter text-primary leading-[1.05] mb-6">
                {t('stack.headline')}
              </h2>
            </RevealLine>
            <motion.p
              className="text-base text-muted leading-relaxed max-w-[38ch] mb-10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, delay: 0.25, ease: EASE_OUT }}
            >
              {t('stack.para')}
            </motion.p>

            <motion.div
              className="hidden lg:block border border-hairline rounded-xl p-6 bg-surface"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.8, delay: 0.4, ease: EASE_OUT }}
            >
              <p className="text-xs font-mono text-faint uppercase tracking-widest mb-3">{t('stack.flywheelTitle')}</p>
              <p className="text-sm text-muted leading-relaxed">{t('stack.flywheelBody')}</p>
              <div className="mt-5 flex items-center gap-2 text-xs text-accent font-mono">
                <span>01</span>
                <div className="flex-1 h-px bg-hairline" />
                <span>02</span>
                <div className="flex-1 h-px bg-hairline" />
                <span>03</span>
                <div className="w-2 h-2 rounded-full bg-accent ml-1" />
                <span className="text-faint">→ 01</span>
              </div>
            </motion.div>
          </div>

          {/* Right: layers */}
          <div>
            {layers.map((layer, i) => (
              <LayerCard key={layer.number} layer={layer} isLast={i === layers.length - 1}
                layerLabel={t('stack.layerLabel')} learnMore={t('stack.learnMore')} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
