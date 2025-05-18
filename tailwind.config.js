/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          400: '#3dd5f3',
          500: '#00b3d7',
        },
        blue: {
          600: '#3b82f6',
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}
