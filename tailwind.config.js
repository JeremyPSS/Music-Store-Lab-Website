/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '0 35px 35px rgba(255, 255, 255, 1)',
        '4xl': [
            '0 35px 35px rgba(255, 255, 255, 1)',
            '0 45px 65px rgba(255, 255, 255, 1)'
        ]
      }
    },
  },
  plugins: [],
}