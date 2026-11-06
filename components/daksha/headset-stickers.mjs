import * as THREE from 'three'
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry.js'

// Project into the front casing in the original Quest3 GLB's Y-up coordinates.
// Different sizes and rotations give the vinyl decals a hand-applied layout.
export const HEADSET_STICKERS = [
  {
    file: 'IMXD Lab - Logo&Wordmark.svg',
    x: -0.012,
    y: -0.016,
    width: 0.066,
    aspect: 1200 / 180,
    angle: -7
  },
  {
    file: 'IMXD Lab sticker.svg',
    x: -0.009,
    y: -0.035,
    width: 0.054,
    aspect: 850 / 180,
    angle: 8
  },
  {
    file: 'sticker.svg',
    x: -0.052,
    y: -0.039,
    width: 0.026,
    aspect: 142 / 136,
    angle: -14
  },
  {
    file: 'sticker1.svg',
    x: 0.043,
    y: -0.026,
    width: 0.024,
    aspect: 1,
    angle: 16
  },
  {
    file: 'sticker1.svg',
    location: 'right arm',
    position: [-0.094, -0.004, -0.055],
    rotation: [0, -Math.PI / 2, 0],
    normal: [-1, 0, 0],
    width: 0.021,
    aspect: 1,
    depth: 0.014,
    angle: 0
  }
]

export function projectHeadsetSticker(mesh, sticker) {
  const rotation = sticker.rotation
    ? new THREE.Euler(...sticker.rotation)
    : new THREE.Euler(0, 0, THREE.MathUtils.degToRad(sticker.angle))
  const outward = new THREE.Vector3(...(sticker.normal || [0, 0, 1]))
  const geometry = new DecalGeometry(
    mesh,
    new THREE.Vector3(...(sticker.position || [sticker.x, sticker.y, 0.117])),
    rotation,
    new THREE.Vector3(
      sticker.width,
      sticker.width / sticker.aspect,
      sticker.depth || 0.052
    )
  )
  // Tessellate the projected shell before lifting a convex resin coating.
  // The thin edges stay attached; the centre rises half a millimetre.
  const p = geometry.attributes.position
  const n = geometry.attributes.normal
  const uv = geometry.attributes.uv
  const positions = [],
    normals = [],
    uvs = []
  const tangentU = new THREE.Vector3(1, 0, 0).applyEuler(rotation)
  const tangentV = new THREE.Vector3(0, 1, 0).applyEuler(rotation)
  const midpoint = (a, b) => ({
    p: a.p.clone().lerp(b.p, 0.5),
    n: a.n.clone().lerp(b.n, 0.5).normalize(),
    uv: a.uv.clone().lerp(b.uv, 0.5)
  })
  const emit = vertex => {
    const u = THREE.MathUtils.clamp(vertex.uv.x, 0, 1)
    const v = THREE.MathUtils.clamp(vertex.uv.y, 0, 1)
    const height = 0.00055
    const dome = Math.sin(Math.PI * u) * Math.sin(Math.PI * v)
    const position = vertex.p
      .clone()
      .addScaledVector(vertex.n, 0.00012 + height * dome)
    const normal = vertex.n
      .clone()
      .addScaledVector(
        tangentU,
        (-height * Math.PI * Math.cos(Math.PI * u) * Math.sin(Math.PI * v)) /
          sticker.width
      )
      .addScaledVector(
        tangentV,
        (-height * Math.PI * Math.sin(Math.PI * u) * Math.cos(Math.PI * v)) /
          (sticker.width / sticker.aspect)
      )
      .normalize()
    positions.push(...position.toArray())
    normals.push(...normal.toArray())
    uvs.push(...vertex.uv.toArray())
  }
  const subdivide = (a, b, c, depth = 0) => {
    const longest = Math.max(
      a.uv.distanceTo(b.uv),
      b.uv.distanceTo(c.uv),
      c.uv.distanceTo(a.uv)
    )
    if (longest < 0.1 || depth === 5) {
      ;[a, b, c].forEach(emit)
      return
    }
    const ab = midpoint(a, b),
      bc = midpoint(b, c),
      ca = midpoint(c, a)
    subdivide(a, ab, ca, depth + 1)
    subdivide(ab, b, bc, depth + 1)
    subdivide(ca, bc, c, depth + 1)
    subdivide(ab, bc, ca, depth + 1)
  }
  for (let i = 0; i < p.count; i += 3) {
    if (
      [0, 1, 2].reduce(
        (sum, j) =>
          sum + new THREE.Vector3().fromBufferAttribute(n, i + j).dot(outward),
        0
      ) /
        3 <
      0.35
    )
      continue
    const vertices = [0, 1, 2].map(offset => ({
      p: new THREE.Vector3().fromBufferAttribute(p, i + offset),
      n: new THREE.Vector3().fromBufferAttribute(n, i + offset),
      uv: new THREE.Vector2().fromBufferAttribute(uv, i + offset)
    }))
    subdivide(...vertices)
  }
  geometry.dispose()
  const projected = new THREE.BufferGeometry()
  projected.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(positions, 3)
  )
  projected.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3))
  projected.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2))
  return projected
}

export async function attachHeadsetStickers(source, manager) {
  source.updateMatrixWorld(true)
  let shell
  source.traverse(node => {
    if (node.isMesh && !shell) shell = node
  })
  const loader = new THREE.TextureLoader(manager)
  const assets = await Promise.allSettled(
    HEADSET_STICKERS.map(sticker =>
      loader.loadAsync(`/sticker/${encodeURIComponent(sticker.file)}`)
    )
  )
  if (assets.some(asset => asset.status === 'rejected')) {
    assets.forEach(asset => {
      if (asset.status === 'fulfilled') asset.value.dispose()
    })
    throw new Error('Unable to load headset stickers')
  }
  HEADSET_STICKERS.forEach((sticker, index) => {
    const texture = assets[index].value
    texture.colorSpace = THREE.SRGBColorSpace
    texture.anisotropy = 4
    const material = new THREE.MeshPhysicalMaterial({
      map: texture,
      roughness: 0.075,
      clearcoat: 1,
      clearcoatRoughness: 0.025,
      ior: 1.5,
      specularIntensity: 1,
      envMapIntensity: 2.5,
      metalness: 0,
      transparent: true,
      alphaTest: 0.025,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2
    })
    const decal = new THREE.Mesh(
      projectHeadsetSticker(shell, sticker),
      material
    )
    decal.name = `Headset sticker: ${sticker.location || sticker.file}`
    decal.renderOrder = 2
    decal.layers.enable(1)
    source.add(decal)
  })
}
