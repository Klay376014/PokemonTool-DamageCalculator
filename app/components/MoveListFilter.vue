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
    <p class="pt-4 w-auto">{{ $t('filter') }}</p>
    <v-checkbox @change="switchFilter" :color="props.role === 'attacker' ? 'primary' : 'secondary'" class="pr-1"></v-checkbox>
  </div>
  
</template>