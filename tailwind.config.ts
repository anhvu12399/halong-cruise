import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Midnight teal — deep water at dusk
        teal: {
          950: "#0B2224",
          900: "#123638",
          800: "#17423F",
          700: "#1F4D4F",
          600: "#2C6360",
        },
        // Warm terracotta — junk-sail brick, lacquer trim
        terracotta: {
          50: "#FBEEE6",
          400: "#D07F51",
          500: "#B85C34",
          600: "#9C4826",
          700: "#7C381D",
        },
        // Aged brass — deck fittings, lantern light
        brass: {
          300: "#D9BE85",
          500: "#A9873F",
          600: "#8B6E30",
        },
        // Sand — limestone, sail canvas
        sand: {
          50: "#F6F1E4",
          100: "#EFE6D0",
          200: "#E4D6B6",
        },
        ink: {
          900: "#161F1D",
          700: "#2B3733",
          500: "#57645F",
          300: "#8C968F",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        wideish: "0.08em",
        wider2: "0.16em",
      },
      maxWidth: {
        content: "1180px",
      },
      boxShadow: {
        card: "0 24px 48px -24px rgba(11, 34, 36, 0.35)",
      },
    },
  },
  plugins: [],
};
export default config;
