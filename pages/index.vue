<script setup lang="ts">
</script>

<template>
  <div>
    <toolbar />
    <v-container class="d-flex justify-center">
      <v-row>
        <v-col class="mx-auto" cols="12" md="6">
          <div class="text-h4 mb-3">
            <v-icon icon="mdi-sword-cross" class="text-h5 text-primary" />
            Attcker
          </div>
          <pokemon-card />
        </v-col>

        <v-col class="mx-auto" cols="12" md="6">
          <div class="text-h4 mb-3">
            <v-icon icon="mdi-shield-half-full" class="text-h5 text-secondary" />
            Defender
          </div>
          <pokemon-card />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style></style>
