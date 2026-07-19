"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { FloatingIsland } from "./FloatingIsland";
import { ParticleField } from "./ParticleField";

interface HeroSceneProps {
  scrollProgress?: number;
}

function SceneContent({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#6366f1" />
      <pointLight position={[0, 3, 0]} intensity={0.5} color="#8b5cf6" />
      <Environment preset="city" />
      <FloatingIsland scrollProgress={scrollProgress} />
      <ParticleField count={150} />
      <ContactShadows
        position={[0, -2.5, 0]}
        opacity={0.4}
        scale={10}
        blur={2.5}
        far={4}
      />
    </>
  );
}

export function HeroScene({ scrollProgress = 0 }: HeroSceneProps) {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 2, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneContent scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
