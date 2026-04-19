<script setup lang="ts">
import { getTypeColor } from '~/utils/typeColors'

type ChipSize = 'xs' | 'sm' | 'md' | 'lg'

const sizeMap: Record<ChipSize, string> = {
  xs: '10px',
  sm: '12px',
  md: '14px',
  lg: '18px',
}

const props = withDefaults(defineProps<{ type: string; size?: ChipSize }>(), {
  size: 'xs',
})

const colors = computed(() => getTypeColor(props.type))
const fontSize = computed(() => sizeMap[props.size])
</script>

<template>
  <span class="type-chip" :style="{ background: colors.bg, color: colors.textColor, fontSize }">
    {{ $t(`type.${type}`) }}
  </span>
</template>

<style scoped>
.type-chip {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  border-radius: 20px;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-transform: uppercase;
}
</style>
