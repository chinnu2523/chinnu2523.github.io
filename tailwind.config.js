/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          void: '#060709',
          card: '#0D0E15',
          elevated: '#131520',
          deep: '#05070a',
          carbon: '#0b0f17',
          subsurface: '#0f172a',
          surface: '#1e293b',
          border: 'rgba(212, 175, 55, 0.18)',
          borderHover: 'rgba(212, 175, 55, 0.65)',
        },
        royal: {
          gold: '#D4AF37',
          highlight: '#FFF2B2',
          burnished: '#8C6826',
          shadow: '#4A3510',
        },
        sapphire: {
          void: '#070B19',
          enclave: '#0B132B',
          highlight: '#1C2B59',
          glow: '#1E3A8A',
        },
        seal: {
          emerald: '#0D5C3A',
          bright: '#10B981',
          subtle: 'rgba(16, 185, 129, 0.12)',
        },
        laser: {
          cyan: '#00f0ff',
          teal: '#06b6d4',
          sky: '#38bdf8',
          emerald: '#00ff9d',
          crimson: '#f43f5e',
          amber: '#f59e0b',
        }
      },
      fontFamily: {
        cinzel: ['"Cinzel"', 'serif'],
        royal: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        cursive: ['"Great Vibes"', 'cursive'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        headline: ['Space Grotesk', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      },
      animation: {
        'radar-sweep': 'radarSweep 4s linear infinite',
        'laser-scan': 'laserScan 3.5s ease-in-out infinite alternate',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'seal-spin': 'rotateSeal 40s linear infinite',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        },
        laserScan: {
          '0%': { top: '2%', opacity: '0.4' },
          '50%': { opacity: '0.95' },
          '100%': { top: '96%', opacity: '0.4' }
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'drop-shadow(0 0 15px rgba(212, 175, 55, 0.4))' },
          '50%': { opacity: '0.9', filter: 'drop-shadow(0 0 30px rgba(212, 175, 55, 0.8))' }
        },
        rotateSeal: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' }
        }
      },
      boxShadow: {
        'royal-gold': '0 0 25px rgba(212, 175, 55, 0.35)',
        'royal-seal': '0 0 25px rgba(16, 185, 129, 0.35)',
        'gilded-bezel': '0 0 0 1px rgba(212, 175, 55, 0.2), 0 1px 0 0 rgba(255, 242, 178, 0.2) inset, 0 8px 32px -4px rgba(0, 0, 0, 0.8)',
        'cyber-glass': '0 0 0 1px rgba(212, 175, 55, 0.15), 0 12px 32px -4px rgba(0, 0, 0, 0.7)'
      }
    },
  },
  plugins: [],
}
