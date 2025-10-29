<template>
  <div class="settings-editor">
    <div class="settings-header">
      <h2 class="settings-title">⚙️ Configuración de API</h2>
      <p class="settings-description">Configura la conexión con tu Cloudflare Worker</p>
    </div>

    <div class="settings-form">
      <div class="form-group">
        <label class="form-label">URL del Worker</label>
        <input
          v-model="settings.apiUrl"
          type="url"
          class="form-input"
          placeholder="https://bbdd.tu-usuario.workers.dev"
        />
        <p class="form-hint">La URL de tu Cloudflare Worker desplegado</p>
      </div>

      <div class="form-group">
        <label class="form-label">API Key</label>
        <input
          v-model="settings.apiKey"
          type="password"
          class="form-input"
          placeholder="portfolio-admin-2024"
        />
        <p class="form-hint">La clave de API configurada en wrangler.jsonc</p>
      </div>

      <div class="form-actions">
        <button @click="handleSave" class="btn btn-primary">
          💾 Guardar Configuración
        </button>
        <button @click="handleTest" class="btn btn-secondary" :disabled="testing">
          {{ testing ? '🔄 Probando...' : '🔌 Probar Conexión' }}
        </button>
      </div>

      <div v-if="message" class="message" :class="messageType">
        {{ message }}
      </div>
    </div>

    <div class="settings-info">
      <h3 class="info-title">📋 Información</h3>
      <div class="info-content">
        <p><strong>Estado:</strong> {{ connected ? '✅ Conectado' : '⚠️ No configurado' }}</p>
        <p><strong>URL Actual:</strong> {{ settings.apiUrl || 'No configurada' }}</p>
        <p><strong>API Key:</strong> {{ settings.apiKey ? '••••••••' : 'No configurada' }}</p>
      </div>
    </div>

    <div class="settings-help">
      <h3 class="help-title">💡 Ayuda</h3>
      <ul class="help-list">
        <li>El <strong>API Key</strong> por defecto es: <code>portfolio-admin-2024</code></li>
        <li>Puedes cambiarla en el archivo <code>wrangler.jsonc</code> del worker</li>
        <li>Para desarrollo local, usa: <code>http://localhost:8787</code></li>
        <li>Ejecuta <code>npm run dev</code> en la carpeta <code>bbdd/</code> para iniciar el worker localmente</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { apiService } from '../../services/api'

const settings = reactive({
  apiUrl: '',
  apiKey: ''
})

const message = ref('')
const messageType = ref<'success' | 'error'>('success')
const testing = ref(false)
const connected = ref(false)

const loadSettings = () => {
  const saved = localStorage.getItem('portfolio-settings')
  if (saved) {
    const parsed = JSON.parse(saved)
    settings.apiUrl = parsed.apiUrl || ''
    settings.apiKey = parsed.apiKey || ''
    connected.value = !!(settings.apiUrl && settings.apiKey)
  }
}

const handleSave = () => {
  if (!settings.apiUrl || !settings.apiKey) {
    message.value = '⚠️ Por favor completa todos los campos'
    messageType.value = 'error'
    return
  }

  localStorage.setItem('portfolio-settings', JSON.stringify(settings))
  apiService.updateConfig(settings.apiUrl, settings.apiKey)
  
  message.value = '✅ Configuración guardada exitosamente'
  messageType.value = 'success'
  connected.value = true

  setTimeout(() => {
    message.value = ''
  }, 3000)
}

const handleTest = async () => {
  if (!settings.apiUrl) {
    message.value = '⚠️ Por favor configura la URL del Worker primero'
    messageType.value = 'error'
    return
  }

  testing.value = true
  message.value = ''

  try {
    apiService.updateConfig(settings.apiUrl, settings.apiKey)
    await apiService.healthCheck()
    
    message.value = '✅ Conexión exitosa! El Worker está funcionando correctamente'
    messageType.value = 'success'
    connected.value = true
  } catch (error) {
    message.value = `❌ Error de conexión: ${error instanceof Error ? error.message : 'Error desconocido'}`
    messageType.value = 'error'
    connected.value = false
  } finally {
    testing.value = false
  }
}

onMounted(() => {
  loadSettings()
})
</script>

<style scoped>
.settings-editor {
  max-width: 800px;
  margin: 0 auto;
}

.settings-header {
  margin-bottom: 32px;
}

.settings-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--vscode-text);
  margin: 0 0 8px 0;
}

.settings-description {
  font-size: 14px;
  color: var(--vscode-text-secondary);
  margin: 0;
}

.settings-form {
  background: var(--vscode-sidebar-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 24px;
}

.form-group:last-of-type {
  margin-bottom: 0;
}

.form-label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  color: var(--vscode-text);
  margin-bottom: 8px;
}

.form-input {
  width: 100%;
  padding: 10px 12px;
  background: var(--vscode-editor-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 4px;
  color: var(--vscode-text);
  font-size: 13px;
  font-family: 'Consolas', 'Courier New', monospace;
  transition: border-color 0.2s;
}

.form-input:focus {
  outline: none;
  border-color: var(--vscode-accent);
}

.form-hint {
  font-size: 12px;
  color: var(--vscode-text-secondary);
  margin: 6px 0 0 0;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: var(--vscode-accent);
  color: #ffffff;
}

.btn-primary:hover:not(:disabled) {
  background: var(--vscode-accent-hover);
  transform: translateY(-1px);
}

.btn-secondary {
  background: var(--vscode-sidebar-bg);
  color: var(--vscode-text);
  border: 1px solid var(--vscode-border);
}

.btn-secondary:hover:not(:disabled) {
  background: var(--vscode-border);
}

.message {
  margin-top: 16px;
  padding: 12px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
}

.message.success {
  background: rgba(129, 184, 139, 0.2);
  color: var(--vscode-git-added);
  border: 1px solid var(--vscode-git-added);
}

.message.error {
  background: rgba(244, 135, 113, 0.2);
  color: var(--vscode-git-deleted);
  border: 1px solid var(--vscode-git-deleted);
}

.settings-info,
.settings-help {
  background: var(--vscode-sidebar-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
}

.info-title,
.help-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vscode-text);
  margin: 0 0 12px 0;
}

.info-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.info-content p {
  font-size: 13px;
  color: var(--vscode-text-secondary);
  margin: 0;
}

.info-content strong {
  color: var(--vscode-text);
  font-weight: 600;
}

.help-list {
  margin: 0;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.help-list li {
  font-size: 13px;
  color: var(--vscode-text-secondary);
  line-height: 1.5;
}

.help-list code {
  background: var(--vscode-editor-bg);
  color: var(--vscode-accent);
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
  font-family: 'Consolas', 'Courier New', monospace;
}
</style>
