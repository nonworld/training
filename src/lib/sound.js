// Synthesised UI sound via the Web Audio API. No audio files to ship or cache.
// Every call is a no-op when muted. Kept restrained to match the brand: soft
// sine tones, short, never a jingle.
let ctx = null
function audio() {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (!AC) return null
    ctx = new AC()
  }
  if (ctx.state === 'suspended') ctx.resume().catch(() => {})
  return ctx
}

function tone(freq, start, dur, peak = 0.12) {
  const ac = audio()
  if (!ac) return
  const t0 = ac.currentTime + start
  const osc = ac.createOscillator()
  const gain = ac.createGain()
  osc.type = 'sine'
  osc.frequency.value = freq
  gain.gain.setValueAtTime(0, t0)
  gain.gain.linearRampToValueAtTime(peak, t0 + 0.012)
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(gain).connect(ac.destination)
  osc.start(t0)
  osc.stop(t0 + dur + 0.02)
}

// A quick tick for a correct answer.
export function playTick(muted) {
  if (muted) return
  tone(880, 0, 0.12, 0.08)
}

// A short, warm rising chord for a module/cert completion.
export function playFanfare(muted) {
  if (muted) return
  tone(523.25, 0, 0.5, 0.1) // C5
  tone(659.25, 0.08, 0.5, 0.09) // E5
  tone(783.99, 0.16, 0.6, 0.09) // G5
}
