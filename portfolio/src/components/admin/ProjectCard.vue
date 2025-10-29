<template>
  <div class="project-card">
    <div class="card-content">
      <h4 class="project-name">{{ project.name }}</h4>
      <p class="project-description">{{ project.description }}</p>
      
      <div v-if="project.technologies.length" class="project-technologies">
        <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
          {{ tech }}
        </span>
      </div>
    </div>

    <div class="card-actions">
      <button @click="$emit('edit', project)" class="action-btn">
        <IconFile />
      </button>
      <button @click="$emit('delete', project.id)" class="action-btn delete">
        <IconClose />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconFile from '../icons/IconFile.vue'
import IconClose from '../icons/IconClose.vue'

defineProps<{
  project: {
    id: string
    name: string
    description: string
    technologies: string[]
    url?: string
    github?: string
  }
}>()

defineEmits<{
  'edit': [project: any]
  'delete': [id: string]
}>()
</script>

<style scoped>
.project-card {
  background: var(--vscode-sidebar-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 8px;
  padding: 20px;
  transition: all 0.2s;
}

.project-card:hover {
  border-color: var(--vscode-accent);
  transform: translateY(-2px);
}

.card-content {
  margin-bottom: 16px;
}

.project-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--vscode-text);
  margin: 0 0 8px 0;
}

.project-description {
  font-size: 14px;
  color: var(--vscode-text-secondary);
  margin: 0 0 12px 0;
  line-height: 1.5;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tech-tag {
  padding: 4px 8px;
  background: var(--vscode-editor-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 4px;
  font-size: 12px;
  color: var(--vscode-text-secondary);
}

.card-actions {
  display: flex;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid var(--vscode-border);
}

.action-btn {
  padding: 8px;
  background: var(--vscode-editor-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 4px;
  color: var(--vscode-text);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.action-btn:hover {
  background: var(--vscode-border);
  border-color: var(--vscode-accent);
}

.action-btn.delete:hover {
  border-color: var(--vscode-git-deleted);
  color: var(--vscode-git-deleted);
}

.action-btn :deep(svg) {
  width: 16px;
  height: 16px;
}
</style>
