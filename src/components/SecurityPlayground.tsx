import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  Cloud, 
  Cpu, 
  Play, 
  CheckCircle2, 
  AlertTriangle, 
  Bug, 
  Lock, 
  Radio, 
  Server, 
  ArrowRight,
  ShieldCheck,
  Send
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { MotionSection } from './MotionSection';
import { useTheme } from '../context/ThemeContext';

export const SecurityPlayground: React.FC = () => {
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState<'owasp' | 'multicloud' | 'iot'>('owasp');

  // --- OWASP Scanner State ---
  const [targetEndpoint, setTargetEndpoint] = useState('https://staging-api.payment-gateway.internal/v2/charge');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLogs, setScanLogs] = useState<string[]>([]);
  const [scanComplete, setScanComplete] = useState(false);

  const runOwaspScan = () => {
    sounds.playBeep(850, 'sine', 0.08);
    setIsScanning(true);
    setScanComplete(false);
    setScanProgress(5);
    setScanLogs(['[INFO] Resolving endpoint target DNS...', `[INFO] Probing SSL/TLS handshake for ${targetEndpoint}`]);

    const logSteps = [
      { progress: 25, log: '[AUDIT] Checking HTTP Security Headers: Content-Security-Policy missing, X-Frame-Options set to SAMEORIGIN' },
      { progress: 50, log: "[FUZZ] Testing SQL Injection payloads: \"' OR 1=1--\", \"admin'--\" against input fields" },
      { progress: 75, log: '[PROBE] Auditing Authentication tokens: Authorization header JWT lacks strong signature key verification' },
      { progress: 90, log: '[ANALYSIS] Running OWASP Top 10 automated heuristic classification engine...' },
      { progress: 100, log: '[SUCCESS] Scan cycle complete. Vulnerability report generated.' }
    ];

    logSteps.forEach((step, idx) => {
      setTimeout(() => {
        setScanProgress(step.progress);
        setScanLogs(prev => [...prev, step.log]);
        sounds.playKeyClick();
        if (idx === logSteps.length - 1) {
          setIsScanning(false);
          setScanComplete(true);
          sounds.playSuccess();
        }
      }, (idx + 1) * 650);
    });
  };

  // --- Multicloud Topology State ---
  const [zeroTrustActive, setZeroTrustActive] = useState(true);
  const [packetStep, setPacketStep] = useState<number>(0); // 0=idle, 1=aws, 2=hub, 3=azure
  const [cloudLog, setCloudLog] = useState('Aviatrix Transit Controller online. Mesh status healthy.');

  const simulateCloudPacket = () => {
    sounds.playBeep(900, 'sine', 0.08);
    setPacketStep(1);
    setCloudLog('Routing egress packet from AWS VPC (10.0.0.0/16)...');

    setTimeout(() => {
      setPacketStep(2);
      setCloudLog('Traffic intercepted by Aviatrix FireNet: NGFW Deep Packet Inspection in progress...');
      sounds.playKeyClick();

      setTimeout(() => {
        if (zeroTrustActive) {
          setPacketStep(3);
          setCloudLog('✅ [PERMITTED] Inspection passed: IPS signatures clean. Spoke-to-spoke IPsec encrypted tunnel verified.');
          sounds.playSuccess();
        } else {
          setPacketStep(0);
          setCloudLog('❌ [BLOCKED] Policy violation: Lateral movement without active zero-trust token dropped at firewall boundary.');
          sounds.playAlert();
        }
      }, 800);
    }, 800);
  };

  // --- IoT ESP32 State ---
  const [iotHardened, setIotHardened] = useState(true);
  const [attackActive, setAttackActive] = useState<'none' | 'deauth' | 'sniff' | 'rogue'>('none');
  const [iotLog, setIotLog] = useState('ESP32 Node initialized. Wi-Fi 802.11 active. Telemetry standby.');

  const triggerIotAttack = (attack: 'deauth' | 'sniff' | 'rogue') => {
    sounds.playBeep(400, 'sawtooth', 0.1);
    setAttackActive(attack);

    if (attack === 'deauth') {
      if (iotHardened) {
        setIotLog('[ALERT] 802.11 Deauth broadcast detected! Hardware 802.11w Protected Management Frames (PMF) active: Attack neutralized, Wi-Fi link sustained.');
        sounds.playSuccess();
      } else {
        setIotLog('[CRITICAL] Deauth attack successful! ESP32 disconnected from AP due to unencrypted 802.11 management frames.');
        sounds.playAlert();
      }
    } else if (attack === 'sniff') {
      if (iotHardened) {
        setIotLog('[DEFENSE] Packet sniffing intercepted in Wireshark: Payloads encrypted via AES-128 CBC. Plaintext data remains completely unreadable to adversary.');
        sounds.playSuccess();
      } else {
        setIotLog('[VULNERABILITY] Plaintext HTTP/MQTT transmission sniffed! Sensor readings and Wi-Fi credentials exposed in PCAP dump.');
        sounds.playAlert();
      }
    } else if (attack === 'rogue') {
      if (iotHardened) {
        setIotLog('[DEFENSE] Rogue AP beacon broadcast detected with identical SSID. BSSID fingerprint mismatch: Connection rejected.');
        sounds.playSuccess();
      } else {
        setIotLog('[VULNERABILITY] ESP32 associated with Rogue Access Point (Evil Twin) due to absence of mutual certificate verification.');
        sounds.playAlert();
      }
    }
  };

  return (
    <MotionSection id="sandbox" className="py-20 site-container">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/20 text-slate-900 dark:text-white text-xs font-mono mb-3 shadow-sm dark:shadow-none">
          <Bug className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
          <span>HANDS-ON SOVEREIGN DEFENSE EMULATION</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-cinzel font-bold text-slate-900 dark:text-white tracking-wider">
          Interactive <span className="font-royal italic font-light text-slate-600 dark:text-slate-300">Security Sandbox</span>
        </h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed font-sans">
          Test real security tools and architectural prototypes engineered by Visaka Srinidhi. Run an OWASP vulnerability scanner, simulate multicloud traffic filtering, or test IoT wireless defense.
        </p>
      </div>

      {/* Tabs Switcher with Framer Motion layoutId */}
      <div className="flex justify-center mb-8 px-2">
        <div className="inline-flex max-w-full overflow-x-auto no-scrollbar p-1.5 rounded-xl bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/20 shadow-md relative">
          {[
            { id: 'owasp', name: 'OWASP Web Scanner', shortName: 'OWASP Scanner', icon: ShieldAlert },
            { id: 'multicloud', name: 'Multicloud Aviatrix Transit', shortName: 'Aviatrix Transit', icon: Cloud },
            { id: 'iot', name: 'ESP32 Hardware Defense', shortName: 'ESP32 Defense', icon: Cpu },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  sounds.playKeyClick();
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`relative z-10 shrink-0 flex items-center space-x-1.5 sm:space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-mono transition-colors ${
                  isActive ? 'text-white dark:text-black font-bold' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeSandboxTab"
                    className="absolute inset-0 bg-slate-900 dark:bg-white rounded-lg shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.4)]"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10 flex items-center space-x-1.5 sm:space-x-2">
                  <tab.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline font-medium">{tab.name}</span>
                  <span className="sm:hidden">{tab.shortName}</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Sandbox Window */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/20 bg-white/80 dark:bg-black backdrop-blur-2xl shadow-xl dark:shadow-2xl p-6 sm:p-8 hud-card transition-colors">
        
        {/* ================= TAB 1: OWASP WEB SCANNER ================= */}
        {activeTab === 'owasp' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/15">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-royal font-bold text-slate-900 dark:text-white tracking-wide">Edufyi Vulnerability Scanner Simulator</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/30 text-slate-900 dark:text-white">
                    OWASP TOP 10 (2025/2026)
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                  Engineered during Visaka's internship at Edufyi Tech Solutions to automate Linux penetration testing and CVSS reporting.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                disabled={isScanning}
                onClick={runOwaspScan}
                className="inline-flex items-center justify-center space-x-2 px-5 py-2.5 rounded-lg font-mono text-xs font-bold text-white dark:text-black bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-neutral-200 disabled:opacity-50 transition-all shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.25)]"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isScanning ? 'Probing Target...' : 'Execute Vulnerability Scan'}</span>
              </motion.button>
            </div>

            {/* Target Selector */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                { name: 'Payment API Gateway', url: 'https://staging-api.payment-gateway.internal/v2/charge', desc: 'Financial transaction microservice' },
                { name: 'Customer Auth Portal', url: 'https://auth.enterprise.local/oauth2/authorize', desc: 'SSO identity provider endpoint' },
                { name: 'Admin Backoffice Web', url: 'https://admin-panel.corp.net/dashboard/users', desc: 'Internal administrative dashboard' }
              ].map((tgt, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -2 }}
                  onClick={() => {
                    sounds.playKeyClick();
                    setTargetEndpoint(tgt.url);
                    setScanComplete(false);
                  }}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    targetEndpoint === tgt.url 
                      ? 'border-slate-900 dark:border-white bg-slate-100 dark:bg-[#121212] shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.2)]' 
                      : 'border-slate-200 dark:border-white/15 bg-white/60 dark:bg-black hover:border-slate-400 dark:hover:border-white/40'
                  }`}
                >
                  <div className="text-xs font-royal font-bold text-slate-900 dark:text-white tracking-wide">{tgt.name}</div>
                  <div className="text-[11px] font-mono text-slate-600 dark:text-slate-300 truncate mt-1">{tgt.url}</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 font-sans">{tgt.desc}</div>
                </motion.div>
              ))}
            </div>

            {/* Progress Bar */}
            {isScanning && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono text-slate-900 dark:text-white">
                  <span>AUDITING TARGET VECTORS</span>
                  <span>{scanProgress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-[#060606] rounded-full overflow-hidden border border-slate-200 dark:border-white/20">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400"
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ ease: 'easeInOut', duration: 0.3 }}
                  />
                </div>
              </div>
            )}

            {/* Console Log Output */}
            <div className="p-4 rounded-xl bg-[#0a0a0c] border border-slate-200 dark:border-white/15 font-mono text-xs space-y-1.5 max-h-48 overflow-y-auto">
              {scanLogs.length === 0 ? (
                <div className="text-slate-500 italic">Select an endpoint above and click "Execute Vulnerability Scan" to begin.</div>
              ) : (
                scanLogs.map((log, index) => (
                  <div key={index} className="text-slate-300">
                    <span className="text-white font-bold">{'>'}</span> {log}
                  </div>
                ))
              )}
            </div>

            {/* Structured Report Findings */}
            <AnimatePresence>
              {scanComplete && (
                <motion.div 
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6 space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white font-royal uppercase tracking-wider">
                      Scan Report Findings (3 Vulnerabilities Detected)
                    </h4>
                    <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/30 text-slate-900 dark:text-white font-semibold">
                      OVERALL RISK: HIGH (CVSS 7.8)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Finding 1 */}
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-[#060606] border border-slate-200 dark:border-white/20 space-y-2 shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-900 text-white dark:bg-white dark:text-black font-bold">
                          CRITICAL • CVSS 9.1
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">A03: Injection</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">SQL Injection in /v2/charge</div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                        Payload <code>' OR '1'='1</code> triggered unexpected query termination and SQL syntax leak.
                      </p>
                      <div className="pt-2 border-t border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-900 dark:text-white">
                        Fix: Enforce parameterized prepared statements.
                      </div>
                    </motion.div>

                    {/* Finding 2 */}
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-[#060606] border border-slate-200 dark:border-white/30 space-y-2 shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-black text-slate-900 dark:text-white border border-slate-300 dark:border-white/30">
                          MEDIUM • CVSS 5.4
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">A05: Misconfig</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">Missing Content-Security-Policy</div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                        No CSP header found. Client-side browser is vulnerable to script injection and inline iframe clickjacking.
                      </p>
                      <div className="pt-2 border-t border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-900 dark:text-white">
                        Fix: Inject strict CSP header with script-src 'self'.
                      </div>
                    </motion.div>

                    {/* Finding 3 */}
                    <motion.div 
                      whileHover={{ scale: 1.02 }}
                      className="p-4 rounded-xl bg-slate-50 dark:bg-[#060606] border border-slate-200 dark:border-white/20 space-y-2 shadow-md"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-black text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/20">
                          LOW • CVSS 3.7
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">A01: Auth</span>
                      </div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">JWT Expiration Threshold High</div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                        Token expiration set to 30 days without refresh token rotation mechanism.
                      </p>
                      <div className="pt-2 border-t border-slate-200 dark:border-white/10 text-[10px] font-mono text-slate-900 dark:text-white">
                        Fix: Limit JWT expiry to 15m and implement refresh tokens.
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* ================= TAB 2: MULTICLOUD AVIATRIX TRANSIT ================= */}
        {activeTab === 'multicloud' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/15">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-royal font-bold text-slate-900 dark:text-white tracking-wide">Aviatrix Multicloud Network Security Mesh</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/30 text-slate-900 dark:text-white">
                    AVIATRIX ACE CERTIFIED
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                  Simulating cross-cloud traffic between AWS, Azure, and Google Cloud with Next-Gen Firewall (NGFW) deep packet inspection.
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={() => {
                    sounds.playKeyClick();
                    setZeroTrustActive(!zeroTrustActive);
                  }}
                  className={`px-3 py-2 rounded-lg font-mono text-xs border transition-all ${
                    zeroTrustActive 
                      ? 'bg-slate-900 text-white dark:bg-black dark:border-white dark:text-white shadow-sm dark:shadow-[0_0_12px_rgba(255,255,255,0.2)]' 
                      : 'bg-slate-100 text-slate-600 dark:bg-black dark:border-white/25 dark:text-slate-400'
                  }`}
                >
                  Zero-Trust Policy: {zeroTrustActive ? 'ENABLED' : 'DISABLED'}
                </button>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={simulateCloudPacket}
                  className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-mono text-xs font-bold text-white dark:text-black bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-neutral-200 shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.25)] transition-all"
                >
                  <Send className="w-3.5 h-3.5 fill-current" />
                  <span>Send Egress Packet</span>
                </motion.button>
              </div>
            </div>

            {/* Architecture Node Map with Packet Motion Animation */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative py-4">
              
              {/* Node 1: AWS VPC */}
              <motion.div 
                animate={{ borderColor: packetStep === 1 ? '#0F172A' : isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.15)' }}
                className="p-5 rounded-xl bg-slate-50 dark:bg-[#060606] border text-center space-y-2 relative"
              >
                <div className="w-10 h-10 mx-auto rounded-lg bg-slate-200/70 dark:bg-white/5 border border-slate-300 dark:border-white/20 flex items-center justify-center text-slate-900 dark:text-white font-mono font-bold">
                  AWS
                </div>
                <div className="text-xs font-royal font-bold text-slate-900 dark:text-white tracking-wide">AWS Production Spoke</div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">10.0.0.0/16 • us-east-1</div>
                <div className="text-[10px] text-slate-600 dark:text-slate-300 font-mono">IPsec Spoke Tunnel: UP</div>
              </motion.div>

              {/* Center Node: Aviatrix Transit Core */}
              <motion.div 
                animate={{ 
                  scale: packetStep === 2 ? 1.04 : 1,
                  boxShadow: packetStep === 2 ? '0 0 35px rgba(15, 23, 42, 0.25)' : '0 0 15px rgba(0, 0, 0, 0.05)'
                }}
                className="p-5 rounded-xl bg-white dark:bg-black border-2 border-slate-900 dark:border-white text-center space-y-2 relative"
              >
                <div className="w-10 h-10 mx-auto rounded-lg bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white flex items-center justify-center text-slate-900 dark:text-white font-mono font-bold">
                  HUB
                </div>
                <div className="text-xs font-royal font-bold text-slate-900 dark:text-white tracking-wide">Aviatrix Transit Gateway</div>
                <div className="text-[11px] font-mono text-slate-600 dark:text-slate-300">NGFW FireNet Inspection</div>
                <div className="text-[10px] font-mono text-slate-700 dark:text-slate-300 font-semibold">
                  {packetStep === 2 ? '⚠️ DEEP PACKET INSPECTION IN PROGRESS' : 'Zero-Trust Transit Active'}
                </div>
              </motion.div>

              {/* Node 3: Azure VNet */}
              <motion.div 
                animate={{ borderColor: packetStep === 3 ? '#0F172A' : isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(15, 23, 42, 0.15)' }}
                className="p-5 rounded-xl bg-slate-50 dark:bg-[#060606] border text-center space-y-2 relative"
              >
                <div className="w-10 h-10 mx-auto rounded-lg bg-slate-200/70 dark:bg-white/5 border border-slate-300 dark:border-white/20 flex items-center justify-center text-slate-900 dark:text-white font-mono font-bold">
                  AZURE
                </div>
                <div className="text-xs font-royal font-bold text-slate-900 dark:text-white tracking-wide">Azure Secure Spoke</div>
                <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">172.16.0.0/16 • East US</div>
                <div className="text-[10px] text-slate-600 dark:text-slate-300 font-mono">Segmentation: Isolated</div>
              </motion.div>
            </div>

            {/* Telemetry Log */}
            <div className="p-4 rounded-xl bg-[#0a0a0c] border border-slate-200 dark:border-white/15 font-mono text-xs text-slate-300">
              <span className="text-white font-bold">[AVIATRIX-TRANSIT-SOC]:</span> {cloudLog}
            </div>

            {/* Architecture Explanatory Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#060606] border border-slate-200 dark:border-white/15 text-slate-600 dark:text-slate-300">
                <div className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5 mb-1 font-royal tracking-wide">
                  <ShieldCheck className="w-4 h-4 text-slate-900 dark:text-white" />
                  <span>Centralized Egress Filtering</span>
                </div>
                Prevents unauthorized data exfiltration by funneling all outbound VPC traffic through automated firewall gateways.
              </div>
              <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-[#060606] border border-slate-200 dark:border-white/15 text-slate-600 dark:text-slate-300">
                <div className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5 mb-1 font-royal tracking-wide">
                  <Lock className="w-4 h-4 text-slate-900 dark:text-white" />
                  <span>Spoke-to-Spoke Encryption</span>
                </div>
                All cross-cloud communication is secured with line-rate high-performance IPsec without manual complex peering tunnels.
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ESP32 IOT DEFENSE ================= */}
        {activeTab === 'iot' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/15">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-royal font-bold text-slate-900 dark:text-white tracking-wide">ESP32 IoT Wireless Attack &amp; Defense Simulator</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/30 text-slate-900 dark:text-white">
                    HARDWARE LAB PROJECT
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-mono">
                  Demonstrates Visaka's academic IoT security project mitigating unauthorized Wi-Fi access and 802.11 deauthentication exploits.
                </p>
              </div>

              <button
                onClick={() => {
                  sounds.playKeyClick();
                  setIotHardened(!iotHardened);
                }}
                className={`px-3 py-2 rounded-lg font-mono text-xs border transition-all ${
                  iotHardened 
                    ? 'bg-slate-900 text-white dark:bg-black dark:border-white dark:text-white shadow-sm dark:shadow-[0_0_12px_rgba(255,255,255,0.2)]' 
                    : 'bg-slate-100 text-slate-600 dark:bg-black dark:border-white/25 dark:text-slate-400'
                }`}
              >
                Firmware Defense: {iotHardened ? 'HARDENED (AES + PMF)' : 'VULNERABLE (PLAINTEXT)'}
              </button>
            </div>

            {/* Attack Simulation Triggers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <motion.button
                whileHover={{ y: -2 }}
                onClick={() => triggerIotAttack('deauth')}
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#060606] dark:hover:bg-[#121212] border border-slate-200 dark:border-white/20 text-left space-y-1 transition-all"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                  <span>Simulate 802.11 Deauth</span>
                  <Radio className="w-4 h-4 text-slate-900 dark:text-white" />
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">Sends forged disassociation frames to disconnect the ESP32.</div>
              </motion.button>

              <motion.button
                whileHover={{ y: -2 }}
                onClick={() => triggerIotAttack('sniff')}
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#060606] dark:hover:bg-[#121212] border border-slate-200 dark:border-white/30 text-left space-y-1 transition-all"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                  <span>Sniff Telemetry Packets</span>
                  <Server className="w-4 h-4 text-slate-900 dark:text-white" />
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">Captures sensor data over Wi-Fi using Wireshark probe.</div>
              </motion.button>

              <motion.button
                whileHover={{ y: -2 }}
                onClick={() => triggerIotAttack('rogue')}
                className="p-3.5 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-[#060606] dark:hover:bg-[#121212] border border-slate-200 dark:border-white/30 text-left space-y-1 transition-all"
              >
                <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                  <span>Rogue AP Evil Twin</span>
                  <AlertTriangle className="w-4 h-4 text-slate-900 dark:text-white" />
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">Broadcasts cloned SSID to lure device into adversary portal.</div>
              </motion.button>
            </div>

            {/* Telemetry Screen */}
            <div className="p-4 rounded-xl bg-[#0a0a0c] border border-slate-200 dark:border-white/15 font-mono text-xs space-y-2">
              <div className="flex justify-between items-center text-slate-400 border-b border-slate-800 dark:border-white/15 pb-2">
                <span>CHIP: ESP32-WROOM-32 (Xtensa Dual-Core 240MHz)</span>
                <span className="text-white">STATUS: {attackActive !== 'none' ? `ALERT [${attackActive.toUpperCase()}]` : 'NOMINAL'}</span>
              </div>
              <div className="text-slate-200">
                <span className="text-white font-bold">[ESP32-LOG]</span> {iotLog}
              </div>
            </div>

            {/* Hardening Details */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-[#060606] border border-slate-200 dark:border-white/15 text-xs text-slate-600 dark:text-slate-300 space-y-2">
              <div className="font-bold text-slate-900 dark:text-white flex items-center space-x-1.5 font-royal tracking-wide">
                <ShieldCheck className="w-4 h-4 text-slate-900 dark:text-white" />
                <span>How Srinidhi Secured the ESP32 IoT Device:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-500 dark:text-slate-400 pl-1 font-sans">
                <li><strong className="text-slate-800 dark:text-slate-200">802.11w Management Frame Protection:</strong> Cryptographically signs deauth and disassociation frames to stop spoofed disconnection attacks.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Hardware AES-128 Encryption:</strong> Leveraged the on-chip crypto engine to encrypt telemetry before Wi-Fi transmission.</li>
                <li><strong className="text-slate-800 dark:text-slate-200">Mutual BSSID Verification:</strong> Device checks router MAC and cryptographic handshake rather than merely matching network SSID names.</li>
              </ul>
            </div>
          </div>
        )}

      </div>
    </MotionSection>
  );
};
