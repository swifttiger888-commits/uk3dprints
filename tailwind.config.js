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
          bg: '#FFF8F0',
          text: '#333333',
          accent: '#C48E36',
          accentHover: '#B07E2F'
        }
      }
    },
  },
  plugins: [],
}
