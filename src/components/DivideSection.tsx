import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import RevealLine from './shared/RevealLine'
import { useLang } from '../i18n/LanguageContext'

const EASE_OUT = [0.23, 1, 0.32, 1] as const


export default function DivideSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-10% 0px' })
  const { t } = useLang()

  return (
    <section id="the-divide" ref={ref} className="overflow-hidden" style={{ background: '#0B0A08' }}>
      <div className="relative px-10 md:px-16 lg:px-24 py-14 md:py-20">

        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 80% at 10% 50%, rgba(212,168,67,0.05) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── LEFT: Text content ── */}
          <div>
            {/* Eyebrow */}
            <motion.div
              className="flex items-center gap-3 mb-10"
              initial={{ opacity: 0, x: -16 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              <div className="w-5 h-px" style={{ background: '#D4A843' }} />
              <span className="text-[10px] font-mono tracking-[0.3em] uppercase" style={{ color: '#D4A843' }}>
                {t('divide.eyebrow')}
              </span>
            </motion.div>

            {/* Hero number */}
            <div className="mb-3 overflow-hidden">
              <motion.p
                className="font-bold leading-[0.9] tracking-tighter"
                style={{ fontSize: 'clamp(4.5rem, 8vw, 8.5rem)', color: '#EDE8DF' }}
                initial={{ y: '110%' }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT }}
              >
                {t('divide.bignum')}
              </motion.p>
            </div>

            <RevealLine delay={0.25}>
              <p
                className="text-[clamp(1.2rem,2.2vw,2rem)] font-semibold leading-tight tracking-tight mb-1"
                style={{ color: '#EDE8DF' }}
              >
                {t('divide.l1')}
              </p>
            </RevealLine>
            <RevealLine delay={0.34}>
              <p
                className="text-[clamp(1rem,1.8vw,1.65rem)] font-light leading-tight tracking-tight"
                style={{ color: 'rgba(237,232,223,0.38)' }}
              >
                {t('divide.l2')}
              </p>
            </RevealLine>

            {/* Gold rule */}
            <motion.div
              className="my-9 h-px"
              style={{
                background: 'linear-gradient(to right, rgba(237,232,223,0.38) 0%, transparent 70%)',
                transformOrigin: 'left',
              }}
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, delay: 0.45, ease: EASE_OUT }}
            />

            {/* Quote */}
            <motion.blockquote
              className="mb-9"
              initial={{ opacity: 0, y: 14 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.55, ease: EASE_OUT }}
            >
              <p
                className="text-sm leading-relaxed mb-3 max-w-[40ch]"
                style={{ color: 'rgba(237,232,223,0.48)' }}
              >
                {t('divide.quote')}
              </p>
              <cite className="text-[9px] font-mono tracking-[0.22em] uppercase not-italic" style={{ color: 'rgba(212,168,67,0.5)' }}>
                {t('divide.cite')}
              </cite>
            </motion.blockquote>

            {/* Stats */}
          </div>

          {/* ── RIGHT: Video with 4-sided vignette ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.2, ease: EASE_OUT }}
            className="relative"
          >
            {/* Video container — overflow hidden clips the vignette */}
            <div className="relative overflow-hidden rounded-2xl" style={{ aspectRatio: '16/10' }}>

              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="/mp_.mp4" type="video/mp4" />
              </video>

              {/* 4-sided vignette — individual gradient per edge */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute inset-x-0 top-0 h-28" style={{ background: 'linear-gradient(to bottom, #0B0A08, transparent)' }} />
                <div className="absolute inset-x-0 bottom-0 h-28" style={{ background: 'linear-gradient(to top, #0B0A08, transparent)' }} />
                <div className="absolute inset-y-0 left-0 w-28" style={{ background: 'linear-gradient(to right, #0B0A08, transparent)' }} />
                <div className="absolute inset-y-0 right-0 w-28" style={{ background: 'linear-gradient(to left, #0B0A08, transparent)' }} />
              </div>

              {/* Bottom caption */}
              <div className="absolute bottom-5 left-5 right-5 z-20">
                <p className="text-[9px] font-mono tracking-[0.2em] uppercase mb-1.5" style={{ color: 'rgba(212,168,67,0.6)' }}>
                  {t('divide.captionEyebrow')}
                </p>
                <p className="text-base font-semibold leading-snug" style={{ color: 'rgba(237,232,223,0.88)' }}>
                  {t('divide.caption')}
                </p>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
