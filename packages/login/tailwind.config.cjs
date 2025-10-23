/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      path.join(__dirname, "../design-system/src/**/*.{js,ts,jsx,tsx}")
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };