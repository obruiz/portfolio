<template>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :style="{ transform: `rotate(${rotation}deg)` }">
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  direction: 'up' | 'down' | 'left' | 'right'
}>()

const rotation = computed(() => {
  switch (props.direction) {
    case 'up': return -90
    case 'down': return 90
    case 'left': return 180
    case 'right': return 0
    default: return 0
  }
})
</script>

<style scoped>
svg {
  display: block;
  max-width: 100%;
  max-height: 100%;
  width: 100%;
  height: 100%;
}
</style>
