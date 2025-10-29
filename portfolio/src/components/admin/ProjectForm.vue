<template>
  <div class="modal-overlay" @click.self="$emit('cancel')">
    <div class="modal-content">
      <div class="modal-header">
        <h3 class="modal-title">{{ isEditing ? 'Editar Proyecto' : 'Nuevo Proyecto' }}</h3>
        <button @click="$emit('cancel')" class="close-btn">
          <IconClose />
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-form">
        <FormField label="Nombre del proyecto" required>
          <input
            v-model="form.title"
            type="text"
            class="form-input"
            placeholder="Mi proyecto increíble"
            required
          />
        </FormField>

        <FormField label="Descripción">
          <textarea
            v-model="form.description"
            class="form-textarea"
            rows="3"
            placeholder="Describe el proyecto..."
          />
        </FormField>

        <ImageUploader
          v-model="form.image"
          label="Imagen del proyecto"
        />

        <FormField label="Tecnologías" hint="Presiona Enter para agregar">
          <div class="tech-input-wrapper">
            <input
              v-model="techInput"
              type="text"
              class="form-input"
              placeholder="Vue.js, TypeScript..."
              @keydown.enter.prevent="addTechnology"
            />
            <button type="button" @click="addTechnology" class="add-btn">
              Agregar
            </button>
          </div>
          <div v-if="form.technologies.length" class="tech-list">
            <span v-for="(tech, index) in form.technologies" :key="index" class="tech-item">
              {{ tech }}
              <button type="button" @click="removeTechnology(index)" class="remove-tech">
                ×
              </button>
            </span>
          </div>
        </FormField>

        <FormField label="URL del proyecto">
          <input
            v-model="form.projectUrl"
            type="url"
            class="form-input"
            placeholder="https://mi-proyecto.com"
          />
        </FormField>

        <FormField label="GitHub">
          <input
            v-model="form.githubUrl"
            type="url"
            class="form-input"
            placeholder="https://github.com/usuario/proyecto"
          />
        </FormField>

        <div class="modal-actions">
          <button type="button" @click="$emit('cancel')" class="btn btn-secondary">
            Cancelar
          </button>
          <button type="submit" class="btn btn-primary">
            {{ isEditing ? 'Actualizar' : 'Crear' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { type Project } from '../../services/api'
import IconClose from '../icons/IconClose.vue'
import FormField from './FormField.vue'
import ImageUploader from './ImageUploader.vue'

const props = defineProps<{
  project?: Project | null
}>()

const emit = defineEmits<{
  'save': [project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>]
  'cancel': []
}>()

const form = ref({
  title: '',
  description: '',
  image: '',
  projectUrl: '',
  githubUrl: '',
  technologies: [] as string[]
})

const techInput = ref('')

const isEditing = computed(() => !!props.project)

const addTechnology = () => {
  const tech = techInput.value.trim()
  if (tech && !form.value.technologies.includes(tech)) {
    form.value.technologies.push(tech)
    techInput.value = ''
  }
}

const removeTechnology = (index: number) => {
  form.value.technologies.splice(index, 1)
}

const handleSubmit = () => {
  emit('save', {
    title: form.value.title,
    description: form.value.description,
    image: form.value.image || 'https://via.placeholder.com/400',
    projectUrl: form.value.projectUrl,
    githubUrl: form.value.githubUrl,
    technologies: form.value.technologies
  })
}

onMounted(() => {
  if (props.project) {
    form.value = {
      title: props.project.title,
      description: props.project.description,
      image: props.project.image,
      projectUrl: props.project.projectUrl,
      githubUrl: props.project.githubUrl,
      technologies: [...props.project.technologies]
    }
  }
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: var(--vscode-editor-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 24px;
  border-bottom: 1px solid var(--vscode-border);
}

.modal-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--vscode-text);
  margin: 0;
}

.close-btn {
  padding: 4px;
  background: transparent;
  border: none;
  color: var(--vscode-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.close-btn:hover {
  color: var(--vscode-text);
}

.close-btn :deep(svg) {
  width: 20px;
  height: 20px;
}

.modal-form {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 10px 12px;
  background: var(--vscode-sidebar-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 4px;
  color: var(--vscode-text);
  font-size: 14px;
  font-family: inherit;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--vscode-accent);
}

.form-textarea {
  resize: vertical;
}

.tech-input-wrapper {
  display: flex;
  gap: 8px;
}

.add-btn {
  padding: 10px 16px;
  background: var(--vscode-accent);
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap;
}

.add-btn:hover {
  background: var(--vscode-accent-hover);
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 8px;
}

.tech-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  background: var(--vscode-sidebar-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 4px;
  font-size: 13px;
  color: var(--vscode-text);
}

.remove-tech {
  background: none;
  border: none;
  color: var(--vscode-text-secondary);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  padding: 0;
}

.remove-tech:hover {
  color: var(--vscode-git-deleted);
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}

.btn {
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
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
</style>
