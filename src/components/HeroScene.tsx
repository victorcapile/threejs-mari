import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";

const palette = ["#f6b8b0", "#f2d6cf", "#9ac7d6", "#e5c1b7"];

function Blob({
  position,
  scale,
  color,
  distort,
  speed,
}: {
  position: [number, number, number];
  scale: number;
  color: string;
  distort: number;
  speed: number;
}) {
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={2.5}>
      <mesh position={position} scale={scale}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={1.6}
          roughness={0.15}
          metalness={0.05}
        />
      </mesh>
    </Float>
  );
}

function BlobCluster() {
  const group = useRef<Group>(null);

  useFrame(({ pointer }) => {
    if (!group.current) return;
    group.current.rotation.y = pointer.x * 0.4;
    group.current.rotation.x = pointer.y * 0.25;
  });

  return (
    <group ref={group}>
      <Blob position={[1.8, 0.8, 0]} scale={1.3} color={palette[0]} distort={0.35} speed={1.6} />
      <Blob position={[-1.2, -0.6, -0.4]} scale={1.1} color={palette[1]} distort={0.4} speed={1.2} />
      <Blob position={[0.2, 1.6, -0.8]} scale={0.9} color={palette[2]} distort={0.28} speed={1.4} />
      <Blob position={[0.4, -1.5, 0.6]} scale={1.05} color={palette[3]} distort={0.32} speed={1.1} />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas className="hero-canvas" camera={{ position: [0, 0, 6.5], fov: 45 }}>
      <ambientLight intensity={0.65} />
      <directionalLight position={[4, 3, 4]} intensity={1} />
      <pointLight position={[-4, -2, 4]} intensity={0.6} />
      <BlobCluster />
    </Canvas>
  );
}
