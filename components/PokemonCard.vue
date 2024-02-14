<script setup lang="ts">
import json from '../locales/en.json'

const show = ref(false)
const loading = ref(false)
const pokemonList = Object.keys(json.pokemon)
function showData(value: string | null) {
  if (!value)
    return
  console.log(value)
}
</script>

<template>
  <div>
    <v-card
      class="mx-0 px-0 px-lg-4"
    >
      <pokemon-info />
      <v-autocomplete
        :label="$t('choosePokemon')"
        :items="pokemonList"
        :loading="loading"
        :item-value="item => item"
        :item-title="item => $t(`pokemon.${item}`)"
        class="pl-2"
        bg-color="transparent"
        variant="outlined"
        no-data-text="No Pokemon found"
        density="comfortable"
        @update:model-value="item => showData(item)"
      />
      <pokemon-stat />
      <pokemon-move />
      <v-card-actions>
        <v-btn
          color="purple-lighten-2"
          class="font-weight-bold"
        >
          {{ $t("condition") }}
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
