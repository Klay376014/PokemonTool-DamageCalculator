<script setup lang="ts">
import json from '../locales/en.json'

const show = ref(false)
const loading = ref(false)
const selectedPokemon = ref<string | null>(null)
const pokemonList = Object.keys(json.pokemon)
</script>

<template>
  <div class="w-100">
    <v-card
      class="mx-auto px-4"
      max-width="630"
    >
      <v-card-title>
        Test text
      </v-card-title>

      <div>
        <v-autocomplete
          v-model="selectedPokemon"
          :label="$t('choosePokemon')"
          :items="pokemonList"
          :loading="loading"
          :item-title="item => $t(`pokemon.${item}`)"
          class="w-50 pl-2"
          bg-color="transparent"
          variant="outlined"
          no-data-text="No Pokemon found"
          clearable
          @update:model-value="() => console.log('test')"
        />
      </div>

      <v-card-actions>
        <v-btn
          color="purple-lighten-2"
          class="font-weight-bold"
        >
          {{ $t("field.title") }}
        </v-btn>

        <v-spacer />

        <v-btn
          :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show = !show"
        />
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider />
          <v-card-text>
            test
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<style></style>
