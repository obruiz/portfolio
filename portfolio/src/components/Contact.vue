<template>
  <div class="terminal-wrapper">
    <div class="terminal">
      <div class="terminal-header">
        <div class="terminal-title">
          <IconTerminal />
          <span>bash</span>
        </div>
        <div class="terminal-actions">
          <div class="action-dot minimize"></div>
          <div class="action-dot maximize"></div>
          <div class="action-dot close"></div>
        </div>
      </div>
      <div class="terminal-content">
        <div class="terminal-line">
          <span class="prompt">omar@portfolio:~$</span>
          <span class="command">./contact.sh --init</span>
        </div>
        <div class="terminal-output">
          <span class="info">Initializing contact protocol...</span>
          <span class="success">✓ Connection established</span>
          <span class="success">✓ Encryption enabled</span>
          <span class="success">✓ Ready to receive messages</span>
        </div>
        
        <div class="terminal-section">
          <div class="section-title"># Available Communication Channels</div>
        </div>

        <div class="terminal-line">
          <span class="prompt">omar@portfolio:~$</span>
          <span class="command typing" v-if="showTyping">{{ typedCommand }}</span>
        </div>

        <div class="contact-methods">
          <a href="mailto:omar@example.com" class="method-item">
            <div class="method-header">
              <IconMail class="method-icon" />
              <span class="method-name">email</span>
            </div>
            <div class="method-value">omar@example.com</div>
            <div class="method-status">
              <span class="status-dot active"></span>
              <span>Available 24/7</span>
            </div>
          </a>

          <a href="https://linkedin.com/in/omar" target="_blank" rel="noopener noreferrer" class="method-item">
            <div class="method-header">
              <IconLinkedIn class="method-icon" />
              <span class="method-name">linkedin</span>
            </div>
            <div class="method-value">/in/omar-bouaouda</div>
            <div class="method-status">
              <span class="status-dot active"></span>
              <span>Professional Network</span>
            </div>
          </a>

          <a href="https://github.com/omar" target="_blank" rel="noopener noreferrer" class="method-item">
            <div class="method-header">
              <IconGithub class="method-icon" />
              <span class="method-name">github</span>
            </div>
            <div class="method-value">@omar-bouaouda</div>
            <div class="method-status">
              <span class="status-dot active"></span>
              <span>Code & Projects</span>
            </div>
          </a>
        </div>

        <div class="terminal-section">
          <div class="section-title"># Location Information</div>
          <div class="terminal-line">
            <span class="key">Country:</span>
            <span class="value">España</span>
          </div>
          <div class="terminal-line">
            <span class="key">City:</span>
            <span class="value">Alicante</span>
          </div>
          <div class="terminal-line">
            <span class="key">Timezone:</span>
            <span class="value">CET (UTC+1)</span>
          </div>
        </div>

        <div class="terminal-section">
          <div class="section-title"># Response Time</div>
          <div class="response-info">
            <div class="info-bar">
              <span>Email:</span>
              <div class="bar">
                <div class="bar-fill" style="width: 90%"></div>
              </div>
              <span class="time">~24h</span>
            </div>
            <div class="info-bar">
              <span>LinkedIn:</span>
              <div class="bar">
                <div class="bar-fill" style="width: 75%"></div>
              </div>
              <span class="time">~48h</span>
            </div>
          </div>
        </div>

        <div class="terminal-line cursor-line">
          <span class="prompt">omar@portfolio:~$</span>
          <span class="cursor">_</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import IconTerminal from './icons/IconTerminal.vue'
import IconMail from './icons/IconMail.vue'
import IconLinkedIn from './icons/IconLinkedIn.vue'
import IconGithub from './icons/IconGithub.vue'

const typedCommand = ref('')
const showTyping = ref(false)
const fullCommand = 'cat contacts.json'

let typingInterval: number

onMounted(() => {
  setTimeout(() => {
    showTyping.value = true
    let index = 0
    typingInterval = setInterval(() => {
      if (index < fullCommand.length) {
        typedCommand.value += fullCommand[index]
        index++
      } else {
        clearInterval(typingInterval)
      }
    }, 80) as unknown as number
  }, 1000)
})

onUnmounted(() => {
  if (typingInterval) {
    clearInterval(typingInterval)
  }
})
</script>

<style scoped>
.terminal-wrapper {
  height: 100%;
  padding: 20px;
  background: var(--vscode-editor-bg);
  overflow-y: auto;
}

.terminal {
  max-width: 900px;
  margin: 0 auto;
  background: var(--vscode-terminal-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.terminal-header {
  height: 40px;
  background: var(--vscode-sidebar-bg);
  border-bottom: 1px solid var(--vscode-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
}

.terminal-title {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--vscode-text-secondary);
  font-size: 13px;
  font-weight: 500;
}

.terminal-title :deep(svg) {
  width: 16px;
  height: 16px;
}

.terminal-actions {
  display: flex;
  gap: 8px;
}

.action-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.action-dot.close {
  background: #ff5f57;
}

.action-dot.minimize {
  background: #febc2e;
}

.action-dot.maximize {
  background: #28c840;
}

.terminal-content {
  padding: 20px;
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.6;
  color: var(--vscode-terminal-text);
}

.terminal-line {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.prompt {
  color: #89e051;
  font-weight: 600;
  flex-shrink: 0;
}

.command {
  color: #9cdcfe;
}

.command.typing::after {
  content: '▊';
  animation: blink 1s infinite;
  color: #ffffff;
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.terminal-output {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 16px 0 16px 0;
}

.info {
  color: #9cdcfe;
}

.success {
  color: #89e051;
}

.terminal-section {
  margin: 24px 0 16px 0;
}

.section-title {
  color: #6a9955;
  font-weight: 600;
  margin-bottom: 12px;
}

.contact-methods {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
  margin: 20px 0;
}

.method-item {
  padding: 16px;
  background: var(--vscode-editor-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 6px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s;
  cursor: pointer;
}

.method-item:hover {
  border-color: var(--vscode-accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 122, 204, 0.2);
}

.method-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.method-icon {
  color: var(--vscode-accent);
}

.method-icon :deep(svg) {
  width: 18px;
  height: 18px;
}

.method-name {
  font-weight: 600;
  color: var(--vscode-text);
  text-transform: lowercase;
}

.method-value {
  color: #ce9178;
  font-size: 12px;
  margin-bottom: 8px;
  word-break: break-all;
}

.method-status {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: var(--vscode-text-secondary);
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-dot.active {
  background: #89e051;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.key {
  color: #9cdcfe;
  min-width: 100px;
  display: inline-block;
}

.value {
  color: #ce9178;
}

.response-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 12px;
}

.info-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
}

.info-bar > span:first-child {
  min-width: 80px;
  color: #9cdcfe;
}

.bar {
  flex: 1;
  height: 8px;
  background: var(--vscode-sidebar-bg);
  border-radius: 4px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--vscode-accent), #89e051);
  border-radius: 4px;
  transition: width 1s ease-out;
}

.time {
  min-width: 50px;
  text-align: right;
  color: var(--vscode-text-secondary);
}

.cursor-line {
  margin-top: 24px;
}

.cursor {
  color: #ffffff;
  animation: blink 1s infinite;
}

@media (max-width: 768px) {
  .terminal-wrapper {
    padding: 10px;
  }

  .terminal-content {
    padding: 15px;
    font-size: 12px;
  }

  .contact-methods {
    grid-template-columns: 1fr;
  }

  .info-bar {
    flex-wrap: wrap;
  }

  .bar {
    order: 3;
    width: 100%;
  }
}
</style> 