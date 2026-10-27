import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, Center } from '@react-three/drei'
import { Box } from '@chakra-ui/react'

function RotatingModel({ scale = 0.68 }) {
  const { scene } = useGLTF('/munsel.glb')
  const groupRef = useRef()

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25
    }
  })

  return (
    <group ref={groupRef}>
      <primitive object={scene} scale={scale} />
    </group>
  )
}

export default function MunselModel() {
  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      width="100%"
      height="100%"
      pointerEvents="none"
    >
      <div style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
        <Canvas
          orthographic
          camera={{ position: [5, -1, 7], zoom: 72 }}
          style={{ pointerEvents: 'none', width: '100%', height: '100%' }}
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[10, 10, 10]} intensity={2.1} />
          {/* Shift model horizontally towards the right edge and up */}
          <group position={[7.7, 0.2345, -3.8]}>
            <Center>
              <RotatingModel scale={0.9} />
            </Center>
          </group>
        </Canvas>
      </div>
    </Box>
  )
}

useGLTF.preload('/munsel.glb')
