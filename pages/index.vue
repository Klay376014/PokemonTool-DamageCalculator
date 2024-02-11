<script setup lang="ts">
</script>

<template>
  <div>
    <toolbar />
    <v-container>
      <v-row class="pt-8">
        <v-col cols="12" md="6" class="px-0 px-sm-2 px-md-3">
          <div class="text-h4 mb-3">
            <div class="d-flex align-center">
              <v-icon icon="mdi-sword-cross" class="text-h5 text-primary mr-3" />
              <p>Attacker</p>
            </div>
          </div>
          <pokemon-card />
        </v-col>

        <v-col cols="12" md="6" class="px-0 px-sm-2 px-md-3">
          <div class="text-h4 mb-3">
            <div class="d-flex align-center">
              <v-icon icon="mdi-shield-half-full" class="text-h5 text-secondary mr-3" />
              <p>Defender</p>
            </div>
          </div>
          <pokemon-card />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style></style>
