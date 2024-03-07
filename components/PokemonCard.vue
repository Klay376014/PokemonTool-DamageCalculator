<script setup lang="ts">
import json from '../locales/en.json'

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
      <selection list-type="Move" />
      <v-card-actions>
        <v-btn
          color="purple-lighten-2"
          class="font-weight-bold"
        >
          {{ $t("condition") }}
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
          <client-only>
            <v-container class="px-0">
              <v-row>
                <v-col cols="12" sm="6">
                  <selection list-type="Item" />
                </v-col>
                <v-col cols="12" sm="6">
                  <selection list-type="Ability" />
                </v-col>
              </v-row>
            </v-container>
          </client-only>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<style></style>
