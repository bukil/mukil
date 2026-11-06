import * as THREE from 'three'

// Retain imported maps and labels while giving each material its own finish.
export function createSpacecraftFinish(original, part) {
  const material = new THREE.MeshPhysicalMaterial()
  if (original.isMeshPhysicalMaterial) material.copy(original)
  else THREE.MeshStandardMaterial.prototype.copy.call(material, original)
  material.defines = { STANDARD: '', PHYSICAL: '' }
  const name = original.name.toLowerCase()
  const plastic = name.includes('plastic')
  const detector = name.includes('detector')
  const gold = name.includes('gold')
  const graphite = name.includes('graphite')
  material.userData.part = part
  material.emissive.setHex(0)
  material.emissiveIntensity = 1
  material.envMapIntensity = plastic || detector ? 0.8 : 2.1

  if (plastic) {
    material.metalness = 0
    material.roughness = name.includes('rough') ? 0.55 : 0.27
    material.clearcoat = name.includes('glossy') ? 0.45 : 0.12
    material.clearcoatRoughness = 0.2
  } else if (detector) {
    material.metalness = 0.35
    material.roughness = 0.24
    material.clearcoat = 0.65
    material.clearcoatRoughness = 0.1
  } else {
    material.metalness = 1
    material.roughness = gold ? 0.2 : graphite ? 0.26 : 0.22
    material.anisotropy = gold ? 0.72 : graphite ? 0.65 : 0.85
    material.anisotropyRotation = graphite ? Math.PI / 2 : Math.PI / 8
    material.clearcoat = gold ? 0.3 : 0.22
    material.clearcoatRoughness = 0.12
    if (gold) material.color.setRGB(0.88, 0.57, 0.2)
    else if (name.includes('titanium'))
      material.color.lerp(new THREE.Color(0.7, 0.76, 0.82), 0.4)
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
