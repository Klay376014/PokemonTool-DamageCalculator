<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useTheme } from 'vuetify'

const { locale } = useI18n()

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.name.value === 'darkMode' ? 'lightMode' : 'darkMode'
}

const languages = [
  { text: '中文', value: 'zhHant' },
  { text: 'English', value: 'en' },
  { text: '日本語', value: 'ja' },
] as const

function changeLanguage(lang: (typeof languages)[number]['value']) {
  locale.value = lang
}
</script>

<template>
  <v-toolbar density="compact" color="primary-darken-1">
    <v-toolbar-title class="text-subtitle-2 text-sm-h6 flex-basis-0">
      {{ $t("title") }}
    </v-toolbar-title>

    <v-spacer />

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

    <v-btn icon>
      <v-icon>mdi-dots-vertical</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<style scoped>
.v-toolbar-title {
  flex-basis: auto;
}
</style>
