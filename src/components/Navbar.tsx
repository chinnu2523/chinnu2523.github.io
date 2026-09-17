import React, { useState, useEffect } from 'react';
import { 
  Terminal, 
  Command, 
  Menu, 
  X,
  ChevronRight,
  Lock,
  Sun,
  Moon
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onOpenResumeModal: () => void;
  onScrollToTerminal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCommandPalette,
  onOpenResumeModal,
  onScrollToTerminal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Dossier', href: '#overview' },
    { name: 'Engagements', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Terminal', href: '#terminal' },
    { name: 'Competencies', href: '#skills' },
    { name: 'Accolades', href: '#certifications' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl pointer-events-auto transition-all duration-300">
      <div 
        className={`rounded-full border transition-all duration-300 px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between shadow-[0_12px_36px_rgba(0,0,0,0.12)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.85)] ${
          isScrolled 
            ? 'bg-white/90 dark:bg-black/90 border-slate-200 dark:border-white/20 backdrop-blur-2xl' 
            : 'bg-white/75 dark:bg-black/75 border-slate-200/80 dark:border-white/10 backdrop-blur-xl hover:border-slate-300 dark:hover:border-white/25'
        }`}
      >
        {/* Brand Identity / Monogram */}
        <a 
          href="#overview"
          className="flex items-center space-x-2.5 group cursor-pointer select-none"
          onClick={() => sounds.playBeep(650, 'sine', 0.05)}
        >
          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-[#111111] border border-slate-300 dark:border-white/20 flex items-center justify-center group-hover:border-slate-500 dark:group-hover:border-white group-hover:shadow-[0_0_12px_rgba(0,0,0,0.1)] dark:group-hover:shadow-[0_0_12px_rgba(255,255,255,0.3)] transition-all">
            <span className="text-slate-900 dark:text-white text-xs font-display">⚜</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <span className="font-cinzel font-bold text-xs sm:text-sm tracking-[0.18em] uppercase text-slate-900 dark:text-white group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors">
              Srinidhi Visaka
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-white animate-pulse" />
          </div>
        </a>

        {/* Desktop Editorial Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => sounds.playKeyClick()}
              className="px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-all tracking-wide"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls Cluster */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          {/* Sovereign Theme Toggle (Dark / Light) */}
          <button
            onClick={() => {
              sounds.playKeyClick();
              toggleTheme();
            }}
            title={isDark ? "Switch to Light Porcelain Mode" : "Switch to Dark Obsidian Mode"}
            aria-label="Toggle theme"
            className="flex items-center justify-center w-8 h-8 rounded-full text-slate-700 dark:text-slate-200 bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] border border-slate-300/80 dark:border-white/20 hover:border-slate-400 dark:hover:border-white/40 transition-all active:scale-95"
          >
            {isDark ? (
              <Sun className="w-3.5 h-3.5 text-amber-300 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-3.5 h-3.5 text-slate-800 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          {/* Enclave CLI Launch Button */}
          <button
            onClick={() => {
              sounds.playKeyClick();
              onScrollToTerminal();
            }}
            title="Launch Sovereign CLI Terminal"
            className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 text-xs font-mono text-slate-800 dark:text-white hover:text-black dark:hover:text-white bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12] border border-slate-300/80 dark:border-white/20 hover:border-slate-400 dark:hover:border-white/40 rounded-full transition-all"
          >
            <Terminal className="w-3.5 h-3.5 text-slate-800 dark:text-white" />
            <span>CLI</span>
          </button>

          {/* Quick Command Palette Button */}
          <button
            onClick={() => {
              sounds.playBeep(750, 'sine', 0.05);
              onOpenCommandPalette();
            }}
            title="Open Command Palette (Cmd + K)"
            className="hidden sm:flex items-center space-x-1 px-2.5 py-1.5 text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-black/[0.03] dark:bg-white/[0.04] hover:bg-black/[0.07] dark:hover:bg-white/[0.09] border border-slate-300/70 dark:border-white/15 hover:border-slate-400 dark:hover:border-white/30 rounded-full transition-all"
          >
            <Command className="w-3.5 h-3.5 text-slate-600 dark:text-slate-300" />
            <kbd className="text-[10px] text-slate-500 dark:text-slate-400">⌘K</kbd>
          </button>

          {/* Primary Royal CV Glass/White Pill */}
          <button
            onClick={() => {
              sounds.playSuccess();
              onOpenResumeModal();
            }}
            className="flex items-center space-x-1.5 px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs font-semibold text-white dark:text-black bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-neutral-200 shadow-md shadow-black/10 dark:shadow-white/20 transition-all font-mono active:scale-95"
          >
            <Lock className="w-3 h-3 text-white dark:text-black" />
            <span>Royal CV</span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full border border-slate-300/80 dark:border-white/15 text-slate-700 dark:text-slate-200 bg-black/[0.04] dark:bg-white/[0.06] hover:bg-black/[0.08] dark:hover:bg-white/[0.12]"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 p-4 bg-white/95 dark:bg-black/95 border border-slate-200 dark:border-white/20 rounded-3xl backdrop-blur-2xl shadow-2xl space-y-2 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => {
                setMobileMenuOpen(false);
                sounds.playKeyClick();
              }}
              className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#111111] hover:text-slate-900 dark:hover:text-white transition-all"
            >
              <span className="font-medium">{link.name}</span>
              <ChevronRight className="w-4 h-4 text-slate-400 dark:text-white/50" />
            </a>
          ))}
          <div className="pt-2.5 border-t border-slate-200 dark:border-white/10 flex items-center justify-between px-1">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToTerminal();
              }}
              className="flex items-center space-x-2 text-xs font-mono text-slate-800 dark:text-white py-1.5"
            >
              <Terminal className="w-4 h-4 text-slate-800 dark:text-white" />
              <span>Launch Terminal</span>
            </button>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  sounds.playKeyClick();
                  toggleTheme();
                }}
                className="p-1.5 rounded-full border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white"
                title="Toggle Theme"
              >
                {isDark ? <Sun className="w-3.5 h-3.5 text-amber-300" /> : <Moon className="w-3.5 h-3.5 text-slate-800" />}
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
                className="flex items-center space-x-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white py-1.5"
              >
                <Command className="w-3.5 h-3.5" />
                <span>⌘K</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

