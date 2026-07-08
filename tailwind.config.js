/** ==========================================================================
 * tailwind.config.js
 * Design token system for the Prakriti Homeopathy platform.
 * ========================================================================== */

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      xs: "420px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2E8B57",
          50: "#EAF6EF",
          100: "#D2ECDD",
          200: "#A6D9BC",
          300: "#79C69A",
          400: "#4FAF73",
          500: "#2E8B57",
          600: "#256F46",
          700: "#1D5636",
          800: "#153D26",
          900: "#0D2517",
          950: "#081C10",
        },
        secondary: {
          DEFAULT: "#4FAF73",
          50: "#EEF9F1",
          100: "#DBF2E1",
          200: "#B7E4C7",
          300: "#93D6AD",
          400: "#6FC490",
          500: "#4FAF73",
          600: "#3E8C5C",
          700: "#2F6945",
          800: "#20462E",
          900: "#112317",
        },
        accent: {
          DEFAULT: "#B7E4C7",
          light: "#DCF2E3",
          dark: "#8FCBA6",
        },
        clinical: {
          ivory: "#F8FCFA",
          surface: "#FFFFFF",
          "surface-dark": "#141F19",
          "background-dark": "#0F1712",
        },
        text: {
          primary: "#1F2937",
          secondary: "#6B7280",
          "primary-dark": "#F3F6F4",
          "secondary-dark": "#9CA9A2",
        },
        /* Apothecary ink — deep botanical panel used for the hero and other
           high-contrast "specimen label" surfaces. */
        ink: {
          DEFAULT: "#16241D",
          50: "#EDEFEC",
          100: "#D6DBD3",
          200: "#A9B6AE",
          300: "#71897C",
          400: "#3A5847",
          500: "#233A2C",
          600: "#1C3024",
          700: "#16241D",
          800: "#111C16",
          900: "#0B1310",
          950: "#070D0A",
        },
        /* Tincture gold — the single warm accent, evoking the amber glass of
           a remedy bottle and the ink of an apothecary ledger. */
        gold: {
          DEFAULT: "#C9A15A",
          50: "#FBF6EB",
          100: "#F3E6C7",
          200: "#E7CD94",
          300: "#DABA6E",
          400: "#C9A15A",
          500: "#B78A3E",
          600: "#976F2F",
          700: "#785624",
          800: "#573E19",
        },
      },
      fontFamily: {
        serif: ["Fraunces", "Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "SF Pro Display", "system-ui", "sans-serif"],
        mono: ["\"IBM Plex Mono\"", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      fontSize: {
        "display-xl": ["4.5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["3.5rem", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-md": ["2.75rem", { lineHeight: "1.12", letterSpacing: "-0.01em" }],
        "display-sm": ["2.125rem", { lineHeight: "1.18", letterSpacing: "-0.01em" }],
        "display-xs": ["1.75rem", { lineHeight: "1.22", letterSpacing: "-0.005em" }],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        "ambient-sm": "0 2px 8px -2px rgba(15, 23, 18, 0.06), 0 1px 2px -1px rgba(15, 23, 18, 0.04)",
        ambient: "0 8px 30px -8px rgba(15, 23, 18, 0.10), 0 2px 8px -2px rgba(15, 23, 18, 0.06)",
        "ambient-lg": "0 24px 60px -12px rgba(15, 23, 18, 0.16), 0 8px 20px -6px rgba(15, 23, 18, 0.08)",
        "ambient-glow": "0 0 0 1px rgba(46, 139, 87, 0.08), 0 12px 40px -8px rgba(46, 139, 87, 0.22)",
        "inner-soft": "inset 0 1px 2px 0 rgba(15, 23, 18, 0.05)",
        glass: "0 8px 32px 0 rgba(15, 23, 18, 0.10)",
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        "spring-soft": "cubic-bezier(0.22, 1, 0.36, 1)",
        "ease-premium": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        "gentle-float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "ripple-out": {
          "0%": { transform: "scale(0)", opacity: "0.45" },
          "100%": { transform: "scale(2.5)", opacity: "0" },
        },
        "progress-fill": {
          "0%": { width: "0%" },
          "100%": { width: "var(--progress-value, 100%)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s var(--ease-premium, ease) forwards",
        "fade-in-up": "fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "scale-in": "scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        shimmer: "shimmer 2s linear infinite",
        "gentle-float": "gentle-float 6s ease-in-out infinite",
        "ripple-out": "ripple-out 0.6s ease-out forwards",
        "progress-fill": "progress-fill 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "spin-slow": "spin 60s linear infinite",
        "spin-slower": "spin 90s linear infinite reverse",
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      maxWidth: {
        "8xl": "90rem",
      },
    },
  },
  plugins: [],
};
