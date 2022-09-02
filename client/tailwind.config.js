/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,css}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        'fill-20':'repeat(auto-fill, minmax(210px, 1fr))'
      }
    },
  },
  plugins: [],
}
