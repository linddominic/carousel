import {
  ContactShadows,
  Environment,
  MeshPortalMaterial,
  OrbitControls,
  ScrollControls,
  Scroll,
  useCursor,
  useScroll,
} from '@react-three/drei';

import * as THREE from 'three';
import { Watch } from './Watch';
import { Shoe } from './Shoe';
import { AmbientLight } from 'three';
import { useRef, useState } from 'react';
import { useFrame, extend, useThree } from '@react-three/fiber';
import { easing, geometry } from 'maath';
import { useLocation, useRoute } from 'wouter';
extend(geometry);

function Frame({
  id,
  name,
  author,
  bg,
  width = 3,
  height = 4,
  children,
  ...props
}) {
  const portal = useRef();
  const [zoomed, setZoomed] = useState(false);
  const [, setLocation] = useLocation();
  const [, params] = useRoute('/item/:id');
  console.log({ params });
  const [hovered, hover] = useState(false);
  useCursor(hovered);
  useFrame((state, dt) =>
    easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt)
  );

  console.log({ zoomed });
  return (
    <group {...props}>
      <mesh
        name={id}
        onDoubleClick={(e) => (
          e.stopPropagation(), setLocation('/item/' + e.object.name)
        )}
        onPointerOver={(e) => hover(true)}
        onPointerOut={() => hover(false)}
      >
        <roundedPlaneGeometry args={[width, height, 0.0]} />
        <MeshPortalMaterial
          ref={portal}
          events={params?.id === id}
          side={THREE.DoubleSide}
        >
          <color attach='background' args={[bg]} />
          {children}
        </MeshPortalMaterial>
      </mesh>
    </group>
  );
}

export const Experience = () => {
  const w = 3;
  const gap = 0.5;
  const xW = w + gap;
  const ref = useRef();

  const { width } = useThree((state) => state.viewport);

  console.log({ width });

  const getPosition = (index) => {
    return [index * (w + gap), 0, 0];
  };

  const scroll = useScroll();

  const frames = [0, 1, 2];

  useFrame((state, delta) => {
    // ref.current.children.forEach((child, index) => {
    //   // Give me a value between 0 and 1
    //   //   starting at the position of my item
    //   //   ranging across 4 / total length
    //   //   make it a sine, so the value goes from 0 to 1 to 0.
    //   const y = scroll.curve(index / 3 - 1.5 / 3, 4 / 3);
    //   easing.damp(child.scale, 'y', 0.15 + y / 6, 0.15, delta);
    // });
  });
  return (
    <>
      {/* <OrbitControls /> */}
      <ScrollControls
        pages={(width - xW + frames.length * xW) / width}
        horizontal
        damping={0.1}
      >
        <Scroll>
          {frames.map((index) => (
            <Frame
              key={index}
              id={`0` + index}
              name={`pick\nles`}
              author='Omar Faruq Tawsif'
              bg='#e4cdac'
              position={getPosition(index)}
              rotation={[0, 0, 0]}
            >
              <group>
                <ambientLight intensity={0.5} />
                <Environment preset='city' />

                <spotLight
                  position={[10, 10, 10]}
                  angle={0.15}
                  penumbra={0.2}
                  shadow-mapSize={2048}
                  castShadow
                />
                <mesh>
                  <meshNormalMaterial />
                  <Shoe
                    rotation={[0, -1, -0.2]}
                    scale={0.7}
                    position={[-0.8, 1, 1]}
                  />

                  <Shoe
                    rotation={[0, -2.2, -0.3]}
                    scale={0.7}
                    position={[1.1, 1, -0.25]}
                  />
                  <Shoe
                    rotation={[0, -2, -0.25]}
                    scale={0.7}
                    position={[-0.55, -0.8, 2]}
                  />
                  <Watch
                    position={[0, 0, 0]}
                    rotation={[-Math.PI / 2, 0, 0]}
                    scale={0.003}
                  />
                </mesh>
              </group>
            </Frame>
          ))}
        </Scroll>
      </ScrollControls>
    </>
  );
};
