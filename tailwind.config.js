/** @type {import('tailwindcss').Config} */
export default {
  content: [
    // './components/**/*.{vue,js}',
    // './layouts/**/*.vue',
    // './pages/**/*.vue',
    // './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    // Add other paths here
    './node_modules/mco-design-system/components/**/**/*.{vue,js}', // Include Storybook components
    './node_modules/mco-design-system/assets/**/*.scss', // Include Storybook stylesheets
  ],
  presets: [
    require('mco-design-system/tailwind.config'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

