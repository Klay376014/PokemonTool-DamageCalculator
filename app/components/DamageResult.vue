<script lang="ts" setup>
import { useDisplay } from 'vuetify'

const isOpen = ref(true)
const { lgAndUp } = useDisplay()

const attackerStore = usePokemonDataStore('attacker')
const defenderStore = usePokemonDataStore('defender')
</script>

<template>
  <div class="damage-bottom-panel" :style="lgAndUp ? { right: '300px' } : {}">
    <div class="damage-handle" @click="isOpen = !isOpen">
      <v-icon size="x-small" class="mr-1">
        {{ isOpen ? 'mdi-chevron-down' : 'mdi-chevron-up' }}
      </v-icon>
      <span class="text-caption">{{ $t('damageResult') }}</span>
    </div>
    <div v-show="isOpen" class="damage-content" :class="lgAndUp ? 'flex-row' : 'flex-column'">
      <!-- 2→1 reverse：行動版排序 1（最上），桌面版排序 2（右欄） -->
      <damage-text
        :pokemon="['defender', 'attacker']"
        :show-sprites="lgAndUp"
        direction="reverse"
        class="w-100 h-100 damage-reverse"
      />

      <!-- 行動版：共用 sprite，排序 2（中間） -->
      <div v-if="!lgAndUp" class="shared-sprites d-flex align-center justify-center">
        <v-img width="40" max-width="40" aspect-ratio="1" :src="attackerStore.pokemonRef.sprite" />
        <v-icon icon="mdi-swap-horizontal" class="mx-3 text-h5 text-medium-emphasis" />
        <v-img width="40" max-width="40" aspect-ratio="1" :src="defenderStore.pokemonRef.sprite" />
      </div>

      <!-- 1→2 forward：行動版排序 3（最下），桌面版排序 1（左欄） -->
      <damage-text
        :pokemon="['attacker', 'defender']"
        :show-sprites="lgAndUp"
        direction="forward"
        class="w-100 h-100 damage-forward"
      />
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
  display: flex;
  height: 115px;
}

.shared-sprites {
  height: 48px;
  flex-shrink: 0;
  order: 2;
}

/* 行動版：forward 上、sprites 中、reverse 下 */
.damage-forward { order: 1; }
.damage-reverse { order: 3; }

@media (min-width: 1280px) {
  .damage-content {
    height: 100px;
    align-items: center;
  }

  /* 桌面版：forward 左、reverse 右 */
  .damage-forward { order: 1; }
  .damage-reverse { order: 2; }
}
</style>
