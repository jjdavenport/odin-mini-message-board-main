/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.ejs", "./public/**/*.html"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["rubik", "sans-serif"],
      },
    },
    plugins: [],
  },
};
