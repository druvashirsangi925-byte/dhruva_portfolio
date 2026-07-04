import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiGithub, FiExternalLink, FiX } from 'react-icons/fi';

import iotImg from '../assets/iot_health_dashboard.png';
import homeImg from '../assets/home_service_ui.png';
import studentImg from '../assets/student_analytics_ui.png';
import eventImg from '../assets/event_portal_ui.png';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 1,
    title: 'Personal Portfolio',
    desc: 'Award-winning interactive design incorporating React Three Fiber canvas, GSAP, and Lenis scroll.',
    fullDesc: 'A flagship portfolio designed to test the limits of modern front-end capabilities. It features custom WebGL shaders, particle morphing grids synced to page scroll states, custom inertial scroll frameworks, and magnetic cursor interaction rings. Built with a luxurious dark monochrome design philosophy.',
    image: studentImg,
    tags: ['React', 'Three.js', 'GSAP', 'Framer Motion'],
    challenges: 'Ensuring fluid 120 FPS render loops while drawing 2,000 particle systems and managing concurrent scroll events.',
    features: [
      '3D Particle Cloud Morphing triggered by ScrollTrigger.',
      'Lenis smooth inertial scrolling integration.',
      'Magnetic micro-interactions on navigation headers and button layouts.',
      'Responsive design fitting desktop, tablet, and mobile.'
    ],
    github: 'https://github.com',
    live: 'https://github.com'
  },
  {
    id: 2,
    title: 'BankLite Loan Management System',
    desc: 'Full-stack database architecture to streamline loan requests, risk evaluations, and borrower ledgers.',
    fullDesc: 'A desktop and web administration system developed to help financial administrators track client loan details. It integrates Java database connections with optimized query indexings, ensuring quick access to borrower logs, credit ratings, payment structures, and approval status reports.',
    image: iotImg,
    tags: ['Java', 'SQL', 'JDBC', 'MySQL'],
    challenges: 'Configuring secure database connectivity and avoiding query blockages during bulk user queries.',
    features: [
      'Role-based admin access interfaces.',
      'Automated credit evaluation algorithm scripts.',
      'Dynamic calculation sheets outputting repayment structures.',
      'Database logs maintaining transaction histories.'
    ],
    github: 'https://github.com',
    live: 'https://github.com'
  },
  {
    id: 3,
    title: 'Weather Application',
    desc: 'Responsive web application providing real-time forecasts, atmospheric metrics, and geo-locations.',
    fullDesc: 'A clean, typography-focused weather client that hooks into RESTful API endpoints. It tracks current latitude and longitude to fetch localized metrics like humidity, wind velocities, UV indexes, and hourly/weekly forecasting graphs.',
    image: homeImg,
    tags: ['JavaScript', 'HTML5', 'CSS3', 'Weather API'],
    challenges: 'Handling API rate throttling issues and managing fallbacks when browser geolocation permission is denied.',
    features: [
      'Localized auto-location weather tracking.',
      'Live atmospheric index charts.',
      'Dynamic visual themes adapting to weather states (sunny, rainy, storm).',
      'Search caching storing recently looked-up cities.'
    ],
    github: 'https://github.com',
    live: 'https://github.com'
  },
  {
    id: 4,
    title: 'Predictive Student Analytics',
    desc: 'Python scripts processing academic datasets to identify key student performance trends.',
    fullDesc: 'An analytics engine designed to help academic counselors locate performance trends and grade distributions. Utilizing statistical correlation matrices and descriptive metrics, it computes insights from mock student profiles, grading logs, and attendance indicators.',
    image: studentImg,
    tags: ['Python', 'Pandas', 'Matplotlib', 'SQL'],
    challenges: 'Cleaning incomplete student datasets and structuring efficient data aggregation queries.',
    features: [
      'Academic performance correlation modeling.',
      'Interactive dashboard rendering performance averages.',
      'Auto-generated Excel progress spreadsheets output.',
      'Optimized SQL queries aggregating student record averages.'
    ],
    github: 'https://github.com',
    live: 'https://github.com'
  },
  {
    id: 5,
    title: 'IoT Health Analytics Dashboard',
    desc: 'Smart sensor data analytics monitoring vital arrays and alerting caregivers during health anomalies.',
    fullDesc: 'An interactive healthcare dashboard designed to monitor body temperature, pulse rates, and motion indicators of patients. Utilizing threshold detection and logging scripts, the app triggers instant alerts if vitals fall outside normal ranges.',
    image: iotImg,
    tags: ['Python', 'Sensors', 'Dashboard', 'Data Logging'],
    challenges: 'Simulating live hardware sensor streams and structuring quick asynchronous threshold check notifications.',
    features: [
      'Simulated health sensor telemetry processing.',
      'Asynchronous alert dispatch logic.',
      'Live charting libraries outputting real-time pulse graphs.',
      'Alert dashboard displaying patient histories.'
    ],
    github: 'https://github.com',
    live: 'https://github.com'
  },
  {
    id: 6,
    title: 'Python Applications',
    desc: 'Automation utilities, custom database scrapers, and command-line system monitors.',
    fullDesc: 'A suite of utility projects built to simplify file administration and database entries. It includes automated backup tools, local disk space monitors, and customizable web scraping scripts that format data directly into SQL tables.',
    image: eventImg,
    tags: ['Python', 'SQL', 'Automation', 'Scraping'],
    challenges: 'Designing script execution policies that handle target server delays and request timeouts.',
    features: [
      'Auto-scheduling backup script utilities.',
      'File system directory structural cleanup logic.',
      'Relational tables populators handling JSON raw inputs.',
      'Real-time disk temperature metrics outputs.'
    ],
    github: 'https://github.com',
    live: 'https://github.com'
  },
  {
    id: 7,
    title: 'Java Applications',
    desc: 'College administration portals, registry portals, and data file management modules.',
    fullDesc: 'A desk registry portal where academic administrators can coordinate events, register workshops, and schedule student classrooms. It implements standard OOP design patterns to manage data structures efficiently.',
    image: homeImg,
    tags: ['Java', 'Swing', 'File I/O', 'OOP'],
    challenges: 'Structuring interactive Swing interfaces without bloating thread queues or slowing renders.',
    features: [
      'Event coordination schedules management layouts.',
      'Workshop registry handlers saving local data backups.',
      'Modular object hierarchies managing student courses.',
      'Clean table grids showcasing classroom occupancies.'
    ],
    github: 'https://github.com',
    live: 'https://github.com'
  }
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState(null);
  const containerRef = useRef();
  const gridRef = useRef();

  // Escape key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveProject(null);
      }
    };
    if (activeProject) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeProject]);

  useEffect(() => {
    const ctx = gsap.context(() => {
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

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const rotateX = -(y - yc) / 10;
    const rotateY = (x - xc) / 10;
    
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
    <section ref={containerRef} id="projects" className="py-32 px-6 relative bg-transparent">
      
      {/* Background decoration radial glow */}
      <div className="absolute bottom-1/4 left-10 w-[300px] h-[300px] bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full">
        
        {/* Section Heading */}
        <div className="mb-20">
          <span className="font-serif italic text-xl text-white/50 block mb-3">02. Works</span>
          <h2 className="font-heading font-extrabold text-4xl md:text-6xl text-white tracking-tight uppercase">
            Selected Projects
          </h2>
          <div className="w-20 h-[1px] bg-white/20 mt-6" />
        </div>

        {/* Grid Collage Container */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-card"
        >
          {projectsData.map((project) => (
            <div 
              key={project.id}
              className="cursor-none group preserve-3d"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onClick={() => setActiveProject(project)}
            >
              <div className="tilt-inner glassmorphism rounded-3xl overflow-hidden transition-all duration-300 border border-white/5 bg-white/[0.01] hover:border-white/20 hover:shadow-2xl">
                
                {/* Visual Header Image */}
                <div className="aspect-video w-full overflow-hidden border-b border-white/5 relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Subtle spotlight layout shade overlay */}
                  <div className="absolute inset-0 bg-midnight/30 group-hover:bg-transparent transition-colors duration-300" />
                </div>
                
                {/* Description Body */}
                <div className="p-6 md:p-8 preserve-3d">
                  <div className="flex flex-wrap gap-2 mb-4 translate-z-20">
                    {project.tags.slice(0, 2).map((tag, idx) => (
                      <span 
                        key={idx} 
                        className="text-[9px] font-bold uppercase tracking-widest text-white bg-white/5 px-2.5 py-1 rounded-full border border-white/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <h3 className="font-heading font-bold text-lg text-white mb-3 group-hover:text-white transition-colors duration-300 translate-z-20">
                    {project.title}
                  </h3>
                  
                  <p className="text-xs text-textSecondary leading-relaxed translate-z-20 line-clamp-2">
                    {project.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Fullscreen Detail Modal */}
        <AnimatePresence>
          {activeProject && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-midnight/90 backdrop-blur-md"
              onClick={() => setActiveProject(null)}
            >
              <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="glassmorphism max-w-3xl w-full rounded-3xl overflow-hidden shadow-2xl border-white/10 flex flex-col max-h-[85vh] relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close modal button positioned on top of everything */}
                <button 
                  onClick={(e) => { e.stopPropagation(); setActiveProject(null); }}
                  className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full bg-midnight/80 backdrop-blur-md text-white border border-white/10 flex items-center justify-center hover:bg-white hover:text-midnight transition-all duration-300 cursor-none pointer-events-auto"
                  aria-label="Close modal"
                >
                  <FiX size={18} />
                </button>

                {/* Modal header image */}
                <div className="relative aspect-video w-full flex-shrink-0">
                  <img 
                    src={activeProject.image} 
                    alt={activeProject.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Modal description scroll body */}
                <div className="p-6 md:p-8 overflow-y-auto space-y-6">
                  <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {activeProject.tags.map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="text-[9px] font-bold uppercase tracking-widest text-white bg-white/5 px-2.5 py-1 rounded-full border border-white/10"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-heading font-extrabold text-2xl text-white">
                      {activeProject.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm text-textSecondary leading-relaxed">
                    {activeProject.fullDesc}
                  </p>

                  {/* Tech challenges section */}
                  <div className="space-y-2 border-t border-white/5 pt-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white/50">
                      Technical Challenges
                    </h4>
                    <p className="text-xs text-textSecondary leading-relaxed italic">
                      "{activeProject.challenges}"
                    </p>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3 border-t border-white/5 pt-4">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white/50">
                      Key Deliverables
                    </h4>
                    <ul className="space-y-2 text-xs text-textSecondary">
                      {activeProject.features.map((feature, idx) => (
                        <li key={idx} className="flex gap-2.5 items-start leading-relaxed">
                          <span className="text-white mt-0.5">•</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                {/* Modal footer close & links */}
                <div className="p-4 md:p-6 border-t border-white/5 bg-white/[0.01] flex justify-between items-center flex-shrink-0">
                  <div className="flex gap-4">
                    <a 
                      href={activeProject.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-semibold text-textSecondary hover:text-white transition-colors duration-300 cursor-none"
                    >
                      <FiGithub size={14} /> GitHub
                    </a>
                    <a 
                      href={activeProject.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs font-semibold text-textSecondary hover:text-white transition-colors duration-300 cursor-none"
                    >
                      <FiExternalLink size={14} /> Live Demo
                    </a>
                  </div>
                  <button 
                    onClick={() => setActiveProject(null)}
                    className="px-6 py-2 rounded-full font-bold bg-white text-midnight hover:bg-white/80 transition-colors duration-300 text-xs uppercase tracking-widest cursor-none"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
