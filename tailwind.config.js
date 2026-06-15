/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0A0A0A',        // near-black
          surface: '#1A1A1A',   // card backgrounds
          text: '#E5E5E5',      // off-white
          textMuted: '#888888', // secondary text
          accent: '#00FF88',    // neon green — gaming vibe
          accentHover: '#00CC66',
          border: '#2A2A2A',    // subtle borders
        }
      }
    },
  },
  plugins: [],
}
