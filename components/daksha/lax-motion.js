// Lax shares the page's Lenis/GSAP clock. It does not create a second RAF loop
// or take ownership of window.onresize, so route changes can clean it up fully.
export async function createLaxMotion(root, readScroll) {
  const { default: lax } = await import('lax.js')
  const engine = new lax.constructor()
  engine.addDriver('dakshaScroll', readScroll)
  const originals = new Map()
  const ranges = new WeakMap()
  let frame = 0
  let previous = NaN
  const remember = element => {
    if (!originals.has(element))
      originals.set(element, element.getAttribute('style'))
  }
  const restore = () =>
    originals.forEach((style, element) => {
      if (style === null) element.removeAttribute('style')
      else element.setAttribute('style', style)
    })
  const add = (element, bindings) => {
    remember(element)
    engine.addElement(element, { dakshaScroll: bindings })
    const points = Object.values(bindings).flatMap(binding => binding[0])
    ranges.set(engine.elements[engine.elements.length - 1], {
      start: Math.min(...points),
      end: Math.max(...points),
      zone: null
    })
  }
  const update = () => {
    const scroll = readScroll()
    if (Math.abs(scroll - previous) < 0.05) return
    previous = scroll
    const values = { dakshaScroll: engine.drivers[0].getValue(frame) }
    engine.elements.forEach(element => {
      const range = ranges.get(element)
      const zone = scroll < range.start ? -1 : scroll > range.end ? 1 : 0
      if (zone && zone === range.zone) return
      element.update(values, frame)
      range.zone = zone
    })
    frame++
  }
  const measure = () => {
    restore()
    engine.elements = []
    engine.windowWidth = window.innerWidth
    engine.windowHeight = window.innerHeight
    const height = window.innerHeight
    const scroll = window.scrollY
    root
      .querySelectorAll('[data-story-copy], [data-case-reveal]')
      .forEach((group, index) => {
        const top = group.getBoundingClientRect().top + scroll
        if (group.closest('#overview')) {
          add(group, {
            translateY: [
              [0, height],
              [0, -height * 0.14]
            ],
            opacity: [
              [0, height * 0.4, height],
              [1, 1, 0]
            ],
            scale: [
              [0, height],
              [1, 0.96]
            ]
          })
          return
        }
        const start = top - height * 0.92
        const end = top - height * 0.48
        const words = group.querySelectorAll('[data-reveal-word]')
        words.forEach((word, i) => {
          const delay = Math.min(i * 13, 105)
          const range = [start + delay, end + delay]
          add(word, {
            translateY: [range, [44, 0], { easing: 'easeOutCubic' }],
            translateX: [range, [index % 2 ? -12 : 12, 0]],
            rotateX: [range, [index % 3 === 0 ? -38 : 24, 0]],
            opacity: [range, [0, 1]]
          })
        })
        if (words.length) {
          group
            .querySelectorAll('p, a, [data-breakdown-label]')
            .forEach((detail, i) => {
              const range = [start + 45 + i * 12, end + 45 + i * 12]
              add(detail, {
                translateY: [range, [20, 0]],
                opacity: [range, [0, 1]]
              })
            })
        } else {
          add(group, {
            translateY: [[start, end], [32, 0], { easing: 'easeOutCubic' }],
            scale: [
              [start, end],
              [0.965, 1]
            ],
            opacity: [
              [start, end],
              [0.15, 1]
            ]
          })
        }
      })
    previous = NaN
    update()
  }
  measure()
  return {
    update,
    measure,
    destroy() {
      restore()
      engine.elements = []
      engine.removeDriver('dakshaScroll')
    }
  }
}
