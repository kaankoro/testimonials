// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['media-player', 'media-provider', 'media-audio-layout'].includes(tag),
    },
  },

  modules: ["@nuxtjs/tailwindcss"],
  css: [
    '@/assets/css/main.scss'
  ]
})