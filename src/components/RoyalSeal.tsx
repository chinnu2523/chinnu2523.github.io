import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export const RoyalSeal: React.FC = () => {
  const sealRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!sealRef.current) return;
    const rect = sealRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setRotation({
      x: ((y - centerY) / centerY) * -12,
      y: ((x - centerX) / centerX) * 12
    });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={sealRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-28 h-28 sm:w-32 sm:h-32 perspective-[700px] cursor-pointer select-none group"
      title="Sovereign Cryptographic Attestation Seal • Tier-1 Verified"
    >
      <motion.div
        animate={{
          rotateX: rotation.x,
          rotateY: rotation.y,
          scale: isHovered ? 1.05 : 1
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="relative w-full h-full rounded-full p-[2px] bg-gradient-to-br from-white via-slate-300 to-slate-700 shadow-[0_0_20px_rgba(255,255,255,0.25),0_12px_24px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden"
      >
        {/* Specular Platinum Luster Diffraction Layer */}
        <div 
          className={`absolute -inset-[50%] transition-opacity duration-500 pointer-events-none mix-blend-color-dodge ${
            isHovered ? 'opacity-85' : 'opacity-35'
          }`}
          style={{
            background: 'conic-gradient(from 180deg at 50% 50%, rgba(255, 255, 255, 0.4) 0deg, rgba(203, 213, 225, 0.5) 90deg, rgba(255, 255, 255, 0.8) 180deg, rgba(148, 163, 184, 0.5) 270deg, rgba(255, 255, 255, 0.4) 360deg)',
            transform: isHovered ? 'rotate(90deg) scale(1.15)' : 'rotate(0deg) scale(1)',
            transition: 'transform 1.2s ease, opacity 0.4s ease'
          }}
        />

        {/* Velvet Obsidian Core Backplate */}
        <div className="relative w-full h-full rounded-full bg-radial from-[#0a0a0a] via-[#040404] to-[#000000] flex items-center justify-center border border-white/30">
          
          {/* Rotating Micro-inscribed Cryptographic Telemetry Inscription */}
          <svg className="absolute inset-0 w-full h-full animate-[rotateSeal_35s_linear_infinite]" viewBox="0 0 200 200">
            <defs>
              <path id="sealTextPath" d="M 100, 100 m -74, 0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0" />
            </defs>
            <text className="font-mono text-[7.5px] fill-slate-200 tracking-[2.6px] font-semibold">
              <textPath href="#sealTextPath">
                SOVEREIGN ENCLAVE • ATTESTATION VALID • SHA-256: 4BF92A •
              </textPath>
            </text>
          </svg>

          {/* Central Sovereign Shield & Cypher */}
          <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-b from-[#0e0e0e] to-[#000000] border border-white/40 shadow-[inset_0_0_12px_rgba(255,255,255,0.25)] flex flex-col items-center justify-center">
            
            {/* Heraldic Shield Glyph */}
            <div className="text-white text-lg sm:text-xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">
              ◈
            </div>
            
            {/* Cryptographic Monogram */}
            <span className="text-[8px] font-royal font-bold text-white tracking-widest -mt-1">
              VGDSV
            </span>

            {/* Liquid Platinum Cryptographic Attestation Pip */}
            <span className="absolute bottom-1 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#ffffff,0_0_16px_#ffffff] animate-pulse" />
          </div>

        </div>
      </motion.div>
    </div>
  );
};
