// Match the canvas and HDR buffers; cap total pixels for larger phone/tablet screens.
export function renderQuality(width, height, deviceRatio = 1) {
  const mobile = width < 760 || (height < 600 && width < 1200)
  const pixelRatio = Math.min(
    Math.max(1, deviceRatio),
    mobile ? 2 : 1.75,
    Math.sqrt(2600000 / Math.max(1, width * height))
  )
  return { pixelRatio }
}
