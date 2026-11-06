import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

export const BATTERY_PART = 'Battery packs'
// Four larger packs in a single vertical rack inside the lower bus.
// Spacing includes the complete imported casing and terminals.
export const BATTERY_LAYOUT = {
  length: 0.86,
  levels: [-1.33, -1.14, -0.95, -0.76],
  travel: 0.035,
  appear: 0.6,
  delay: 0.61,
  stagger: 0.025
}

export function createBatteryBank(source) {
  source.updateMatrixWorld(true)
  const bounds = new THREE.Box3().setFromObject(source)
  const center = bounds.getCenter(new THREE.Vector3())
  const size = bounds.getSize(new THREE.Vector3())
  const scale = BATTERY_LAYOUT.length / Math.max(size.x, size.y, size.z)
  const bank = new THREE.Group()
  bank.name = BATTERY_PART
  bank.userData.part = BATTERY_PART
  bank.userData.packCount = BATTERY_LAYOUT.levels.length
  const buckets = new Map()
  for (const [packIndex, y] of BATTERY_LAYOUT.levels.entries()) {
    const transform = new THREE.Matrix4()
      .makeTranslation(0, y, 0)
      .multiply(new THREE.Matrix4().makeScale(scale, scale, scale))
      .multiply(
        new THREE.Matrix4().makeTranslation(-center.x, -center.y, -center.z)
      )
    source.traverse(node => {
      if (!node.isMesh) return
      const geometry = node.geometry.clone()
      // Meshopt uses quantized attributes; bake transforms into floating point
      // so translation cannot clamp a normalized integer position.
      for (const [name, attribute] of Object.entries(geometry.attributes)) {
        const values = new Float32Array(attribute.count * attribute.itemSize)
        for (let i = 0; i < attribute.count; i++)
          for (let j = 0; j < attribute.itemSize; j++)
            values[i * attribute.itemSize + j] = attribute.getComponent(i, j)
        geometry.setAttribute(
          name,
          new THREE.BufferAttribute(values, attribute.itemSize)
        )
      }
      geometry.applyMatrix4(
        new THREE.Matrix4().multiplyMatrices(transform, node.matrixWorld)
      )
      // Keep each complete battery rigid, including its terminals and labels.
      const count = geometry.attributes.position.count
      const offsets = new Float32Array(count * 3)
      const delays = new Float32Array(count).fill(
        BATTERY_LAYOUT.delay + packIndex * BATTERY_LAYOUT.stagger
      )
      for (let i = 0; i < count; i++)
        offsets[i * 3 + 1] = -BATTERY_LAYOUT.travel
      geometry.setAttribute(
        '_assembly_offset',
        new THREE.BufferAttribute(offsets, 3)
      )
      geometry.setAttribute(
        '_assembly_delay',
        new THREE.BufferAttribute(delays, 1)
      )
      if (!buckets.has(node.material)) buckets.set(node.material, [])
      buckets.get(node.material).push(geometry)
    })
  }
  buckets.forEach((geometries, material) => {
    const merged = mergeGeometries(geometries, false)
    geometries.forEach(geometry => geometry.dispose())
    bank.add(new THREE.Mesh(merged, material))
  })
  return bank
}
