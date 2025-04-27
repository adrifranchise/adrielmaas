// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // scan your React files
  ],
  theme: {
    screens: {
      sm: '640px',  // nav → hamburger
      md: '768px',  // two-col grids
      lg: '1024px',
    },
    extend: {
      colors: {
        night: '#0D0A0B',            // base background
        'non-photo-blue': '#ACDDE7', // soft contrast text, links
        'slate-blue': '#725AC1',     // headers, nav, buttons
        'phosphor-green': '#39FF14', // accents, hover glows
        'mountbatten-pink': '#9A7AA0',// subtle backgrounds, card borders
      },
    },
  },
  plugins: [],
}

