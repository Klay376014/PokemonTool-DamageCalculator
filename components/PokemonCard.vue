<script setup lang="ts">
import { abilityProps, itemsProps, movesProps } from '~/composables/useAssetKeyToContext'

const show = ref(false)
</script>

<template>
  <div>
    <v-card
      class="mx-0 px-0 px-lg-4"
    >
      <pokemon-info />
      <pokemon-select />
      <pokemon-stat />
      <selection list-type="Move" :convert-item-props="movesProps" />
      <v-card-actions>
        <v-btn
          color="purple-lighten-2"
          class="font-weight-bold"
          disabled
        >
          {{ $t("condition.title") }}
        </v-btn>

        <v-spacer />

        <v-btn
          :icon="show ? 'mdi-chevron-up' : 'mdi-chevron-down'"
          @click="show = !show"
        />
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider />
          <v-container class="px-0">
            <v-row>
              <v-col cols="12" sm="6" class="pb-0 pb-sm-2">
                <selection list-type="Item" :convert-item-props="itemsProps" />
              </v-col>
              <v-col cols="12" sm="6" class="pb-0 pb-sm-2">
                <selection list-type="Ability" :convert-item-props="abilityProps" />
              </v-col>
            </v-row>
          </v-container>
          <condition />
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
