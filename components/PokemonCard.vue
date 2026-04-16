<script setup lang="ts">
import { useSwapPokemon } from '~/composables/useSwapPokemon'

const props = defineProps({
  role: {
    type: String,
    required: true,
    default: 'attacker'
  }
})
const show = ref(false)

const attackerData = usePokemonDataStore('attacker')
const defenderData = usePokemonDataStore('defender')
const { swap } = useSwapPokemon()
const canSwap = computed(() =>
  Boolean(attackerData.pokemonRef.name && defenderData.pokemonRef.name)
)
</script>

<template>
  <div>
    <v-card
      class="mx-2 px-0 px-lg-4"
    >
      <pokemon-info :role="props.role" />
      <div class="d-flex align-center">
        <div style="flex: 1; min-width: 0;">
          <pokemon-select :role="props.role" />
        </div>
        <v-btn
          icon="mdi-swap-horizontal"
          variant="outlined"
          color="warning"
          size="small"
          :disabled="!canSwap"
          :title="$t('swapPokemon')"
          class="mx-2 mt-2 flex-shrink-0"
          @click="swap"
        />
      </div>
      <pokemon-stat :role="props.role" />
      <v-container class="px-0 py-2">
        <v-row no-gutters>
          <v-col cols="6" class="pb-0 pr-1">
            <selection list-type="Move" :role="props.role"/>
          </v-col>
          <v-col cols="6" class="pb-0 pl-1">
            <selection list-type="Item" :role="props.role" />
          </v-col>
        </v-row>
        <v-row no-gutters class="mt-1 mb-2">
          <v-col cols="6" class="pb-0 pr-1">
            <selection list-type="Ability" :role="props.role" />
          </v-col>
          <v-col cols="6" class="pb-0 pl-1 d-flex justify-end align-center">
            <v-card-actions class="py-0">
              <v-btn
                color="primary-darken-1"
                class="font-weight-bold"
                disabled
                :text="$t('condition.title')"
              />
              <v-btn
                :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                @click="show = !show"
              />
            </v-card-actions>
          </v-col>
        </v-row>
      </v-container>

      <v-expand-transition>
        <div v-show="show">
          <v-divider />
          <condition :role="props.role" />
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<style scope>
.v-btn--disabled {
  pointer-events: none;
  opacity: 1;
}
.v-btn--disabled:hover {
  opacity: 1;
}
</style>
