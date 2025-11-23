/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#7C3AED",
          DEFAULT: "#5D3FD3",
          dark: "#7C3AED",
        },
        "background-light": "#FFFBFE",
        "background-dark": "#0F0F1A",
        "text-light": "#1E1E2E",
        "text-dark": "#E2E8F0",
        accent: "#A78BFA",
        "surface-light": "rgba(255, 255, 255, 0.5)",
        "surface-dark": "rgba(30, 30, 46, 0.5)",
        "border-light": "rgba(30, 30, 46, 0.1)",
        "border-dark": "rgba(226, 232, 240, 0.1)",
      },
      fontFamily: {
        display: ["Vazirmatn", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
        "2xl": "1.25rem",
        full: "9999px",
      },
      boxShadow: {
        glow: "0 0 20px 0 rgba(124, 58, 237, 0.3)",
        soft: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
