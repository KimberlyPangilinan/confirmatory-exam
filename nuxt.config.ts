// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "My Crud App",
      link: [{ rel: "icon", type: "image/x-icon", href: "/images/logo.png" }],
    },
  },
  css: [
    "~/assets/css/main.css",
    "vue3-toastify/dist/index.css",
    "vue3-carousel/dist/carousel.css",
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  typescript: {
    typeCheck: true,
  },

  modules: ["nuxt-auth-utils", "@pinia/nuxt", "@nuxt/eslint", "@nuxt/icon"],
});
