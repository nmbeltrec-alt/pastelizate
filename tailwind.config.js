/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        vino: {
          50: '#fbf2f3',
          100: '#f3dee1',
          400: '#a5445a',
          600: '#7a1f30',
          700: '#5c1523',
          900: '#3a0d16',
        },
        marino: {
          600: '#0b2545',
          700: '#081c37',
          900: '#051327',
        },
        dorado: {
          300: '#f1cf7a',
          400: '#e6b94f',
          500: '#d4a02e',
        },
        crema: {
          50: '#fdfaf3',
          100: '#f8efdc',
          200: '#f0e0c0',
        },
      },
      fontFamily: {
        display: ['Georgia', 'ui-serif', 'serif'],
      },
      boxShadow: {
        card: '0 10px 30px -10px rgba(58, 13, 22, 0.25)',
      },
      borderRadius: {
        blob: '42% 58% 55% 45% / 45% 45% 55% 55%',
      },
    },
  },
  plugins: [],
};
