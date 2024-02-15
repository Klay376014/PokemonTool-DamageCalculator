<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import moves from '../assets/pokemonMove.json'

const { t } = useI18n()

const loading = ref(false)

type Move = keyof typeof moves

const moveList = Object.keys(moves) as unknown as Move[]

function itemProps(item: Move) {
  const type: string = moves[item].type
  const basePower = moves[item].basePower
  const category = moves[item].category
  return {
    title: item,
    subtitle: `${t(`type.${type.toLowerCase()}`)}/${basePower}/${t(`${category}`)}`
  }
}
function showData(value: string | null) {
  if (!value)
    return
  console.log(value)
}
</script>

<template>
  <div class="mt-2">
    <v-autocomplete
      :label="$t('chooseMove')"
      :items="moveList"
      :loading="loading"
      :item-value="item => item"
      :item-title="item => item"
      :item-props="item => itemProps(item)"
      class="px-2 w-50"
      bg-color="transparent"
      variant="outlined"
      no-data-text="No Move found"
      density="compact"
      @update:model-value="item => showData(item)"
    />
  </div>
</template>

<style>

</style>
