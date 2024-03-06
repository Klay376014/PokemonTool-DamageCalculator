<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import json from '../locales/en.json'

const { t } = useI18n()
const loading = ref(false)

type AllPokemon = keyof typeof json.pokemon
const pokemonList = Object.keys(json.pokemon) as unknown as AllPokemon[]

function itemProps(item: AllPokemon) {
  return {
    title: t(`pokemon.${item}`)
  }
}

function customFilter(itemText: string, queryText: string, item: any) {
  const searchText = queryText.toLowerCase()
  const kanaText = useHiraToKata(queryText)
  const romanToKanaText = useRomanToKatakana(queryText)

  const textOne = item.value.toLowerCase().includes(searchText.toLowerCase())
  const textTwo = itemText.toLowerCase().includes(searchText)
  const textForKana = itemText.includes(kanaText)
  const textForRomanToKana = itemText.includes(romanToKanaText)
  return textOne || textTwo || textForKana || textForRomanToKana
}

function showData(value: string | null) {
  if (!value)
    return
  console.log(value)
}
</script>

<template>
  <v-autocomplete
    :label="$t('choosePokemon')"
    :items="pokemonList"
    :item-props="itemProps"
    :loading="loading"
    :custom-filter="customFilter"
    class="pl-2 mb-2"
    bg-color="transparent"
    variant="outlined"
    no-data-text="No Pokemon found"
    density="comfortable"
    hide-details
    @update:model-value="showData"
  />
</template>
