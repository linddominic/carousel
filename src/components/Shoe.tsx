import { Float, Instance, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

export function Shoe({ color = new THREE.Color(), ...props }) {
  const { nodes, materials } = useGLTF('models/shoe.glb');
  const ref = useRef();

  return (
    <group {...props} ref={ref}>
      <Float size={2} distance={10} rotationIntensity={1.5}>
        <mesh
          castShadow
          receiveShadow
          material={materials.phong1SG}
          geometry={nodes.Shoe.geometry}
        />
      </Float>
    </group>
  );
}
