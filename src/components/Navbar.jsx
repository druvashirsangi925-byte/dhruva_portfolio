import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { HiMenuAlt4, HiX } from 'react-icons/hi';

gsap.registerPlugin(ScrollToPlugin);

const navItems = [
  { name: 'Home', href: '#hero', id: 'hero' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Projects', href: '#projects', id: 'projects' },
  { name: 'Skills', href: '#skills', id: 'skills' },
  { name: 'Experience', href: '#education', id: 'education' },
  { name: 'Achievements', href: '#achievements', id: 'achievements' },
  { name: 'Gallery', href: '#gallery', id: 'gallery' },
  { name: 'Contact', href: '#contact', id: 'contact' }
];

export default function Navbar({ activeLink }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navbarRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled((prev) => {
        if (prev !== scrolled) return scrolled;
        return prev;
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    const targetElement = document.querySelector(href);
    if (targetElement) {
      gsap.to(window, {
        scrollTo: {
          y: targetElement,
          offsetY: 70
        },
        duration: 1.2,
        ease: 'power4.inOut'
      });
    }
  };

  // Magnetic hover effect handler
  const handleMouseMove = (e) => {
    const item = e.currentTarget;
    const rect = item.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(item, {
      x: x * 0.35,
      y: y * 0.35,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (e) => {
    const item = e.currentTarget;
    gsap.to(item, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)'
    });
  };

  return (
    <>
      <motion.header
        ref={navbarRef}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled 
            ? 'py-3 bg-midnight/65 backdrop-blur-xl border-b border-white/5 shadow-2xl' 
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          
          {/* Logo */}
          <a 
            href="#hero" 
            onClick={(e) => handleNavClick(e, '#hero')}
            className="font-heading font-extrabold text-xl tracking-tight text-white flex items-center gap-2 group cursor-none"
          >
            <span className="font-heading font-bold tracking-widest text-sm text-white/90">DIS</span>
          </a>
          
          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = activeLink === item.id;
              return (
                <a 
                  key={item.id} 
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  className="relative px-4 py-2 text-xs font-semibold uppercase tracking-wider text-textSecondary hover:text-white transition-colors duration-300 cursor-none block rounded-full"
                >
                  <span className="relative z-10">{item.name}</span>
                  {isActive && (
                    <span
                      className="absolute inset-0 bg-white/[0.05] rounded-full border border-white/10 transition-all duration-300"
                    />
                  )}
                </a>
              );
            })}
          </nav>
          
          {/* CTA / Contact Button */}
          <div className="hidden lg:block">
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, '#contact')}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="px-6 py-2.5 text-xs font-semibold uppercase tracking-widest rounded-full border border-white/15 bg-white/5 hover:bg-white hover:text-midnight transition-all duration-300 cursor-none shadow-sm block"
            >
              Let's Connect
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/5 rounded-full cursor-none transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <HiX size={24} /> : <HiMenuAlt4 size={24} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 top-[60px] z-30 lg:hidden glassmorphism border-b border-white/10 px-6 py-8 flex flex-col gap-6"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = activeLink === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-sm font-semibold uppercase tracking-widest py-2 border-b border-white/5 transition-colors duration-300 ${
                      isActive ? 'text-white pl-2 border-l-2 border-l-white border-b-0' : 'text-textSecondary hover:text-white'
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
            </nav>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="w-full text-center py-3 text-xs font-bold uppercase tracking-widest rounded-full bg-white text-midnight hover:bg-white/90 transition-colors duration-300"
            >
              Let's Connect
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
