const items = [
  'Vernacular AI',
  '14 Languages',
  '600M Speakers',
  'VALI Certified',
  'Voice-First',
  'WhatsApp Delivered',
  'Multi-Agent Pedagogy',
  "India's AI Moment",
  'Hindi + 13 Languages',
  'Vernacular AI',
  '14 Languages',
  '600M Speakers',
  'VALI Certified',
  'Voice-First',
  'WhatsApp Delivered',
  'Multi-Agent Pedagogy',
  "India's AI Moment",
  'Hindi + 13 Languages',
]

export default function MarqueeStrip() {
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
