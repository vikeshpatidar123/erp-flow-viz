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
        brand: {
          900: "#0d3b42",
          800: "#1B555F",
          700: "#1F5C63",
          600: "#236b73",
          500: "#2a8291",
          400: "#3ea8ba",
          300: "#6ec5d3",
          200: "#a8dde6",
          100: "#d6f0f4",
        },
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "flow": "flow 2s ease-in-out infinite",
      },
      keyframes: {
        flow: {
          "0%, 100%": { opacity: "0.3", transform: "translateX(0)" },
          "50%": { opacity: "1", transform: "translateX(4px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
