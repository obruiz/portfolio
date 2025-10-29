<template>
  <div class="ai-assistant" :class="{ 'collapsed': isCollapsed }">
    <!-- Header con título y botón -->
    <div class="assistant-topbar">
      <span class="chat-title">Chat</span>
      <button 
        class="toggle-button" 
        @click="toggleCollapse"
        :title="isCollapsed ? 'Abrir asistente' : 'Cerrar asistente'"
      >
        <svg v-if="isCollapsed" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M15 18l-6-6 6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
    </div>

    <!-- Assistant Content -->
    <div class="assistant-content">
      <div class="assistant-header">
        <div class="assistant-avatar">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <div class="assistant-info">
          <h3 class="assistant-name">AI Assistant</h3>
          <span class="assistant-status">
            <span class="status-dot"></span>
            En línea
          </span>
        </div>
      </div>

      <div class="chat-container" ref="chatContainer">
        <div 
          v-for="(message, index) in messages" 
          :key="index"
          class="message"
          :class="message.type"
        >
          <div class="message-content">
            {{ message.text }}
          </div>
          <div class="message-time">{{ message.time }}</div>
        </div>

        <div v-if="isTyping" class="message assistant">
          <div class="message-content typing-indicator">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <div class="chat-input-container">
        <input
          v-model="inputMessage"
          type="text"
          class="chat-input"
          placeholder="Escribe tu mensaje..."
          @keydown.enter="sendMessage"
        />
        <button class="send-button" @click="sendMessage" :disabled="!inputMessage.trim()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'

interface Message {
  text: string
  type: 'user' | 'assistant'
  time: string
}

const isCollapsed = ref(false)
const inputMessage = ref('')
const isTyping = ref(false)
const chatContainer = ref<HTMLElement>()

const messages = ref<Message[]>([
  {
    text: '¡Hola! 👋 Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?',
    type: 'assistant',
    time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  }
])

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value
}

const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight
    }
  })
}

const sendMessage = async () => {
  if (!inputMessage.value.trim()) return

  // Agregar mensaje del usuario
  messages.value.push({
    text: inputMessage.value,
    type: 'user',
    time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  })

  const userMsg = inputMessage.value.toLowerCase()
  inputMessage.value = ''
  scrollToBottom()

  // Simular que el asistente está escribiendo
  isTyping.value = true
  
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000))

  isTyping.value = false

  // Respuestas del asistente
  let response = ''
  
  if (userMsg.includes('contacto') || userMsg.includes('email') || userMsg.includes('correo')) {
    response = 'Puedes contactarme a través de la sección de Contacto, o directamente por email. ¡Estaré encantado de conversar! 📧'
  } else if (userMsg.includes('proyecto') || userMsg.includes('trabajo')) {
    response = 'Tengo varios proyectos interesantes en mi portfolio. ¿Te gustaría ver alguno en particular? Puedes explorar la sección de Proyectos para más detalles. 💼'
  } else if (userMsg.includes('tecnología') || userMsg.includes('stack') || userMsg.includes('skills')) {
    response = 'Trabajo principalmente con Vue.js, TypeScript, Node.js y Cloudflare Workers. ¡Echa un vistazo a la sección de Habilidades para ver más! 🚀'
  } else if (userMsg.includes('hola') || userMsg.includes('buenos') || userMsg.includes('hey')) {
    response = '¡Hola! 👋 ¿Cómo estás? ¿Hay algo específico sobre mi trabajo que te gustaría conocer?'
  } else if (userMsg.includes('gracias')) {
    response = '¡De nada! Estoy aquí para ayudarte. Si tienes más preguntas, no dudes en preguntar. 😊'
  } else {
    response = 'Interesante pregunta. Te recomiendo explorar mi portfolio para conocer más sobre mi trabajo. ¿Hay algo específico que quieras saber sobre mis proyectos o habilidades? 🤔'
  }

  messages.value.push({
    text: response,
    type: 'assistant',
    time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  })

  scrollToBottom()
}
</script>

<style scoped>
.ai-assistant {
  width: 380px;
  min-width: 380px;
  background: var(--vscode-sidebar-bg);
  border-left: 1px solid var(--vscode-border);
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  flex-shrink: 0;
  position: relative;
}

.ai-assistant.collapsed {
  width: 48px;
  min-width: 48px;
}

.ai-assistant.collapsed .assistant-content {
  display: none;
}

.assistant-topbar {
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 12px;
  border-bottom: 1px solid var(--vscode-border);
  flex-shrink: 0;
  background: var(--vscode-sidebar-bg);
}

.chat-title {
  font-size: 11px;
  font-weight: 600;
  color: var(--vscode-text-secondary);
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.ai-assistant.collapsed .chat-title {
  display: none;
}

.ai-assistant.collapsed .assistant-topbar {
  justify-content: center;
  padding: 0;
}

.toggle-button {
  position: relative;
  left: 0;
  top: 0;
  width: 24px;
  height: 24px;
  background: transparent;
  border: none;
  color: var(--vscode-icon-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  flex-shrink: 0;
  border-radius: 4px;
}

.toggle-button:hover {
  background: var(--vscode-editor-bg);
  color: var(--vscode-text);
}

.toggle-button svg {
  width: 16px;
  height: 16px;
}

.assistant-content {
  display: flex;
  flex-direction: column;
  height: 100%;
  flex: 1;
}

.assistant-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 12px;
  border-bottom: 1px solid var(--vscode-border);
}

.assistant-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--vscode-accent) 0%, #667eea 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.assistant-avatar svg {
  width: 20px;
  height: 20px;
}

.assistant-info {
  flex: 1;
}

.assistant-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--vscode-text);
  margin: 0 0 2px 0;
}

.assistant-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--vscode-text-secondary);
}

.status-dot {
  width: 8px;
  height: 8px;
  background: #10b981;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.chat-container {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.message {
  display: flex;
  flex-direction: column;
  max-width: 85%;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.message.user {
  align-self: flex-end;
}

.message.assistant {
  align-self: flex-start;
}

.message-content {
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 14px;
  line-height: 1.5;
}

.message.user .message-content {
  background: var(--vscode-accent);
  color: white;
  border-bottom-right-radius: 4px;
}

.message.assistant .message-content {
  background: var(--vscode-editor-bg);
  border: 1px solid var(--vscode-border);
  color: var(--vscode-text);
  border-bottom-left-radius: 4px;
}

.message-time {
  font-size: 11px;
  color: var(--vscode-text-secondary);
  margin-top: 4px;
  padding: 0 4px;
}

.message.user .message-time {
  text-align: right;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 12px 16px;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: var(--vscode-text-secondary);
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    opacity: 0.3;
    transform: translateY(0);
  }
  30% {
    opacity: 1;
    transform: translateY(-8px);
  }
}

.chat-input-container {
  display: flex;
  gap: 8px;
  padding: 16px;
  border-top: 1px solid var(--vscode-border);
}

.chat-input {
  flex: 1;
  padding: 12px 16px;
  background: var(--vscode-editor-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 8px;
  color: var(--vscode-text);
  font-size: 14px;
  font-family: inherit;
}

.chat-input:focus {
  outline: none;
  border-color: var(--vscode-accent);
}

.chat-input::placeholder {
  color: var(--vscode-text-secondary);
}

.send-button {
  width: 44px;
  height: 44px;
  background: var(--vscode-accent);
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.send-button:hover:not(:disabled) {
  background: var(--vscode-accent-hover);
  transform: translateY(-2px);
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.send-button svg {
  width: 20px;
  height: 20px;
}

@media (max-width: 1200px) {
  .ai-assistant {
    width: 320px;
  }
}

@media (max-width: 768px) {
  .ai-assistant {
    position: fixed;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 60vh;
    border-left: none;
    border-top: 1px solid var(--vscode-border);
    transition: transform 0.3s ease;
    z-index: 100;
  }

  .ai-assistant.collapsed {
    transform: translateY(100%);
    width: 100%;
  }

  .toggle-button {
    left: 50%;
    top: -32px;
    transform: translateX(-50%);
    width: 60px;
    height: 32px;
    border-radius: 6px 6px 0 0;
    border-bottom: none;
    border-right: 1px solid var(--vscode-border);
  }

  .toggle-button svg {
    transform: rotate(90deg);
  }
}
</style>
