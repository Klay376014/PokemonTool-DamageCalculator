<script setup lang="ts">
</script>

<template>
  <div>
    <toolbar />
    <div class="mx-auto text-center px-16">
      <div class="text-h3 pt-8 mb-8">
        {{ $t("hello") }}
      </div>
    </div>
    <v-container class="d-flex justify-center">
      <v-row>
        <v-col class="mx-auto" cols="12" md="6">
          <pokemon-card />
        </v-col>

        <v-col class="mx-auto" cols="12" md="6">
          <pokemon-card />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style></style>
