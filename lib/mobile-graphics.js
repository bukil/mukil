export function prefersLightweightGraphics() {
  return window.matchMedia('(max-width: 767px), (pointer: coarse)').matches
}
