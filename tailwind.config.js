/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}","./public/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        'header-purple':'#6e2381',
      },
      backgroundImage: {
        'home': "url('/public/home_bg.webp')",
      },
    },
  },
  plugins: [],
}

