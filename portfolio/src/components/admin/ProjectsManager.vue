<template>
  <div class="projects-manager">
    <div class="manager-header">
      <button @click="showCreateForm = true" class="btn btn-primary">
        <IconFolder />
        <span>Nuevo Proyecto</span>
      </button>
    </div>

    <div v-if="projects.length === 0" class="empty-state">
      <IconFolder class="empty-icon" />
      <p class="empty-text">No hay proyectos aún</p>
      <button @click="showCreateForm = true" class="btn btn-secondary">
        Crear primer proyecto
      </button>
    </div>

    <div v-else class="projects-grid">
      <ProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project"
        @edit="handleEdit"
        @delete="handleDelete"
      />
    </div>

    <ProjectForm
      v-if="showCreateForm || editingProject"
      :project="editingProject"
      @save="handleSave"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiService, type Project } from '../../services/api'
import IconFolder from '../icons/IconFolder.vue'
import ProjectCard from './ProjectCard.vue'
import ProjectForm from './ProjectForm.vue'

const projects = ref<Project[]>([])
const showCreateForm = ref(false)
const editingProject = ref<Project | null>(null)
const loading = ref(false)
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

const handleEdit = (project: Project) => {
  editingProject.value = project
}

const handleDelete = async (projectId: string) => {
  if (!confirm('¿Estás seguro de eliminar este proyecto?')) return
  
  try {
    await apiService.deleteProject(projectId)
    await loadProjects() // Recargar la lista
  } catch (err) {
    console.error('Error deleting project:', err)
    alert('Error al eliminar el proyecto')
  }
}

const handleSave = async (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    if (editingProject.value) {
      // Actualizar proyecto existente
      await apiService.updateProject(editingProject.value.id, projectData)
    } else {
      // Crear nuevo proyecto
      await apiService.createProject(projectData)
    }
    await loadProjects() // Recargar la lista
    handleCancel()
  } catch (err) {
    console.error('Error saving project:', err)
    alert('Error al guardar el proyecto')
  }
}

const handleCancel = () => {
  showCreateForm.value = false
  editingProject.value = null
}

onMounted(() => {
  loadProjects()
})
</script>

<style scoped>
.projects-manager {
  max-width: 1200px;
}

.manager-header {
  margin-bottom: 24px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-primary {
  background: var(--vscode-accent);
  color: #ffffff;
}

.btn-primary:hover {
  background: var(--vscode-accent-hover);
}

.btn-secondary {
  background: transparent;
  color: var(--vscode-text);
  border: 1px solid var(--vscode-border);
}

.btn-secondary:hover {
  background: var(--vscode-border);
}

.btn :deep(svg) {
  width: 18px;
  height: 18px;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
}

.empty-icon {
  width: 64px;
  height: 64px;
  color: var(--vscode-text-secondary);
  opacity: 0.5;
  margin-bottom: 16px;
}

.empty-icon :deep(svg) {
  width: 64px;
  height: 64px;
}

.empty-text {
  font-size: 16px;
  color: var(--vscode-text-secondary);
  margin: 0 0 24px 0;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style>
