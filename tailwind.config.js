/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  important: true,
  corePlugins: {
    preflight: false,
  },
  content: [
    "./patterns/**/*.php",
    "./parts/**/*.html",
    "./templates/**/*.html",
    "./safelist.txt",
  ],
  theme: {
    extend: {
      colors: {
        base: "#ffffff",
        typography: "#212121",
        primary: "#00796b",
        secondary: "#ffc107",
        tertiary: "#6b0079",
        dark: "#00796b",
        light: "#b2dfdb",
      },
    },
    screens: {
      "sm": "600px",
      "md": "782px",
      "lg": "1025px",
      "xl": "1280px",
      "2xl": "1536px",
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          mbs: (value) => ({
            "--tw-mbs": value,
            "marginBlockStart": value,
          }),
        },
        {
          values: theme(`spacing`),
          supportsNegativeValues: true,
        }
      );
      matchUtilities(
        {
          mbe: (value) => ({
            "--tw-mbe": value,
            "marginBlockEnd": value,
          }),
        },
        {
          values: theme("spacing"),
          supportsNegativeValues: true,
        }
      );
    }),
  ],
};
