import React, { useState, useEffect } from 'react';
import { 
  Command, 
  Search, 
  Terminal, 
  FileText, 
  ShieldAlert, 
  Briefcase, 
  Award, 
  Mail, 
  FolderGit2,
  Volume2, 
  Copy,
  ExternalLink,
  Sun,
  Moon,
  X
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { PERSONAL_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResumeModal: () => void;
  onScrollToTerminal: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenResumeModal,
  onScrollToTerminal
}) => {
  const [query, setQuery] = useState('');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        isOpen ? onClose() : sounds.playBeep(750, 'sine', 0.05);
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const actions = [
    {
      id: 'term',
      title: 'Launch Interactive VISAKA-OS Terminal',
      category: 'Terminal',
      icon: Terminal,
      action: () => {
        onClose();
        onScrollToTerminal();
      }
    },
    {
      id: 'projects',
      title: 'View Flagship Projects (OWASP Scanner, ESP32, Multi-Cloud)',
      category: 'Projects',
      icon: FolderGit2,
      action: () => {
        onClose();
        const el = document.getElementById('projects');
        el?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'resume',
      title: 'View / Download Full Resume (PDF)',
      category: 'Document',
      icon: FileText,
      action: () => {
        onClose();
        onOpenResumeModal();
      }
    },
    {
      id: 'experience',
      title: 'View Practical Internships (Edufyi, Corizo, Skill Dunia)',
      category: 'Navigation',
      icon: Briefcase,
      action: () => {
        onClose();
        document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'certs',
      title: 'Inspect Certifications & Simulations (Google, Aviatrix, Red Team)',
      category: 'Navigation',
      icon: Award,
      action: () => {
        onClose();
        document.getElementById('certifications')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'contact',
      title: 'Contact / Dispatch Message to Srinidhi Visaka',
      category: 'Contact',
      icon: Mail,
      action: () => {
        onClose();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'copy-email',
      title: `Copy Email (${PERSONAL_INFO.email})`,
      category: 'Clipboard',
      icon: Copy,
      action: () => {
        navigator.clipboard.writeText(PERSONAL_INFO.email);
        sounds.playSuccess();
        onClose();
      }
    },
    {
      id: 'theme',
      title: theme === 'dark' ? 'Switch to Light Sovereign Porcelain Theme' : 'Switch to Dark Sovereign Obsidian Theme',
      category: 'Appearance',
      icon: theme === 'dark' ? Sun : Moon,
      action: () => {
        toggleTheme();
        onClose();
      }
    },
    {
      id: 'sound',
      title: 'Toggle Cyber Synthesizer Sound FX',
      category: 'Settings',
      icon: Volume2,
      action: () => {
        sounds.toggleMute();
        onClose();
      }
    }
  ];

  const filtered = actions.filter(a => 
    a.title.toLowerCase().includes(query.toLowerCase()) || 
    a.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 dark:bg-black/85 backdrop-blur-md flex items-start justify-center pt-24 px-4 animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white dark:bg-black border border-slate-200 dark:border-white/20 rounded-2xl shadow-2xl overflow-hidden font-sans">
        
        {/* Input Field */}
        <div className="p-4 border-b border-slate-200 dark:border-white/15 flex items-center space-x-3 bg-slate-50 dark:bg-[#060606]">
          <Search className="w-5 h-5 text-slate-900 dark:text-white" />
          <input
            autoFocus
            id="command-palette-search"
            name="commandSearch"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to section..."
            className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 outline-none font-mono"
            aria-label="Command palette search input"
          />
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action List */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {filtered.length === 0 ? (
            <div className="p-4 text-center text-xs text-slate-500 font-mono">
              No matching commands found.
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  sounds.playKeyClick();
                  item.action();
                }}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-100 dark:hover:bg-[#141414] cursor-pointer text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-black border border-slate-200 dark:border-white/15 flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white group-hover:border-slate-400 dark:group-hover:border-white transition-colors">
                    <item.icon className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-xs font-medium">{item.title}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/20 text-slate-700 dark:text-slate-300">
                  {item.category}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Footer Hint */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-[#060606] border-t border-slate-200 dark:border-white/15 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span>Navigation Quick Actions</span>
          <span>Press ESC to dismiss</span>
        </div>

      </div>
    </div>
  );
};
