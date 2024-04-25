<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import json from '../locales/en.json'
import type { PokemonType } from '~/utils/schema'

const props = defineProps({
  role: {
    type: String,
    required: true
  }
})
const { t } = useI18n()
const loading = ref(false)

type AllPokemon = keyof typeof json.pokemon
const pokemonList = Object.keys(json.pokemon) as unknown as AllPokemon[]

const pm = usePokemonDataStore(props.role)
const isLoading = ref(false)

function itemProps(item: AllPokemon) {
  return {
    title: t(`pokemon.${item}`)
  }
}

function customFilter(itemText: string, queryText: string, item: any) {
  const searchText = queryText.toLowerCase()
  const kanaText = hiraToKata(queryText)
  const romanToKanaText = romanToKana(queryText)

  const textOne = item.value.toLowerCase().includes(searchText.toLowerCase())
  const textTwo = itemText.toLowerCase().includes(searchText)
  const textForKana = itemText.includes(kanaText)
  const textForRomanToKana = itemText.includes(romanToKanaText)
  return textOne || textTwo || textForKana || textForRomanToKana
}

async function pokemonSelect(name: string | null) {
  if (!name)
    return
  isLoading.value = true
  const r = await useFetchPokemon(name) as Pokemon
  const { stats, types, sprite, weight } = r
  pm.setPokemon(name, stats, types as PokemonType, sprite, weight)
  pm.setDefaultSelection(name)
  console.log(pm.pokemonRef)
  isLoading.value = false
}
</script>

<template>
  <Loading
    v-model:active="isLoading"
    :is-full-page="false"
    :can-cancel="false"
    class="px-0"
  />
  <v-autocomplete
    :label="$t('choosePokemon')"
    :items="pokemonList"
    :item-props="itemProps"
    :loading="loading"
    :custom-filter="customFilter"
    class="px-2 mb-2"
    bg-color="transparent"
    variant="outlined"
    no-data-text="No Pokemon found"
    density="comfortable"
    hide-details
    clearable
    @update:model-value="pokemonSelect"
  />
</template>
