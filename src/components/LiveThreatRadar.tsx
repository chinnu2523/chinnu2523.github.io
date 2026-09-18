import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Activity, CheckCircle2 } from 'lucide-react';
import { MotionSection } from './MotionSection';
import { useTheme } from '../context/ThemeContext';

interface ThreatEvent {
  id: string;
  time: string;
  threat: string;
  target: string;
  action: string;
  severity: 'CRITICAL' | 'HIGH' | 'INFO';
}

export const LiveThreatRadar: React.FC = () => {
  const { isDark } = useTheme();
  const [events, setEvents] = useState<ThreatEvent[]>([
    {
      id: 'evt-1',
      time: '13:24:12',
      threat: 'OWASP A03: SQL Injection Probe',
      target: 'api.visaka.internal/auth',
      action: 'Blocked & Parameterized',
      severity: 'CRITICAL'
    },
    {
      id: 'evt-2',
      time: '13:25:04',
      threat: '802.11 Deauthentication Burst',
      target: 'ESP32-IoT-Sensor-01',
      action: 'PMF 802.11w Mitigated',
      severity: 'HIGH'
    },
    {
      id: 'evt-3',
      time: '13:26:19',
      threat: 'Aviatrix Egress Exfiltration Attempt',
      target: 'AWS-Spoke-10.0.4.12',
      action: 'NGFW Dropped Packet',
      severity: 'HIGH'
    },
    {
      id: 'evt-4',
      time: '13:27:01',
      threat: 'Nmap Stealth SYN Port Scan',
      target: 'DMZ-Firewall-Interface',
      action: 'Logged & Blackholed',
      severity: 'INFO'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
      const newThreats = [
        { threat: 'Cross-Site Scripting (XSS) Fuzz', target: 'shop.target.local', action: 'WAF Neutralized', severity: 'HIGH' as const },
        { threat: 'SSRF Cloud Metadata Probe', target: '169.254.169.254 (IMDSv2)', action: 'Token Enforced', severity: 'CRITICAL' as const },
        { threat: 'Wireshark TCP Stream Anomaly', target: 'Azure-VNet-Transit', action: 'IPsec Encrypted', severity: 'INFO' as const },
        { threat: 'Rogue AP Beacon Broadcast', target: 'ESP32-Xtensa-Chip', action: 'BSSID Rejected', severity: 'HIGH' as const }
      ];
      const pick = newThreats[Math.floor(Math.random() * newThreats.length)];
      setEvents(prev => [
        {
          id: `evt-${Date.now()}`,
          time: timeStr,
          threat: pick.threat,
          target: pick.target,
          action: pick.action,
          severity: pick.severity
        },
        ...prev.slice(0, 3)
      ]);
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  return (
    <MotionSection id="threat-radar" className="py-12 site-container">
      <div className="rounded-2xl border border-slate-200 dark:border-white/20 bg-white/80 dark:bg-black p-4 sm:p-7 shadow-lg dark:shadow-[0_8px_32px_rgba(0,0,0,0.95)] backdrop-blur-xl hud-card transition-colors">
        
        {/* Header HUD Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-white/15">
          <div className="flex items-center space-x-3">
            <div className="relative w-8 h-8 rounded-lg bg-slate-100 dark:bg-black border border-slate-300 dark:border-white/30 flex items-center justify-center text-slate-900 dark:text-white shrink-0">
              <Activity className="w-4 h-4 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-cinzel font-bold text-sm sm:text-base text-slate-900 dark:text-white tracking-wider">
                  SOVEREIGN PERIMETER DEFENSE TELEMETRY
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/20 text-slate-700 dark:text-slate-300 font-semibold">
                  DEFCON: NOMINAL
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 hidden sm:block">
                Surveillance across OWASP endpoints, Aviatrix multicloud transit, and ESP32 hardware telemetry
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4 text-xs font-mono text-slate-500 dark:text-slate-400">
            <div className="flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-900 dark:bg-white animate-ping" />
              <span className="text-slate-900 dark:text-white font-semibold">LIVE PERIMETER</span>
            </div>
            <div className="hidden sm:block">
              LATENCY: <span className="text-slate-900 dark:text-white font-semibold">6ms</span>
            </div>
          </div>
        </div>

        {/* Radar & Feed Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5 items-center">
          
          {/* Radar Scanner Visualizer */}
          <div className="lg:col-span-4 xl:col-span-3 flex flex-col items-center justify-center p-4 bg-slate-50 dark:bg-black rounded-xl border border-slate-200 dark:border-white/15 relative overflow-hidden">
            <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-full border border-slate-300 dark:border-white/30 flex items-center justify-center shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] dark:shadow-[inset_0_0_20px_rgba(255,255,255,0.08)]">
              
              {/* Concentric Rings */}
              <div className="absolute inset-4 rounded-full border border-slate-300/60 dark:border-white/15" />
              <div className="absolute inset-10 rounded-full border border-slate-300/40 dark:border-white/10" />
              <div className="absolute inset-16 rounded-full border border-slate-300/20 dark:border-white/5" />

              {/* Crosshairs & Cardinal Ticks */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-full h-[1px] bg-slate-300 dark:bg-white/15" />
                <div className="h-full w-[1px] bg-slate-300 dark:bg-white/15 absolute" />
              </div>

              {/* Cardinal Labels */}
              <span className="absolute top-1 text-[8px] font-mono text-slate-500 dark:text-slate-400">N</span>
              <span className="absolute bottom-1 text-[8px] font-mono text-slate-500 dark:text-slate-400">S</span>
              <span className="absolute right-1 text-[8px] font-mono text-slate-500 dark:text-slate-400">E</span>
              <span className="absolute left-1 text-[8px] font-mono text-slate-500 dark:text-slate-400">W</span>

              {/* Rotating Radar Sweep Beam */}
              <div 
                className="absolute inset-0 rounded-full animate-radar-sweep pointer-events-none"
                style={{
                  background: isDark
                    ? 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(255, 255, 255, 0.25) 360deg)'
                    : 'conic-gradient(from 0deg, transparent 0deg, transparent 270deg, rgba(15, 23, 42, 0.2) 360deg)'
                }}
              />

              {/* Blip 1: Mitigated Threat */}
              <div className="absolute top-10 right-12 w-2 h-2 rounded-full bg-slate-900 dark:bg-white shadow-[0_0_8px_rgba(15,23,42,0.4)] dark:shadow-[0_0_8px_#ffffff] animate-pulse" />

              {/* Blip 2: Verified Node */}
              <div className="absolute bottom-12 left-10 w-2 h-2 rounded-full bg-slate-600 dark:bg-slate-300 shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_#ffffff]" />

              {/* Center Sovereign Beacon */}
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 dark:bg-white shadow-[0_0_12px_rgba(15,23,42,0.5)] dark:shadow-[0_0_12px_#ffffff]" />
            </div>

            <div className="mt-3 flex items-center justify-between w-full text-[10px] font-mono text-slate-500 dark:text-slate-400 px-2">
              <span>AZIMUTH: 360°</span>
              <span className="text-slate-900 dark:text-white font-semibold">POSTURE: 99.4%</span>
            </div>
          </div>

          {/* Real-time Event Stream */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-2 font-mono text-xs">
            {events.map((evt) => (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="p-3 rounded-xl bg-white/90 dark:bg-black border border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-slate-400 dark:hover:border-white/30 transition-colors shadow-sm"
              >
                <div className="flex items-center space-x-2.5">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    evt.severity === 'CRITICAL' 
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-black border border-slate-900 dark:border-white' 
                      : evt.severity === 'HIGH'
                      ? 'bg-slate-100 dark:bg-black text-slate-900 dark:text-white border border-slate-300 dark:border-white/40'
                      : 'bg-slate-50 dark:bg-black text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/15'
                  }`}>
                    {evt.severity}
                  </span>
                  <div>
                    <span className="text-slate-900 dark:text-white font-medium">{evt.threat}</span>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px] block sm:inline sm:ml-2">({evt.target})</span>
                  </div>
                </div>

                <div className="flex items-center space-x-3 text-right">
                  <span className="text-slate-700 dark:text-slate-200 text-[11px] font-medium flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3 text-slate-900 dark:text-white" />
                    <span>{evt.action}</span>
                  </span>
                  <span className="text-slate-500 text-[10px]">{evt.time}</span>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>
    </MotionSection>
  );
};
