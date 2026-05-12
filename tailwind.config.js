/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mx: {
          bg: "var(--mx-bg)",
          surface: "var(--mx-surface)",
          espresso: "var(--mx-espresso)",
          accent: "var(--mx-accent)",
          soft: "var(--mx-soft)",
          muted: "var(--mx-muted)",
          border: "var(--mx-border)",
          success: "var(--mx-success)",
          warning: "var(--mx-warning)",
          danger: "var(--mx-danger)",
          info: "var(--mx-info)",
        }
      },
      fontFamily: {
        sans: ['"Inter"', '"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      }
    },
  },
  plugins: [],
}
