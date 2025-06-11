/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          richgold: ['"Richgold"', 'sans-serif'], // if you plan to reuse
        },
        colors: {
          primary: "#028b6e",
          secondary: "#02a080",
        },
      },
    },
    plugins: [],
  };
  