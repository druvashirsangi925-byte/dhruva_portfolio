import React, { useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Interactive 3D Geometric Core
function GeometricCore() {
  const meshRef = useRef();
  const innerMeshRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  // Track mouse coordinates relative to window
  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    if (meshRef.current) {
      // Floating natural motion
      meshRef.current.position.y = Math.sin(time * 0.8) * 0.15;
      
      // React slightly to mouse coordinates
      meshRef.current.rotation.x = time * 0.05 + mouse.current.y * 0.25;
      meshRef.current.rotation.y = time * 0.08 + mouse.current.x * 0.25;
    }
    if (innerMeshRef.current) {
      // Rotate inner core in opposite direction
      innerMeshRef.current.rotation.x = -time * 0.12;
      innerMeshRef.current.rotation.y = -time * 0.15;
    }
  });

  return (
    <group>
      {/* Outer abstract sphere */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.7, 2]} />
        <meshBasicMaterial 
          color="#ffffff" 
          wireframe 
          transparent 
          opacity={0.12} 
        />
      </mesh>

      {/* Inner robotic processor core */}
      <mesh ref={innerMeshRef}>
        <icosahedronGeometry args={[0.75, 1]} />
        <meshBasicMaterial 
          color="#ffffff" 
          wireframe 
          transparent 
          opacity={0.3} 
        />
      </mesh>

      {/* Center glowing core point */}
      <mesh>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

export default function Hero() {
  const containerRef = useRef();
  const titleContainerRef = useRef();
  const buttonsRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Scroll-driven letter separation
      const letters = document.querySelectorAll('.hero-letter');
      gsap.to(letters, {
        x: (i) => {
          // outer letters separate further than inner
          const multipliers = [-180, -90, -30, 30, 90, 180];
          return multipliers[i];
        },
        opacity: 0.05,
        scale: 0.9,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // 2. Button magnetic snapping hover listeners
      const buttons = buttonsRef.current.querySelectorAll('.magnetic-btn');
      buttons.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, {
            x: x * 0.35,
            y: y * 0.35,
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: 'elastic.out(1, 0.3)'
          });
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const professions = [
    'Software Developer',
    'Full Stack Developer',
    'Backend Developer',
    'Problem Solver',
    'Creative Thinker'
  ];

  return (
    <section 
      ref={containerRef} 
      id="hero" 
      className="relative min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden bg-transparent"
    >
      
      {/* 3D Core Layer */}
      <div className="absolute inset-0 z-0 w-full h-full pointer-events-none opacity-80">
        <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[2, 4, 3]} intensity={1.5} />
          <GeometricCore />
        </Canvas>
      </div>

      {/* Giant Typography Background behind text */}
      <div 
        ref={titleContainerRef}
        className="absolute z-10 w-full text-center select-none pointer-events-none select-none"
      >
        <h1 className="font-heading font-extrabold text-[12vw] md:text-[15vw] leading-none tracking-tighter text-white flex justify-center items-center overflow-hidden">
          {['D', 'H', 'R', 'U', 'V', 'A'].map((char, idx) => (
            <span 
              key={idx} 
              className="hero-letter inline-block transform transition-transform"
            >
              {char}
            </span>
          ))}
        </h1>
      </div>

      {/* Foreground Content */}
      <div className="relative z-20 max-w-4xl w-full text-center flex flex-col items-center justify-center pt-24 space-y-8 pointer-events-auto">
        
        {/* Status Badge */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
            Open for Roles
          </span>
        </motion.div>

        {/* Subheadings Stagger Fade */}
        <div className="flex flex-col items-center justify-center space-y-1 pt-6">
          {professions.map((text, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.4 + idx * 0.15, 
                ease: [0.16, 1, 0.3, 1] 
              }}
              className="overflow-hidden"
            >
              <h2 className="font-serif italic text-xl md:text-3xl text-textSecondary tracking-wide">
                {text}
              </h2>
            </motion.div>
          ))}
        </div>

        {/* Button Wrapper */}
        <div 
          ref={buttonsRef} 
          className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-12 w-full max-w-md mx-auto"
        >
          <motion.a 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2, ease: 'easeOut' }}
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector('#projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="magnetic-btn w-full sm:w-auto px-8 py-4 rounded-full font-semibold bg-white text-midnight hover:bg-white/90 border border-white transition-all duration-300 shadow-xl cursor-none text-xs uppercase tracking-widest block"
          >
            View Projects
          </motion.a>
          <motion.a 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.35, ease: 'easeOut' }}
            href="/resume.pdf"
            download
            className="magnetic-btn w-full sm:w-auto px-8 py-4 rounded-full font-semibold bg-transparent text-white border border-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm cursor-none text-xs uppercase tracking-widest block"
          >
            Get Resume
          </motion.a>
        </div>

      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce pointer-events-none opacity-40">
        <span className="text-[9px] text-textSecondary uppercase tracking-widest font-semibold">Scroll</span>
        <svg className="w-4 h-4 text-textSecondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>

    </section>
  );
}
