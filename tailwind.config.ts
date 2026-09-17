import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        azure: {
          50: "#EAF6FD",
          100: "#CBE9F9",
          200: "#9AD5F3",
          300: "#63BEEA",
          400: "#2BA8E0",
          500: "#1A8CC4",
          600: "#0E5A9B",
          700: "#0A447A",
          800: "#072F55",
          900: "#041D35",
        },
        ink: {
          DEFAULT: "#14161A",
          soft: "#1C2027",
          line: "#262A31",
          mute: "#6B747E",
          dim: "#9AA4B0",
        },
        paper: {
          DEFAULT: "#F4F7FA",
          edge: "#E1E7ED",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: { shell: "1240px" },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        rise: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        rise: "rise .6s cubic-bezier(.16,1,.3,1) both",
      },
    },
  },
  plugins: [],
};
export default config;
