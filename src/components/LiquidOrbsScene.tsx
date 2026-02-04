import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { MeshStandardMaterial, Color } from "three";
import { MarchingCubes } from "three/examples/jsm/objects/MarchingCubes.js";

type Orb = {
  speed: number;
  offset: number;
  radius: number;
  color: string;
};

const palette = ["#f7d9d4", "#e7eef2", "#f1e2d7"];

function Metaballs() {
  const material = useMemo(() => {
    const mat = new MeshStandardMaterial({
      color: "#ffffff",
      roughness: 0.38,
      metalness: 0.08,
      vertexColors: true,
    });
    return mat;
  }, []);

  const marching = useMemo(() => new MarchingCubes(32, material, true, true), [material]);
  const orbs = useRef<Orb[]>([
    { speed: 0.6, offset: 0, radius: 1.45, color: palette[0] },
    { speed: 0.8, offset: 2, radius: 1.1, color: palette[1] },
    { speed: 0.5, offset: 4, radius: 0.95, color: palette[2] },
    { speed: 0.7, offset: 6, radius: 0.9, color: palette[0] },
    { speed: 0.4, offset: 8, radius: 0.85, color: palette[1] },
    { speed: 0.9, offset: 10, radius: 0.8, color: palette[2] },
  ]);

  marching.isolation = 40;
  marching.scale.set(1.7, 1.7, 1.7);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    marching.reset();

    orbs.current.forEach((orb, index) => {
      const phase = t * orb.speed + orb.offset;
      const x = 0.5 + Math.sin(phase + index) * 0.22;
      const y = 0.5 + Math.cos(phase * 0.9 + index) * 0.22;
      const z = 0.5 + Math.sin(phase * 0.7 + index) * 0.22;

      marching.addBall(x, y, z, orb.radius, 0.2, new Color(orb.color));
    });

    marching.update();
  });

  return <primitive object={marching} />;
}

export default function LiquidOrbsScene({ className }: { className?: string }) {
  return (
    <Canvas className={className} camera={{ position: [0, 0, 4.6], fov: 55 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 4]} intensity={1} />
      <Metaballs />
    </Canvas>
  );
}
