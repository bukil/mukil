import { Vector2, Vector3 } from 'three'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'

export function createDepthOfFieldPass() {
  const center = new Vector3()
  const viewCenter = new Vector3()
  const pass = new ShaderPass({
    uniforms: {
      tDiffuse: { value: null },
      tDepth: { value: null },
      texel: { value: new Vector2() },
      focus: { value: 1 },
      focusUv: { value: new Vector2(0.5, 0.5) },
      nearPlane: { value: 0.1 },
      farPlane: { value: 100 }
    },
    vertexShader: `
      #include <packing>
      uniform sampler2D tDepth;
      uniform vec2 focusUv;
      uniform float focus, nearPlane, farPlane;
      varying float focalDepth;
      float depthAt(vec2 uv) {
        return -perspectiveDepthToViewZ(texture2D(tDepth, uv).x, nearPlane, farPlane);
      }

      varying vec2 vUv;
      void main() {
        // The focal plane is shared by every pixel in this fullscreen pass.
        focalDepth = focus;
        float bestDelta = 2.0;
        for (int y = -1; y <= 1; y++) {
          for (int x = -1; x <= 1; x++) {
            if (abs(x) + abs(y) > 1) continue;
            float candidate = depthAt(clamp(focusUv + vec2(float(x), float(y)) * 0.035, 0.0, 1.0));
            float delta = abs(candidate - focus);
            if (delta < bestDelta) {
              bestDelta = delta;
              focalDepth = candidate;
            }
          }
        }
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      #include <packing>
      varying vec2 vUv;
      uniform sampler2D tDiffuse, tDepth;
      uniform vec2 texel, focusUv;
      uniform float nearPlane, farPlane;
      varying float focalDepth;

      float depthAt(vec2 uv) {
        return -perspectiveDepthToViewZ(texture2D(tDepth, uv).x, nearPlane, farPlane);
      }

      void main() {
        vec4 color = texture2D(tDiffuse, vUv);
        vec2 focalDistance = (vUv - focusUv) * vec2(texel.y / texel.x, 1.0);
        float spotFalloff = smoothstep(0.09, 0.2, length(focalDistance));
        if (spotFalloff < 0.03) {
          gl_FragColor = color;
          return;
        }
        float depth = depthAt(vUv);
        float planeBlur = smoothstep(0.85, 3.5, abs(depth - focalDepth));
        float radius = planeBlur * spotFalloff * 3.2;
        if (radius > 0.1) {
          float total = 1.0;
          for (int i = 0; i < 6; i++) {
            float angle = float(i) * 1.047198;
            vec2 uv = clamp(vUv + vec2(cos(angle), sin(angle)) * texel * radius, 0.0, 1.0);
            float weight = step(depth - 0.3, depthAt(uv));
            color += texture2D(tDiffuse, uv) * weight;
            total += weight;
          }
          color /= total;
        }
        gl_FragColor = color;
      }
    `
  })

  pass.updateFocus = (buffer, camera, target) => {
    pass.enabled = camera.isPerspectiveCamera === true
    if (!pass.enabled) return
    target.getWorldPosition(center)
    const depth = -viewCenter.copy(center).applyMatrix4(camera.matrixWorldInverse).z
    pass.uniforms.focus.value = Math.max(camera.near, depth - 0.45)
    center.project(camera)
    pass.uniforms.focusUv.value.set(center.x * 0.5 + 0.5, center.y * 0.5 + 0.5)
    pass.uniforms.tDepth.value = buffer.depthTexture
    pass.uniforms.texel.value.set(1 / buffer.width, 1 / buffer.height)
    pass.uniforms.nearPlane.value = camera.near
    pass.uniforms.farPlane.value = camera.far
  }
  return pass
}
