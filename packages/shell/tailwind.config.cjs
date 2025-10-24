const path = require('path');
const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',

    path.resolve(__dirname, '../../packages/design-system/src/**/*.{js,ts,jsx,tsx}'),
    path.resolve(__dirname, '../../packages/login/src/**/*.{js,ts,jsx,tsx}'),
    path.resolve(__dirname, '../../packages/client-list/src/**/*.{js,ts,jsx,tsx}'),
    path.resolve(__dirname, '../../packages/selected-clients/src/**/*.{js,ts,jsx,tsx}')
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
