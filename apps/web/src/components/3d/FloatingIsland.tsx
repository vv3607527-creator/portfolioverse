"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FloatingIslandProps {
  scrollProgress?: number;
}

export function FloatingIsland({ scrollProgress = 0 }: FloatingIslandProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  // Procedural geometry: a torus knot with custom geometry
  const geometry = useMemo(() => {
    const geo = new THREE.TorusKnotGeometry(1.2, 0.4, 128, 16);
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Slow rotation
    groupRef.current.rotation.x += delta * 0.15;
    groupRef.current.rotation.y += delta * 0.2;

    // Floating motion
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;

    // Scale based on scroll (subtle)
    const scale = 1 + scrollProgress * 0.3;
    groupRef.current.scale.setScalar(scale);
  });

  return (
    <group ref={groupRef}>
      {/* Main torus knot */}
      <mesh ref={meshRef} geometry={geometry}>
        <meshPhysicalMaterial
          color="#8b5cf6"
          metalness={0.3}
          roughness={0.2}
          wireframe={false}
          envMapIntensity={1.5}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Wireframe overlay */}
      <mesh geometry={geometry} scale={1.02}>
        <meshBasicMaterial
          color="#6366f1"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* Orbiting rings */}
      <Ring radius={2.0} color="#8b5cf6" speed={0.3} />
      <Ring radius={2.4} color="#6366f1" speed={-0.2} />
      <Ring radius={1.6} color="#06b6d4" speed={0.4} />
    </group>
  );
}

function Ring({ radius, color, speed }: { radius: number; color: string; speed: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x = Math.PI / 2;
      ref.current.rotation.z += delta * speed;
    }
  });

  return (
    <mesh ref={ref}>
      <ringGeometry args={[radius - 0.02, radius, 64]} />
      <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
    </mesh>
  );
}
