<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useDisplay, useTheme } from 'vuetify'

const { locale } = useI18n()

const { lgAndUp } = useDisplay()
const theme = useTheme()

const toggleTheme = () => {
  theme.global.name.value = theme.global.name.value === 'darkMode' ? 'lightMode' : 'darkMode'
}

const languages = [
  { text: '中文', value: 'zhHant' },
  { text: 'English', value: 'en' },
  { text: '日本語', value: 'ja' },
] as const

const defaultLanguage = localStorage.getItem('langueage') as (typeof languages)[number]['value']

const changeLanguage = (lang: (typeof languages)[number]['value']) => {
  locale.value = lang
  localStorage.setItem('langueage', lang)
}

changeLanguage(defaultLanguage ?? 'zhHant')

const nv = useNavigationStore()
</script>

<template>
  <v-app-bar density="compact" color="primary-darken-1" prominent class="mb-4">
    <v-app-bar-title class="text-caption text-sm-h6 flex-basis-0" :text="$t('title')" />

    <v-btn icon @click="toggleTheme">
      <v-icon>mdi-theme-light-dark</v-icon>
    </v-btn>
    <v-btn icon>
      <v-menu activator="parent">
        <v-list>
          <v-list-item v-for="(item, index) in languages" :key="index" @click="changeLanguage(item.value)">
            <v-list-item-title>{{ item.text }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-icon>mdi-translate</v-icon>
    </v-btn>
    <v-btn v-if="!lgAndUp" icon @click.stop="nv.condition = !nv.condition">
      <v-icon>mdi-tune</v-icon>
    </v-btn>

  </v-app-bar>
  <navigation />
  <damage-result />
</template>

<style scoped>
</style>
