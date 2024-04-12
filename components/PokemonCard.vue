<script setup lang="ts">
const props = defineProps({
  role: {
    type: String,
    required: true,
    default: 'attacker'
  }
})
const show = ref(false)
</script>

<template>
  <div>
    <v-card
      class="mx-0 px-0 px-lg-4"
    >
      <pokemon-info />
      <pokemon-select />
      <pokemon-stat :role="props.role" />
      <selection list-type="Move" />
      <v-card-actions class="py-0">
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
          <v-container class="px-0 py-2">
            <v-row>
              <v-col cols="12" sm="6" class="pb-0 pb-sm-2">
                <selection list-type="Item" />
              </v-col>
              <v-col cols="12" sm="6" class="pb-0 pb-sm-2">
                <selection list-type="Ability" />
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
