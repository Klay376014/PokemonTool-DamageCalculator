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

const itemProps = (item: AllPokemon) => {
  return {
    title: t(`pokemon.${item}`)
  }
}

const customFilter = (itemText: string, queryText: string, item: any) => {
  const searchText = queryText.toLowerCase()
  const kanaText = hiraToKata(queryText)
  const romanToKanaText = romanToKana(queryText)

  const textOne = item.value.toLowerCase().includes(searchText.toLowerCase())
  const textTwo = itemText.toLowerCase().includes(searchText)
  const textForKana = itemText.includes(kanaText)
  const textForRomanToKana = itemText.includes(romanToKanaText)
  return textOne || textTwo || textForKana || textForRomanToKana
}

const pokemonSelect = async (name: string | null) => {
  if (!name)
    return
  isLoading.value = true
  const r = await useFetchPokemon(name) as Pokemon
  const { stats, types, sprite, weight } = r
  if (name !== 'terapagos-stellar') {
    pm.setPokemon(name, stats, types as PokemonType, sprite.front_default, weight)
  } else {
    const terapagosStallarStats = {
      hp: 160,
      attack:	105,
      defense: 110,
      specialAttack: 130,
      specialDefense:	110,
      speed: 85
    }
    pm.setPokemon(name, terapagosStallarStats, types as PokemonType, sprite.front_default, weight)
  }
  pm.setDefaultSelection(name)
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
    :model-value="pm.pokemonRef['name'] as AllPokemon"
    @update:model-value="pokemonSelect"
  />
</template>
