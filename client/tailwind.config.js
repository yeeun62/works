module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        md: { max: "768px" },
        sm: { max: "500px" },
        lg: { min: "768px" },
        ml: { max: "1300px", min: "500px" },
      },
      colors: {
        blue: "#00adc7",
        yellowGreen: "#e0de1b",
        deepGray: "#282828",
        lightGray: "#ddd",
      },
      minWidth: {
        mobile: "320px",
      },
      lineHeight: {
        20: "1.5rem",
        10: "2.5rem",
      },
      flex: {
        2: "1 1 40%", //2단
        3: "1 1 30%", //3단
      },
    },
  },
  plugins: [],
};
