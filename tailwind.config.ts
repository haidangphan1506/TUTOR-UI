import type { Config } from "tailwindcss";

/**
 * Tailwind v4: theme tokens live in `app/globals.css` (`@theme inline`, CSS variables).
 * This file defines content paths for class scanning and editor tooling.
 */
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
};

export default config;
