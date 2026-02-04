import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import type { Group } from "three";
import type { MutableRefObject } from "react";

const palette = ["#f6b8b0", "#f2d6cf", "#9ac7d6", "#e5c1b7", "#f4e6df"];

const orbs = [
  { position: [-2.0, 0.6, 0.1], size: 0.55, color: palette[0] },
  { position: [-1.2, 1.4, -0.6], size: 0.4, color: palette[1] },
  { position: [-0.2, -0.6, 0.2], size: 0.5, color: palette[2] },
  { position: [0.8, 1.5, -0.4], size: 0.45, color: palette[3] },
  { position: [1.8, 0.5, 0.3], size: 0.6, color: palette[0] },
  { position: [2.2, -0.9, -0.2], size: 0.38, color: palette[4] },
  { position: [0.6, -1.6, -0.6], size: 0.35, color: palette[1] },
  { position: [-1.4, -1.2, -0.4], size: 0.32, color: palette[3] },
  { position: [1.6, -1.6, 0.4], size: 0.3, color: palette[2] },
  { position: [0.4, 0.1, -1.2], size: 0.7, color: palette[4] },
  { position: [2.4, 1.1, -0.4], size: 0.28, color: palette[1] },
  { position: [-2.2, -0.2, 0.6], size: 0.25, color: palette[2] },
  { position: [1.2, 2.0, 0.1], size: 0.33, color: palette[3] },
];

function Orb({
  position,
  size,
  color,
}: {
  position: [number, number, number];
  size: number;
  color: string;
}) {
  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={2.2}>
      <mesh position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial color={color} roughness={0.25} metalness={0.15} />
      </mesh>
    </Float>
  );
}

function OrbCluster({
  pointerRef,
}: {
  pointerRef?: MutableRefObject<{ x: number; y: number }>;
}) {
  const group = useRef<Group>(null);

  useFrame(() => {
    if (!group.current || !pointerRef) return;
    group.current.rotation.y = pointerRef.current.x * 0.25;
    group.current.rotation.x = pointerRef.current.y * 0.2;
  });

  return (
    <group ref={group}>
      {orbs.map((orb) => (
        <Orb key={orb.position.join("-")} {...orb} />
      ))}
    </group>
  );
}

export default function OrbScene({
  className,
  pointerRef,
}: {
  className?: string;
  pointerRef?: MutableRefObject<{ x: number; y: number }>;
}) {
  return (
    <Canvas
      className={className ?? "orb-canvas"}
      camera={{ position: [0.4, 0, 6], fov: 50 }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 3, 4]} intensity={1.1} />
      <OrbCluster pointerRef={pointerRef} />
    </Canvas>
  );
}
