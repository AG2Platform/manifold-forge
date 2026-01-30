/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: [
        'SF Pro Display',
        'SF Pro Text',
        'ui-sans-serif',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'sans-serif',
      ],
    },
    extend: {
      colors: {
        background: '#f6f7f9', // Soft Apple-like gray
        surface: '#ffffff',
        border: '#e5e7eb',
        accent: '#b6e0fe', // Muted blue accent
        accentGlow: '#dbeafe',
      },
      boxShadow: {
        glass: '0 4px 32px 0 rgba(60,60,60,0.08)',
        glow: '0 0 16px 0 rgba(182,224,254,0.5)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(182,224,254,0.15)' },
          '100%': { boxShadow: '0 0 32px rgba(182,224,254,0.35)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
