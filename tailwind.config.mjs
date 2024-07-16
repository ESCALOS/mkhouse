/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme";
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: {
          100: "#e3eddb",
          200: "#c7dab7",
          300: "#aac894",
          400: "#8eb570",
          500: "#72a34c",
          600: "#5b823d",
          700: "#44622e",
          800: "#2e411e",
          900: "#17210f",
        },
        secondary: {
          100: "#e1f2f0",
          200: "#c2e4e0",
          300: "#a4d7d1",
          400: "#85c9c1",
          500: "#67bcb2",
          600: "#52968e",
          700: "#3e716b",
          800: "#294b47",
          900: "#152624",
        },
      },
    },
  },
  plugins: [],
};
