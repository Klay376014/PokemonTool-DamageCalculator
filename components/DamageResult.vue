<script lang="ts" setup>
import { useDisplay } from 'vuetify'

const isOpen = ref(true)
const { lgAndUp } = useDisplay()
</script>

<template>
  <div class="damage-bottom-panel" :style="lgAndUp ? { right: '300px' } : {}">
    <div class="damage-handle" @click="isOpen = !isOpen">
      <v-icon size="x-small" class="mr-1">
        {{ isOpen ? 'mdi-chevron-down' : 'mdi-chevron-up' }}
      </v-icon>
      <span class="text-caption">{{ $t('damageResult') }}</span>
    </div>
    <div v-show="isOpen" class="damage-content">
      <damage-text :pokemon="['attacker', 'defender']" class="w-100 h-100" />
    </div>
  </div>
</template>

<style scoped>
.damage-bottom-panel {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgb(var(--v-theme-surface));
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.damage-handle {
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;
  opacity: 0.7;
}

.damage-handle:hover {
  opacity: 1;
}

.damage-content {
  height: 100px;
  display: flex;
  align-items: center;
}
</style>
