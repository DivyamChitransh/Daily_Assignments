/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'rick-green': '#3FE77B',
        'portal-blue': '#2196F3',
        'morty-yellow': '#FFD700',
        'pickle-green': '#45BF55',
      },
      animation: {
        'portal-pulse': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      boxShadow: {
        'portal': '0 0 15px rgba(63, 231, 123, 0.5)',
      },
    },
  },
  plugins: [],
};