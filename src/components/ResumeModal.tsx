import React, { useRef } from 'react';
import { X, Printer, Download, ExternalLink, Check, Mail, Phone, MapPin, Linkedin, Award, Shield } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, CERTIFICATIONS, EDUCATION, SKILL_CATEGORIES } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.playSuccess();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 dark:bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-white dark:bg-black border border-slate-200 dark:border-white/30 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Top Control Bar */}
        <div className="p-4 bg-slate-50 dark:bg-[#050505] border-b border-slate-200 dark:border-white/15 flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <span className="text-slate-900 dark:text-white">◈</span>
            <span className="font-royal font-bold text-sm text-slate-900 dark:text-white uppercase tracking-wider">
              Verified Curriculum Vitae • {PERSONAL_INFO.fullName}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-neutral-200 border border-slate-900 dark:border-white text-white dark:text-black font-mono font-bold text-xs transition-all shadow-md"
            >
              <Printer className="w-3.5 h-3.5 text-white dark:text-black" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Body */}
        <div 
          ref={contentRef}
          className="p-6 sm:p-10 overflow-y-auto space-y-8 text-slate-700 dark:text-slate-200 font-sans print:bg-white print:text-black print:p-0"
        >
          {/* Header */}
          <div className="text-center pb-6 border-b border-slate-200 dark:border-white/15 print:border-slate-300">
            <h1 className="text-2xl sm:text-3xl font-royal font-bold text-slate-900 dark:text-white print:text-black">
              {PERSONAL_INFO.fullName}
            </h1>
            <div className="flex flex-wrap justify-center items-center gap-3 text-xs font-mono text-slate-500 dark:text-slate-400 print:text-slate-600 mt-2">
              <span className="flex items-center space-x-1">
                <MapPin className="w-3.5 h-3.5 text-slate-900 dark:text-white print:hidden" />
                <span>{PERSONAL_INFO.location}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Phone className="w-3.5 h-3.5 text-slate-900 dark:text-white print:hidden" />
                <span>{PERSONAL_INFO.phone}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Mail className="w-3.5 h-3.5 text-slate-900 dark:text-white print:hidden" />
                <span>{PERSONAL_INFO.email}</span>
              </span>
              <span>•</span>
              <span className="flex items-center space-x-1">
                <Linkedin className="w-3.5 h-3.5 text-slate-900 dark:text-white print:hidden" />
                <span>{PERSONAL_INFO.linkedin}</span>
              </span>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-slate-900 dark:text-white print:text-black uppercase tracking-widest border-b border-slate-200 dark:border-white/20 print:border-slate-400 pb-1">
              Professional Summary
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 print:text-slate-800 leading-relaxed">
              Detail-oriented and passionate cybersecurity professional pursuing a Bachelor of Computer Applications (BCA) at KL University (CGPA: 8.7), with hands-on practical experience in network penetration testing, vulnerability assessment, threat intelligence, and multicloud networking. Adept at leveraging industry-standard tools including Nmap, Wireshark, and Kali Linux to conduct reconnaissance, identify security risks, and support security operations. Demonstrated ability to document vulnerabilities and execute risk assessments through multiple cybersecurity internships and specialized certifications from Google, ISC2, Aviatrix, and Red Team Leaders.
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-slate-900 dark:text-white print:text-black uppercase tracking-widest border-b border-slate-200 dark:border-white/20 print:border-slate-400 pb-1">
              Technical Skills
            </h2>
            <div className="text-xs space-y-1.5 text-slate-600 dark:text-slate-300 print:text-slate-800">
              <div><strong className="text-slate-900 dark:text-white print:text-black font-semibold">Security & Penetration Testing:</strong> Network Scanning, Vulnerability Assessment, Web Application Penetration Testing, Threat Intelligence & Governance, Risk Assessment, Reconnaissance, Exploitation Fundamentals, OWASP Top 10 Methodologies</div>
              <div><strong className="text-slate-900 dark:text-white print:text-black font-semibold">Cloud & Network Architecture:</strong> Multicloud Networking (AWS, Azure, GCP, OCI), Cloud Security, Scalable Hosting Architecture Design</div>
              <div><strong className="text-slate-900 dark:text-white print:text-black font-semibold">Tools & Software:</strong> Nmap, Wireshark, Arduino IDE, AI Data/Coding Analysis Tools</div>
              <div><strong className="text-slate-900 dark:text-white print:text-black font-semibold">Operating Systems & Hardware:</strong> Kali Linux, Linux Command Line, ESP32 Microcontrollers</div>
              <div><strong className="text-slate-900 dark:text-white print:text-black font-semibold">Core Competencies:</strong> Technical Documentation, Vulnerability Reporting, Analytical Problem-Solving, Team Collaboration, Independent Execution</div>
            </div>
          </div>

          {/* Professional Experience */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold text-slate-900 dark:text-white print:text-black uppercase tracking-widest border-b border-slate-200 dark:border-white/20 print:border-slate-400 pb-1">
              Professional Experience
            </h2>
            {EXPERIENCES.map(exp => (
              <div key={exp.id} className="space-y-1">
                <div className="flex justify-between items-baseline">
                  <div className="font-bold text-sm text-slate-900 dark:text-white print:text-black">{exp.role} – {exp.company}</div>
                  <div className="text-xs font-mono text-slate-500 dark:text-slate-400 print:text-slate-600">{exp.period}</div>
                </div>
                <ul className="list-disc list-inside text-xs text-slate-600 dark:text-slate-300 print:text-slate-700 space-y-1 pl-1">
                  {exp.bullets.map((b, bIdx) => (
                    <li key={bIdx} className="leading-relaxed">{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Academic Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-mono font-bold text-slate-900 dark:text-white print:text-black uppercase tracking-widest border-b border-slate-200 dark:border-white/20 print:border-slate-400 pb-1">
              Academic & Engineering Projects
            </h2>
            {PROJECTS.map(proj => (
              <div key={proj.id} className="space-y-1 text-xs">
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900 dark:text-white print:text-black text-xs sm:text-sm">{proj.title}</span>
                  <span className="font-mono text-slate-500 dark:text-slate-400 print:text-slate-600">{proj.period}</span>
                </div>
                <div className="text-[11px] font-mono text-slate-600 dark:text-slate-300 print:text-slate-600">
                  Technologies: {proj.technologies.join(', ')}
                </div>
                <p className="text-slate-600 dark:text-slate-300 print:text-slate-700 leading-relaxed">
                  {proj.overview}
                </p>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-slate-900 dark:text-white print:text-black uppercase tracking-widest border-b border-slate-200 dark:border-white/20 print:border-slate-400 pb-1">
              Education
            </h2>
            <div className="space-y-2 text-xs">
              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-baseline">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white print:text-black">{edu.degree}</span> – {edu.institution}
                  </div>
                  <div className="font-mono text-slate-500 dark:text-slate-400 print:text-slate-600">{edu.period} | {edu.score}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Simulations */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold text-slate-900 dark:text-white print:text-black uppercase tracking-widest border-b border-slate-200 dark:border-white/20 print:border-slate-400 pb-1">
              Certifications & Professional Job Simulations
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600 dark:text-slate-300 print:text-slate-800">
              {CERTIFICATIONS.map(c => (
                <div key={c.id} className="flex items-start space-x-1.5">
                  <span className="text-slate-900 dark:text-white print:text-black font-bold">•</span>
                  <span><strong className="text-slate-900 dark:text-white">{c.title}</strong> – {c.issuer}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
