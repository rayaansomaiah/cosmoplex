import { useEffect, useRef } from 'react'

const FOCAL       = 800
const SPHERE_R    = 260
const SPHERE_LAT  = 10
const SPHERE_LON  = 14
const NODE_COUNT  = 52
const EDGE_DIST   = 160
const SPEED       = 0.20
const ACCENT_EVERY = 11

interface Node {
  x: number; y: number; z: number
  vx: number; vy: number; vz: number
  r: number
  isAccent: boolean
}

// Axis rotations
const rx = (y: number, z: number, a: number) => ({
  y: y * Math.cos(a) - z * Math.sin(a),
  z: y * Math.sin(a) + z * Math.cos(a),
})
const ry = (x: number, z: number, a: number) => ({
  x: x * Math.cos(a) + z * Math.sin(a),
  z: -x * Math.sin(a) + z * Math.cos(a),
})

const project = (x: number, y: number, z: number, cx: number, cy: number) => {
  const s = FOCAL / (FOCAL + z + 400)
  return { sx: cx + x * s, sy: cy + y * s, s }
}

export default function PlexusCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const nodes = useRef<Node[]>([])
  const autoY = useRef(0)
  const camRX = useRef(0)
  const camRY = useRef(0)
  const targetRX = useRef(0)
  const targetRY = useRef(0)
  const raf = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!

    const setup = () => {
      const dpr = window.devicePixelRatio || 1
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      nodes.current = Array.from({ length: NODE_COUNT }, (_, i) => ({
        x: (Math.random() - 0.5) * w * 0.9,
        y: (Math.random() - 0.5) * h * 0.9,
        z: (Math.random() - 0.5) * 500,
        vx: (Math.random() - 0.5) * SPEED * 2,
        vy: (Math.random() - 0.5) * SPEED * 2,
        vz: (Math.random() - 0.5) * SPEED,
        r: 0.9 + Math.random() * 1.0,
        isAccent: i % ACCENT_EVERY === 0,
      }))
    }

    setup()

    const frame = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      // Smooth camera toward target
      camRX.current += (targetRX.current - camRX.current) * 0.05
      camRY.current += (targetRY.current - camRY.current) * 0.05
      autoY.current += 0.0018

      const ax = camRX.current
      const ay = camRY.current + autoY.current
      const cx = w / 2, cy = h / 2

      // ── WIREFRAME SPHERE ──────────────────────────────────────
      const transformPt = (px: number, py: number, pz: number) => {
        const ryr = ry(px, pz, ay); px = ryr.x; pz = ryr.z
        const rxr = rx(py, pz, ax); py = rxr.y; pz = rxr.z
        return project(px, py, pz, cx, cy)
      }

      // Latitude circles
      for (let li = 1; li < SPHERE_LAT; li++) {
        const lat = (li / SPHERE_LAT) * Math.PI
        const latR = Math.sin(lat) * SPHERE_R
        const latY = -Math.cos(lat) * SPHERE_R
        const equatorDist = 1 - Math.abs(Math.cos(lat))
        const alpha = 0.48 + equatorDist * 0.32
        ctx.beginPath()
        let started = false
        for (let i = 0; i <= 72; i++) {
          const t = (i / 72) * Math.PI * 2
          const { sx, sy } = transformPt(latR * Math.cos(t), latY, latR * Math.sin(t))
          if (!started) { ctx.moveTo(sx, sy); started = true }
          else ctx.lineTo(sx, sy)
        }
        ctx.closePath()
        ctx.strokeStyle = `rgba(212,168,67,${alpha})`
        ctx.lineWidth = 1.2
        ctx.stroke()
      }

      // Longitude arcs
      for (let li = 0; li < SPHERE_LON; li++) {
        const lon = (li / SPHERE_LON) * Math.PI * 2
        ctx.beginPath()
        let started = false
        for (let i = 0; i <= 48; i++) {
          const lat = (i / 48) * Math.PI
          const { sx, sy } = transformPt(
            SPHERE_R * Math.sin(lat) * Math.cos(lon),
            -SPHERE_R * Math.cos(lat),
            SPHERE_R * Math.sin(lat) * Math.sin(lon),
          )
          if (!started) { ctx.moveTo(sx, sy); started = true }
          else ctx.lineTo(sx, sy)
        }
        ctx.strokeStyle = 'rgba(212,168,67,0.48)'
        ctx.lineWidth = 1.2
        ctx.stroke()
      }

      // Dots on sphere surface
      const spherePts = [
        [0, -1, 0], [0.7, 0.3, 0.64], [-0.6, 0.5, -0.62],
        [0.3, 0.9, -0.3], [-0.8, -0.4, 0.45], [0.5, -0.7, 0.5],
        [-0.3, 0.2, 0.93], [0.9, 0.1, -0.42],
      ]
      for (const [nx, ny, nz] of spherePts) {
        // rotate same as sphere
        let px = nx * SPHERE_R, py = ny * SPHERE_R, pz = nz * SPHERE_R
        const ryr = ry(px, pz, ay); px = ryr.x; pz = ryr.z
        const rxr = rx(py, pz, ax); py = rxr.y; pz = rxr.z
        const { sx, sy, s } = project(px, py, pz, cx, cy)
        const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, 10 * s)
        g.addColorStop(0, `rgba(212,168,67,${0.9 * s})`)
        g.addColorStop(1, 'rgba(212,168,67,0)')
        ctx.beginPath()
        ctx.arc(sx, sy, 10 * s, 0, Math.PI * 2)
        ctx.fillStyle = g
        ctx.fill()
        ctx.beginPath()
        ctx.arc(sx, sy, 2.2 * s, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212,168,67,${1.0})`
        ctx.fill()
      }

      // ── PARTICLES ─────────────────────────────────────────────
      for (const n of nodes.current) {
        n.x += n.vx; n.y += n.vy; n.z += n.vz
        if (Math.abs(n.x) > w * 0.55) n.vx = -n.vx
        if (Math.abs(n.y) > h * 0.55) n.vy = -n.vy
        if (Math.abs(n.z) > 260) n.vz = -n.vz
      }

      // Project with camera rotation
      const proj = nodes.current.map(n => {
        let { x, y, z } = n
        const ryr = ry(x, z, camRY.current); x = ryr.x; z = ryr.z
        const rxr = rx(y, z, camRX.current); y = rxr.y; z = rxr.z
        const p = project(x, y, z, cx, cy)
        return { ...p, origZ: z, n }
      })

      // Depth sort (far first)
      proj.sort((a, b) => a.origZ - b.origZ)

      // Edges
      for (let i = 0; i < proj.length; i++) {
        for (let j = i + 1; j < proj.length; j++) {
          const dx = proj[i].sx - proj[j].sx
          const dy = proj[i].sy - proj[j].sy
          const d = Math.sqrt(dx * dx + dy * dy)
          if (d < EDGE_DIST) {
            const avgS = (proj[i].s + proj[j].s) * 0.5
            ctx.beginPath()
            ctx.strokeStyle = `rgba(237,232,223,${(1 - d / EDGE_DIST) * 0.35 * avgS})`
            ctx.lineWidth = 0.5
            ctx.moveTo(proj[i].sx, proj[i].sy)
            ctx.lineTo(proj[j].sx, proj[j].sy)
            ctx.stroke()
          }
        }
      }

      // Nodes
      for (const { sx, sy, s, n } of proj) {
        const a = Math.min(1, s * 1.1)
        if (n.isAccent) {
          const g = ctx.createRadialGradient(sx, sy, 0, sx, sy, 9 * s)
          g.addColorStop(0, `rgba(212,168,67,${0.45 * a})`)
          g.addColorStop(1, 'rgba(212,168,67,0)')
          ctx.beginPath(); ctx.arc(sx, sy, 12 * s, 0, Math.PI * 2)
          ctx.fillStyle = g; ctx.fill()
          ctx.beginPath(); ctx.arc(sx, sy, 2 * s, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(212,168,67,${0.95 * a})`; ctx.fill()
        } else {
          ctx.beginPath(); ctx.arc(sx, sy, n.r * s, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(237,232,223,${0.65 * a})`; ctx.fill()
        }
      }

      raf.current = requestAnimationFrame(frame)
    }

    frame()

    const onMove = (e: MouseEvent) => {
      targetRX.current = (e.clientY / window.innerHeight - 0.5) * 0.45
      targetRY.current = (e.clientX / window.innerWidth  - 0.5) * 0.45
    }
    const onResize = () => { cancelAnimationFrame(raf.current); setup(); frame() }

    document.addEventListener('mousemove', onMove)
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf.current)
      document.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 65% 60% at 50% 50%, rgba(212,168,67,0.08) 0%, transparent 70%)',
        }}
      />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" aria-hidden="true" />
    </>
  )
}
