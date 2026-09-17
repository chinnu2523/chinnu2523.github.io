import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  Linkedin, 
  MapPin, 
  Copy, 
  Check, 
  Send, 
  ShieldCheck, 
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import { MotionSection } from './MotionSection';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    purpose: 'Job Opportunity / Recruitment',
    message: ''
  });

  const [dispatched, setDispatched] = useState(false);

  const copyEmail = () => {
    sounds.playKeyClick();
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const copyPhone = () => {
    sounds.playKeyClick();
    navigator.clipboard.writeText(PERSONAL_INFO.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sounds.playSuccess();
    setDispatched(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#FFFFFF', '#E2E8F0', '#94A3B8', '#CBD5E1']
    });

    const subject = encodeURIComponent(`[Sovereign Dispatch] ${formData.purpose} - ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\nPurpose: ${formData.purpose}\n\nMessage:\n${formData.message}`);
    window.open(`mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <MotionSection id="contact" className="py-24 site-container relative">
      {/* Background Liquid Platinum Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)] pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white dark:bg-black border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white text-xs font-mono mb-4 tracking-widest uppercase shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.05)]">
          <span className="text-slate-900 dark:text-white">◈</span>
          <span>DIPLOMATIC DISPATCH PROTOCOL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-slate-900 dark:text-white tracking-wider leading-tight">
          Diplomatic Inquiries &amp; <span className="font-royal italic font-light text-slate-600 dark:text-slate-300">Recruit Visaka</span>
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base font-sans max-w-2xl mx-auto leading-relaxed">
          Open for appointment to tier-one security operations, red team initiatives, and cloud infrastructure defense mandates worldwide.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative">
        
        {/* Left Column: Direct Contact Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-7 rounded-2xl bg-white/80 dark:bg-black border border-slate-200 dark:border-white/15 space-y-6 shadow-xl dark:shadow-2xl backdrop-blur-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.04)_0%,transparent_70%)] pointer-events-none" />
            
            <h3 className="text-lg font-royal font-bold text-slate-900 dark:text-white flex items-center space-x-2.5">
              <ShieldCheck className="w-5 h-5 text-slate-900 dark:text-white" />
              <span className="tracking-wide">Direct Sovereign Wires</span>
            </h3>

            {/* Email Box */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 transition-all flex items-center justify-between group">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/20 flex items-center justify-center text-slate-900 dark:text-white shadow-sm dark:shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">OFFICIAL CORRESPONDENCE</div>
                  <a href={`mailto:${PERSONAL_INFO.email}`} className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors">
                    {PERSONAL_INFO.email}
                  </a>
                </div>
              </div>
              <button
                onClick={copyEmail}
                title="Copy Email"
                className="p-2 rounded bg-white dark:bg-black border border-slate-200 dark:border-white/20 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-white/40 transition-colors"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-slate-900 dark:text-white" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone Box */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 transition-all flex items-center justify-between group">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/20 flex items-center justify-center text-slate-900 dark:text-white shadow-sm dark:shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">SECURE DIRECT VOICE</div>
                  <a href={`tel:${PERSONAL_INFO.phone}`} className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors">
                    {PERSONAL_INFO.phone}
                  </a>
                </div>
              </div>
              <button
                onClick={copyPhone}
                title="Copy Phone"
                className="p-2 rounded bg-white dark:bg-black border border-slate-200 dark:border-white/20 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-white/40 transition-colors"
              >
                {copiedPhone ? <Check className="w-4 h-4 text-slate-900 dark:text-white" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* LinkedIn Box */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 hover:border-slate-400 dark:hover:border-white/30 transition-all flex items-center justify-between group">
              <div className="flex items-center space-x-3.5">
                <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/20 flex items-center justify-center text-slate-900 dark:text-white shadow-sm dark:shadow-[0_0_10px_rgba(255,255,255,0.05)]">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">DIPLOMATIC NETWORK</div>
                  <a 
                    href={PERSONAL_INFO.linkedin} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-200 transition-colors"
                  >
                    /in/visaka-srinidhi-a445a82al
                  </a>
                </div>
              </div>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded bg-white dark:bg-black border border-slate-200 dark:border-white/20 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-400 dark:hover:border-white/40 transition-colors"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>

            {/* Location Box */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/10 flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/20 flex items-center justify-center text-slate-900 dark:text-white">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400 uppercase tracking-wider">COMMAND RESIDENCE</div>
                <div className="text-xs font-bold text-slate-900 dark:text-white font-sans">{PERSONAL_INFO.location}</div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-100/70 dark:bg-white/5 border border-slate-200 dark:border-white/15 text-xs font-sans text-slate-700 dark:text-slate-300 leading-relaxed flex items-start space-x-2.5">
              <span className="text-slate-900 dark:text-white text-sm">✦</span>
              <span>Available for immediate full-time engagement, enterprise security consulting, and sovereign enclave leadership.</span>
            </div>
          </div>
        </div>

        {/* Right Column: Encrypted Message Dispatch Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-white/80 dark:bg-black border border-slate-200 dark:border-white/15 backdrop-blur-xl shadow-xl dark:shadow-2xl relative overflow-hidden">
            
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200 dark:border-white/15">
              <div className="flex items-center space-x-2.5">
                <Lock className="w-4 h-4 text-slate-900 dark:text-white" />
                <h3 className="text-base font-royal font-bold text-slate-900 dark:text-white tracking-wide">
                  Transmit Encrypted Dispatch
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/20 px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5">
                AES-256 GCM READY
              </span>
            </div>

            {dispatched ? (
              <div className="p-8 text-center space-y-4 rounded-xl bg-white dark:bg-black border border-slate-300 dark:border-white/40 animate-fadeIn">
                <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 dark:bg-white/10 border border-slate-900 dark:border-white flex items-center justify-center text-slate-900 dark:text-white shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-royal font-bold text-slate-900 dark:text-white">Transmission Sealed & Initiated</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-md mx-auto font-sans leading-relaxed">
                  Your diplomatic missive has been formatted and opened in your secure dispatch client. Srinidhi Visaka responds promptly to sovereign requisitions.
                </p>
                <button
                  onClick={() => setDispatched(false)}
                  className="px-5 py-2.5 rounded-lg bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-xs font-mono text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20 transition-all"
                >
                  Send Another Dispatch
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="dispatch-name" className="text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                      <span>Full Name</span>
                      <span className="text-slate-900 dark:text-white">*</span>
                    </label>
                    <input
                      required
                      id="dispatch-name"
                      name="fullName"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Elena Rostova"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/20 focus:border-slate-800 dark:focus:border-white text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none font-sans focus:ring-1 focus:ring-slate-800/10 dark:focus:ring-white/20 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="dispatch-email" className="text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                      <span>Email Address</span>
                      <span className="text-slate-900 dark:text-white">*</span>
                    </label>
                    <input
                      required
                      id="dispatch-email"
                      name="emailAddress"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. contact@defense-command.org"
                      className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/20 focus:border-slate-800 dark:focus:border-white text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none font-sans focus:ring-1 focus:ring-slate-800/10 dark:focus:ring-white/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="dispatch-purpose" className="text-xs font-mono text-slate-700 dark:text-slate-300">Requisition Purpose</label>
                  <select
                    id="dispatch-purpose"
                    name="purpose"
                    value={formData.purpose}
                    onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/20 focus:border-slate-800 dark:focus:border-white text-xs text-slate-900 dark:text-white outline-none font-sans focus:ring-1 focus:ring-slate-800/10 dark:focus:ring-white/20 transition-all"
                  >
                    <option value="Job Opportunity / Recruitment">Career Opportunity / Executive Recruitment</option>
                    <option value="Penetration Testing / Security Audit">Penetration Testing / Security Audit Requisition</option>
                    <option value="Multicloud Architecture Consultation">Multicloud Architecture Consultation</option>
                    <option value="General Technical Inquiry">Diplomatic Strategic Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="dispatch-message" className="text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center space-x-1">
                    <span>Message Briefing</span>
                    <span className="text-slate-900 dark:text-white">*</span>
                  </label>
                  <textarea
                    required
                    id="dispatch-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide mission briefing, role scope, or project operational objectives..."
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-50 dark:bg-[#050505] border border-slate-200 dark:border-white/20 focus:border-slate-800 dark:focus:border-white text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none font-sans resize-none focus:ring-1 focus:ring-slate-800/10 dark:focus:ring-white/20 transition-all"
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  type="submit"
                  className="w-full py-3.5 rounded-lg font-mono text-xs font-bold text-white dark:text-black bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-neutral-200 shadow-lg dark:shadow-[0_0_25px_rgba(255,255,255,0.25)] transition-all flex items-center justify-center space-x-2 tracking-wider uppercase"
                >
                  <Send className="w-4 h-4 text-white dark:text-black" />
                  <span>Seal & Dispatch Message</span>
                </motion.button>
              </form>
            )}

          </div>
        </div>

      </div>
    </MotionSection>
  );
};
