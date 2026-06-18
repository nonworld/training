// Renders the shareable certification card to a canvas. Deliberately designed as
// a distribution asset: NON branding, learner name, badge and date, sized for
// social. Two formats: square (1080x1080, Instagram) and landscape (1200x627,
// LinkedIn link card). Asset-free, drawn from the wordmark paths and Helvetica.
import { drawWordmark } from './wordmark.js'

export const FORMATS = {
  square: { w: 1080, h: 1080 },
  landscape: { w: 1200, h: 627 },
}

export function renderCard(canvas, { name, badgeTitle, date, format = 'square' }) {
  const { w, h } = FORMATS[format] || FORMATS.square
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')
  const cx = w / 2

  // Near-black ground with a soft top glow.
  ctx.fillStyle = '#0b0b0b'
  ctx.fillRect(0, 0, w, h)
  const glow = ctx.createRadialGradient(cx, h * 0.1, 0, cx, h * 0.1, h * 0.7)
  glow.addColorStop(0, 'rgba(255,255,255,0.06)')
  glow.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = glow
  ctx.fillRect(0, 0, w, h)

  // Hairline frame.
  ctx.strokeStyle = 'rgba(255,255,255,0.16)'
  ctx.lineWidth = 2
  const m = Math.round(w * 0.045)
  ctx.strokeRect(m, m, w - m * 2, h - m * 2)

  const font = (size, weight = 400) =>
    `${weight} ${size}px "Helvetica Neue", Helvetica, Arial, sans-serif`
  ctx.textAlign = 'center'

  // Wordmark.
  const markW = w * (format === 'square' ? 0.34 : 0.22)
  const markH = drawWordmark(ctx, cx - markW / 2, h * (format === 'square' ? 0.16 : 0.16), markW)

  let y = h * (format === 'square' ? 0.16 : 0.16) + markH + (format === 'square' ? 90 : 56)

  // Eyebrow.
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.font = font(format === 'square' ? 24 : 20, 400)
  ctx.fillText('THIS CERTIFIES THAT', cx, y)

  // Name.
  y += format === 'square' ? 96 : 70
  ctx.fillStyle = '#ffffff'
  ctx.font = font(format === 'square' ? 76 : 56, 700)
  ctx.fillText(name || 'Your name', cx, y)

  // Badge title.
  y += format === 'square' ? 90 : 64
  ctx.fillStyle = 'rgba(255,255,255,0.85)'
  ctx.font = font(format === 'square' ? 38 : 30, 400)
  ctx.fillText(badgeTitle, cx, y)

  // Date footer.
  ctx.fillStyle = 'rgba(255,255,255,0.5)'
  ctx.font = font(format === 'square' ? 24 : 20, 400)
  ctx.fillText(`Certified ${date}  ·  NON Academy`, cx, h - m - (format === 'square' ? 40 : 30))
}

export function toBlob(canvas) {
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/png', 0.95))
}
