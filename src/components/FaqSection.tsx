import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import RevealLine from './shared/RevealLine'
import { useLang } from '../i18n/LanguageContext'

const EASE_OUT = [0.23, 1, 0.32, 1] as const

function FaqItem({ item, index, isLast }: { item: { q: string; a: string }; index: number; isLast: boolean }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <motion.div
      ref={ref}
      className={`border-t border-hairline ${isLast ? 'border-b' : ''}`}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: EASE_OUT }}
    >
      <button
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
        onClick={() => setOpen(!open)}
      >
        <span className="text-base font-medium text-primary group-hover:text-accent transition-colors duration-200 leading-snug">
          {item.q}
        </span>
        <motion.span
          className="text-muted text-xl leading-none shrink-0 mt-0.5"
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ height: { duration: 0.35, ease: EASE_OUT }, opacity: { duration: 0.25 } }}
            className="overflow-hidden"
          >
            <p className="text-base text-muted leading-relaxed pb-7 max-w-[62ch]">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FaqSection() {
  const { t, tv } = useLang()
  const faqs = tv<{ q: string; a: string }[]>('faq.items')
  return (
    <section className="py-14 md:py-20" style={{ background: '#0B0A08' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24">

          <div className="lg:sticky lg:top-28 lg:self-start">
            <RevealLine delay={0}>
              <p className="text-sm font-mono font-semibold tracking-[0.18em] text-primary uppercase mb-5">{t('faq.eyebrow')}</p>
            </RevealLine>
            <RevealLine delay={0.1}>
              <h2 className="text-[clamp(2rem,3.5vw,2.8rem)] font-bold tracking-tighter text-primary leading-[1.05]">
                {t('faq.headline')}
              </h2>
            </RevealLine>
            <motion.p
              className="text-base text-muted mt-6 leading-relaxed max-w-[36ch]"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE_OUT }}
            >
              {t('faq.sub')}
            </motion.p>
          </div>

          <div>
            {faqs.map((item, i) => (
              <FaqItem key={i} item={item} index={i} isLast={i === faqs.length - 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
