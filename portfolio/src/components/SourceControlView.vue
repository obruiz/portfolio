<template>
  <div class="source-control-view">
    <!-- Header -->
    <div class="scm-header">
      <div class="scm-title">CHANGES</div>
      <div class="scm-actions">
        <button class="icon-button" title="Refresh">
          <IconSync />
        </button>
        <button class="icon-button" title="Commit">
          <IconCheck />
        </button>
      </div>
    </div>

    <!-- Input -->
    <div class="commit-input-container">
      <input 
        type="text" 
        class="commit-input" 
        placeholder="Message (Ctrl+Enter to commit)"
        v-model="commitMessage"
      />
    </div>

    <!-- Branches Section -->
    <div class="scm-section">
      <div class="section-header" @click="toggleSection('branches')">
        <IconChevron :direction="sections.branches ? 'down' : 'right'" class="chevron" />
        <span class="section-title">BRANCHES (PROJECTS)</span>
        <span class="badge">{{ projects.length }}</span>
      </div>
      <div v-if="sections.branches" class="section-content">
        <div 
          v-for="project in projects" 
          :key="project.id"
          class="branch-item"
          @click="selectBranch(project)"
        >
          <div class="branch-header">
            <IconGitBranch class="branch-icon" />
            <span class="branch-name">{{ project.name }}</span>
            <span class="branch-status" :class="project.status">●</span>
          </div>
          <div class="branch-info">
            <span class="branch-commits">{{ project.commits }} commits</span>
            <span class="branch-date">{{ project.lastUpdate }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Staged Changes -->
    <div class="scm-section">
      <div class="section-header" @click="toggleSection('staged')">
        <IconChevron :direction="sections.staged ? 'down' : 'right'" class="chevron" />
        <span class="section-title">STAGED CHANGES</span>
        <span class="badge">3</span>
      </div>
      <div v-if="sections.staged" class="section-content">
        <div class="change-item">
          <IconFile class="file-icon modified" />
          <span class="file-name">Projects.git</span>
          <span class="change-type">M</span>
        </div>
        <div class="change-item">
          <IconFile class="file-icon added" />
          <span class="file-name">NewFeature.tsx</span>
          <span class="change-type">A</span>
        </div>
        <div class="change-item">
          <IconFile class="file-icon modified" />
          <span class="file-name">About.md</span>
          <span class="change-type">M</span>
        </div>
      </div>
    </div>

    <!-- Changes -->
    <div class="scm-section">
      <div class="section-header" @click="toggleSection('changes')">
        <IconChevron :direction="sections.changes ? 'down' : 'right'" class="chevron" />
        <span class="section-title">CHANGES</span>
        <span class="badge">0</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import IconChevron from './icons/IconChevron.vue'
import IconGitBranch from './icons/IconGitBranch.vue'
import IconFile from './icons/IconFile.vue'
import IconSync from './icons/IconSync.vue'
import IconCheck from './icons/IconCheck.vue'

const router = useRouter()
const commitMessage = ref('')

const sections = ref<Record<string, boolean>>({
  branches: true,
  staged: true,
  changes: false
})

const projects = ref([
  {
    id: 1,
    name: 'feature/portfolio-redesign',
    status: 'active',
    commits: 23,
    lastUpdate: '2 hours ago'
  },
  {
    id: 2,
    name: 'feature/e-commerce-platform',
    status: 'merged',
    commits: 45,
    lastUpdate: '1 week ago'
  },
  {
    id: 3,
    name: 'feature/task-manager-app',
    status: 'active',
    commits: 31,
    lastUpdate: '3 days ago'
  },
  {
    id: 4,
    name: 'feature/weather-dashboard',
    status: 'merged',
    commits: 18,
    lastUpdate: '2 weeks ago'
  }
])

const toggleSection = (name: string) => {
  sections.value[name] = !sections.value[name]
}

const selectBranch = (_project: any) => {
  router.push('/projects')
}
</script>

<style scoped>
.source-control-view {
  padding: 8px 0;
  user-select: none;
}

.scm-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 12px 8px;
}

.scm-title {
  font-size: 11px;
  font-weight: 600;
  color: var(--vscode-text-secondary);
  letter-spacing: 0.5px;
}

.scm-actions {
  display: flex;
  gap: 4px;
}

.icon-button {
  color: var(--vscode-icon-color);
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s, background 0.1s;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  min-width: 24px;
  max-width: 24px;
  min-height: 24px;
  max-height: 24px;
}

.icon-button:hover {
  color: var(--vscode-text);
  background: var(--vscode-border);
}

.icon-button :deep(svg) {
  width: 16px;
  height: 16px;
  min-width: 16px;
  max-width: 16px;
  min-height: 16px;
  max-height: 16px;
  display: block;
}

.commit-input-container {
  padding: 0 8px 8px;
}

.commit-input {
  width: 100%;
  padding: 6px 8px;
  background: var(--vscode-editor-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 2px;
  color: var(--vscode-text);
  font-size: 12px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s;
}

.commit-input:focus {
  border-color: var(--vscode-accent);
}

.scm-section {
  margin-bottom: 4px;
}

.section-header {
  height: 22px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  cursor: pointer;
  color: var(--vscode-text-secondary);
  transition: background 0.1s;
}

.section-header:hover {
  background: var(--vscode-border);
}

.section-title {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.5px;
  flex: 1;
}

.chevron {
  margin-right: 4px;
  color: var(--vscode-icon-color);
  width: 14px;
  height: 14px;
  min-width: 14px;
  max-width: 14px;
  min-height: 14px;
  max-height: 14px;
  flex-shrink: 0;
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

.badge {
  font-size: 11px;
  padding: 0 6px;
  background: var(--vscode-border);
  border-radius: 10px;
  color: var(--vscode-text-secondary);
}

.section-content {
  animation: slideIn 0.2s ease-out;
}

/* Branch Items */
.branch-item {
  padding: 8px 8px 8px 24px;
  cursor: pointer;
  transition: background 0.1s;
  border-left: 2px solid transparent;
}

.branch-item:hover {
  background: var(--vscode-border);
  border-left-color: var(--vscode-accent);
}

.branch-header {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.branch-icon {
  color: var(--vscode-git-modified);
  flex-shrink: 0;
  width: 14px;
  height: 14px;
  min-width: 14px;
  max-width: 14px;
  min-height: 14px;
  max-height: 14px;
}

.branch-icon :deep(svg) {
  width: 14px;
  height: 14px;
  min-width: 14px;
  max-width: 14px;
  min-height: 14px;
  max-height: 14px;
  display: block;
}

.branch-name {
  flex: 1;
  font-size: 12px;
  color: var(--vscode-text);
  font-weight: 500;
}

.branch-status {
  font-size: 16px;
  line-height: 1;
}

.branch-status.active {
  color: var(--vscode-git-added);
}

.branch-status.merged {
  color: var(--vscode-text-secondary);
}

.branch-info {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--vscode-text-secondary);
  margin-left: 20px;
}

/* Change Items */
.change-item {
  height: 22px;
  display: flex;
  align-items: center;
  padding: 0 8px 0 24px;
  cursor: pointer;
  transition: background 0.1s;
}

.change-item:hover {
  background: var(--vscode-border);
}

.file-icon {
  margin-right: 6px;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  min-width: 16px;
  max-width: 16px;
  min-height: 16px;
  max-height: 16px;
}

.file-icon :deep(svg) {
  width: 16px;
  height: 16px;
  min-width: 16px;
  max-width: 16px;
  min-height: 16px;
  max-height: 16px;
  display: block;
}

.file-icon.modified {
  color: var(--vscode-git-modified);
}

.file-icon.added {
  color: var(--vscode-git-added);
}

.file-icon.deleted {
  color: var(--vscode-git-deleted);
}

.file-name {
  flex: 1;
  font-size: 12px;
  color: var(--vscode-text);
}

.change-type {
  font-size: 11px;
  font-weight: 600;
  color: var(--vscode-text-secondary);
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
