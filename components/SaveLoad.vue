<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { getPokemonsFromPasteUrl, type Pokemon } from 'vgc_data_wrapper'
import draggable from 'vuedraggable'
import { effectByEviolite } from '~/utils/evioliteMap'
import { internalToDisplay } from '~/utils/evConversion'
import { useLocalStorage } from '@vueuse/core';
import type { Stats } from '~/utils/schema'
draggable.compatConfig = { MODE: 3 }

const { t } = useI18n()
type NatureType = Pokemon['nature']
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
const loadedPokemon = useLocalStorage("savedPokemon", [] as PokemonWithNote[])
const selectedPokemonEV = ref({})
const selectedPokemonNature = ref({})

const openSaveDialog = () => {
  if (!pm.pokemonRef.name) {
    window.alert(t('noPokemonSelected'))
  } else {
    note.value = ''
    dialogSave.value = true
  }
}

const savePokemon = (pokemons: PokemonWithNote | PokemonWithNote[]) => {
  loadedPokemon.value = loadedPokemon.value.concat(pokemons)
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
    const { name, baseStat, effortValues, types, sprite, weight, item, nature } = loadedPokemon.value[index]
    selectedPokemonEV.value = { ...effortValues }
    selectedPokemonNature.value = { ...nature }
    pm.pokemonRef.effortValues = selectedPokemonEV.value as unknown as Stats
    pm.pokemonRef.nature = selectedPokemonNature.value as unknown as NatureType
    pm.setPokemon(name!.toLowerCase().replace(' ', '-'), baseStat, types, sprite!, weight, item)
    if (name) pm.pokemonRef.setFlags({ hasEvolution: effectByEviolite(name) })
  }
  dialogLoad.value = false
}

const deleteSelectedPokemon = (index: number) => {
  loadedPokemon.value.splice(index, 1)
  openLoadDialog()
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

const natureOperator = (nature: NatureType, stat: string) => {
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

</script>

<template>
  <div class="d-flex justify-center ga-2">
    <v-btn
      variant="outlined"
      color="primary"
      size="small"
      prepend-icon="mdi-content-save"
      @click="openSaveDialog"
    >{{ $t('pokemonSave') }}</v-btn>
    <v-btn
      variant="outlined"
      color="secondary"
      size="small"
      prepend-icon="mdi-import"
      @click="openLoadDialog"
    >{{ $t('pokemonLoad') }}</v-btn>
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
          :list="loadedPokemon"
          v-bind="dragOptions"
          @start="drag = true"
          @end="drag = false"
          item-key="note"
        >
          <template #item="{ element: pokemon, index }">
            <div class="pokemon-row d-flex align-center justify-space-between px-2 py-2 mb-1">
              <v-img
                max-width="44"
                :aspect-ratio="1"
                :src="pokemon.sprite"
                class="pokemon-sprite flex-grow-0"
              >
                <v-tooltip
                  v-if="pokemon.note"
                  activator="parent"
                  location="top"
                >{{ $te(pokemon.note) ? $t(pokemon.note) : pokemon.note }}</v-tooltip>
              </v-img>
              <div class="ev-col text-caption">
                <p>{{ `H${internalToDisplay(pokemon.effortValues.hp)}` }}</p>
                <p>{{ `C${internalToDisplay(pokemon.effortValues.specialAttack)}${natureOperator(pokemon.nature, 'specialAttack')}` }}</p>
              </div>
              <div class="ev-col text-caption">
                <p>{{ `A${internalToDisplay(pokemon.effortValues.attack)}${natureOperator(pokemon.nature, 'attack')}` }}</p>
                <p>{{ `D${internalToDisplay(pokemon.effortValues.specialDefense)}${natureOperator(pokemon.nature, 'specialDefense')}` }}</p>
              </div>
              <div class="ev-col text-caption">
                <p>{{ `B${internalToDisplay(pokemon.effortValues.defense)}${natureOperator(pokemon.nature, 'defense')}` }}</p>
                <p>{{ `S${internalToDisplay(pokemon.effortValues.speed)}${natureOperator(pokemon.nature, 'speed')}` }}</p>
              </div>
              <div class="d-flex align-center ga-1">
                <v-btn icon="mdi-import" color="primary" variant="tonal" size="28" @click="loadSelectedPoekmon(index)" />
                <v-btn icon="mdi-trash-can-outline" color="error" variant="tonal" size="28" @click="deleteSelectedPokemon(index)" />
              </div>
            </div>
          </template>
        </draggable>
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
      :text="$t('pokemonSaveConfirm')"
      :title="$t('pokemonSave')"
      class="px-2 pb-2"
    >
      <v-card-text class="px-4 pt-0 pb-3">
        <v-text-field
          v-model="note"
          :label="$t('writeNote')"
          variant="outlined"
          color="primary"
          density="compact"
          hide-details
        />
      </v-card-text>
      <v-divider />
      <v-card-actions class="px-4 pt-3">
        <v-btn
          variant="outlined"
          :text="$t('close')"
          @click="dialogSave = false"
        />
        <v-btn
          color="primary"
          variant="flat"
          class="ms-auto"
          :text="$t('confirm')"
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

<style scoped>
/* .pokemon-row is rendered directly by this component's VNode inside <draggable>.
   Vue attaches this file's scoped attribute to it, so `scoped` works correctly. */
.pokemon-row {
  border-radius: 8px;
  background: rgba(var(--v-theme-on-surface), 0.04);
  border: 1px solid rgba(var(--v-border-color), 0.08);
}
.pokemon-sprite {
  border-radius: 6px;
}
.ev-col {
  line-height: 1.5;
  min-width: 32px;
  flex-shrink: 0;
}
</style>
