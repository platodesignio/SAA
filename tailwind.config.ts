import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        accent: {
          DEFAULT: "#2563EB",
          light: "#EFF6FF",
          muted: "#93C5FD",
        },
      },
    },
  },
  plugins: [],
};

export default config;
