// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [ '@nuxt/icon'],
  css: ['~/assets/css/tailwind.css'], //This is important 
  app: {
    head: {
      meta: [
        { name: 'robots', content: 'noindex, nofollow' }
      ]
    }
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  tailwindcss: {
    // Options
  },

})