<script setup lang="ts">
</script>

<template>
  <div>
    <v-container class="mt-4 px-0" :fluid="false">
      <v-row class="pt-8" no-gutters justify="center">
        <v-col cols="12" md="8" lg="6" class="px-0 px-sm-2 px-md-3 mb-4 mb-lg-0">
          <div class="d-flex flex-column flex-shrink-0">
            <div class="d-flex align-center text-h4 mb-3">
              <v-icon icon="mdi-numeric-1-box" class="text-h5 text-primary mr-3" />
              <p>Pokémon 1</p>
            </div>
            <pokemon-card role="attacker" />
          </div>
        </v-col>

        <v-col cols="12" md="8" lg="6" class="px-0 px-sm-2 px-md-3">
          <div class="d-flex flex-column">
            <div class="d-flex align-center text-h4 mb-3">
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
</style>
