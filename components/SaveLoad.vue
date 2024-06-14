<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { getPokemonsFromPasteUrl, type Pokemon } from 'vgc_data_wrapper'
import draggable from 'vuedraggable'
draggable.compatConfig = { MODE: 3 }

const { t } = useI18n()

type Stats = Omit<typeof stats, 'hp'>
type NatureStats = keyof Stats
type PokemonWithNote = Pokemon & { note: string }

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
const note = ref('')
const importing = ref(false)

const pm = usePokemonDataStore(props.role)
const loadedPokemon = ref(<PokemonWithNote[]>[])

const openSaveDialog = () => {
  if (!pm.pokemonRef.name) {
    window.alert(t('noPokemonSelected'))
  } else {
    note.value = ''
    dialogSave.value = true
  }
}

const initLocalStorage = () => {
  // 開啟時先清空，再從localStorage拿取已存取的內容
  loadedPokemon.value.length = 0
  const getSavedPokemon = localStorage.getItem('savedPokemon')
  if (getSavedPokemon) {
    loadedPokemon.value = loadedPokemon.value.concat(JSON.parse(getSavedPokemon) as PokemonWithNote[])
  }
}

onMounted(() => {
  initLocalStorage()
})

const savePokemon = (pokemons: PokemonWithNote | PokemonWithNote[]) => {
  loadedPokemon.value = loadedPokemon.value.concat(pokemons)
  localStorage.setItem('savedPokemon', JSON.stringify(loadedPokemon.value))
}

// 儲存當前寶可夢設定
const saveCurrentPokemonSetting = () => {
  const pokemon = {
    ...pm.pokemonRef,
    note: note.value
  }
  savePokemon(pokemon as PokemonWithNote)
  dialogSave.value = false
}
// 開啟讀取畫面
const openLoadDialog = () => {
  dialogLoad.value = true
}
// 讀取選中寶可夢
const loadSelectedPoekmon = (index: number) => {
  if (loadedPokemon.value.length > 0) {
    const { name, baseStat, effortValues, types, sprite, weight, item} = loadedPokemon.value[index]
    pm.pokemonRef.effortValues = effortValues
    pm.pokemonRef.nature = loadedPokemon.value[index].nature
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
  importing.value = true
  try {
    const pokemons = (await getPokemonsFromPasteUrl(pokePasteUrl.value)).map(pokemon => {
      return {
        ...pokemon,
        note: 'notesFromPaste'
      }
    })
    savePokemon(pokemons as PokemonWithNote[])
    dialogImportFromUrl.value = false
  } catch (e) {
    if (e instanceof Error) alert(e.message)
  } finally {
    importing.value = false
  }
}

const natureOperator = (nature: {plus?: NatureStats, minus?: NatureStats}, stat: string) => {
  if (nature.plus === stat) return '+'
  if (nature.minus === stat) return '-'
  return ''
}

const drag = ref(false)

const dragOptions = computed(() => {
  return {
    animation: 400,
    group: 'load',
    disabled: false,
    ghostClass: 'ghost'
  }
})

const reorder = (ev: any) => {
  const newOrder = ev.relatedContext.list
  if (newOrder) return
  loadedPokemon.value = newOrder as PokemonWithNote[]
  localStorage.setItem('savedPokemon', JSON.stringify(loadedPokemon.value))
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
      <draggable
        :list="loadedPokemon"
        tag="transition-group"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        :move="reorder"
        item-key="order"
      >
        <template #item="{ element: pokemon, index }">
          <v-card-text class="px-2 d-flex justify-space-between" :key="index">
            <v-img
              max-width="50"
              aspect-ratio="1"
              :src="pokemon.sprite"
            >
              <v-tooltip
                activator="parent"
                location="top"
                >{{ $te(pokemon.note) ? $t(pokemon.note) : pokemon.note }}
              </v-tooltip>
            </v-img>
            <div>
              <p>{{ `H${pokemon.effortValues.hp}` }}</p>
              <p>{{ `C${pokemon.effortValues.specialAttack}${natureOperator(pokemon.nature, 'specialAttack')}` }}</p>
            </div>
            <div>
              <p>{{ `A${pokemon.effortValues.attack}${natureOperator(pokemon.nature, 'attack')}` }}</p>
              <p>{{ `D${pokemon.effortValues.specialDefense}${natureOperator(pokemon.nature, 'specialDefense')}` }}</p>
            </div>
            <div class="mr-4">
              <p>{{ `B${pokemon.effortValues.defense}${natureOperator(pokemon.nature, 'defense')}` }}</p>
              <p>{{ `S${pokemon.effortValues.speed}${natureOperator(pokemon.nature, 'speed')}` }}</p>
            </div>
            <div class="d-flex align-center pb-3">
              <v-btn icon="mdi-import" color="red-lighten-1" variant="plain" class="text-h6 mr-2" size="20" @click="loadSelectedPoekmon(index)" />
              <v-btn icon="mdi-trash-can-outline" variant="plain" class="text-h6" size="20" @click="deleteSelectedPoekmon(index)" />
            </div>
          </v-card-text>
        </template>
      </draggable>

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
    <v-text-field v-model="note" :label="$t('writeNote')"></v-text-field>
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
          :disabled="importing"
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
