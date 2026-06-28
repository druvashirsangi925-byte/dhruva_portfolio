import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Certifications() {
  const containerRef = useRef();
  const listRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = listRef.current.children;
      gsap.fromTo(items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: listRef.current,
            start: 'top 85%',
            end: 'top 65%',
            scrub: 1,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const certData = [
    {
      title: 'Software and Project Management',
      issuer: 'Coursera',
      icon: '🎓',
      desc: 'Completed training on software project planning, agile methodologies, workflow modeling, and team coordination practices.',
    },
    {
      title: 'Programming in C, Java',
      issuer: 'Infosys Springboard',
      icon: '💻',
      desc: 'Acquired programming validations covering object-oriented Java concepts, database connectivity, and C syntax compilation practices.',
    }
  ];

  return (
    <section ref={containerRef} id="certifications" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto w-full">
        
        {/* Section Heading */}
        <div className="mb-16">
          <span className="font-serif italic text-xl text-accentSky block mb-2">05. Credentials</span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight">
            Certifications
          </h2>
        </div>

        {/* Certifications List */}
        <div 
          ref={listRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {certData.map((cert, idx) => (
            <div 
              key={idx}
              className="glassmorphism p-8 rounded-3xl relative overflow-hidden transition-all duration-500 hover:border-accentSky/30 hover:shadow-[0_0_30px_rgba(56,189,248,0.08)] group"
            >
              {/* Radial glow shape behind hover */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-accentSky/5 rounded-full blur-xl group-hover:bg-accentSky/10 transition-colors duration-500" />
              
              <div className="flex gap-6 items-start relative z-10">
                {/* Glowing Badge Circle */}
                <div className="w-14 h-14 rounded-2xl bg-accentSky/10 border border-accentSky/25 flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-[0_0_15px_rgba(56,189,248,0.05)] group-hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]">
                  {cert.icon}
                </div>
                
                <div className="space-y-2">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-accentSky bg-accentSky/10 px-2.5 py-0.5 rounded-full">
                    {cert.issuer}
                  </span>
                  
                  <h3 className="font-heading font-bold text-lg text-white group-hover:text-accentSky transition-colors duration-500">
                    {cert.title}
                  </h3>
                  
                  <p className="text-sm text-textSecondary leading-relaxed">
                    {cert.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
