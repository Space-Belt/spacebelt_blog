"use client";

import { Float, MeshDistortMaterial, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import type { Mesh } from "three";
import * as THREE from "three";

function Belt() {
  const ref = useRef<Mesh>(null);

  useFrame(({ clock, pointer }) => {
    if (!ref.current) return;
    ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.35) * 0.22 + pointer.y * 0.2;
    ref.current.rotation.y = clock.elapsedTime * 0.18 + pointer.x * 0.26;
  });

  return (
    <mesh ref={ref} rotation={[0.7, 0.2, 0.2]}>
      <torusKnotGeometry args={[1.25, 0.16, 180, 16, 3, 7]} />
      <MeshDistortMaterial
        color="#58e0c4"
        emissive="#184d45"
        metalness={0.72}
        roughness={0.2}
        distort={0.23}
        speed={1.4}
      />
    </mesh>
  );
}

function ParticleRibbon() {
  const points = useMemo(() => {
    const vertices = [];
    for (let i = 0; i < 420; i += 1) {
      const angle = i * 0.15;
      const radius = 1.9 + Math.sin(i * 0.08) * 0.18;
      vertices.push(
        Math.cos(angle) * radius,
        Math.sin(i * 0.05) * 0.22,
        Math.sin(angle) * radius
      );
    }
    return new Float32Array(vertices);
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.12;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#f7c948" transparent opacity={0.75} />
    </points>
  );
}

export function HeroOrbit() {
  return (
    <div className="hero-orbit" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5], fov: 48 }} dpr={[1, 1.7]}>
        <color attach="background" args={["#080a0d"]} />
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 5, 4]} intensity={2.2} color="#ffffff" />
        <pointLight position={[-3, -2, 3]} intensity={2.4} color="#ff6b6b" />
        <Suspense fallback={null}>
          <Float speed={1.4} rotationIntensity={0.35} floatIntensity={0.5}>
            <Belt />
            <ParticleRibbon />
          </Float>
          <Stars radius={45} depth={30} count={1100} factor={3} saturation={0} fade speed={0.45} />
        </Suspense>
      </Canvas>
    </div>
  );
}
