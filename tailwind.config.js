/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/public/**/*.{html,js}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
