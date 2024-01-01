<script setup>
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
]

function changeLanguage(item) {
  locale.value = item.value
}
</script>

<template>
  <div>
    <v-toolbar density="compact" color="primary">
      <v-app-bar-nav-icon />

      <v-toolbar-title>{{ $t("title") }}</v-toolbar-title>

      <v-spacer />

      <v-btn icon @click="toggleTheme">
        <v-icon>mdi-theme-light-dark</v-icon>
      </v-btn>

      <v-btn icon>
        <v-menu activator="parent">
          <v-list>
            <v-list-item v-for="(item, index) in languages" :key="index" @click="changeLanguage(item)">
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
    <div class="mx-auto text-center px-10">
      <div class="text-h3 pt-8 mb-8">
        {{ $t("hello") }}
      </div>
    </div>
    <div class="text-h4 text-center pt-8 mb-8">
      {{ `去吧！${$t("pokemon.Charizard")}` }}
    </div>
  </div>
</template>

<style></style>
