/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#030712", // Pitch dark base color
        cardDark: "#0b1021", // Deep blue-gray card background
        accentBlue: "#3b82f6", // Electric blue main accent
        accentSky: "#38bdf8", // Sky blue secondary accent
        textSecondary: "#90a3c7", // Muted blue-gray text
        borderDark: "#1e293b", // Slate border color
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Instrument Serif', 'serif'],
        heading: ['Bricolage Grotesque', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
