import React, { useState, useEffect } from 'react';
import { Shield, ArrowUp, Terminal, Linkedin, Mail, Phone, Lock, Heart } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';

export const Footer: React.FC = () => {
  const [time, setTime] = useState<{ ist: string; utc: string }>({ ist: '', utc: '' });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime({
        ist: now.toLocaleTimeString('en-US', { timeZone: 'Asia/Kolkata', hour12: false }),
        utc: now.toLocaleTimeString('en-US', { timeZone: 'UTC', hour12: false })
      });
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    sounds.playKeyClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-slate-200 dark:border-white/15 bg-[#F1F5F9] dark:bg-black pt-16 pb-10 font-mono text-xs relative overflow-hidden transition-colors">
      {/* Background Guilloché Watermark */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(255,255,255,0.02)_0%,transparent_70%)] pointer-events-none" />

      <div className="site-container relative">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-200 dark:border-white/10">
          
          {/* Brand & Description */}
          <div className="md:col-span-2 space-y-3.5">
            <div className="flex items-center space-x-2.5">
              <span className="text-lg text-slate-900 dark:text-white">◈</span>
              <span className="font-royal font-bold text-slate-900 dark:text-white text-base tracking-wider">
                THE SOVEREIGN ENCLAVE • {PERSONAL_INFO.fullName.toUpperCase()}
              </span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-xs font-sans max-w-md leading-relaxed">
              Haute Cyber Defense & Penetration Testing Command. Proven competencies in OWASP Top 10 web application assessments, Linux-based network recon, Aviatrix multicloud security, and ESP32 hardware defense.
            </p>
            <div className="pt-2 flex items-center space-x-3 text-slate-500 dark:text-slate-400">
              <a 
                href={PERSONAL_INFO.linkedin} 
                target="_blank" 
                rel="noreferrer" 
                className="w-8 h-8 rounded-lg bg-white dark:bg-white/5 border border-slate-300 dark:border-white/20 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-500 dark:hover:border-white/50 hover:bg-slate-100 dark:hover:bg-white/10 transition-all shadow-sm"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href={`mailto:${PERSONAL_INFO.email}`} 
                className="w-8 h-8 rounded-lg bg-white dark:bg-white/5 border border-slate-300 dark:border-white/20 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-500 dark:hover:border-white/50 hover:bg-slate-100 dark:hover:bg-white/10 transition-all shadow-sm"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a 
                href={`tel:${PERSONAL_INFO.phone}`} 
                className="w-8 h-8 rounded-lg bg-white dark:bg-white/5 border border-slate-300 dark:border-white/20 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:border-slate-500 dark:hover:border-white/50 hover:bg-slate-100 dark:hover:bg-white/10 transition-all shadow-sm"
                title="Voice Wire"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-2.5">
            <div className="text-slate-900 dark:text-white font-royal font-bold text-sm tracking-wider uppercase flex items-center space-x-1.5">
              <span>◈</span>
              <span>Imperial Modules</span>
            </div>
            <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-xs">
              <li><a href="#overview" className="hover:text-slate-900 dark:hover:text-white transition-colors">Executive Dossier</a></li>
              <li><a href="#experience" className="hover:text-slate-900 dark:hover:text-white transition-colors">Field Engagements</a></li>
              <li><a href="#projects" className="hover:text-slate-900 dark:hover:text-white transition-colors">Flagship Projects</a></li>
              <li><a href="#terminal" className="hover:text-slate-900 dark:hover:text-white transition-colors">Executive Terminal</a></li>
              <li><a href="#skills" className="hover:text-slate-900 dark:hover:text-white transition-colors">Competencies Matrix</a></li>
              <li><a href="#certifications" className="hover:text-slate-900 dark:hover:text-white transition-colors">Accreditations Vault</a></li>
            </ul>
          </div>

          {/* Live SOC Telemetry Status */}
          <div className="space-y-3">
            <div className="text-slate-900 dark:text-white font-royal font-bold text-sm tracking-wider uppercase flex items-center space-x-1.5">
              <span>✦</span>
              <span>Horological Chronometers</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white dark:bg-black border border-slate-200 dark:border-white/15 space-y-2.5 text-[11px] shadow-sm dark:shadow-lg">
              <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                <span className="text-slate-500 dark:text-slate-400">IST (Vijayawada):</span>
                <span className="text-slate-900 dark:text-white font-bold font-mono">{time.ist || '13:18:57'}</span>
              </div>
              <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                <span className="text-slate-500 dark:text-slate-400">UTC (Zulu Epoch):</span>
                <span className="text-slate-800 dark:text-slate-300 font-bold font-mono">{time.utc || '07:48:57'}</span>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center space-x-2 text-slate-700 dark:text-slate-300">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 dark:bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-900 dark:bg-white"></span>
                </span>
                <span className="text-[10px] uppercase font-mono tracking-wider text-slate-700 dark:text-slate-200">CRYPTOGRAPHIC ATTESTATION VALID</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div className="flex items-center space-x-2">
            <span>© {new Date().getFullYear()} Veera Guru Datta Srinidhi Visaka.</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-slate-700 dark:text-slate-300 italic font-royal text-xs">Custos Immotilis</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-slate-700 dark:text-slate-300 font-mono tracking-widest text-[10px] px-2.5 py-1 rounded bg-slate-200/60 dark:bg-white/5 border border-slate-300 dark:border-white/15">
              [ SOVEREIGN PROTOCOL ACTIVE ]
            </span>
            <button
              onClick={scrollToTop}
              className="px-3 py-1.5 rounded-lg bg-slate-900 dark:bg-white/10 border border-slate-800 dark:border-white/20 text-white hover:bg-slate-800 dark:hover:bg-white/20 hover:border-slate-900 dark:hover:border-white transition-all flex items-center space-x-1.5 group shadow-sm"
            >
              <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="font-mono text-[10px] tracking-wider uppercase">Ascend to Apex</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
