<script lang="ts" setup>
import json from '../locales/en.json'

const props = defineProps({
  teraType: String
})
const emit = defineEmits(['changeTeraType'])

const dialog = ref(false)
const currentTeraType = ref(props.teraType)
// 移除 none
const typeList = Object.keys(json.type)

function changeTeraType(reset?: boolean) {
  dialog.value = false
  if (reset)
    currentTeraType.value = 'none'
  emit('changeTeraType', currentTeraType.value)
}
</script>

<template>
  <v-img
    max-width="24"
    max-height="24"
    src="/terastal.webp"
    style="cursor:pointer"
    class="ms-1"
    @click="dialog = true"
  />

  <v-dialog
    v-model="dialog"
    max-width="400"
    scrollable
  >
    <v-card
      :title="$t('chooseTera')"
    >
      <v-divider class="mt-1" />

      <v-card-text class="px-0 py-0" style="height: 360px;">
        <v-radio-group
          v-model="currentTeraType"
          inline
          hide-details
          class="p-0"
        >
          <v-container class="p-0">
            <v-row dense>
              <v-col v-for="type in typeList" :key="type" cols="4" style="padding:0 0 10px 0;">
                <v-radio
                  :label="$t(`type.${type}`)"
                  :value="type"
                  density="compact"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-radio-group>
      </v-card-text>

      <v-divider />

      <v-card-actions>
        <v-btn
          text="Close"
          @click="dialog = !dialog"
        />

        <v-spacer />

        <v-btn
          color="secondary"
          text="Reset"
          variant="flat"
          @click="changeTeraType(true)"
        />
        <v-btn
          color="primary"
          text="Save"
          variant="flat"
          @click="changeTeraType()"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.v-label.v-label--clickable {
  font-size: 14px !important;
}
</style>
