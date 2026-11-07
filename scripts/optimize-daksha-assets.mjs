// Run: node scripts/optimize-daksha-assets.mjs
// Keep the artist's GLBs intact; generate smaller, content-addressed web copies.
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createHash } from 'node:crypto'
import assert from 'node:assert/strict'
import sharp from 'sharp'
import { MeshoptEncoder, MeshoptDecoder } from 'meshoptimizer'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'
import { prepareFinalSatellite } from '../components/daksha/final-satellite.mjs'
import {
  prepareAssemblyGeometry,
  prepareAssemblyEdges
} from '../components/daksha/assembly-geometry.mjs'

globalThis.FileReader = class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then(value => {
      this.result = value
      this.onloadend?.()
    })
  }
}
function unpack(bytes) {
  const size = bytes.readUInt32LE(12)
  return {
    doc: JSON.parse(bytes.subarray(20, 20 + size)),
    binary: bytes.subarray(28 + size)
  }
}
function pack(doc, binary) {
  const json = Buffer.from(JSON.stringify(doc))
  const jp = Buffer.alloc((4 - (json.length % 4)) % 4, 32)
  const bp = Buffer.alloc((4 - (binary.length % 4)) % 4)
  const header = Buffer.alloc(20),
    chunk = Buffer.alloc(8)
  header.writeUInt32LE(0x46546c67)
  header.writeUInt32LE(2, 4)
  header.writeUInt32LE(
    28 + json.length + jp.length + binary.length + bp.length,
    8
  )
  header.writeUInt32LE(json.length + jp.length, 12)
  header.writeUInt32LE(0x4e4f534a, 16)
  chunk.writeUInt32LE(binary.length + bp.length)
  chunk.writeUInt32LE(0x004e4942, 4)
  return Buffer.concat([header, json, jp, chunk, binary, bp])
}
async function prepareSatellite(bytes) {
  const original = unpack(bytes)
  const stripped = structuredClone(original.doc)
  const removeTextures = value => {
    if (!value || typeof value !== 'object') return
    for (const key of Object.keys(value)) {
      if (key.endsWith('Texture')) delete value[key]
      else removeTextures(value[key])
    }
  }
  removeTextures(stripped.materials)
  delete stripped.images
  delete stripped.textures
  const geometryOnly = pack(stripped, original.binary)
  const gltf = await new GLTFLoader()
    .setMeshoptDecoder(MeshoptDecoder)
    .parseAsync(
      geometryOnly.buffer.slice(
        geometryOnly.byteOffset,
        geometryOnly.byteOffset + geometryOnly.length
      ),
      ''
    )
  gltf.scene.traverse(node => {
    if (node.isMesh)
      node.material.userData.sourceMaterialIndex = gltf.parser.associations.get(
        node.material
      ).materials
  })
  const rig = prepareFinalSatellite(gltf.scene)
  const model = rig.model
  const paths = []
  let pieces = 0
  model.updateMatrixWorld(true)
  for (const hinge of rig.hinges) {
    hinge.group.userData.solarHingeSide = hinge.side
    hinge.inner.userData.solarInnerSide = hinge.side
  }
  model.userData.sourceMeshes = rig.sourceMeshes
  const lineMaterial = new THREE.MeshBasicMaterial({ color: 0x367bb0 })
  for (const root of model.children) {
    const nodes = []
    root.traverse(node => {
      if (node.isMesh) nodes.push(node)
    })
    const addOutline = (geometry, parent) => {
      const outline = new THREE.LineSegments(geometry, lineMaterial)
      outline.userData.precomputedOutline = true
      parent.add(outline)
    }
    for (const node of nodes) {
      const plan = prepareAssemblyGeometry(node.geometry, 0, pieces)
      pieces += plan.pieces.length
      const transform = node.matrixWorld
      for (const piece of plan.pieces
        .filter(p => p.vertices.length >= 48)
        .slice(0, 18)) {
        paths.push({
          center: piece.center.clone().applyMatrix4(transform).toArray(),
          offset: piece.offset
            .clone()
            .applyMatrix3(new THREE.Matrix3().setFromMatrix4(transform))
            .toArray(),
          delay: piece.delay,
          count: piece.vertices.length
        })
      }
      const edges = new THREE.EdgesGeometry(node.geometry, 28)
      prepareAssemblyEdges(edges, plan, transform)
      const key = (p, o, d, i) =>
        `${[p.getX(i), p.getY(i), p.getZ(i), o.getX(i), o.getY(i), o.getZ(i)]
          .map(value => Math.round(value * 100000))
          .join(',')}:${d.getX(i).toFixed(6)}`
      const positions = node.geometry.getAttribute('position')
      const offsets = node.geometry.getAttribute('_assembly_offset')
      const delays = node.geometry.getAttribute('_assembly_delay')
      const byVertex = new Map()
      for (let i = 0; i < positions.count; i++)
        byVertex.set(key(positions, offsets, delays, i), i)
      const ep = edges.getAttribute('position'),
        eo = edges.getAttribute('assemblyOffset'),
        ed = edges.getAttribute('assemblyDelay')
      const indices = new Uint32Array(ep.count)
      for (let i = 0; i < ep.count; i++) {
        const vertex = byVertex.get(key(ep, eo, ed, i))
        assert(
          vertex !== undefined,
          'Outline vertex must match its animated surface'
        )
        indices[i] = vertex
      }
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', positions)
      geometry.setAttribute('_assembly_offset', offsets)
      geometry.setAttribute('_assembly_delay', delays)
      geometry.setIndex(new THREE.BufferAttribute(indices, 1))
      node.geometry.deleteAttribute('assemblyOffset')
      node.geometry.deleteAttribute('assemblyDelay')
      addOutline(geometry, node.parent)
      edges.dispose()
    }
  }

  model.userData.optimizedSatellite = true
  model.userData.assemblyGuidePaths = paths
  model.userData.assemblyPieces = pieces
  const exported = unpack(
    Buffer.from(
      await new GLTFExporter().parseAsync(model, {
        binary: true,
        onlyVisible: false
      })
    )
  )
  const materials = structuredClone(original.doc.materials)
  const materialIndices = exported.doc.materials.map(material => {
    const index = material.extras?.sourceMaterialIndex
    if (index !== undefined) return index
    materials.push(material)
    return materials.length - 1
  })
  for (const mesh of exported.doc.meshes)
    for (const primitive of mesh.primitives) {
      primitive.material = materialIndices[primitive.material]
      for (const name of Object.keys(primitive.attributes)) {
        if (name.startsWith('__ASSEMBLY_')) {
          primitive.attributes[name.slice(1)] = primitive.attributes[name]
          delete primitive.attributes[name]
        }
      }
    }
  exported.doc.materials = materials
  const chunks = [exported.binary]
  let length = exported.binary.length
  exported.doc.images = original.doc.images.map(image => {
    const view = original.doc.bufferViews[image.bufferView]
    const padding = Buffer.alloc((4 - (length % 4)) % 4)
    chunks.push(padding)
    length += padding.length
    const index = exported.doc.bufferViews.length
    exported.doc.bufferViews.push({
      buffer: 0,
      byteOffset: length,
      byteLength: view.byteLength
    })
    const data = original.binary.subarray(
      view.byteOffset || 0,
      (view.byteOffset || 0) + view.byteLength
    )
    chunks.push(data)
    length += data.length
    return { ...image, bufferView: index }
  })
  exported.doc.textures = original.doc.textures
  exported.doc.samplers = original.doc.samplers
  exported.doc.extensionsUsed = [
    ...new Set([
      ...(exported.doc.extensionsUsed || []),
      ...(original.doc.extensionsUsed || [])
    ])
  ]
  exported.doc.extensionsRequired = original.doc.extensionsRequired || []
  exported.doc.buffers = [{ byteLength: length }]
  return pack(exported.doc, Buffer.concat(chunks))
}

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const destination = path.join(root, 'public/models/optimized')
await fs.mkdir(destination, { recursive: true })
await Promise.all([MeshoptEncoder.ready, MeshoptDecoder.ready])
const assets = [
  ['satellite', 'public/Mukifd.glb', 1024],
  ['headset', 'public/Quest3.glb', 1024],
  ['battery', 'public/models/electricalSystem_battery_d01.glb', 512]
]
const digest = bytes => createHash('sha256').update(bytes).digest('hex')
const inputBytes = new Map(
  await Promise.all(
    assets.map(async ([name, input]) => [
      name,
      await fs.readFile(path.join(root, input))
    ])
  )
)
const pipeline = await Promise.all(
  [
    'scripts/optimize-daksha-assets.mjs',
    'components/daksha/final-satellite.mjs',
    'components/daksha/assembly-geometry.mjs'
  ].map(file => fs.readFile(path.join(root, file)))
)
const inputs = {
  pipeline: digest(
    Buffer.concat([
      ...pipeline,
      Buffer.from(THREE.REVISION + sharp.versions.sharp)
    ])
  ),
  ...Object.fromEntries(
    [...inputBytes].map(([name, bytes]) => [name, digest(bytes)])
  )
}
try {
  const cached = await import('../components/daksha/scene-assets.mjs')
  if (JSON.stringify(cached.SCENE_ASSET_INPUTS) === JSON.stringify(inputs)) {
    const valid = await Promise.all(
      Object.values(cached.SCENE_ASSETS).map(async url => {
        const bytes = await fs.readFile(path.join(root, 'public', url))
        return path.basename(url).includes(digest(bytes).slice(0, 12))
      })
    )
    if (valid.every(Boolean)) {
      console.log('Daksha web assets are up to date.')
      process.exit(0)
    }
  }
} catch {
  /* First build or changed source: regenerate web copies. */
}
const urls = {}
for (const [name, input, maxSize] of assets) {
  const originalSource = inputBytes.get(name)
  const source =
    name === 'satellite'
      ? await prepareSatellite(originalSource)
      : originalSource
  const jsonLength = source.readUInt32LE(12)
  const doc = JSON.parse(source.subarray(20, 20 + jsonLength))
  const binary = source.subarray(28 + jsonLength)
  const originalViews = structuredClone(doc.bufferViews)
  const chunks = []
  let length = 0,
    decodedLength = 0,
    compressedViews = 0
  const append = data => {
    const padding = (4 - (length % 4)) % 4
    if (padding) {
      chunks.push(Buffer.alloc(padding))
      length += padding
    }
    const offset = length
    chunks.push(Buffer.from(data))
    length += data.byteLength
    return offset
  }
  const imageViews = new Map(
    doc.images.map((image, i) => [image.bufferView, i])
  )
  const colorImages = new Set()
  for (const material of doc.materials || []) {
    for (const info of [
      material.pbrMetallicRoughness?.baseColorTexture,
      material.emissiveTexture,
      material.extensions?.KHR_materials_specular?.specularColorTexture
    ]) {
      if (info) {
        const texture = doc.textures[info.index]
        colorImages.add(
          texture.extensions?.EXT_texture_webp?.source ?? texture.source
        )
      }
    }
  }
  const filteredViews = new Map()
  for (const mesh of doc.meshes || [])
    for (const primitive of mesh.primitives) {
      for (const [semantic, index] of Object.entries(primitive.attributes)) {
        const accessor = doc.accessors[index]
        if (
          accessor.componentType === 5126 &&
          ['POSITION', 'NORMAL', 'TANGENT'].includes(semantic)
        )
          filteredViews.set(
            accessor.bufferView,
            semantic === 'POSITION' ? 16 : 14
          )
      }
    }
  const accessorViews = new Map()
  for (const accessor of doc.accessors) {
    if (
      accessor.bufferView !== undefined &&
      !accessorViews.has(accessor.bufferView)
    )
      accessorViews.set(accessor.bufferView, accessor)
  }
  for (let i = 0; i < originalViews.length; i++) {
    const view = originalViews[i]
    const existing = view.extensions?.EXT_meshopt_compression
    const imageIndex = imageViews.get(i)
    if (imageIndex !== undefined) {
      const data = binary.subarray(
        view.byteOffset || 0,
        (view.byteOffset || 0) + view.byteLength
      )
      const pipeline = sharp(data).resize({
        width: maxSize,
        height: maxSize,
        fit: 'inside',
        withoutEnlargement: true
      })
      const image = await pipeline
        .webp(
          colorImages.has(imageIndex)
            ? { quality: 90, effort: 5 }
            : { lossless: true, effort: 5 }
        )
        .toBuffer()
      doc.bufferViews[i] = {
        buffer: 0,
        byteOffset: append(image),
        byteLength: image.length
      }
      doc.images[imageIndex].mimeType = 'image/webp'
      continue
    }
    if (existing) {
      assert.equal(existing.buffer, 0)
      const data = binary.subarray(
        existing.byteOffset || 0,
        (existing.byteOffset || 0) + existing.byteLength
      )
      const extension = { ...existing, buffer: 0, byteOffset: append(data) }
      const padding = (4 - (decodedLength % 4)) % 4
      decodedLength += padding
      doc.bufferViews[i] = {
        ...view,
        buffer: 1,
        byteOffset: decodedLength,
        extensions: { ...view.extensions, EXT_meshopt_compression: extension }
      }
      decodedLength += view.byteLength
      compressedViews++
      continue
    }
    const data = binary.subarray(
      view.byteOffset || 0,
      (view.byteOffset || 0) + view.byteLength
    )
    const accessor = accessorViews.get(i)
    if (!accessor && !view.target) {
      // Some exporters leave an unused copy of the complete encoded geometry.
      doc.bufferViews[i] = {
        buffer: 0,
        byteOffset: append(Buffer.alloc(4)),
        byteLength: 4
      }
      continue
    }
    const components = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT4: 16 }
    const bytes = { 5120: 1, 5121: 1, 5122: 2, 5123: 2, 5125: 4, 5126: 4 }
    const stride =
      view.byteStride ||
      (accessor && components[accessor.type] * bytes[accessor.componentType])
    const mode = view.target === 34963 ? 'INDICES' : 'ATTRIBUTES'
    if (
      !accessor ||
      !stride ||
      data.length % stride ||
      (mode === 'ATTRIBUTES' && (stride % 4 || stride > 256))
    ) {
      doc.bufferViews[i] = { ...view, buffer: 0, byteOffset: append(data) }
      continue
    }
    const count = data.length / stride
    const bits = mode === 'ATTRIBUTES' ? filteredViews.get(i) : undefined
    const floats = bits ? new Float32Array(Uint8Array.from(data).buffer) : null
    const filtered = bits
      ? MeshoptEncoder.encodeFilterExp(
          floats,
          count,
          stride,
          bits,
          'SharedComponent'
        )
      : data
    const encoded = MeshoptEncoder.encodeGltfBuffer(
      filtered,
      count,
      stride,
      mode
    )
    const decoded = new Uint8Array(data.length)
    MeshoptDecoder.decodeGltfBuffer(
      decoded,
      count,
      stride,
      encoded,
      mode,
      bits ? 'EXPONENTIAL' : undefined
    )
    if (bits) {
      const result = new Float32Array(decoded.buffer)
      let max = 0
      for (const value of floats) max = Math.max(max, Math.abs(value))
      for (let j = 0; j < result.length; j++)
        assert(
          Math.abs(result[j] - floats[j]) <= max * 2 ** (2 - bits) + 1e-7,
          `${name}: geometry precision exceeded`
        )
    } else
      assert.deepEqual(
        Buffer.from(decoded),
        data,
        `${name}: UV/index buffer ${i} did not round-trip`
      )
    if (bits) {
      // Accessor bounds must describe the decoded, precision-limited values.
      const result = new Float32Array(decoded.buffer)
      for (const field of doc.accessors.filter(
        value => value.bufferView === i && value.componentType === 5126
      )) {
        if (!field.min && !field.max) continue
        const size = components[field.type]
        const min = Array(size).fill(Infinity),
          max = Array(size).fill(-Infinity)
        for (let vertex = 0; vertex < field.count; vertex++)
          for (let axis = 0; axis < size; axis++) {
            const value =
              result[(field.byteOffset || 0) / 4 + (vertex * stride) / 4 + axis]
            min[axis] = Math.min(min[axis], value)
            max[axis] = Math.max(max[axis], value)
          }
        field.min = min
        field.max = max
      }
    }
    const extension = {
      buffer: 0,
      byteOffset: append(encoded),
      byteLength: encoded.length,
      byteStride: stride,
      count,
      mode,
      ...(bits ? { filter: 'EXPONENTIAL' } : {})
    }
    decodedLength += (4 - (decodedLength % 4)) % 4
    doc.bufferViews[i] = {
      ...view,
      buffer: 1,
      byteOffset: decodedLength,
      extensions: { ...view.extensions, EXT_meshopt_compression: extension }
    }
    decodedLength += view.byteLength
    compressedViews++
  }
  for (const texture of doc.textures) {
    const sourceIndex =
      texture.extensions?.EXT_texture_webp?.source ?? texture.source
    delete texture.source
    texture.extensions = {
      ...texture.extensions,
      EXT_texture_webp: { source: sourceIndex }
    }
  }
  doc.extensionsUsed = [
    ...new Set([
      ...(doc.extensionsUsed || []),
      'EXT_meshopt_compression',
      'EXT_texture_webp'
    ])
  ]
  doc.extensionsRequired = [
    ...new Set([
      ...(doc.extensionsRequired || []),
      'EXT_meshopt_compression',
      'EXT_texture_webp'
    ])
  ]
  const bin = Buffer.concat(chunks)
  const binPadding = Buffer.alloc((4 - (bin.length % 4)) % 4)
  doc.buffers = [
    { byteLength: bin.length },
    {
      byteLength: decodedLength,
      extensions: { EXT_meshopt_compression: { fallback: true } }
    }
  ]
  const json = Buffer.from(JSON.stringify(doc))
  const jsonPadding = Buffer.alloc((4 - (json.length % 4)) % 4, 32)
  const header = Buffer.alloc(20),
    binHeader = Buffer.alloc(8)
  header.writeUInt32LE(0x46546c67, 0)
  header.writeUInt32LE(2, 4)
  header.writeUInt32LE(
    20 + json.length + jsonPadding.length + 8 + bin.length + binPadding.length,
    8
  )
  header.writeUInt32LE(json.length + jsonPadding.length, 12)
  header.writeUInt32LE(0x4e4f534a, 16)
  binHeader.writeUInt32LE(bin.length + binPadding.length, 0)
  binHeader.writeUInt32LE(0x004e4942, 4)
  let output = Buffer.concat([
    header,
    json,
    jsonPadding,
    binHeader,
    bin,
    binPadding
  ])
  if (name !== 'satellite' && output.length >= originalSource.length)
    output = originalSource
  const hash = createHash('sha256').update(output).digest('hex').slice(0, 12)
  const filename = `${name}-${hash}.glb`
  await fs.writeFile(path.join(destination, filename), output)
  urls[name] = `/models/optimized/${filename}`
  console.log(
    `${name}: ${(originalSource.length / 1e6).toFixed(2)} MB -> ${(
      output.length / 1e6
    ).toFixed(2)} MB (${(
      100 *
      (1 - output.length / originalSource.length)
    ).toFixed(1)}% smaller), ${compressedViews} compressed views`
  )
}
await fs.writeFile(
  path.join(root, 'components/daksha/scene-assets.mjs'),
  `// Generated by scripts/optimize-daksha-assets.mjs.\nexport const SCENE_ASSETS = ${JSON.stringify(
    urls,
    null,
    2
  )}\nexport const SCENE_ASSET_INPUTS = ${JSON.stringify(inputs, null, 2)}\n`
)
