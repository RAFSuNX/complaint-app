/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'bd-green': '#006a4e',
        'bd-red': '#f42a41',
      },
    },
  },
  plugins: [],
};