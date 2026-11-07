import * as THREE from 'three'

// Restore reflective PBR response where procedural Blender shaders exported as
// maximally rough defaults. Imported maps, UV transforms, and labels stay intact.
export function createSpacecraftFinish(original, part) {
  const material = new THREE.MeshPhysicalMaterial()
  if (original.isMeshPhysicalMaterial) material.copy(original)
  else THREE.MeshStandardMaterial.prototype.copy.call(material, original)
  material.defines = { STANDARD: '', PHYSICAL: '' }
  material.userData.part = part
  const name = original.name.toLowerCase()
  const solar = name.includes('solar')
  const metal =
    /metal|titanium|gold|graphite/.test(name) && !name.includes('plastic')
  if (metal) {
    material.metalness = Math.max(0.92, original.metalness)
    material.roughness = original.roughnessMap
      ? Math.max(0.32, original.roughness * 0.48)
      : name.includes('graphite')
      ? 0.28
      : 0.22
    material.envMapIntensity = 1.65
    material.anisotropy = Math.max(
      original.anisotropy || 0,
      name.includes('titanium') ? 0.8 : 0.5
    )
    material.clearcoat = Math.max(original.clearcoat || 0, 0.18)
    material.clearcoatRoughness = 0.14
    // Procedural gold often has no exported base color at all.
    if (
      name.includes('gold') &&
      !original.map &&
      original.color.r > 0.95 &&
      original.color.g > 0.95
    )
      material.color.set(0xd9ae58)
    if (name.includes('chromatic')) {
      material.iridescence = 0.15
      material.iridescenceIOR = 1.3
    }
    material.userData.reflectiveFinish = true
  } else if (solar) {
    material.envMapIntensity = 0.8
    material.clearcoat = Math.max(original.clearcoat || 0, 0.35)
    material.clearcoatRoughness = 0.12
    if (original.roughnessMap)
      material.roughness = Math.min(original.roughness, 0.65)
  }
  material.polygonOffset = true
  material.polygonOffsetFactor = 1
  material.polygonOffsetUnits = 1
  return material
}

export function prepareBrushedTangents(geometry, materials) {
  if (!materials.some(material => material.anisotropy > 0)) return
  // Texture normal maps retain their imported UV orientation.
  if (
    materials.some(material => material.normalMap) &&
    geometry.index &&
    geometry.hasAttribute('uv')
  ) {
    geometry.computeTangents()
  }
  // CAD surfaces can have collapsed UVs. An explicit tangent gives their
  // anisotropic highlights a stable machining direction on every face.
  const normal = geometry.getAttribute('normal')
  const imported = geometry.getAttribute('tangent')
  const values = new Float32Array(normal.count * 4)
  const n = new THREE.Vector3(),
    tangent = new THREE.Vector3()
  for (let i = 0; i < normal.count; i++) {
    n.fromBufferAttribute(normal, i).normalize()
    if (imported) {
      tangent.fromBufferAttribute(imported, i)
      if (Number.isFinite(tangent.lengthSq()) && tangent.lengthSq() > 0.5) {
        tangent.normalize()
        values.set(
          [tangent.x, tangent.y, tangent.z, imported.getW(i) || 1],
          i * 4
        )
        continue
      }
    }
    tangent.set(0, 1, 0)
    if (Math.abs(n.y) > 0.95) tangent.set(1, 0, 0)
    tangent.addScaledVector(n, -tangent.dot(n)).normalize()
    values.set([tangent.x, tangent.y, tangent.z, 1], i * 4)
  }
  geometry.setAttribute('tangent', new THREE.BufferAttribute(values, 4))
}
