/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: '#0A0A0B',
        amber: '#FFB000',
        'terminal-green': '#32CD32',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        michroma: ['Michroma', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
