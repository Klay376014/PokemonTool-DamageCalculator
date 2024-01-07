/* eslint-disable ts/ban-ts-comment */
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  app: {
    // eslint-disable-next-line node/prefer-global/process
    baseURL: process.env.NODE_ENV === 'production' ? '/Calculator-2024ver/' : '/',
    buildAssetsDir: '/static/',
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    },
    [
      '@pinia/nuxt',
      {
        autoImports: [
          'defineStore',
          ['defineStore', 'definePiniaStore'],
        ],
      },
    ],
    '@nuxtjs/apollo',
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  typescript: {
    typeCheck: true,
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://beta.pokeapi.co/graphql/v1beta',
      }
    }
  },
})
