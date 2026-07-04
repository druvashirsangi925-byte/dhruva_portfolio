import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiInstagram, FiDownload } from 'react-icons/fi';
import heroImg from '../assets/hero.png';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef();
  const cardRef = useRef();
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal the large glass card on scroll
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 50, scale: 0.96, filter: 'blur(10px)' },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: true,
          }
        }
      );

      // Magnetic hover effects for contact item tags
      const items = cardRef.current.querySelectorAll('.magnetic-social');
      items.forEach(item => {
        item.addEventListener('mousemove', (e) => {
          const rect = item.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          
          gsap.to(item, {
            x: x * 0.3,
            y: y * 0.3,
            scale: 1.05,
            duration: 0.3,
            ease: 'power2.out'
          });
        });
        
        item.addEventListener('mouseleave', () => {
          gsap.to(item, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.5,
            ease: 'elastic.out(1, 0.3)'
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for reaching out, ${formData.name}! I will get back to you soon.`);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('druvashirsangi925@gmail.com').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section ref={containerRef} id="contact" className="py-32 px-6 relative bg-transparent overflow-hidden">
      
      {/* Background radial overlay */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-white/[0.01] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto w-full relative z-10">
        
        {/* Section Heading */}
        <div className="mb-20">
          <span className="font-serif italic text-xl text-white/50 block mb-3">07. Connection</span>
          <h2 className="font-heading font-extrabold text-4xl md:text-6xl text-white tracking-tight uppercase">
            Get In Touch
          </h2>
          <div className="w-20 h-[1px] bg-white/20 mt-6" />
        </div>

        {/* Large Premium Glass Card */}
        <div 
          ref={cardRef}
          className="glassmorphism rounded-3xl p-8 md:p-14 relative overflow-hidden border border-white/5 bg-white/[0.01] shadow-2xl"
        >
          {/* Card spotlights */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/[0.01] rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/[0.01] rounded-full blur-2xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
            
            {/* Left Hand: Contact Details */}
            <div className="lg:col-span-5 space-y-8 flex flex-col justify-between h-full">
              <div className="space-y-6">
                
                {/* Profile circular avatar frame */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border border-white/10 bg-white/5">
                    <img 
                      src={heroImg} 
                      alt="Dhruva Shirsangi Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-lg text-white">
                      Dhruva Shirsangi
                    </h3>
                    <span className="text-xs text-textSecondary uppercase tracking-widest">
                      Software & Full Stack Developer
                    </span>
                  </div>
                </div>

                <p className="text-xs md:text-sm text-textSecondary leading-relaxed pt-2">
                  Have an exciting project, open engineering role, or collaboration idea? Reach out directly via the form, or follow my social paths.
                </p>
              </div>

              {/* Action Contact Cards */}
              <div className="space-y-4 pt-4">
                
                {/* Copy Email Action */}
                <button 
                  onClick={handleCopyEmail}
                  className="magnetic-social w-full glassmorphism px-5 py-4 rounded-2xl flex items-center justify-between border-white/5 bg-white/[0.01] hover:border-white/20 transition-all duration-300 cursor-none"
                >
                  <div className="flex items-center gap-3 text-left">
                    <FiMail className="text-white/60 w-4 h-4" />
                    <div>
                      <span className="text-[9px] text-textSecondary uppercase block">Email</span>
                      <span className="text-xs text-white font-medium">druvashirsangi925@gmail.com</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    {copied ? 'Copied' : 'Copy'}
                  </span>
                </button>

                {/* Call Phone Action */}
                <a 
                  href="tel:+919353800925" 
                  className="magnetic-social w-full glassmorphism px-5 py-4 rounded-2xl flex items-center justify-between border-white/5 bg-white/[0.01] hover:border-white/20 transition-all duration-300 cursor-none block"
                >
                  <div className="flex items-center gap-3 text-left">
                    <FiPhone className="text-white/60 w-4 h-4" />
                    <div>
                      <span className="text-[9px] text-textSecondary uppercase block">Phone</span>
                      <span className="text-xs text-white font-medium">+91 9353800925</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    Call
                  </span>
                </a>

                {/* Get Resume Download Action */}
                <a 
                  href="/resume.pdf" 
                  download
                  className="magnetic-social w-full glassmorphism px-5 py-4 rounded-2xl flex items-center justify-between border-white/5 bg-white/[0.01] hover:border-white/20 transition-all duration-300 cursor-none block"
                >
                  <div className="flex items-center gap-3 text-left">
                    <FiDownload className="text-white/60 w-4 h-4" />
                    <div>
                      <span className="text-[9px] text-textSecondary uppercase block">Resume PDF</span>
                      <span className="text-xs text-white font-medium">Download Resume</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                    Fetch
                  </span>
                </a>
              </div>

              {/* Social Channels Row */}
              <div className="space-y-3 pt-6 border-t border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 block">
                  Follow Networks
                </span>
                <div className="flex gap-3">
                  <a 
                    href="https://linkedin.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="magnetic-social w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-none"
                    aria-label="LinkedIn"
                  >
                    <FiLinkedin size={16} />
                  </a>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="magnetic-social w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-none"
                    aria-label="GitHub"
                  >
                    <FiGithub size={16} />
                  </a>
                  <a 
                    href="https://instagram.com" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="magnetic-social w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300 cursor-none"
                    aria-label="Instagram"
                  >
                    <FiInstagram size={16} />
                  </a>
                </div>
              </div>

            </div>

            {/* Right Hand: Interactive Form */}
            <div className="lg:col-span-7 border-t lg:border-t-0 lg:border-l border-white/5 pt-8 lg:pt-0 lg:pl-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="form-name" className="text-[10px] font-bold uppercase tracking-widest text-textSecondary">
                    Your Name
                  </label>
                  <input 
                    type="text" 
                    id="form-name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full bg-white/[0.01] border border-white/10 focus:border-white/30 text-white rounded-2xl px-5 py-4 outline-none transition-all duration-300 text-xs tracking-wide cursor-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="form-email" className="text-[10px] font-bold uppercase tracking-widest text-textSecondary">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    id="form-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className="w-full bg-white/[0.01] border border-white/10 focus:border-white/30 text-white rounded-2xl px-5 py-4 outline-none transition-all duration-300 text-xs tracking-wide cursor-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="form-message" className="text-[10px] font-bold uppercase tracking-widest text-textSecondary">
                    Your Message
                  </label>
                  <textarea 
                    id="form-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Tell me about your project, goals, or schedule..."
                    className="w-full bg-white/[0.01] border border-white/10 focus:border-white/30 text-white rounded-2xl px-5 py-4 outline-none transition-all duration-300 text-xs tracking-wide resize-none cursor-none"
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="w-full py-4.5 rounded-2xl font-bold bg-white text-midnight hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 text-xs uppercase tracking-widest cursor-none"
                >
                  Send Message
                </button>
              </form>
            </div>

          </div>
        </div>

        {/* Footer info */}
        <footer className="mt-28 border-t border-white/5 pt-8 text-center">
          <p className="text-[10px] tracking-widest uppercase text-white/30">
            © 2026 Dhruva Shirsangi. Built with React + R3F + GSAP + Tailwind CSS.
          </p>
        </footer>

      </div>
    </section>
  );
}
