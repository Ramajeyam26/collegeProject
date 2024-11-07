/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        orange: {
          primary: "#F97244",
          secondary: "#fa9370",
          third: "#fcbfa4",
          fourth: "#fcd2c0",
        },
        blue: {
          primary: "#8336FE",
            secondary: "#c8a6ff",
          third: "#e7d9ff",
        },
        pink: {
          primary: "#dd5fab",
          secondary: "#fca7da",
        },
        darkcyan: {
          primary: "#47859A",
          secondary: "#9fe5fc",
        },
      },
      width: {
        100: "400px",
        110: "420px",
        120: "440px",
        125: "450px",
        130: "460",
      },
      height: {
        100: "400px",
        110: "420px",
        120: "440px",
        125: "450px",
        130: "460",
        135: "480",
        140: "500",
        145: "520",
      },
      rotate: {
        60: "60deg",
        55: "55deg",
        50: "50deg",
        45: "45deg",
        40: "40deg",
        35: "35deg",
        30: "30deg",
        25: "25deg",
        20: "20deg",
        15: "15deg",
      },

      margin: {
        68: "270px",
        88: "340px",
        100: "400px",
        30: "120px",
      },
      dropShadow: {
        "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
        "4xl": [
          "0 35px 35px rgba(0, 0, 0, 0.25)",
          "0 45px 65px rgba(0, 0, 0, 0.15)",
        ],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.3rem",
        "4xl": "1.7rem",
        "5xl": "2.1rem",
      },
    },
  },
  plugins: [],
};
