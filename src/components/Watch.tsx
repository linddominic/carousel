import { useGLTF } from '@react-three/drei';

export function Watch(props) {
  const { nodes, materials } = useGLTF('/models/watch-v1.glb');
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Object005_glass_0.geometry}
        material={materials.glass}
      ></mesh>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object006_watch_0.geometry}
        material={materials.watch}
      />
    </group>
  );
}
