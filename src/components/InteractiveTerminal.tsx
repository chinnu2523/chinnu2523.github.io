import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Maximize2, Minimize2, Copy, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO, EXPERIENCES, PROJECTS, CERTIFICATIONS } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error' | 'success';
  content: string | React.ReactNode;
}

export const InteractiveTerminal: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const terminalBodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isFirstRender = useRef(true);

  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 'init-1',
      type: 'output',
      content: 'SOVEREIGN ENCLAVE TERMINAL [Royal Defense Kernel v5.2-hardened-amd64]'
    },
    {
      id: 'init-2',
      type: 'output',
      content: 'Attested Operator: veera-guru-datta-srinidhi-visaka (UID: 1000, GID: 1000)'
    },
    {
      id: 'init-3',
      type: 'success',
      content: 'Cryptographic Enclave Ready. Enter "help" or select commands below to inspect credentials & defense audits.'
    }
  ]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    // Only scroll the terminal inner body, NEVER the window
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [lines]);

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCommand = (rawCmd: string) => {
    const cmd = rawCmd.trim();
    if (!cmd) return;

    sounds.playBeep(900, 'sine', 0.04);

    // Save history
    setHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    const newLines: TerminalLine[] = [
      ...lines,
      {
        id: `cmd-${Date.now()}`,
        type: 'input',
        content: `visaka@sovereign-enclave:~$ ${cmd}`
      }
    ];

    const lower = cmd.toLowerCase();
    const parts = lower.split(' ');
    const primary = parts[0];

    if (primary === 'clear') {
      setLines([]);
      setInputVal('');
      return;
    }

    if (primary === 'help') {
      newLines.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-1 text-slate-300">
            <div className="text-white font-bold">Available Security Commands:</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-xs">
              <div><span className="text-white font-mono font-semibold">whoami</span> - Identity & clearance summary</div>
              <div><span className="text-white font-mono font-semibold">skills</span> - Penetration testing & toolchain</div>
              <div><span className="text-white font-mono font-semibold">experience</span> - Internship records (Edufyi, Corizo)</div>
              <div><span className="text-white font-mono font-semibold">projects</span> - OWASP Scanner & ESP32 IoT details</div>
              <div><span className="text-white font-mono font-semibold">certs</span> - Verified certifications list</div>
              <div><span className="text-white font-mono font-semibold">scan &lt;host&gt;</span> - Run simulated Nmap / OWASP probe</div>
              <div><span className="text-white font-mono font-semibold">cat resume.txt</span> - Formatted plain-text resume</div>
              <div><span className="text-white font-mono font-semibold">contact</span> - Email, phone & LinkedIn links</div>
              <div><span className="text-white font-mono font-semibold">sudo hire-visaka</span> - Initialize recruitment protocol</div>
              <div><span className="text-white font-mono font-semibold">clear</span> - Flush terminal screen</div>
            </div>
          </div>
        )
      });
    } else if (primary === 'whoami') {
      newLines.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-1 text-slate-300 border-l-2 border-white/60 pl-3">
            <div className="text-white font-bold">{PERSONAL_INFO.fullName}</div>
            <div>Role: {PERSONAL_INFO.heroTitle}</div>
            <div>Education: KL University (BCA, CGPA: 8.7 / 10.0)</div>
            <div>Location: {PERSONAL_INFO.location}</div>
            <div>Core Focus: Web App Pentesting (OWASP Top 10), Multicloud Security (Aviatrix ACE), ESP32 IoT Defense</div>
          </div>
        )
      });
    } else if (primary === 'skills') {
      newLines.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-2 text-slate-300">
            <div className="text-white font-bold">Active Security Capabilities:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-[#060606] rounded border border-white/15">
                <div className="text-white font-bold">[+] Offensive & Pentest</div>
                <div>OWASP Top 10, Network Scanning, Reconnaissance, Port Enumeration, Vulnerability Reporting</div>
              </div>
              <div className="p-2 bg-[#060606] rounded border border-white/15">
                <div className="text-white font-bold">[+] Cloud & Network</div>
                <div>Aviatrix Multicloud (AWS, Azure, GCP, OCI), VPC Transit, Deep Packet Inspection Firewalls</div>
              </div>
              <div className="p-2 bg-[#060606] rounded border border-white/15">
                <div className="text-white font-bold">[+] Tools & OS</div>
                <div>Kali Linux, Nmap, Wireshark, Arduino IDE, ESP32 Microcontrollers, AI Data Analysis</div>
              </div>
              <div className="p-2 bg-[#060606] rounded border border-white/15">
                <div className="text-white font-bold">[+] Governance & Intel</div>
                <div>CTIGA Certified, Threat Modeling, NIST CSF, Risk Assessment</div>
              </div>
            </div>
          </div>
        )
      });
    } else if (primary === 'experience') {
      newLines.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-2 text-slate-300">
            <div className="text-white font-bold">Practical Internship Track Record:</div>
            {EXPERIENCES.map(e => (
              <div key={e.id} className="text-xs border-l-2 border-white/30 pl-2">
                <div className="text-white font-bold">{e.role} @ {e.company}</div>
                <div className="text-slate-400">{e.period} | Methodology: {e.methodology}</div>
                <div className="text-slate-300 mt-1">{e.summary}</div>
              </div>
            ))}
          </div>
        )
      });
    } else if (primary === 'projects') {
      newLines.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-2 text-slate-300">
            <div className="text-white font-bold">Featured Engineering Deliverables:</div>
            {PROJECTS.map(p => (
              <div key={p.id} className="p-2 bg-[#060606] rounded border border-white/15 text-xs">
                <div className="text-white font-bold">{p.title}</div>
                <div className="text-slate-400 font-mono text-[11px]">{p.technologies.join(' • ')}</div>
                <div className="mt-1 text-slate-300">{p.overview}</div>
              </div>
            ))}
          </div>
        )
      });
    } else if (primary === 'certs') {
      newLines.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-1 text-slate-300 text-xs">
            <div className="text-white font-bold">Verified Certifications & Job Simulations ({CERTIFICATIONS.length}):</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 pt-1">
              {CERTIFICATIONS.map(c => (
                <div key={c.id} className="flex items-center space-x-1.5 text-slate-300">
                  <span className="text-white font-bold">✓</span>
                  <span className="font-semibold text-white">{c.title}</span>
                  <span className="text-slate-500 text-[10px]">({c.issuer})</span>
                </div>
              ))}
            </div>
          </div>
        )
      });
    } else if (primary === 'scan') {
      const target = parts[1] || 'target-system.local';
      sounds.playRadarSweep();
      newLines.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-1.5 text-xs font-mono">
            <div className="text-white font-semibold">[*] Starting Nmap 7.94 / OWASP probe against target: {target}</div>
            <div className="text-slate-400">[*] Host is up (0.0034s latency). Scanned 1000 ports.</div>
            <div className="text-slate-300">
              PORT &nbsp;&nbsp;&nbsp; STATE &nbsp; SERVICE &nbsp;&nbsp;&nbsp;&nbsp; VERSION<br />
              22/tcp &nbsp; open &nbsp; ssh &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; OpenSSH 8.9p1 (Ubuntu)<br />
              80/tcp &nbsp; open &nbsp; http &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; nginx 1.18.0<br />
              443/tcp  open &nbsp; ssl/https &nbsp; nginx 1.18.0<br />
              8080/tcp open &nbsp; http-proxy &nbsp; Node.js Express API
            </div>
            <div className="text-white font-semibold">[*] Checking OWASP Top 10 vulnerabilities...</div>
            <div className="text-slate-200">[+] TLS 1.3: Enforced with HSTS (preload)</div>
            <div className="text-slate-400">[!] Warning: Content-Security-Policy header is missing 'unsafe-inline' restriction</div>
            <div className="text-slate-200">[+] SQLi check: Parameters properly parameterized with prepared statements</div>
            <div className="text-white font-bold">[✔] Scan complete. Target posture score: 92/100 (Low Risk).</div>
          </div>
        )
      });
    } else if (primary === 'contact') {
      newLines.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="space-y-1 text-xs font-mono text-slate-300">
            <div className="text-white font-bold">Contact Transmission Channels:</div>
            <div>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-white underline">{PERSONAL_INFO.email}</a></div>
            <div>Phone: <a href={`tel:${PERSONAL_INFO.phone}`} className="text-white underline">{PERSONAL_INFO.phone}</a></div>
            <div>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-white underline">{PERSONAL_INFO.linkedin}</a></div>
            <div>Location: {PERSONAL_INFO.location}</div>
          </div>
        )
      });
    } else if (primary === 'cat' && parts[1]?.includes('resume')) {
      newLines.push({
        id: `out-${Date.now()}`,
        type: 'output',
        content: (
          <div className="p-3 bg-black rounded border border-white/20 text-[11px] font-mono text-slate-300 space-y-1">
            <div className="text-white font-bold">--- {PERSONAL_INFO.fullName.toUpperCase()} ---</div>
            <div>{PERSONAL_INFO.location} | {PERSONAL_INFO.phone} | {PERSONAL_INFO.email}</div>
            <div className="text-slate-400">EDUCATION: BCA @ KL University (2023-2026, CGPA: 8.7)</div>
            <div className="text-slate-400">INTERNSHIPS: Edufyi Tech Solutions, Corizo, Skill Dunia</div>
            <div className="text-slate-400">CERTS: Aviatrix ACE, Google Cybersecurity, Red Team CTIGA/CCEP, CCSC, ISC2 CC</div>
            <div className="text-white font-semibold mt-2">[End of File - Click 'CV' in navbar to view or print full CV]</div>
          </div>
        )
      });
    } else if (cmd.toLowerCase() === 'sudo hire-visaka' || cmd.toLowerCase() === 'hire-visaka' || cmd.toLowerCase() === 'hire') {
      sounds.playSuccess();
      triggerConfetti();
      newLines.push({
        id: `out-${Date.now()}`,
        type: 'success',
        content: (
          <div className="p-3 bg-black border border-white/40 rounded text-white font-mono text-xs space-y-1 shadow-[0_0_20px_rgba(255,255,255,0.2)]">
            <div className="font-bold text-sm text-white">◈ RECRUITMENT AUTHORIZATION GRANTED!</div>
            <div>Candidate: Veera Guru Datta Srinidhi Visaka</div>
            <div>Clearance: TIER-1 SECURITY OPERATIONS & PENETRATION TESTING</div>
            <div>Action: Reach out immediately at {PERSONAL_INFO.email} or call {PERSONAL_INFO.phone}.</div>
          </div>
        )
      });
    } else {
      sounds.playAlert();
      newLines.push({
        id: `out-${Date.now()}`,
        type: 'error',
        content: `command not found: "${cmd}". Type "help" for a list of valid commands.`
      });
    }

    setLines(newLines);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    sounds.playKeyClick();

    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIndex);
        setInputVal(history[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const nextIndex = historyIndex + 1;
        if (nextIndex < history.length) {
          setHistoryIndex(nextIndex);
          setInputVal(history[nextIndex]);
        } else {
          setHistoryIndex(-1);
          setInputVal('');
        }
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const commands = ['help', 'whoami', 'skills', 'experience', 'projects', 'certs', 'scan', 'cat resume.txt', 'contact', 'sudo hire-visaka', 'clear'];
      const match = commands.find(c => c.startsWith(inputVal.toLowerCase().trim()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  const copyTerminalLogs = () => {
    const text = lines.map(l => typeof l.content === 'string' ? l.content : '[Formatted Output]').join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const commandShortcuts = ['help', 'whoami', 'skills', 'projects', 'scan edufyi.local', 'sudo hire-visaka'];

  return (
    <section id="terminal" className="relative py-16 site-container">
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-slate-600 dark:text-slate-300 text-xs font-mono font-semibold tracking-wider uppercase mb-1">
            <TerminalIcon className="w-4 h-4 text-slate-900 dark:text-white" />
            <span>Sovereign Enclave Cryptographic Console</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-bold text-slate-900 dark:text-white tracking-wider">
            VISAKA <span className="font-royal italic font-light text-slate-600 dark:text-slate-300">Sovereign Shell</span>
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 font-sans">
            Attested zero-trust console: execute simulated security probes, inspect cryptographic keys, or audit credentials.
          </p>
        </div>

        {/* Shortcut Quick Chips */}
        <div className="flex flex-wrap gap-1.5 items-center">
          <span className="text-xs font-mono text-slate-500 dark:text-slate-400 mr-1 hidden sm:inline">Commands:</span>
          {commandShortcuts.map((chip, idx) => (
            <button
              key={idx}
              onClick={() => handleCommand(chip)}
              data-cursor="action"
              data-cursor-text={`EXEC // ${chip.split(' ')[0].toUpperCase()}`}
              className="px-2.5 py-1 rounded bg-white dark:bg-black hover:bg-slate-100 dark:hover:bg-[#141414] border border-slate-200 dark:border-white/20 hover:border-slate-400 dark:hover:border-white text-[11px] font-mono text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all shadow-sm"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Container */}
      <div 
        id="terminal"
        data-cursor="terminal"
        data-cursor-text="ENCLAVE // SHELL"
        className={`rounded-2xl border border-slate-300 dark:border-white/20 bg-black shadow-2xl overflow-hidden font-mono transition-all duration-300 ${
          isExpanded ? 'h-[650px]' : 'h-[440px]'
        } flex flex-col`}
      >
        {/* Terminal Header Bar */}
        <div className="px-4 py-2.5 bg-[#060606] border-b border-white/15 flex items-center justify-between select-none">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-white/20 hover:bg-white/40 border border-white/20 cursor-pointer transition-colors" onClick={() => setLines([])} title="Clear Screen" />
            <div className="w-3 h-3 rounded-full bg-white/10 hover:bg-white/30 border border-white/20 cursor-pointer transition-colors" onClick={() => setIsExpanded(false)} title="Restore" />
            <div className="w-3 h-3 rounded-full bg-white/80 hover:bg-white border border-white/40 cursor-pointer transition-colors" onClick={() => setIsExpanded(!isExpanded)} title="Expand" />
            <span className="text-xs text-slate-400 font-mono ml-2 hidden sm:inline">
              visaka@sovereign-enclave: ~ [ATT-VALID]
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={copyTerminalLogs}
              title="Copy Terminal Logs"
              className="text-xs text-slate-400 hover:text-white flex items-center space-x-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
              <span className="text-[10px] hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs text-slate-400 hover:text-white"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Terminal Body */}
        <div 
          ref={terminalBodyRef}
          className="p-4 flex-1 overflow-y-auto space-y-2 text-xs text-slate-200 cursor-text bg-black"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line) => (
            <div key={line.id} className="leading-relaxed">
              {line.type === 'input' && (
                <div className="text-white font-bold">{line.content}</div>
              )}
              {line.type === 'output' && (
                <div>{line.content}</div>
              )}
              {line.type === 'error' && (
                <div className="text-slate-400 font-mono italic">{line.content}</div>
              )}
              {line.type === 'success' && (
                <div className="text-white font-semibold">{line.content}</div>
              )}
            </div>
          ))}

          {/* Active Input Line */}
          <div className="flex items-center space-x-2 pt-1">
            <span className="text-white font-bold select-none">visaka@sovereign-enclave:~$</span>
            <input
              ref={inputRef}
              id="terminal-cli-input"
              name="terminalInput"
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 min-w-0 bg-transparent text-slate-100 outline-none border-none font-mono text-xs caret-white"
              placeholder="Enter command ('help', 'scan', 'whoami', 'skills')..."
              autoComplete="off"
              spellCheck="false"
              aria-label="VISAKA-OS Terminal Input"
            />
          </div>
        </div>

        {/* Terminal Footer Info */}
        <div className="px-4 py-1.5 bg-[#060606] border-t border-white/15 flex items-center justify-between text-[10px] text-slate-400">
          <div className="flex items-center space-x-3">
            <span>PORT: 443 (TLS 1.3)</span>
            <span>CIPHER: AES_256_GCM</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white">● CLI ACTIVE</span>
            <span className="hidden sm:inline">Press [Tab] to autocomplete</span>
          </div>
        </div>
      </div>
    </section>
  );
};
