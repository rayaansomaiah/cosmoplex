import { useLang } from '../i18n/LanguageContext'

export default function MarqueeStrip() {
  const { tv } = useLang()
  const base = tv<string[]>('marquee')
  const items = [...base, ...base]
  return (
    <div
      className="border-y border-hairline overflow-hidden py-4"
      style={{ background: '#0B0A08' }}
      aria-hidden="true"
    >
      <div className="marquee-track select-none">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className="text-xs font-mono tracking-[0.16em] uppercase text-muted px-7 whitespace-nowrap">
              {item}
            </span>
            <span className="text-accent text-xs opacity-60">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}
