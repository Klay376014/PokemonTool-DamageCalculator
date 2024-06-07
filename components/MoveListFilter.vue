<script lang="ts" setup>
const props = defineProps({
  role: {
    type: String,
    required: true
  }
})

const cd = useConditionStore(props.role)

const switchFilter = () => {
  cd.switchFilter = !cd.switchFilter
}
</script>

<template>
  <div class="d-flex justify-space-between">
    <p class="pt-4">{{ $t('filter') }}</p>
    <div class="w-50">
      <v-checkbox @change="switchFilter" :color="props.role === 'attacker' ? 'primary' : 'secondary'"></v-checkbox>
    </div>
  </div>
  
</template>