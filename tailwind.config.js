/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // Assuming a clean sans-serif like Estrela
      },
      colors: {
        brand: {
          pink: "#ff2bf9", // Neon Pink
          dark: "#1d1d1d", // Primary Dark Background
          black: "#0f0f0f", // Deep Black
          gray: "#2a2a2a", // Secondary Dark
          violet: "#8b5cf6", // Subtle Violet
          light: "#e4e4e7", // Off-white text
        },
      },
    },
  },
  plugins: [],
};
