import * as THREE from 'three';
import React, { Suspense, useRef, useMemo } from 'react';

export const BackgroundStars = (props: any) => {
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
};
