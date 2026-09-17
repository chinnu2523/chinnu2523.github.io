import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface Ripple {
  id: number;
  x: number;
  y: number;
}

type CursorTargetType = 'default' | 'interactive' | 'card' | 'input';

export const CustomCursor: React.FC = () => {
  const { isDark } = useTheme();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [targetType, setTargetType] = useState<CursorTargetType>('default');
  const [isClicked, setIsClicked] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  // 1. Direct raw hardware mouse coordinates (0ms latency direct response)
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // 2. Buttery, damped spring for classic trailing halo ring
  const ringX = useSpring(rawX, { damping: 30, stiffness: 450, mass: 0.5 });
  const ringY = useSpring(rawY, { damping: 30, stiffness: 450, mass: 0.5 });

  // Refs to avoid unnecessary state re-renders during mouse move
  const isVisibleRef = useRef(false);
  const lastCheck = useRef(0);
  const targetTypeRef = useRef<CursorTargetType>('default');

  useEffect(() => {
    // Only mount on desktop pointer devices
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    setIsEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        setIsVisible(true);
      }

      // Throttle DOM tree queries (~30ms) for high-performance 120fps smoothness
      const now = performance.now();
      if (now - lastCheck.current < 28) return;
      lastCheck.current = now;

      const target = ((document.elementFromPoint ? document.elementFromPoint(e.clientX, e.clientY) : null) || e.target) as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, [role="button"], [data-cursor="action"], [data-cursor="interactive"], [data-cursor="terminal"]');
      const input = !interactive && target.closest('input, textarea, select, [contenteditable="true"]');
      const card = !interactive && !input && target.closest('.hud-card, .glass-panel, [data-cursor="card"], [data-cursor="portrait"]');

      let nextType: CursorTargetType = 'default';
      if (interactive) {
        nextType = 'interactive';
      } else if (input) {
        nextType = 'input';
      } else if (card) {
        nextType = 'card';
      }

      if (nextType !== targetTypeRef.current) {
        targetTypeRef.current = nextType;
        setTargetType(nextType);
      }
    };

    const onMouseDown = (e: MouseEvent) => {
      setIsClicked(true);
      const newRipple: Ripple = {
        id: Date.now() + Math.random(),
        x: e.clientX,
        y: e.clientY,
      };
      setRipples((prev) => [...prev.slice(-2), newRipple]);
    };

    const onMouseUp = () => {
      setIsClicked(false);
    };

    const onMouseLeave = () => {
      isVisibleRef.current = false;
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      isVisibleRef.current = true;
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [rawX, rawY]);

  const removeRipple = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  if (!isEnabled) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] overflow-hidden select-none">
      
      {/* 1. Subtle, Elegant Click Expansion Ripple */}
      {ripples.map((ripple) => (
        <motion.div
          key={ripple.id}
          className={`absolute rounded-full border pointer-events-none ${
            isDark ? 'border-white/50 shadow-[0_0_12px_rgba(255,255,255,0.3)]' : 'border-slate-900/40 shadow-[0_0_10px_rgba(15,23,42,0.15)]'
          }`}
          style={{
            left: ripple.x,
            top: ripple.y,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ width: 16, height: 16, opacity: 0.7, scale: 0.8 }}
          animate={{ width: 68, height: 68, opacity: 0, scale: 1.8 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          onAnimationComplete={() => removeRipple(ripple.id)}
        />
      ))}

      {/* 2. Classic Trailing Halo Ring (Smooth Spring Damped) */}
      <motion.div
        className="absolute pointer-events-none flex items-center justify-center"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? (targetType === 'input' ? 0 : 1) : 0,
        }}
      >
        <motion.div
          className={`rounded-full border transition-colors duration-250 ${
            isDark
              ? (targetType === 'interactive'
                  ? 'border-white/85 bg-white/[0.08] shadow-[0_0_16px_rgba(255,255,255,0.3)]'
                  : targetType === 'card'
                  ? 'border-white/55 bg-white/[0.04] shadow-[0_0_12px_rgba(255,255,255,0.15)]'
                  : 'border-white/40 bg-white/[0.02] shadow-[0_0_8px_rgba(255,255,255,0.1)]')
              : (targetType === 'interactive'
                  ? 'border-slate-900/85 bg-slate-900/[0.06] shadow-[0_0_16px_rgba(15,23,42,0.2)]'
                  : targetType === 'card'
                  ? 'border-slate-900/50 bg-slate-900/[0.03] shadow-[0_0_10px_rgba(15,23,42,0.1)]'
                  : 'border-slate-900/35 bg-slate-900/[0.015] shadow-[0_0_8px_rgba(15,23,42,0.08)]')
          }`}
          animate={{
            width: targetType === 'interactive' ? 50 : targetType === 'card' ? 44 : 32,
            height: targetType === 'interactive' ? 50 : targetType === 'card' ? 44 : 32,
            scale: isClicked ? 0.82 : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 420,
            damping: 26,
          }}
        />
      </motion.div>

      {/* 3. Direct Zero-Lag Center Precision Dot */}
      <motion.div
        className="absolute pointer-events-none flex items-center justify-center"
        style={{
          x: rawX,
          y: rawY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: isVisible ? 1 : 0,
        }}
      >
        {targetType === 'input' ? (
          // Elegant minimal text I-beam indicator
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 18, opacity: 1 }}
            className={`w-[2px] rounded-full animate-pulse ${
              isDark ? 'bg-white shadow-[0_0_8px_#ffffff]' : 'bg-slate-900 shadow-[0_0_6px_rgba(15,23,42,0.5)]'
            }`}
          />
        ) : (
          // Classic precision dot
          <motion.div
            animate={{
              scale: isClicked ? 0.75 : targetType === 'interactive' ? 1.4 : 1,
            }}
            transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            className={`rounded-full transition-colors duration-200 ${
              isDark
                ? (targetType === 'interactive'
                    ? 'w-1.5 h-1.5 bg-white shadow-[0_0_8px_#ffffff]'
                    : 'w-1.5 h-1.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]')
                : (targetType === 'interactive'
                    ? 'w-1.5 h-1.5 bg-slate-900 shadow-[0_0_8px_rgba(15,23,42,0.5)]'
                    : 'w-1.5 h-1.5 bg-slate-900 shadow-[0_0_6px_rgba(15,23,42,0.4)]')
            }`}
          />
        )}
      </motion.div>
    </div>
  );
};
