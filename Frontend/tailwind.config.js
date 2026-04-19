/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary-fixed": "#d7e2ff",
        "surface-tint": "#255dad",
        "on-error-container": "#93000a",
        "on-secondary-fixed": "#001e2f",
        "surface-variant": "#d9e2ff",
        "surface-container-high": "#e1e7ff",
        "secondary-fixed": "#c9e6ff",
        "on-secondary": "#ffffff",
        "surface-container-highest": "#d9e2ff",
        "on-primary-container": "#9bbdff",
        "outline-variant": "#c2c6d3",
        "secondary-fixed-dim": "#8aceff",
        "on-primary": "#ffffff",
        "outline": "#737783",
        "background": "#faf8ff",
        "tertiary-fixed": "#ffdf9f",
        "surface-container-lowest": "#ffffff",
        "on-primary-fixed": "#001b3f",
        "on-secondary-container": "#004a6c",
        "inverse-primary": "#abc7ff",
        "primary": "#00346f",
        "on-tertiary": "#ffffff",
        "on-primary-fixed-variant": "#00458f",
        "on-surface": "#001945",
        "error": "#ba1a1a",
        "surface-container-low": "#f2f3ff",
        "primary-fixed-dim": "#abc7ff",
        "inverse-on-surface": "#eef0ff",
        "surface-container": "#eaedff",
        "on-surface-variant": "#424751",
        "error-container": "#ffdad6",
        "on-secondary-fixed-variant": "#004c6e",
        "secondary": "#006491",
        "secondary-container": "#4fbdff",
        "surface-dim": "#cdd9ff",
        "on-tertiary-fixed": "#261a00",
        "tertiary-container": "#624800",
        "on-tertiary-container": "#efb309",
        "on-background": "#001945",
        "surface-bright": "#faf8ff",
        "tertiary": "#463200",
        "on-error": "#ffffff",
        "on-tertiary-fixed-variant": "#5c4300",
        "inverse-surface": "#002c6f",
        "tertiary-fixed-dim": "#fabd1b",
        "primary-container": "#004a99",
        "surface": "#faf8ff"
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      },
      fontFamily: {
        headline: ["Manrope"],
        body: ["Inter"],
        label: ["Inter"]
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}