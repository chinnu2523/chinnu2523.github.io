import React, { useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, useScroll, type Variants } from 'framer-motion';
import { 
Terminal, 
ChevronRight, 
Award,
ShieldCheck,
Cloud,
GraduationCap,
ArrowDown,
Lock
} from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { sounds } from '../utils/soundEffects';
import { useTheme } from '../context/ThemeContext';

const LUXURY_EASE = [0.16, 1, 0.3, 1] as const;

interface HeroProps {
  onOpenResumeModal: () => void;
  onScrollToTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal, onScrollToTerminal }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();

// Scroll Progress across the 220vh Hero stage
const { scrollYProgress } = useScroll({
target: containerRef,
offset: ['start start', 'end end']
});

// High-frequency responsive spring physics for instant scroll feedback without lag
const smoothProgress = useSpring(scrollYProgress, {
stiffness: 380,
damping: 38,
restDelta: 0.0001
});

// Center Photo Zoom Transforms
// Zooms dramatically into Visaka's portrait at the center with face-focused origin
const photoScale = useTransform(smoothProgress, [0, 0.55, 0.85], [1, 1.75, 2.15]);
const photoOpacity = useTransform(smoothProgress, [0, 0.78, 0.95], [1, 1, 0]);

// Left Wing (Identity & Narrative): Slides left and dissolves early so stage is clear for the zoom
const leftWingX = useTransform(smoothProgress, [0, 0.28], [0, -160]);
const leftWingOpacity = useTransform(smoothProgress, [0, 0.20], [1, 0]);

// Right Wing (Dossier Proof & Metrics): Slides right and dissolves early
const rightWingX = useTransform(smoothProgress, [0, 0.28], [0, 160]);
const rightWingOpacity = useTransform(smoothProgress, [0, 0.20], [1, 0]);

// Floating Badges on Portrait: Drift outward and fade early
const badgesScale = useTransform(smoothProgress, [0, 0.18], [1, 0.7]);
const badgesOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

// Atmosphere: Spotlight & Orbital Rings expand dynamically
const haloScale = useTransform(smoothProgress, [0, 0.65], [1, 2.6]);
const haloOpacity = useTransform(smoothProgress, [0, 0.40, 0.85], [0.35, 0.65, 0]);
const orbitScale = useTransform(smoothProgress, [0, 0.65], [1, 2.4]);
const orbitOpacity = useTransform(smoothProgress, [0, 0.40, 0.85], [0.8, 0.25, 0]);
const orbitScrollRotate = useTransform(smoothProgress, [0, 1], [0, 240]);

// Bottom Anchor & Prompt Fade
const bottomBarOpacity = useTransform(smoothProgress, [0, 0.16], [1, 0]);

// Cinematic Center HUD Title Card: Appears smoothly during peak zoom
const cinematicHudOpacity = useTransform(smoothProgress, [0.22, 0.38, 0.68, 0.86], [0, 1, 1, 0]);
const cinematicHudY = useTransform(smoothProgress, [0.22, 0.38], [28, 0]);
const cinematicHudScale = useTransform(smoothProgress, [0.22, 0.38], [0.94, 1]);

// Mouse Parallax Physics for Portrait & Spatial Layers
const mouseX = useMotionValue(0);
const mouseY = useMotionValue(0);

const photoRotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 240, damping: 22 });
const photoRotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 240, damping: 22 });
const photoTranslateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), { stiffness: 240, damping: 22 });
const photoTranslateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-12, 12]), { stiffness: 240, damping: 22 });

// Downward shift during zoom so Visaka's face and eyes remain centered below the fixed navbar
const photoScrollY = useTransform(smoothProgress, [0, 0.55], [0, 80]);
const photoTotalY = useTransform(
[photoTranslateY, photoScrollY], 
([mouse, scroll]) => (Number(mouse) || 0) + (Number(scroll) || 0)
);

// Floating Badges Counter-Parallax (Greater depth separation)
const badgeTranslateX = useSpring(useTransform(mouseX, [-0.5, 0.5], [18, -18]), { stiffness: 190, damping: 18 });
const badgeTranslateY = useSpring(useTransform(mouseY, [-0.5, 0.5], [18, -18]), { stiffness: 190, damping: 18 });

const [isDesktop, setIsDesktop] = React.useState(false);

React.useEffect(() => {
  if (typeof window !== 'undefined') {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }
}, []);

// Mobile-tuned GPU-accelerated scroll transforms (buttery smooth 60fps, zero-lag)
const mobilePhotoScale = useTransform(smoothProgress, [0, 0.65], [1, 1.42]);
const mobilePhotoOpacity = useTransform(smoothProgress, [0, 0.9], [1, 0.95]);
const mobileOrbitScrollRotate = useTransform(smoothProgress, [0, 1], [0, 180]);
const mobileOrbitScale = useTransform(smoothProgress, [0, 0.65], [1, 1.3]);
const mobileBadgeScale = useTransform(smoothProgress, [0, 0.5], [1, 0.92]);
const mobileHaloScale = useTransform(smoothProgress, [0, 0.65], [1, 1.4]);

const activeLeftWingStyle = isDesktop ? { x: leftWingX, opacity: leftWingOpacity } : undefined;
const activeRightWingStyle = isDesktop ? { x: rightWingX, opacity: rightWingOpacity } : undefined;
const activePhotoStyle = isDesktop ? {
  scale: photoScale,
  opacity: photoOpacity,
  rotateX: photoRotateX, 
  rotateY: photoRotateY, 
  x: photoTranslateX,
  y: photoTotalY,
  transformOrigin: '50% 10%',
  transformStyle: 'preserve-3d' as const
} : {
  scale: mobilePhotoScale,
  opacity: mobilePhotoOpacity,
  transformOrigin: '50% 15%',
  willChange: 'transform'
};
const activeBadgeStyle = isDesktop ? {
  x: badgeTranslateX,
  y: badgeTranslateY,
  scale: badgesScale,
  opacity: badgesOpacity
} : {
  scale: mobileBadgeScale
};
const activeOrbitStyle = isDesktop ? { 
  scale: orbitScale, 
  opacity: orbitOpacity 
} : { 
  scale: mobileOrbitScale, 
  opacity: orbitOpacity 
};
const activeHaloStyle = isDesktop ? { 
  scale: haloScale, 
  opacity: haloOpacity 
} : { 
  scale: mobileHaloScale, 
  opacity: haloOpacity 
};

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  if (!isDesktop) return;
  mouseX.set((e.clientX - window.innerWidth / 2) / window.innerWidth);
  mouseY.set((e.clientY - window.innerHeight / 2) / window.innerHeight);
};

const handleMouseLeave = () => {
  if (!isDesktop) return;
  mouseX.set(0);
  mouseY.set(0);
};

const scrollToSection = (id: string) => {
  sounds.playKeyClick();
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

// Staggered Entrance Variants
const containerVariants: Variants = {
hidden: { opacity: 0 },
visible: {
opacity: 1,
transition: {
staggerChildren: 0.12,
delayChildren: 0.08
}
}
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: LUXURY_EASE
    }
  }
};

  return (
    <div 
      ref={containerRef}
      id="overview"
      className="relative min-h-screen lg:h-[200vh] bg-[#F8FAFC] dark:bg-black text-slate-900 dark:text-white selection:bg-slate-900 selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-300"
    >
      {/* Viewport Stage: Natural Flowing on Mobile, Sticky Zoom on Desktop */}
      <section 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative lg:sticky lg:top-0 min-h-screen lg:h-screen w-full flex flex-col justify-between pt-20 sm:pt-24 pb-8 sm:pb-8 overflow-visible lg:overflow-hidden bg-[#F8FAFC] dark:bg-black transition-colors duration-300"
      >
        {/* Ambient Studio Spotlight with Live Breathing & Scroll Expansion */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <motion.div 
            animate={{ 
              scale: [1, 1.08, 0.98, 1],
              opacity: [0.22, 0.32, 0.24, 0.22]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }}
            style={{ 
              scale: haloScale, 
              opacity: haloOpacity,
              background: isDark
                ? 'radial-gradient(circle, rgba(255, 255, 255, 0.20) 0%, rgba(200, 200, 210, 0.06) 45%, transparent 70%)'
                : 'radial-gradient(circle, rgba(15, 23, 42, 0.08) 0%, rgba(100, 116, 139, 0.03) 45%, transparent 70%)'
            }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[700px] sm:h-[950px] rounded-full blur-[160px] pointer-events-none"
          />

          <div 
            className="absolute left-[-5%] top-[-5%] w-[450px] h-[450px] rounded-full opacity-10 blur-[150px] pointer-events-none"
            style={{
              background: isDark
                ? 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(15, 23, 42, 0.05) 0%, transparent 70%)'
            }}
          />
        </div>

        {/* Cinematic HUD Title Overlay (Reveals during scroll-driven center zoom on desktop) */}
        {isDesktop && (
          <motion.div 
            style={{ 
              opacity: cinematicHudOpacity, 
              y: cinematicHudY, 
              scale: cinematicHudScale 
            }}
            className="absolute inset-x-0 bottom-14 sm:bottom-18 z-30 flex flex-col items-center justify-center text-center pointer-events-none px-4"
          >
            <div className="px-5 py-2.5 rounded-full bg-white/90 dark:bg-black/85 border border-slate-300 dark:border-white/30 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.1)] dark:shadow-[0_0_40px_rgba(255,255,255,0.15)] flex items-center space-x-3">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 dark:bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-900 dark:bg-white" />
              </span>
              <span className="font-mono text-xs sm:text-sm tracking-[0.25em] text-slate-900 dark:text-white uppercase font-bold">
                VEERA GURU DATTA SRINIDHI VISAKA
              </span>
            </div>
            <p className="mt-3 text-xs sm:text-sm font-royal italic text-slate-600 dark:text-slate-300 tracking-wide max-w-lg">
              Offensive Security Architect &amp; Multi-Cloud Specialist • KL University BCA Scholar (8.7 CGPA)
            </p>
          </motion.div>
        )}

        {/* Main Tri-Fold Composition: Left Details | Centered Zooming Photo | Right Details */}
        <div className="relative z-10 site-container w-full max-w-7xl mx-auto px-4 sm:px-8 my-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center min-h-[68vh]">

            {/* WING 1 (Left 4 Cols): Identity, Editorial Headline & Primary Directives */}
            <motion.div 
              style={activeLeftWingStyle}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="lg:col-span-4 flex flex-col justify-center space-y-5 text-left z-20"
            >
              {/* Minimalist Whisper-Thin Clearance Kicker */}
              <motion.div variants={itemVariants} className="flex items-center space-x-2.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 dark:bg-white opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-900 dark:bg-white" />
                </span>
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] text-slate-500 dark:text-slate-300 uppercase font-semibold">
                  OFFENSIVE CYBERSECURITY ARCHITECT
                </span>
              </motion.div>

              {/* Stacked Monolithic Headline: I'm VISAKA */}
              <motion.div variants={itemVariants} className="space-y-0 select-none">
                <motion.h1 
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, ease: LUXURY_EASE }}
                  className="flex items-baseline text-6xl sm:text-7xl lg:text-8xl xl:text-9xl tracking-tight leading-[0.88] select-none group"
                >
                  <span className="font-cursive italic text-slate-900 dark:text-white inline-block text-[1.16em] -skew-x-8 pr-0.5 drop-shadow-[0_4px_20px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_4px_24px_rgba(255,255,255,0.3)] transition-all duration-300 group-hover:scale-105">
                    I
                  </span>
                  <span className="font-royal italic font-light text-slate-500 dark:text-slate-300 transition-colors duration-300 -skew-x-3 inline-block">
                    'm
                  </span>
                </motion.h1>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.1, ease: LUXURY_EASE }}
                  className="font-cinzel text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black uppercase tracking-[0.06em] bg-gradient-to-b from-slate-900 via-slate-800 to-slate-600 dark:from-white dark:via-slate-100 dark:to-slate-400 bg-clip-text text-transparent leading-[0.92] pt-1.5 drop-shadow-[0_12px_36px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_12px_36px_rgba(255,255,255,0.22)]"
                >
                  VISAKA
                </motion.div>
              </motion.div>

              {/* Subtitle & Official Legal Identity */}
              <motion.div variants={itemVariants} className="space-y-1.5">
                <div className="text-xs sm:text-sm font-mono text-slate-900 dark:text-white uppercase tracking-[0.16em] font-semibold">
                  Lead Penetration Tester &amp; Multi-Cloud Specialist
                </div>
                <div className="text-xs sm:text-sm font-cinzel text-slate-500 dark:text-slate-300 tracking-[0.22em] uppercase font-medium">
                  Veera Guru Datta Srinidhi Visaka
                </div>
              </motion.div>

              {/* Editorial Narrative Statement */}
              <motion.p variants={itemVariants} className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-sans font-light leading-relaxed max-w-sm">
                Architecting resilient zero-trust enclaves and executing preemptive adversarial simulations across critical multi-cloud infrastructures. KL University BCA scholar (8.7 CGPA) with verified field engagements across Edufyi, Corizo, and Skill Dunia.
              </motion.p>

              {/* Sovereign Executive Call-to-Action Suite */}
              <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2.5 pt-1">
                {/* Primary Button: Explore Projects */}
                <motion.button
                  whileHover={{ scale: 1.03, y: -1.5 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => scrollToSection('projects')}
                  data-cursor="action"
                  data-cursor-text="EXPLORE // PROJECTS"
                  className="px-4 py-2.5 rounded-full bg-slate-900 text-white dark:bg-white dark:text-black font-mono text-xs font-bold uppercase tracking-wider flex items-center space-x-2 shadow-[0_0_25px_rgba(0,0,0,0.15)] dark:shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:bg-slate-800 dark:hover:bg-slate-100 transition-all duration-300"
                >
                  <span>Explore Projects</span>
                  <ChevronRight className="w-3.5 h-3.5 text-white dark:text-black" />
                </motion.button>

                {/* Secondary Button: Executive Terminal */}
                <motion.button
                  whileHover={{ scale: 1.03, y: -1.5 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onScrollToTerminal}
                  data-cursor="terminal"
                  data-cursor-text="LAUNCH // CLI"
                  className="px-4 py-2.5 rounded-full bg-white/90 dark:bg-black/90 border border-slate-300 dark:border-white/20 text-slate-800 dark:text-white font-mono text-xs font-medium uppercase tracking-wider flex items-center space-x-2 hover:border-slate-500 dark:hover:border-white/60 hover:bg-slate-100 dark:hover:bg-white/5 transition-all duration-300 backdrop-blur-sm shadow-sm"
                >
                  <Terminal className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                  <span>&gt;_ CLI</span>
                </motion.button>

                {/* Tertiary Button: Executive CV */}
                <motion.button
                  whileHover={{ scale: 1.03, y: -1.5 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    sounds.playKeyClick();
                    onOpenResumeModal();
                  }}
                  data-cursor="action"
                  data-cursor-text="VERIFY // CV"
                  className="px-3.5 py-2 rounded-full border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300 font-mono text-xs font-medium uppercase tracking-wider flex items-center space-x-1.5 hover:text-slate-900 dark:hover:text-white hover:border-slate-500 dark:hover:border-white/40 transition-all duration-300"
                >
                  <Award className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" />
                  <span>Resume</span>
                </motion.button>
              </motion.div>
            </motion.div>

            {/* CENTER STAGE (Center 4 Cols): Majestic Sovereign Portrait with Living Orbit & Scroll Zoom */}
            <motion.div 
              style={activePhotoStyle}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.1, ease: LUXURY_EASE }}
              className="col-span-1 lg:col-span-4 relative flex justify-center items-center perspective-1000 select-none my-8 mb-14 lg:my-0 z-10"
            >
              {/* Soft Ambient Breathing Backing Behind Subject */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.12, 0.96, 1],
                  opacity: [0.35, 0.55, 0.40, 0.35]
                }}
                transition={{ 
                  duration: 9, 
                  repeat: Infinity, 
                  ease: 'easeInOut' 
                }}
                className="absolute -inset-6 bg-gradient-to-t from-slate-900/10 dark:from-white/20 via-slate-900/5 dark:via-white/8 to-transparent rounded-full blur-3xl pointer-events-none" 
              />

              {/* Living Orbital Concentric Cyber Rings (3-Tier Tourbillon Complication) */}
              <motion.div 
                style={activeOrbitStyle}
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                {/* Ring 1: Outer Slow-Rotating Orbit with 4 Cardinal Specular Satellites */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
                  style={{ rotate: isDesktop ? orbitScrollRotate : mobileOrbitScrollRotate }}
                  className="w-[280px] sm:w-[420px] xl:w-[480px] h-[280px] sm:h-[420px] xl:h-[480px] rounded-full border border-slate-300/80 dark:border-white/15 relative"
                >
                  {/* Cardinal Orbit Nodes at 0°, 90°, 180°, 270° */}
                  <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-slate-900 dark:bg-white shadow-[0_0_14px_rgba(15,23,42,0.4)] dark:shadow-[0_0_14px_#ffffff]" />
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-600 dark:bg-slate-300 shadow-[0_0_8px_rgba(0,0,0,0.2)] dark:shadow-[0_0_8px_rgba(255,255,255,0.7)]" />
                  <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-slate-800 dark:bg-white/90 shadow-[0_0_10px_rgba(0,0,0,0.3)] dark:shadow-[0_0_10px_#ffffff]" />
                  <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 rounded-full bg-slate-500 dark:bg-slate-400" />
                </motion.div>

                {/* Ring 2: Middle Counter-Rotating Horological Calibrated Ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 38, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-[240px] sm:w-[360px] xl:w-[410px] h-[240px] sm:h-[360px] xl:h-[410px] rounded-full border border-dashed border-slate-300/60 dark:border-white/20"
                />

                {/* Ring 3: Inner Precision Reticle Ring with Crosshair Accents */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
                  className="absolute w-[200px] sm:w-[290px] xl:w-[330px] h-[200px] sm:h-[290px] xl:h-[330px] rounded-full border border-slate-300/40 dark:border-white/10"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border-t border-slate-400/60 dark:border-white/40" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 border-b border-slate-400/60 dark:border-white/40" />
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-l border-slate-400/60 dark:border-white/40" />
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-r border-slate-400/60 dark:border-white/40" />
                </motion.div>
              </motion.div>

              {/* Seamless Floating Portrait Container (Alpha Isolated & Studio Graded) */}
              <div 
                id="hero-portrait"
                data-cursor="portrait"
                data-cursor-text="BIOMETRIC // VERIFIED"
                className="relative w-full max-w-[260px] sm:max-w-[340px] xl:max-w-[400px] aspect-[62/100] flex items-center justify-center group"
              >
                <img 
                  src={PERSONAL_INFO.avatarUrl} 
                  alt={PERSONAL_INFO.fullName}
                  className="w-full h-full object-contain object-top filter brightness-[1.0] contrast-[1.03] transition-transform duration-700 group-hover:scale-[1.02] drop-shadow-[0_20px_50px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_20px_50px_rgba(255,255,255,0.08)]"
                  loading="eager"
                />

                {/* Floating Satellite Badge 1: Top Right (KL University BCA Scholar) */}
                <motion.div
                  style={activeBadgeStyle}
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-2 right-0 sm:-right-4 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-white/95 dark:bg-black/90 border border-slate-300 dark:border-white/30 backdrop-blur-xl shadow-xl z-30 flex items-center space-x-1.5 sm:space-x-2"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
                  <span className="font-mono text-[10px] text-slate-900 dark:text-white font-bold tracking-wider">8.7 CGPA</span>
                  <span className="text-[9px] font-mono text-slate-500 dark:text-slate-400">KL UNIV</span>
                </motion.div>

                {/* Floating Satellite Badge 2: Bottom Left (Aviatrix Multicloud ACE) */}
                <motion.div
                  style={activeBadgeStyle}
                  animate={{ y: [3, -3, 3] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="hidden sm:flex absolute -bottom-2 -left-2 sm:-left-4 px-3 py-1.5 rounded-full bg-white/95 dark:bg-black/90 border border-slate-300 dark:border-white/30 backdrop-blur-xl shadow-xl z-30 items-center space-x-2"
                >
                  <Cloud className="w-3.5 h-3.5 text-slate-900 dark:text-white" />
                  <span className="font-mono text-[10px] text-slate-900 dark:text-white font-bold tracking-wider">AVIATRIX ACE</span>
                </motion.div>

                {/* Floating Frosted Cryptographic Keypair Anchor Badge */}
                <motion.div 
                  style={activeBadgeStyle}
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="hidden sm:flex absolute bottom-4 left-1/2 -translate-x-1/2 items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/95 dark:bg-black/90 border border-slate-300 dark:border-white/30 backdrop-blur-xl shadow-xl z-30 whitespace-nowrap"
                >
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 dark:bg-white opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-slate-900 dark:bg-white" />
                  </span>
                  <div className="font-mono text-[9.5px] text-slate-900 dark:text-white tracking-widest uppercase font-semibold">
                    ED25519 VERIFIED
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* WING 2 (Right 4 Cols): Editorial Proof Annotations & Strategic Metrics */}
            <motion.div 
              style={activeRightWingStyle}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.85, delay: 0.18, ease: LUXURY_EASE }}
              className="lg:col-span-4 flex flex-col justify-center space-y-6 pl-0 lg:pl-4 text-left font-mono z-20"
            >
              {/* 01 / Academic Merit */}
              <motion.div 
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                className="space-y-1 border-l-2 border-slate-300 dark:border-white/25 hover:border-slate-900 dark:hover:border-white pl-4 py-1 transition-colors duration-300 group"
              >
                <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-[0.25em] font-semibold group-hover:text-slate-700 dark:group-hover:text-slate-300">
                  01 / Academic Merit
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-cinzel tracking-wider bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  8.7 CGPA
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 font-sans font-light">
                  KL University — BCA Scholar (Distinction)
                </div>
              </motion.div>

              {/* 02 / Field Engagements */}
              <motion.div 
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                className="space-y-1 border-l-2 border-slate-300 dark:border-white/25 hover:border-slate-900 dark:hover:border-white pl-4 py-1 transition-colors duration-300 group"
              >
                <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-[0.25em] font-semibold group-hover:text-slate-700 dark:group-hover:text-slate-300">
                  02 / Field Engagements
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-cinzel tracking-wider bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  3 Roles
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 font-sans font-light">
                  Edufyi • Corizo • Skill Dunia
                </div>
              </motion.div>

              {/* 03 / Defense Accreditations */}
              <motion.div 
                whileHover={{ x: 4 }}
                transition={{ type: 'spring', stiffness: 450, damping: 25 }}
                className="space-y-1 border-l-2 border-slate-300 dark:border-white/25 hover:border-slate-900 dark:hover:border-white pl-4 py-1 transition-colors duration-300 group"
              >
                <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-[0.25em] font-semibold group-hover:text-slate-700 dark:group-hover:text-slate-300">
                  03 / Defense Certifications
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-cinzel tracking-wider bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                  11+ Badges
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-300 font-sans font-light">
                  Aviatrix ACE • Google Cybersecurity
                </div>
              </motion.div>

              {/* Sovereign SOC Location Attestation */}
              <div className="space-y-2 pt-1">
                <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-200/80 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-[10px] text-slate-800 dark:text-slate-200 backdrop-blur-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-900 dark:bg-white animate-pulse" />
                  <span className="tracking-wider uppercase font-mono">VIJAYAWADA, INDIA // TIER-1 SOC READY</span>
                </div>

                <div className="text-[10.5px] text-slate-500 dark:text-slate-400 flex items-center space-x-2 font-mono">
                  <Lock className="w-3 h-3 text-slate-600 dark:text-slate-300" />
                  <span>Sovereign Enclave Security Architecture</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Classic Minimalist Anchor Bar with Dynamic Scroll Flow Guide */}
        <motion.div 
          style={isDesktop ? { opacity: bottomBarOpacity } : undefined}
          className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-8 pt-4 sm:pt-6 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left mt-8 lg:mt-0"
        >
          {/* Left: Classic Authority Line */}
          <div className="font-mono text-[9.5px] sm:text-[10.5px] tracking-widest text-slate-500 dark:text-slate-400 uppercase">
            KL UNIVERSITY BCA SCHOLAR (CGPA 8.7) • ZERO-TRUST ARCHITECT
          </div>

          {/* Right: Elegant Dynamic Scroll Flow Trigger */}
          <button
            onClick={() => scrollToSection('experience')}
            className="inline-flex items-center space-x-2.5 text-xs font-mono text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-300 group"
          >
            <span className="tracking-widest uppercase text-[10.5px]">{isDesktop ? 'Scroll to Zoom & Explore' : 'Scroll to Explore'}</span>
            <div className="w-6 h-6 rounded-full border border-slate-300 dark:border-white/20 flex items-center justify-center group-hover:border-slate-600 dark:group-hover:border-white group-hover:bg-black/5 dark:group-hover:bg-white/10 transition-all">
              <motion.div
                animate={{ y: [-2, 3, -2] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowDown className="w-3 h-3 text-slate-700 dark:text-white" />
              </motion.div>
            </div>
          </button>
        </motion.div>

      </section>
    </div>
  );
};
