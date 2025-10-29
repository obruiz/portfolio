<template>
  <div class="profile-editor">
    <div class="editor-card">
      <h3 class="card-title">Información Personal</h3>
      
      <form @submit.prevent="handleSave" class="editor-form">
        <FormField label="Nombre completo" required>
          <input
            v-model="form.fullName"
            type="text"
            class="form-input"
            placeholder="Tu nombre completo"
          />
        </FormField>

        <FormField label="Título profesional" required>
          <input
            v-model="form.title"
            type="text"
            class="form-input"
            placeholder="Ej: Designer & Developer"
          />
        </FormField>

        <FormField label="Descripción">
          <textarea
            v-model="form.description"
            class="form-textarea"
            rows="4"
            placeholder="Describe tu trabajo y experiencia..."
          />
        </FormField>

        <FormField label="Email" required>
          <input
            v-model="form.email"
            type="email"
            class="form-input"
            placeholder="tu@email.com"
          />
        </FormField>

        <FormField label="LinkedIn">
          <input
            v-model="form.linkedin"
            type="url"
            class="form-input"
            placeholder="https://linkedin.com/in/tu-perfil"
          />
        </FormField>

        <div class="form-actions">
          <button type="button" @click="handleCancel" class="btn btn-secondary">
            Cancelar
          </button>
          <button type="submit" class="btn btn-primary" :disabled="saving">
            {{ saving ? 'Guardando...' : 'Guardar cambios' }}
          </button>
        </div>
      </form>
    </div>

    <StatusMessage v-if="statusMessage" :type="statusType" :message="statusMessage" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiService, type Profile } from '../../services/api'
import FormField from './FormField.vue'
import StatusMessage from './StatusMessage.vue'

const form = ref({
  fullName: '',
  title: '',
  description: '',
  email: '',
  linkedin: ''
})

const saving = ref(false)
const statusMessage = ref('')
const statusType = ref<'success' | 'error'>('success')

const loadProfile = async () => {
  try {
    const profile = await apiService.getProfile()
    if (profile) {
      form.value = {
        fullName: profile.fullName,
        title: profile.title,
        description: profile.description || '',
        email: profile.email,
        linkedin: profile.linkedin || ''
      }
    }
  } catch (error) {
    console.error('Error loading profile:', error)
    showStatus('Error al cargar el perfil', 'error')
  }
}

const handleSave = async () => {
  saving.value = true
  try {
    await apiService.updateProfile(form.value)
    showStatus('Perfil actualizado correctamente', 'success')
  } catch (error) {
    console.error('Error saving profile:', error)
    showStatus('Error al guardar el perfil', 'error')
  } finally {
    saving.value = false
  }
}

const handleCancel = () => {
  loadProfile()
}

const showStatus = (message: string, type: 'success' | 'error') => {
  statusMessage.value = message
  statusType.value = type
  setTimeout(() => {
    statusMessage.value = ''
  }, 3000)
}

onMounted(() => {
  loadProfile()
})
</script>

<style scoped>
.profile-editor {
  max-width: 800px;
}

.editor-card {
  background: var(--vscode-sidebar-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 8px;
  padding: 24px;
}

.card-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vscode-text);
  margin: 0 0 24px 0;
}

.editor-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 10px 12px;
  background: var(--vscode-editor-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 4px;
  color: var(--vscode-text);
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.2s;
}

.form-input:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--vscode-accent);
}

.form-textarea {
  resize: vertical;
  min-height: 80px;
}

.form-actions {
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
  transition: all 0.2s;
  border: none;
}

.btn-primary {
  background: var(--vscode-accent);
  color: #ffffff;
}

.btn-primary:hover:not(:disabled) {
  background: var(--vscode-accent-hover);
}

.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
