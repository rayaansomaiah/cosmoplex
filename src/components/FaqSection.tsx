import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import RevealLine from './shared/RevealLine'

const EASE_OUT = [0.23, 1, 0.32, 1] as const

const faqs = [
  {
    q: 'What exactly is Vernacular AI?',
    a: 'Vernacular AI refers to AI tools built natively for non-English languages — not translated versions of English products. Our platform is designed from first principles in Hindi and 13 other Indian languages, using voice-first interfaces, culturally relevant content, and AI pedagogy that fits how vernacular learners actually communicate.',
  },
  {
    q: 'Why does the language gap matter so much?',
    a: "Current AI tools perform at ~80% accuracy in English but drop below 55% in low-resource languages. That 25-point gap is the difference between a tool that empowers and one that misleads. More importantly, the 30–35% productivity gain AI delivers to junior workers — the people who need it most — is structurally blocked for the 4 billion who don't access AI in their language.",
  },
  {
    q: 'What is the VALI Certification?',
    a: 'VALI (Vernacular AI Literacy Index) is our proprietary certification framework. It measures an individual\'s ability to effectively use AI tools in their native language across defined competency levels. Certification is the business model — learners pay to get certified, employers pay to hire certified workers, and the whole system creates an incentive structure that doesn\'t exist today.',
  },
  {
    q: 'How do the three layers reinforce each other?',
    a: 'Layer 1 (AI Literacy) creates the user base and generates real interaction data. Layer 2 (Applied Products) serves those users with monetisable tools. Layer 3 (Data Flywheel) captures 1M+ real vernacular interactions, which continuously improves the literacy layer and pre-validates every product before it ships. Each layer makes the other two stronger.',
  },
  {
    q: 'Why start with QSR for Applied AI Products?',
    a: "QSR (Quick Service Restaurants) is India's fastest-growing SME segment, deeply mobile-native, and chronically underserved by existing software. Voice ordering eliminates the literacy barrier at the point of sale. Owner dashboards give operators their first real-time business intelligence. It's the perfect product-market fit proof point before we expand to MSME, healthcare, and agriculture.",
  },
  {
    q: 'Who is Cosmoplex building for?',
    a: "Three groups: (1) Learners — vernacular speakers who want to participate in the AI economy. (2) Employers and platforms — who need a certified, AI-ready workforce at scale. (3) Businesses — particularly SMEs in QSR, agriculture, and healthcare who need AI tools they can actually use. The flywheel serves all three simultaneously.",
  },
]

function FaqItem({ item, index, isLast }: { item: typeof faqs[0]; index: number; isLast: boolean }) {
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
  return (
    <section className="py-14 md:py-20" style={{ background: '#0B0A08' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 lg:gap-24">

          <div className="lg:sticky lg:top-28 lg:self-start">
            <RevealLine delay={0}>
              <p className="text-sm font-mono font-semibold tracking-[0.18em] text-primary uppercase mb-5">Questions</p>
            </RevealLine>
            <RevealLine delay={0.1}>
              <h2 className="text-[clamp(2rem,3.5vw,2.8rem)] font-bold tracking-tighter text-primary leading-[1.05]">
                Common questions about Cosmoplex
              </h2>
            </RevealLine>
            <motion.p
              className="text-base text-muted mt-6 leading-relaxed max-w-[36ch]"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.7, delay: 0.25, ease: EASE_OUT }}
            >
              Everything you need to understand the thesis, the business model, and the technology.
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
