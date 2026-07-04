import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import abstract1 from '../assets/gallery_abstract_1.png';
import abstract2 from '../assets/gallery_abstract_2.png';
import abstract3 from '../assets/gallery_abstract_3.png';

export default function Gallery() {
  const cardsRef = useRef([]);

  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    
    const rotateX = -(y - yc) / 10;
    const rotateY = (x - xc) / 10;
    
    gsap.to(card, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    if (!card) return;
    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: 'power3.out'
    });
  };

  return (
    <section id="gallery" className="py-32 px-6 relative bg-transparent overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-white/[0.01] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full">
        
        {/* Section Heading */}
        <div className="mb-20">
          <span className="font-sans text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase block mb-3">
            02. Editorial
          </span>
          <h2 className="font-heading font-extrabold text-4xl md:text-6xl text-white tracking-tight uppercase">
            Portrait Gallery
          </h2>
          <div className="w-20 h-[1px] bg-white/20 mt-6" />
        </div>

        {/* Editorial Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 perspective-card items-stretch">
          
          {/* Card 1: Large Glass Portrait (LHS - 5 Columns wide) */}
          <motion.div
            ref={(el) => (cardsRef.current[0] = el)}
            onMouseMove={(e) => handleMouseMove(e, 0)}
            onMouseLeave={() => handleMouseLeave(0)}
            initial={{ opacity: 0, y: 45 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            animate={{ y: [0, -6, 0] }}
            // continuous float animation
            transition={{
              y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
            }}
            className="lg:col-span-5 glassmorphism p-3 rounded-3xl cursor-none relative preserve-3d shadow-2xl h-[500px]"
          >
            <div className="w-full h-full rounded-2xl overflow-hidden relative">
              <img 
                src={abstract1} 
                alt="Abstract composition vertical view" 
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                loading="lazy"
              />
              <div className="absolute bottom-4 left-4 z-20">
                <span className="text-[10px] font-mono tracking-widest text-white/60 bg-midnight/60 px-3 py-1 rounded-full backdrop-blur-sm">
                  EXPOSURE // 01
                </span>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Abstract sculpture detail */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
            
            {/* Abstract Detail Card */}
            <motion.div
              ref={(el) => (cardsRef.current[1] = el)}
              onMouseMove={(e) => handleMouseMove(e, 1)}
              onMouseLeave={() => handleMouseLeave(1)}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25 }}
              animate={{ y: [0, 6, 0] }}
              transition={{
                y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }
              }}
              className="md:col-span-6 glassmorphism p-3 rounded-3xl cursor-none relative preserve-3d shadow-xl h-[400px] lg:h-[240px]"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden relative">
                <img 
                  src={abstract2} 
                  alt="Abstract geometry detail" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                
                {/* Magazine title overlay */}
                <div className="absolute inset-0 bg-midnight/10 flex flex-col justify-end p-4">
                  <h3 className="font-heading font-extrabold text-sm tracking-widest text-white uppercase">
                    DHRUVA ED. 2026
                  </h3>
                </div>
              </div>
            </motion.div>

            {/* Card 3: Polaroid Vintage Style */}
            <motion.div
              ref={(el) => (cardsRef.current[2] = el)}
              onMouseMove={(e) => handleMouseMove(e, 2)}
              onMouseLeave={() => handleMouseLeave(2)}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35 }}
              animate={{ y: [0, -5, 0] }}
              transition={{
                y: { duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 0.25 }
              }}
              className="md:col-span-6 bg-white p-3 pb-12 rounded-2xl cursor-none relative preserve-3d shadow-2xl h-[400px] lg:h-[240px] text-midnight"
            >
              <div className="w-full h-[85%] rounded-lg overflow-hidden relative border border-midnight/5">
                <img 
                  src={abstract2} 
                  alt="Abstract snapshot" 
                  className="w-full h-full object-cover grayscale brightness-95"
                  loading="lazy"
                />
              </div>
              <div className="pt-3 text-center w-full">
                <span className="font-serif italic text-xs tracking-wider text-midnight/80 font-bold block">
                  Hubli, India — Exposure '26
                </span>
              </div>
            </motion.div>

            {/* Card 4: Magazine Spread Layout (Bottom Row - 12 Columns wide) */}
            <motion.div
              ref={(el) => (cardsRef.current[3] = el)}
              onMouseMove={(e) => handleMouseMove(e, 3)}
              onMouseLeave={() => handleMouseLeave(3)}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              animate={{ y: [0, 4, 0] }}
              transition={{
                y: { duration: 6.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }
              }}
              className="md:col-span-12 glassmorphism rounded-3xl p-6 md:p-8 cursor-none relative preserve-3d shadow-2xl flex flex-col md:flex-row gap-6 md:items-center h-auto lg:h-[220px]"
            >
              <div className="w-full md:w-1/3 h-48 md:h-full rounded-2xl overflow-hidden relative flex-shrink-0">
                <img 
                  src={abstract3} 
                  alt="Abstract banner composition" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              {/* Text Layout */}
              <div className="flex-grow flex flex-col justify-between h-full py-2 space-y-4">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-[10px] font-bold tracking-widest text-white/40 uppercase">
                    Vol. 01 / Issue 02
                  </span>
                  <span className="text-[9px] font-mono text-white/30">
                    44°20'N  72°15'W
                  </span>
                </div>
                
                <h4 className="font-heading font-extrabold text-xl md:text-2xl tracking-tight text-white uppercase leading-none">
                  "ENGINEERING SYSTEMS WITH CREATIVE COMPOSURE"
                </h4>

                <p className="text-[11px] text-textSecondary leading-relaxed">
                  Integrating front-end rendering engines with efficient database architectures to optimize client-server interactions and user experiences.
                </p>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
