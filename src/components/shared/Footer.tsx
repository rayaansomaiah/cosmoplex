import { useLang } from '../../i18n/LanguageContext'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="border-t border-hairline" style={{ background: '#0B0A08' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="flex items-center gap-8 flex-wrap">
          <span className="text-xs font-mono text-muted tracking-widest uppercase">Cosmoplex</span>
          <span className="text-xs text-muted">{t('closing.footerTagline')}</span>
        </div>

        {/* NVIDIA Inception Program badge — kept on its original white background */}
        <div className="shrink-0 rounded-lg bg-white p-2.5">
          <img
            src="/nvidia-inception.jpeg"
            alt="NVIDIA Inception Program member"
            className="block h-10 w-auto"
          />
        </div>
      </div>

      <div className="border-t border-hairline py-6 text-center">
        <p className="text-xs text-faint font-mono">© 2026 Cosmoplex AI, Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}
