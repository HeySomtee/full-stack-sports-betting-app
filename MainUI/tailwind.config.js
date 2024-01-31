/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e3f2fd',
          100: '#bbdefb',
          200: '#90caf9',
          300: '#64b5f6',
          400: '#42a5f5',
          500: '#2196f3', // Primary color
          600: '#1e88e5',
          700: '#1976d2',
          800: '#144fce',
          900: '#0d47a1',
          1000: '#001F3F',
        },
      },
    },
  },
  plugins: [],
}

