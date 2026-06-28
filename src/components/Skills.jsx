import React from 'react';

// Custom inline SVG for Excel
const ExcelIcon = ({ sizeClass = "w-10 h-10" }) => (
  <svg className={`${sizeClass} flex-shrink-0`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.5 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V7.5L14.5 2Z" fill="#107C41"/>
    <path d="M14 V8H20" fill="#33C481"/>
    <path d="M7 10L10.5 15L7 20H9.2L11.5 16.5L13.8 20H16L12.5 15L16 10H13.8L11.5 13.5L9.2 10H7Z" fill="white"/>
  </svg>
);

// Custom inline SVG for Tableau
const TableauIcon = ({ sizeClass = "w-10 h-10" }) => (
  <svg className={`${sizeClass} flex-shrink-0`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="2" fill="#E15759"/>
    <circle cx="12" cy="5" r="1.6" fill="#76B7B2"/>
    <circle cx="12" cy="19" r="1.6" fill="#76B7B2"/>
    <circle cx="5" cy="12" r="1.6" fill="#76B7B2"/>
    <circle cx="19" cy="12" r="1.6" fill="#76B7B2"/>
    <circle cx="8" cy="8" r="1.4" fill="#F28E2B"/>
    <circle cx="16" cy="16" r="1.4" fill="#F28E2B"/>
    <circle cx="8" cy="16" r="1.4" fill="#4E79A7"/>
    <circle cx="16" cy="8" r="1.4" fill="#4E79A7"/>
    <circle cx="12" cy="8.5" r="1.2" fill="#59A14F"/>
    <circle cx="12" cy="15.5" r="1.2" fill="#59A14F"/>
    <circle cx="8.5" cy="12" r="1.2" fill="#59A14F"/>
    <circle cx="15.5" cy="12" r="1.2" fill="#59A14F"/>
  </svg>
);

export default function Skills() {
  
  // Track 1: Programming Languages
  const track1 = [
    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
    { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
    { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
    { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' }
  ];

  // Track 2: Web Tech & Git
  const track2 = [
    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
    { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' }
  ];

  // Track 3: Data & Design
  const track3 = [
    { name: 'Excel', component: <ExcelIcon /> },
    { name: 'Tableau', component: <TableauIcon /> },
    { name: 'Adobe XD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg' },
    { name: 'Sketch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg' },
    { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' }
  ];

  // Double elements to ensure seamless loop
  const loopTrack1 = [...track1, ...track1, ...track1, ...track1];
  const loopTrack2 = [...track2, ...track2, ...track2, ...track2];
  const loopTrack3 = [...track3, ...track3, ...track3, ...track3];

  // Grouped skills structure
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
        { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg' },
        { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg' },
        { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
        { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' }
      ]
    },
    {
      title: 'Web & Version Control',
      skills: [
        { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
        { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
        { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
        { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' }
      ]
    },
    {
      title: 'Data Analytics',
      skills: [
        { name: 'Excel', component: <ExcelIcon sizeClass="w-8 h-8" /> },
        { name: 'Tableau', component: <TableauIcon sizeClass="w-8 h-8" /> }
      ]
    },
    {
      title: 'UI/UX & Prototyping',
      skills: [
        { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
        { name: 'Adobe XD', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg' },
        { name: 'Sketch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg' }
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 px-6 overflow-hidden relative">
      <div className="max-w-4xl mx-auto w-full mb-16">
        
        {/* Section Heading */}
        <div>
          <span className="font-serif italic text-xl text-accentSky block mb-2">03. Capabilities</span>
          <h2 className="font-heading font-bold text-4xl md:text-5xl text-white tracking-tight">
            Technical Stack
          </h2>
        </div>
      </div>

      {/* 1. Edge-to-Edge Linear Scrolling Tracks */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] space-y-6 pointer-events-auto mb-20">
        
        {/* Fade Out Edge Gradients */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-36 bg-gradient-to-r from-midnight to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-36 bg-gradient-to-l from-midnight to-transparent z-10 pointer-events-none" />

        {/* Row 1: Left to Right Marquee */}
        <div className="flex w-full overflow-hidden py-2">
          <div className="animate-marquee-left flex gap-6 pr-6">
            {loopTrack1.map((skill, idx) => (
              <div 
                key={idx}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full glassmorphism flex flex-col items-center justify-center gap-2 flex-shrink-0 transition-transform duration-300 hover:scale-110 hover:border-accentSky/35 group"
                title={skill.name}
              >
                {skill.icon ? (
                  <img src={skill.icon} alt={skill.name} className="w-10 h-10 object-contain filter group-hover:brightness-110 transition-all duration-300" />
                ) : (
                  skill.component
                )}
                <span className="text-[10px] uppercase tracking-wider text-textSecondary group-hover:text-white transition-colors duration-300 font-medium">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2: Right to Left Marquee */}
        <div className="flex w-full overflow-hidden py-2">
          <div className="animate-marquee-right flex gap-6 pr-6">
            {loopTrack2.map((skill, idx) => (
              <div 
                key={idx}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full glassmorphism flex flex-col items-center justify-center gap-2 flex-shrink-0 transition-transform duration-300 hover:scale-110 hover:border-accentSky/35 group"
                title={skill.name}
              >
                {skill.icon ? (
                  <img src={skill.icon} alt={skill.name} className="w-10 h-10 object-contain filter group-hover:brightness-110 transition-all duration-300" />
                ) : (
                  skill.component
                )}
                <span className="text-[10px] uppercase tracking-wider text-textSecondary group-hover:text-white transition-colors duration-300 font-medium">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 3: Left to Right Marquee */}
        <div className="flex w-full overflow-hidden py-2">
          <div className="animate-marquee-left flex gap-6 pr-6">
            {loopTrack3.map((skill, idx) => (
              <div 
                key={idx}
                className="w-24 h-24 md:w-28 md:h-28 rounded-full glassmorphism flex flex-col items-center justify-center gap-2 flex-shrink-0 transition-transform duration-300 hover:scale-110 hover:border-accentSky/35 group"
                title={skill.name}
              >
                {skill.icon ? (
                  <img src={skill.icon} alt={skill.name} className="w-10 h-10 object-contain filter group-hover:brightness-110 transition-all duration-300" />
                ) : (
                  skill.component
                )}
                <span className="text-[10px] uppercase tracking-wider text-textSecondary group-hover:text-white transition-colors duration-300 font-medium">
                  {skill.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 2. Categorized Grid with Logos */}
      <div className="max-w-4xl mx-auto w-full">
        <h3 className="font-heading font-semibold text-lg text-textSecondary uppercase tracking-widest mb-8 text-center md:text-left">
          Grouped Stack
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillCategories.map((category, catIdx) => (
            <div 
              key={catIdx}
              className="glassmorphism p-6 md:p-8 rounded-3xl relative overflow-hidden transition-all duration-300 hover:border-accentSky/25 group"
            >
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-accentSky/5 rounded-full blur-xl group-hover:bg-accentSky/10 transition-colors duration-500" />
              
              <h4 className="font-heading font-bold text-lg text-white mb-6 border-b border-white/5 pb-3">
                {category.title}
              </h4>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
                {category.skills.map((skill, skillIdx) => (
                  <div 
                    key={skillIdx}
                    className="flex flex-col items-center gap-2 p-2 rounded-2xl hover:bg-white/[0.03] border border-transparent hover:border-white/5 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-midnight/60 border border-white/5 flex items-center justify-center transition-transform duration-300 hover:scale-105 shadow-inner">
                      {skill.icon ? (
                        <img src={skill.icon} alt={skill.name} className="w-7 h-7 object-contain" />
                      ) : (
                        skill.component
                      )}
                    </div>
                    <span className="text-[11px] text-textSecondary font-medium text-center truncate w-full">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
