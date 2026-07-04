import React from 'react';
import { motion } from 'framer-motion';
import { FiServer, FiLayout, FiDatabase, FiFeather, FiCode, FiLayers } from 'react-icons/fi';
import { TbCpu } from 'react-icons/tb';

const services = [
  {
    title: 'Software Engineering',
    desc: 'Building robust desktop applications, automation utilities, and scripts in Java and Python with clean OOP structures and efficient logic.',
    icon: <FiCode className="w-8 h-8 text-white" />,
    tag: 'DEVELOPMENT'
  },
  {
    title: 'Database Architecture',
    desc: 'Designing optimized relational schemas in MySQL and document-oriented databases in MongoDB, writing high-performance queries and indexes.',
    icon: <FiDatabase className="w-8 h-8 text-white" />,
    tag: 'DATABASE'
  },
  {
    title: 'Frontend Development',
    desc: 'Building immersive, high-performance web user interfaces using React, Next.js, and Tailwind CSS with smooth animations at 120 FPS.',
    icon: <FiLayout className="w-8 h-8 text-white" />,
    tag: 'INTERFACES'
  },
  {
    title: 'Backend Development',
    desc: 'Developing robust, scalable server architectures using Node.js, Express, and optimizing relational/non-relational database queries.',
    icon: <FiServer className="w-8 h-8 text-white" />,
    tag: 'INFRASTRUCTURE'
  },
  {
    title: 'Full Stack Development',
    desc: 'Combining secure API integrations with responsive designs, creating seamless communication channels from database to user client.',
    icon: <FiLayers className="w-8 h-8 text-white" />,
    tag: 'END-TO-END'
  },
  {
    title: 'Web Design',
    desc: 'Designing premium, minimal interfaces with strict typography grids, prototyping in Figma, and creating beautiful user flows.',
    icon: <FiFeather className="w-8 h-8 text-white" />,
    tag: 'AESTHETICS'
  }
];

export default function Services() {
  return (
    <section id="services" className="py-32 px-6 relative overflow-hidden bg-transparent">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full">
        
        {/* Section Heading */}
        <div className="mb-20">
          <span className="font-serif italic text-xl text-white/50 block mb-3">04. Services</span>
          <h2 className="font-heading font-extrabold text-4xl md:text-6xl text-white tracking-tight uppercase">
            Areas of Expertise
          </h2>
          <div className="w-20 h-[1px] bg-white/20 mt-6" />
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -8 }}
              className="glassmorphism p-8 rounded-3xl relative overflow-hidden group flex flex-col justify-between min-h-[300px] border border-white/5 bg-white/[0.01] transition-all duration-500 hover:border-white/20 hover:bg-white/[0.03]"
            >
              {/* Card Spotlight reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              
              {/* Top Row */}
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold tracking-widest text-white/40 uppercase bg-white/5 px-2.5 py-1 rounded-full">
                    {service.tag}
                  </span>
                  
                  {/* Floating Icon Container */}
                  <motion.div 
                    animate={{
                      y: [0, -4, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.3
                    }}
                    className="w-14 h-14 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-midnight transition-colors duration-500"
                  >
                    <div className="group-hover:scale-110 group-hover:invert transition-all duration-500">
                      {service.icon}
                    </div>
                  </motion.div>
                </div>

                <h3 className="font-heading font-bold text-xl text-white group-hover:text-white transition-colors duration-300 pt-4">
                  {service.title}
                </h3>
              </div>

              {/* Bottom Row */}
              <p className="text-sm text-textSecondary leading-relaxed mt-6">
                {service.desc}
              </p>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
