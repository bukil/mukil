// A half orbit takes the sun from behind the intact spacecraft to its front.
// The caller supplies vectors so scrolling does not allocate scene objects.
export function setSunPosition(position, progress, center) {
  const t = Math.max(0, Math.min(1, progress))
  const angle = Math.PI * t
  return position.set(
    center.x + 0.85 * (1 - t) - 5 * t + Math.sin(angle) * 13,
    center.y + 2.2 * (1 - t) + 6 * t,
    center.z - Math.cos(angle) * 13
  )
}
