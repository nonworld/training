// Lightweight, dependency-free confetti on a canvas. Restrained palette to stay
// gallery-not-carnival: white and off-whites with a single warm accent. Returns
// a stop() function. Respects prefers-reduced-motion by falling back to a brief,
// still shimmer instead of motion.
// Dark and warm tones so the confetti reads on the light celebration ground.
const COLOURS = ['#0b0b0b', '#4a4a4a', '#b9a07a', '#8a6d3b']

export function burst(canvas, { count = 140, duration = 2600 } = {}) {
  const ctx = canvas.getContext('2d')
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches

  const resize = () => {
    canvas.width = canvas.clientWidth * dpr
    canvas.height = canvas.clientHeight * dpr
  }
  resize()

  const W = () => canvas.width
  const H = () => canvas.height
  const rand = (a, b) => a + Math.random() * (b - a)

  const parts = Array.from({ length: count }, () => ({
    x: rand(0, W()),
    y: rand(-H() * 0.3, 0),
    r: rand(3, 8) * dpr,
    vx: rand(-0.4, 0.4) * dpr,
    vy: rand(1.6, 4.2) * dpr,
    rot: rand(0, Math.PI * 2),
    vr: rand(-0.12, 0.12),
    colour: COLOURS[(Math.random() * COLOURS.length) | 0],
    shape: Math.random() > 0.5 ? 'rect' : 'circ',
  }))

  let raf = 0
  const start = performance.now()

  const frame = (now) => {
    const elapsed = now - start
    ctx.clearRect(0, 0, W(), H())
    const fade = reduce ? 1 : Math.max(0, 1 - elapsed / duration)
    for (const p of parts) {
      if (!reduce) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.02 * dpr
        p.rot += p.vr
      }
      ctx.globalAlpha = fade
      ctx.fillStyle = p.colour
      ctx.save()
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      if (p.shape === 'rect') ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 0.6)
      else {
        ctx.beginPath()
        ctx.arc(0, 0, p.r / 2, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }
    ctx.globalAlpha = 1
    if (elapsed < duration) raf = requestAnimationFrame(frame)
    else ctx.clearRect(0, 0, W(), H())
  }
  raf = requestAnimationFrame(frame)

  return () => cancelAnimationFrame(raf)
}
