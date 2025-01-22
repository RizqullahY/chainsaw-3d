"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";

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

  // Fetch animation status from the API
  useEffect(() => {
    // Fetch data from the API to get the animation status
    const fetchAnimationStatus = async () => {
      try {
        const response = await axios.get(
          "https://supabase-express-api-raflyasligalek.vercel.app/api/animated-control"
        );
        if (response.data.status === "success") {
          setIsAnimating(response.data.data.animated); // Set animation based on the API response
        }
      } catch (error) {
        console.error("Error fetching animation status:", error);
      }
    };

    fetchAnimationStatus();
  }, []); // Only run this effect on component mount

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Interactive 3D Model</h1>
        </div>

        <Card className="bg-gray-800 border-gray-700 p-6 mb-8 relative">
          <div className="h-[500px] w-full">
            <Canvas
              shadows
              camera={{ position: [0, 0, 6], fov: 75 }} // Zoom out slightly
              style={{ background: "transparent" }}
            >
              <ambientLight intensity={0.5} />
              <spotLight
                position={[10, 10, 10]}
                angle={0.15}
                penumbra={1}
                castShadow
              />
              <pointLight position={[-10, -10, -10]} />
              <ChainsawModel isAnimating={isAnimating} />
              <Environment preset="sunset" />
              <OrbitControls />
            </Canvas>
          </div>

          {/* Watermark */}
          <div className="absolute bottom-4 left-4 text-sm text-gray-400">
            <span>
              Animated Chainsaw Low-Poly (Free-Download){" "}
              <a
                href="https://skfb.ly/6vLWR"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                https://skfb.ly/6vLWR
              </a>
            </span>
          </div>
        </Card>
      </div>

      <div className="text-center mt-4">
        <p className="text-lg font-medium text-gray-300">
          {isAnimating
            ? "The animation is running!"
            : "The animation is stopped."}
        </p>
        <p className="text-base font-medium text-gray-300">
          [POST] https://supabase-express-api-raflyasligalek.vercel.app/api/animated-control
        </p>
      </div>
    </div>
  );
}

// Ensure to install the necessary dependencies if not already installed:
// npm install @react-three/fiber @react-three/drei three axios
