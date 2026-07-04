import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiCode, FiZap } from 'react-icons/fi';

const achievements = [
  {
    title: 'Software and Project Management',
    issuer: 'Coursera',
    date: '2025',
    category: 'CERTIFICATE',
    desc: 'Deep study of software lifecycles, Agile and Scrum management methodologies, and code delivery systems.',
    icon: <FiAward className="w-6 h-6 text-white" />
  },
  {
    title: 'Programming in C, Java',
    issuer: 'Infosys Springboard',
    date: '2024',
    category: 'CREDENTIAL',
    desc: 'Mastery of Object-Oriented Principles, data structures, algorithms, and SQL relational query design.',
    icon: <FiCode className="w-6 h-6 text-white" />
  },
  {
    title: '1000+ Coding Hours',
    issuer: 'Academic & Personal',
    date: 'Continuous',
    category: 'MILESTONE',
    desc: 'Dedicated learning, building full-stack platforms, script automation, and interactive web client experiences.',
    icon: <FiZap className="w-6 h-6 text-white" />
  },
  {
    title: 'College Hackathons',
    issuer: 'AIET & Local',
    date: '2023 — 2024',
    category: 'COMPETITION',
    desc: 'Participated in rapid-prototyping events, developing software and IoT elderly health tracker solutions.',
    icon: <FiAward className="w-6 h-6 text-white" />
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-32 px-6 relative overflow-hidden bg-transparent">
      
      {/* Background decoration grid elements */}
      <div className="absolute inset-0 grid-overlay opacity-[0.03]" />

      <div className="max-w-4xl mx-auto w-full">
        
        {/* Section Heading */}
        <div className="mb-20">
          <span className="font-serif italic text-xl text-white/50 block mb-3">06. Milestones</span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight uppercase">
            Achievements
          </h2>
          <div className="w-20 h-[1px] bg-white/20 mt-4" />
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ 
                opacity: 0, 
                scale: 0.9, 
                filter: 'blur(10px)',
                rotate: index % 2 === 0 ? -1 : 1
              }}
              whileInView={{ 
                opacity: 1, 
                scale: 1, 
                filter: 'blur(0px)',
                rotate: 0
              }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: [0.16, 1, 0.3, 1] 
              }}
              whileHover={{ 
                scale: 1.03,
                filter: 'blur(0px)',
                rotate: 0,
                transition: { duration: 0.3 }
              }}
              className="glassmorphism p-8 rounded-3xl relative overflow-hidden group flex flex-col justify-between border border-white/5 hover:border-white/20 transition-all duration-300"
            >
              {/* Card Hover expansion background glow */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] rounded-full blur-xl group-hover:bg-white/[0.04] transition-colors duration-500" />
              
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] font-bold tracking-widest text-white/40 uppercase bg-white/5 px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                  <span className="text-[11px] font-mono text-white/55">{item.date}</span>
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-[10px] text-textSecondary uppercase block">{item.issuer}</span>
                    <h3 className="font-heading font-bold text-lg text-white group-hover:text-white transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </div>

              <p className="text-sm text-textSecondary leading-relaxed mt-6">
                {item.desc}
              </p>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
