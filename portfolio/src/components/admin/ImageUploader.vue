<template>
  <div class="image-uploader">
    <label class="upload-label">{{ label }}</label>
    
    <!-- Preview de imagen actual -->
    <div v-if="currentImageUrl" class="image-preview">
      <img :src="currentImageUrl" :alt="label" />
      <button type="button" class="remove-button" @click="handleRemove" :disabled="uploading">
        ×
      </button>
    </div>

    <!-- Área de upload -->
    <div v-else class="upload-area" @click="triggerFileInput" :class="{ uploading }">
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        @change="handleFileSelect"
        style="display: none"
      />
      
      <div v-if="!uploading" class="upload-prompt">
        <svg class="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <polyline points="17 8 12 3 7 8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <line x1="12" y1="3" x2="12" y2="15" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <p>Click para subir imagen</p>
        <span class="upload-hint">PNG, JPG o WEBP (máx. 5MB)</span>
      </div>

      <div v-else class="upload-progress">
        <div class="spinner"></div>
        <p>Subiendo imagen...</p>
      </div>
    </div>

    <!-- Error message -->
    <div v-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { apiService } from '../../services/api'

interface Props {
  modelValue: string
  label?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Imagen'
})

const emit = defineEmits<Emits>()

const fileInput = ref<HTMLInputElement>()
const currentImageUrl = ref(props.modelValue)
const uploading = ref(false)
const error = ref<string | null>(null)

watch(() => props.modelValue, (newValue) => {
  currentImageUrl.value = newValue
})

const triggerFileInput = () => {
  if (!uploading.value) {
    fileInput.value?.click()
  }
}

const handleFileSelect = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  
  if (!file) return

  // Validar tipo
  if (!file.type.startsWith('image/')) {
    error.value = 'El archivo debe ser una imagen'
    return
  }

  // Validar tamaño (5MB)
  if (file.size > 5 * 1024 * 1024) {
    error.value = 'La imagen es demasiado grande (máximo 5MB)'
    return
  }

  try {
    uploading.value = true
    error.value = null
    
    const result = await apiService.uploadImage(file)
    currentImageUrl.value = result.url
    emit('update:modelValue', result.url)
    
  } catch (err) {
    console.error('Error uploading image:', err)
    error.value = err instanceof Error ? err.message : 'Error al subir imagen'
  } finally {
    uploading.value = false
    if (input) input.value = ''
  }
}

const handleRemove = () => {
  currentImageUrl.value = ''
  emit('update:modelValue', '')
  error.value = null
}
</script>

<style scoped>
.image-uploader {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.upload-label {
  font-size: 13px;
  font-weight: 500;
  color: var(--vscode-text);
}

.image-preview {
  position: relative;
  width: 100%;
  max-width: 400px;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vscode-border);
}

.image-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-button {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  color: #fff;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  transition: all 0.2s;
}

.remove-button:hover:not(:disabled) {
  background: rgba(220, 38, 38, 0.9);
  transform: scale(1.1);
}

.remove-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.upload-area {
  width: 100%;
  max-width: 400px;
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed var(--vscode-border);
  border-radius: 8px;
  background: var(--vscode-editor-bg);
  cursor: pointer;
  transition: all 0.2s;
}

.upload-area:hover:not(.uploading) {
  border-color: var(--vscode-accent);
  background: var(--vscode-border);
}

.upload-area.uploading {
  cursor: not-allowed;
  opacity: 0.7;
}

.upload-prompt {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 20px;
  text-align: center;
}

.upload-icon {
  width: 48px;
  height: 48px;
  color: var(--vscode-text-secondary);
}

.upload-prompt p {
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: var(--vscode-text);
}

.upload-hint {
  font-size: 12px;
  color: var(--vscode-text-secondary);
}

.upload-progress {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
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

.upload-progress p {
  margin: 0;
  font-size: 14px;
  color: var(--vscode-text-secondary);
}

.error-message {
  padding: 8px 12px;
  background: rgba(220, 38, 38, 0.1);
  border: 1px solid rgba(220, 38, 38, 0.3);
  border-radius: 6px;
  color: var(--vscode-git-deleted);
  font-size: 13px;
}
</style>
