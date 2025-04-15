/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'primary': '#a7c957',   // Olive green
        'secondary': '#f2e8cf', // Light beige
        'accent': '#386641',    // Dark green
        'button': '#f2e8cf',    // Light beige button
        'button-dark': '#d8b4a0', // Dark beige button
        'intro-background': '#f2e8cf', // Light beige intro background
        'menu-background': '#dde5b6',  // Light olive menu background
        'game-background': '#edf6f9',  // Very light blue game background
        'dark-bg': '#0f172a',       // Deeper dark background
        'vibrant-pink': '#f72585',
        'vibrant-orange': '#ff7f50',
        'vibrant-blue': '#4361ee',
        'vibrant-purple': '#9d4edd',
        'vibrant-teal': '#2ec4b6',
        'gray-800': '#2d3748', // Darker gray for UI elements
        'gray-700': '#4a5568',
        'pastel-blue': '#a3e7fc', // Pastel blue
        'pastel-pink': '#f9caca', // Pastel pink
        'pastel-green': '#bbf7d0', // Pastel green
        'pastel-yellow': '#fef08a', // Pastel yellow
        'light-blue': '#e0f7fa', // Light blue background for panels
        'bubble-gum': '#ff77e9', // Bubble gum pink
        'pale-yellow': '#ffdd59', // Pale yellow
        'soft-green': '#caffbf',  // Soft green
        'light-coral': '#ffadad', // Light coral
      },
      fontFamily: {
        'sans': ['"Noto Sans KR"', 'sans-serif'],
        'game-font': ['"Press Start 2P"', '"Noto Sans KR"', 'sans-serif'], // Example game font
      },
      borderRadius: {
        'xl': '1.25rem', // Slightly larger rounded corners
        '2xl': '2.5rem', // More rounded corners
        '3xl': '3.0rem', // Even more rounded corners
        'bubble': '4.0rem', // Bubble like corners
      },
      boxShadow: {
        'game-button': '3px 3px 0px rgba(0,0,0,0.2)', // More pronounced button shadow
        'inner-ui': 'inset 0 0 7px rgba(0, 0, 0, 0.1)', // Slightly stronger inner shadow for UI panels
        'ui-panel': '7px 7px 15px rgba(0,0,0,0.1)', // Softer UI panel shadow, more depth
        'bubble-float': '6px 6px 12px rgba(0,0,0,0.15)', // Shadow for floating bubbles/elements
      },
      borderWidth: {
        '3': '3px', // Define a 3px border width
        '4': '4px', // Define a 4px border width for emphasis
      },
    },
  },
  plugins: [],
}
