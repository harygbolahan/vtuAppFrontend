/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"], // Allows dark mode based on a class
  content: [
    "./index.html", // Include index.html
    "./src/**/*.{js,ts,jsx,tsx}", // Include all JS/TS/JSX/TSX files in src folder
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)", // Customizable radius variable
        md: "calc(var(--radius) - 2px)", // Derived from lg
        sm: "calc(var(--radius) - 4px)", // Derived from lg
      },
      colors: {
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))", // Sidebar background color
          foreground: "hsl(var(--sidebar-foreground))", // Sidebar foreground color
          primary: "hsl(var(--sidebar-primary))", // Primary sidebar color
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))", // Foreground of primary
          accent: "hsl(var(--sidebar-accent))", // Accent color
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))", // Foreground of accent
          border: "hsl(var(--sidebar-border))", // Sidebar border color
          ring: "hsl(var(--sidebar-ring))", // Sidebar ring color
        },
      },
    },
  },
  plugins: [tailwindcssAnimate], // TailwindCSS Animate plugin
};
