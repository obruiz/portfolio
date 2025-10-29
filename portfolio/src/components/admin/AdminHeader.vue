<template>
  <div class="admin-header">
    <h1 class="header-title">{{ sectionTitle }}</h1>
    <button class="logout-button" @click="$emit('logout')">
      <IconClose />
      <span>Cerrar sesión</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import IconClose from '../icons/IconClose.vue'

defineProps<{
  sectionTitle: string
}>()

defineEmits<{
  'logout': []
}>()
</script>

<style scoped>
.admin-header {
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: var(--vscode-tab-bg);
  border-bottom: 1px solid var(--vscode-border);
  flex-shrink: 0;
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--vscode-text);
  margin: 0;
}

.logout-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: transparent;
  border: 1px solid var(--vscode-border);
  border-radius: 4px;
  color: var(--vscode-text);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.logout-button:hover {
  background: var(--vscode-border);
  border-color: var(--vscode-accent);
  color: var(--vscode-accent);
}

.logout-button :deep(svg) {
  width: 16px;
  height: 16px;
}
</style>
