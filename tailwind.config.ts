import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Midnight luxury teal — deep ocean at dusk (#0B2224)
        teal: {
          950: "#0B2224",
          900: "#123638",
          800: "#17423F",
          700: "#1F4D4F",
          600: "#2C6360",
        },
        forest: {
          950: "#1B431D",
          900: "#16381C",
          800: "#23491E",
          700: "#2D5E30",
          600: "#38703C",
        },
        gold: {
          300: "#F0C875",
          400: "#C4A55A",
          500: "#A9873F",
          600: "#8B6E30",
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
          400: "#C4A55A",
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
          600: "#3D4E49",
          500: "#57645F",
          400: "#748078",
          300: "#8C968F",
        },
      },
      fontFamily: {
        // Cormorant Garamond — ultra-luxury editorial serif
        display: ["var(--font-display)", "\"Cormorant Garamond\"", "Georgia", "serif"],
        // Inter — premium, neutral body type
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        // Cinzel — Roman imperial label caps (eyebrows, nav, badges)
        label: ["var(--font-label)", "Cinzel", "Georgia", "serif"],
        // Keep mono alias for backward-compat — maps to label (Cinzel)
        mono: ["var(--font-label)", "Cinzel", "Georgia", "serif"],
      },
      letterSpacing: {
        // Label tracking — Cinzel needs wide tracking
        wideish: "0.12em",
        wider2: "0.20em",
        widest2: "0.28em",
      },
      maxWidth: {
        content: "1200px",
      },
      boxShadow: {
        card: "0 24px 48px -24px rgba(11, 34, 36, 0.30)",
        "card-lg": "0 40px 80px -32px rgba(11, 34, 36, 0.45)",
      },
      fontSize: {
        // Fluid display sizes
        "display-xl": ["clamp(3.5rem, 8vw, 6.5rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(2.5rem, 5vw, 4.5rem)", { lineHeight: "1.06", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.8rem, 3vw, 2.8rem)", { lineHeight: "1.12", letterSpacing: "-0.015em" }],
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
