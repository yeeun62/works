module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        md: { max: "768px" },
        sm: { max: "500px" },
        lg: { min: "768px" },
      },
      colors: {
        blue: "#00adc7",
      },
      minWidth: {
        mobile: "320px",
      },
    },
  },
  plugins: [],
};
