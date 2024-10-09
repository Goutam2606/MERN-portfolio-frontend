/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#000000",
        "secondary": "#21E6C1",
        "tertiary": "#4477CE",
        "quaternary": "#ededed",

      }

    },
    screens: {
      lg: { max: "1023px" },
      sm: { max: "639px" },
    }

  },
  plugins: [],
};