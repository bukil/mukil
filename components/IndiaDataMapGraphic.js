import { Box } from '@chakra-ui/react'
import { useState } from 'react'
import { INDIA_MAP_PATHS } from './IndiaMapPaths'

// Hairline Isometric 3D Data Map of India with moving state metric bars
// Generated with exact geographic coordinates referenced from in.svg
export default function IndiaDataMapGraphic() {
  const [hoveredState, setHoveredState] = useState(null);

  // Key states sorted strictly back-to-front by isometric Y for physical occlusion
  const states = [
    { id: 'INJK', name: 'Jammu & Kashmir', x: 231, y: 74, h: 24, metric: '77% LIT · ₹26K' },
    { id: 'INPB', name: 'Punjab', x: 232, y: 85, h: 30, metric: '77% LIT · ₹28K' },
    { id: 'INDL', name: 'Delhi NCR', x: 242, y: 94, h: 38, metric: '89% LIT · ₹44K' },
    { id: 'INUP', name: 'Uttar Pradesh', x: 261, y: 102, h: 24, metric: '69% LIT · ₹21K' },
    { id: 'INAS', name: 'Assam', x: 337, y: 103, h: 26, metric: '73% LIT · ₹24K' },
    { id: 'INRJ', name: 'Rajasthan', x: 229, y: 104, h: 22, metric: '67% LIT · ₹22K' },
    { id: 'INBR', name: 'Bihar', x: 295, y: 104, h: 20, metric: '64% LIT · ₹18K' },
    { id: 'INMP', name: 'Madhya Pradesh', x: 249, y: 111, h: 26, metric: '71% LIT · ₹23K' },
    { id: 'INWB', name: 'West Bengal', x: 312, y: 113, h: 32, metric: '77% LIT · ₹26K' },
    { id: 'INGJ', name: 'Gujarat', x: 206, y: 116, h: 34, metric: '79% LIT · ₹34K' },
    { id: 'INOR', name: 'Odisha', x: 286, y: 124, h: 26, metric: '73% LIT · ₹25K' },
    { id: 'INMH', name: 'Maharashtra', x: 237, y: 127, h: 40, metric: '83% LIT · ₹46K' },
    { id: 'INTG', name: 'Telangana', x: 254, y: 132, h: 34, metric: '73% LIT · ₹38K' },
    { id: 'INKA', name: 'Karnataka', x: 238, y: 142, h: 36, metric: '77% LIT · ₹40K' },
    { id: 'INAP', name: 'Andhra Pradesh', x: 268, y: 142, h: 28, metric: '67% LIT · ₹32K' },
    { id: 'INTN', name: 'Tamil Nadu', x: 250, y: 155, h: 38, metric: '80% LIT · ₹36K' },
    { id: 'INKL', name: 'Kerala', x: 236, y: 156, h: 46, metric: '96.2% LIT (TOP)' },
  ];

  const dx = 6.5;
  const dy = 3.75;

  const active = hoveredState || states[states.length - 1]; // defaults to Kerala peak at rest

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
      sx={{
        '--hairline-plate': '#ffffff',
        '--hairline-hi': '#232327',
        '--hairline-edge': '#a4a4ac',
        '--hairline-mid': '#c3c3c9',
        '--hairline-lo': '#e0e0e4',
        '--hairline-stroke': '0.9',
        '@keyframes hairlineBarWave': {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-7px)',
          },
        },
        '& path, & polygon, & line, & circle': {
          vectorEffect: 'non-scaling-stroke',
          strokeLinejoin: 'round',
          strokeLinecap: 'round',
        },
      }}
    >
      <svg
        viewBox="0 0 540 224"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
        onMouseLeave={() => setHoveredState(null)}
      >
        {/* Technical Perimeter Frame / Border Guide */}
        <rect
          x="16"
          y="8"
          width="508"
          height="208"
          fill="none"
          stroke="#e0e0e4"
          strokeWidth="0.8"
          strokeDasharray="1 4"
        />

        {/* Technical Figures Annotations */}
        <g opacity="0.85">
          <text
            x="32"
            y="24"
            fontFamily="'Michroma', monospace"
            fontSize="7.5"
            fontWeight="600"
            fill="#a4a4ac"
            letterSpacing="0.14em"
          >
            FIG. 02 · INDIA DATA MAP
          </text>
          <text
            x="508"
            y="24"
            textAnchor="end"
            fontFamily="'Michroma', monospace"
            fontSize="7.5"
            fontWeight="500"
            fill="#c3c3c9"
            letterSpacing="0.1em"
          >
            REF: IN.SVG · AZ 045° · EL 30°
          </text>
          <text
            x="32"
            y="198"
            fontFamily="'Encode Sans Expanded', sans-serif"
            fontSize="7.5"
            fontWeight="500"
            fill="#a4a4ac"
            letterSpacing="0.08em"
          >
            LITERACY × SALARY · 3D ISOMETRIC METRIC BARS
          </text>
        </g>

        {/* Isometric Base Plinth (Platform) */}
        <g id="isometric-plinth">
          {/* Front-left drop facet */}
          <polygon
            points="140,114 270,189 270,197 140,122"
            fill="#ffffff"
            stroke="#a4a4ac"
            strokeWidth="0.9"
          />
          {/* Front-right drop facet */}
          <polygon
            points="270,189 400,114 400,122 270,197"
            fill="#ffffff"
            stroke="#a4a4ac"
            strokeWidth="0.9"
          />

          {/* Plinth top plate surface */}
          <polygon
            points="270,39 400,114 270,189 140,114"
            fill="#ffffff"
            stroke="#232327"
            strokeWidth="0.9"
          />

          {/* Isometric floor guide lines */}
          <g stroke="#e0e0e4" strokeWidth="0.8" strokeDasharray="2 4">
            <line x1="172" y1="95" x2="302" y2="170" />
            <line x1="205" y1="76" x2="335" y2="151" />
            <line x1="238" y1="58" x2="368" y2="133" />

            <line x1="368" y1="95" x2="238" y2="170" />
            <line x1="335" y1="76" x2="205" y2="151" />
            <line x1="302" y1="58" x2="172" y2="133" />
          </g>

          {/* Corner Registration Crosshairs (+) */}
          <g stroke="#a4a4ac" strokeWidth="0.8">
            <line x1="134" y1="114" x2="146" y2="114" />
            <line x1="140" y1="108" x2="140" y2="120" />

            <line x1="394" y1="114" x2="406" y2="114" />
            <line x1="400" y1="108" x2="400" y2="120" />

            <line x1="264" y1="39" x2="276" y2="39" />
            <line x1="270" y1="33" x2="270" y2="45" />

            <line x1="264" y1="189" x2="276" y2="189" />
            <line x1="270" y1="183" x2="270" y2="195" />
          </g>

          {/* Corner Anchor Dots */}
          <circle cx="140" cy="114" r="1.6" fill="#232327" />
          <circle cx="400" cy="114" r="1.6" fill="#232327" />
          <circle cx="270" cy="39" r="1.6" fill="#232327" />
          <circle cx="270" cy="189" r="1.6" fill="#232327" />
        </g>

        {/* ============================================================== */}
        {/* Isometric India Map Subcontinent Plate (from in.svg reference)  */}
        {/* ============================================================== */}
        <g id="india-accurate-state-polygons">
          {INDIA_MAP_PATHS.map((sp) => {
            const isTargeted = active?.id === sp.id;
            return (
              <path
                key={sp.id}
                d={sp.d}
                fill={isTargeted ? '#f0f0f4' : '#ffffff'}
                stroke={isTargeted ? '#232327' : '#9c9ca6'}
                strokeWidth={isTargeted ? '1.1' : '0.7'}
                style={{
                  transition: 'fill 0.2s ease, stroke 0.2s ease, stroke-width 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => {
                  const matched = states.find((st) => st.id === sp.id);
                  if (matched) setHoveredState(matched);
                  else setHoveredState({ id: sp.id, name: sp.name, metric: 'STATE REF' });
                }}
              />
            );
          })}
        </g>

        {/* ============================================================== */}
        {/* 3D Isometric Moving State Metric Bars                          */}
        {/* Back-to-front rendering for exact physical occlusion           */}
        {/* ============================================================== */}
        <g id="state-metric-bars">
          {states.map((st, i) => {
            const isHovered = active?.id === st.id;
            const currentH = isHovered ? st.h + 12 : st.h;

            return (
              <g
                key={st.id}
                className="hairline-state-bar"
                style={{
                  cursor: 'pointer',
                  animation: 'hairlineBarWave 3.2s ease-in-out infinite',
                  animationDelay: `${i * 0.18}s`,
                  transition: 'transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
                }}
                onMouseEnter={() => setHoveredState(st)}
              >
                {/* Floor footprint outline on map */}
                <polygon
                  points={`${st.x},${st.y - dy} ${st.x + dx},${st.y} ${st.x},${st.y + dy} ${st.x - dx},${st.y}`}
                  fill="none"
                  stroke="#c3c3c9"
                  strokeWidth="0.8"
                  strokeDasharray="2 3"
                />

                {/* Vertical projection drop guide */}
                <line
                  x1={st.x}
                  y1={st.y}
                  x2={st.x}
                  y2={st.y - currentH}
                  stroke="#a4a4ac"
                  strokeWidth="0.8"
                  strokeDasharray="1 3"
                />

                {/* Front-left vertical face */}
                <polygon
                  points={`${st.x - dx},${st.y} ${st.x},${st.y + dy} ${st.x},${st.y - currentH + dy} ${st.x - dx},${st.y - currentH}`}
                  fill="#ffffff"
                  stroke={isHovered ? '#232327' : '#a4a4ac'}
                  strokeWidth="0.9"
                />

                {/* Front-right vertical face */}
                <polygon
                  points={`${st.x},${st.y + dy} ${st.x + dx},${st.y} ${st.x + dx},${st.y - currentH} ${st.x},${st.y - currentH + dy}`}
                  fill="#ffffff"
                  stroke={isHovered ? '#232327' : '#232327'}
                  strokeWidth="0.9"
                />

                {/* Top cap face (True 30° Isometric Diamond) */}
                <polygon
                  points={`${st.x},${st.y - currentH - dy} ${st.x + dx},${st.y - currentH} ${st.x},${st.y - currentH + dy} ${st.x - dx},${st.y - currentH}`}
                  fill="#ffffff"
                  stroke="#232327"
                  strokeWidth={isHovered ? '1.4' : '1.05'}
                />

                {/* Top cap center anchor dot */}
                <circle
                  cx={st.x}
                  cy={st.y - currentH}
                  r={isHovered ? '2' : '1.4'}
                  fill="#232327"
                />

                {/* Interactive floating label if hovered */}
                {hoveredState?.id === st.id && (
                  <g transform={`translate(${st.x}, ${st.y - currentH - 14})`}>
                    <rect
                      x="-38"
                      y="-12"
                      width="76"
                      height="14"
                      fill="#ffffff"
                      stroke="#232327"
                      strokeWidth="0.8"
                      rx="2"
                    />
                    <text
                      x="0"
                      y="-2"
                      textAnchor="middle"
                      fontFamily="'Michroma', monospace"
                      fontSize="6"
                      fontWeight="700"
                      fill="#232327"
                      letterSpacing="0.04em"
                    >
                      {st.name.toUpperCase()}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </g>

        {/* ============================================================== */}
        {/* Dynamic Hairline Metric Readout Specimen Pill                 */}
        {/* ============================================================== */}
        <g transform="translate(324, 186)">
          <rect
            x="0"
            y="0"
            width="184"
            height="18"
            fill="#ffffff"
            stroke="#232327"
            strokeWidth="0.8"
          />
          <circle cx="10" cy="9" r="2.2" fill="#232327" />
          <text
            x="20"
            y="12"
            fontFamily="'Michroma', monospace"
            fontSize="6.8"
            fontWeight="600"
            fill="#232327"
            letterSpacing="0.05em"
          >
            {active.name.toUpperCase()} · {active.metric}
          </text>
        </g>
      </svg>
    </Box>
  );
}