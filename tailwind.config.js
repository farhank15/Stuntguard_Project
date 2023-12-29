/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0A4D9C",
        black1: "#111928",
        secondary: "#FFFFFF",
        gradiasi: ["#1892D5", "#0A4D9C"],
      },
      fontFamily: {
        poppins: "Poppins",
      },
      backgroundImage: {
        Bgcover: "url(./src/assets/hero.png)",
      },
    },
  },
  plugins: [],
};
