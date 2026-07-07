import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import logo from '../../cosmoplex_logo_plexus.png'
import { useLang, LANGS } from '../i18n/LanguageContext'

function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { lang, setLang } = useLang()
  const [open, setOpen] = useState(false)
  const current = LANGS.find(l => l.code === lang) ?? LANGS[0]

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`inline-flex items-center gap-1.5 rounded-full border border-hairline text-muted hover:text-primary hover:border-muted transition-colors duration-200 ${compact ? 'px-3 py-1.5 text-sm' : 'px-3 py-2 text-[12px]'}`}
        aria-label="Select language"
      >
        <span aria-hidden>🌐</span>
        <span className="font-medium">{current.native}</span>
        <span className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}>⌄</span>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <motion.div
              className="absolute right-0 mt-2 z-20 min-w-[150px] rounded-2xl border border-hairline p-1.5"
              style={{ background: 'rgba(18,17,14,0.98)', backdropFilter: 'blur(24px)' }}
              initial={{ opacity: 0, y: -8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.97 }}
              transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            >
              {LANGS.map(l => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setOpen(false) }}
                  className={`w-full flex items-center justify-between gap-4 px-3 py-2 rounded-xl text-left text-sm transition-colors duration-150
                    ${l.code === lang ? 'text-accent bg-white/[0.04]' : 'text-muted hover:text-primary hover:bg-white/[0.03]'}`}
                >
                  <span className="font-medium">{l.native}</span>
                  <span className="text-[10px] font-mono text-faint uppercase">{l.label}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Nav() {
  const [open, setOpen] = useState(false)
  const { t } = useLang()

  const links = [
    { label: t('nav.thesis'), to: '/#thesis' },
    { label: t('nav.aiLiteracy'), to: '/ai-literacy' },
    { label: t('nav.appliedAI'), to: '/applied-ai' },
  ]

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4 pointer-events-none">
        <motion.div
          className="flex items-center gap-4 md:gap-6 px-3 py-2.5 rounded-full border border-hairline pointer-events-auto"
          style={{ background: 'rgba(18, 17, 14, 0.92)', backdropFilter: 'blur(24px)' }}
          initial={{ y: -16, opacity: 0, scale: 0.97 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
        >
          <Link to="/" className="flex items-center shrink-0">
            <div style={{ width: 90, height: 32, overflow: 'hidden' }}>
              <img src={logo} alt="Cosmoplex" style={{ width: 90, height: 90, marginTop: -29, display: 'block' }} />
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="text-[13px] text-muted hover:text-primary transition-colors duration-200 whitespace-nowrap font-medium"
              >
                {label}
              </Link>
            ))}
          </div>

          <Link
            to="/#contact"
            className="hidden md:inline-flex text-[12px] font-semibold px-4 py-2 rounded-full bg-accent text-bg hover:bg-primary transition-colors duration-200 whitespace-nowrap"
          >
            {t('nav.getInTouch')}
          </Link>

          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

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
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ background: 'rgba(11,10,8,0.97)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {[...links, { label: t('nav.contact'), to: '/#contact' }].map(({ label, to }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}
              >
                <Link
                  to={to}
                  className="text-4xl font-bold text-primary hover:text-accent transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
            <div className="mt-4" onClick={() => setOpen(false)}>
              <LanguageSwitcher compact />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
