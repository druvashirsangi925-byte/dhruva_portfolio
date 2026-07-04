import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const timelineEvents = [
  {
    year: '2010 — 2021',
    category: 'EDUCATION',
    title: 'Secondary Schooling',
    subtitle: 'Rotary School Deshpande Nagar',
    location: 'Hubli, Karnataka',
    desc: 'Acquired foundation education. Scored 89% in final boards.'
  },
  {
    year: '2021 — 2024',
    category: 'EDUCATION',
    title: 'Diploma in Computer Science',
    subtitle: 'Govt. Polytechnic Vidyanagar',
    location: 'Hubli, Karnataka',
    desc: 'First deep dive into logic, C, Java, SQL relational tables, and hardware structures. Graduated with 60%.'
  },
  {
    year: '2023 — 2024',
    category: 'HACKATHONS',
    title: 'Prototype Competitions',
    subtitle: 'Academic & Regional',
    location: 'Karnataka',
    desc: 'Joined college hackathon groups, rapid-prototyping full-stack scripts and IoT health tracking systems.'
  },
  {
    year: '2024 — 2025',
    category: 'EDUCATION',
    title: 'B.E. Computer Science & Eng.',
    subtitle: "Alva's Institute of Engineering & Technology",
    location: 'Mangalore, Karnataka',
    desc: 'Advanced software concepts, operating systems, and database management systems. Achieved a CGPA of 6.89.'
  },
  {
    year: '2024 — 2025',
    category: 'PROJECTS',
    title: 'Full Stack & Systems Projects',
    subtitle: 'Personal Portfolios & Systems',
    location: 'Remote',
    desc: 'Designed and built BankLite, IoT Dashboards, and academic performance tracking scripts.'
  },
  {
    year: '2025',
    category: 'CERTIFICATIONS',
    title: 'Professional Learning',
    subtitle: 'Coursera & Infosys Springboard',
    location: 'Online',
    desc: 'Certified in Software & Project Management, Agile methodologies, and Object-Oriented programming.'
  }
];

export default function Education() {
  const containerRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const timeline = timelineRef.current;
    if (!timeline) return;

    // Calculate total horizontal scroll width
    const getScrollAmount = () => {
      const timelineWidth = timeline.scrollWidth;
      return -(timelineWidth - window.innerWidth + 120);
    };

    const scrollAmount = getScrollAmount();

    const pinTrigger = gsap.to(timeline, {
      x: scrollAmount,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${timeline.scrollWidth * 0.8}`,
        invalidateOnRefresh: true,
        // 3D Perspective tilt transition on scroll
        onUpdate: (self) => {
          gsap.to(timeline, {
            rotateY: (self.progress - 0.5) * -12,
            rotateX: (self.progress - 0.5) * 6,
            duration: 0.4,
            overwrite: 'auto'
          });
        }
      }
    });

    return () => {
      pinTrigger.scrollTrigger?.kill();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      id="education" 
      className="min-h-screen bg-transparent relative flex items-center overflow-hidden py-24 select-none"
    >
      {/* Background soft blur */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.01),transparent_50%)] pointer-events-none" />

      {/* Static Section Header at Top Left */}
      <div className="absolute top-16 left-6 md:left-24 z-20 pointer-events-none">
        <span className="font-serif italic text-xl text-white/50 block mb-2">05. Journey</span>
        <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-white tracking-tight uppercase">
          Timeline Experience
        </h2>
      </div>

      {/* Horizontal Timeline Wrapper */}
      <div 
        ref={timelineRef} 
        style={{ transformStyle: 'preserve-3d', perspective: 1200 }}
        className="flex items-center gap-12 px-6 md:px-24 w-max relative pt-12"
      >
        
        {/* Horizontal Connecting Glowing Line */}
        <div className="absolute left-6 md:left-24 right-24 h-[1px] bg-gradient-to-r from-white/10 via-white/40 to-white/10 z-0 top-[52%]" />

        {timelineEvents.map((item, idx) => (
          <div 
            key={idx} 
            className="w-[280px] sm:w-[350px] flex-shrink-0 relative pt-16 flex flex-col justify-start z-10 preserve-3d"
          >
            
            {/* Glowing Connection Point Node */}
            <div className="absolute left-6 top-[50.5%] -translate-y-1/2 w-4 h-4 rounded-full bg-midnight border-2 border-white z-20 shadow-[0_0_12px_rgba(255,255,255,0.4)] group-hover:scale-125 transition-transform duration-300" />

            {/* Date Tag */}
            <div className="absolute left-6 top-0 mb-4">
              <span className="text-[10px] font-bold tracking-widest text-white/50 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full uppercase">
                {item.year}
              </span>
            </div>

            {/* Timeline Card */}
            <div className="glassmorphism p-6 md:p-8 rounded-3xl relative overflow-hidden transition-all duration-300 border border-white/5 hover:border-white/20 bg-white/[0.01]">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-full blur-xl pointer-events-none" />
              
              <div className="space-y-4">
                <span className="text-[9px] font-bold tracking-widest text-white/45 uppercase">
                  {item.category}
                </span>
                
                <div>
                  <h3 className="font-heading font-bold text-lg text-white">
                    {item.title}
                  </h3>
                  <span className="text-xs font-semibold text-textSecondary block">
                    {item.subtitle}
                  </span>
                  <span className="text-[10px] text-textSecondary uppercase tracking-wider block mt-1">
                    {item.location}
                  </span>
                </div>

                <p className="text-xs text-textSecondary leading-relaxed border-t border-white/5 pt-4">
                  {item.desc}
                </p>
              </div>

            </div>

          </div>
        ))}
        
      </div>
    </div>
  );
}
