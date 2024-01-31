// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/main.css'],

  modules: [
    ['@storyblok/nuxt', { accessToken: 'mhczKXAL1SEYBVoyhcW63wtt' }],
    "@nuxt/image"
  ]
})
