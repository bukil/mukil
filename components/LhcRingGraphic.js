import React, { useRef, useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'

/**
 * Hairline 3D Isometric LHC Accelerator Complex
 * - Square stage resolution matching Hairline figure cards
 * - Main 3D cylindrical storage ring (right)
 * - Small 3D cylindrical booster/injector ring (left)
 * - 3D connecting transfer pipe tangent to both loops
 * - Strictly two particles: one in main ring, one in booster ring
 * - Smooth relativistic acceleration on hover
 * - Pure Hairline geometry: clean, quiet, zero extra dots/squares/plus signs
 */
export default function LhcRingGraphic() {
  const [isHovered, setIsHovered] = useState(false)
  const isHoveredRef = useRef(false)
  const particleMainRef = useRef(null)
  const particleBoosterRef = useRef(null)

  // Sync ref for immediate 60fps loop access without re-binding
  useEffect(() => {
    isHoveredRef.current = isHovered
  }, [isHovered])

  // --- Main Ring Parameters (Centered vertically in 540x464 viewport) ---
  const cx1 = 340.0
  const cy1 = 232.0
  const Rx1 = 110.0
  const Ry1 = 55.0
  const drX1 = 12.0
  const drY1 = 6.5
  const drop1 = 7.0

  // --- Small Booster Ring Parameters ---
  const cx2 = 135.0
  const cy2 = 232.0
  const Rx2 = 44.0
  const Ry2 = 22.0
  const drX2 = 8.0
  const drY2 = 4.5
  const drop2 = 6.0

  // Pre-calculate 16 3D cylindrical transverse ribs for Main Ring
  const ribs1 = []
  for (let k = 0; k < 16; k++) {
    const theta = k * ((2 * Math.PI) / 16)
    const ix = cx1 + (Rx1 - drX1) * Math.cos(theta)
    const iy = cy1 + (Ry1 - drY1) * Math.sin(theta)
    const ox = cx1 + (Rx1 + drX1) * Math.cos(theta)
    const oy = cy1 + (Ry1 + drY1) * Math.sin(theta)
    const px = cx1 + Rx1 * Math.cos(theta)
    const py = cy1 + Ry1 * Math.sin(theta) - 6.0
    const cpx = 2 * px - 0.5 * (ix + ox)
    const cpy = 2 * py - 0.5 * (iy + oy)
    ribs1.push({
      d: `M ${ix.toFixed(1)},${iy.toFixed(1)} Q ${cpx.toFixed(1)},${cpy.toFixed(1)} ${ox.toFixed(1)},${oy.toFixed(1)}`
    })
  }

  // Pre-calculate 8 3D cylindrical transverse ribs for Small Booster Ring
  const ribs2 = []
  for (let k = 0; k < 8; k++) {
    const theta = k * ((2 * Math.PI) / 8)
    const ix = cx2 + (Rx2 - drX2) * Math.cos(theta)
    const iy = cy2 + (Ry2 - drY2) * Math.sin(theta)
    const ox = cx2 + (Rx2 + drX2) * Math.cos(theta)
    const oy = cy2 + (Ry2 + drY2) * Math.sin(theta)
    const px = cx2 + Rx2 * Math.cos(theta)
    const py = cy2 + Ry2 * Math.sin(theta) - 4.0
    const cpx = 2 * px - 0.5 * (ix + ox)
    const cpy = 2 * py - 0.5 * (iy + oy)
    ribs2.push({
      d: `M ${ix.toFixed(1)},${iy.toFixed(1)} Q ${cpx.toFixed(1)},${cpy.toFixed(1)} ${ox.toFixed(1)},${oy.toFixed(1)}`
    })
  }

  // Tangential pipe Bezier geometry
  const p0 = [167.0, 212.0]
  const p1 = [197.0, 199.0]
  const p2 = [232.0, 173.0]
  const p3 = [262.0, 186.0]

  const q0 = [171.0, 220.0]
  const q1 = [200.0, 207.0]
  const q2 = [231.0, 181.0]
  const q3 = [264.0, 194.0]

  const m0 = [169.0, 216.0]
  const m1 = [198.5, 203.0]
  const m2 = [231.5, 177.0]
  const m3 = [263.0, 190.0]

  const pipeFillPath = `M ${p0[0]},${p0[1]} C ${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]} L ${q3[0]},${q3[1]} C ${q2[0]},${q2[1]} ${q1[0]},${q1[1]} ${q0[0]},${q0[1]} Z`
  const pipeDropPath = `M ${q0[0]},${q0[1]} C ${q1[0]},${q1[1]} ${q2[0]},${q2[1]} ${q3[0]},${q3[1]} L ${q3[0]},${q3[1] + 6} C ${q2[0]},${q2[1] + 6} ${q1[0]},${q1[1] + 6} ${q0[0]},${q0[1] + 6} Z`
  const pipeCrestPath = `M ${m0[0]},${m0[1]} C ${m1[0]},${m1[1]} ${m2[0]},${m2[1]} ${m3[0]},${m3[1]}`

  const pipeRibs = [
    'M 193,209 Q 192,203 189,200.5',
    'M 216,200 Q 215,194 213,191.5',
    'M 239,193 Q 238,187 236,184.5',
  ]

  // 60fps Relativistic particle animation loop
  useEffect(() => {
    let animId
    let angleMain = 0
    let angleBooster = 0
    let speedMain = 0.016
    let speedBooster = 0.026

    const animate = () => {
      // Smooth speed acceleration on hover
      const targetSpeedMain = isHoveredRef.current ? 0.076 : 0.016
      const targetSpeedBooster = isHoveredRef.current ? 0.112 : 0.026
      speedMain += (targetSpeedMain - speedMain) * 0.08
      speedBooster += (targetSpeedBooster - speedBooster) * 0.08

      angleMain += speedMain
      angleBooster += speedBooster

      // Update Particle 1 (Main Ring)
      if (particleMainRef.current) {
        const x1 = cx1 + Rx1 * Math.cos(angleMain)
        const y1 = cy1 - 4.0 + Ry1 * Math.sin(angleMain)
        particleMainRef.current.setAttribute('cx', x1.toFixed(1))
        particleMainRef.current.setAttribute('cy', y1.toFixed(1))
      }

      // Update Particle 2 (Booster Ring)
      if (particleBoosterRef.current) {
        const x2 = cx2 + Rx2 * Math.cos(angleBooster)
        const y2 = cy2 - 2.5 + Ry2 * Math.sin(angleBooster)
        particleBoosterRef.current.setAttribute('cx', x2.toFixed(1))
        particleBoosterRef.current.setAttribute('cy', y2.toFixed(1))
      }

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animId)
  }, [cx1, cy1, Rx1, Ry1, cx2, cy2, Rx2, Ry2])

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pointerEvents="auto"
      data-hairline=""
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        '--hairline-plate': '#ffffff',
        '--hairline-hi': '#232327',
        '--hairline-edge': '#a4a4ac',
        '--hairline-mid': '#c3c3c9',
        '--hairline-lo': '#e0e0e4',
        '--hairline-stroke': '0.9',
        '& path, & polygon, & line, & circle, & ellipse': {
          vectorEffect: 'non-scaling-stroke',
          strokeLinejoin: 'round',
          strokeLinecap: 'round',
        },
      }}
    >
      <svg
        viewBox="0 0 540 464"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible', cursor: 'pointer' }}
      >
        {/* Scaled LHC Complex */}
        <g id="lhc-complex-scaled" transform="translate(270, 232) scale(1.24) translate(-270, -232)">

        {/* ============================================================== */}
        {/* 3D TANGENTIAL CONNECTING PIPE (Tangent to both loops)          */}
        {/* ============================================================== */}
        <g id="tangent-pipe">
          {/* Drop facet */}
          <path d={pipeDropPath} fill="#ffffff" stroke="#a4a4ac" strokeWidth="0.9" />

          {/* Main pipe body */}
          <path
            d={pipeFillPath}
            fill="#ffffff"
            stroke={isHovered ? '#232327' : '#232327'}
            strokeWidth={isHovered ? '1.15' : '1.0'}
            style={{ transition: 'stroke-width 0.2s ease' }}
          />

          {/* Top crest crease */}
          <path d={pipeCrestPath} fill="none" stroke="#c3c3c9" strokeWidth="0.8" strokeDasharray="3 3" />

          {/* Transverse collar ribs */}
          {pipeRibs.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke={isHovered ? '#232327' : '#9c9ca6'}
              strokeWidth={isHovered ? '0.95' : '0.8'}
              style={{ transition: 'stroke 0.2s ease, stroke-width 0.2s ease' }}
            />
          ))}
        </g>

        {/* ============================================================== */}
        {/* SMALL BOOSTER LOOP (3D Cylindrical Toroid)                     */}
        {/* ============================================================== */}
        <g id="small-ring">
          {/* Ground drop facet */}
          <path
            d={`M ${cx2 - Rx2 - drX2},${cy2} A ${Rx2 + drX2} ${Ry2 + drY2} 0 0 0 ${cx2 + Rx2 + drX2},${cy2} L ${cx2 + Rx2 + drX2},${cy2 + drop2} A ${Rx2 + drX2} ${Ry2 + drY2} 0 0 1 ${cx2 - Rx2 - drX2},${cy2 + drop2} Z`}
            fill="#ffffff"
            stroke="#a4a4ac"
            strokeWidth="0.9"
          />

          {/* Toroid body */}
          <path
            d={`M ${cx2 - Rx2 - drX2},${cy2} A ${Rx2 + drX2} ${Ry2 + drY2} 0 1 0 ${cx2 + Rx2 + drX2},${cy2} A ${Rx2 + drX2} ${Ry2 + drY2} 0 1 0 ${cx2 - Rx2 - drX2},${cy2} Z M ${cx2 - Rx2 + drX2},${cy2} A ${Rx2 - drX2} ${Ry2 - drY2} 0 1 1 ${cx2 + Rx2 - drX2},${cy2} A ${Rx2 - drX2} ${Ry2 - drY2} 0 1 1 ${cx2 - Rx2 + drX2},${cy2} Z`}
            fillRule="evenodd"
            fill="#ffffff"
            stroke={isHovered ? '#232327' : '#232327'}
            strokeWidth={isHovered ? '1.15' : '1.0'}
            style={{ transition: 'stroke-width 0.2s ease' }}
          />

          {/* Top crest crease */}
          <ellipse
            cx={cx2}
            cy={cy2 - 3.5}
            rx={Rx2}
            ry={Ry2}
            fill="none"
            stroke="#c3c3c9"
            strokeWidth="0.8"
            strokeDasharray="3 3"
          />

          {/* Transverse collar ribs */}
          {ribs2.map((r, i) => (
            <path
              key={i}
              d={r.d}
              fill="none"
              stroke={isHovered ? '#232327' : '#9c9ca6'}
              strokeWidth={isHovered ? '0.95' : '0.8'}
              style={{ transition: 'stroke 0.2s ease, stroke-width 0.2s ease' }}
            />
          ))}
        </g>

        {/* ============================================================== */}
        {/* MAIN STORAGE LOOP (3D Cylindrical Toroid)                      */}
        {/* ============================================================== */}
        <g id="main-ring">
          {/* Ground drop facet */}
          <path
            d={`M ${cx1 - Rx1 - drX1},${cy1} A ${Rx1 + drX1} ${Ry1 + drY1} 0 0 0 ${cx1 + Rx1 + drX1},${cy1} L ${cx1 + Rx1 + drX1},${cy1 + drop1} A ${Rx1 + drX1} ${Ry1 + drY1} 0 0 1 ${cx1 - Rx1 - drX1},${cy1 + drop1} Z`}
            fill="#ffffff"
            stroke="#a4a4ac"
            strokeWidth="0.9"
          />

          {/* Toroid body */}
          <path
            d={`M ${cx1 - Rx1 - drX1},${cy1} A ${Rx1 + drX1} ${Ry1 + drY1} 0 1 0 ${cx1 + Rx1 + drX1},${cy1} A ${Rx1 + drX1} ${Ry1 + drY1} 0 1 0 ${cx1 - Rx1 - drX1},${cy1} Z M ${cx1 - Rx1 + drX1},${cy1} A ${Rx1 - drX1} ${Ry1 - drY1} 0 1 1 ${cx1 + Rx1 - drX1},${cy1} A ${Rx1 - drX1} ${Ry1 - drY1} 0 1 1 ${cx1 - Rx1 + drX1},${cy1} Z`}
            fillRule="evenodd"
            fill="#ffffff"
            stroke={isHovered ? '#232327' : '#232327'}
            strokeWidth={isHovered ? '1.15' : '1.0'}
            style={{ transition: 'stroke-width 0.2s ease' }}
          />

          {/* Top crest crease */}
          <ellipse
            cx={cx1}
            cy={cy1 - 6.0}
            rx={Rx1}
            ry={Ry1}
            fill="none"
            stroke="#c3c3c9"
            strokeWidth="0.8"
            strokeDasharray="3 3"
          />

          {/* Transverse collar ribs */}
          {ribs1.map((r, i) => (
            <path
              key={i}
              d={r.d}
              fill="none"
              stroke={isHovered ? '#232327' : '#9c9ca6'}
              strokeWidth={isHovered ? '0.95' : '0.8'}
              style={{ transition: 'stroke 0.2s ease, stroke-width 0.2s ease' }}
            />
          ))}
        </g>

        {/* ============================================================== */}
        {/* ONLY TWO PARTICLES (Clean, minimal)                            */}
        {/* ============================================================== */}
        {/* Particle 1: Circulating in Main Storage Ring */}
        <circle
          id="particle-main"
          ref={particleMainRef}
          cx={cx1 + Rx1}
          cy={cy1 - 4.0}
          r={isHovered ? '2.5' : '2.2'}
          fill="#232327"
          style={{ transition: 'r 0.2s ease' }}
        />

        {/* Particle 2: Circulating in Small Booster Ring */}
        <circle
          id="particle-booster"
          ref={particleBoosterRef}
          cx={cx2 + Rx2}
          cy={cy2 - 2.5}
          r={isHovered ? '2.3' : '2.0'}
          fill="#232327"
          style={{ transition: 'r 0.2s ease' }}
        />
        </g>
      </svg>
    </Box>
  )
}
