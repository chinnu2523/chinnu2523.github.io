import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { SkillsMatrix } from './components/SkillsMatrix';
import { CertificationsVault } from './components/CertificationsVault';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { CommandPalette } from './components/CommandPalette';
import { CyberBackground } from './components/CyberBackground';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgressBeam } from './components/ScrollProgressBeam';

export const AppContent: React.FC = () => {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  const scrollToTerminal = () => {
    const el = document.getElementById('terminal');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#F8FAFC] dark:bg-black text-slate-900 dark:text-[#e1e2e7] bg-tactical-grid bg-emissive-glow overflow-x-clip selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300">
      
      {/* Liquid Platinum Scroll Progress Hairline Beam */}
      <ScrollProgressBeam />

      {/* High-Performance Canvas Cyber Background with Data Mesh */}
      <CyberBackground />

      {/* Cyber Reticle Cursor with Smooth Spring Physics */}
      <CustomCursor />

      {/* Top Navigation */}
      <Navbar
        onOpenCommandPalette={() => setIsCommandPaletteOpen(true)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onScrollToTerminal={scrollToTerminal}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section with Editorial Luxury Portrait & Typography */}
        <Hero
          onOpenResumeModal={() => setIsResumeModalOpen(true)}
          onScrollToTerminal={scrollToTerminal}
        />

        {/* Career Timeline with Verified Milestones */}
        <ExperienceTimeline />

        {/* Core Security Engineering Projects */}
        <ProjectsShowcase />

        {/* Interactive CLI Shell */}
        <InteractiveTerminal />

        {/* Skills & Threat Matrix */}
        <SkillsMatrix />

        {/* Certifications & Simulations Vault + Education */}
        <CertificationsVault />

        {/* Contact & Recruitment Dispatch */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />

      <CommandPalette
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        onOpenResumeModal={() => setIsResumeModalOpen(true)}
        onScrollToTerminal={scrollToTerminal}
      />

    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
