<template>
  <div class="vscode-layout">
    <!-- Activity Bar (izquierda) -->
    <div class="activity-bar">
      <div class="activity-icons">
        <div 
          v-for="item in activityItems" 
          :key="item.id"
          class="activity-icon"
          :class="{ active: activeActivity === item.id }"
          @click="activeActivity = item.id"
          :title="item.label"
        >
          <component :is="item.icon" />
          <span v-if="item.badge" class="badge">{{ item.badge }}</span>
        </div>
      </div>
      <div class="activity-bottom">
        <div class="activity-icon" @click="$emit('toggle-theme')" title="Toggle Theme">
          <IconTheme :is-dark="isDark" />
        </div>
        <div class="activity-icon" title="Settings">
          <IconSettings />
        </div>
      </div>
    </div>

    <!-- Sidebar (Explorer/Source Control) -->
    <div class="sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <div class="sidebar-title">{{ sidebarTitle }}</div>
        <button class="icon-button" @click="sidebarCollapsed = !sidebarCollapsed">
          <IconChevron :direction="sidebarCollapsed ? 'right' : 'left'" />
        </button>
      </div>
      <div class="sidebar-content">
        <component :is="sidebarComponent" />
      </div>
    </div>

    <!-- Main Editor Area -->
    <div class="editor-area">
      <!-- Tabs Bar -->
      <div class="tabs-bar">
        <div class="tabs-container">
          <div 
            v-for="tab in tabs" 
            :key="tab.path"
            class="tab"
            :class="{ active: $route.path === tab.path }"
            @click="navigateTo(tab.path)"
          >
            <component :is="tab.icon" class="tab-icon" />
            <span class="tab-label">{{ tab.label }}</span>
            <span v-if="tab.modified" class="tab-modified">●</span>
            <button class="tab-close" @click.stop="closeTab(tab.path)">
              <IconClose />
            </button>
          </div>
        </div>
      </div>

      <!-- Breadcrumbs -->
      <div class="breadcrumbs">
        <IconFolder class="breadcrumb-icon" />
        <span class="breadcrumb">portfolio</span>
        <IconChevron direction="right" class="breadcrumb-separator" />
        <span class="breadcrumb">src</span>
        <IconChevron direction="right" class="breadcrumb-separator" />
        <span class="breadcrumb active">{{ currentFile }}</span>
      </div>

      <!-- Editor Content -->
      <div class="editor-content">
        <slot></slot>
      </div>

      <!-- Panel (Terminal/Output) -->
      <div class="panel" v-if="panelVisible">
        <div class="panel-header">
          <div class="panel-tabs">
            <div class="panel-tab active">
              <IconTerminal />
              <span>TERMINAL</span>
            </div>
            <div class="panel-tab">
              <IconOutput />
              <span>OUTPUT</span>
            </div>
          </div>
          <button class="icon-button" @click="panelVisible = false">
            <IconClose />
          </button>
        </div>
        <div class="panel-content">
          <slot name="terminal"></slot>
        </div>
      </div>
    </div>

    <!-- Status Bar -->
    <div class="status-bar">
      <div class="status-left">
        <div class="status-item">
          <IconGitBranch />
          <span>main</span>
        </div>
        <div class="status-item">
          <IconSync />
        </div>
        <div class="status-item clickable" @click="panelVisible = !panelVisible">
          <IconWarning />
          <span>0</span>
          <IconError />
          <span>0</span>
        </div>
      </div>
      <div class="status-right">
        <div class="status-item">
          <span>Ln 1, Col 1</span>
        </div>
        <div class="status-item">
          <span>Spaces: 2</span>
        </div>
        <div class="status-item">
          <span>UTF-8</span>
        </div>
        <div class="status-item">
          <span>Vue</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import IconExplorer from './icons/IconExplorer.vue'
import IconSourceControl from './icons/IconSourceControl.vue'
import IconSearch from './icons/IconSearch.vue'
import IconExtensions from './icons/IconExtensions.vue'
import IconAccount from './icons/IconAccount.vue'
import IconSettings from './icons/IconSettings.vue'
import IconTheme from './icons/IconTheme.vue'
import IconChevron from './icons/IconChevron.vue'
import IconClose from './icons/IconClose.vue'
import IconFolder from './icons/IconFolder.vue'
import IconFile from './icons/IconFile.vue'
import IconTerminal from './icons/IconTerminal.vue'
import IconOutput from './icons/IconOutput.vue'
import IconGitBranch from './icons/IconGitBranch.vue'
import IconSync from './icons/IconSync.vue'
import IconWarning from './icons/IconWarning.vue'
import IconError from './icons/IconError.vue'
import ExplorerView from './ExplorerView.vue'
import SourceControlView from './SourceControlView.vue'

defineProps<{
  isDark: boolean
}>()

defineEmits<{
  'toggle-theme': []
}>()

const router = useRouter()
const route = useRoute()

const activeActivity = ref('explorer')
const sidebarCollapsed = ref(false)
const panelVisible = ref(false)

const activityItems = [
  { id: 'explorer', label: 'Explorer', icon: IconExplorer },
  { id: 'search', label: 'Search', icon: IconSearch },
  { id: 'source-control', label: 'Source Control', icon: IconSourceControl, badge: '3' },
  { id: 'extensions', label: 'Extensions', icon: IconExtensions },
  { id: 'account', label: 'Account', icon: IconAccount }
]

const tabs = ref([
  { path: '/', label: 'Home.tsx', icon: IconFile, modified: false },
  { path: '/projects', label: 'Projects.git', icon: IconSourceControl, modified: false },
  { path: '/about', label: 'About.md', icon: IconFile, modified: false },
  { path: '/contact', label: 'Contact.sh', icon: IconTerminal, modified: false }
])

const sidebarTitle = computed(() => {
  switch (activeActivity.value) {
    case 'explorer': return 'EXPLORER'
    case 'search': return 'SEARCH'
    case 'source-control': return 'SOURCE CONTROL'
    case 'extensions': return 'EXTENSIONS'
    case 'account': return 'ACCOUNT'
    default: return 'EXPLORER'
  }
})

const sidebarComponent = computed(() => {
  switch (activeActivity.value) {
    case 'source-control': return SourceControlView
    default: return ExplorerView
  }
})

const currentFile = computed(() => {
  const tab = tabs.value.find(t => t.path === route.path)
  return tab?.label || 'Home.tsx'
})

const navigateTo = (path: string) => {
  router.push(path)
}

const closeTab = (path: string) => {
  const index = tabs.value.findIndex(t => t.path === path)
  if (index > -1 && tabs.value.length > 1) {
    tabs.value.splice(index, 1)
    if (route.path === path) {
      router.push(tabs.value[0].path)
    }
  }
}
</script>

<style scoped>
.vscode-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: var(--vscode-bg);
  position: relative;
  overflow: hidden;
}

/* Activity Bar */
.activity-bar {
  width: 48px;
  background: var(--vscode-activitybar-bg);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  z-index: 100;
  flex-shrink: 0;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
}

.activity-icons {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.activity-bottom {
  display: flex;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.activity-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vscode-icon-color);
  cursor: pointer;
  position: relative;
  transition: color 0.2s;
}

.activity-icon:hover {
  color: #ffffff;
}

.activity-icon.active {
  color: #ffffff;
}

.activity-icon.active::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #ffffff;
}

.activity-icon :deep(svg) {
  width: 24px;
  height: 24px;
}

.badge {
  position: absolute;
  top: 8px;
  right: 8px;
  background: var(--vscode-accent);
  color: #ffffff;
  border-radius: 10px;
  padding: 0 4px;
  font-size: 9px;
  min-width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
}

/* Sidebar */
.sidebar {
  width: 300px;
  background: var(--vscode-sidebar-bg) !important;
  background-image: none !important;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--vscode-border);
  transition: width 0.2s;
  z-index: 50;
  position: relative;
}

.sidebar::before,
.sidebar::after {
  display: none !important;
  content: none !important;
  background: none !important;
  background-image: none !important;
}

.sidebar.collapsed {
  width: 0;
  overflow: hidden;
  border-right: none;
}

.sidebar-header {
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 20px;
  border-bottom: 1px solid var(--vscode-border);
}

.sidebar-title {
  font-size: 11px;
  font-weight: 600;
  color: var(--vscode-text-secondary);
  letter-spacing: 0.5px;
}

.icon-button {
  color: var(--vscode-icon-color);
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.icon-button:hover {
  color: var(--vscode-text);
}

.icon-button :deep(svg) {
  width: 16px;
  height: 16px;
}

.sidebar-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--vscode-sidebar-bg) !important;
  background-image: none !important;
  position: relative;
}

.sidebar-content::before,
.sidebar-content::after {
  display: none !important;
  content: none !important;
}

/* Editor Area */
.editor-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--vscode-editor-bg);
  position: relative;
}

/* Tabs Bar */
.tabs-bar {
  height: 35px;
  background: var(--vscode-tab-bg);
  border-bottom: 1px solid var(--vscode-border);
  display: flex;
  align-items: flex-end;
  overflow-x: auto;
  overflow-y: hidden;
}

.tabs-bar::-webkit-scrollbar {
  height: 0;
}

.tabs-container {
  display: flex;
  height: 100%;
}

.tab {
  height: 35px;
  min-width: 120px;
  max-width: 200px;
  background: var(--vscode-tab-bg);
  border-right: 1px solid var(--vscode-border);
  display: flex;
  align-items: center;
  padding: 0 8px;
  gap: 6px;
  cursor: pointer;
  color: var(--vscode-text-secondary);
  transition: background 0.1s, color 0.1s;
}

.tab:hover {
  background: var(--vscode-tab-active-bg);
}

.tab.active {
  background: var(--vscode-editor-bg);
  color: var(--vscode-text);
  border-bottom: 1px solid var(--vscode-accent);
}

.tab-icon :deep(svg) {
  width: 16px;
  height: 16px;
  flex-shrink: 0;
}

.tab-label {
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 13px;
}

.tab-modified {
  color: var(--vscode-git-modified);
  font-size: 20px;
  line-height: 1;
  margin-left: -4px;
}

.tab-close {
  opacity: 0;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--vscode-icon-color);
  transition: opacity 0.1s, color 0.1s;
}

.tab:hover .tab-close {
  opacity: 1;
}

.tab-close:hover {
  color: var(--vscode-text);
}

.tab-close :deep(svg) {
  width: 12px;
  height: 12px;
}

/* Breadcrumbs */
.breadcrumbs {
  height: 22px;
  background: var(--vscode-editor-bg);
  border-bottom: 1px solid var(--vscode-border);
  display: flex;
  align-items: center;
  padding: 0 12px;
  gap: 4px;
  font-size: 12px;
  color: var(--vscode-text-secondary);
  flex-shrink: 0;
}

.breadcrumb-icon :deep(svg) {
  width: 14px;
  height: 14px;
  flex-shrink: 0;
}

.breadcrumb {
  cursor: pointer;
  transition: color 0.2s;
  white-space: nowrap;
  flex-shrink: 0;
}

.breadcrumb:hover {
  color: var(--vscode-text);
}

.breadcrumb.active {
  color: var(--vscode-text);
  font-weight: 500;
}

.breadcrumb-separator :deep(svg) {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
  opacity: 0.6;
}

/* Editor Content */
.editor-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--vscode-editor-bg);
  position: relative;
  min-height: 0;
  max-height: 100%;
}

.editor-content::-webkit-scrollbar {
  width: 10px;
}

.editor-content::-webkit-scrollbar-track {
  background: var(--vscode-sidebar-bg);
}

.editor-content::-webkit-scrollbar-thumb {
  background: var(--vscode-icon-color);
  border-radius: 5px;
}

.editor-content::-webkit-scrollbar-thumb:hover {
  background: var(--vscode-text-secondary);
}

/* Panel */
.panel {
  height: 200px;
  background: var(--vscode-terminal-bg);
  border-top: 1px solid var(--vscode-border);
  display: flex;
  flex-direction: column;
}

.panel-header {
  height: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  background: var(--vscode-tab-bg);
  border-bottom: 1px solid var(--vscode-border);
}

.panel-tabs {
  display: flex;
  gap: 10px;
}

.panel-tab {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  cursor: pointer;
  color: var(--vscode-text-secondary);
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color 0.2s;
}

.panel-tab:hover {
  color: var(--vscode-text);
}

.panel-tab.active {
  color: var(--vscode-text);
}

.panel-tab :deep(svg) {
  width: 16px;
  height: 16px;
}

.panel-content {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  color: var(--vscode-terminal-text);
  font-family: 'Consolas', 'Courier New', monospace;
  font-size: 13px;
}

/* Status Bar */
.status-bar {
  height: 22px;
  background: var(--vscode-statusbar-bg);
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 12px;
}

.status-left,
.status-right {
  display: flex;
  align-items: center;
  gap: 10px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 0 6px;
  height: 100%;
}

.status-item.clickable {
  cursor: pointer;
  transition: background 0.2s;
}

.status-item.clickable:hover {
  background: rgba(255, 255, 255, 0.1);
}

.status-item :deep(svg) {
  width: 14px;
  height: 14px;
}

@media (max-width: 768px) {
  .sidebar {
    position: absolute;
    left: 48px;
    top: 0;
    bottom: 22px;
    z-index: 90;
  }

  .breadcrumbs {
    display: none;
  }
}
</style>
