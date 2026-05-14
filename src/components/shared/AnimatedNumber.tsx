import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

interface Props {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
  decimals?: number
  className?: string
}

export default function AnimatedNumber({
  value,
  suffix = '',
  prefix = '',
  duration = 1800,
  decimals = 0,
  className = '',
}: Props) {
  const [current, setCurrent] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-15% 0px' })

  useEffect(() => {
    if (!isInView) return
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      const factor = Math.pow(10, decimals)
      setCurrent(Math.round(eased * value * factor) / factor)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, value, duration, decimals])

  return (
    <span ref={ref} className={className}>
      {prefix}{decimals > 0 ? current.toFixed(decimals) : current}{suffix}
    </span>
  )
}
