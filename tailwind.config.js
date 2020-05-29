/*
 ** TailwindCSS Configuration File
 **
 ** Docs: https://tailwindcss.com/docs/configuration
 ** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */

module.exports = {
  theme: {
    spinner: (theme) => ({
      default: {
        color: theme('colors.white'),
        size: '1em',
        border: '2px',
        speed: '500ms'
      }
    })
  },
  variants: {
    display: ['responsive', 'group-hover'],
    opacity: ['disabled'],
    backgroundColor: ['disabled', 'hover'],
    textColor: ['responsive', 'hover'],
    cursor: ['disabled', 'hover'],
    spinner: ['responsive']
  },
  plugins: [require('tailwindcss-spinner')()]
}
