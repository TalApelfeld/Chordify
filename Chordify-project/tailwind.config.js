/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      "2xl": { max: "1535px" },
      // => @media (max-width: 1535px) { ... }
      "1xl": { max: "1550px" },

      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "767px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
    },
    extend: {
      colors: {
        "background-black": "#030508",
        "text-homepage": "#ffffff",
        "background-grey": "#292f3d",
      },
      spacing: {
        "middleContent-big-space": "0.875rem",
        "middleContent-small-space": "0.875rem",
      },
      fontSize: {
        // "sidebar-buttons":
        "middle-small-heading": "1.25rem",
      },
      fontWeight: {},
    },
  },
  plugins: [],
};
