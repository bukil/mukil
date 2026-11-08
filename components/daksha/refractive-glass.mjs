import * as THREE from 'three'

// Capture the world without the spacecraft. Unlike the renderer's built-in
// opaque-only transmission buffer, this includes the transparent Earth and sky.
// The target is allocated/resized only when the material transition is visible.
export function createRefractiveGlass(renderer) {
  const target = new THREE.WebGLRenderTarget(1, 1, {
    type: THREE.HalfFloatType,
    minFilter: THREE.LinearFilter,
    magFilter: THREE.LinearFilter,
    depthBuffer: true
  })
  target.texture.name = 'Daksha glass / linear scene refraction'
  const size = new THREE.Vector2()
  const uniforms = {
    uGlassScene: { value: target.texture },
    uGlassResolution: { value: new THREE.Vector2(1, 1) },
    uGlassProjection: { value: new THREE.Matrix4() }
  }
  return {
    uniforms,
    capture(scene, camera, spacecraft) {
      renderer.getDrawingBufferSize(size)
      uniforms.uGlassResolution.value.copy(size)
      uniforms.uGlassProjection.value.copy(camera.projectionMatrix)
      const scale = Math.min(0.75, Math.sqrt(1000000 / (size.x * size.y)))
      const width = Math.max(1, Math.round(size.x * scale))
      const height = Math.max(1, Math.round(size.y * scale))
      if (target.width !== width || target.height !== height) target.setSize(width, height)
      const previous = {
        target: renderer.getRenderTarget(),
        visible: spacecraft.visible,
        toneMapping: renderer.toneMapping,
        autoClear: renderer.autoClear,
        shadows: renderer.shadowMap.autoUpdate
      }
      try {
        spacecraft.visible = false
        renderer.toneMapping = THREE.NoToneMapping
        renderer.autoClear = true
        renderer.shadowMap.autoUpdate = false
        renderer.setRenderTarget(target)
        renderer.clear()
        renderer.render(scene, camera)
      } finally {
        spacecraft.visible = previous.visible
        renderer.setRenderTarget(previous.target)
        renderer.toneMapping = previous.toneMapping
        renderer.autoClear = previous.autoClear
        renderer.shadowMap.autoUpdate = previous.shadows
      }
    },
    dispose() { target.dispose() }
  }
}

// Snell refraction in view space: project the exit ray through a finite volume.
// The RGB rays have slightly different IORs, rather than a painted rainbow tint.
export function injectRefractiveGlass(shader, uniforms) {
  Object.assign(shader.uniforms, uniforms)
  shader.vertexShader = 'varying vec3 vGlassSurface;\n' + shader.vertexShader.replace(
    '#include <begin_vertex>',
    '#include <begin_vertex>\n vGlassSurface = (modelMatrix * vec4(transformed, 1.0)).xyz;'
  )
  shader.fragmentShader = `
    uniform sampler2D uGlassScene;
    uniform vec2 uGlassResolution;
    uniform mat4 uGlassProjection;
    varying vec3 vGlassSurface;
    vec2 glassExitUV(vec3 incident, vec3 surfaceNormal, float ior, float thickness, vec3 viewPosition) {
      vec3 ray = refract(incident, surfaceNormal, 1.0 / ior);
      vec3 exitPosition = viewPosition + ray * thickness / max(abs(ray.z), 0.25);
      vec4 projected = uGlassProjection * vec4(exitPosition, 1.0);
      vec2 uv = projected.xy / projected.w * 0.5 + 0.5;
      return clamp(uv, vec2(0.002), vec2(0.998));
    }
    ${shader.fragmentShader}`
  // Installed after the existing mode shader, before physical light evaluation.
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <emissivemap_fragment>',
    `#include <emissivemap_fragment>
    vec3 glassP = vGlassSurface;
    vec3 glassWave = vec3(
      sin(glassP.y * 13.0 + sin(glassP.z * 8.0)),
      sin(glassP.z * 11.0 + sin(glassP.x * 9.0)),
      sin(glassP.x * 12.0 + sin(glassP.y * 7.0))
    );
    vec3 glassGrain = sin(glassP * 165.0 + sin(glassP.zxy * 87.0));
    normal = normalize(normal + (glassWave * 0.095 + glassGrain * 0.012) * uDakshaRainbowGlass);`
  )
  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <opaque_fragment>',
    `
    if (uDakshaRainbowGlass > 0.001) {
      vec3 incident = normalize(-vViewPosition);
      float volume = 0.48 + 0.12 * sin(vGlassSurface.y * 8.0 + vGlassSurface.x * 6.0);
      vec2 redUV = glassExitUV(incident, normal, 1.448, volume, -vViewPosition);
      vec2 greenUV = glassExitUV(incident, normal, 1.460, volume, -vViewPosition);
      vec2 blueUV = glassExitUV(incident, normal, 1.474, volume, -vViewPosition);
      vec3 transmitted = vec3(
        texture2D(uGlassScene, redUV).r,
        texture2D(uGlassScene, greenUV).g,
        texture2D(uGlassScene, blueUV).b
      );
      // Small fixed roughness footprint keeps the body clear and the highlights crisp.
      vec2 texel = 1.25 / uGlassResolution;
      vec3 frost = (
        texture2D(uGlassScene, greenUV + texel).rgb +
        texture2D(uGlassScene, greenUV - texel).rgb
      ) * 0.5;
      transmitted = mix(transmitted, frost, 0.12) * vec3(0.94, 0.985, 1.0);
      float facing = clamp(abs(dot(normal, normalize(vViewPosition))), 0.0, 1.0);
      float fresnel = 0.035 + 0.965 * pow(1.0 - facing, 5.0);
      vec3 glassLight = transmitted * (1.0 - fresnel) + totalSpecular;
      #ifdef USE_CLEARCOAT
        glassLight += (clearcoatSpecularDirect + clearcoatSpecularIndirect) * 0.45;
      #endif
      outgoingLight = mix(outgoingLight, glassLight, uDakshaRainbowGlass);
      diffuseColor.a = mix(diffuseColor.a, uDakshaVisibility, uDakshaRainbowGlass);
    }
    #include <opaque_fragment>`
  )
}
