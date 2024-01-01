import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { type ThemeDefinition, createVuetify } from 'vuetify'
import zhHant from '../locales/zhHant.json'
import en from '../locales/en.json'
import ja from '../locales/ja.json'

const darkMode: ThemeDefinition = {
  dark: true,
  colors: {
    'background': '#121212',
    'surface': '212121',
    'primary': '#59359A',
    'primary-darken-1': '#533194',
    'secondary': '#DC3545',
    'secondary-darken-1': '#C42F3D',
    'warning': '#FF0000',
  }
}

const lightMode: ThemeDefinition = {
  dark: true,
  colors: {
    'background': '#FFFFFF',
    'surface': '#FFFFFF',
    'primary': '#59359A',
    'primary-darken-1': '#533194',
    'secondary': '#DC3545',
    'secondary-darken-1': '#C42F3D',
    'warning': '#FF0000',
  },
}

export default defineNuxtPlugin((app) => {
  const vuetify = createVuetify({
    theme: {
      defaultTheme: 'darkMode',
      themes: {
        darkMode,
        lightMode
      }
    },
    icons: {
      defaultSet: 'mdi',
    },
    locale: {
      locale: 'zhHant',
      fallback: 'en',
      messages: { zhHant, en, ja },
    }
  })
  app.vueApp.use(vuetify)
})
