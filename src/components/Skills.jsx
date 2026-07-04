import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const skillsData = [
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', detail: 'Scripting, Data processing, automation scripts.' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', detail: 'Object-Oriented Architecture & OOP.' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', detail: 'Frontend logics, ES6, interactive sites.' },
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', detail: 'Hooks, Virtual DOM, modular UI.' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', detail: 'Server rendering, routing framework.' },
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', detail: 'Server architecture & environment APIs.' },
  { name: 'Express.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', detail: 'RESTful API routing & middlewares.' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', detail: 'NoSQL collections & query optimization.' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', detail: 'Relational databases, indexing, grids.' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', detail: 'Version histories & branch systems.' },
  { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg', detail: 'Pull requests, reviews, and workflows.' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg', detail: 'Cloud bucket systems & basic host.' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', detail: 'Strong typing, interfaces, scalable JS.' },
  { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', detail: 'Data structures, low-level execution.' },
  { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg', detail: 'Semantic structuring, SEO baseline.' },
  { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg', detail: 'Grid overlays, transforms, variables.' },
  { name: 'Tailwind CSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', detail: 'Utility-first rapid stylings.' }
];

export default function Skills() {

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const rotateX = -(y - yc) / 8;
    const rotateY = (x - xc) / 8;
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.2,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (e) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power3.out'
    });
  };

  return (
    <section id="skills" className="py-32 px-6 relative overflow-hidden bg-transparent">
      
      {/* Background decoration blur */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full">
        
        {/* Section Heading */}
        <div className="mb-20">
          <span className="font-serif italic text-xl text-white/50 block mb-3">03. Capabilities</span>
          <h2 className="font-heading font-extrabold text-4xl md:text-6xl text-white tracking-tight uppercase">
            Technical Stack
          </h2>
          <div className="w-20 h-[1px] bg-white/20 mt-6" />
        </div>

        {/* Floating Skill Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 perspective-card">
          {skillsData.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: (index % 6) * 0.1, ease: [0.16, 1, 0.3, 1] }}
              animate={{
                y: [0, -5, 0],
              }}
              // Infinite float animation loop
              transition={{
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: index * 0.25
                }
              }}
              whileHover={{ 
                scale: 1.04, 
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.5)',
                transition: { duration: 0.2 }
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="glassmorphism p-5 rounded-3xl min-h-[140px] flex flex-col items-center justify-center text-center cursor-none relative group preserve-3d border border-white/5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.02]"
            >
              {/* Foreground container default view */}
              <div className="flex flex-col items-center justify-center space-y-3 group-hover:opacity-0 group-hover:scale-95 transition-all duration-300 w-full preserve-3d">
                <div className="w-12 h-12 flex items-center justify-center relative translate-z-20 filter grayscale hover:grayscale-0 transition-all duration-500">
                  <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wider text-white">
                  {skill.name}
                </span>
              </div>

              {/* Hover reveal experience details */}
              <div className="absolute inset-0 p-4 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 pointer-events-none">
                <span className="text-[10px] font-bold tracking-widest text-white/50 uppercase mb-2">
                  {skill.name}
                </span>
                <p className="text-[10px] text-textSecondary leading-normal">
                  {skill.detail}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
