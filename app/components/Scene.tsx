"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function ChainsawModel({ isAnimating }: { isAnimating: boolean }) {
  const { scene, animations } = useGLTF("/animated-chainsaw.glb") as any;
  const modelRef = useRef<THREE.Group>(null);
  const mixer = useRef<THREE.AnimationMixer | null>(null);

  // Update animation on each frame
  useFrame((_, delta) => {
    if (mixer.current && isAnimating) {
      mixer.current.update(delta);
    }
  });

  // Initialize AnimationMixer and play animations
  if (!mixer.current && animations.length) {
    mixer.current = new THREE.AnimationMixer(scene);
    animations.forEach((clip: THREE.AnimationClip) => {
      mixer.current?.clipAction(clip).play();
    });
  }

  // Ensure materials and shadows are applied correctly
  scene.traverse((object: any) => {
    if (object.isMesh) {
      object.castShadow = true;
      object.receiveShadow = true;
    }
  });

  return <primitive ref={modelRef} object={scene} />;
}

export default function Scene() {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Interactive 3D Model</h1>
          <p className="text-gray-400">
            Click the button below to animate the model
          </p>
        </div>

        <Card className="bg-gray-800 border-gray-700 p-6 mb-8">
          <div className="h-[500px] w-full">
            <Canvas
              shadows
              camera={{ position: [0, 0, 5], fov: 75 }}
              style={{ background: "transparent" }}
            >
              <ambientLight intensity={0.5} />
              <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} castShadow />
              <pointLight position={[-10, -10, -10]} />
              <ChainsawModel isAnimating={isAnimating} />
              <Environment preset="sunset" />
              <OrbitControls />
            </Canvas>
          </div>
        </Card>

        <div className="text-center">
          <Button
            onClick={() => setIsAnimating(!isAnimating)}
            variant="default"
            className="bg-indigo-600 hover:bg-indigo-700"
          >
            {isAnimating ? "Stop Animation" : "Start Animation"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Ensure to install the necessary dependencies if not already installed:
// npm install @react-three/fiber @react-three/drei three
