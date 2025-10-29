<template>
  <div class="status-message" :class="type">
    <component :is="icon" class="status-icon" />
    <span class="status-text">{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import IconCheck from '../icons/IconCheck.vue'
import IconError from '../icons/IconError.vue'

const props = defineProps<{
  type: 'success' | 'error'
  message: string
}>()

const icon = computed(() => {
  return props.type === 'success' ? IconCheck : IconError
})
</script>

<style scoped>
.status-message {
  position: fixed;
  bottom: 24px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  animation: slideIn 0.3s ease-out;
  z-index: 1000;
}

.status-message.success {
  background: var(--vscode-git-added);
  color: #ffffff;
}

.status-message.error {
  background: var(--vscode-git-deleted);
  color: #ffffff;
}

.status-icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}

.status-icon :deep(svg) {
  width: 20px;
  height: 20px;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
