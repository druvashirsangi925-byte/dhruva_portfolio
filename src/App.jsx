import React, { useState, useEffect, useRef } from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import FullscreenImage from './components/FullscreenImage';
import Gallery from './components/Gallery';
import Services from './components/Services';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education'; // Cinematic Timeline
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [activeLink, setActiveLink] = useState('hero');
  const [isLoading, setIsLoading] = useState(true);
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);

  // Initialize Lenis scroll + GSAP ScrollTrigger
  useEffect(() => {
    // Hide standard cursor for premium custom cursor experience
    document.documentElement.style.cursor = 'none';
    
    // Only initialize scroll once preloader is complete
    if (isLoading) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    // Active Section Tracking on Scroll
    const sections = ['hero', 'about', 'fullscreen-image', 'gallery', 'services', 'skills', 'projects', 'education', 'achievements', 'contact'];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 45%',
          end: 'bottom 45%',
          onEnter: () => setActiveLink(id),
          onEnterBack: () => setActiveLink(id),
        });
      }
    });

    ScrollTrigger.addEventListener("refresh", () => lenis.resize());
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoading]);

  // Handle custom cursor tracking
  useEffect(() => {
    const onMouseMove = (e) => {
      if (cursorDotRef.current && cursorRingRef.current) {
        gsap.to(cursorDotRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.05,
          ease: 'none'
        });
        gsap.to(cursorRingRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.2,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Manage Preloader timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // 4 seconds preloader animation sequence
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-transparent text-white selection:bg-white/20 selection:text-white overflow-x-hidden">
      
      {/* Custom Cursor Dot & Ring */}
      <div ref={cursorDotRef} className="custom-cursor-dot hidden md:block" />
      <div ref={cursorRingRef} className="custom-cursor-ring hidden md:block" />

      {/* Preloader Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.08,
              filter: 'blur(10px)',
              transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
            }}
            className="fixed inset-0 w-full h-full bg-midnight z-50 flex flex-col items-center justify-center pointer-events-auto"
          >
            {/* Assembly letter elements particles */}
            <div className="relative flex flex-col items-center justify-center gap-6">
              
              {/* Particles assembling from scatter into DIS, then morphing to DHRUVA SHIRSANGI */}
              <div className="h-16 flex items-center justify-center overflow-hidden">
                <motion.div
                  initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                  animate={[
                    { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: 'easeOut' } },
                  ]}
                  className="font-heading font-extrabold tracking-widest text-3xl md:text-5xl uppercase text-white flex gap-0.5"
                >
                  {/* Phase 1: DIS Scattered Dot Letters, Phase 2: DHRUVA SHIRSANGI */}
                  <motion.span
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    D
                  </motion.span>
                  <motion.span
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    I
                  </motion.span>
                  <motion.span
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    S
                  </motion.span>
                </motion.div>
              </div>

              {/* Full name sliding reveal morph */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ delay: 1.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex items-center justify-center bg-midnight z-10 w-[350px] md:w-[600px] mx-auto text-center"
              >
                <span className="font-heading font-extrabold tracking-[0.25em] text-sm md:text-xl text-white uppercase">
                  DHRUVA SHIRSANGI
                </span>
              </motion.div>

              {/* Sound visual waves (equalizer bars) */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex items-end gap-1.5 h-6 mt-4"
              >
                <div className="w-[2px] h-3 bg-white eq-bar" style={{ animationDelay: '0.1s' }} />
                <div className="w-[2px] h-5 bg-white eq-bar" style={{ animationDelay: '0.3s' }} />
                <div className="w-[2px] h-2 bg-white eq-bar" style={{ animationDelay: '0.5s' }} />
                <div className="w-[2px] h-6 bg-white eq-bar" style={{ animationDelay: '0.2s' }} />
                <div className="w-[2px] h-4 bg-white eq-bar" style={{ animationDelay: '0.4s' }} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Experience Layout (renders after preloader) */}
      {!isLoading && (
        <>
          {/* Dynamic 3D canvas rendering backdrops */}
          <BackgroundCanvas />

          {/* Sticky Header Navbar */}
          <Navbar activeLink={activeLink} />

          {/* Scrolling Sections */}
          <main className="relative z-10">
            <Hero />
            <About />
            <FullscreenImage />
            <Gallery />
            <Services />
            <Skills />
            <Projects />
            <Education /> {/* Converted to cinematic horizontal timeline */}
            <Achievements />
            <Contact />
          </main>
        </>
      )}

    </div>
  );
}
