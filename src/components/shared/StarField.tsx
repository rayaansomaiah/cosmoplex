import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  alpha: number
  vx: number
  vy: number
  twinkleSpeed: number
  twinkleOffset: number
  twinkleDepth: number  // how dramatic the flicker is
}

export default function StarField({ count = 220 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const rafRef = useRef(0)
  const tRef = useRef(0)
  const wRef = useRef(0)
  const hRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      wRef.current = canvas.offsetWidth
      hRef.current = canvas.offsetHeight
      canvas.width = wRef.current * dpr
      canvas.height = hRef.current * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      starsRef.current = Array.from({ length: count }, () => {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.04 + Math.random() * 0.1
        // ~20% of stars are "bright twinklers", the rest are subtler
        const isBright = Math.random() < 0.2
        return {
          x: Math.random() * wRef.current,
          y: Math.random() * hRef.current,
          r: isBright ? 1.0 + Math.random() * 0.6 : Math.random() < 0.4 ? 0.8 : 0.45,
          alpha: isBright ? 0.55 + Math.random() * 0.4 : 0.12 + Math.random() * 0.35,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          twinkleSpeed: isBright ? 0.4 + Math.random() * 0.6 : 0.1 + Math.random() * 0.3,
          twinkleOffset: Math.random() * Math.PI * 2,
          twinkleDepth: isBright ? 0.85 : 0.35 + Math.random() * 0.3,
        }
      })
    }

    resize()

    const frame = () => {
      tRef.current += 0.016
      const w = wRef.current
      const h = hRef.current
      ctx.clearRect(0, 0, w, h)

      for (const s of starsRef.current) {
        s.x += s.vx
        s.y += s.vy
        if (s.x < 0) s.x += w
        if (s.x > w) s.x -= w
        if (s.y < 0) s.y += h
        if (s.y > h) s.y -= h

        // Sharp twinkle: use a power curve to make peaks snappy
        const sine = 0.5 + 0.5 * Math.sin(tRef.current * s.twinkleSpeed + s.twinkleOffset)
        const twinkle = Math.pow(sine, 1.8)   // sharper bright peaks, softer dim troughs
        const a = s.alpha * (1 - s.twinkleDepth + s.twinkleDepth * twinkle)
        const r = s.r * (0.85 + 0.3 * twinkle) // slight size pulse at peak

        // glow halo on bright stars at peak
        if (s.twinkleDepth > 0.6 && twinkle > 0.75) {
          const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, r * 4)
          g.addColorStop(0, `rgba(237,232,223,${a * 0.5})`)
          g.addColorStop(1, 'rgba(237,232,223,0)')
          ctx.beginPath()
          ctx.arc(s.x, s.y, r * 4, 0, Math.PI * 2)
          ctx.fillStyle = g
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(237,232,223,${a})`
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(frame)
    }

    frame()

    window.addEventListener('resize', resize)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
