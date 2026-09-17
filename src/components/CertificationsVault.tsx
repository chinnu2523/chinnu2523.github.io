import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Award, 
  ShieldCheck, 
  ExternalLink, 
  GraduationCap, 
  X,
} from 'lucide-react';
import { CERTIFICATIONS, EDUCATION, CertificationItem } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import { MotionSection } from './MotionSection';
import { SpotlightCard } from './SpotlightCard';

export const CertificationsVault: React.FC = () => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [activeCertModal, setActiveCertModal] = useState<CertificationItem | null>(null);

  const categories = ['All', 'Cybersecurity', 'Cloud Networking', 'Governance & Threat', 'Job Simulation', 'Foundational'];

  const filteredCerts = CERTIFICATIONS.filter(cert => {
    if (filterCategory === 'All') return true;
    return cert.category === filterCategory;
  });

  return (
    <MotionSection id="certifications" className="py-20 site-container">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white text-xs font-mono mb-3 shadow-sm dark:shadow-none">
          <Award className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
          <span>VERIFIED WARRANTS OF COMPETENCY & ACADEMICS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-slate-900 dark:text-white tracking-wider">
          Sovereign <span className="font-royal italic font-light text-slate-600 dark:text-slate-300">Accolades &amp; Warrants</span>
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base font-sans">
          Industry accreditations from Google, Aviatrix, Red Team Leaders, ISC2, and enterprise simulations at Deloitte, AWS, and Tata.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              sounds.playKeyClick();
              setFilterCategory(cat);
            }}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono transition-all ${
              filterCategory === cat
                ? 'bg-slate-900 dark:bg-white text-white dark:text-black font-bold shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.35)]'
                : 'bg-white dark:bg-black border border-slate-200 dark:border-white/20 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-white/40'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Certifications Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 mb-16">
        <AnimatePresence>
          {filteredCerts.map((cert) => (
            <SpotlightCard
              layout
              key={cert.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ y: -3, borderColor: 'rgba(15, 23, 42, 0.4)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              spotlightColor="rgba(255, 255, 255, 0.1)"
              onClick={() => {
                sounds.playKeyClick();
                setActiveCertModal(cert);
              }}
              className="p-5 rounded-2xl bg-white/80 dark:bg-black border border-slate-200 dark:border-white/15 hover:bg-slate-50 dark:hover:bg-[#0c0c0c] transition-all cursor-pointer group shadow-sm dark:shadow-lg flex flex-col justify-between hud-card"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/30 text-slate-800 dark:text-white">
                    {cert.category}
                  </span>
                  <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{cert.date}</span>
                </div>

                <div>
                  <h3 className="text-sm font-royal font-bold text-slate-900 dark:text-white group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors leading-snug tracking-wide">
                    {cert.title}
                  </h3>
                  <div className="text-xs font-medium text-slate-600 dark:text-slate-300 font-mono mt-1 flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
                    <span>{cert.issuer}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed font-sans">
                  {cert.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span className="text-slate-900 dark:text-white font-semibold">Inspect Sovereign Warrant</span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-900 dark:text-white group-hover:translate-x-0.5 transition-transform" />
              </div>
            </SpotlightCard>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Academic Foundation Section */}
      <div className="pt-8 border-t border-slate-200 dark:border-white/15">
        <div className="flex items-center space-x-2 text-slate-900 dark:text-white font-royal font-bold text-xl mb-6">
          <GraduationCap className="w-5 h-5 text-slate-900 dark:text-white" />
          <span>Academic Distinction & Foundation</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {EDUCATION.map((edu, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard 
                whileHover={{ y: -3 }}
                spotlightColor="rgba(255, 255, 255, 0.1)"
                className="p-5 rounded-2xl bg-white/80 dark:bg-black border border-slate-200 dark:border-white/15 space-y-2 hud-card h-full shadow-sm dark:shadow-none"
              >
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono text-slate-900 dark:text-white font-bold">{edu.period}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/30 text-slate-800 dark:text-white font-semibold">
                    {edu.score}
                  </span>
                </div>
                <h4 className="text-sm font-royal font-bold text-slate-900 dark:text-white leading-tight tracking-wide">{edu.degree}</h4>
                <div className="text-xs font-medium text-slate-700 dark:text-slate-300 font-sans">{edu.institution}</div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{edu.location}</div>
                <p className="text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-white/10 leading-relaxed font-sans">
                  {edu.highlight}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Credential Inspection Modal */}
      <AnimatePresence>
        {activeCertModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/90 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              className="relative max-w-lg w-full rounded-2xl bg-white dark:bg-black border border-slate-200 dark:border-white/30 p-6 shadow-2xl space-y-4 hud-card"
            >
              <button
                onClick={() => setActiveCertModal(null)}
                className="absolute top-4 right-4 p-1 rounded text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#121212]"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-slate-900 dark:text-white" />
                <span className="text-xs font-mono text-slate-900 dark:text-white font-bold">SOVEREIGN ACCREDITATION DOSSIER</span>
              </div>

              <div>
                <h3 className="text-xl font-royal font-bold text-slate-900 dark:text-white">{activeCertModal.title}</h3>
                <div className="text-sm font-mono text-slate-600 dark:text-slate-300 mt-0.5">{activeCertModal.issuer} • {activeCertModal.date}</div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {activeCertModal.description}
              </p>

              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-white/10">
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 uppercase font-bold">Key Focus Disciplines:</div>
                <div className="flex flex-wrap gap-1.5">
                  {activeCertModal.skillsCovered.map((sc, i) => (
                    <span key={i} className="px-2.5 py-1 rounded bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/20 text-xs font-mono text-slate-800 dark:text-slate-200">
                      {sc}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => setActiveCertModal(null)}
                  className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-white text-xs font-mono font-bold text-white dark:text-black hover:bg-slate-800 dark:hover:bg-neutral-200 shadow-md transition-colors"
                >
                  Close Dossier
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </MotionSection>
  );
};
