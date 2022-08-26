/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'SFProText-100': 'SFProText-100',
        'SFProText-200': 'SFProText-200',
        'SFProText-300': 'SFProText-300',
        'SFProText-400': 'SFProText-400',
        'SFProText-500': 'SFProText-500',
        'SFProText-600': 'SFProText-600',
        'SFProText-700': 'SFProText-700',
        'SFProText-800': 'SFProText-800',
        'SFProText-900': 'SFProText-900',
      },
    },
  },
  plugins: [],
}
