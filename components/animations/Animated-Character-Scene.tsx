"use client";

import {
  ContactShadows,
  Environment,
  Html,
  useAnimations,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { Group } from "three";

// Loading component
function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-white text-sm">Loading... {Math.round(progress)}%</p>
      </div>
    </Html>
  );
}

// 3D Model Component
function WarmupModel({ scrollProgress }: { scrollProgress: number }) {
  const group = useRef<Group>(null);
  const { scene, animations } = useGLTF("/models/warmup.glb");
  const { actions, mixer } = useAnimations(animations, group);

  useEffect(() => {
    // Play the first animation if available
    if (actions && Object.keys(actions).length > 0) {
      const firstAction = actions[Object.keys(actions)[0]];
      if (firstAction) {
        firstAction.play();
        firstAction.paused = false;
      }
    }
  }, [actions]);

  useFrame((state, delta) => {
    if (mixer && actions) {
      // Get the first animation action
      const firstActionKey = Object.keys(actions)[0];
      const firstAction = actions[firstActionKey];

      if (firstAction && firstAction.getClip()) {
        // Calculate animation time based on scroll progress
        const animationDuration = firstAction.getClip().duration;
        const targetTime = scrollProgress * animationDuration;

        // Update animation time directly based on scroll
        firstAction.time = targetTime;
        firstAction.enabled = true;

        // Sync mixer time with scroll
        mixer.setTime(targetTime);
        mixer.update(0); // Update without advancing time
      }
    }

    if (group.current) {
      // Gentle floating animation (reduced intensity)
      group.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.2) * 0.1 - 0.5;

      // Rotation based on scroll with smoother transitions
      group.current.rotation.y = scrollProgress * Math.PI * 0.2;

      // Scale based on scroll for depth effect (more responsive)
      const scale = 1.8 + scrollProgress * 0.5;
      group.current.scale.setScalar(scale);
    }
  });

  return (
    <group ref={group}>
      <primitive
        object={scene}
        scale={1.8}
        position={[0, -1.8, 0]}
        rotation={[0, 0, 0]}
      />
    </group>
  );
} // Background 3D Scene Component
interface BackgroundCharacterSceneProps {
  scrollProgress: number;
}

export function BackgroundCharacterScene({
  scrollProgress,
}: BackgroundCharacterSceneProps) {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{
        zIndex: 5,
      }}
    >
      <Canvas
        camera={{
          position: [1, 3, 7],
          fov: 50,
        }}
        gl={{
          antialias: true,
          alpha: true,
          preserveDrawingBuffer: true,
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={<Loader />}>
          {/* Enhanced lighting for better visibility */}
          <ambientLight intensity={0.8} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={1.2}
            color="#ffffff"
          />
          <pointLight position={[-5, 5, -5]} intensity={0.8} color="#4f46e5" />
          <pointLight position={[5, -2, 5]} intensity={0.6} color="#f59e0b" />

          {/* 3D Model */}
          <WarmupModel scrollProgress={scrollProgress} />

          {/* Environment for better lighting */}
          <Environment preset="night" />

          {/* Ground shadow */}
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.3}
            scale={8}
            blur={2}
            far={4}
            color="#000000"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Hero 3D Scene Component (for main display)
interface AnimatedCharacterSceneProps {
  scrollProgress: number;
}

export function AnimatedCharacterScene({
  scrollProgress,
}: AnimatedCharacterSceneProps) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{
          position: [0, 0, 4],
          fov: 45,
        }}
        gl={{
          antialias: true,
          alpha: true,
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={<Loader />}>
          {/* Lighting */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <pointLight position={[-10, -10, -10]} intensity={0.5} />

          {/* 3D Model */}
          <WarmupModel scrollProgress={scrollProgress} />

          {/* Environment */}
          <Environment preset="city" />

          {/* Ground shadow */}
          <ContactShadows
            position={[0, -2, 0]}
            opacity={0.4}
            scale={8}
            blur={1.5}
            far={4.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Preload the model
useGLTF.preload("/models/warmup.glb");
