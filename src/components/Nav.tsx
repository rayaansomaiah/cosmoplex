import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import logo from '../../cosmoplex_logo_plexus.png'

const links = [
  { label: 'Thesis', href: '#thesis' },
  { label: 'The Stack', href: '#the-stack' },
  { label: 'The Divide', href: '#the-divide' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
        <motion.div
          className="flex items-center gap-6 px-3 py-2.5 rounded-full border border-hairline pointer-events-auto"
          style={{ background: 'rgba(18, 17, 14, 0.92)', backdropFilter: 'blur(24px)' }}
          initial={{ y: -16, opacity: 0, scale: 0.97 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <a href="#" className="flex items-center shrink-0">
            <div style={{ width: 90, height: 32, overflow: 'hidden' }}>
              <img src={logo} alt="Cosmoplex" style={{ width: 90, height: 90, marginTop: -29, display: 'block' }} />
            </div>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {links.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="text-[13px] text-muted hover:text-primary transition-colors duration-200 whitespace-nowrap font-medium"
              >
                {label}
              </a>
            ))}
          </div>

          <motion.a
            href="#contact"
            className="hidden md:inline-flex text-[12px] font-semibold px-4 py-2 rounded-full bg-accent text-bg hover:bg-primary transition-colors duration-200 whitespace-nowrap"
            whileTap={{ scale: 0.96 }}
          >
            Get in touch
          </motion.a>

          <button
            className="md:hidden w-8 h-8 flex items-center justify-center text-muted hover:text-primary transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className="text-base leading-none">{open ? '✕' : '≡'}</span>
          </button>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-10"
            style={{ background: 'rgba(11,10,8,0.97)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {[...links, { label: 'Contact', href: '#contact' }].map(({ label, href }, i) => (
              <motion.a
                key={label}
                href={href}
                className="text-4xl font-bold text-primary hover:text-accent transition-colors"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => setOpen(false)}
              >
                {label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
