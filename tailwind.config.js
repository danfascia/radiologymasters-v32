const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    content: ['./src/**/*.njk', './src/**/*.html', './src/**/*.svg'],
    layers: ['components', 'utilities'],
    options: {
      safelist: ['hidden']
    }
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography')
  ],
}
