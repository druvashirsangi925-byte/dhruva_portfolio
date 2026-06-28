import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Particle Group Component
function MorphParticles() {
  const pointsRef = useRef();
  const particleCount = 1500;
  
  // Create coordinates for different target shapes
  const shapes = useMemo(() => {
    const torusPoints = new Float32Array(particleCount * 3);
    const spherePoints = new Float32Array(particleCount * 3);
    const gridPoints = new Float32Array(particleCount * 3);
    const wavePoints = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Index
      const i3 = i * 3;

      // 1. Torus Knot shape math
      const t = (i / particleCount) * Math.PI * 2 * 12; // 12 loops
      const r = 2 + Math.sin(6 * t) * 0.5; // thickness variation
      const tkX = r * Math.cos(2 * t);
      const tkY = r * Math.sin(3 * t);
      const tkZ = r * Math.cos(4 * t);
      // add noise
      torusPoints[i3] = tkX + (Math.random() - 0.5) * 0.4;
      torusPoints[i3 + 1] = tkY + (Math.random() - 0.5) * 0.4;
      torusPoints[i3 + 2] = tkZ + (Math.random() - 0.5) * 0.4;

      // 2. Sphere shape math
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const radius = 2.5 + (Math.random() - 0.5) * 0.3;
      spherePoints[i3] = radius * Math.sin(phi) * Math.cos(theta);
      spherePoints[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      spherePoints[i3 + 2] = radius * Math.cos(phi);

      // 3. Grid Cloud shape math
      gridPoints[i3] = (Math.random() - 0.5) * 6;
      gridPoints[i3 + 1] = (Math.random() - 0.5) * 6;
      gridPoints[i3 + 2] = (Math.random() - 0.5) * 6;

      // 4. Wave shape math
      const col = i % 40;
      const row = Math.floor(i / 40);
      const x = (col - 20) * 0.25;
      const z = (row - 20) * 0.25;
      wavePoints[i3] = x;
      wavePoints[i3 + 1] = Math.sin(x * 1.5) * Math.cos(z * 1.5) * 0.8;
      wavePoints[i3 + 2] = z;
    }

    return { torusPoints, spherePoints, gridPoints, wavePoints };
  }, []);

  // Track scroll section state
  // 0: Hero (Torus), 1: About (Sphere), 2: Education/Skills (Grid), 3: Projects/Contact (Wave)
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        // Map 0-1 progress to our target morph range (0 to 3)
        setScrollProgress(self.progress * 3);
      }
    });

    return () => trigger.kill();
  }, []);

  // Current position state
  const currentPositions = useMemo(() => {
    return new Float32Array(shapes.torusPoints); // Start with torus
  }, [shapes]);

  // Update loop
  useFrame(({ clock }) => {
    const positions = pointsRef.current.geometry.attributes.position.array;
    const time = clock.getElapsedTime();

    // Determine current interpolation targets based on scrollProgress
    const progress = scrollProgress;
    let target1, target2, localProgress;

    if (progress <= 1) {
      target1 = shapes.torusPoints;
      target2 = shapes.spherePoints;
      localProgress = progress;
    } else if (progress <= 2) {
      target1 = shapes.spherePoints;
      target2 = shapes.gridPoints;
      localProgress = progress - 1;
    } else {
      target1 = shapes.gridPoints;
      target2 = shapes.wavePoints;
      localProgress = progress - 2;
    }

    // Interpolate positions
    for (let i = 0; i < particleCount * 3; i += 3) {
      // Lerp base positions
      const x1 = target1[i];
      const y1 = target1[i + 1];
      const z1 = target1[i + 2];

      const x2 = target2[i];
      const y2 = target2[i + 1];
      const z2 = target2[i + 2];

      // Target base
      const targetX = x1 + (x2 - x1) * localProgress;
      const targetY = y1 + (y2 - y1) * localProgress;
      const targetZ = z1 + (z2 - z1) * localProgress;

      // Add a subtle wave float behavior over time
      const floatOffset = Math.sin(time + i) * 0.05;

      // Lerp from current rendered position to computed target position
      positions[i] += (targetX - positions[i]) * 0.1;
      positions[i + 1] += (targetY + floatOffset - positions[i + 1]) * 0.1;
      positions[i + 2] += (targetZ - positions[i + 2]) * 0.1;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Rotate the overall system
    pointsRef.current.rotation.y = time * 0.05;
    pointsRef.current.rotation.x = time * 0.03;
  });

  return (
    <Points ref={pointsRef} positions={currentPositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#38bdf8"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

export default function BackgroundCanvas() {
  return (
    <div className="fixed inset-0 w-full h-full -z-20 bg-midnight overflow-hidden pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1.5} />
        <MorphParticles />
      </Canvas>
      {/* Dynamic Grid Background Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#030712_90%)]" />
    </div>
  );
}
