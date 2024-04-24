<script lang="ts" setup>
const props = defineProps({
  role: {
    type: String,
    required: true,
    default: 'attacker',
  }
})
const frequentlyUsedConditions = ['helpingHand', 'burned']
const lessUsedConditions = ['charge', 'critical', 'powerSpot', 'lightScreen', 'reflect', 'steelySpirit', 'hasFriendGuard']
const conditions = frequentlyUsedConditions.concat(lessUsedConditions)

const cd = useConditionStore(props.role)
const pm = usePokemonDataStore(props.role)

function switchCondition(event: Event) {
  if (event.target) {
    const condition = (event.target as HTMLInputElement).value
    cd.conditions[condition] = !cd.conditions[condition]
    if (condition !== 'critical' && condition !== 'burned')
      pm.pokemonRef.setFlags({ [condition]: cd.conditions[condition] })
  }
}
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
          @change="switchCondition"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>

</style>
