import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))", 
        "dark-card-grad":'radial-gradient(291.73% 50.22% at 2.46% 8.98%, rgba(24, 44, 69, 0.672) 0%, rgba(24, 44, 69, 0.96) 100%)'
      },
    },
  },
  plugins: [],
};
export default config;
