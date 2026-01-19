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
          dark: '#0f212e',
          darker: '#071824',
          accent: '#00e701',
          win: '#00e701',
          lose: '#ed4163',
          gray: '#2f4553',
          light: '#b1bad3'
        }
      }
    },
  },
  plugins: [],
}
