/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': '#FFFFFF',
        'black': '#19181A',
        'blue': '#0067FF',
        'blue-sky': '#BCD7FF',
        'blue-ice': '#F5F8FF',
        'ice': '#F4F6F8',
        'platinum': '#E3E3E3',
        'grey': '#969597',
        'black-olive': '#3B3A3B',
  
      },
    },
  },
  plugins: [],
}

