import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Center } from '@react-three/drei'
import { Box, useBreakpointValue } from '@chakra-ui/react'

function RotatingModel({ scale = 0.48 }) {
  const { scene } = useGLTF('/munsel.glb')
  const groupRef = useRef()

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25
    }
  })

  return (
    <group position={[0, -1, 0]}>
      <Center>
        <group ref={groupRef}>
          <primitive object={scene} scale={scale} />
        </group>
      </Center>
    </group>
  )
}

export default function MunselModel() {
  const zoom = useBreakpointValue({ base: 30, sm: 40, md: 60, lg: 68 }) ?? 64
  const scale = useBreakpointValue({ base: 0.45, sm: 0.5, md: 0.62, lg: 0.7 }) ?? 0.65

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      pointerEvents="none"
    >
      <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
        <Canvas
          orthographic
          camera={{
            position: [5, 3, 5],
            zoom
          }}
          style={{ pointerEvents: 'none', width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[10, 10, 10]} intensity={1.5} />
          <RotatingModel scale={scale} />
        </Canvas>
      </div>
    </Box>
  )
}

useGLTF.preload('/munsel.glb')
