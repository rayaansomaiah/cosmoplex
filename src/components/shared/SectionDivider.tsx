import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Props {
  label?: string
  style?: React.CSSProperties
  light?: boolean
}

export default function SectionDivider({ label, style, light }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-5% 0px' })

  const lineColor = light
    ? 'linear-gradient(to right, transparent, rgba(100,88,76,0.45) 30%, rgba(100,88,76,0.45))'
    : 'linear-gradient(to right, transparent, rgba(80,72,65,0.7) 30%, rgba(80,72,65,0.7))'
  const lineColorRev = light
    ? 'linear-gradient(to left, transparent, rgba(100,88,76,0.45) 30%, rgba(100,88,76,0.45))'
    : 'linear-gradient(to left, transparent, rgba(80,72,65,0.7) 30%, rgba(80,72,65,0.7))'
  const diamondBorder = light ? 'rgba(100,88,76,0.55)' : 'rgba(90,84,80,0.8)'
  const labelColor = light ? 'rgba(80,68,58,0.75)' : 'rgba(90,84,80,0.9)'

  return (
    <div ref={ref} className="relative py-4 px-6 md:px-10 overflow-hidden" style={style}>
      <div className="relative flex items-center gap-5 max-w-7xl mx-auto">
        <motion.div
          className="flex-1 h-px"
          style={{ background: lineColor }}
          initial={{ scaleX: 0, originX: 1 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
        />

        <motion.div
          className="shrink-0 flex items-center gap-3"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="w-2 h-2 rotate-45 border" style={{ borderColor: diamondBorder }} />
          {label && (
            <span className="text-[10px] font-mono tracking-[0.24em] uppercase" style={{ color: labelColor }}>
              {label}
            </span>
          )}
          <div className="w-2 h-2 rotate-45 border" style={{ borderColor: diamondBorder }} />
        </motion.div>

        <motion.div
          className="flex-1 h-px"
          style={{ background: lineColorRev }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.23, 1, 0.32, 1] }}
        />
      </div>
    </div>
  )
}
