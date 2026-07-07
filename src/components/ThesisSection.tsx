import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import RevealLine from './shared/RevealLine'
import StarField from './shared/StarField'
import { useLang } from '../i18n/LanguageContext'

const EASE_OUT = [0.23, 1, 0.32, 1] as const

// Stable icon keys + accent flags; display text (era/year/shift) comes from translations
const parallelMeta = [
  { icon: 'Electricity' },
  { icon: 'The Internet' },
  { icon: 'Mobile' },
  { icon: 'AI', isAccent: true },
]

function EraIcon({ era, isInView, delay, accent }: {
  era: string; isInView: boolean; delay: number; accent?: boolean
}) {
  const stroke = accent ? 'rgba(212,168,67,0.85)' : 'rgba(160,152,144,0.55)'
  const sw = 1.4
  const t = (d: number) => ({ duration: 0.9, delay: delay + d, ease: EASE_OUT })

  if (era === 'Electricity') {
    return (
      <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <motion.path
          d="M13 3L5 14H12L10 21L19 10H12L13 3Z"
          stroke={stroke} strokeWidth={sw}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={t(0)}
        />
      </svg>
    )
  }

  if (era === 'The Internet') {
    return (
      <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" strokeLinecap="round">
        <motion.circle cx="12" cy="12" r="9"
          stroke={stroke} strokeWidth={sw}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={t(0)}
        />
        <motion.ellipse cx="12" cy="12" rx="4" ry="9"
          stroke={stroke} strokeWidth={sw}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={t(0.2)}
        />
        <motion.line x1="3" y1="12" x2="21" y2="12"
          stroke={stroke} strokeWidth={sw}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={t(0.4)}
        />
        <motion.line x1="5.5" y1="7.5" x2="18.5" y2="7.5"
          stroke={stroke} strokeWidth={sw} strokeOpacity={0.4}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.4 } : {}}
          transition={t(0.5)}
        />
      </svg>
    )
  }

  if (era === 'Mobile') {
    return (
      <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <motion.rect x="6" y="2" width="12" height="20" rx="2"
          stroke={stroke} strokeWidth={sw}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={t(0)}
        />
        <motion.line x1="9" y1="6" x2="15" y2="6"
          stroke={stroke} strokeWidth={sw} strokeOpacity={0.45}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.45 } : {}}
          transition={t(0.35)}
        />
        <motion.circle cx="12" cy="18" r="1"
          stroke={stroke} strokeWidth={sw}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={t(0.5)}
        />
      </svg>
    )
  }

  const nodes = {
    l: [{ x: 4, y: 7 }, { x: 4, y: 12 }, { x: 4, y: 17 }],
    m: [{ x: 12, y: 9 }, { x: 12, y: 15 }],
    r: [{ x: 20, y: 12 }],
  }
  const edges: { x1: number; y1: number; x2: number; y2: number; d: number }[] = []
  nodes.l.forEach((a, li) => nodes.m.forEach((b, mi) => edges.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, d: (li + mi) * 0.07 })))
  nodes.m.forEach((a, mi) => nodes.r.forEach((b, ri) => edges.push({ x1: a.x, y1: a.y, x2: b.x, y2: b.y, d: 0.35 + (mi + ri) * 0.07 })))

  return (
    <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" strokeLinecap="round">
      {edges.map((e, i) => (
        <motion.line key={i} x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
          stroke={stroke} strokeWidth={0.9} strokeOpacity={0.5}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.5 } : {}}
          transition={{ duration: 0.6, delay: delay + e.d, ease: EASE_OUT }}
        />
      ))}
      {[...nodes.l, ...nodes.m, ...nodes.r].map((n, i) => (
        <motion.circle key={i} cx={n.x} cy={n.y} r={i === nodes.l.length + nodes.m.length ? 2 : 1.5}
          stroke={stroke} strokeWidth={sw}
          fill={i === nodes.l.length + nodes.m.length ? stroke : 'none'}
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: delay + 0.55 + i * 0.05, ease: EASE_OUT }}
        />
      ))}
    </svg>
  )
}

export default function ThesisSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-10% 0px' })
  const { t, tv } = useLang()
  const lines = tv<string[]>('thesis.lines')
  const parallels = tv<{ era: string; year: string; shift: string }[]>('thesis.parallels')

  return (
    <section id="thesis" className="relative py-16 md:py-24 overflow-hidden" style={{ background: '#0B0A08' }} ref={containerRef}>

      <StarField count={260} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

        {/* ── TOP: headline + two-column body cards ── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-16 lg:gap-24 mb-24 md:mb-32 items-start">

          <div>
            <RevealLine delay={0} className="mb-4">
              <p className="text-sm font-mono font-semibold tracking-[0.18em] text-primary uppercase">{t('thesis.eyebrow')}</p>
            </RevealLine>
            {lines.map((line, i) => (
              <RevealLine key={i} delay={0.1 + i * 0.1}>
                <p className={`text-[clamp(2rem,4.5vw,3.8rem)] font-bold leading-[1.05] tracking-tighter text-primary${i === lines.length - 1 ? ' pb-1' : ''}`}>
                  {line}
                </p>
              </RevealLine>
            ))}
          </div>

          <motion.div
            className="lg:pt-12 grid grid-cols-1 gap-4"
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.5, ease: EASE_OUT }}
          >
            <div className="rounded-xl p-6 border border-hairline" style={{ background: '#0B0A08' }}>
              <p className="text-base text-muted leading-relaxed">{t('thesis.card1')}</p>
            </div>
            <div className="rounded-xl p-6 border border-hairline" style={{ background: '#0B0A08' }}>
              <p className="text-base text-muted leading-relaxed">{t('thesis.card2')}</p>
            </div>
          </motion.div>
        </div>

        {/* ── HISTORICAL PARALLELS — card grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {parallels.map(({ era, year, shift }, i) => {
            const isAccent = parallelMeta[i]?.isAccent
            return (
            <motion.div
              key={i}
              className="rounded-2xl p-6 border flex flex-col"
              style={{
                background: isAccent ? 'rgba(212,168,67,0.06)' : '#0B0A08',
                borderColor: isAccent ? 'rgba(212,168,67,0.3)' : 'rgba(46,43,40,1)',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 + i * 0.1, ease: EASE_OUT }}
            >
              {/* Animated fill bar */}
              <div className="mb-6 h-[2px] w-full rounded-full overflow-hidden" style={{ background: 'rgba(46,43,40,1)' }}>
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: isAccent ? '#D4A843' : 'rgba(196,190,182,0.35)' }}
                  initial={{ width: 0 }}
                  animate={isInView ? { width: isAccent ? '100%' : `${25 + i * 25}%` } : {}}
                  transition={{ duration: 1.2, delay: 0.7 + i * 0.15, ease: EASE_OUT }}
                />
              </div>

              <div className="mb-5">
                <EraIcon era={parallelMeta[i]?.icon ?? ''} isInView={isInView} delay={0.75 + i * 0.1} accent={!!isAccent} />
              </div>

              <p className={`text-xs font-mono tracking-[0.14em] uppercase mb-2 ${isAccent ? 'text-accent' : 'text-faint'}`}>
                {year}
              </p>
              <p className={`text-base font-semibold mb-3 ${isAccent ? 'text-accent' : 'text-primary'}`}>{era}</p>
              <p className="text-sm text-muted leading-relaxed mt-auto">{shift}</p>
            </motion.div>
          )})}
        </div>

      </div>
    </section>
  )
}
