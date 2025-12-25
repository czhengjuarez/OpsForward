/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8F1F57',
          50: '#fdf2f7',
          100: '#fce7f0',
          200: '#fad1e3',
          300: '#f5a8ca',
          400: '#ee74a7',
          500: '#e34584',
          600: '#c92d6a',
          700: '#8F1F57',
          800: '#751a48',
          900: '#5f173c',
          950: '#3a0d23',
        }
      }
    },
  },
  plugins: [],
}
