import React from 'react';
import { motion } from 'framer-motion';

interface MotionSectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  delay?: number;
  showFlourish?: boolean;
}

export const MotionSection: React.FC<MotionSectionProps> = ({
  id,
  className = '',
  children,
  delay = 0,
  showFlourish = false
}) => {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 35, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.16, 1, 0.3, 1]
      }}
      className={className}
    >
      {showFlourish && (
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-70px' }}
          transition={{ duration: 1, delay: delay + 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="w-32 h-[1px] mx-auto bg-gradient-to-r from-transparent via-white/30 to-transparent mb-12 origin-center"
        />
      )}
      {children}
    </motion.section>
  );
};
