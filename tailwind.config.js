/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{vue,js,ts}',
    './pages/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        sinewsSans: ['"Sinews Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}

