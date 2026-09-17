import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const CyberBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isDark } = useTheme();
  const isDarkRef = useRef(isDark);

  useEffect(() => {
    isDarkRef.current = isDark;
  }, [isDark]);

  const { scrollY } = useScroll();
  const rosetteRotate = useTransform(scrollY, [0, 8000], [0, 180]);
  const rosetteY = useTransform(scrollY, [0, 8000], [0, -150]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      colorDark: string;
      colorLight: string;
      pulsePhase: number;
    }

    interface Packet {
      fromIdx: number;
      toIdx: number;
      progress: number;
      speed: number;
    }

    const particles: Particle[] = [];
    const packets: Packet[] = [];
    
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    
    // Optimized node count: 38 on desktop, 10 on mobile
    const particleCount = isMobile ? 10 : Math.min(Math.floor((width * height) / 36000), 38);
    // Dark & Light Palettes
    const darkColors = ['#FFFFFF', '#E2E8F0', '#CBD5E1', '#94A3B8', '#64748B'];
    const lightColors = ['#0F172A', '#1E293B', '#334155', '#475569', '#64748B'];

    for (let i = 0; i < particleCount; i++) {
      const px = Math.random() * width;
      const py = Math.random() * height;
      particles.push({
        x: px,
        y: py,
        vx: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.3),
        vy: (Math.random() - 0.5) * (isMobile ? 0.15 : 0.3),
        size: Math.random() * 1.6 + 0.8,
        alpha: Math.random() * 0.4 + 0.2,
        colorDark: darkColors[Math.floor(Math.random() * darkColors.length)],
        colorLight: lightColors[Math.floor(Math.random() * lightColors.length)],
        pulsePhase: Math.random() * Math.PI * 2
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobile) return;
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    let isScrolling = false;
    let scrollTimer: any = null;
    const handleScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }
    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    let packetTimer = 0;

    const render = () => {
      if (document.hidden || (isMobile && isScrolling)) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const dark = isDarkRef.current;
      const activeEdges: [number, number][] = [];

      // Only calculate & draw constellation lines and telemetry packets on desktop
      if (!isMobile) {
        const maxDistance = 140;
        const maxDistanceSq = maxDistance * maxDistance;

        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distSq = dx * dx + dy * dy;

            if (distSq < maxDistanceSq) {
              const dist = Math.sqrt(distSq);
              activeEdges.push([i, j]);
              const alpha = (1 - dist / maxDistance) * 0.14;
              ctx.beginPath();
              ctx.moveTo(particles[i].x, particles[i].y);
              ctx.lineTo(particles[j].x, particles[j].y);
              ctx.strokeStyle = dark ? `rgba(255, 255, 255, ${alpha})` : `rgba(15, 23, 42, ${alpha * 0.9})`;
              ctx.lineWidth = 0.65;
              ctx.stroke();
            }
          }
        }

        // Telemetry packet transmission along edges
        packetTimer++;
        if (packetTimer % 45 === 0 && activeEdges.length > 0 && packets.length < 5) {
          const edge = activeEdges[Math.floor(Math.random() * activeEdges.length)];
          packets.push({
            fromIdx: edge[0],
            toIdx: edge[1],
            progress: 0,
            speed: 0.014 + Math.random() * 0.016
          });
        }

        // Update packets
        for (let k = packets.length - 1; k >= 0; k--) {
          const pkt = packets[k];
          pkt.progress += pkt.speed;

          if (pkt.progress >= 1) {
            packets.splice(k, 1);
            continue;
          }

          const p1 = particles[pkt.fromIdx];
          const p2 = particles[pkt.toIdx];
          if (!p1 || !p2) continue;

          const curX = p1.x + (p2.x - p1.x) * pkt.progress;
          const curY = p1.y + (p2.y - p1.y) * pkt.progress;

          ctx.beginPath();
          ctx.arc(curX, curY, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = dark ? '#FFFFFF' : '#0F172A';
          ctx.fill();
        }
      }

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse repulsion (desktop only)
        if (!isMobile) {
          const mdx = p.x - mouseX;
          const mdy = p.y - mouseY;
          const mDistSq = mdx * mdx + mdy * mdy;
          if (mDistSq < 19600 && mDistSq > 0) {
            const mDist = Math.sqrt(mDistSq);
            const force = (140 - mDist) / 140;
            p.x += (mdx / mDist) * force * 1.5;
            p.y += (mdy / mDist) * force * 1.5;
          }
        }

        p.pulsePhase += 0.02;
        const currentAlpha = p.alpha + Math.sin(p.pulsePhase) * 0.12;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = dark ? p.colorDark : p.colorLight;
        ctx.globalAlpha = Math.max(0.1, Math.min(0.85, currentAlpha));
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const rosetteStroke = isDark ? "#FFFFFF" : "#0F172A";

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#F8FAFC] dark:bg-black transition-colors duration-300">
      
      {/* Background Interactive Canvas Data Constellation */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-30 dark:opacity-35" />

      {/* Engine-Turned Guilloché Rosette (Monochrome Watermark with Scroll Parallax) */}
      <motion.div 
        style={{ rotate: rosetteRotate, y: rosetteY }}
        className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.035] pointer-events-none"
      >
        <svg className="w-[880px] h-[880px]" viewBox="0 0 400 400" fill="none">
          <circle cx="200" cy="200" r="190" stroke={rosetteStroke} strokeWidth="0.8" strokeDasharray="3 6" />
          <circle cx="200" cy="200" r="150" stroke={rosetteStroke} strokeWidth="0.8" strokeDasharray="2 4" />
          <circle cx="200" cy="200" r="110" stroke={rosetteStroke} strokeWidth="0.8" />
          <path d="M 200,50 Q 240,120 350,200 Q 240,280 200,350 Q 160,280 50,200 Q 160,120 200,50 Z" stroke={rosetteStroke} strokeWidth="0.75" />
          <path d="M 200,50 Q 240,120 350,200 Q 240,280 200,350 Q 160,280 50,200 Q 160,120 200,50 Z" stroke={rosetteStroke} strokeWidth="0.75" transform="rotate(30 200 200)" />
          <path d="M 200,50 Q 240,120 350,200 Q 240,280 200,350 Q 160,280 50,200 Q 160,120 200,50 Z" stroke={rosetteStroke} strokeWidth="0.75" transform="rotate(60 200 200)" />
          <path d="M 200,50 Q 240,120 350,200 Q 240,280 200,350 Q 160,280 50,200 Q 160,120 200,50 Z" stroke={rosetteStroke} strokeWidth="0.75" transform="rotate(90 200 200)" />
        </svg>
      </motion.div>

      {/* Subtle Specular Ambient Lighting */}
      <div 
        className="absolute inset-0 opacity-15 dark:opacity-20 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)'
            : 'radial-gradient(circle at 50% 0%, rgba(15, 23, 42, 0.03) 0%, transparent 50%)'
        }}
      />

      {/* Fine Micro Grid */}
      <div 
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px)'
            : 'linear-gradient(rgba(15, 23, 42, 0.06) 1px, transparent 1px)',
          backgroundSize: '100% 4px'
        }}
      />
    </div>
  );
};
