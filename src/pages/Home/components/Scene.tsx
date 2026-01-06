import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stats, Text } from "@react-three/drei";
import { easing } from "maath";
import Model from "./Model";

function Rig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [-state.pointer.x * 2.5, -state.pointer.y * 1.5, 15],
      0.3,
      delta
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function AdaptiveText() {
  const { size } = useThree();
  const isSmall = size.width <= 400;

  return (
    <group position={[0, 0, -5]}>
      <Text
        font="/fonts/Inter-Bold.ttf"
        fontSize={isSmall ? 1.5 : 4}
        color="black"
        anchorX="center"
        anchorY="middle"
        position={[0, 1.2, 0]}
        letterSpacing={-0.05}
      >
        SC. STUDIO
      </Text>
    </group>
  );
}

export default function Scene() {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [0, 0, 15], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        alpha: false,
      }}
    >
      <color attach="background" args={["#ffffff"]} />
      <Model />
      <AdaptiveText />
      <Stats />
      <Rig />
    </Canvas>
  );
}
