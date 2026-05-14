import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const EASE_OUT = [0.23, 1, 0.32, 1] as const

interface Props { onClose: () => void }

export default function WaitlistModal({ onClose }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', comments: '' })

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      form.phone ? `Phone: ${form.phone}` : '',
      form.comments ? `Comments: ${form.comments}` : '',
    ].filter(Boolean).join('\n')

    window.location.href = `mailto:sumit@yantralive.com?subject=${encodeURIComponent('Waitlist: ' + form.name)}&body=${encodeURIComponent(body)}`
    onClose()
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

          <>
              <p className="text-xs font-mono tracking-[0.18em] uppercase text-accent mb-2">Join the Waitlist</p>
              <h2 className="text-xl font-bold text-primary mb-6 leading-snug">
                Be first when we launch.
              </h2>

              <form onSubmit={submit} className="space-y-4">
                <input
                  required
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={set('name')}
                  className={inputCls}
                />
                <input
                  required
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={set('email')}
                  className={inputCls}
                />
                <input
                  type="tel"
                  placeholder="Phone number (optional)"
                  value={form.phone}
                  onChange={set('phone')}
                  className={inputCls}
                />
                <textarea
                  rows={3}
                  placeholder="Additional comments (optional)"
                  value={form.comments}
                  onChange={set('comments')}
                  className={`${inputCls} resize-none`}
                />

                <button
                  type="submit"
                  className="w-full bg-accent text-bg font-semibold py-3.5 rounded-full text-sm
                    hover:bg-primary transition-colors duration-200"
                >
                  Join the waitlist
                </button>
              </form>
          </>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
