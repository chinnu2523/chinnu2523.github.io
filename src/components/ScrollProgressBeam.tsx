import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBeam: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001
  });

  return (
    /* Liquid Platinum Hairline Progress Beam at Top */
    <div className="fixed top-0 left-0 right-0 z-[100] h-[2px] bg-slate-200 dark:bg-black pointer-events-none transition-colors">
      <motion.div
        style={{ scaleX }}
        className="h-full w-full origin-left bg-gradient-to-r from-slate-900 via-slate-700 to-slate-500 dark:from-white dark:via-slate-200 dark:to-slate-400 shadow-[0_0_12px_rgba(15,23,42,0.3)] dark:shadow-[0_0_12px_rgba(255,255,255,0.8),0_0_24px_rgba(255,255,255,0.3)]"
      />
    </div>
  );
};
