/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'fg-primary': '#000000',
        'fg-secondary': '#666666',
        'fg-tertiary': '#AAAAAA',
        'fg-disabled': '#CCCCCC',
        'fg-inverse': '#FFFFFF',
        'bg-primary': '#FFFFFF',
        'bg-secondary': '#F8F8F8',
        'bg-tertiary': '#F0F0F0',
        'bg-inverse': '#000000',
        'bg-inverse-subtle': '#111111',
        'border-strong': '#000000',
        'border-default': '#E0E0E0',
        'border-subtle': '#F0F0F0',
        'interactive-bg': '#000000',
        'interactive-bg-hover': '#222222',
        'interactive-bg-press': '#444444',
      },
      fontFamily: {
        'display': ['Sacramento', 'cursive'],
        'sans': ['DM Sans', 'sans-serif'],
        'mono': ['DM Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
