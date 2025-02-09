/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '2px': '0 0 1px 2px rgba(209, 213, 219, 0.5)',
      },
    },
  },
  plugins: [],
}