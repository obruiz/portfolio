<template>
  <div class="admin-container min-h-screen bg-gray-900 text-white p-8">
    <!-- Header del Backoffice -->
    <div class="max-w-7xl mx-auto">
      <div class="mb-8 border-b border-gray-700 pb-6">
        <h1 class="text-4xl font-bold text-indigo-400">🚀 Backoffice Portfolio</h1>
        <p class="text-gray-400 mt-2">Gestiona tu contenido y proyectos</p>
      </div>

      <!-- Navegación de pestañas -->
      <div class="flex space-x-1 mb-8">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'px-6 py-3 rounded-lg font-medium transition-all duration-200',
            activeTab === tab.id
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          ]"
        >
          {{ tab.name }}
        </button>
      </div>

      <!-- Contenido de pestañas -->
      <div class="bg-gray-800 rounded-xl p-6 shadow-xl">
        <!-- Tab: Proyectos -->
        <div v-if="activeTab === 'projects'">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-semibold">📂 Gestión de Proyectos</h2>
            <button
              @click="showProjectForm = true"
              :disabled="loadingProjects"
              class="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 px-4 py-2 rounded-lg transition-colors"
            >
              ➕ Nuevo Proyecto
            </button>
          </div>

          <!-- Loading Projects -->
          <div v-if="loadingProjects" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            <span class="ml-3 text-gray-400">Cargando proyectos...</span>
          </div>

          <!-- Error Loading Projects -->
          <div v-else-if="errorProjects" class="text-center py-12">
            <div class="text-red-400 mb-4">❌ Error al cargar proyectos</div>
            <p class="text-gray-400 mb-4">{{ errorProjects }}</p>
            <button
              @click="loadData"
              class="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg"
            >
              🔄 Reintentar
            </button>
          </div>

          <!-- Lista de proyectos -->
          <div v-else-if="projects.length > 0" class="grid gap-4">
            <div
              v-for="project in projects"
              :key="project.id"
              class="bg-gray-700 p-4 rounded-lg flex justify-between items-center hover:bg-gray-600 transition-colors"
            >
              <div class="flex items-center space-x-4">
                <img
                  :src="project.image || '/placeholder.jpg'"
                  :alt="project.title"
                  class="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h3 class="font-semibold text-lg">{{ project.title }}</h3>
                  <p class="text-gray-400 text-sm">{{ project.description }}</p>
                  <div class="flex space-x-2 mt-2">
                    <span
                      v-for="tech in project.technologies"
                      :key="tech"
                      class="px-2 py-1 bg-indigo-600 text-xs rounded"
                    >
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
              <div class="flex space-x-2">
                <button
                  @click="editProject(project)"
                  class="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-sm"
                >
                  ✏️ Editar
                </button>
                <button
                  @click="deleteProject(project.id)"
                  class="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="text-center py-12">
            <div class="text-gray-400 mb-4">
              <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">No hay proyectos aún</h3>
            <p class="text-gray-400 mb-6">Empieza añadiendo tu primer proyecto</p>
            <button
              @click="showProjectForm = true"
              class="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg"
            >
              ➕ Crear Primer Proyecto
            </button>
          </div>
        </div>

        <!-- Tab: Perfil -->
        <div v-if="activeTab === 'profile'">
          <h2 class="text-2xl font-semibold mb-6">👤 Información Personal</h2>
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-medium mb-2">Nombre Completo</label>
              <input
                v-model="profile.fullName"
                type="text"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Título Profesional</label>
              <input
                v-model="profile.title"
                type="text"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium mb-2">Descripción</label>
              <textarea
                v-model="profile.description"
                rows="4"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Email</label>
              <input
                v-model="profile.email"
                type="email"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">LinkedIn</label>
              <input
                v-model="profile.linkedin"
                type="url"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <button
            @click="saveProfile"
            class="mt-6 bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg"
          >
            💾 Guardar Perfil
          </button>
        </div>

        <!-- Tab: Skills -->
        <div v-if="activeTab === 'skills'">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-semibold">🛠️ Habilidades</h2>
            <button
              @click="showSkillForm = true"
              class="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg"
            >
              ➕ Nueva Habilidad
            </button>
          </div>

          <!-- Loading Skills -->
          <div v-if="loadingSkills" class="flex justify-center items-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            <span class="ml-3 text-gray-400">Cargando habilidades...</span>
          </div>

          <!-- Skills Grid -->
          <div v-else-if="skills.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
              v-for="skill in skills"
              :key="skill.id"
              class="bg-gray-700 p-4 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <div class="flex justify-between items-start mb-2">
                <h3 class="font-semibold">{{ skill.name }}</h3>
                <button
                  @click="deleteSkill(skill.id)"
                  class="text-red-400 hover:text-red-300 transition-colors"
                  title="Eliminar habilidad"
                >
                  🗑️
                </button>
              </div>
              <div class="flex items-center space-x-2">
                <div class="flex-1 bg-gray-600 rounded-full h-2">
                  <div
                    :style="{ width: skill.level + '%' }"
                    class="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                  ></div>
                </div>
                <span class="text-sm text-gray-400">{{ skill.level }}%</span>
              </div>
            </div>
          </div>

          <!-- Empty State Skills -->
          <div v-else class="text-center py-12">
            <div class="text-gray-400 mb-4">
              <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-2">No hay habilidades aún</h3>
            <p class="text-gray-400 mb-6">Añade tus primeras habilidades técnicas</p>
            <button
              @click="showSkillForm = true"
              class="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg"
            >
              ➕ Añadir Primera Habilidad
            </button>
          </div>
        </div>

        <!-- Tab: Configuración -->
        <div v-if="activeTab === 'settings'">
          <h2 class="text-2xl font-semibold mb-6">⚙️ Configuración</h2>
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium mb-2">URL del Worker API</label>
              <input
                v-model="settings.apiUrl"
                type="url"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
                placeholder="https://tu-worker.tu-usuario.workers.dev"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">Clave de API</label>
              <input
                v-model="settings.apiKey"
                type="password"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              @click="saveSettings"
              class="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg"
            >
              💾 Guardar Configuración
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal para crear/editar proyecto -->
    <div
      v-if="showProjectForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-gray-800 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-semibold">
            {{ editingProject ? '✏️ Editar Proyecto' : '➕ Nuevo Proyecto' }}
          </h3>
          <button
            @click="closeProjectForm"
            class="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <form @submit.prevent="saveProject" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Título del Proyecto</label>
            <input
              v-model="projectForm.title"
              type="text"
              required
              class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Descripción</label>
            <textarea
              v-model="projectForm.description"
              rows="3"
              required
              class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium mb-2">URL del Proyecto</label>
              <input
                v-model="projectForm.projectUrl"
                type="url"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2">URL del Repositorio</label>
              <input
                v-model="projectForm.githubUrl"
                type="url"
                class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">URL de la Imagen</label>
            <input
              v-model="projectForm.image"
              type="url"
              class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Tecnologías (separadas por coma)</label>
            <input
              v-model="projectForm.technologiesStr"
              type="text"
              placeholder="React, Node.js, MongoDB"
              class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div class="flex space-x-4 pt-4">
            <button
              type="submit"
              class="flex-1 bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg font-medium"
            >
              💾 {{ editingProject ? 'Actualizar' : 'Crear' }} Proyecto
            </button>
            <button
              type="button"
              @click="closeProjectForm"
              class="px-6 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Modal para nueva habilidad -->
    <div
      v-if="showSkillForm"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-gray-800 rounded-xl p-6 max-w-md w-full">
        <div class="flex justify-between items-center mb-6">
          <h3 class="text-xl font-semibold">➕ Nueva Habilidad</h3>
          <button
            @click="showSkillForm = false"
            class="text-gray-400 hover:text-white text-2xl"
          >
            ✕
          </button>
        </div>

        <form @submit.prevent="saveSkill" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-2">Nombre de la Habilidad</label>
            <input
              v-model="skillForm.name"
              type="text"
              required
              class="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-2">Nivel (0-100%)</label>
            <input
              v-model.number="skillForm.level"
              type="range"
              min="0"
              max="100"
              class="w-full"
            />
            <div class="text-center mt-2 text-indigo-400">{{ skillForm.level }}%</div>
          </div>

          <div class="flex space-x-4 pt-4">
            <button
              type="submit"
              class="flex-1 bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg font-medium"
            >
              💾 Guardar Habilidad
            </button>
            <button
              type="button"
              @click="showSkillForm = false"
              class="px-6 py-2 bg-gray-600 hover:bg-gray-500 rounded-lg"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'

// Interfaces
interface Project {
  id: string
  title: string
  description: string
  image: string
  projectUrl: string
  githubUrl: string
  technologies: string[]
  createdAt: string
}

interface Profile {
  fullName: string
  title: string
  description: string
  email: string
  linkedin: string
}

interface Skill {
  id: string
  name: string
  level: number
}

interface Settings {
  apiUrl: string
  apiKey: string
}

// Estado reactivo
const activeTab = ref('projects')
const showProjectForm = ref(false)
const showSkillForm = ref(false)
const editingProject = ref<Project | null>(null)

// Loading states
const loadingProjects = ref(false)
const loadingSkills = ref(false)
const loadingProfile = ref(false)

// Error states
const errorProjects = ref<string | null>(null)
const errorSkills = ref<string | null>(null)
const errorProfile = ref<string | null>(null)

const tabs = [
  { id: 'projects', name: '📂 Proyectos' },
  { id: 'profile', name: '👤 Perfil' },
  { id: 'skills', name: '🛠️ Habilidades' },
  { id: 'settings', name: '⚙️ Configuración' }
]

// Datos
const projects = ref<Project[]>([])
const skills = ref<Skill[]>([])

const profile = reactive<Profile>({
  fullName: '',
  title: '',
  description: '',
  email: '',
  linkedin: ''
})

const settings = reactive<Settings>({
  apiUrl: 'https://bbdd.tu-usuario.workers.dev',
  apiKey: ''
})

// Formularios
const projectForm = reactive({
  title: '',
  description: '',
  image: '',
  projectUrl: '',
  githubUrl: '',
  technologiesStr: ''
})

const skillForm = reactive({
  name: '',
  level: 50
})

// Métodos
const loadData = async () => {
  // Cargar proyectos
  await loadProjects()
  // Cargar perfil
  await loadProfile()
  // Cargar habilidades
  await loadSkills()
}

const loadProjects = async () => {
  try {
    loadingProjects.value = true
    errorProjects.value = null
    
    const response = await fetch(`${settings.apiUrl}/api/projects`, {
      headers: {
        'Authorization': `Bearer ${settings.apiKey}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (response.ok) {
      const result = await response.json()
      projects.value = result.data || result
    } else {
      errorProjects.value = `Error ${response.status}: ${response.statusText}`
    }
  } catch (error) {
    console.error('Error cargando proyectos:', error)
    errorProjects.value = error instanceof Error ? error.message : 'Error desconocido'
  } finally {
    loadingProjects.value = false
  }
}

const loadProfile = async () => {
  try {
    loadingProfile.value = true
    errorProfile.value = null
    
    const response = await fetch(`${settings.apiUrl}/api/profile`, {
      headers: {
        'Authorization': `Bearer ${settings.apiKey}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (response.ok) {
      const result = await response.json()
      const profileData = result.data || result
      Object.assign(profile, profileData)
    } else {
      errorProfile.value = `Error ${response.status}: ${response.statusText}`
    }
  } catch (error) {
    console.error('Error cargando perfil:', error)
    errorProfile.value = error instanceof Error ? error.message : 'Error desconocido'
  } finally {
    loadingProfile.value = false
  }
}

const loadSkills = async () => {
  try {
    loadingSkills.value = true
    errorSkills.value = null
    
    const response = await fetch(`${settings.apiUrl}/api/skills`, {
      headers: {
        'Authorization': `Bearer ${settings.apiKey}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (response.ok) {
      const result = await response.json()
      skills.value = result.data || result
    } else {
      errorSkills.value = `Error ${response.status}: ${response.statusText}`
    }
  } catch (error) {
    console.error('Error cargando habilidades:', error)
    errorSkills.value = error instanceof Error ? error.message : 'Error desconocido'
  } finally {
    loadingSkills.value = false
  }
}

const saveProject = async () => {
  try {
    const projectData = {
      title: projectForm.title,
      description: projectForm.description,
      image: projectForm.image,
      projectUrl: projectForm.projectUrl,
      githubUrl: projectForm.githubUrl,
      technologies: projectForm.technologiesStr.split(',').map(t => t.trim()).filter(t => t)
    }

    const url = editingProject.value 
      ? `${settings.apiUrl}/api/projects/${editingProject.value.id}`
      : `${settings.apiUrl}/api/projects`
    
    const method = editingProject.value ? 'PUT' : 'POST'

    const response = await fetch(url, {
      method,
      headers: {
        'Authorization': `Bearer ${settings.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(projectData)
    })

    if (response.ok) {
      await loadProjects()
      closeProjectForm()
      alert('✅ Proyecto guardado exitosamente!')
    } else {
      alert('❌ Error al guardar el proyecto')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('❌ Error al guardar el proyecto')
  }
}

const editProject = (project: Project) => {
  editingProject.value = project
  projectForm.title = project.title
  projectForm.description = project.description
  projectForm.image = project.image
  projectForm.projectUrl = project.projectUrl
  projectForm.githubUrl = project.githubUrl
  projectForm.technologiesStr = project.technologies.join(', ')
  showProjectForm.value = true
}

const deleteProject = async (projectId: string) => {
  if (!confirm('¿Estás seguro de que quieres eliminar este proyecto?')) return

  try {
    const response = await fetch(`${settings.apiUrl}/api/projects/${projectId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${settings.apiKey}`
      }
    })

    if (response.ok) {
      await loadProjects()
      alert('✅ Proyecto eliminado exitosamente!')
    } else {
      alert('❌ Error al eliminar el proyecto')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('❌ Error al eliminar el proyecto')
  }
}

const closeProjectForm = () => {
  showProjectForm.value = false
  editingProject.value = null
  Object.assign(projectForm, {
    title: '',
    description: '',
    image: '',
    projectUrl: '',
    githubUrl: '',
    technologiesStr: ''
  })
}

const saveProfile = async () => {
  try {
    const response = await fetch(`${settings.apiUrl}/api/profile`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${settings.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(profile)
    })

    if (response.ok) {
      alert('✅ Perfil guardado exitosamente!')
    } else {
      alert('❌ Error al guardar el perfil')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('❌ Error al guardar el perfil')
  }
}

const saveSkill = async () => {
  try {
    const response = await fetch(`${settings.apiUrl}/api/skills`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${settings.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: skillForm.name,
        level: skillForm.level
      })
    })

    if (response.ok) {
      await loadSkills()
      showSkillForm.value = false
      skillForm.name = ''
      skillForm.level = 50
      alert('✅ Habilidad guardada exitosamente!')
    } else {
      alert('❌ Error al guardar la habilidad')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('❌ Error al guardar la habilidad')
  }
}

const deleteSkill = async (skillId: string) => {
  if (!confirm('¿Estás seguro de que quieres eliminar esta habilidad?')) return

  try {
    const response = await fetch(`${settings.apiUrl}/api/skills/${skillId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${settings.apiKey}`
      }
    })

    if (response.ok) {
      await loadSkills()
      alert('✅ Habilidad eliminada exitosamente!')
    } else {
      alert('❌ Error al eliminar la habilidad')
    }
  } catch (error) {
    console.error('Error:', error)
    alert('❌ Error al eliminar la habilidad')
  }
}

const saveSettings = () => {
  localStorage.setItem('portfolio-settings', JSON.stringify(settings))
  alert('✅ Configuración guardada!')
}

// Cargar configuración desde localStorage
onMounted(() => {
  const savedSettings = localStorage.getItem('portfolio-settings')
  if (savedSettings) {
    Object.assign(settings, JSON.parse(savedSettings))
  }
  
  if (settings.apiUrl && settings.apiKey) {
    loadData()
  }
})
</script>

<style scoped>
.admin-container {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
}

/* Animaciones suaves */
.transition-all {
  transition: all 0.2s ease-in-out;
}

/* Estilos para scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #374151;
}

::-webkit-scrollbar-thumb {
  background: #6366f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #4f46e5;
}
</style>
