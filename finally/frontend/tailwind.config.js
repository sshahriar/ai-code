/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0d1117',
        card: '#1a1a2e',
        'card-header': '#141428',
        'muted-border': '#2a2d3d',
        accent: {
          yellow: '#ecad0a',
          blue: '#209dd7',
          purple: '#753991',
        },
        terminal: {
          green: '#00c805',
          red: '#ff3b30',
          muted: '#8b949e',
          text: '#c9d1d9',
        },
      },
      fontFamily: {
        mono: ['Fira Code', 'Consolas', 'Monaco', 'Courier New', 'monospace'],
      },
      keyframes: {
        'flash-green': {
          '0%': { backgroundColor: 'rgba(0, 200, 5, 0.45)', color: '#ffffff' },
          '100%': { backgroundColor: 'transparent' },
        },
        'flash-red': {
          '0%': { backgroundColor: 'rgba(255, 59, 48, 0.45)', color: '#ffffff' },
          '100%': { backgroundColor: 'transparent' },
        },
      },
      animation: {
        'flash-green': 'flash-green 500ms ease-out forwards',
        'flash-red': 'flash-red 500ms ease-out forwards',
      },
    },
  },
  plugins: [],
};
