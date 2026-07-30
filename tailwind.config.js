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
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
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
        // Application Status Colors
        status: {
          saved: {
            bg: 'rgba(148, 163, 184, 0.1)',
            text: '#94a3b8',
            border: 'rgba(148, 163, 184, 0.25)',
          },
          applied: {
            bg: 'rgba(59, 130, 246, 0.1)',
            text: '#60a5fa',
            border: 'rgba(59, 130, 246, 0.25)',
          },
          interview: {
            bg: 'rgba(168, 85, 247, 0.1)',
            text: '#c084fc',
            border: 'rgba(168, 85, 247, 0.25)',
          },
          case_study: {
            bg: 'rgba(6, 182, 212, 0.1)',
            text: '#22d3ee',
            border: 'rgba(6, 182, 212, 0.25)',
          },
          offer: {
            bg: 'rgba(16, 185, 129, 0.1)',
            text: '#34d399',
            border: 'rgba(16, 185, 129, 0.25)',
          },
          rejected: {
            bg: 'rgba(244, 63, 94, 0.1)',
            text: '#fb7185',
            border: 'rgba(244, 63, 94, 0.25)',
          },
        },
      },
      borderRadius: {
        '3xl': '1.5rem',
        '2xl': '1rem',
        xl: '0.75rem',
        lg: '0.5rem',
        md: '0.375rem',
      },
      boxShadow: {
        glow: '0 0 20px -5px rgba(99, 102, 241, 0.3)',
        'glow-emerald': '0 0 20px -5px rgba(16, 185, 129, 0.3)',
        soft: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'soft-dark': '0 4px 25px -2px rgba(0, 0, 0, 0.3)',
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
        fadeIn: 'fadeIn 0.2s ease-in-out forwards',
        slideUp: 'slideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
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
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
