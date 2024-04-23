import { Canvas, useThree } from '@react-three/fiber';
import { Experience } from './components/Experience';
import { CameraControls, OrbitControls } from '@react-three/drei';
import { useEffect, useState } from 'react';
import * as THREE from 'three';
import { useRoute } from 'wouter';

function App() {
  const [, params] = useRoute('/item/:id');

  useEffect(() => {
    console.log(params?.id);
  }, [params]);

  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 10], fov: 25 }}
      // eventSource={document.getElementById('root')}
      // eventPrefix='client'
    >
      {/* <OrbitControls
        enabled={Boolean(params?.id)}
        enableZoom={false}
        reset={true}
      /> */}
      <color attach='background' args={['#ececec']} />
      <Experience />
    </Canvas>
  );
}

export default App;
