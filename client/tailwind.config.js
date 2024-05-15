/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'customBlue': '#1679AB',
        'customDarkblue': '#074173'
      },
    },
  },
  plugins: [],
}