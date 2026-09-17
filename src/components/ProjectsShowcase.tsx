import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderGit2, 
  Terminal, 
  Cpu, 
  Cloud, 
  ShieldAlert, 
  Code, 
  CheckCircle2, 
  ArrowUpRight,
  Copy,
  Check
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import { MotionSection } from './MotionSection';
import { SpotlightCard } from './SpotlightCard';

export const ProjectsShowcase: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(PROJECTS[0].id);
  const [viewMode, setViewMode] = useState<'dossier' | 'code'>('dossier');
  const [copiedCode, setCopiedCode] = useState(false);

  const selectedProject = PROJECTS.find(p => p.id === selectedProjectId) || PROJECTS[0];

  const codeSnippets: Record<string, { filename: string; language: string; code: string }> = {
    'owasp-scanner': {
      filename: 'owasp_scanner_core.py',
      language: 'python',
      code: `import requests, re

def audit_sql_injection(target_url, params):
    payloads = ["' OR '1'='1", "admin'--", "1; DROP TABLE users;--"]
    findings = []
    for payload in payloads:
        test_params = {k: payload for k in params.keys()}
        resp = requests.get(target_url, params=test_params, timeout=5)
        if re.search(r"(SQL syntax|ORA-\\d+|PostgreSQL error)", resp.text, re.I):
            findings.append({
                "type": "A03: Injection",
                "payload": payload,
                "cvss": 9.1,
                "remediation": "Enforce prepared statements with parameterized queries."
            })
    return findings`
    },
    'esp32-iot-security': {
      filename: 'esp32_wpa2_aes_firmware.ino',
      language: 'cpp',
      code: `#include <WiFi.h>
#include <mbedtls/aes.h>

void setup_secure_iot() {
    // Enable 802.11w Protected Management Frames (PMF)
    esp_wifi_set_pmf(&pmf_config);
    
    // Initialize Hardware AES-128 Encryption Core
    mbedtls_aes_context aes;
    mbedtls_aes_init(&aes);
    mbedtls_aes_setkey_enc(&aes, encryption_key, 128);
    
    // Verify BSSID Fingerprint to mitigate Evil Twin APs
    if (WiFi.BSSID() != AUTHORIZED_AP_BSSID) {
        ESP.restart(); // Disconnect rogue access point
    }
}`
    },
    'multicloud-architecture': {
      filename: 'aviatrix_transit_firenet.tf',
      language: 'hcl',
      code: `resource "aviatrix_transit_gateway" "global_transit" {
  cloud_type          = 1 # AWS
  account_name        = "aws-security-prod"
  gw_name             = "aviatrix-aws-transit-gw"
  vpc_id              = "vpc-09f4bce8"
  vpc_reg             = "us-east-1"
  enable_firenet      = true
  enable_segmentation = true
}

resource "aviatrix_spoke_transit_attachment" "azure_spoke" {
  spoke_gw_name   = "azure-spoke-gw"
  transit_gw_name = aviatrix_transit_gateway.global_transit.gw_name
}`
    }
  };

  const copySnippet = () => {
    sounds.playKeyClick();
    const snippet = codeSnippets[selectedProjectId]?.code || '';
    navigator.clipboard.writeText(snippet);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <MotionSection id="projects" className="py-20 site-container">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white dark:bg-black border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white text-xs font-mono mb-3 shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.08)]">
          <FolderGit2 className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
          <span className="tracking-[0.2em] uppercase font-semibold">FLAGSHIP ARCHITECTURES &amp; SECURITY DOSSIERS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-slate-900 dark:text-white tracking-wider">
          Sovereign <span className="font-royal italic font-light text-slate-600 dark:text-slate-300">Security Dossiers</span>
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base font-sans">
          Production-grade exploitation tooling, IoT micro-cryptography, and zero-trust multicloud transit networks engineered and deployed by Visaka.
        </p>
      </div>

      {/* Project Selector Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {PROJECTS.map((proj, idx) => {
          const isSelected = proj.id === selectedProjectId;
          return (
            <motion.div
              key={proj.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                onClick={() => {
                  sounds.playKeyClick();
                  setSelectedProjectId(proj.id);
                }}
                data-cursor="card"
                data-cursor-text={`DOSSIER // ${proj.category.split(' ')[0].toUpperCase()}`}
                spotlightColor="rgba(255, 255, 255, 0.1)"
                className={`p-4 rounded-xl border cursor-pointer transition-all hud-card h-full ${
                  isSelected
                    ? 'border-slate-900 dark:border-white bg-white dark:bg-black shadow-lg dark:shadow-[0_0_25px_rgba(255,255,255,0.25)]'
                    : 'border-slate-200 dark:border-white/15 bg-white/70 dark:bg-black hover:border-slate-400 dark:hover:border-white/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-black text-slate-900 dark:text-white border border-slate-200 dark:border-white/30">
                    {proj.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">{proj.period}</span>
                </div>
                <h3 className="text-sm font-royal font-bold text-slate-900 dark:text-white mt-2 leading-snug tracking-wide">{proj.title}</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 font-sans">{proj.subtitle}</p>
              </SpotlightCard>
            </motion.div>
          );
        })}
      </div>

      {/* Detailed Selected Project Dossier */}
      <SpotlightCard 
        spotlightColor="rgba(255, 255, 255, 0.08)"
        className="rounded-2xl border border-slate-200 dark:border-white/20 bg-white/80 dark:bg-black backdrop-blur-2xl p-6 sm:p-10 shadow-xl dark:shadow-2xl space-y-8 hud-card"
      >
        
        {/* Title Bar with Mode Switcher */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-white/15">
          <div>
            <h3 className="text-2xl font-royal font-bold text-slate-900 dark:text-white tracking-wide">{selectedProject.title}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 font-mono mt-1">{selectedProject.subtitle}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex p-1 rounded-lg bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/20">
              <button
                onClick={() => setViewMode('dossier')}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                  viewMode === 'dossier' ? 'bg-white dark:bg-white text-slate-900 dark:text-black font-bold shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Executive Dossier
              </button>
              <button
                onClick={() => setViewMode('code')}
                className={`px-3 py-1 rounded text-xs font-mono transition-colors ${
                  viewMode === 'code' ? 'bg-white dark:bg-white text-slate-900 dark:text-black font-bold shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Source Verification
              </button>
            </div>

            <a
              href="#terminal"
              onClick={() => sounds.playBeep(950, 'sine', 0.08)}
              data-cursor="terminal"
              data-cursor-text="AUDIT // 0x7F"
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-mono font-bold text-white dark:text-black bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-neutral-200 transition-all shadow-md dark:shadow-[0_0_15px_rgba(255,255,255,0.25)]"
            >
              <span>Audit in Terminal</span>
              <Terminal className="w-3.5 h-3.5 text-white dark:text-black" />
            </a>
          </div>
        </div>

        {/* Content Views */}
        {viewMode === 'dossier' ? (
          <>
            {/* Overview & Problem Statement */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              <div className="space-y-4">
                <div>
                  <h4 className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-bold tracking-wider mb-2">
                    Executive Overview
                  </h4>
                  <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {selectedProject.overview}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#060606] border border-slate-200 dark:border-white/15">
                  <h4 className="text-xs font-mono uppercase text-slate-900 dark:text-white font-bold tracking-wider mb-1.5 flex items-center space-x-1.5 font-royal">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>The Security Challenge Solved</span>
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                    {selectedProject.problemStatement}
                  </p>
                </div>
              </div>

              {/* Architecture & Engineering Highlights */}
              <div className="space-y-4">
                <h4 className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-bold tracking-wider">
                  Technical Implementation Details
                </h4>
                <div className="space-y-2.5">
                  {selectedProject.architectureDetails.map((detail, idx) => (
                    <div key={idx} className="flex items-start space-x-2.5 p-3 rounded-lg bg-slate-50 dark:bg-[#060606] border border-slate-200 dark:border-white/10 text-xs text-slate-700 dark:text-slate-300 font-sans">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-white shrink-0 mt-1.5" />
                      <span className="leading-relaxed">{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Key Outcomes & Tech Stack Badges */}
            <div className="pt-6 border-t border-slate-200 dark:border-white/15 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-2 font-bold uppercase">
                  Proven Project Outcomes:
                </div>
                <div className="space-y-1.5">
                  {selectedProject.keyOutcomes.map((outcome, oIdx) => (
                    <div key={oIdx} className="flex items-center space-x-2 text-xs text-slate-700 dark:text-slate-200 font-medium font-sans">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0 text-slate-900 dark:text-white" />
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-mono text-slate-500 dark:text-slate-400 mb-2 font-bold uppercase">
                  Toolchain & Technologies:
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded text-xs font-mono bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/20 text-slate-800 dark:text-white"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </>
        ) : (
          /* Code View */
          <div className="space-y-3">
            <div className="flex items-center justify-between bg-slate-100 dark:bg-[#080808] px-4 py-2 rounded-t-xl border border-slate-200 dark:border-white/15">
              <span className="font-mono text-xs text-slate-800 dark:text-white">
                {codeSnippets[selectedProjectId]?.filename}
              </span>
              <button
                onClick={copySnippet}
                className="flex items-center space-x-1 text-xs font-mono text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                {copiedCode ? <Check className="w-3.5 h-3.5 text-slate-900 dark:text-white" /> : <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <pre className="p-4 rounded-b-xl bg-[#0a0a0c] border border-slate-200 dark:border-white/15 font-mono text-xs text-slate-200 overflow-x-auto leading-relaxed">
              <code>{codeSnippets[selectedProjectId]?.code}</code>
            </pre>
          </div>
        )}

      </SpotlightCard>
    </MotionSection>
  );
};
