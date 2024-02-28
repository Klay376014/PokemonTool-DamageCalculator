<script setup lang="ts">
</script>

<template>
  <div>
    <v-container class="px-1 mt-4">
      <v-row class="pt-8" no-gutters justify="center">
        <v-col cols="12" md="8" lg="6" class="px-0 px-sm-2 px-md-3 mb-4 mb-lg-0">
          <div class="d-flex flex-column flex-shrink-0">
            <div class="d-flex align-center text-h4 mb-3">
              <v-icon icon="mdi-sword-cross" class="text-h5 text-primary mr-3" />
              <p>Attacker</p>
            </div>
            <pokemon-card />
          </div>
        </v-col>

        <v-col cols="12" md="8" lg="6" class="px-0 px-sm-2 px-md-3">
          <div class="d-flex flex-column">
            <div class="d-flex align-center text-h4 mb-3">
              <v-icon icon="mdi-shield-half-full" class="text-h5 text-secondary mr-3" />
              <p>Defender</p>
            </div>
            <pokemon-card />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style></style>
