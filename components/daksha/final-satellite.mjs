import * as THREE from 'three'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js'

export const SOLAR_PART = 'Solar arrays'
const ORDER = [
  'Spacecraft bus',
  'Side detectors',
  'Upper frame',
  'Detector electronics',
  'Detector housings',
  'Sensors',
  'Crown'
]
const solarName = name => /^Solar[ _]/i.test(name)
const partFor = name => {
  if (name.startsWith('Dome\\Cap')) return 'Crown'
  if (name.startsWith('Dome\\Ring')) return 'Upper frame'
  if (/ME_PCB|PCB|IRDCDC|IRDCFILTER/i.test(name)) return 'Detector electronics'
  if (/MEBox|LEbox/i.test(name)) return 'Detector housings'
  if (name.startsWith('DakshaHE')) return 'Side detectors'
  if (/sensor|NaI_holder/i.test(name)) return 'Sensors'
  return 'Spacecraft bus'
}
const meshBounds = node => {
  node.geometry.computeBoundingBox()
  return node.geometry.boundingBox.clone().applyMatrix4(node.matrixWorld)
}

// Bake CAD transforms once, retaining every authored UV channel and material.
function bakeGeometry(node, transform, offset, delay) {
  const geometry = node.geometry.clone()
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
  geometry.applyMatrix4(transform)
  if (!geometry.index)
    geometry.setIndex(
      Array.from({ length: geometry.attributes.position.count }, (_, i) => i)
    )
  const count = geometry.attributes.position.count
  const offsets = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) offsets.set(offset, i * 3)
  geometry.setAttribute(
    '_assembly_offset',
    new THREE.BufferAttribute(offsets, 3)
  )
  geometry.setAttribute(
    '_assembly_delay',
    new THREE.BufferAttribute(new Float32Array(count).fill(delay), 1)
  )
  return geometry
}
function mergeInto(parent, entries) {
  const buckets = new Map()
  for (const entry of entries) {
    const layout = Object.entries(entry.geometry.attributes)
      .map(([key, value]) => `${key}:${value.itemSize}`)
      .sort()
      .join(',')
    const key = `${entry.material.uuid}:${layout}`
    if (!buckets.has(key))
      buckets.set(key, { material: entry.material, geometries: [] })
    buckets.get(key).geometries.push(entry.geometry)
  }
  for (const { material, geometries } of buckets.values()) {
    const merged = mergeGeometries(geometries, false)
    if (!merged) throw new Error('Unable to prepare final satellite geometry')
    geometries.forEach(geometry => geometry.dispose())
    const mesh = new THREE.Mesh(merged, material)
    mesh.name = `${parent.name}: ${material.name}`
    parent.add(mesh)
  }
}

export function prepareFinalSatellite(source) {
  source.updateMatrixWorld(true)
  const meshes = []
  const bodyBounds = new THREE.Box3()
  source.traverse(node => {
    if (!node.isMesh) return
    meshes.push(node)
    if (!solarName(node.name)) bodyBounds.union(meshBounds(node))
  })
  if (bodyBounds.isEmpty()) throw new Error('Satellite body is missing')
  const center = bodyBounds.getCenter(new THREE.Vector3())
  const scale = 3.2 / bodyBounds.getSize(new THREE.Vector3()).y
  const normalize = new THREE.Matrix4()
    .makeRotationY(Math.PI / 2)
    .multiply(new THREE.Matrix4().makeScale(scale, scale, scale))
    .multiply(
      new THREE.Matrix4().makeTranslation(-center.x, -center.y, -center.z)
    )
  const model = new THREE.Group()
  model.name = 'Daksha / Mukifd'
  model.userData.authoredMaterials = true
  model.userData.source = '/Mukifd.glb'
  const groups = new Map()
  const bodyEntries = new Map()
  for (const part of ORDER) {
    const group = new THREE.Group()
    group.name = part
    group.userData.part = part
    groups.set(part, group)
    bodyEntries.set(part, [])
    model.add(group)
  }
  let component = 0
  for (const node of meshes.filter(node => !solarName(node.name))) {
    const part = partFor(node.name),
      order = ORDER.indexOf(part)
    const offset = [0, 0, 0]
    const direction = component % 6
    offset[Math.floor(direction / 2)] =
      (direction % 2 ? -1 : 1) * (1.35 + (component % 4) * 0.15)
    const delay = order * 0.075 + (component % 11) * 0.004
    const geometry = bakeGeometry(
      node,
      new THREE.Matrix4().multiplyMatrices(normalize, node.matrixWorld),
      offset,
      delay
    )
    bodyEntries.get(part).push({ geometry, material: node.material })
    component++
  }
  for (const [part, entries] of bodyEntries)
    mergeInto(groups.get(part), entries)

  const arrays = new THREE.Group()
  arrays.name = SOLAR_PART
  arrays.userData.part = SOLAR_PART
  model.add(arrays)
  const hinges = []
  const solarMeshes = meshes.filter(node => solarName(node.name))
  for (const side of [-1, 1]) {
    const wing = solarMeshes.filter(
      node => meshBounds(node).getCenter(new THREE.Vector3()).z * side > 0
    )
    if (!wing.length) throw new Error('Both solar wings are required')
    const wingBounds = new THREE.Box3()
    const rowCenters = []
    for (const node of wing) {
      const bounds = meshBounds(node)
      wingBounds.union(bounds)
      if (node.material.name === 'Solar PANEL')
        rowCenters.push(bounds.getCenter(new THREE.Vector3()).z)
    }
    const rows = rowCenters
      .sort((a, b) => a - b)
      .filter((value, i, all) => i === 0 || value - all[i - 1] > 0.05)
    if (rows.length !== 4)
      throw new Error('Expected four rows in each solar wing')
    // Use the actual row seam, rather than cutting the edge of a textured cell.
    const seam = (rows[1] + rows[2]) / 2
    const pivot = new THREE.Vector3(
      wingBounds.getCenter(new THREE.Vector3()).x,
      wingBounds.max.y + 0.08,
      seam
    ).applyMatrix4(normalize)
    const inner = new THREE.Group(),
      outer = new THREE.Group()
    inner.name = `${side > 0 ? 'Right' : 'Left'} solar / inner half`
    outer.name = `${side > 0 ? 'Right' : 'Left'} solar / outer hinge`
    outer.position.copy(pivot)
    arrays.add(inner, outer)
    const innerEntries = [],
      outerEntries = []
    for (const node of wing) {
      const bounds = meshBounds(node),
        outerHalf = (bounds.getCenter(new THREE.Vector3()).z - seam) * side > 0
      const transform = new THREE.Matrix4().multiplyMatrices(
        normalize,
        node.matrixWorld
      )
      if (outerHalf)
        transform.premultiply(
          new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z)
        )
      const geometry = bakeGeometry(node, transform, [0, 0, 0], 0.85)
      ;(outerHalf ? outerEntries : innerEntries).push({
        geometry,
        material: node.material
      })
    }
    mergeInto(inner, innerEntries)
    mergeInto(outer, outerEntries)
    hinges.push({
      group: outer,
      side,
      pivot: pivot.clone(),
      rows,
      inner,
      outer
    })
  }
  const sourceGeometries = new Set(meshes.map(node => node.geometry))
  sourceGeometries.forEach(geometry => geometry.dispose())
  const update = deployment => {
    const progress = THREE.MathUtils.clamp(deployment, 0, 1)
    for (const hinge of hinges)
      hinge.group.rotation.z = hinge.side * Math.PI * (1 - progress)
    model.userData.solarDeployment = progress
  }
  update(1)
  model.updateMatrixWorld(true)
  const deployedBounds = new THREE.Box3().setFromObject(model)
  model.userData.deployedWidth = deployedBounds.getSize(new THREE.Vector3()).x
  return {
    model,
    arrays,
    hinges,
    update,
    sourceMeshes: meshes.length,
    bodyBounds,
    normalize
  }
}
