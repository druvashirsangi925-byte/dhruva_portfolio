import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef();
  const cardRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="min-h-screen py-24 flex items-center px-6">
      <div className="max-w-4xl mx-auto w-full">
        
        {/* Section Heading */}
        <div className="mb-12">
          <span className="font-serif italic text-xl text-accentSky block mb-2">01. Summary</span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight">
            About Me
          </h2>
        </div>

        {/* Biography Card */}
        <div 
          ref={cardRef} 
          className="glassmorphism p-8 md:p-12 rounded-3xl relative overflow-hidden"
        >
          {/* Subtle Decorative Glows */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-accentBlue/10 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-accentSky/5 rounded-full blur-2xl" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
            {/* Short Introduction */}
            <div className="md:col-span-2">
              <h3 className="font-heading font-semibold text-2xl text-white mb-6">
                Eager to shape code and build intelligent systems.
              </h3>
              
              <div className="space-y-4 text-textSecondary leading-relaxed">
                <p>
                  As a motivated Computer Science Engineering student, I possess strong analytical skills and a growing passion for software development, data handling, and clean user interfaces.
                </p>
                <p>
                  My experience spans across low-level coding in C and C++, object-oriented design in Java, backend processing in Python and SQL databases, and constructing interactive front-ends with HTML, CSS, and JavaScript.
                </p>
                <p>
                  I'm constantly looking to apply my technical knowledge in collaborative team environments and to solve practical, real-world problems.
                </p>
              </div>
            </div>

            {/* Quick Profile Info */}
            <div className="glassmorphism p-6 rounded-2xl border-white/5 bg-white/[0.02]">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-accentSky mb-4">
                Details
              </h4>
              <ul className="space-y-3.5 text-sm">
                <li className="flex flex-col">
                  <span className="text-[11px] text-textSecondary uppercase">Location</span>
                  <span className="text-white font-medium">Hubli, Karnataka, India</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-[11px] text-textSecondary uppercase">Education</span>
                  <span className="text-white font-medium">B.E. Computer Science</span>
                </li>
                <li className="flex flex-col">
                  <span className="text-[11px] text-textSecondary uppercase">Focus Areas</span>
                  <span className="text-white font-medium">Software Dev, DBs, UI/UX</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
