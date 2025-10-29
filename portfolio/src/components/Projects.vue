<template>
  <div class="projects-container">
    <div class="projects-header">
      <h2 class="header-title">Proyectos</h2>
      <button class="refresh-button" @click="loadProjects" :disabled="loading">
        <IconSync />
      </button>
    </div>

    <div class="projects-content">
      <!-- Loading -->
      <div v-if="loading" class="status-message">
        <div class="spinner"></div>
        <span>Cargando proyectos...</span>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="status-message error">
        <IconError />
        <span>{{ error }}</span>
        <button @click="loadProjects" class="retry-button">Reintentar</button>
      </div>

      <!-- Projects List -->
      <div v-else-if="projects.length > 0" class="projects-list">
        <div 
          v-for="(project, index) in projects" 
          :key="project.id"
          class="project-row"
          :class="{ 'reverse': index % 2 === 1 }"
        >
          <!-- Contenido del proyecto -->
          <div class="project-content">
            <div class="project-number">{{ String(index + 1).padStart(2, '0') }}</div>
            <h3 class="project-title">{{ project.title }}</h3>
            <p class="project-description">{{ project.description }}</p>
            
            <div v-if="project.technologies.length" class="tech-list">
              <span v-for="tech in project.technologies" :key="tech" class="tech-tag">
                {{ tech }}
              </span>
            </div>

            <div class="project-actions">
              <a
                v-if="project.projectUrl"
                :href="project.projectUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="action-button primary"
              >
                <IconExternal />
                <span>Ver proyecto</span>
              </a>
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="action-button secondary"
              >
                <IconGithub />
                <span>Código</span>
              </a>
            </div>
          </div>

          <!-- Imagen del proyecto -->
          <div class="project-image-container">
            <div class="project-image" v-if="project.image">
              <img :src="project.image" :alt="project.title" />
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="empty-state">
        <IconFolder class="empty-icon" />
        <h3 class="empty-title">No hay proyectos aún</h3>
        <p class="empty-text">Los proyectos aparecerán aquí cuando se agreguen.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiService, type Project } from '../services/api'
import IconSync from './icons/IconSync.vue'
import IconError from './icons/IconError.vue'
import IconExternal from './icons/IconExternal.vue'
import IconGithub from './icons/IconGithub.vue'
import IconFolder from './icons/IconFolder.vue'

const projects = ref<Project[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const loadProjects = async () => {
  try {
    loading.value = true
    error.value = null
    projects.value = await apiService.getProjects()
  } catch (err) {
    console.error('Error loading projects:', err)
    error.value = err instanceof Error ? err.message : 'Error desconocido'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadProjects()
})
</script>

<style scoped>
.projects-container {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--vscode-editor-bg);
}

.projects-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  border-bottom: 1px solid var(--vscode-border);
}

.header-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--vscode-text);
  margin: 0;
}

.refresh-button {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--vscode-border);
  border-radius: 6px;
  color: var(--vscode-text-secondary);
  cursor: pointer;
  transition: all 0.2s;
}

.refresh-button:hover:not(:disabled) {
  background: var(--vscode-border);
  color: var(--vscode-accent);
}

.refresh-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.refresh-button :deep(svg) {
  width: 18px;
  height: 18px;
  min-width: 18px;
  max-width: 18px;
  min-height: 18px;
  max-height: 18px;
  display: block;
}

.projects-content {
  flex: 1;
  overflow-y: auto;
  padding: 60px 32px;
}

.status-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 80px 20px;
  color: var(--vscode-text-secondary);
  font-size: 14px;
}

.status-message.error {
  color: var(--vscode-git-deleted);
}

.status-message :deep(svg) {
  width: 32px;
  height: 32px;
  min-width: 32px;
  max-width: 32px;
  min-height: 32px;
  max-height: 32px;
  display: block;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid var(--vscode-border);
  border-top-color: var(--vscode-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.retry-button {
  margin-top: 8px;
  padding: 8px 20px;
  background: var(--vscode-accent);
  border: none;
  border-radius: 6px;
  color: #ffffff;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.retry-button:hover {
  background: var(--vscode-accent-hover);
  transform: translateY(-2px);
}

.projects-list {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 120px;
}

.project-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  position: relative;
}

.project-row.reverse {
  direction: rtl;
}

.project-row.reverse > * {
  direction: ltr;
}

.project-content {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.project-number {
  font-size: 14px;
  font-weight: 700;
  color: var(--vscode-accent);
  letter-spacing: 2px;
}

.project-title {
  font-size: 32px;
  font-weight: 700;
  color: var(--vscode-text);
  margin: 0;
  line-height: 1.2;
}

.project-description {
  font-size: 16px;
  line-height: 1.7;
  color: var(--vscode-text-secondary);
  margin: 0;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 8px;
}

.tech-tag {
  padding: 6px 16px;
  background: var(--vscode-sidebar-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 20px;
  font-size: 13px;
  color: var(--vscode-accent);
  font-weight: 500;
  transition: all 0.2s;
}

.tech-tag:hover {
  background: var(--vscode-accent);
  color: #ffffff;
  transform: translateY(-2px);
}

.project-actions {
  display: flex;
  gap: 16px;
  margin-top: 12px;
}

.action-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s;
  cursor: pointer;
}

.action-button.primary {
  background: var(--vscode-accent);
  color: #ffffff;
  border: 2px solid var(--vscode-accent);
}

.action-button.primary:hover {
  background: transparent;
  color: var(--vscode-accent);
  transform: translateY(-2px);
}

.action-button.secondary {
  background: transparent;
  color: var(--vscode-text);
  border: 2px solid var(--vscode-border);
}

.action-button.secondary:hover {
  background: var(--vscode-border);
  border-color: var(--vscode-accent);
  color: var(--vscode-accent);
  transform: translateY(-2px);
}

.action-button :deep(svg) {
  width: 18px;
  height: 18px;
  min-width: 18px;
  max-width: 18px;
  min-height: 18px;
  max-height: 18px;
  display: block;
}

.project-image-container {
  position: relative;
}

.project-image {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  transition: all 0.4s ease;
}

.project-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, var(--vscode-accent) 0%, transparent 100%);
  opacity: 0.1;
  transition: opacity 0.3s;
  z-index: 1;
}

.project-row:hover .project-image {
  transform: translateY(-8px);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
}

.project-row:hover .project-image::before {
  opacity: 0.2;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}

.project-row:hover .project-image img {
  transform: scale(1.05);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
}

.empty-icon {
  width: 64px;
  height: 64px;
  color: var(--vscode-text-secondary);
  opacity: 0.4;
  margin-bottom: 24px;
}

.empty-icon :deep(svg) {
  width: 64px;
  height: 64px;
  min-width: 64px;
  max-width: 64px;
  min-height: 64px;
  max-height: 64px;
  display: block;
}

.empty-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--vscode-text);
  margin: 0 0 8px 0;
}

.empty-text {
  font-size: 14px;
  color: var(--vscode-text-secondary);
  margin: 0;
}

@media (max-width: 768px) {
  .projects-content {
    padding: 40px 20px;
  }

  .projects-list {
    gap: 80px;
  }

  .project-row {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .project-row.reverse {
    direction: ltr;
  }

  .project-title {
    font-size: 24px;
  }

  .project-description {
    font-size: 14px;
  }

  .project-actions {
    flex-direction: column;
  }

  .action-button {
    width: 100%;
  }

  .projects-header {
    padding: 20px 16px;
  }

  .header-title {
    font-size: 20px;
  }
}
</style>
