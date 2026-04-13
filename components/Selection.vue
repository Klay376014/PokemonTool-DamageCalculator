<script setup lang="ts">
import type { AssetType } from '~/composables/useAssetKeyToContext'

defineProps({
  listType: {
    type: String as PropType<AssetType>,
    required: true
  },
  role: {
    type: String,
    required: true
  }
})
</script>

<template>
  <SelectSheet :list-type="listType" :role="role" />
</template>
