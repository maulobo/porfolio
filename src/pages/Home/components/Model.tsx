import {
  useGLTF,
  Float,
  Center,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const MeshBall = ({ url, config }: { url: string; config: any }) => {
  const { nodes } = useGLTF(url);
  const mesh = Object.values(nodes).find(
    (node) => (node as THREE.Mesh).isMesh
  ) as THREE.Mesh;

  if (!mesh) return null;

  return (
    <group position={new THREE.Vector3(...config.position)}>
      <Float
        speed={config.floatSpeed}
        rotationIntensity={config.rotationIntensity}
        floatIntensity={config.floatIntensity}
        floatingRange={[-0.2, 0.2]}
      >
        <Center>
          <mesh geometry={mesh.geometry} scale={config.scale}>
            <MeshTransmissionMaterial
              backside={false}
              samples={4}
              resolution={512}
              thickness={1}
              transmission={1}
              roughness={0}
              ior={1.5}
              chromaticAberration={0.05}
              anisotropy={0}
              color="#ffffff"
            />
          </mesh>
        </Center>
      </Float>
    </group>
  );
};

export default function Model() {
  const { size } = useThree();
  const isSmall = size.width <= 400;

  const balls = [
    // {
    //   url: "/3d/bomb-gp.glb",
    //   position: [-1, 0, 2],
    //   scale: 1,
    //   floatSpeed: 2,
    //   floatIntensity: 3,
    //   rotationIntensity: 4,
    // },
    {
      url: "/3d/meshballs1.glb",
      position: isSmall ? [2, 3.5, 2] : [0, 0, 2],
      scale: 1,
      floatSpeed: 2,
      floatIntensity: 3,
      rotationIntensity: 4,
    },
  ];

  return (
    <group dispose={null}>
      {balls.map((config, i) => (
        <MeshBall key={i} url={config.url} config={config} />
      ))}
    </group>
  );
}
