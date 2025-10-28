<template>
  <div class="explorer-view">
    <!-- Portfolio Section -->
    <div class="folder-section">
      <div class="section-header" @click="toggleFolder('portfolio')">
        <IconChevron :direction="folders.portfolio ? 'down' : 'right'" class="chevron" />
        <span class="section-title">PORTFOLIO</span>
      </div>
      <div v-if="folders.portfolio" class="folder-content">
        <!-- src folder -->
        <div class="tree-item folder" @click="toggleFolder('src')">
          <IconChevron :direction="folders.src ? 'down' : 'right'" class="chevron small" />
          <IconFolder class="icon" />
          <span>src</span>
        </div>
        <div v-if="folders.src" class="nested">
          <!-- components folder -->
          <div class="tree-item folder" @click="toggleFolder('components')">
            <IconChevron :direction="folders.components ? 'down' : 'right'" class="chevron small" />
            <IconFolder class="icon" />
            <span>components</span>
          </div>
          <div v-if="folders.components" class="nested">
            <router-link to="/" class="tree-item file" :class="{ active: $route.path === '/' }">
              <span class="indent"></span>
              <IconFile class="icon tsx" />
              <span>Home.tsx</span>
            </router-link>
            <router-link to="/projects" class="tree-item file" :class="{ active: $route.path === '/projects' }">
              <span class="indent"></span>
              <IconSourceControl class="icon git" />
              <span>Projects.git</span>
            </router-link>
            <router-link to="/about" class="tree-item file" :class="{ active: $route.path === '/about' }">
              <span class="indent"></span>
              <IconFile class="icon md" />
              <span>About.md</span>
            </router-link>
            <router-link to="/contact" class="tree-item file" :class="{ active: $route.path === '/contact' }">
              <span class="indent"></span>
              <IconTerminal class="icon sh" />
              <span>Contact.sh</span>
            </router-link>
          </div>
          
          <!-- router folder -->
          <div class="tree-item folder">
            <IconChevron direction="right" class="chevron small" />
            <IconFolder class="icon" />
            <span>router</span>
          </div>
          
          <!-- services folder -->
          <div class="tree-item folder">
            <IconChevron direction="right" class="chevron small" />
            <IconFolder class="icon" />
            <span>services</span>
          </div>
          
          <!-- Files -->
          <div class="tree-item file">
            <span class="indent"></span>
            <IconFile class="icon vue" />
            <span>App.vue</span>
          </div>
          <div class="tree-item file">
            <span class="indent"></span>
            <IconFile class="icon ts" />
            <span>main.ts</span>
          </div>
        </div>
        
        <!-- Root files -->
        <div class="tree-item file">
          <span class="indent"></span>
          <IconFile class="icon json" />
          <span>package.json</span>
        </div>
        <div class="tree-item file">
          <span class="indent"></span>
          <IconFile class="icon ts" />
          <span>vite.config.ts</span>
        </div>
        <div class="tree-item file">
          <span class="indent"></span>
          <IconFile class="icon md" />
          <span>README.md</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import IconChevron from './icons/IconChevron.vue'
import IconFolder from './icons/IconFolder.vue'
import IconFile from './icons/IconFile.vue'
import IconSourceControl from './icons/IconSourceControl.vue'
import IconTerminal from './icons/IconTerminal.vue'

const folders = ref<Record<string, boolean>>({
  portfolio: true,
  src: true,
  components: true
})

const toggleFolder = (name: string) => {
  folders.value[name] = !folders.value[name]
}
</script>

<style scoped>
.explorer-view {
  padding: 0;
  user-select: none;
  background: var(--vscode-sidebar-bg) !important;
  background-image: none !important;
  height: 100%;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
}

.explorer-view::before,
.explorer-view::after {
  display: none !important;
  content: none !important;
  background: none !important;
  background-image: none !important;
}

.folder-section {
  margin-bottom: 0;
  background: var(--vscode-sidebar-bg) !important;
  background-image: none !important;
  position: relative;
}

.folder-section::before,
.folder-section::after {
  display: none !important;
}

.section-header {
  height: 22px;
  display: flex;
  align-items: center;
  padding: 8px 8px;
  cursor: pointer;
  color: var(--vscode-text);
  transition: background 0.1s;
  font-weight: 700;
  background: var(--vscode-sidebar-bg) !important;
  background-image: none !important;
  position: relative;
  z-index: 1;
}

.section-header::before,
.section-header::after {
  display: none !important;
}

.section-header:hover {
  background: var(--vscode-border);
}

.section-title {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: var(--vscode-text);
}

.chevron {
  margin-right: 4px;
  color: var(--vscode-icon-color);
  transition: transform 0.1s;
  width: 14px;
  height: 14px;
  flex-shrink: 0;
  min-width: 14px;
  max-width: 14px;
  min-height: 14px;
  max-height: 14px;
}

.chevron :deep(svg) {
  width: 14px;
  height: 14px;
  min-width: 14px;
  max-width: 14px;
  min-height: 14px;
  max-height: 14px;
  display: block;
}

.chevron.small {
  width: 12px;
  height: 12px;
  min-width: 12px;
  max-width: 12px;
  min-height: 12px;
  max-height: 12px;
}

.chevron.small :deep(svg) {
  width: 12px;
  height: 12px;
  min-width: 12px;
  max-width: 12px;
  min-height: 12px;
  max-height: 12px;
  display: block;
}

.folder-content {
  animation: slideIn 0.2s ease-out;
}

.tree-item {
  height: 22px;
  display: flex;
  align-items: center;
  padding: 0 8px 0 20px;
  cursor: pointer;
  color: var(--vscode-text);
  transition: background 0.1s;
  text-decoration: none;
  position: relative;
}

.tree-item:hover {
  background: var(--vscode-border);
}

.tree-item.active {
  background: rgba(0, 122, 204, 0.15);
}

.tree-item.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: var(--vscode-accent);
}

.tree-item.folder {
  font-weight: 500;
}

.nested {
  margin-left: 8px;
}

.nested .tree-item {
  padding-left: 28px;
}

.nested .nested .tree-item {
  padding-left: 36px;
}

.indent {
  width: 16px;
  flex-shrink: 0;
}

.icon {
  margin-right: 6px;
  flex-shrink: 0;
  color: var(--vscode-icon-color);
  width: 16px;
  height: 16px;
  min-width: 16px;
  max-width: 16px;
  min-height: 16px;
  max-height: 16px;
}

.icon :deep(svg) {
  width: 16px;
  height: 16px;
  min-width: 16px;
  max-width: 16px;
  min-height: 16px;
  max-height: 16px;
  display: block;
}

/* File type colors */
.icon.tsx,
.icon.ts {
  color: #007acc;
}

.icon.vue {
  color: #42b883;
}

.icon.json {
  color: #f9dc3e;
}

.icon.md {
  color: #6b7280;
}

.icon.git {
  color: #f05032;
}

.icon.sh {
  color: #89e051;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-4px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
