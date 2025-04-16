/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this path covers your component files
  ],
  theme: {
    extend: {
      // Add your colors inside this 'colors' object
      colors: {
        'night': '#0D0A0B',           // Role: base background
        'non-photo-blue': '#ACDDE7', // Role: soft contrast text, links
        'slate-blue': '#725AC1',       // Role: headers, nav, buttons
        'phosphor-green': '#39FF14',   // Role: accents, code blocks, hover glows
        'mountbatten-pink': '#9A7AA0', // Role: subtle backgrounds, card borders
      },
      // You might have other 'extend' sections like fontFamily, etc. Keep them if needed.
    },
  },
  plugins: [],
}
