<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { getPokemonsFromPasteUrl, type Pokemon } from 'vgc_data_wrapper'

const { t } = useI18n()

const props = defineProps({
  role: {
    type: String,
    required: true
  }
})
const dialogLoad = ref(false)
const dialogSave = ref(false)
const dialogImportFromUrl = ref(false)
const pokePasteUrl = ref('')

const pm = usePokemonDataStore(props.role)
const loadedPokemon: Ref<Pokemon[]> = ref([])

const openSaveDialog = () => {
  if (!pm.pokemonRef.name)
    window.alert(t('noPokemonSelected'))
  else
    dialogSave.value = true
}

const savePokemon = (pokemons: Pokemon | Pokemon[]) => {
  loadedPokemon.value.length = 0
  const getSavedPokemon = localStorage.getItem('savedPokemon')
  if (getSavedPokemon) {
    loadedPokemon.value = loadedPokemon.value.concat(JSON.parse(getSavedPokemon) as Pokemon[])
  }
  loadedPokemon.value = loadedPokemon.value.concat(pokemons)
  localStorage.setItem('savedPokemon', JSON.stringify(loadedPokemon.value))
}

// 儲存當前寶可夢設定
const saveCurrentPokemonSetting = () => {
  savePokemon(pm.pokemonRef as Pokemon)
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
    const { name, baseStat, effortValues, types, sprite, weight, item} = loadedPokemon.value[index]
    pm.pokemonRef.effortValues = effortValues
    pm.setPokemon(name!.toLowerCase().replace(' ', '-'), baseStat, types, sprite!, weight, item)
  }
  dialogLoad.value = false
}

const deleteSelectedPoekmon = (index: number) => {
  loadedPokemon.value.splice(index, 1)
  localStorage.setItem('savedPokemon', JSON.stringify(loadedPokemon.value))
  openLoadDialog()
}

const importFromUrl = async () => {
  const pokemons = await getPokemonsFromPasteUrl(pokePasteUrl.value)
  savePokemon(pokemons)
  dialogImportFromUrl.value = false
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
      :title="$t('pokemonLoad')"
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
          :text="$t('close')"
          @click="dialogLoad = false"
        />
        <v-btn
          :text="$t('importFromPaste')"
          color="primary"
          class="ms-auto"
          @click="dialogImportFromUrl = true"
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
      :text="$t('pokemonSaveConfirm')"
      :title="$t('pokemonSave')"
    >
      <v-divider />

      <v-card-actions>
        <v-btn
          :text="$t('close')"
          @click="dialogSave = false"
        />
        <v-btn
          color="surface-variant"
          class="ms-auto"
          :text="$t('confirm')"
          variant="flat"
          @click="saveCurrentPokemonSetting"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="dialogImportFromUrl"
    width="350px"
  >
    <v-card
      prepend-icon="mdi-arrow-down-bold-hexagon-outline"
      :text="$t('pasteUrl')"
      :title="$t('pokemonImport')"
    >
      <form>
        <v-text-field
          label="url"
          v-model="pokePasteUrl"
          clearable
        />

        <v-btn
          @click="importFromUrl"
          class="w-100"
          color="primary"
        >
          {{ $t('submit')}}
        </v-btn>
      </form>
    </v-card>
  </v-dialog>
</template>

<style>

</style>
