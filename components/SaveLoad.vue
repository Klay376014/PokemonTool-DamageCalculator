<script setup lang="ts">
import type { Pokemon } from 'vgc_data_wrapper'

const props = defineProps({
  role: {
    type: String,
    required: true
  }
})
const dialogLoad = ref(false)
const dialogSave = ref(false)

const pm = usePokemonDataStore(props.role)
const loadedPokemon: Ref<Pokemon[]> = ref([])

const openSaveDialog = () => {
  if (!pm.pokemonRef.name)
    // eslint-disable-next-line no-alert
    window.alert('No Pokemon Selected!')
  else
    dialogSave.value = true
}
// 儲存當前寶可夢設定
const savePokemonSetting = () => {
  loadedPokemon.value.length = 0
  const getSavedPokemon = localStorage.getItem('savedPokemon')
  if (getSavedPokemon)
    loadedPokemon.value = loadedPokemon.value.concat(JSON.parse(getSavedPokemon) as Pokemon[])
  loadedPokemon.value.push(pm.pokemonRef as Pokemon)
  localStorage.setItem('savedPokemon', JSON.stringify(loadedPokemon.value))
  dialogSave.value = false
}
// 開啟讀取畫面
const openLoadDialog = () => {
  // 開啟時先清空，再從localStorage拿取已存取的內容
  loadedPokemon.value.length = 0
  const getSavedPokemon = localStorage.getItem('savedPokemon')
  if (getSavedPokemon)
    loadedPokemon.value = loadedPokemon.value.concat(JSON.parse(getSavedPokemon) as Pokemon[])
  dialogLoad.value = true
}
// 讀取選中寶可夢
const loadSelectedPoekmon = (index: number) => {
  console.log(loadedPokemon.value[index])
  if (loadedPokemon.value.length > 0) {
    const { name, baseStat, types, sprite, weight } = loadedPokemon.value[index]
    pm.pokemonRef.baseStat = baseStat
    pm.setPokemon(name!, baseStat, types, sprite!, weight)
  }
  dialogLoad.value = false
}

const deleteSelectedPoekmon = (index: number) => {
  loadedPokemon.value.splice(index, 1)
  localStorage.setItem('savedPokemon', JSON.stringify(loadedPokemon.value))
  openLoadDialog()
}
</script>

<template>
  <div class="d-md-flex">
    <v-btn icon="mdi-content-save" color="purple-lighten-2" variant="plain" class="text-md-h6" size="40" @click="openSaveDialog" />
    <v-btn icon="mdi-import" color="red-lighten-1" variant="plain" class="text-h6" size="40" @click="openLoadDialog" />
  </div>

  <v-dialog
    v-model="dialogLoad"
    width="350px"
    scrollable
  >
    <v-card
      prepend-icon="mdi-import"
      title="Select Pokemon"
      style="height: 400px;"
      class="px-2"
    >
      <v-divider class="mt-3" />

      <v-card-text v-for="(pokemon, index) in loadedPokemon" :key="index" class="px-2 d-flex justify-space-between">
        <v-img
          max-width="50"
          aspect-ratio="1"
          :src="pokemon.sprite"
        />
        <div>
          <p>{{ `H${pokemon.effortValues.hp}` }}</p>
          <p>{{ `C${pokemon.effortValues.specialAttack}` }}</p>
        </div>
        <div>
          <p>{{ `A${pokemon.effortValues.attack}` }}</p>
          <p>{{ `D${pokemon.effortValues.specialDefense}` }}</p>
        </div>
        <div class="mr-4">
          <p>{{ `B${pokemon.effortValues.defense}` }}</p>
          <p>{{ `S${pokemon.effortValues.speed}` }}</p>
        </div>
        <div class="d-flex align-center pb-3">
          <v-btn icon="mdi-import" color="red-lighten-1" variant="plain" class="text-h6 mr-2" size="20" @click="loadSelectedPoekmon(index)" />
          <v-btn icon="mdi-trash-can-outline" variant="plain" class="text-h6" size="20" @click="deleteSelectedPoekmon(index)" />
        </div>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-btn
          text="Close"
          @click="dialogLoad = false"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="dialogSave"
    width="350px"
  >
    <v-card
      prepend-icon="mdi-content-save"
      text="Do you save this Pokemon's setting?"
      title="Pokemon Save"
    >
      <v-divider />

      <v-card-actions>
        <v-btn
          text="Close"
          @click="dialogSave = false"
        />
        <v-btn
          color="surface-variant"
          class="ms-auto"
          text="Save"
          variant="flat"
          @click="savePokemonSetting"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style>

</style>
