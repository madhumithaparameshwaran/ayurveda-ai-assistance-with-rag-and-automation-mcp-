/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gov: {
          950: '#04101e',
          900: '#0a2342',
          850: '#0e2f56',
          800: '#133c70',
          700: '#1a4e91',
          600: '#2563eb',
          100: '#e0edfd',
          50: '#f0f6ff'
        },
        ayur: {
          900: '#14532d',
          800: '#166534',
          700: '#15803d',
          600: '#16a34a',
          500: '#22c55e',
          200: '#bbf7d0',
          100: '#dcfce7',
          50: '#f0fdf4'
        },
        gold: {
          800: '#92400e',
          700: '#b45309',
          600: '#d97706',
          500: '#f59e0b',
          100: '#fef3c7',
          50: '#fffbeb'
        }
      },
      fontFamily: {
        sans: ['Segoe UI', 'Roboto', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'serif']
      }
    },
  },
  plugins: [],
}
