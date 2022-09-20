/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,css}"],
  theme: {
    extend: {
      colors: {
        'cyan': '#21FDDC',
      },
      gridTemplateColumns: {
        'layout': '100px minmax(900px, 1fr) 100px',
      }
    },
  },
  plugins: [],
}
