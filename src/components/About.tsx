'use client';

import React, { useRef, Suspense } from "react";
import * as THREE from "three";
import {
  OrbitControls,
  Preload,
  Text,
  Points,
  PointMaterial,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";

// Component for the star background
const BackgroundStars = (props: any) => {
  const ref = useRef<THREE.Points>(null!);
  const [sphere] = React.useState(() => {
    const positions = new Float32Array(8000 * 3); // 5000 particles
    for (let i = 0; i < 5000; i++) {
      const r = 4.5 + Math.random() * 8; // Spread them out a bit more
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 20;
      ref.current.rotation.y -= delta / 25;
    }
  });

  return (
    <Points
      ref={ref}
      positions={sphere}
      stride={3}
      frustumCulled={false}
      {...props}
    >
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.005}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex items-center justify-center relative"
    >
      {/* Add Canvas wrapper for the BackgroundStars */}
      <Canvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
        camera={{ position: [0, 0, 12], fov: 55 }}
      >
        <Suspense fallback={null}>
          <BackgroundStars />
        </Suspense>
        <Preload all />
      </Canvas>

      <div className="container mx-auto px-4 z-10">
        <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
        <p className="text-lg text-center max-w-2xl mx-auto">
          Hy, my name is Srikant Satapathy, I am a MERN full stack developer
          with 3 years of experience. In these 3 years, I have been developing
          various mobile and web applications. Always ready to dive into new
          technologies. Also, I am working on Python and AI/ML projects like
          developing models, MCP, and OpenCV projects.
        </p>
      </div>
    </section>
  );
};

export default About;
