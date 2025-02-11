import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#66328D', 
        secondary: '#96378C',
        lightPurple: '#E5D7EF',
        darkGrey: '#777777',
        grey: '#555555',
        lightGrey: '#D9D9D9',
        background: "#F6F6F6",
      },
      boxShadow: {
        custom: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
} satisfies Config;
