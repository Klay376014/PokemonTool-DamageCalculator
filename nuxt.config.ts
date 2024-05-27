import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/Calculator-2024ver/' : '/',
    buildAssetsDir: '/static/',
    head: {
      charset: 'utf-8',
      meta: [
        {
          name: 'viewport',
          content:
          'width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0'
        }
      ],
    }
  },
  build: {
    transpile: ['vuetify'],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        config.plugins?.push(vuetify({ autoImport: true }))
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
    'nuxt-gtag'
  ],
  gtag: {
    id:'G-YCYLGKZWQ0'
  },
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  typescript: {
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false, // FIXME 友亮：測試過幾次但vue-tsc不讓我ignore codegen產生的檔案，只好disable此規則
        noUnusedLocals: false,
        noUnusedParameters: false
      }
    },
  },
  apollo: {
    clients: {
      default: {
        httpEndpoint: 'https://beta.pokeapi.co/graphql/v1beta',
      }
    }
  },
  experimental: {
    renderJsonPayloads: false
  },
  ssr: false
})
