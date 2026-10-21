import { onBeforeUnmount, onMounted, ref, type Ref } from 'vue'

interface ContourOptions {
  cell?: number
  levels?: number
  speed?: number
}

// Marching squares: for each case, pairs of edges the iso-line crosses.
// Edges: 0 = top, 1 = right, 2 = bottom, 3 = left.
const SEGMENTS: number[][] = [
  [], [3, 2], [2, 1], [3, 1],
  [0, 1], [3, 0, 2, 1], [0, 2], [3, 0],
  [3, 0], [0, 2], [0, 1, 3, 2], [0, 1],
  [3, 1], [2, 1], [3, 2], [],
]

export function useContourField(canvas: Ref<HTMLCanvasElement | null>, options: ContourOptions = {}) {
  const { cell = 14, levels = 14, speed = 0.00006 } = options

  const pointer = ref({ x: 0.5, y: 0.5, active: false })
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let frame = 0
  let width = 0
  let height = 0
  let cols = 0
  let rows = 0
  let field = new Float32Array(0)
  let peak = { x: 0.5, y: 0.5, strength: 0 }

  function height2d(x: number, y: number, t: number) {
    // Layered rotated sines give a convincing, cheap terrain.
    let v =
      Math.sin(x * 2.1 + t) * Math.cos(y * 1.7 - t * 0.6) * 0.55 +
      Math.sin((x * 0.8 + y * 1.3) * 3.1 - t * 1.3) * 0.25 +
      Math.cos((x * 1.9 - y * 0.6) * 4.3 + t * 0.7) * 0.14 +
      Math.sin(Math.hypot(x - 1.4, y - 0.4) * 5.2 - t * 0.9) * 0.18

    const dx = x - peak.x
    const dy = y - peak.y
    v += peak.strength * Math.exp(-(dx * dx + dy * dy) * 18)
    return v
  }

  function resize() {
    const el = canvas.value
    if (!el) return
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    width = el.clientWidth
    height = el.clientHeight
    el.width = width * dpr
    el.height = height * dpr
    el.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0)
    cols = Math.ceil(width / cell) + 1
    rows = Math.ceil(height / cell) + 1
    field = new Float32Array(cols * rows)
  }

  function draw(time: number) {
    const el = canvas.value
    const ctx = el?.getContext('2d')
    if (!el || !ctx || !cols) return

    const t = reducedMotion ? 1.3 : time * speed
    const scale = 1 / Math.max(height, 1)

    const target = pointer.value
    peak.x += (target.x - peak.x) * 0.06
    peak.y += (target.y - peak.y) * 0.06
    peak.strength += ((target.active ? 0.9 : 0) - peak.strength) * 0.04

    let min = Infinity
    let max = -Infinity
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const v = height2d(i * cell * scale, j * cell * scale, t)
        field[j * cols + i] = v
        if (v < min) min = v
        if (v > max) max = v
      }
    }

    const styles = getComputedStyle(el)
    const minor = styles.getPropertyValue('--contour-minor').trim() || 'rgba(180,240,120,.18)'
    const major = styles.getPropertyValue('--contour-major').trim() || 'rgba(180,240,120,.5)'

    ctx.clearRect(0, 0, width, height)
    ctx.lineJoin = 'round'

    for (let l = 1; l < levels; l++) {
      const level = min + ((max - min) * l) / levels
      const isMajor = l % 5 === 0
      ctx.beginPath()
      for (let j = 0; j < rows - 1; j++) {
        for (let i = 0; i < cols - 1; i++) {
          const a = field[j * cols + i]
          const b = field[j * cols + i + 1]
          const c = field[(j + 1) * cols + i + 1]
          const d = field[(j + 1) * cols + i]
          const idx = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (d > level ? 1 : 0)
          const segs = SEGMENTS[idx]
          if (!segs.length) continue

          const x = i * cell
          const y = j * cell
          const edge = (e: number): [number, number] => {
            switch (e) {
              case 0: return [x + cell * ((level - a) / (b - a)), y]
              case 1: return [x + cell, y + cell * ((level - b) / (c - b))]
              case 2: return [x + cell * ((level - d) / (c - d)), y + cell]
              default: return [x, y + cell * ((level - a) / (d - a))]
            }
          }
          for (let s = 0; s < segs.length; s += 2) {
            const [x1, y1] = edge(segs[s])
            const [x2, y2] = edge(segs[s + 1])
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
          }
        }
      }
      ctx.strokeStyle = isMajor ? major : minor
      ctx.lineWidth = isMajor ? 1.4 : 0.8
      ctx.stroke()
    }

    if (!reducedMotion) frame = requestAnimationFrame(draw)
  }

  function onPointerMove(e: PointerEvent) {
    const el = canvas.value
    if (!el) return
    const rect = el.getBoundingClientRect()
    pointer.value = {
      x: (e.clientX - rect.left) / rect.height,
      y: (e.clientY - rect.top) / rect.height,
      active: e.clientY >= rect.top && e.clientY <= rect.bottom,
    }
  }

  function onPointerLeave() {
    pointer.value = { ...pointer.value, active: false }
  }

  function onResize() {
    resize()
    if (reducedMotion) draw(0)
  }

  onMounted(() => {
    resize()
    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onPointerMove)
    document.addEventListener('pointerleave', onPointerLeave)
    frame = requestAnimationFrame(draw)
  })

  onBeforeUnmount(() => {
    cancelAnimationFrame(frame)
    window.removeEventListener('resize', onResize)
    window.removeEventListener('pointermove', onPointerMove)
    document.removeEventListener('pointerleave', onPointerLeave)
  })

  return { pointer }
}
