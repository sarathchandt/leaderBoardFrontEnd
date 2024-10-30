/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './src/pages/**/*.{html,js}',
    './src/components/**/*.{html,js}',
  ],
  theme: {
    extend: {
      colors:{
        whiteV1:'#4c4c4c'
      }
    },
  
  },
  plugins: [],
}

