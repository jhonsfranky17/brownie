/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: {},
      },
    },
    fontFamily: {
      redhat: ["Red Hat Display", "sans-serif"],
      shadowsintolight: ["Shadows Into Light", "cursive"],
      antonsc: ["Anton SC", "sans-serif"],
      pacifico: ["Pacifico", "cursive"],
    },
  },
  plugins: [],
};
