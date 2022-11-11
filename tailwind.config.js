/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/views/landing.ejs"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Roboto', 'sans-serif'],
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
}
