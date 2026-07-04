import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import philosophyImg from '../assets/philosophy.png';

gsap.registerPlugin(ScrollTrigger);

export default function FullscreenImage() {
  const containerRef = useRef();
  const imageRef = useRef();
  const quoteRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Slow cinematic scroll-driven zoom
      gsap.fromTo(imageRef.current,
        { scale: 1.0 },
        {
          scale: 1.1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

      // 2. Quote text line fade-up
      gsap.fromTo(quoteRef.current.children,
        { opacity: 0, y: 30, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 1,
          stagger: 0.2,
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 80%',
            end: 'top 45%',
            scrub: true
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Spotlight mouse tracking logic
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Set custom CSS variables for radial gradient spotlight
    e.currentTarget.style.setProperty('--spotlight-x', `${x}%`);
    e.currentTarget.style.setProperty('--spotlight-y', `${y}%`);
  };

  return (
    <section 
      ref={containerRef}
      id="fullscreen-image"
      onMouseMove={handleMouseMove}
      className="py-32 px-6 min-h-screen flex items-center justify-center bg-transparent relative overflow-hidden"
      style={{
        '--spotlight-x': '50%',
        '--spotlight-y': '50%'
      }}
    >
      
      {/* Outer wrapper sizing */}
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Fullscreen Photo Showcase Frame (LHS) */}
        <div className="lg:col-span-7 flex justify-center w-full h-[65vh] md:h-[75vh] rounded-3xl overflow-hidden glassmorphism p-2 relative group shadow-2xl">
          <div className="w-full h-full rounded-2xl overflow-hidden relative">
            <img 
              ref={imageRef}
              src={philosophyImg} 
              alt="Dhruva Shirsangi Philosophy Portrait" 
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
            
            {/* Dynamic mouse-tracking spotlight mask overlay */}
            <div 
              className="absolute inset-0 transition-opacity duration-500 pointer-events-none opacity-85 group-hover:opacity-90"
              style={{
                background: 'radial-gradient(circle at var(--spotlight-x) var(--spotlight-y), transparent 15%, #050505 55%)'
              }}
            />
          </div>
        </div>

        {/* Cinematic Quote Typography (RHS) */}
        <div className="lg:col-span-5 space-y-6 lg:pl-10 text-left">
          <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase block">
            Philosophy
          </span>
          <div ref={quoteRef} className="space-y-4">
            <h3 className="font-serif italic text-3xl md:text-5xl text-white leading-snug">
              "Building
            </h3>
            <h3 className="font-serif italic text-3xl md:text-5xl text-white leading-snug">
              intelligent solutions
            </h3>
            <h3 className="font-serif italic text-3xl md:text-5xl text-white leading-snug">
              through code,
            </h3>
            <h3 className="font-serif italic text-3xl md:text-5xl text-white leading-snug">
              creativity,
            </h3>
            <h3 className="font-serif italic text-3xl md:text-5xl text-white leading-snug">
              and innovation."
            </h3>
          </div>
          <div className="w-12 h-[1px] bg-white/20 mt-8" />
        </div>

      </div>

    </section>
  );
}
