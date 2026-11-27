import { Laptop } from '@lucasmarkes/hairline/react'
import { useId, useLayoutEffect, useRef } from 'react'
import styles from '../styles/Usbee.module.css'

const svgNamespace = 'http://www.w3.org/2000/svg'

function svgNode(name, attributes) {
  const element = document.createElementNS(svgNamespace, name)
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
  return element
}

export default function UsbeeLaptop() {
  const root = useRef(null)
  const id = useId()

  useLayoutEffect(() => {
    const svg = root.current.querySelector('svg')
    // Hairline draws the display, menu bar and dock as projected paths in this group.
    const screen = svg?.querySelector('circle.dot')?.parentElement
    if (!screen) return

    const [display, bar, dock, appWindow, divider] = screen.children
    if (bar?.localName !== 'path' || dock?.localName !== 'path' || !divider) return
    const screenGradient = `usbee-screen-${id}`
    const metalGradient = `usbee-metal-${id}`
    const defs = svgNode('defs', {})
    const gradient = svgNode('linearGradient', { id: screenGradient, x2: '100%', y2: '100%' })
    gradient.append(
      svgNode('stop', { offset: '0%', 'stop-color': '#294f92' }),
      svgNode('stop', { offset: '45%', 'stop-color': '#142e61' }),
      svgNode('stop', { offset: '100%', 'stop-color': '#080f26' })
    )
    const metal = svgNode('linearGradient', {
      id: metalGradient,
      x1: '0%',
      y1: '22%',
      x2: '100%',
      y2: '78%',
    })
    metal.append(
      svgNode('stop', { offset: '0%', 'stop-color': '#15263e' }),
      svgNode('stop', { offset: '28%', 'stop-color': '#476788' }),
      svgNode('stop', { offset: '45%', 'stop-color': '#aec8df' }),
      svgNode('stop', { offset: '57%', 'stop-color': '#708eac' }),
      svgNode('stop', { offset: '77%', 'stop-color': '#365272' }),
      svgNode('stop', { offset: '100%', 'stop-color': '#172940' })
    )
    defs.append(gradient, metal)
    svg.prepend(defs)

    svg.style.setProperty('--hl-plate', `url(#${metalGradient}) var(--hairline-plate)`)
    display.style.fill = `url(#${screenGradient})`
    const hidden = [appWindow, divider, ...screen.querySelectorAll('circle:not(:first-of-type)')]
    hidden.forEach(element => { element.style.display = 'none' })

    const mark = svgNode('g', { 'data-usbee-screen-logo': '' })
    mark.append(svgNode('image', {
      href: '/images/usbee/logo.svg',
      x: -0.5,
      y: -0.5,
      width: 1,
      height: 1,
    }))
    screen.append(mark)

    const placeLogo = () => {
      const left = bar.getPointAtLength(0)
      const right = bar.getPointAtLength(bar.getTotalLength())
      const topX = (left.x + right.x) / 2
      const topY = (left.y + right.y) / 2
      const bottom = dock.getBBox()
      const dx = bottom.x + bottom.width / 2 - topX
      const dy = bottom.y + bottom.height / 2 - topY
      mark.setAttribute('transform', `matrix(${(right.x - left.x) * 0.37} ${(right.y - left.y) * 0.37} ${dx * 0.54} ${dy * 0.54} ${topX + dx * 0.52} ${topY + dy * 0.52})`)
    }

    placeLogo()
    const observer = new MutationObserver(placeLogo)
    observer.observe(bar, { attributes: true, attributeFilter: ['d'] })

    return () => {
      observer.disconnect()
      mark.remove()
      defs.remove()
      svg.style.removeProperty('--hl-plate')
      display.style.removeProperty('fill')
      hidden.forEach(element => element.style.removeProperty('display'))
    }
  }, [id])

  return <Laptop ref={root} className={styles.panelLaptop} theme="light" intensity={0.45} />
}
