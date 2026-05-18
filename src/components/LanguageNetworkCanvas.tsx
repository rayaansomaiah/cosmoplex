import { useEffect, useRef } from 'react'

const DEG = Math.PI / 180
const g  = (a: number) => `rgba(212,168,67,${a})`
const gw = (a: number) => `rgba(237,232,223,${a})`

type NodeType = 'outer' | 'inner' | 'sun'
interface Node3D { x: number; y: number; z: number; label: string; type: NodeType }

// Outer arc: 6 nodes at radius 1.0, bowl-curved in Z (centre dips back)
const OUTER_A = [300, 252, 204, 156, 108, 60]
const OUTER_L = ['বাংলা', 'தமிழ்', 'हिंदी', 'मराठी', 'ਪੰਜਾਬੀ', 'తెలుగు']

// Inner ring: 5 nodes at radius 0.55, slightly forward
const INNER_A = [276, 228, 180, 132, 84]
const INNER_L = ['अ', 'ক', '', 'ও', 'ക']

const NODES: Node3D[] = [
  ...OUTER_A.map((a, i) => {
    const bow = Math.sin((i / 5) * Math.PI) // 0 at horns, 1 at mid
    return { x: Math.cos(a * DEG), y: Math.sin(a * DEG), z: -bow * 0.30, label: OUTER_L[i], type: 'outer' as NodeType }
  }),
  ...INNER_A.map((a, i) => {
    const fwd = 0.08 + (i === 2 ? 0.06 : 0)
    return { x: 0.55 * Math.cos(a * DEG), y: 0.55 * Math.sin(a * DEG), z: fwd, label: INNER_L[i], type: 'inner' as NodeType }
  }),
  // Sun: at the ਗ inner node position (180°, leftmost inner)
  { x: -0.55, y: 0, z: 0.14, label: '', type: 'sun' },
]

const SUN = NODES.length - 1

// Edges: outer arc chain + adjacency mesh (no centre spokes)
const EDGES: [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],[4,5],
  [0,6],[1,6],[1,7],[2,7],[2,8],[3,8],[3,9],[4,9],[4,10],[5,10],
  [6,7],[7,8],[8,9],[9,10],
]

export default function LanguageNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef   = useRef(0)
  const tRef     = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let w = 0, h = 0

    const setup = () => {
      const dpr = window.devicePixelRatio || 1
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width  = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    setup()

    const frame = () => {
      tRef.current += 0.008
      const t = tRef.current
      ctx.clearRect(0, 0, w, h)

      const scale = Math.min(w, h) * (w < 640 ? 0.40 : 0.28)
      const cx    = w * 0.50
      const cy    = h * 0.46

      // Fixed orientation — C shape facing forward, slight X tilt for depth
      const rotY  = 0
      const tiltX = 0.30
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY)
      const cosX = Math.cos(tiltX), sinX = Math.sin(tiltX)
      const FOV   = 3.0

      const project = (nx: number, ny: number, nz: number) => {
        // Y rotation
        const x1 =  nx * cosY + nz * sinY
        const y1 =  ny
        const z1 = -nx * sinY + nz * cosY
        // X tilt
        const x2 = x1
        const y2 =  y1 * cosX - z1 * sinX
        const z2 =  y1 * sinX + z1 * cosX
        // Perspective
        const pz = z2 + FOV
        const sx = (x2 / pz) * scale * FOV + cx
        const sy = (y2 / pz) * scale * FOV + cy
        const depth = Math.max(0, Math.min(1, (z2 + 0.9) / 1.8))
        return { sx, sy, depth, z2 }
      }

      // Project all nodes
      const proj = NODES.map(n => ({ ...n, ...project(n.x, n.y, n.z) }))

      // ── EDGES (back → front) ────────────────────────────────
      const sortedEdges = EDGES
        .map(([i, j]) => ({ i, j, d: (proj[i].depth + proj[j].depth) / 2 }))
        .sort((a, b) => a.d - b.d)

      for (const { i, j, d } of sortedEdges) {
        const a = proj[i], b = proj[j]
        ctx.beginPath()
        ctx.moveTo(a.sx, a.sy)
        ctx.lineTo(b.sx, b.sy)
        ctx.strokeStyle = g(0.28 + d * 0.45)
        ctx.lineWidth   = 0.6 + d * 1.2
        ctx.stroke()
      }

      // ── NODES (back → front) ────────────────────────────────
      const sortedNodes = [...proj].sort((a, b) => a.depth - b.depth)

      for (const p of sortedNodes) {

        if (p.type === 'sun') {
          const pulse = 0.93 + 0.07 * Math.sin(t * 6.5)
          const r = scale * 0.038 * pulse * (0.7 + p.depth * 0.6)

          // Rays (no per-ray gradient)
          ctx.save()
          ctx.strokeStyle = 'rgba(212,168,67,1)'
          for (let i = 0; i < 10; i++) {
            const ang = (i / 10) * Math.PI * 2 + t * 4.1
            ctx.globalAlpha = i % 2 === 0 ? 0.32 : 0.14
            ctx.lineWidth   = i % 2 === 0 ? 1.0  : 0.5
            ctx.beginPath()
            ctx.moveTo(p.sx + Math.cos(ang) * r * 0.9, p.sy + Math.sin(ang) * r * 0.9)
            ctx.lineTo(p.sx + Math.cos(ang) * r * 3.8, p.sy + Math.sin(ang) * r * 3.8)
            ctx.stroke()
          }
          ctx.restore()

          // Halo (recreated at sun's current projected position)
          const halo = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r * 5)
          halo.addColorStop(0,   g(0.55))
          halo.addColorStop(0.4, g(0.14))
          halo.addColorStop(1,   g(0))
          ctx.beginPath(); ctx.arc(p.sx, p.sy, r * 5, 0, Math.PI * 2)
          ctx.fillStyle = halo; ctx.fill()

          // Core dot
          const core = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r)
          core.addColorStop(0,   'rgba(255,245,190,1)')
          core.addColorStop(0.5, g(0.92))
          core.addColorStop(1,   g(0.3))
          ctx.beginPath(); ctx.arc(p.sx, p.sy, r, 0, Math.PI * 2)
          ctx.fillStyle = core; ctx.fill()
          continue
        }

        // Regular nodes
        const baseR = p.type === 'outer' ? scale * 0.026 : scale * 0.017
        const dotR  = baseR * (0.5 + p.depth * 0.8)
        const alpha = p.type === 'outer' ? 0.28 + p.depth * 0.35 : 0.18 + p.depth * 0.28

        ctx.beginPath()
        ctx.arc(p.sx, p.sy, dotR, 0, Math.PI * 2)
        ctx.fillStyle = g(alpha)
        ctx.fill()

        // Labels (outer nodes only, depth-faded)
        if (p.type === 'outer') {
          const fs = Math.max(10, Math.round(scale * 0.085 * (0.5 + p.depth * 0.7)))
          ctx.font = `400 ${fs}px 'system-ui','Segoe UI','Arial Unicode MS',sans-serif`

          // Offset label away from screen centre
          const dx   = p.sx - cx, dy = p.sy - cy
          const dist = Math.sqrt(dx * dx + dy * dy) || 1
          const lx   = p.sx + (dx / dist) * (dotR + 5)
          const ly   = p.sy + (dy / dist) * (dotR + 5)
          ctx.textAlign    = dx > 8 ? 'left' : dx < -8 ? 'right' : 'center'
          ctx.textBaseline = dy > 8 ? 'top'  : dy < -8 ? 'bottom' : 'middle'
          ctx.fillStyle    = gw(0.45 + p.depth * 0.45)
          ctx.fillText(p.label, lx, ly)
        }
      }

      rafRef.current = requestAnimationFrame(frame)
    }

    frame()

    const onResize = () => { cancelAnimationFrame(rafRef.current); setup(); frame() }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" aria-hidden="true" />
  )
}
