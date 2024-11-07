/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          primary: "#8336FE",
          secondary: "#c8a6ff",
          third: "#e9defa",
          fourth: "#f9f5ff",
          dark:"#605670"
        },
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        oswald: ["Oswald", "sans-serif"],
        trebuchet:["Trebuchet","sans-serif"]
      },
      boxShadow:{
           new: ' inset 3px 3px 20px 5px rgb(0 0 0 / 0.05)'
}
    },
  },
  plugins: [],
};
