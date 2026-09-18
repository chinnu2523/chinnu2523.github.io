import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sounds } from '../utils/soundEffects';

interface SectionInfo {
  id: string;
  name: string;
  latin: string;
}

const SECTIONS: SectionInfo[] = [
  { id: 'overview', name: 'Overview', latin: 'Apex' },
  { id: 'threat-radar', name: 'Threat Radar', latin: 'Speculum' },
  { id: 'experience', name: 'Engagements', latin: 'Acta' },
  { id: 'projects', name: 'Dossiers', latin: 'Opera' },
  { id: 'terminal', name: 'Sovereign CLI', latin: 'Consilium' },
  { id: 'sandbox', name: 'Security Sandbox', latin: 'Exercitus' },
  { id: 'skills', name: 'Competencies', latin: 'Virtus' },
  { id: 'certifications', name: 'Accolades', latin: 'Insignia' },
  { id: 'contact', name: 'Diplomatic Dispatch', latin: 'Epistula' }
];

export const ScrollNavigationDots: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = SECTIONS[i];
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.pageYOffset;
          if (scrollPosition >= top - 100) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    sounds.playKeyClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center space-y-3.5 pointer-events-auto">
      {/* Liquid Platinum Vertical Track Line */}
      <div className="absolute top-2 bottom-2 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-transparent via-slate-400/30 dark:via-white/20 to-transparent pointer-events-none" />

      {SECTIONS.map((section) => {
        const isActive = activeSection === section.id;
        const isHovered = hoveredSection === section.id;

        return (
          <div
            key={section.id}
            className="relative flex items-center justify-center group"
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            {/* Tooltip on Left */}
            <AnimatePresence>
              {(isHovered || isActive) && (
                <motion.div
                  initial={{ opacity: 0, x: 10, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-8 whitespace-nowrap px-2.5 py-1 rounded-md bg-white/95 dark:bg-black/95 border border-slate-200 dark:border-white/20 shadow-xl pointer-events-none flex items-center space-x-2"
                >
                  <span className="font-royal text-xs font-bold text-slate-900 dark:text-white tracking-wide">{section.name}</span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 italic">({section.latin})</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Dot Button */}
            <button
              onClick={() => scrollToSection(section.id)}
              className="relative p-1.5 focus:outline-none transition-transform"
              aria-label={`Scroll to ${section.name}`}
            >
              {isActive ? (
                <div className="relative flex items-center justify-center">
                  {/* Outer Pulsing Attestation Ring */}
                  <div className="absolute w-5 h-5 rounded-full border border-slate-900/50 dark:border-white/50 animate-ping opacity-75" />
                  <div className="w-3.5 h-3.5 rounded-full bg-gradient-to-br from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400 shadow-md dark:shadow-[0_0_10px_rgba(255,255,255,0.8)] border border-slate-900 dark:border-white" />
                </div>
              ) : (
                <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-[#181818] border border-slate-400/40 dark:border-white/20 group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:scale-125 transition-all" />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};
