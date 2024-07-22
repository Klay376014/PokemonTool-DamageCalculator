<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { getPokemonsFromPasteUrl, type Pokemon } from 'vgc_data_wrapper'
import draggable from 'vuedraggable'
import { effectByEviolite } from '~/utils/evioliteMap';
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

const pm = usePokemonDataStore(props.role)
const user = useUserStore()

const dialogLoad = ref(false)
const dialogSave = ref(false)
const dialogImportFromUrl = ref(false)
const pokePasteUrl = ref('')
const note = ref('')
const importing = ref(false)

const openSaveDialog = () => {
  if (!pm.pokemonRef.name) {
    window.alert(t('noPokemonSelected'))
  } else {
    note.value = ''
    dialogSave.value = true
  }
}

const savePokemon = (pokemons: PokemonWithNote | PokemonWithNote[]) => {
  user.loadedPokemon = user.loadedPokemon.concat(pokemons)
  user.saveData(JSON.stringify(user.loadedPokemon))
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
  if (user.loadedPokemon.length > 0) {
    const { name, baseStat, effortValues, types, sprite, weight, item} = user.loadedPokemon[index]
    pm.pokemonRef.effortValues = effortValues
    pm.pokemonRef.nature = user.loadedPokemon[index].nature
    pm.setPokemon(name!.toLowerCase().replace(' ', '-'), baseStat, types, sprite!, weight, item)
  }
  dialogLoad.value = false
}

const deleteSelectedPoekmon = (index: number) => {
  user.loadedPokemon.splice(index, 1)
  openLoadDialog()
}

const leaveLoadAndUpdate = () => {
  user.saveData(JSON.stringify(user.loadedPokemon))
  dialogLoad.value = false
}

const importFromUrl = async () => {
  importing.value = true
  try {
    const pokemons = (await getPokemonsFromPasteUrl(pokePasteUrl.value)).map(pokemon => {
      if (pokemon.name) pm.pokemonRef.setFlags({ hasEvolution: effectByEviolite(pokemon.name) })
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

const endDragEvent = () => {
  user.saveData(JSON.stringify(user.loadedPokemon))
  drag.value = false
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
      class="px-2 overflow-y-auto"
    >
      <v-divider class="mt-3" />
      <v-card-text class="px-2">
        <draggable
          :list="user.loadedPokemon"
          v-bind="dragOptions"
          @start="drag = true"
          @end="endDragEvent"
          item-key="note"
        >
          <template #item="{ element: pokemon, index }">
              <div class="d-flex justify-space-between py-2">
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
            </div>
            </template>
          </draggable>
        </v-card-text>
        
        <v-divider />

      <v-card-actions>
        <v-btn
          :text="$t('close')"
          @click="leaveLoadAndUpdate"
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
          density="compact"
          variant="outlined"
          class="px-2"
          v-model="pokePasteUrl"
          clearable
        />

        <div class="d-flex flex-row-reverse">
          <v-btn
            @click="importFromUrl"
            :disabled="importing"
            class="mb-2 mr-2"
            color="primary"
          >
            {{ $t('submit')}}
          </v-btn>
        </div>
      </form>
    </v-card>
  </v-dialog>
</template>

<style>
</style>
