import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '../i18n/LanguageContext'

const EASE_OUT = [0.23, 1, 0.32, 1] as const
const DEFAULT_ENDPOINT = 'https://formspree.io/f/xwvyjdey'

interface Props {
  onClose: () => void
  /** Formspree endpoint — override to route this form to its own inbox */
  endpoint?: string
  /** Label that identifies where the submission came from (tags every response) */
  source?: string
  eyebrow?: string
  title?: string
  submitLabel?: string
}

export default function WaitlistModal({
  onClose,
  endpoint = DEFAULT_ENDPOINT,
  source = 'Homepage',
  eyebrow,
  title,
  submitLabel,
}: Props) {
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', email: '', phone: '', comments: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, source, _subject: `Cosmoplex — ${source} enquiry` }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  const inputCls = `w-full bg-transparent border border-hairline rounded-lg px-4 py-3 text-sm text-primary
    placeholder:text-faint focus:outline-none focus:border-accent transition-colors duration-200`

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />

        {/* Panel */}
        <motion.div
          className="relative z-10 w-full max-w-md rounded-2xl border border-hairline p-8"
          style={{ background: '#141310' }}
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-faint hover:text-primary transition-colors text-lg leading-none"
            aria-label="Close"
          >
            ✕
          </button>

          {status === 'success' ? (
            <div className="text-center py-6">
              <p className="text-2xl font-bold text-primary mb-3">{t('modal.successTitle')}</p>
              <p className="text-sm text-muted">{t('modal.successBody')}</p>
            </div>
          ) : (
            <>
              <p className="text-xs font-mono tracking-[0.18em] uppercase text-accent mb-2">{eyebrow ?? t('modal.eyebrow')}</p>
              <h2 className="text-xl font-bold text-primary mb-6 leading-snug">
                {title ?? t('modal.title')}
              </h2>

              <form onSubmit={submit} className="space-y-4">
                <input required type="text" placeholder={t('modal.name')}
                  value={form.name} onChange={set('name')} className={inputCls} />
                <input required type="email" placeholder={t('modal.email')}
                  value={form.email} onChange={set('email')} className={inputCls} />
                <input type="tel" placeholder={t('modal.phone')}
                  value={form.phone} onChange={set('phone')} className={inputCls} />
                <textarea rows={3} placeholder={t('modal.comments')}
                  value={form.comments} onChange={set('comments')}
                  className={`${inputCls} resize-none`} />

                {status === 'error' && (
                  <p className="text-xs text-red-400">{t('modal.error')}</p>
                )}

                <button type="submit" disabled={status === 'sending'}
                  className="w-full bg-accent text-bg font-semibold py-3.5 rounded-full text-sm
                    hover:bg-primary transition-colors duration-200 disabled:opacity-50">
                  {status === 'sending' ? t('modal.sending') : (submitLabel ?? t('modal.submit'))}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
