import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function Ribbon() {
  const mesh = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    mesh.current.rotation.y = clock.elapsedTime * 0.25;
    mesh.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.2;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.8}>
      <mesh ref={mesh}>
        <torusKnotGeometry args={[0.9, 0.28, 140, 18]} />
        <meshStandardMaterial color="#f4c7bd" roughness={0.25} metalness={0.2} />
      </mesh>
    </Float>
  );
}

export default function RibbonScene({ className }: { className?: string }) {
  return (
    <Canvas className={className} camera={{ position: [0, 0, 4.8], fov: 55 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 3, 4]} intensity={1} />
      <Ribbon />
    </Canvas>
  );
}
