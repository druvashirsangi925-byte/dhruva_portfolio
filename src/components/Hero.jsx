import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef();
  const badgeRef = useRef();
  const titleRef = useRef();
  const descRef = useRef();
  const buttonsRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create initial hidden state and animate elements in sequentially
      gsap.fromTo(badgeRef.current, 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
      
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.4 }
      );
      
      gsap.fromTo(descRef.current, 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.6 }
      );
      
      gsap.fromTo(buttonsRef.current.children, 
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.5)', stagger: 0.15, delay: 0.8 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center px-6 pt-20">
      <div className="max-w-4xl w-full text-center z-10">
        
        {/* Pulsing Status Badge */}
        <div ref={badgeRef} className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-accentSky/30 bg-accentSky/10 backdrop-blur-md mb-8">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accentSky opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-accentSky"></span>
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-accentSky">
            Open for Roles
          </span>
        </div>

        {/* Huge Heading Statement */}
        <div ref={titleRef}>
          <p className="font-serif italic text-2xl md:text-3xl text-textSecondary mb-4">
            Hi, my name is
          </p>
          <h1 className="font-heading font-extrabold text-5xl md:text-8xl tracking-tight leading-tight text-white mb-6">
            Dhruva I S
          </h1>
          <p className="font-heading font-semibold text-xl md:text-3xl text-accentSky/90 tracking-wide mb-8">
            Computer Science Engineering Student & Aspiring Developer
          </p>
        </div>

        {/* Short Statement */}
        <p ref={descRef} className="text-base md:text-lg text-textSecondary max-w-2xl mx-auto leading-relaxed mb-10">
          I build sleek, interactive digital experiences that marry clean backend database structure with smooth front-end interactivity. Currently studying in Karnataka, India, and ready to tackle real-world development challenges.
        </p>

        {/* Interactive buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <a 
            href="#projects" 
            className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold bg-white text-midnight hover:bg-transparent hover:text-white border border-white transition-all duration-300 shadow-lg shadow-white/5"
            id="hero-btn-projects"
          >
            Explore Projects
          </a>
          <a 
            href="#contact" 
            className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold bg-transparent text-white border border-borderDark hover:border-white transition-all duration-300 backdrop-blur-sm"
            id="hero-btn-contact"
          >
            Let's Talk
          </a>
        </div>
      </div>

      {/* Down Scroll Indicator */}
      <div className="absolute bottom-8 left-50 -translate-x-50 flex flex-col items-center gap-1.5 animate-bounce pointer-events-none">
        <span className="text-[10px] text-textSecondary uppercase tracking-widest font-semibold">Scroll</span>
        <svg className="w-5 h-5 text-textSecondary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
