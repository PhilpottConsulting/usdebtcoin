// tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#0e1117',
        primary: '#00FFC2',
        accent: '#FFD166',
        text: '#f1f1f1',
        muted: '#8899a6',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
