import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import iotImg from '../assets/iot_health_dashboard.png';
import homeImg from '../assets/home_service_ui.png';
import studentImg from '../assets/student_analytics_ui.png';
import eventImg from '../assets/event_portal_ui.png';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const containerRef = useRef();
  const gridRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade in each project card on scroll
      const cards = gridRef.current.children;
      gsap.fromTo(cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            end: 'top 45%',
            scrub: 1,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const projectsData = [
    {
      id: 1,
      title: 'IoT-Based Elderly Health Monitoring',
      desc: 'Developed a smart health monitoring system for elderly people using wearable sensors and an emergency dashboard.',
      fullDesc: 'This project aims to provide real-time patient monitoring for elderly residents. It integrates multiple wearable sensors to track vital metrics including heart rate, body temperature, and movement logs. In case of an emergency (like falling or critical vitals), the backend sends instant notifications to primary caregivers. Built a web-based dashboard utilizing Python processing, displaying clean stats, histories, and emergency indicators.',
      image: iotImg,
      tags: ['IoT', 'Python', 'Sensors', 'Dashboard'],
      bullets: [
        'Integrated body temperature and pulse rate tracking.',
        'Created alert triggers for caregiver instant notification.',
        'Structured real-time JavaScript charting inside the dashboard.'
      ]
    },
    {
      id: 2,
      title: 'Home Service Management System',
      desc: 'A service booking platform connecting residents with local technical experts for plumbing, electrical and mechanical tasks.',
      fullDesc: 'Designed to solve the difficulty of locating local service technicians. It supports roles for customers and technicians, allowing scheduling, progress updates, and invoicing. Focused heavily on interface design, conducting user research, crafting initial wireframes, and building a responsive web prototype using HTML5, CSS3, and JavaScript.',
      image: homeImg,
      tags: ['HTML', 'CSS', 'JavaScript', 'UI/UX'],
      bullets: [
        'Conducted user research to optimize flow and wireframing.',
        'Constructed custom navigation paths for customers and tech roles.',
        'Clean animations and validation logic using JavaScript.'
      ]
    },
    {
      id: 3,
      title: 'Student Performance Analytics',
      desc: 'A database analytics dashboard displaying grade records, subject trends, and attendance logs.',
      fullDesc: 'Built an academic tracking solution using Python backend scripts to process database records and generate performance metrics. It connects to a SQL schema, aggregate metrics, and exports clean visualizations to Excel reports and frontend dashboards. Includes subject comparison charts and attendance trends.',
      image: studentImg,
      tags: ['Python', 'SQL', 'Excel', 'Data Visualization'],
      bullets: [
        'Aggregated student database metrics with optimized SQL queries.',
        'Integrated JS rendering charts dynamically in the dashboard view.',
        'Created template-driven spreadsheets for automated reports.'
      ]
    },
    {
      id: 4,
      title: 'College Event Management Portal',
      desc: 'A landing registration page and coordination dashboard for managing university workshops and seminars.',
      fullDesc: 'Developed to simplify college event registration workflows. Users can view active workshops, sign up, and coordinate logs. Administrators can track registrations, coordinate schedule updates, and post announcements. Built with responsive grid components and a Python script backend.',
      image: eventImg,
      tags: ['HTML', 'CSS', 'JavaScript', 'SQL'],
      bullets: [
        'Responsive layout adapting to mobile and screen sizes.',
        'Simple SQL database queries handling workshop registrations.',
        'Structured coordination navigation flow.'
      ]
    }
  ];

  // 3D Parallax Tilt Effect
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    // Calculate rotation angles
    const rotateX = -(y - yc) / 12; // cap rotation
    const rotateY = (x - xc) / 12;
    
    const inner = card.querySelector('.tilt-inner');
    if (inner) {
      inner.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    }
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    const inner = card.querySelector('.tilt-inner');
    if (inner) {
      inner.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    }
  };

  return (
    <section ref={containerRef} id="projects" className="py-24 px-6 relative">
      <div className="max-w-4xl mx-auto w-full">
        
        {/* Section Heading */}
        <div className="mb-16">
          <span className="font-serif italic text-xl text-accentSky block mb-2">04. Works</span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight">
            Selected Projects
          </h2>
        </div>

        {/* Grid Collage Container */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-card"
        >
          {projectsData.map((project) => (
            <div 
              key={project.id}
              className="cursor-pointer group preserve-3d"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setActiveProject(project)}
            >
              {/* Animated 3D Card Inner */}
              <div className="tilt-inner glassmorphism rounded-3xl overflow-hidden transition-shadow duration-300 hover:shadow-2xl hover:shadow-accentSky/5">
                {/* Visual Header Image */}
                <div className="aspect-video w-full overflow-hidden border-b border-white/5 relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle layout shade overlay */}
                  <div className="absolute inset-0 bg-midnight/20 group-hover:bg-transparent transition-colors duration-300" />
                </div>
                
                {/* Description Body */}
                <div className="p-6 md:p-8 preserve-3d">
                  <div className="flex flex-wrap gap-2 mb-4 translate-z-20">
                    {project.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="text-[10px] font-semibold uppercase tracking-wider text-accentSky bg-accentSky/10 px-2.5 py-1 rounded-full border border-accentSky/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="font-heading font-bold text-xl text-white mb-3 group-hover:text-accentSky transition-colors duration-300 translate-z-20">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-textSecondary leading-relaxed translate-z-20">
                    {project.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Detail Modal Overlay */}
        {activeProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/90 backdrop-blur-md">
            <div 
              className="glassmorphism max-w-2xl w-full rounded-3xl overflow-hidden shadow-2xl border-white/10 animate-in fade-in zoom-in duration-300 max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal header image */}
              <div className="relative aspect-video w-full flex-shrink-0">
                <img 
                  src={activeProject.image} 
                  alt={activeProject.title} 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => setActiveProject(null)}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-midnight/65 backdrop-blur-md text-white border border-white/10 flex items-center justify-center hover:bg-white hover:text-midnight transition-colors duration-300"
                  aria-label="Close modal"
                >
                  ✕
                </button>
              </div>
              
              {/* Modal description scroll body */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6">
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {activeProject.tags.map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="text-[10px] font-semibold uppercase tracking-wider text-accentSky bg-accentSky/10 px-2.5 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-heading font-bold text-2xl text-white">
                    {activeProject.title}
                  </h3>
                </div>
                
                <p className="text-sm md:text-base text-textSecondary leading-relaxed">
                  {activeProject.fullDesc}
                </p>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-accentSky">
                    Key Features
                  </h4>
                  <ul className="list-none space-y-2">
                    {activeProject.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex gap-2.5 text-sm text-textSecondary leading-relaxed">
                        <span className="text-accentSky">✓</span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Modal footer close */}
              <div className="p-4 border-t border-white/5 bg-white/[0.01] flex justify-end flex-shrink-0">
                <button 
                  onClick={() => setActiveProject(null)}
                  className="px-6 py-2.5 rounded-full font-semibold bg-white text-midnight hover:bg-accentSky hover:text-white transition-colors duration-300 text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
