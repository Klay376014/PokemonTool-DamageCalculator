import { LoadingPlugin } from 'vue-loading-overlay'

export default defineNuxtPlugin((app) => {
  const loading = LoadingPlugin

  app.vueApp.use(loading)
})
