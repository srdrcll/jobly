/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        // Premium Obsidian & Surface Palette
        obsidian: {
          950: '#06090F',
          900: '#0B0F17',
          850: '#0E131F',
          800: '#13192B',
          700: '#1C243B',
          600: '#28334E',
        },
        // Application Status Colors with enhanced vibrancy
        status: {
          saved: {
            bg: 'rgba(148, 163, 184, 0.12)',
            text: '#94a3b8',
            border: 'rgba(148, 163, 184, 0.3)',
          },
          applied: {
            bg: 'rgba(59, 130, 246, 0.12)',
            text: '#60a5fa',
            border: 'rgba(59, 130, 246, 0.3)',
          },
          interview: {
            bg: 'rgba(139, 92, 246, 0.12)',
            text: '#a78bfa',
            border: 'rgba(139, 92, 246, 0.3)',
          },
          case_study: {
            bg: 'rgba(6, 182, 212, 0.12)',
            text: '#22d3ee',
            border: 'rgba(6, 182, 212, 0.3)',
          },
          offer: {
            bg: 'rgba(16, 185, 129, 0.12)',
            text: '#34d399',
            border: 'rgba(16, 185, 129, 0.3)',
          },
          rejected: {
            bg: 'rgba(244, 63, 94, 0.12)',
            text: '#fb7185',
            border: 'rgba(244, 63, 94, 0.3)',
          },
        },
      },
      borderRadius: {
        '4xl': '2rem',
        '3xl': '1.5rem',
        '2xl': '1rem',
        xl: '0.75rem',
        lg: '0.5rem',
        md: '0.375rem',
      },
      boxShadow: {
        glow: '0 0 25px -5px rgba(59, 130, 246, 0.35)',
        'glow-purple': '0 0 25px -5px rgba(147, 51, 234, 0.35)',
        'glow-emerald': '0 0 25px -5px rgba(16, 185, 129, 0.35)',
        'glow-amber': '0 0 25px -5px rgba(245, 158, 11, 0.35)',
        soft: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'soft-dark': '0 8px 32px -4px rgba(0, 0, 0, 0.45)',
        'card-hover': '0 12px 36px -6px rgba(0, 0, 0, 0.12)',
        'card-hover-dark': '0 12px 36px -6px rgba(0, 0, 0, 0.6)',
        'ambient': '0 0 50px -10px rgba(59, 130, 246, 0.15)',
      },
      animation: {
        shimmer: 'shimmer 2.5s infinite linear',
        fadeIn: 'fadeIn 0.25s ease-in-out forwards',
        slideUp: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
    },
  },
  plugins: [],
};
