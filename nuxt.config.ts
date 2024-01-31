const STORYBLOK_VERSION =
  process.env.STORYBLOK_VERSION ||
  (process.env.NODE_ENV === "production" ? "published" : "draft");
  // https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      siteUrl: process.env.BASE_URL,
      STORYBLOK_VERSION,
    },
  },
  devtools: { enabled: true },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/assets/css/main.css'],

  modules: [
    ['@storyblok/nuxt', { accessToken: process.env.STORYBLOK_KEY }],
    "@nuxt/image"
  ]
})
