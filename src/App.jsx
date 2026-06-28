import React, { useState, useEffect } from 'react';
import BackgroundCanvas from './components/BackgroundCanvas';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function App() {
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    // Setup active state tracking for navigation menu items on scroll
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top 40%',
        end: 'bottom 40%',
        onEnter: () => setActiveLink(section.id),
        onEnterBack: () => setActiveLink(section.id),
        onLeave: () => {
          // Clear active state if scrolled past
          if (section.id === 'contact') setActiveLink('');
        },
        onLeaveBack: () => {
          // Clear active state if scrolled back above Hero
          if (section.id === 'about') setActiveLink('');
        }
      });
    });

    // Custom smooth scroll navigation handling
    const navLinks = document.querySelectorAll('.nav-link-item');
    navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          gsap.to(window, {
            scrollTo: {
              y: targetSection,
              offsetY: 80
            },
            duration: 1,
            ease: 'power3.inOut'
          });
        }
      });
    });
  }, []);

  const navItems = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Education', href: '#education', id: 'education' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Certifications', href: '#certifications', id: 'certifications' },
    { name: 'Contact', href: '#contact', id: 'contact' }
  ];

  return (
    <div className="relative min-h-screen selection:bg-accentSky/30 selection:text-white">
      
      {/* 3D Morphing Particle Canvas Background */}
      <BackgroundCanvas />

      {/* Navigation Header */}
      <header className="fixed top-0 left-0 w-full z-40 border-b border-white/5 bg-midnight/70 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          
          {/* Logo */}
          <a href="#" className="font-heading font-extrabold text-lg text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-accentSky animate-pulse" />
            Dhruva I S
          </a>
          
          {/* Nav Items (Double Text Shift Hover Animation) */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a 
                key={item.id} 
                href={item.href}
                className="nav-link nav-link-item h-6 overflow-hidden relative block"
              >
                <span 
                  className={`link-text block relative font-medium text-[13px] tracking-wider uppercase transition-transform duration-300 ${
                    activeLink === item.id ? 'text-accentSky translate-y-[-100%]' : 'text-textSecondary'
                  }`}
                  data-hover={item.name}
                >
                  {item.name}
                </span>
              </a>
            ))}
          </nav>
          
          {/* Mobil CTA Button */}
          <a 
            href="#contact" 
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full border border-white/10 hover:border-accentSky hover:text-accentSky transition-colors duration-300 backdrop-blur-sm"
          >
            Hire Me
          </a>
        </div>
      </header>

      {/* Main Sections */}
      <main className="relative">
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Certifications />
        <Contact />
      </main>

    </div>
  );
}
