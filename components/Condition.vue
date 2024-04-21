<script lang="ts" setup>
// 改成更好讀的variable name
const frequentlyUsedConditions = ['helpingHand', 'burned']
const lessUsedConditions = ['charge', 'critical', 'powerSpot', 'lightScreen', 'reflect', 'steelySpirit', 'friendGuard']
const conditions = frequentlyUsedConditions.concat(lessUsedConditions)
</script>

<template>
  <v-container>
    <v-row>
      <!-- v-for 設在v-col處，由grid system去自動左右排列 -->
      <v-col v-for="(condition, index) in conditions" :key="condition" cols="6" class="pr-0 py-0">
        <!-- color 處保留既有左右不同色的設計 -->
        <v-switch
          :label="$t(`condition.${condition}`)"
          :color="index % 2 === 0 ? 'secondary' : 'primary'"
          :value="condition"
          hide-details
          density="compact"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
