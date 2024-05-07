<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'

const { locale } = useI18n()

const theme = useTheme()

const toggleTheme = () => {
  theme.global.name.value = theme.global.name.value === 'darkMode' ? 'lightMode' : 'darkMode'
}

const languages = [
  { text: '中文', value: 'zhHant' },
  { text: 'English', value: 'en' },
  { text: '日本語', value: 'ja' },
] as const

const changeLanguage = (lang: (typeof languages)[number]['value']) => {
  locale.value = lang
}

const nv = useNavigationStore()
</script>

<template>
  <v-app-bar density="compact" color="primary-darken-1" prominent class="mb-4">
    <template #prepend>
      <v-app-bar-nav-icon class="w-100 pl-1" @click.stop="nv.condition = !nv.condition" />
    </template>
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

    <v-btn icon @click.stop="nv.damage = !nv.damage">
      <v-icon>mdi-calculator-variant</v-icon>
    </v-btn>
  </v-app-bar>
  <navigation />
  <damage-result />
</template>

<style scoped>
</style>
