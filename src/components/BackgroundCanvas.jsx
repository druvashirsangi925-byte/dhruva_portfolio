import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

// Particle Group Component
function MorphParticles() {
  const pointsRef = useRef();
  const particleCount = 2000;
  
  // Create coordinates for different target shapes
  const shapes = useMemo(() => {
    const torusPoints = new Float32Array(particleCount * 3);
    const spherePoints = new Float32Array(particleCount * 3);
    const gridPoints = new Float32Array(particleCount * 3);
    const wavePoints = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // 1. Torus Knot shape math
      const t = (i / particleCount) * Math.PI * 2 * 12; 
      const r = 2.2 + Math.sin(6 * t) * 0.4;
      const tkX = r * Math.cos(2 * t);
      const tkY = r * Math.sin(3 * t);
      const tkZ = r * Math.cos(4 * t);
      
      torusPoints[i3] = tkX + (Math.random() - 0.5) * 0.3;
      torusPoints[i3 + 1] = tkY + (Math.random() - 0.5) * 0.3;
      torusPoints[i3 + 2] = tkZ + (Math.random() - 0.5) * 0.3;

      // 2. Sphere shape math
      const u = Math.random();
      const v = Math.random();
      const theta = u * Math.PI * 2;
      const phi = Math.acos(2 * v - 1);
      const radius = 2.8 + (Math.random() - 0.5) * 0.2;
      spherePoints[i3] = radius * Math.sin(phi) * Math.cos(theta);
      spherePoints[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      spherePoints[i3 + 2] = radius * Math.cos(phi);

      // 3. Grid Cloud shape math
      gridPoints[i3] = (Math.random() - 0.5) * 8;
      gridPoints[i3 + 1] = (Math.random() - 0.5) * 8;
      gridPoints[i3 + 2] = (Math.random() - 0.5) * 6;

      // 4. Wave shape math
      const col = i % 50;
      const row = Math.floor(i / 50);
      const x = (col - 25) * 0.3;
      const z = (row - 20) * 0.35;
      wavePoints[i3] = x;
      wavePoints[i3 + 1] = Math.sin(x * 1.2) * Math.cos(z * 1.2) * 0.9;
      wavePoints[i3 + 2] = z;
    }

    return { torusPoints, spherePoints, gridPoints, wavePoints };
  }, []);

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        setScrollProgress(self.progress * 3);
      }
    });

    return () => trigger.kill();
  }, []);

  const currentPositions = useMemo(() => {
    return new Float32Array(shapes.torusPoints);
  }, [shapes]);

  // Update loop
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    
    const positions = pointsRef.current.geometry.attributes.position.array;
    const time = clock.getElapsedTime();

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

    for (let i = 0; i < particleCount * 3; i += 3) {
      const x1 = target1[i];
      const y1 = target1[i + 1];
      const z1 = target1[i + 2];

      const x2 = target2[i];
      const y2 = target2[i + 1];
      const z2 = target2[i + 2];

      const targetX = x1 + (x2 - x1) * localProgress;
      const targetY = y1 + (y2 - y1) * localProgress;
      const targetZ = z1 + (z2 - z1) * localProgress;

      const floatOffset = Math.sin(time * 0.8 + i * 0.1) * 0.04;

      positions[i] += (targetX - positions[i]) * 0.08;
      positions[i + 1] += (targetY + floatOffset - positions[i + 1]) * 0.08;
      positions[i + 2] += (targetZ - positions[i + 2]) * 0.08;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    pointsRef.current.rotation.y = time * 0.03;
    pointsRef.current.rotation.x = time * 0.015;
  });

  return (
    <Points ref={pointsRef} positions={currentPositions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#818cf8"
        size={0.045}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.65}
      />
    </Points>
  );
}

// Floating 3D Geometries Component
function FloatingShapes() {
  const shapesRef = useRef([]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    shapesRef.current.forEach((mesh, idx) => {
      if (!mesh) return;
      mesh.rotation.y = time * (0.05 + idx * 0.02);
      mesh.rotation.x = time * (0.03 + idx * 0.01);
      mesh.position.y = mesh.userData.baseY + Math.sin(time * 0.5 + idx) * 0.3;
    });
  });

  return (
    <group>
      <mesh
        ref={(el) => (shapesRef.current[0] = el)}
        position={[-3.5, 2, -2]}
        userData={{ baseY: 2 }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="#06b6d4" wireframe transparent opacity={0.08} />
      </mesh>

      <mesh
        ref={(el) => (shapesRef.current[1] = el)}
        position={[4, -2.5, -3]}
        userData={{ baseY: -2.5 }}
      >
        <tetrahedronGeometry args={[1.2]} />
        <meshBasicMaterial color="#a855f7" wireframe transparent opacity={0.08} />
      </mesh>

      <mesh
        ref={(el) => (shapesRef.current[2] = el)}
        position={[-4.5, -2, -4]}
        userData={{ baseY: -2 }}
      >
        <torusGeometry args={[0.8, 0.25, 8, 24]} />
        <meshBasicMaterial color="#3b82f6" wireframe transparent opacity={0.06} />
      </mesh>
    </group>
  );
}

export default function BackgroundCanvas() {
  const keywords = [
    { text: '💻 Data Structures', top: '15%', left: '8%', delay: 0 },
    { text: '🌐 RESTful APIs', top: '78%', left: '12%', delay: 2 },
    { text: '⚡ TypeScript', top: '25%', left: '78%', delay: 1 },
    { text: '🧠 Algorithms', top: '65%', left: '82%', delay: 3 },
    { text: '💾 SQL & Database', top: '45%', left: '5%', delay: 4 },
    { text: '🐍 Python API', top: '85%', left: '68%', delay: 1.5 },
    { text: '🚀 Full Stack', top: '12%', left: '75%', delay: 2.5 },
    { text: '🤖 Machine Learning', top: '35%', left: '16%', delay: 5 },
    { text: '🛡️ Cyber Security', top: '55%', left: '85%', delay: 0.5 },
    { text: '🎨 Creative UI/UX', top: '90%', left: '42%', delay: 3.5 },
  ];

  return (
    <div className="fixed inset-0 w-full h-full z-0 bg-midnight overflow-hidden pointer-events-none">
      
      {/* Premium Cinematic Glowing Neon Blobs */}
      <div className="absolute top-[-10%] left-[-15%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full bg-indigo-600/10 blur-[150px] pointer-events-none animate-float-slow" />
      <div className="absolute bottom-[-15%] right-[-10%] w-[65vw] h-[65vw] max-w-[900px] max-h-[900px] rounded-full bg-cyan-600/10 blur-[160px] pointer-events-none animate-float-reverse" />
      <div className="absolute top-[35%] right-[5%] w-[45vw] h-[45vw] max-w-[600px] max-h-[600px] rounded-full bg-purple-600/8 pointer-events-none blur-[130px] animate-float-slow" style={{ animationDelay: '-7s' }} />
      <div className="absolute bottom-[20%] left-[-10%] w-[50vw] h-[50vw] max-w-[700px] max-h-[700px] rounded-full bg-blue-600/8 pointer-events-none blur-[140px] animate-float-reverse" style={{ animationDelay: '-12s' }} />

      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <ambientLight intensity={0.2} />
        <directionalLight position={[1, 3, 2]} intensity={0.8} />
        
        <MorphParticles />
        <FloatingShapes />
      </Canvas>

      {/* HTML Floating Keywords Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        {keywords.map((word, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0.12, 0.32, 0.12],
              y: [0, -30, 0],
              x: [0, 15, 0]
            }}
            transition={{
              duration: 12 + idx * 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: word.delay
            }}
            className="absolute font-sans font-medium text-xs md:text-sm text-white/80 uppercase tracking-widest whitespace-nowrap bg-white/[0.02] border border-white/5 px-3 py-1.5 rounded-full backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.02)]"
            style={{
              top: word.top,
              left: word.left,
            }}
          >
            {word.text}
          </motion.div>
        ))}
      </div>
      
      {/* Deep dark matte radial overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#050505_95%)]" />
      
      {/* Living Animated Grid */}
      <div className="grid-overlay" />
      
      {/* Premium Cinematic Noise Texture */}
      <div className="noise-overlay" />
    </div>
  );
}
