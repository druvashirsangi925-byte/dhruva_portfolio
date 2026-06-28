import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef();
  const formRef = useRef();
  const infoRef = useRef();
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal Form
      gsap.fromTo(formRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
          }
        }
      );

      // Reveal Info
      gsap.fromTo(infoRef.current,
        { opacity: 0, x: 30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your message was simulated successfully.`);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('druvashirsangi925@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section ref={containerRef} id="contact" className="py-24 px-6 relative border-t border-white/5">
      <div className="max-w-4xl mx-auto w-full">
        
        {/* Section Heading */}
        <div className="mb-16">
          <span className="font-serif italic text-xl text-accentSky block mb-2">06. Connection</span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight">
            Get In Touch
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 items-start">
          
          {/* Contact Form Column */}
          <div ref={formRef} className="md:col-span-3 glassmorphism p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-accentSky/5 rounded-full blur-xl" />
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label htmlFor="form-name" className="text-xs font-semibold uppercase tracking-wider text-textSecondary">
                  Name
                </label>
                <input 
                  type="text" 
                  id="form-name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full bg-midnight/50 border border-borderDark focus:border-accentSky/50 text-white rounded-xl px-4 py-3.5 outline-none transition-colors duration-300 text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="form-email" className="text-xs font-semibold uppercase tracking-wider text-textSecondary">
                  Email Address
                </label>
                <input 
                  type="email" 
                  id="form-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-midnight/50 border border-borderDark focus:border-accentSky/50 text-white rounded-xl px-4 py-3.5 outline-none transition-colors duration-300 text-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="form-message" className="text-xs font-semibold uppercase tracking-wider text-textSecondary">
                  Message
                </label>
                <textarea 
                  id="form-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell me about your project or role..."
                  className="w-full bg-midnight/50 border border-borderDark focus:border-accentSky/50 text-white rounded-xl px-4 py-3.5 outline-none transition-colors duration-300 text-sm resize-none"
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                id="contact-form-submit"
                className="w-full py-4 rounded-xl font-semibold bg-white text-midnight hover:bg-accentSky hover:text-white transition-colors duration-300 text-sm shadow-md"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Details Column */}
          <div ref={infoRef} className="md:col-span-2 space-y-8">
            
            {/* Quick statement */}
            <div className="space-y-3">
              <h3 className="font-heading font-bold text-xl text-white">
                Let's talk about projects or roles!
              </h3>
              <p className="text-sm text-textSecondary leading-relaxed">
                I am interested in full-time, part-time, or internship opportunities in software engineering, database scripting, and UI/UX engineering.
              </p>
            </div>

            {/* Action Cards */}
            <div className="space-y-4">
              
              {/* Copy Email Button */}
              <div className="relative group">
                <button 
                  onClick={handleCopyEmail}
                  id="copy-email-btn"
                  className="w-full glassmorphism p-5 rounded-2xl flex items-center justify-between border-white/5 bg-white/[0.01] hover:border-accentSky/25 transition-all duration-300"
                >
                  <div className="text-left">
                    <span className="text-[10px] text-textSecondary uppercase block">Email</span>
                    <span className="text-sm text-white font-medium">druvashirsangi925@gmail.com</span>
                  </div>
                  <span className="text-xs font-semibold text-accentSky bg-accentSky/10 px-2.5 py-1 rounded-full">
                    {copied ? 'Copied!' : 'Copy'}
                  </span>
                </button>
              </div>

              {/* Call Link */}
              <a 
                href="tel:+919353800925" 
                id="phone-link"
                className="block glassmorphism p-5 rounded-2xl flex items-center justify-between border-white/5 bg-white/[0.01] hover:border-accentSky/25 transition-all duration-300"
              >
                <div>
                  <span className="text-[10px] text-textSecondary uppercase block">Phone</span>
                  <span className="text-sm text-white font-medium">+91 9353800925</span>
                </div>
                <span className="text-xs font-semibold text-accentSky bg-accentSky/10 px-2.5 py-1 rounded-full">
                  Call
                </span>
              </a>

            </div>

            {/* Social Links block */}
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-textSecondary block">
                Social Networks
              </span>
              <div className="flex gap-3">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noopener" 
                  id="linkedin-link"
                  className="px-4 py-2 text-xs font-semibold text-textSecondary border border-borderDark rounded-full hover:border-white hover:text-white transition-colors duration-300"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noopener" 
                  id="github-link"
                  className="px-4 py-2 text-xs font-semibold text-textSecondary border border-borderDark rounded-full hover:border-white hover:text-white transition-colors duration-300"
                >
                  GitHub
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Footer info */}
        <footer className="mt-24 border-t border-white/5 pt-8 text-center text-xs text-textSecondary">
          <p>© 2026 Dhruva I S. Built with React, React Three Fiber & GSAP.</p>
        </footer>

      </div>
    </section>
  );
}
