/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        neucha: ['Neucha', 'cursive'],
        galada: ['Galada', 'cursive'],


      },

    },
  },
  plugins: [],
}