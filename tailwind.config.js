/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F7F5",
        surface: "#FFFFFF",
        ink: "#14231F",
        ink2: "#5B655F",
        line: "#E4E2DC",
        focus: {
          50: "#EAF3F0",
          100: "#CFE3DC",
          300: "#7FAE9E",
          500: "#2F6F5E",
          600: "#255A4C",
          700: "#1B4438",
        },
        amber: {
          400: "#E4A15E",
          500: "#D98A3D",
          600: "#B96F27",
        },
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
}

