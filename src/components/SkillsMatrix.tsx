import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  Cloud, 
  Terminal, 
  FileCheck, 
  Search
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import { MotionSection } from './MotionSection';
import { SpotlightCard } from './SpotlightCard';

export const SkillsMatrix: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return <ShieldAlert className="w-4 h-4 text-white" />;
      case 'Cloud': return <Cloud className="w-4 h-4 text-white" />;
      case 'Terminal': return <Terminal className="w-4 h-4 text-white" />;
      default: return <FileCheck className="w-4 h-4 text-white" />;
    }
  };

  const filteredCategories = SKILL_CATEGORIES.map(cat => ({
    ...cat,
    skills: cat.skills.filter(s => 
      (selectedCategory === 'All' || cat.category === selectedCategory) &&
      (s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.note.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(cat => cat.skills.length > 0);

  return (
    <MotionSection id="skills" className="py-20 site-container">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white dark:bg-black border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white text-xs font-mono mb-3 shadow-sm dark:shadow-none">
          <Terminal className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
          <span>ROYAL ORDER OF CYBERNETIC COMPETENCIES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-slate-900 dark:text-white tracking-wider">
          Sovereign <span className="font-royal italic font-light text-slate-600 dark:text-slate-300">Security Competencies</span>
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base font-sans">
          Evaluated mastery spanning offensive penetration testing, defensive multicloud networking, hardware telemetry, and threat intelligence.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
        
        {/* Category Pills */}
        <div className="flex flex-wrap gap-2">
          {['All', 'Security & Penetration Testing', 'Cloud & Multicloud Security', 'Tools & Operating Systems', 'Core Professional Competencies'].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                sounds.playKeyClick();
                setSelectedCategory(cat);
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-black font-bold shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.35)]'
                  : 'bg-white dark:bg-black border border-slate-200 dark:border-white/20 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-white/40'
              }`}
            >
              {cat === 'All' ? 'All Disciplines' : cat.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div className="relative w-full md:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            id="skills-search-input"
            name="skillsSearch"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Audit skill (e.g. Nmap, OWASP)..."
            className="w-full pl-9 pr-4 py-1.5 rounded-lg bg-white dark:bg-black border border-slate-200 dark:border-white/20 text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 font-mono outline-none focus:border-slate-500 dark:focus:border-white transition-colors"
            aria-label="Filter skills by keyword"
          />
        </div>
      </div>

      {/* Grid of Categories & Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredCategories.map((group, gIdx) => (
            <SpotlightCard 
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, delay: gIdx * 0.1 }}
              spotlightColor="rgba(255, 255, 255, 0.1)"
              className="p-6 rounded-2xl bg-white/80 dark:bg-black border border-slate-200 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/40 transition-all space-y-4 hud-card shadow-sm dark:shadow-none"
            >
              {/* Group Header */}
              <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-200 dark:border-white/15">
                <span className="text-slate-900 dark:text-white">◈</span>
                <h3 className="text-sm font-royal font-bold text-slate-900 dark:text-white tracking-wide">
                  {group.category}
                </h3>
              </div>

              {/* Skills Bars */}
              <div className="space-y-3.5">
                {group.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-medium text-slate-800 dark:text-slate-200">{skill.name}</span>
                      <span className="font-mono text-slate-900 dark:text-white text-[11px] font-semibold">{skill.level}%</span>
                    </div>

                    <div className="h-1.5 w-full bg-slate-100 dark:bg-[#060606] rounded-full overflow-hidden border border-slate-200 dark:border-white/15">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: sIdx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400 rounded-full"
                      />
                    </div>

                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      {skill.note}
                    </div>
                  </div>
                ))}
              </div>

            </SpotlightCard>
          ))}
        </AnimatePresence>
      </div>

    </MotionSection>
  );
};
