<template>
  <div class="admin-sidebar">
    <div class="sidebar-header">
      <h2 class="sidebar-title">Admin Panel</h2>
    </div>
    
    <nav class="sidebar-nav">
      <button
        v-for="item in menuItems"
        :key="item.id"
        class="nav-item"
        :class="{ active: activeSection === item.id }"
        @click="$emit('change-section', item.id)"
      >
        <component :is="item.icon" class="nav-icon" />
        <span class="nav-label">{{ item.label }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import IconAccount from '../icons/IconAccount.vue'
import IconFolder from '../icons/IconFolder.vue'
import IconExtensions from '../icons/IconExtensions.vue'
import IconSettings from '../icons/IconSettings.vue'

defineProps<{
  activeSection: string
}>()

defineEmits<{
  'change-section': [section: 'profile' | 'projects' | 'skills' | 'settings']
}>()

const menuItems = [
  { id: 'profile' as const, label: 'Perfil', icon: IconAccount },
  { id: 'projects' as const, label: 'Proyectos', icon: IconFolder },
  { id: 'skills' as const, label: 'Habilidades', icon: IconExtensions },
  { id: 'settings' as const, label: 'Configuración', icon: IconSettings }
]
</script>

<style scoped>
.admin-sidebar {
  width: 250px;
  background: var(--vscode-sidebar-bg);
  border-right: 1px solid var(--vscode-border);
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-header {
  padding: 20px;
  border-bottom: 1px solid var(--vscode-border);
}

.sidebar-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vscode-text);
  margin: 0;
}

.sidebar-nav {
  padding: 12px 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: var(--vscode-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
}

.nav-item:hover {
  background: var(--vscode-border);
  color: var(--vscode-text);
}

.nav-item.active {
  background: var(--vscode-accent);
  color: #ffffff;
}

.nav-icon {
  width: 20px;
  height: 20px;
  min-width: 20px;
  flex-shrink: 0;
}

.nav-icon :deep(svg) {
  width: 20px;
  height: 20px;
}

.nav-label {
  font-size: 14px;
  font-weight: 500;
}
</style>
