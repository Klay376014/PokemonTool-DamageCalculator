<script setup lang="ts">
useHead({
  title: 'Pokémon Damage Calculator'
})
</script>

<template>
  <NuxtLayout>
    <v-app>
      <app-bar />
      <v-main>
        <NuxtPage />
      </v-main>
    </v-app>
  </NuxtLayout>
</template>
