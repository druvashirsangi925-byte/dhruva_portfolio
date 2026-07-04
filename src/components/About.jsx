import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroImg from '../assets/hero.png';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef();
  const imageFrameRef = useRef();
  const textRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Fade in text blocks on scroll
      const textLines = textRef.current.querySelectorAll('.animate-line');
      gsap.fromTo(textLines,
        { opacity: 0, y: 20, filter: 'blur(4px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: true
          }
        }
      );

      // 2. Statistics Counter animations using ScrollTrigger
      const stats = document.querySelectorAll('.stat-val');
      stats.forEach(stat => {
        const targetVal = parseInt(stat.getAttribute('data-target'));
        const obj = { value: 0 };
        gsap.to(obj, {
          value: targetVal,
          duration: 1.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
            once: true
          },
          onUpdate: () => {
            stat.textContent = Math.floor(obj.value) + (stat.getAttribute('data-suffix') || '');
          }
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    const card = imageFrameRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const rotateX = -(y - yc) / 15;
    const rotateY = (x - xc) / 15;
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = () => {
    const card = imageFrameRef.current;
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out'
    });
  };

  return (
    <section ref={sectionRef} id="about" className="min-h-screen py-32 flex items-center px-6 relative overflow-hidden bg-transparent">
      
      {/* Background decoration elements */}
      <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10">
        
        {/* Section Heading */}
        <div className="mb-20">
          <span className="font-serif italic text-xl text-white/50 block mb-3">01. Identity</span>
          <h2 className="font-heading font-extrabold text-4xl md:text-6xl text-white tracking-tight uppercase">
            About Me
          </h2>
          <div className="w-20 h-[1px] bg-white/20 mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Parallax Image Frame (LHS) */}
          <div className="lg:col-span-5 flex justify-center perspective-card">
            <div className="relative w-72 h-88 sm:w-80 sm:h-96 preserve-3d">
              
              {/* Rotating circles background behind portrait */}
              <div className="absolute inset-0 -m-8 flex items-center justify-center pointer-events-none opacity-20 z-0">
                <div className="w-full h-full rounded-full border border-dashed border-white/25 animate-spin" style={{ animationDuration: '40s' }} />
                <div className="absolute w-[80%] h-[80%] rounded-full border border-dotted border-white/40 animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
              </div>

              {/* Parallax Card */}
              <div 
                ref={imageFrameRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="w-full h-full rounded-3xl overflow-hidden glassmorphism p-2 relative z-10 group cursor-none preserve-3d shadow-2xl"
              >
                <div className="w-full h-full rounded-2xl overflow-hidden relative">
                  <img 
                    src={heroImg} 
                    alt="Dhruva Shirsangi Portrait" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle glass reflection sheet */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-y-[-100%] group-hover:translate-y-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Biography & Counters (RHS) */}
          <div ref={textRef} className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h3 className="animate-line font-heading font-extrabold text-2xl md:text-3xl text-white leading-tight uppercase">
                Bridging Logic with Elegant Human Experiences.
              </h3>
              <p className="animate-line text-base text-textSecondary leading-relaxed">
                I am a Computer Science Engineering student with strong analytical foundations and a growing passion for software development, database architecture, and user interface aesthetics. I enjoy writing clean Python scripts, constructing database queries, and designing responsive frontend platforms.
              </p>
              <p className="animate-line text-base text-textSecondary leading-relaxed">
                My interest spans the fields of system architecture, database design, and full-stack web engineering. I strive to continuously learn new modern frameworks, collaborate inside agile team environments, and deliver practical digital tools that have a tangible impact.
              </p>
            </div>

            {/* Statistics Counters Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-white/5">
              <div className="space-y-1">
                <span 
                  className="stat-val font-heading font-extrabold text-3xl md:text-4xl text-white block"
                  data-target="15"
                  data-suffix="+"
                >
                  0+
                </span>
                <span className="text-[10px] tracking-widest uppercase text-white/40">Projects</span>
              </div>
              <div className="space-y-1">
                <span 
                  className="stat-val font-heading font-extrabold text-3xl md:text-4xl text-white block"
                  data-target="10"
                  data-suffix="+"
                >
                  0+
                </span>
                <span className="text-[10px] tracking-widest uppercase text-white/40">Tech Stack</span>
              </div>
              <div className="space-y-1">
                <span 
                  className="stat-val font-heading font-extrabold text-3xl md:text-4xl text-white block"
                  data-target="1000"
                  data-suffix="+"
                >
                  0+
                </span>
                <span className="text-[10px] tracking-widest uppercase text-white/40">Hours Code</span>
              </div>
              <div className="space-y-1">
                <span 
                  className="stat-val font-heading font-extrabold text-3xl md:text-4xl text-white block"
                  data-target="100"
                  data-suffix="%"
                >
                  0%
                </span>
                <span className="text-[10px] tracking-widest uppercase text-white/40">Passion</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
