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
    capture(scene, camera, occluders) {
      renderer.getDrawingBufferSize(size)
      uniforms.uGlassResolution.value.copy(size)
      uniforms.uGlassProjection.value.copy(camera.projectionMatrix)
      const width = Math.max(1, Math.round(size.x))
      const height = Math.max(1, Math.round(size.y))
      if (target.width !== width || target.height !== height)
        target.setSize(width, height)
      const hidden = Array.isArray(occluders) ? occluders : [occluders]
      const visibility = hidden.map(object => object.visible)
      const previous = {
        target: renderer.getRenderTarget(),
        toneMapping: renderer.toneMapping,
        autoClear: renderer.autoClear,
        shadows: renderer.shadowMap.autoUpdate
      }
      try {
        hidden.forEach(object => {
          object.visible = false
        })
        renderer.toneMapping = THREE.NoToneMapping
        renderer.autoClear = true
        renderer.shadowMap.autoUpdate = false
        renderer.setRenderTarget(target)
        renderer.clear()
        renderer.render(scene, camera)
      } finally {
        hidden.forEach((object, index) => {
          object.visible = visibility[index]
        })
        renderer.setRenderTarget(previous.target)
        renderer.toneMapping = previous.toneMapping
        renderer.autoClear = previous.autoClear
        renderer.shadowMap.autoUpdate = previous.shadows
      }
    },
    dispose() {
      target.dispose()
    }
  }
}

// Snell refraction in view space with chromatic dispersion, 9-tap volumetric
// frosted blur, and smooth volumetric light/depth gradient matching optical crystal.
export function injectRefractiveGlass(shader, uniforms) {
  Object.assign(shader.uniforms, uniforms)
  shader.vertexShader =
    'varying vec3 vGlassSurface;\n' +
    shader.vertexShader.replace(
      '#include <begin_vertex>',
      '#include <begin_vertex>\n vGlassSurface = (modelMatrix * vec4(transformed, 1.0)).xyz;'
    )
  shader.fragmentShader = `
    uniform sampler2D uGlassScene;
    uniform vec2 uGlassResolution;
    uniform mat4 uGlassProjection;
    varying vec3 vGlassSurface;
    ${shader.fragmentShader}`

  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <opaque_fragment>',
    `
    if (uDakshaRainbowGlass > 0.001) {
      vec3 incident = normalize(-vViewPosition);
      vec3 n = normalize(normal);
      
      // Optical crystal index of refraction & chromatic dispersion
      float iorBase = 1.54;
      float dispersion = 0.045;
      
      vec3 rayR = refract(incident, n, 1.0 / (iorBase - dispersion));
      vec3 rayG = refract(incident, n, 1.0 / iorBase);
      vec3 rayB = refract(incident, n, 1.0 / (iorBase + dispersion));
      
      // Total Internal Reflection fallback for grazing internal rays
      vec3 refl = reflect(incident, n);
      if (dot(rayR, rayR) < 0.05) rayR = refl;
      if (dot(rayG, rayG) < 0.05) rayG = refl;
      if (dot(rayB, rayB) < 0.05) rayB = refl;
      
      float thickness = 1.45;
      vec3 exitR = (-vViewPosition) + rayR * (thickness / max(abs(rayR.z), 0.22));
      vec3 exitG = (-vViewPosition) + rayG * (thickness / max(abs(rayG.z), 0.22));
      vec3 exitB = (-vViewPosition) + rayB * (thickness / max(abs(rayB.z), 0.22));
      
      vec4 projR = uGlassProjection * vec4(exitR, 1.0);
      vec4 projG = uGlassProjection * vec4(exitG, 1.0);
      vec4 projB = uGlassProjection * vec4(exitB, 1.0);
      
      vec2 uvR = clamp(projR.xy / projR.w * 0.5 + 0.5, vec2(0.001), vec2(0.999));
      vec2 uvG = clamp(projG.xy / projG.w * 0.5 + 0.5, vec2(0.001), vec2(0.999));
      vec2 uvB = clamp(projB.xy / projB.w * 0.5 + 0.5, vec2(0.001), vec2(0.999));
      
      // ── Physical Fresnel & Spatial Gradients ──
      float cosTheta = clamp(abs(dot(n, normalize(vViewPosition))), 0.0, 1.0);
      float F0 = 0.052;
      float fresnel = F0 + (1.0 - F0) * pow(1.0 - cosTheta, 4.8);
      
      float pathLength = thickness / max(abs(rayG.z), 0.22);
      float depthGrad = clamp((pathLength - 1.2) / 2.0, 0.0, 1.0);
      float edgeGrad = pow(1.0 - cosTheta, 2.2);
      
      // ── Multi-Tap Frosted Refraction Blur (Optical Diffusion) ──
      vec2 texel = 1.0 / uGlassResolution;
      float blurDist = 3.6 + 2.8 * depthGrad + 2.0 * edgeGrad;
      
      vec2 off1 = vec2( 0.707,  0.707) * texel * blurDist;
      vec2 off2 = vec2(-0.707,  0.707) * texel * blurDist;
      vec2 off3 = vec2(-0.707, -0.707) * texel * blurDist;
      vec2 off4 = vec2( 0.707, -0.707) * texel * blurDist;
      vec2 off5 = vec2( 0.0,    1.35 ) * texel * blurDist;
      vec2 off6 = vec2( 0.0,   -1.35 ) * texel * blurDist;
      vec2 off7 = vec2( 1.35,   0.0  ) * texel * blurDist;
      vec2 off8 = vec2(-1.35,   0.0  ) * texel * blurDist;
      
      float colR = texture2D(uGlassScene, uvR).r * 0.24
                 + texture2D(uGlassScene, uvR + off1).r * 0.11
                 + texture2D(uGlassScene, uvR + off2).r * 0.11
                 + texture2D(uGlassScene, uvR + off3).r * 0.11
                 + texture2D(uGlassScene, uvR + off4).r * 0.11
                 + texture2D(uGlassScene, uvR + off5).r * 0.08
                 + texture2D(uGlassScene, uvR + off6).r * 0.08
                 + texture2D(uGlassScene, uvR + off7).r * 0.08
                 + texture2D(uGlassScene, uvR + off8).r * 0.08;
                 
      float colG = texture2D(uGlassScene, uvG).g * 0.24
                 + texture2D(uGlassScene, uvG + off1).g * 0.11
                 + texture2D(uGlassScene, uvG + off2).g * 0.11
                 + texture2D(uGlassScene, uvG + off3).g * 0.11
                 + texture2D(uGlassScene, uvG + off4).g * 0.11
                 + texture2D(uGlassScene, uvG + off5).g * 0.08
                 + texture2D(uGlassScene, uvG + off6).g * 0.08
                 + texture2D(uGlassScene, uvG + off7).g * 0.08
                 + texture2D(uGlassScene, uvG + off8).g * 0.08;
                 
      float colB = texture2D(uGlassScene, uvB).b * 0.24
                 + texture2D(uGlassScene, uvB + off1).b * 0.11
                 + texture2D(uGlassScene, uvB + off2).b * 0.11
                 + texture2D(uGlassScene, uvB + off3).b * 0.11
                 + texture2D(uGlassScene, uvB + off4).b * 0.11
                 + texture2D(uGlassScene, uvB + off5).b * 0.08
                 + texture2D(uGlassScene, uvB + off6).b * 0.08
                 + texture2D(uGlassScene, uvB + off7).b * 0.08
                 + texture2D(uGlassScene, uvB + off8).b * 0.08;
                 
      vec3 transmitted = vec3(colR, colG, colB);
      
      // ── Volumetric Light Gradient Across the Crystal Body ──
      float lightGrad = clamp(dot(n, normalize(vec3(-0.3, 0.8, 0.5))), 0.0, 1.0);
      float heightGrad = clamp((vGlassSurface.y + 1.0) / 2.0, 0.0, 1.0);
      
      vec3 topColor = vec3(1.05, 1.07, 1.08);   // luminous crystalline top
      vec3 midColor = vec3(0.97, 1.01, 1.00);   // optical core
      vec3 baseColor = vec3(0.86, 0.93, 0.90);  // deeper gradient base
      vec3 verticalGradient = mix(baseColor, mix(midColor, topColor, lightGrad), heightGrad);
      
      vec3 depthTint = mix(vec3(1.0), vec3(0.92, 0.97, 0.95), depthGrad);
      vec3 internalGlow = vec3(0.045, 0.075, 0.065) * (1.0 - edgeGrad) * (0.35 + 0.65 * lightGrad);
      
      transmitted = transmitted * verticalGradient * depthTint + internalGlow;
      
      // ── Chromatic Rim Specular Reflections ──
      vec3 rimFlare = mix(vec3(1.0, 0.76, 0.38), vec3(0.42, 0.82, 1.0), n.x * 0.5 + 0.5);
      vec3 specularReflection = totalSpecular + (totalSpecular * rimFlare * 2.2 * pow(1.0 - cosTheta, 2.5));
      
      #ifdef USE_CLEARCOAT
        specularReflection += (clearcoatSpecularDirect + clearcoatSpecularIndirect) * 1.1;
      #endif
      
      vec3 crystalOutput = mix(transmitted, specularReflection, fresnel) + specularReflection * 0.45;
      outgoingLight = mix(outgoingLight, crystalOutput, uDakshaRainbowGlass);
      diffuseColor.a = mix(diffuseColor.a, uDakshaVisibility, uDakshaRainbowGlass);
    }
    #include <opaque_fragment>`
  )
}
