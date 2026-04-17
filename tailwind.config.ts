import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        earth: {
          50: "#fdfcfb",
          100: "#f7f3f0",
          200: "#eee5df",
          300: "#e0d1c7",
          400: "#c9b2a3",
          500: "#b1927f",
          600: "#9e7d6a",
          700: "#846758",
          800: "#6d564a",
          900: "#5a483e",
          950: "#302621",
        },
        accent: {
          orange: "#f27d26",
          "orange-soft": "#f7a156",
          "orange-deep": "#c9621a",
          green: "#5a5a40",
          "green-deep": "#3d3d2a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-sm": ["clamp(2.5rem, 5vw, 4rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(3rem, 7vw, 5.5rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "display-lg": ["clamp(3.5rem, 9vw, 7.5rem)", { lineHeight: "0.98", letterSpacing: "-0.03em" }],
        "display-xl": ["clamp(4rem, 12vw, 10rem)", { lineHeight: "0.95", letterSpacing: "-0.035em" }],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "3rem",
      },
      boxShadow: {
        "soft-xl": "0 20px 60px -20px rgba(48, 38, 33, 0.25)",
        "soft-2xl": "0 30px 90px -30px rgba(48, 38, 33, 0.35)",
        warm: "0 10px 40px -10px rgba(242, 125, 38, 0.3)",
        "warm-lg": "0 20px 60px -15px rgba(242, 125, 38, 0.4)",
      },
      backgroundImage: {
        "gradient-warm": "linear-gradient(135deg, #f27d26 0%, #c9621a 100%)",
        "gradient-earth":
          "linear-gradient(180deg, rgba(48,38,33,0) 0%, rgba(48,38,33,0.85) 100%)",
        grain:
          "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3CfeColorMatrix values='0 0 0 0 0.19 0 0 0 0 0.15 0 0 0 0 0.13 0 0 0 0.12 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
      animation: {
        "fade-up": "fade-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 1.2s cubic-bezier(0.22, 1, 0.36, 1) both",
        "scale-in": "scale-in 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "marquee-slow": "marquee 40s linear infinite",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
