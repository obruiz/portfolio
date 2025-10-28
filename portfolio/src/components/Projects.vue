<template>
  <div class="projects-git">
    <div class="editor-toolbar">
      <div class="toolbar-left">
        <button class="toolbar-button active">
          <IconGitBranch />
          <span>Branches</span>
        </button>
        <button class="toolbar-button">
          <IconCommit />
          <span>Commits</span>
        </button>
        <button class="toolbar-button">
          <IconTag />
          <span>Tags</span>
        </button>
      </div>
      <div class="toolbar-right">
        <button class="toolbar-button" @click="loadProjects">
          <IconSync />
        </button>
      </div>
    </div>

    <div class="git-content">
      <!-- Loading -->
      <div v-if="loading" class="status-message">
        <div class="spinner"></div>
        <span>Fetching branches...</span>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="status-message error">
        <IconError />
        <span>{{ error }}</span>
        <button @click="loadProjects" class="retry-button">Retry</button>
      </div>

      <!-- Projects as Branches -->
      <div v-else-if="projects.length > 0" class="branches-list">
        <div class="branch-header">
          <div class="column branch-col">Branch</div>
          <div class="column status-col">Status</div>
          <div class="column commits-col">Commits</div>
          <div class="column updated-col">Last Updated</div>
          <div class="column actions-col">Actions</div>
        </div>

        <div 
          v-for="project in projects" 
          :key="project.id"
          class="branch-row"
          @click="expandBranch(project.id)"
        >
          <div class="branch-info">
            <div class="column branch-col">
              <IconChevron 
                :direction="expandedBranch === project.id ? 'down' : 'right'" 
                class="expand-icon" 
              />
              <IconGitBranch class="branch-icon" />
              <div class="branch-name-wrapper">
                <span class="branch-name">feature/{{ slugify(project.title) }}</span>
                <span class="branch-description">{{ project.description }}</span>
              </div>
            </div>
            <div class="column status-col">
              <span class="status-badge" :class="getStatusClass(project)">
                {{ getStatus(project) }}
              </span>
            </div>
            <div class="column commits-col">
              <IconCommit class="commit-icon" />
              <span>{{ Math.floor(Math.random() * 50) + 10 }}</span>
            </div>
            <div class="column updated-col">
              <span>{{ getRelativeTime(project.createdAt) }}</span>
            </div>
            <div class="column actions-col">
              <a
                v-if="project.projectUrl"
                :href="project.projectUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="action-link"
                @click.stop
                title="View Live"
              >
                <IconExternal />
              </a>
              <a
                v-if="project.githubUrl"
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="action-link"
                @click.stop
                title="View Repository"
              >
                <IconGithub />
              </a>
            </div>
          </div>

          <!-- Expanded Details -->
          <div v-if="expandedBranch === project.id" class="branch-details">
            <div class="details-section">
              <div class="detail-label">Technologies:</div>
              <div class="tech-list">
                <span v-for="tech in project.technologies" :key="tech" class="tech-badge">
                  {{ tech }}
                </span>
              </div>
            </div>
            <div class="details-section">
              <div class="detail-label">Recent Commits:</div>
              <div class="commits-list">
                <div class="commit-item">
                  <IconCommit class="commit-dot" />
                  <div class="commit-info">
                    <span class="commit-message">feat: Initial implementation</span>
                    <span class="commit-meta">{{ getYear(project.createdAt) }}</span>
                  </div>
                </div>
                <div class="commit-item">
                  <IconCommit class="commit-dot" />
                  <div class="commit-info">
                    <span class="commit-message">docs: Update README</span>
                    <span class="commit-meta">{{ getYear(project.createdAt) }}</span>
                  </div>
                </div>
                <div class="commit-item">
                  <IconCommit class="commit-dot" />
                  <div class="commit-info">
                    <span class="commit-message">fix: Bug fixes and improvements</span>
                    <span class="commit-meta">{{ getYear(project.createdAt) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="status-message">
        <span>No branches found.</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiService, type Project } from '../services/api'
import IconGitBranch from './icons/IconGitBranch.vue'
import IconCommit from './icons/IconCommit.vue'
import IconTag from './icons/IconTag.vue'
import IconSync from './icons/IconSync.vue'
import IconChevron from './icons/IconChevron.vue'
import IconError from './icons/IconError.vue'
import IconExternal from './icons/IconExternal.vue'
import IconGithub from './icons/IconGithub.vue'

// Estado reactivo
const projects = ref<Project[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const expandedBranch = ref<string | null>(null)

// Métodos
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

const expandBranch = (id: string) => {
  expandedBranch.value = expandedBranch.value === id ? null : id
}

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

const getStatus = (project: Project) => {
  return project.projectUrl ? 'merged' : 'active'
}

const getStatusClass = (project: Project) => {
  return project.projectUrl ? 'merged' : 'active'
}

const getYear = (dateString?: string) => {
  if (!dateString) return new Date().getFullYear()
  return new Date(dateString).getFullYear()
}

const getRelativeTime = (dateString?: string) => {
  if (!dateString) return 'recently'
  const date = new Date(dateString)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (days === 0) return 'today'
  if (days === 1) return 'yesterday'
  if (days < 7) return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`
  if (days < 365) return `${Math.floor(days / 30)} months ago`
  return `${Math.floor(days / 365)} years ago`
}

// Lifecycle
onMounted(() => {
  loadProjects()
})
</script>

<style scoped>
.projects-git {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--vscode-editor-bg);
}

.editor-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid var(--vscode-border);
  background: var(--vscode-editor-bg);
}

.toolbar-left,
.toolbar-right {
  display: flex;
  gap: 4px;
}

.toolbar-button {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 12px;
  background: none;
  border: none;
  border-radius: 4px;
  color: var(--vscode-text-secondary);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.toolbar-button:hover {
  background: var(--vscode-border);
  color: var(--vscode-text);
}

.toolbar-button.active {
  background: var(--vscode-border);
  color: var(--vscode-text);
}

.toolbar-button :deep(svg) {
  width: 16px;
  height: 16px;
}

.git-content {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.status-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 60px 20px;
  color: var(--vscode-text-secondary);
  font-size: 13px;
}

.status-message.error {
  color: var(--vscode-git-deleted);
}

.status-message :deep(svg) {
  width: 24px;
  height: 24px;
}

.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid var(--vscode-border);
  border-top-color: var(--vscode-accent);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.retry-button {
  margin-top: 8px;
  padding: 6px 16px;
  background: var(--vscode-border);
  border: none;
  border-radius: 4px;
  color: var(--vscode-text);
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.retry-button:hover {
  background: var(--vscode-accent);
  color: #ffffff;
}

/* Branches List */
.branches-list {
  display: flex;
  flex-direction: column;
}

.branch-header {
  display: flex;
  padding: 8px 12px;
  border-bottom: 1px solid var(--vscode-border);
  background: var(--vscode-sidebar-bg);
  font-size: 11px;
  font-weight: 600;
  color: var(--vscode-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  position: sticky;
  top: 0;
  z-index: 10;
}

.column {
  display: flex;
  align-items: center;
  gap: 6px;
}

.branch-col {
  flex: 1;
  min-width: 0;
}

.status-col {
  width: 100px;
  justify-content: center;
}

.commits-col {
  width: 100px;
  justify-content: center;
}

.updated-col {
  width: 120px;
}

.actions-col {
  width: 80px;
  justify-content: flex-end;
}

/* Branch Row */
.branch-row {
  border-bottom: 1px solid var(--vscode-border);
  cursor: pointer;
  transition: background 0.1s;
}

.branch-row:hover {
  background: var(--vscode-sidebar-bg);
}

.branch-info {
  display: flex;
  padding: 12px;
  font-size: 13px;
}

.expand-icon {
  color: var(--vscode-icon-color);
  flex-shrink: 0;
  transition: transform 0.2s;
}

.expand-icon :deep(svg) {
  width: 16px;
  height: 16px;
}

.branch-icon {
  color: var(--vscode-git-modified);
  flex-shrink: 0;
}

.branch-icon :deep(svg) {
  width: 16px;
  height: 16px;
}

.branch-name-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}

.branch-name {
  font-weight: 600;
  color: var(--vscode-text);
  font-family: 'Consolas', 'Courier New', monospace;
}

.branch-description {
  font-size: 12px;
  color: var(--vscode-text-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status-badge {
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-badge.active {
  background: rgba(129, 184, 139, 0.2);
  color: var(--vscode-git-added);
}

.status-badge.merged {
  background: rgba(133, 133, 133, 0.2);
  color: var(--vscode-text-secondary);
}

.commit-icon {
  color: var(--vscode-icon-color);
}

.commit-icon :deep(svg) {
  width: 14px;
  height: 14px;
}

.action-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  color: var(--vscode-icon-color);
  border-radius: 4px;
  transition: all 0.2s;
}

.action-link:hover {
  background: var(--vscode-border);
  color: var(--vscode-accent);
}

.action-link :deep(svg) {
  width: 16px;
  height: 16px;
}

/* Branch Details */
.branch-details {
  padding: 16px;
  background: var(--vscode-sidebar-bg);
  border-top: 1px solid var(--vscode-border);
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.details-section {
  margin-bottom: 16px;
}

.details-section:last-child {
  margin-bottom: 0;
}

.detail-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--vscode-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
}

.tech-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tech-badge {
  padding: 4px 10px;
  background: var(--vscode-editor-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 3px;
  font-size: 11px;
  color: var(--vscode-text);
  font-family: 'Consolas', 'Courier New', monospace;
}

.commits-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.commit-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.commit-dot {
  color: var(--vscode-git-added);
  margin-top: 2px;
}

.commit-dot :deep(svg) {
  width: 12px;
  height: 12px;
}

.commit-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex: 1;
}

.commit-message {
  font-size: 12px;
  color: var(--vscode-text);
}

.commit-meta {
  font-size: 11px;
  color: var(--vscode-text-secondary);
}

@media (max-width: 768px) {
  .status-col,
  .commits-col,
  .updated-col {
    display: none;
  }
  
  .actions-col {
    width: 60px;
  }
}
</style> 