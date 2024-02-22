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
    // ====== For Tauri
    // Better support for Tauri CLI output
    clearScreen: false,
    // Enable environment variables
    // Additional environment variables can be found at
    // https://tauri.app/2/reference/environment-variables/
    envPrefix: ['VITE_', 'TAURI_'],
    server: {
      // Tauri requires a consistent port
      strictPort: true,
      hmr: {
        // Use websocket for mobile hot reloading
        protocol: 'ws',
        // Make sure it's available on the network
        host: '0.0.0.0',
        // Use a specific port for hmr
        port: 5183,
      },
    }
  },
  typescript: {
    typeCheck: true,
    tsConfig: {
      compilerOptions: {
        verbatimModuleSyntax: false, // FIXME 友亮：測試過幾次但vue-tsc不讓我ignore codegen產生的檔案，只好disable此規則
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
  // For Tauri
  ssr: false,

})
