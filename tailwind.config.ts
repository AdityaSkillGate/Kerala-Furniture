import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0A0908",
        charcoal: "#171512",
        champagne: {
          DEFAULT: "#D8B16A",
          light: "#E5C88F",
          dark: "#B88E45",
        },
        ivory: {
          DEFAULT: "#F5F0E7",
          light: "#FCFAF6",
          dark: "#E8DFCF",
        },
        sand: {
          DEFAULT: "#D9C8AE",
          light: "#EADCC8",
          dark: "#B8A385",
        },
        walnut: {
          DEFAULT: "#67452E",
          light: "#825A3E",
          dark: "#4A311F",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.2em",
        editorial: "0.15em",
      },
      boxShadow: {
        subtle: "0 4px 20px -2px rgba(10, 9, 8, 0.05)",
        luxury: "0 20px 40px -15px rgba(10, 9, 8, 0.12)",
        gold: "0 0 25px -5px rgba(216, 177, 106, 0.25)",
      },
      animation: {
        "marquee-slow": "marquee 35s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
