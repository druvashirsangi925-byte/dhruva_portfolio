import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const containerRef = useRef();
  const lineRef = useRef();
  const itemRefs = useRef([]);
  itemRefs.current = [];

  const addToRefs = (el) => {
    if (el && !itemRefs.current.includes(el)) {
      itemRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate vertical timeline line
      gsap.fromTo(lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'bottom 70%',
            scrub: true,
          }
        }
      );

      // Animate each timeline card reveal
      itemRefs.current.forEach((item, index) => {
        gsap.fromTo(item,
          { opacity: 0, x: index % 2 === 0 ? -40 : 40 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 1,
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const timelineData = [
    {
      period: '2024 — 2025',
      title: "Alva's Institute of Engineering & Technology",
      subtitle: 'Bachelor of Computer Science and Engineering',
      location: 'Mangalore, Karnataka',
      gradeType: 'CGPA',
      gradeVal: '6.89',
    },
    {
      period: '2021 — 2024',
      title: 'Govt. Polytechnic Vidyanagar',
      subtitle: 'Diploma in Computer Science',
      location: 'Hubli, Karnataka',
      gradeType: 'Percentage',
      gradeVal: '60%',
    },
    {
      period: '2010 — 2021',
      title: 'Rotary School Deshpande Nagar',
      subtitle: 'Secondary Schooling',
      location: 'Hubli, Karnataka',
      gradeType: 'Percentage',
      gradeVal: '89%',
    }
  ];

  return (
    <section ref={containerRef} id="education" className="py-24 px-6 overflow-hidden">
      <div className="max-w-4xl mx-auto w-full">
        
        {/* Section Heading */}
        <div className="mb-16">
          <span className="font-serif italic text-xl text-accentSky block mb-2">02. Academic path</span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight">
            Education
          </h2>
        </div>

        {/* Timeline wrapper */}
        <div className="relative">
          {/* Vertical Center Line */}
          <div 
            ref={lineRef} 
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-accentBlue via-accentSky to-borderDark origin-top"
          />

          <div className="space-y-12">
            {timelineData.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div 
                  key={idx} 
                  ref={addToRefs}
                  className={`flex flex-col md:flex-row items-stretch justify-start md:justify-between relative ${isEven ? '' : 'md:flex-row-reverse'}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-[9px] md:left-1/2 top-6 w-4 h-4 rounded-full bg-midnight border-2 border-accentSky md:-translate-x-2.5 z-10 timeline-dot-active" />

                  {/* Card Container */}
                  <div className="w-full md:w-[46%] pl-10 md:pl-0">
                    <div className="glassmorphism p-6 md:p-8 rounded-3xl relative overflow-hidden transition-all duration-300 hover:border-accentSky/30">
                      {/* Glow background decoration */}
                      <div className="absolute -top-12 -right-12 w-24 h-24 bg-accentSky/5 rounded-full blur-xl" />
                      
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <span className="text-xs font-semibold uppercase tracking-wider text-accentSky bg-accentSky/10 px-3 py-1 rounded-full">
                          {item.period}
                        </span>
                        <span className="text-xs text-textSecondary">{item.location}</span>
                      </div>
                      
                      <h3 className="font-heading font-bold text-xl text-white mb-1.5">
                        {item.title}
                      </h3>
                      
                      <h4 className="text-sm font-medium text-textSecondary mb-4">
                        {item.subtitle}
                      </h4>
                      
                      <div className="text-sm border-t border-white/5 pt-4 flex items-center justify-between">
                        <span className="text-textSecondary">{item.gradeType}</span>
                        <span className="font-semibold text-white text-base">{item.gradeVal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Empty space filler for desktop 2-column layout spacing */}
                  <div className="hidden md:block w-[46%]" />
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
