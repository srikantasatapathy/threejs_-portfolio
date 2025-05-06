'use client';

import React, { Suspense, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Preload, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Particle component
const Stars = (props: any) => {
  const ref = useRef<THREE.Points>(null!);
  const { size, viewport } = useThree(); // Get viewport size for responsiveness
  const [sphere] = useState(() => {
    // Generate random points within a sphere
    const positions = new Float32Array(5000 * 3); // 5000 particles
    for (let i = 0; i < 5000; i++) {
      const r = 4 + Math.random() * 6; // Radius range
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  });

  // Mouse position state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Update mouse position (consider debouncing/throttling for performance)
  const handleMouseMove = (event: MouseEvent) => {
    // Normalize mouse coordinates (-1 to +1)
    const x = (event.clientX / size.width) * 2 - 1;
    const y = -(event.clientY / size.height) * 2 + 1;
    setMousePos({ x, y });
  };

  React.useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [size.width, size.height]); // Re-add listener if size changes


  useFrame((state, delta) => {
    if (ref.current) {
      // Rotate the whole system
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;

      // Optional: Make particles react slightly to mouse
      // This is a simple effect; more complex interactions are possible
      const targetRotationX = mousePos.y * 0.1;
      const targetRotationY = mousePos.x * 0.1;
      ref.current.rotation.x += (targetRotationX - ref.current.rotation.x) * 0.02;
      ref.current.rotation.y += (targetRotationY - ref.current.rotation.y) * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
      <PointMaterial
        transparent
        color="#5786F5" // Futuristic blue/purple
        size={0.015} // Adjust particle size
        sizeAttenuation={true}
        depthWrite={false} // Important for transparency
      />
    </Points>
  );
};


// Canvas component
const HeroCanvas = () => {
  return (
    <Canvas
      frameloop="demand"
      camera={{ position: [0, 0, 1] }} // Move camera closer for particles
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
    >
      <Suspense fallback={null}>
        {/* OrbitControls might not be desired for a background effect */}
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
        <Stars />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default HeroCanvas;