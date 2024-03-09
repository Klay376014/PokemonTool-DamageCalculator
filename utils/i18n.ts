import { createI18n } from 'vue-i18n'
import zhHant from '../locales/zhHant.json'
import en from '../locales/en.json'
import ja from '../locales/ja.json'

const instance = createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'zhHant',
  fallbackLocale: 'en',
  messages: {
    zhHant,
    en,
    ja
  },
})

export default instance

export const i18n = instance.global
