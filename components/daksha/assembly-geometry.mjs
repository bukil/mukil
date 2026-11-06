import * as THREE from 'three'

const positionKey = (x, y, z) =>
  `${Math.round(x * 100000)},${Math.round(y * 100000)},${Math.round(
    z * 100000
  )}`

// Recover disconnected solids from the merged export. Shared-position vertices
// are welded for connectivity only; normals, UVs and render geometry stay intact.
export function prepareAssemblyGeometry(geometry, groupIndex, seed = 0) {
  const position = geometry.getAttribute('position')
  const bakedOffset = geometry.getAttribute('_assembly_offset')
  const bakedDelay = geometry.getAttribute('_assembly_delay')
  if (bakedOffset && bakedDelay) {
    const components = new Map()
    const byPosition = new Map()
    for (let i = 0; i < position.count; i++) {
      const key = `${bakedDelay.getX(i).toFixed(6)}:${positionKey(
        bakedOffset.getX(i),
        bakedOffset.getY(i),
        bakedOffset.getZ(i)
      )}`
      if (!components.has(key))
        components.set(key, {
          vertices: [],
          center: new THREE.Vector3(),
          offset: new THREE.Vector3().fromBufferAttribute(bakedOffset, i),
          delay: bakedDelay.getX(i)
        })
      const piece = components.get(key)
      piece.vertices.push(i)
      piece.center.x += position.getX(i)
      piece.center.y += position.getY(i)
      piece.center.z += position.getZ(i)
      byPosition.set(
        positionKey(position.getX(i), position.getY(i), position.getZ(i)),
        piece
      )
    }
    const pieces = [...components.values()]
    pieces.forEach(piece => piece.center.divideScalar(piece.vertices.length))
    geometry.setAttribute('assemblyOffset', bakedOffset)
    geometry.setAttribute('assemblyDelay', bakedDelay)
    return { pieces, byPosition }
  }
  const parents = new Int32Array(position.count)
  const welded = new Map()
  const find = vertex => {
    let root = vertex
    while (parents[root] !== root) root = parents[root]
    while (parents[vertex] !== vertex) {
      const next = parents[vertex]
      parents[vertex] = root
      vertex = next
    }
    return root
  }
  const join = (a, b) => {
    a = find(a)
    b = find(b)
    if (a !== b) parents[b] = a
  }
  for (let i = 0; i < position.count; i++) {
    parents[i] = i
    const key = positionKey(
      position.getX(i),
      position.getY(i),
      position.getZ(i)
    )
    if (welded.has(key)) join(i, welded.get(key))
    else welded.set(key, i)
  }
  const index = geometry.index
  const count = index ? index.count : position.count
  for (let i = 0; i < count; i += 3) {
    const a = index ? index.getX(i) : i
    join(a, index ? index.getX(i + 1) : i + 1)
    join(a, index ? index.getX(i + 2) : i + 2)
  }
  const islands = new Map()
  for (let i = 0; i < position.count; i++) {
    const root = find(i)
    if (!islands.has(root))
      islands.set(root, { vertices: [], center: new THREE.Vector3() })
    const island = islands.get(root)
    island.vertices.push(i)
    island.center.x += position.getX(i)
    island.center.y += position.getY(i)
    island.center.z += position.getZ(i)
  }
  const pieces = [...islands.values()]
  pieces.sort((a, b) => b.vertices.length - a.vertices.length)
  const offsets = new Float32Array(position.count * 3)
  const delays = new Float32Array(position.count)
  const byPosition = new Map()
  pieces.forEach((piece, i) => {
    piece.center.divideScalar(piece.vertices.length)
    const direction = (i + groupIndex + seed) % 6
    piece.offset = new THREE.Vector3()
    piece.offset.setComponent(
      Math.floor(direction / 2),
      (direction % 2 ? -1 : 1) * (1.35 + (i % 4) * 0.18)
    )
    piece.delay =
      Math.max(0, groupIndex) * 0.105 +
      (i / Math.max(1, pieces.length - 1)) * 0.075
    piece.vertices.forEach(vertex => {
      piece.offset.toArray(offsets, vertex * 3)
      delays[vertex] = piece.delay
      byPosition.set(
        positionKey(
          position.getX(vertex),
          position.getY(vertex),
          position.getZ(vertex)
        ),
        piece
      )
    })
  })
  geometry.setAttribute('assemblyOffset', new THREE.BufferAttribute(offsets, 3))
  geometry.setAttribute('assemblyDelay', new THREE.BufferAttribute(delays, 1))
  return { pieces, byPosition }
}

export function prepareAssemblyEdges(geometry, plan, transform) {
  const position = geometry.getAttribute('position')
  const offsets = new Float32Array(position.count * 3)
  const delays = new Float32Array(position.count)
  const rotation = new THREE.Matrix3().setFromMatrix4(transform)
  for (let i = 0; i < position.count; i++) {
    const piece = plan.byPosition.get(
      positionKey(position.getX(i), position.getY(i), position.getZ(i))
    )
    if (!piece) continue
    piece.offset
      .clone()
      .applyMatrix3(rotation)
      .toArray(offsets, i * 3)
    delays[i] = piece.delay
  }
  geometry.setAttribute('assemblyOffset', new THREE.BufferAttribute(offsets, 3))
  geometry.setAttribute('assemblyDelay', new THREE.BufferAttribute(delays, 1))
}

export function injectAssemblyShader(shader, uniforms) {
  shader.uniforms.uAssemblyBlend = uniforms.blend
  shader.uniforms.uAssemblyProgress = uniforms.progress
  shader.vertexShader = `attribute vec3 assemblyOffset;
    attribute float assemblyDelay;
    uniform float uAssemblyBlend;
    uniform float uAssemblyProgress;
    ${shader.vertexShader}`.replace(
    '#include <begin_vertex>',
    `#include <begin_vertex>
    float assemblyTravel = smoothstep(assemblyDelay, assemblyDelay + 0.20, uAssemblyProgress);
    transformed += assemblyOffset * (1.0 - assemblyTravel) * uAssemblyBlend;`
  )
}

export function createAssemblyGuides() {
  const positions = []
  const alphas = []
  const delays = []
  const along = []
  const segment = (a, b, alphaA, alphaB, delay = 2, alongA = 0, alongB = 0) => {
    positions.push(...a, ...b)
    alphas.push(alphaA, alphaB)
    delays.push(delay, delay)
    along.push(alongA, alongB)
  }
  // Three bounded orthogonal planes. Lines dissolve before their endpoints.
  const extent = 2.7
  for (let line = -5; line <= 5; line++) {
    const fixed = line * 0.45
    for (let step = 0; step < 18; step++) {
      const a = -extent + (step / 18) * extent * 2
      const b = -extent + ((step + 1) / 18) * extent * 2
      const opacity = value =>
        Math.pow(Math.max(0, 1 - Math.abs(value) / extent), 1.6) *
        (1 - Math.abs(fixed) / extent) *
        0.2
      segment([a, -1.8, fixed], [b, -1.8, fixed], opacity(a), opacity(b))
      segment([fixed, -1.8, a], [fixed, -1.8, b], opacity(a), opacity(b))
      segment(
        [a, fixed, -1.8],
        [b, fixed, -1.8],
        opacity(a) * 0.5,
        opacity(b) * 0.5
      )
      segment(
        [-1.8, fixed, a],
        [-1.8, fixed, b],
        opacity(a) * 0.5,
        opacity(b) * 0.5
      )
    }
  }
  const geometry = new THREE.BufferGeometry()
  const uniforms = { visibility: { value: 0 }, progress: { value: 0 } }
  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uVisibility: uniforms.visibility,
      uProgress: uniforms.progress
    },
    vertexShader: `attribute float guideAlpha; attribute float guideDelay; attribute float guideAlong;
      varying float vAlpha; varying float vDelay; varying float vAlong;
      void main(){vAlpha=guideAlpha;vDelay=guideDelay;vAlong=guideAlong;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`,
    fragmentShader: `uniform float uVisibility; uniform float uProgress;
      varying float vAlpha; varying float vDelay; varying float vAlong;
      void main(){float remaining=1.0-smoothstep(vDelay,vDelay+0.20,uProgress);
      float travel=smoothstep(vDelay,vDelay+0.20,uProgress);
      float pulse=exp(-pow((vAlong-travel)*15.0,2.0))*step(vDelay,uProgress)*step(vDelay,1.0);
      gl_FragColor=vec4(vec3(0.26,0.58,0.84)*(1.0+pulse*1.2),vAlpha*uVisibility*remaining*(1.0+pulse*1.8));}`
  })
  const lines = new THREE.LineSegments(geometry, material)
  lines.frustumCulled = false
  return {
    lines,
    uniforms,
    addPaths(pieces, transform) {
      pieces
        .filter(piece => piece.vertices.length >= 48)
        .slice(0, 18)
        .forEach(piece => {
          const end = piece.center.clone().applyMatrix4(transform)
          const start = piece.center
            .clone()
            .add(piece.offset)
            .applyMatrix4(transform)
          const mid = start.clone().lerp(end, 0.3)
          segment(start.toArray(), mid.toArray(), 0, 0.42, piece.delay, 0, 0.3)
          segment(mid.toArray(), end.toArray(), 0.42, 0.08, piece.delay, 0.3, 1)
        })
    },
    build() {
      geometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(positions, 3)
      )
      geometry.setAttribute(
        'guideAlpha',
        new THREE.Float32BufferAttribute(alphas, 1)
      )
      geometry.setAttribute(
        'guideDelay',
        new THREE.Float32BufferAttribute(delays, 1)
      )
      geometry.setAttribute(
        'guideAlong',
        new THREE.Float32BufferAttribute(along, 1)
      )
    },
    dispose() {
      geometry.dispose()
      material.dispose()
    }
  }
}
