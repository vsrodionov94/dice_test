/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        stake: {
          dark: '#1a1f2e',
          darker: '#0d1117',
          accent: '#00e701',
          win: '#00e701',
          lose: '#ed4163',
          gray: '#2f4553',
          light: '#b1bad3',
          hot: '#ed4163',
          cold: '#3b82f6',
          muted: '#6b7280'
        }
      }
    },
  },
  plugins: [],
}
