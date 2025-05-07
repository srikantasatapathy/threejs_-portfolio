'use client';

import React, { Suspense, useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
// Added Points and PointMaterial for the star background
import { OrbitControls, Preload, Text, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Define space-themed emojis
const spaceEmojis = ['🪐', '🚀', '🧑‍🚀', '✨', '🌌', '☄️', '🌟'];

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
    <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
      <PointMaterial
        transparent
        color="#ffffff" // White dots
        size={0.005} // Smaller dots
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
};


// Component for a single floating emoji
const FloatingEmoji = ({ emoji, initialPosition, floatSpeed, driftSpeed }: { emoji: string, initialPosition: THREE.Vector3, floatSpeed: number, driftSpeed: THREE.Vector3 }) => {
  const textRef = useRef<any>(null!);
  const timeRef = useRef(Math.random() * Math.PI * 2);

  useFrame((state, delta) => {
    if (textRef.current) {
      timeRef.current += delta * floatSpeed;

      textRef.current.position.x = initialPosition.x + Math.sin(timeRef.current) * 0.3; // Reduced float amplitude
      textRef.current.position.y = initialPosition.y + Math.cos(timeRef.current * 0.7) * 0.4; // Reduced float amplitude

      textRef.current.position.x += driftSpeed.x * delta;
      textRef.current.position.y += driftSpeed.y * delta;
      textRef.current.position.z += driftSpeed.z * delta;

      const { viewport } = state;
      if (textRef.current.position.x > viewport.width / 1.8) textRef.current.position.x = -viewport.width / 1.8;
      if (textRef.current.position.x < -viewport.width / 1.8) textRef.current.position.x = viewport.width / 1.8;
      if (textRef.current.position.y > viewport.height / 1.8) textRef.current.position.y = -viewport.height / 1.8;
      if (textRef.current.position.y < -viewport.height / 1.8) textRef.current.position.y = viewport.height / 1.8;
      if (textRef.current.position.z > 6) textRef.current.position.z = -6; // Adjusted Z boundary slightly
      if (textRef.current.position.z < -6) textRef.current.position.z = 6;
    }
  });

  return (
    <Text
      ref={textRef}
      position={initialPosition}
      fontSize={0.5 + Math.random() * 0.1} // Decreased emoji size significantly
      color="#B3B3B3FF" // Emojis have their own colors; this is a fallback.
      anchorX="center"
      anchorY="middle"
    >
      {emoji}
    </Text>
  );
};

// Component to manage multiple floating emojis
const SpaceEmojiField = ({ count = 20 }) => { // Slightly reduced default count for clarity with stars
  const { viewport } = useThree();

  const emojis = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        id: i,
        emoji: spaceEmojis[Math.floor(Math.random() * spaceEmojis.length)],
        initialPosition: new THREE.Vector3(
          (Math.random() - 0.5) * viewport.width * 1.2, // Reduced spread a bit
          (Math.random() - 0.5) * viewport.height * 1.2, // Reduced spread a bit
          (Math.random() - 0.5) * 10 - 5 // Adjusted depth range
        ),
        floatSpeed: 0.15 + Math.random() * 0.25, // Slightly adjusted speeds
        driftSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.08,
          (Math.random() - 0.5) * 0.08,
          (Math.random() - 0.5) * 0.04
        ),
      });
    }
    return temp;
  }, [count, viewport.width, viewport.height]);

  return (
    <group>
      {emojis.map(item => (
        <FloatingEmoji
          key={item.id}
          emoji={item.emoji}
          initialPosition={item.initialPosition}
          floatSpeed={item.floatSpeed}
          driftSpeed={item.driftSpeed}
        />
      ))}
    </group>
  );
};


// Canvas component
const HeroCanvas = () => {
  return (
    <Canvas
      // Set the background to black
      gl={{ antialias: true, alpha: false }} // alpha: false if you want an opaque background
      onCreated={({ gl }) => {
        gl.setClearColor('#000000'); // Black background
      }}
      camera={{ position: [0, 0, 12], fov: 55 }} // Adjusted camera slightly
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} /> {/* Ambient light for emojis if needed */}
        {/* No strong directional light needed for this effect */}

        <BackgroundStars /> {/* Add the star background */}
        <SpaceEmojiField count={25} /> {/* Emojis on top */}

        {/* <OrbitControls enableZoom={true} enablePan={true} /> */}
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

export default HeroCanvas;