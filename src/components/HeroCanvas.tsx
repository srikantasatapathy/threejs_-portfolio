'use client';

import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
// Removed Points, PointMaterial. Added Sphere, MeshDistortMaterial (or MeshStandardMaterial)
import { OrbitControls, Preload, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Component for a single animated sphere
const AnimatedSphere = ({ position, color, scale, rotationSpeed, floatIntensity }: { position: THREE.Vector3, color: string, scale: number, rotationSpeed: number, floatIntensity: number }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const timeRef = useRef(Math.random() * Math.PI * 2); // Random start time for floating

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Rotation
      meshRef.current.rotation.x += delta * rotationSpeed * 0.5;
      meshRef.current.rotation.y += delta * rotationSpeed;

      // Floating effect using sine wave
      timeRef.current += delta * 0.5; // Adjust speed of floating
      meshRef.current.position.y = position.y + Math.sin(timeRef.current) * floatIntensity;
    }
  });

  return (
    // Using MeshDistortMaterial for a more dynamic look, could use MeshStandardMaterial too
    <Sphere ref={meshRef} args={[1, 32, 32]} position={position} scale={scale}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.3} // Adjust distortion
        speed={1 + Math.random() * 2} // Randomize speed slightly
        roughness={0.2}
      />
      {/* Alternative: Standard Material
      <meshStandardMaterial color={color} roughness={0.5} metalness={0.1} />
      */}
    </Sphere>
  );
};


// Component to manage multiple spheres
const FloatingSpheres = ({ count = 15 }) => { // Adjust count as needed
  const { viewport } = useThree(); // Get viewport dimensions for positioning

  // Generate sphere data only once
  const spheres = useMemo(() => {
    const tempSpheres = [];
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FED766', '#8A4FFF', '#F9A826', '#5786F5']; // Example palette
    for (let i = 0; i < count; i++) {
      // Position spheres randomly within the viewport, spread out
      const x = (Math.random() - 0.5) * viewport.width * 1.5;
      const y = (Math.random() - 0.5) * viewport.height * 1.2;
      const z = (Math.random() - 0.5) * 8 - 4; // Depth range

      tempSpheres.push({
        id: i,
        position: new THREE.Vector3(x, y, z),
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: 0.4 + Math.random() * 0.6, // Random size
        rotationSpeed: 0.1 + Math.random() * 0.2, // Random rotation speed
        floatIntensity: 0.1 + Math.random() * 0.2 // Random float intensity
      });
    }
    return tempSpheres;
  }, [count, viewport.width, viewport.height]); // Recalculate if count or viewport changes

  return (
    <group>
      {spheres.map(sphere => (
        <AnimatedSphere
          key={sphere.id}
          position={sphere.position}
          color={sphere.color}
          scale={sphere.scale}
          rotationSpeed={sphere.rotationSpeed}
          floatIntensity={sphere.floatIntensity}
        />
      ))}
    </group>
  );
};


// Main Canvas component
const HeroCanvas = () => {
  return (
    <Canvas
      frameloop="demand" // Render only when needed or animating
      camera={{ position: [0, 0, 10], fov: 50 }} // Adjust camera position/FOV to see spheres
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
    >
      <Suspense fallback={null}>
        {/* Add some lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 10, 7]} intensity={1.2} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} />

        {/* Removed Stars, added FloatingSpheres */}
        <FloatingSpheres count={15} /> {/* Adjust the number of spheres */}

        {/* OrbitControls can be useful for debugging positions */}
        {/* <OrbitControls enableZoom={true} enablePan={true} /> */}
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default HeroCanvas;