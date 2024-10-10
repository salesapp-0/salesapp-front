/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#8280FF',
        secondary: '#FEC53D',
        success: '#00974F',
        error: '#FF9871',
        alert: '#F93C65',
        backgroundLight: '#E4E4FF',
        backgroundMedium: '#FEF2D6',
        backgroundDark: '#D2FDE6',
        textLight: '#FFDED2',
        textMedium: '#FFC9D7',
        accent: '#02B7FA',
        accentLight: '#E0F3FA',
        dark: '#03161D',
        muted: '#5B757E',
        border: '#78939E',
        card: '#A4B4BB',
        overlay: '#C8CFCE',
        grayLight: '#F7F7F7',
        grayMedium: '#FBFBFB',
        white: '#FFFFFF',
        grayToolTip:'#4F6A74',
        gray:'#E2E8F0'
      },
    },
  },
  plugins: [],
}