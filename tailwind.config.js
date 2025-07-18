/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",  // scan all JS, JSX, TS, TSX files inside src
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}

