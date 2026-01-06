import { Canvas, useFrame } from "@react-three/fiber";
import { Text } from "@react-three/drei";
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

export default function Scene() {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [0, 0, 15], fov: 45 }}
      dpr={[1, 1.5]} // Limitamos DPR máximo para performance
      gl={{
        antialias: true,
        powerPreference: "high-performance", // Pide GPU dedicada si hay
        alpha: false,
      }}
    >
      {/* Fondo sólido simple: Blanco */}
      <color attach="background" args={["#ffffff"]} />

      {/* Modelos 3D */}
      <Model />

      {/* Texto simple: Negro */}
      <group position={[0, 0, -5]}>
        <Text
          font="/fonts/Inter-Bold.ttf"
          fontSize={4}
          color="black"
          anchorX="center"
          anchorY="middle"
          position={[0, 1.2, 0]}
          letterSpacing={-0.05}
        >
          SC. STUDIO
        </Text>
      </group>

      <Rig />
    </Canvas>
  );
}
