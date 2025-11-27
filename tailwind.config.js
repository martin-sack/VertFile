/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/renderer/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0b0d10',
          card: '#13151a',
          border: '#1f2128',
        },
        neon: {
          blue: '#2acbff',
          purple: '#9f57ff',
          cyan: '#61eaff',
          pink: '#ff3dbd',
        },
      },
      backgroundImage: {
        'neon-gradient': 'linear-gradient(135deg, rgba(42, 203, 255, 0.1), rgba(159, 87, 255, 0.1))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))',
      },
      boxShadow: {
        'neon-blue': '0 0 20px rgba(42, 203, 255, 0.3)',
        'neon-purple': '0 0 20px rgba(159, 87, 255, 0.3)',
        'neon-glow': '0 0 40px rgba(120, 0, 255, 0.25)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backdropBlur: {
        'glass': '20px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
}
