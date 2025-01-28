/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: { max: "425px" },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".font-smooth": {
          "font-synthesis": "none",
          "text-rendering": "optimizeLegibility",
          "-webkit-font-smoothing": "antialiased",
          "-moz-osx-font-smoothing": "grayscale",
        },

        ".font-ring": {
          outline: "4px auto -webkit-focus-ring-color",
        },
      });
    },
    function ({ addVariant, e }) {
      addVariant("light", ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `:root.light .${e(`light${separator}${className}`)}`;
        });
      });
    },
  ],
};
