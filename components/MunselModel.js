import React, { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, OrbitControls, Center } from '@react-three/drei'

function Model(props) {
  const { scene } = useGLTF('/munsel.glb')
  const ref = useRef()
  
  return <primitive object={scene} ref={ref} {...props} />
}

export default function MunselModel() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Canvas orthographic camera={{ position: [5, 5, 5], zoom: 40 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Center>
          <Model scale={0.35} />
        </Center>
        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  )
}

useGLTF.preload('/munsel.glb')
