<script setup lang="ts">
defineProps({
  role: {
    type: String,
    required: true
  }
})
</script>

<template>
  <SelectSheet list-type="Pokemon" :role="role" />
</template>
