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
      boxShadow: {
        'white': '0 25px 50px -12px rgba(255, 255, 255, 0.25)',
      },
    },
  },
  plugins: [],
}

