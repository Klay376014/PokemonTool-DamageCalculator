<script setup lang="ts">
import { useDisplay } from 'vuetify'

const { lgAndUp } = useDisplay()
const activeTab = ref<string>('attacker')
</script>

<template>
  <div>
    <!-- Mobile / tablet: tab layout (< lg) -->
    <v-container v-if="!lgAndUp" class="mt-4 px-0 pt-8 pb-panel" :fluid="false">
      <v-tabs v-model="activeTab" fixed-tabs class="mb-2">
        <v-tab value="attacker">
          <template #prepend>
            <v-icon class="text-primary mr-2">mdi-numeric-1-box</v-icon>
          </template>
          Pokémon 1
        </v-tab>
        <v-tab value="defender">
          <template #prepend>
            <v-icon class="text-secondary mr-2">mdi-numeric-2-box</v-icon>
          </template>
          Pokémon 2
        </v-tab>
      </v-tabs>

      <v-window v-model="activeTab">
        <v-window-item value="attacker">
          <div class="d-flex flex-column flex-shrink-0 px-0 px-sm-2 px-md-3 mt-4">
            <pokemon-card role="attacker" />
          </div>
        </v-window-item>

        <v-window-item value="defender">
          <div class="d-flex flex-column px-0 px-sm-2 px-md-3 mt-4">
            <pokemon-card role="defender" />
          </div>
        </v-window-item>
      </v-window>
    </v-container>

    <!-- Desktop: original side-by-side layout (>= lg) -->
    <v-container v-else class="mt-4 px-0 pb-panel" :fluid="false">
      <v-row class="pt-8" no-gutters justify="center">
        <v-col cols="12" lg="6" class="px-0 px-sm-2 px-md-3 mb-4 mb-lg-0">
          <div class="d-flex flex-column flex-shrink-0">
            <div class="d-flex align-center text-h4 mb-3 mx-2">
              <v-icon icon="mdi-numeric-1-box" class="text-h5 text-primary mr-3" />
              <p>Pokémon 1</p>
            </div>
            <pokemon-card role="attacker" />
          </div>
        </v-col>

        <v-col cols="12" lg="6" class="px-0 px-sm-2 px-md-3">
          <div class="d-flex flex-column">
            <div class="d-flex align-center text-h4 mb-3 mx-2">
              <v-icon icon="mdi-numeric-2-box" class="text-h5 text-secondary mr-3" />
              <p>Pokémon 2</p>
            </div>
            <pokemon-card role="defender" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scope>
@media (min-width: 1920px) {
  .v-container {
    max-width: 1200px !important;
  }
}

.pb-panel {
  padding-bottom: 124px !important;
}
</style>
