/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./docs/**/*.{html,js}", "node_modules/preline/dist/*.js", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        huruf: ["Kanit", "sans-serif"],
      },
    },
  },
  plugins: [require("preline/plugin"), require("flowbite/plugin")],
};
