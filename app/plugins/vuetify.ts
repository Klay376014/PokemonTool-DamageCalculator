import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { type ThemeDefinition, createVuetify } from 'vuetify'
import zhHant from '../locales/zhHant.json'
import en from '../locales/en.json'
import ja from '../locales/ja.json'

const darkMode: ThemeDefinition = {
  dark: true,
  colors: {
    'background': '#000000',
    'surface': '#1c1c1e',
    'primary': '#0071e3',
    'primary-darken-1': '#0066cc',
    'secondary': '#FF9F0A',
    'secondary-darken-1': '#CC7F08',
    'warning': '#FF0000'
  }
}

const lightMode: ThemeDefinition = {
  dark: true,
  colors: {
    'background': '#f5f5f7',
    'surface': '#ffffff',
    'primary': '#0071e3',
    'primary-darken-1': '#0066cc',
    'secondary': '#FF9F0A',
    'secondary-darken-1': '#CC7F08',
    'warning': '#FF0000'
  },
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'darkMode',
      themes: {
        darkMode,
        lightMode,
      }
    },
    icons: {
      defaultSet: 'mdi'
    },
    locale: {
      locale: 'zhHant',
      fallback: 'en',
      messages: { zhHant, en, ja }
    },
    display: {
      thresholds: {
        xl: 1925,
      },
    }
  })
  app.vueApp.use(vuetify)
})
