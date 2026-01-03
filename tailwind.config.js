/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Assuming a clean sans-serif like Estrela
      },
      colors: {
        'estrela-black': '#1a1a1a',
        'estrela-gray': '#f4f4f4',
      }
    },
  },
  plugins: [],
}