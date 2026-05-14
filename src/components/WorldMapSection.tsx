import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import DottedMap from 'dotted-map'
import RevealLine from './shared/RevealLine'

const EASE_OUT = [0.23, 1, 0.32, 1] as const

// Build the map once at module level
const _map = new DottedMap({ height: 60, grid: 'diagonal' })
const DOTS = _map.getPoints()

// India boundary polygon in dotted-map coordinate space
// Derived from: x = 59 + lon*0.357,  y = 26.8 + (25-lat)*0.369
const INDIA_POLY: [number, number][] = [
  [86.7, 33.2],  // Cape Comorin (S tip)
  [87.3, 32.5],  // SE coast
  [87.7, 31.1],  // Chennai
  [88.6, 29.5],  // Vizag
  [89.5, 28.6],  // Odisha coast
  [90.5, 27.6],  // West Bengal / Kolkata
  [91.5, 27.1],  // Tripura
  [92.0, 27.5],  // Mizoram
  [92.5, 26.6],  // Manipur
  [92.7, 26.2],  // Nagaland
  [93.6, 25.9],  // Arunachal E
  [92.2, 25.9],  // Arunachal mid
  [91.5, 26.0],  // Bhutan border
  [90.6, 26.2],  // Siliguri corridor
  [87.6, 25.6],  // Nepal border E
  [87.4, 24.3],  // Uttarakhand / Himachal
  [87.0, 23.3],  // Ladakh E (34.5°N, 78°E)
  [86.5, 22.9],  // Ladakh N / Siachen (35.5°N, 77°E)
  [85.5, 23.5],  // Kashmir valley
  [85.2, 23.7],  // Kashmir W / LoC
  [84.8, 24.2],  // Jammu
  [84.3, 24.5],  // Rajasthan NW
  [83.8, 25.5],  // Pakistan border
  [83.4, 26.9],  // Rann of Kutch
  [83.6, 27.6],  // Gujarat NW coast
  [84.1, 27.9],  // Gujarat W
  [84.8, 28.0],  // Gujarat S
  [85.0, 28.9],  // Mumbai
  [85.3, 29.8],  // Goa
  [85.7, 30.9],  // Karnataka coast
  [86.0, 32.3],  // Kerala
  [86.7, 33.2],  // close
]

function pointInPoly(px: number, py: number, poly: [number, number][]): boolean {
  let inside = false
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j]
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi)
      inside = !inside
  }
  return inside
}

const CITIES = {
  INDIA:     { x: 87.0, y: 28.6, label: 'INDIA' },
  NEW_YORK:  { x: 33.5, y: 20.8 },
  LONDON:    { x: 59.0, y: 14.7 },
  DUBAI:     { x: 79.0, y: 26.8 },
  SINGAPORE: { x: 96.0, y: 35.5 },
  LAGOS:     { x: 61.0, y: 33.8 },
  JAKARTA:   { x: 97.5, y: 38.1 },
}

const CONNECTIONS = [
  { to: CITIES.NEW_YORK,  delay: 0.4 },
  { to: CITIES.LONDON,    delay: 0.8 },
  { to: CITIES.DUBAI,     delay: 1.1 },
  { to: CITIES.SINGAPORE, delay: 1.5 },
  { to: CITIES.LAGOS,     delay: 1.9 },
  { to: CITIES.JAKARTA,   delay: 2.2 },
]

const arcD = (from: { x: number; y: number }, to: { x: number; y: number }) => {
  const mx = (from.x + to.x) / 2
  const my = Math.min(from.y, to.y) - 12
  return `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`
}

function PulsingDot({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <g>
      <motion.circle cx={x} cy={y} r={0.8}
        fill="#D4A843"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay, duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      />
      <motion.circle cx={x} cy={y} r={0.8}
        fill="none" stroke="#D4A843" strokeWidth={0.3}
        animate={{ r: [0.8, 4], opacity: [0.9, 0] }}
        transition={{ delay, duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
      />
      <motion.circle cx={x} cy={y} r={0.8}
        fill="none" stroke="#D4A843" strokeWidth={0.2}
        animate={{ r: [0.8, 7], opacity: [0.4, 0] }}
        transition={{ delay: delay + 0.5, duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
      />
    </g>
  )
}

export default function WorldMapSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section className="relative py-14 md:py-20 overflow-hidden" style={{ background: '#0B0A08' }} ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 60% 50%, rgba(212,168,67,0.04) 0%, transparent 65%)' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-10 mb-12 md:mb-16">
        <RevealLine delay={0}>
          <p className="text-sm font-mono font-semibold tracking-[0.18em] text-primary uppercase mb-4">Global Reach</p>
        </RevealLine>
        <RevealLine delay={0.1}>
          <h2 className="text-[clamp(2rem,4vw,3rem)] font-bold tracking-tighter text-primary leading-tight max-w-xl">
            Starting in India.<br />Built for the world.
          </h2>
        </RevealLine>
        <motion.p
          className="text-base text-muted mt-5 max-w-[46ch] leading-relaxed"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE_OUT }}
        >
          India is the proof of concept. 600M vernacular speakers, the world's
          largest mobile-first population. The infrastructure we build here travels
          to every market where language is still a barrier.
        </motion.p>
      </div>

      {/* Map */}
      <motion.div
        className="relative w-full"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <svg
          viewBox="0 0 119 60"
          className="w-full"
          style={{ maxHeight: 440 }}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="mapFadeLR" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#0B0A08" />
              <stop offset="6%"   stopColor="transparent" />
              <stop offset="94%"  stopColor="transparent" />
              <stop offset="100%" stopColor="#0B0A08" />
            </linearGradient>
            <mask id="mapEdgeMask">
              <rect x="0" y="0" width="119" height="60" fill="white" />
              <rect x="0" y="0" width="119" height="60" fill="url(#mapFadeLR)" />
            </mask>
          </defs>

          <g mask="url(#mapEdgeMask)">
            {/* Real world map dots from dotted-map */}
            {DOTS.map(({ x, y }, i) => {
              const isHighlight = pointInPoly(x, y, INDIA_POLY)
              return (
                <circle
                  key={i}
                  cx={x} cy={y}
                  r={isHighlight ? 0.52 : 0.25}
                  fill={isHighlight ? 'rgba(212,168,67,0.82)' : 'rgba(160,152,144,0.22)'}
                />
              )
            })}

            {/* Animated arcs */}
            {CONNECTIONS.map(({ to, delay }, i) => (
              <motion.path
                key={i}
                d={arcD(CITIES.INDIA, to)}
                fill="none"
                stroke="#D4A843"
                strokeWidth={0.25}
                strokeDasharray="1 0.8"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: [0, 0.75, 0.5] } : {}}
                transition={{ delay: delay + 0.5, duration: 1.8, ease: [0.23, 1, 0.32, 1] }}
              />
            ))}

            {/* Destination pulses */}
            {isInView && CONNECTIONS.map(({ to, delay }, i) => (
              <PulsingDot key={i} x={to.x} y={to.y} delay={delay + 2} />
            ))}

            {/* India epicentre */}
            <PulsingDot x={CITIES.INDIA.x} y={CITIES.INDIA.y} delay={0.6} />
            <text
              x={CITIES.INDIA.x + 2} y={CITIES.INDIA.y + 1.5}
              fill="#D4A843" fontSize="2.2" fontFamily="JetBrains Mono, monospace"
              letterSpacing="0.06em"
            >
              INDIA
            </text>
          </g>
        </svg>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #0B0A08)' }}
        />
      </motion.div>

      {/* Stats strip */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 mt-10">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-hairline"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8, ease: EASE_OUT }}
        >
          {[
            { stat: '14',   label: 'Indian languages in Phase 1' },
            { stat: '600M', label: 'Vernacular speakers, India' },
            { stat: '4B',   label: 'Global addressable market' },
            { stat: '1',    label: 'Platform, built from scratch' },
          ].map(({ stat, label }) => (
            <div key={label}>
              <p className="font-mono text-2xl font-semibold text-primary mb-1">{stat}</p>
              <p className="text-xs text-muted leading-snug">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
