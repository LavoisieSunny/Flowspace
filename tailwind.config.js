/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF9F5",      // Manila Card background
        surface: "#FFFFFF",    // White sheet
        ink: "#1C1C1A",        // Graphite pencil
        ink2: "#60605B",       // Muted pencil
        line: "#E5E3D8",       // Ruler divider
        highlighter: "#FEF08A", // Neon highlight yellow
      },
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Outfit", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        xl2: "0.75rem",
      },
    },
  },
  plugins: [],
}

