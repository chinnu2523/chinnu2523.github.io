import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Layers
} from 'lucide-react';
import { EXPERIENCES } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import { MotionSection } from './MotionSection';

export const ExperienceTimeline: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>('edufyi');
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 60%']
  });

  const lineHeight = useSpring(useTransform(scrollYProgress, [0, 1], ['0%', '100%']), {
    stiffness: 300,
    damping: 35
  });

  const toggleExpand = (id: string) => {
    sounds.playKeyClick();
    setExpandedId(expandedId === id ? null : id);
  };

  const handleScrubSelect = (id: string) => {
    sounds.playKeyClick();
    setExpandedId(id);
    const element = document.getElementById(`exp-card-${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <MotionSection id="experience" className="py-24 site-container relative">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white dark:bg-black border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white text-xs font-mono mb-3 shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.08)]">
          <Briefcase className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
          <span className="tracking-[0.2em] uppercase font-semibold">PROVEN SOVEREIGN TRACK RECORD</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-slate-900 dark:text-white tracking-wider">
          Field Engagements &amp; <span className="font-royal italic font-light text-slate-600 dark:text-slate-300">Experience</span>
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base font-sans leading-relaxed">
          Practical security engagements involving penetration testing, packet analysis, active reconnaissance, and enterprise risk remediation across Edufyi, Corizo, and Skill Dunia.
        </p>

        {/* Interactive Timeline Scrubber Bar */}
        <div 
          data-cursor="scrub" 
          data-cursor-text="SEEK // TIMELINE" 
          className="mt-8 p-1.5 sm:p-2 rounded-full bg-white/80 dark:bg-black/90 border border-slate-200 dark:border-white/20 backdrop-blur-xl max-w-xl mx-auto flex items-center justify-between shadow-lg dark:shadow-2xl scrubber-track"
        >
          {EXPERIENCES.map((exp) => {
            const isActive = expandedId === exp.id;
            return (
              <button
                key={exp.id}
                onClick={() => handleScrubSelect(exp.id)}
                data-cursor="action"
                data-cursor-text={`SELECT // ${exp.company.split(' ')[0].toUpperCase()}`}
                className={`flex-1 px-3 sm:px-4 py-2 rounded-full font-mono text-[10px] sm:text-xs transition-all duration-300 flex items-center justify-center space-x-1.5 ${
                  isActive
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-black font-bold shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.4)]'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white dark:bg-black' : 'bg-slate-900 dark:bg-white'}`} />
                <span className="truncate">{exp.company}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline Wrapper with Dynamic Scroll-Linked Beam */}
      <div ref={containerRef} className="relative ml-4 sm:ml-32 space-y-12">
        
        {/* Static Background Track */}
        <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-slate-200 dark:bg-[#1a1a1a] -translate-x-1/2" />
        
        {/* Dynamic Scroll-Driven Liquid Platinum Laser Beam */}
        <motion.div
          style={{ height: lineHeight }}
          className="absolute top-0 left-0 w-[2px] bg-gradient-to-b from-slate-900 via-slate-700 to-slate-400 dark:from-white dark:via-slate-300 dark:to-slate-600 -translate-x-1/2 shadow-[0_0_12px_rgba(15,23,42,0.3)] dark:shadow-[0_0_12px_rgba(255,255,255,0.7)] origin-top pointer-events-none"
        />

        {EXPERIENCES.map((exp, index) => {
          const isExpanded = expandedId === exp.id;

          return (
            <motion.div 
              key={exp.id} 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-6 sm:pl-10"
            >
              
              {/* Timeline Indicator Pin */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-white dark:bg-black border-2 border-slate-900 dark:border-white flex items-center justify-center shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.25)] z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-slate-900 dark:bg-white animate-pulse" />
              </div>

              {/* Timeframe Tag for Large Screens */}
              <div className="hidden sm:block absolute -left-36 top-2 text-right w-28 font-mono text-xs text-slate-500 dark:text-slate-400 font-medium">
                {exp.period}
              </div>

              {/* Card Surface */}
              <motion.div 
                id={`exp-card-${exp.id}`}
                whileHover={{ borderColor: 'rgba(15, 23, 42, 0.4)' }}
                data-cursor="card"
                data-cursor-text={`DOSSIER // ${exp.company.split(' ')[0].toUpperCase()}`}
                className={`rounded-2xl border ${isExpanded ? 'border-slate-400 dark:border-white/40 shadow-xl dark:shadow-[0_0_25px_rgba(255,255,255,0.08)]' : 'border-slate-200 dark:border-white/12'} bg-white/80 dark:bg-black backdrop-blur-xl p-6 transition-all shadow-md dark:shadow-xl hud-card`}
              >
                
                {/* Card Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-white/10">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-royal font-bold text-slate-900 dark:text-white tracking-wide">{exp.role}</h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/20 text-slate-800 dark:text-white">
                        {exp.type}
                      </span>
                    </div>
                    <div className="text-sm font-semibold text-slate-700 dark:text-slate-300 font-royal mt-0.5">
                      {exp.company}
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 text-xs font-mono text-slate-500 dark:text-slate-400">
                    <span className="flex items-center space-x-1 sm:hidden">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{exp.period}</span>
                    </span>
                    <span className="flex items-center space-x-1 text-slate-500 dark:text-slate-400">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{exp.location}</span>
                    </span>
                  </div>
                </div>

                {/* Summary & Methodology */}
                <div className="mt-4 space-y-3">
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {exp.summary}
                  </p>

                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-lg bg-slate-50 dark:bg-black border border-slate-200 dark:border-white/15 text-xs font-mono text-slate-700 dark:text-slate-200">
                    <Layers className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
                    <span>Methodology: {exp.methodology}</span>
                  </div>
                </div>

                {/* Expandable Technical Deliverables */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10">
                  <button
                    onClick={() => toggleExpand(exp.id)}
                    className="flex items-center justify-between w-full text-xs font-mono text-slate-900 dark:text-white hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  >
                    <span>{isExpanded ? 'Conceal Key Deliverables' : `View ${exp.bullets.length} Key Deliverables`}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-3 space-y-2"
                      >
                        {exp.bullets.map((resp: string, idx: number) => (
                          <div key={idx} className="flex items-start space-x-2 text-xs text-slate-600 dark:text-slate-300 font-sans">
                            <ShieldCheck className="w-3.5 h-3.5 text-slate-900 dark:text-white mt-0.5 shrink-0" />
                            <span>{resp}</span>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </motion.div>
            </motion.div>
          );
        })}
      </div>

    </MotionSection>
  );
};
