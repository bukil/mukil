import { STORY_INDEX } from './story-chapters.js'

const clamp = (value, min, max) => Math.max(min, Math.min(max, value))
export const easeRange = (value, start, end) => {
  const t = clamp((value - start) / (end - start), 0, 1)
  return t * t * (3 - 2 * t)
}

// Monotone cubic interpolation keeps velocities continuous at chapter joins
// without overshooting opacity, scale, or the authored component offsets.
export function sampleStoryValue(chapters, key, position) {
  const last = chapters.length - 1
  const index = Math.min(Math.floor(clamp(position, 0, last)), last - 1)
  const t = clamp(position - index, 0, 1)
  const a = chapters[index][key]
  const b = chapters[index + 1][key]
  const delta = b - a
  const tangent = (left, right) =>
    left * right <= 0 ? 0 : (2 * left * right) / (left + right)
  const before = index === 0 ? delta : a - chapters[index - 1][key]
  const after = index + 1 === last ? delta : chapters[index + 2][key] - b
  const m0 = tangent(before, delta)
  const m1 = tangent(delta, after)
  return (
    (2 * t ** 3 - 3 * t ** 2 + 1) * a +
    (t ** 3 - 2 * t ** 2 + t) * m0 +
    (-2 * t ** 3 + 3 * t ** 2) * b +
    (t ** 3 - t ** 2) * m1
  )
}

export const sunProgressForChapter = chapter =>
  easeRange(
    chapter,
    STORY_INDEX.spacecraft + 0.04,
    STORY_INDEX.spacecraft + 0.72
  )

// Reversible glass during orbital travel and the two material transitions.
export function rainbowGlassForChapter(chapter, reducedMotion = false) {
  if (reducedMotion) return 0
  const pulse = (start, peak, release, end) =>
    easeRange(chapter, start, peak) * (1 - easeRange(chapter, release, end))
  return Math.max(
    flightForChapter(chapter).blend,
    pulse(STORY_INDEX.spacecraft + 0.2, STORY_INDEX.spacecraft + 0.5,
      STORY_INDEX.spacecraft + 0.68, STORY_INDEX.inside + 0.06),
    pulse(STORY_INDEX.assets + 0.12, STORY_INDEX.assets + 0.38,
      STORY_INDEX.assets + 0.55, STORY_INDEX.development + 0.02)
  )
}

// Reserve half the experience scroll for the detailed orthographic assembly.
// The output remains the four-mode coordinate used by scene and narration.
export function experienceProgressForScroll(fraction) {
  const stops = [0, 0.18, 0.36, 0.86, 1]
  const t = clamp(fraction, 0, 1)
  const mode = Math.min(3, stops.findIndex((end, i) => i > 0 && t <= end) - 1)
  return (mode + (t - stops[mode]) / (stops[mode + 1] - stops[mode])) / 4
}

// Carry the experience state across its chapter boundary instead of switching
// rendering branches at the context chapter. The same envelope reverses with scrolling.
export function experienceBlendForChapter(chapter, reducedMotion = false) {
  const start = STORY_INDEX.prototype
  const end = STORY_INDEX.usage
  if (reducedMotion) return chapter >= start && chapter < end ? 1 : 0
  return (
    easeRange(chapter, start, start + 0.16) *
    (1 - easeRange(chapter, end - 0.14, end + 0.35))
  )
}

export function flightForChapter(chapter, reducedMotion = false) {
  const t = chapter - STORY_INDEX.flight
  const blend = easeRange(t, 0, 0.12) * (1 - easeRange(t, 0.78, 1))
  const speed = reducedMotion
    ? 0
    : blend *
      (0.62 + 0.38 * easeRange(t, 0.1, 0.52)) *
      (1 - easeRange(t, 0.58, 0.96))
  return {
    blend,
    speed,
    stretch: speed * (0.35 + 0.65 * easeRange(t, 0.1, 0.55))
  }
}
