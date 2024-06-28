// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  target: "static",
  ssr: false,
  router: {
    base: '/testimonials/'
  },
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ['media-player', 'media-provider', 'media-audio-layout'].includes(tag),
    },
  },

  modules: ["@nuxtjs/tailwindcss"],
  css: [
    '@/assets/css/main.scss'
  ],
}