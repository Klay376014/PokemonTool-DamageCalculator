<script lang="ts" setup>
const props = defineProps<{
  pokemon: string[]
}>()
const text = ref('158 ~ 188 (100.0% ~ 119.0%)　確一')
const damageDetail = ref([
  '巨鉗螳螂 252Atk+ 技術高手 子彈拳 vs 振翼髮 220Hp 84Def 158 ~ 188 (100.0% ~ 119.0%)　確一',
])
function copyText() {
  navigator.clipboard.writeText(damageDetail.value[0])
}
</script>

<template>
  <div class="px-3">
    <div class="d-flex align-center justify-space-between">
      <div class="d-flex align-center justify-space-around flex-1-1">
        <v-img
          max-width="50"
          aspect-ratio="1"
          :src="props.pokemon[0]"
        />
        <v-icon icon="mdi-arrow-right-bold" class="text-h4 text-primary" />
        <v-img
          max-width="50"
          aspect-ratio="1"
          :src="props.pokemon[1]"
        />
      </div>

      <div class="d-flex align-center justify-space-between">
        <v-tooltip :text="damageDetail[0]">
          <template #activator="{ props }">
            <v-icon color="primary" v-bind="props" @click="copyText">
              mdi-content-copy
            </v-icon>
          </template>
        </v-tooltip>
        <v-icon color="secondary" class="mx-3" style="cursor: pointer;">
          mdi-close-box
        </v-icon>
      </div>
    </div>
    <div class="d-flex align-center justify-space-between pt-2" style="font-size: 18px;">
      <p>
        {{ text }}
      </p>
    </div>
  </div>
</template>
