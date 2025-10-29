<template>
  <div class="admin-layout">
    <AdminSidebar 
      :active-section="activeSection" 
      @change-section="handleSectionChange" 
    />
    <div class="admin-content">
      <AdminHeader :section-title="sectionTitle" @logout="handleLogout" />
      <div class="admin-main">
        <component :is="currentComponent" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AdminSidebar from './AdminSidebar.vue'
import AdminHeader from './AdminHeader.vue'
import ProfileEditor from './ProfileEditor.vue'
import ProjectsManager from './ProjectsManager.vue'
import SkillsManager from './SkillsManager.vue'
import SettingsEditor from './SettingsEditor.vue'
import { apiService } from '../../services/api'

const router = useRouter()
const activeSection = ref<'profile' | 'projects' | 'skills' | 'settings'>('profile')

// Inicializar configuración de API
const initializeApiConfig = () => {
  const settings = localStorage.getItem('portfolio-settings')
  if (!settings) {
    // Configuración por defecto
    const defaultSettings = {
      apiUrl: 'https://portfolio-api.omarbouaoudaruiz.workers.dev',
      apiKey: 'portfolio-admin-2024'
    }
    localStorage.setItem('portfolio-settings', JSON.stringify(defaultSettings))
    apiService.updateConfig(defaultSettings.apiUrl, defaultSettings.apiKey)
  } else {
    const parsed = JSON.parse(settings)
    apiService.updateConfig(parsed.apiUrl, parsed.apiKey)
  }
}

onMounted(() => {
  initializeApiConfig()
})

const sectionTitle = computed(() => {
  const titles = {
    profile: 'Perfil',
    projects: 'Proyectos',
    skills: 'Habilidades',
    settings: 'Configuración'
  }
  return titles[activeSection.value]
})

const currentComponent = computed(() => {
  const components = {
    profile: ProfileEditor,
    projects: ProjectsManager,
    skills: SkillsManager,
    settings: SettingsEditor
  }
  return components[activeSection.value]
})

const handleSectionChange = (section: 'profile' | 'projects' | 'skills' | 'settings') => {
  activeSection.value = section
}

const handleLogout = () => {
  localStorage.removeItem('admin-auth')
  router.push('/')
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
  width: 100vw;
  background: var(--vscode-editor-bg);
  overflow: hidden;
}

.admin-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.admin-main {
  flex: 1;
  overflow-y: auto;
  padding: 24px;
}
</style>
