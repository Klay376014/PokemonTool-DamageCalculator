<script lang="ts" setup>
const switchGroup1 = ['helpingHand', 'burned', 'charge', 'critical', 'powerSpot']
const switchGroup2 = ['lightScreen', 'reflect', 'steelySpirit', 'friendGuard']
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="6" class="pr-0">
        <v-switch
          v-for="switchInfo in switchGroup1"
          :key="switchInfo"
          :label="$t(`condition.${switchInfo}`)"
          color="secondary"
          :value="switchInfo"
          hide-details
          density="comfortable"
        />
      </v-col>
      <v-col cols="6" class="pl-0">
        <v-switch
          v-for="switchInfo in switchGroup2"
          :key="switchInfo"
          :label="$t(`condition.${switchInfo}`)"
          color="primary"
          :value="switchInfo"
          hide-details
          density="comfortable"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
  .v-switch.v-label {
    font-size: 14px !important;
  }
</style>
