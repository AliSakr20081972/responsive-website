module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    maxWidth: {
      "screen-sm": "425px",
      "screen-md": "768px",
      "screen-lg": "1024px",
      "screen-xl": "1280px",
    },
    extend: {
      fontFamily: {
        arabic: ["Tajawal", "sans-serif"],
      },
      direction: {
        rtl: "rtl",
      },
    },
  },
  plugins: [],
};
