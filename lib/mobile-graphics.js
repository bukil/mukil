export function prefersLightweightGraphics() {
  return navigator.deviceMemory <= 4 || navigator.hardwareConcurrency <= 4 ||
    window.matchMedia('(max-width: 767px), (pointer: coarse)').matches
}

let acceleratedWebGL
export function hasAcceleratedWebGL() {
  if (acceleratedWebGL === undefined) {
    try {
      const context = document.createElement('canvas').getContext('webgl2', {
        failIfMajorPerformanceCaveat: true
      })
      acceleratedWebGL = Boolean(context)
      context?.getExtension('WEBGL_lose_context')?.loseContext()
    } catch {
      acceleratedWebGL = false
    }
  }
  return acceleratedWebGL
}
