import { Canvas, useFrame } from "@react-three/fiber";
import { PointMaterial, Points } from "@react-three/drei";
import { useMemo, useRef } from "react";
import type { Points as PointsType } from "three";

const PALETTE = ["#f6b8b0", "#99c8d7", "#e2b49a"]; 

function SparkField() {
  const ref = useRef<PointsType>(null);
  const positions = useMemo(() => {
    const count = 600;
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      array[i * 3] = (Math.random() - 0.5) * 8;
      array[i * 3 + 1] = (Math.random() - 0.5) * 5;
      array[i * 3 + 2] = (Math.random() - 0.5) * 3;
    }
    return array;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.elapsedTime * 0.03;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color={PALETTE[0]}
        size={0.035}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

export default function ParticlesScene({ className }: { className?: string }) {
  return (
    <Canvas className={className ?? "particles-canvas"} camera={{ position: [0, 0, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <SparkField />
    </Canvas>
  );
}
