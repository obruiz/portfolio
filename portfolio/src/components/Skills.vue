<template>
  <section class="skills-section">
    <div class="skills-container">
      <!-- Header -->
      <div class="skills-header">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-4">
          Mis <span class="text-indigo-400">Habilidades</span>
        </h2>
        <p class="text-xl text-gray-400 max-w-2xl mx-auto text-center mb-8">
          Tecnologías y herramientas que domino para crear soluciones innovadoras
        </p>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex justify-center items-center min-h-[400px]">
        <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-500"></div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-16">
        <div class="text-red-400 mb-4">
          <svg class="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-xl font-semibold mb-2">Error al cargar habilidades</h3>
        <p class="text-gray-400 mb-4">{{ error }}</p>
        <button 
          @click="loadSkills"
          class="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg transition-colors"
        >
          Reintentar
        </button>
      </div>

      <!-- Skills Grid -->
      <div v-else-if="skills.length > 0" class="skills-grid">
        <div
          v-for="skill in skills"
          :key="skill.id"
          class="skill-card group"
        >
          <div class="skill-header">
            <div class="skill-icon">
              🛠️
            </div>
            <h4>{{ skill.name }}</h4>
          </div>
          <div class="skill-progress">
            <svg class="progress-ring" width="120" height="120">
              <circle class="progress-ring-circle-bg" cx="60" cy="60" r="54" />
              <circle 
                class="progress-ring-circle" 
                cx="60" 
                cy="60" 
                r="54"
                :style="{ 
                  strokeDashoffset: 339.292 - (339.292 * skill.level) / 100
                }"
              />
            </svg>
            <div class="progress-text">{{ skill.level }}%</div>
          </div>
          <div class="skill-level-bar">
            <div class="skill-level-fill" :style="{ width: skill.level + '%' }"></div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <div class="text-gray-400 mb-4">
          <svg class="w-24 h-24 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
        </div>
        <h3 class="text-2xl font-semibold mb-2">No hay habilidades disponibles</h3>
        <p class="text-gray-400">Las habilidades se mostrarán aquí una vez que sean añadidas desde el panel de administración.</p>
      </div>

      <!-- Admin Link (solo visible en desarrollo) -->
      <div v-if="isDevelopment" class="fixed bottom-20 right-4">
        <router-link
          to="/admin"
          class="bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-colors"
          title="Ir al Panel de Administración"
        >
          ⚙️
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { apiService, type Skill } from '../services/api'

// Estado reactivo
const skills = ref<Skill[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

// Computed
const isDevelopment = computed(() => {
  return import.meta.env.DEV || window.location.hostname === 'localhost'
})

// Métodos
const loadSkills = async () => {
  try {
    loading.value = true
    error.value = null
    skills.value = await apiService.getSkills()
  } catch (err) {
    console.error('Error loading skills:', err)
    error.value = err instanceof Error ? err.message : 'Error desconocido'
  } finally {
    loading.value = false
  }
}

// Lifecycle
onMounted(() => {
  loadSkills()
})
</script>

<style scoped>
.skills-section {
  width: 100%;
  min-height: 100vh;
  padding: 4rem 2rem;
  background: #0f172a;
  position: relative;
}

.skills-container {
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 4rem;
}

.skills-header {
  text-align: center;
  margin-bottom: 4rem;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.skill-card {
  background: rgba(30, 41, 59, 0.6);
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(129, 140, 248, 0.1);
}

.skill-card:hover {
  transform: translateY(-4px);
  background: rgba(30, 41, 59, 0.8);
  border-color: rgba(129, 140, 248, 0.3);
  box-shadow: 0 20px 40px rgba(129, 140, 248, 0.1);
}

.skill-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
  justify-content: center;
}

.skill-icon {
  font-size: 2rem;
}

.skill-card h4 {
  font-size: 1.3rem;
  color: #e2e8f0;
  margin: 0;
  font-weight: 600;
  text-align: center;
}

.skill-progress {
  position: relative;
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.progress-ring {
  transform: rotate(-90deg);
  position: absolute;
  top: 0;
  left: 0;
}

.progress-ring-circle-bg {
  fill: none;
  stroke: rgba(255, 255, 255, 0.1);
  stroke-width: 8;
}

.progress-ring-circle {
  fill: none;
  stroke-width: 8;
  stroke-linecap: round;
  stroke-dasharray: 339.292;
  transition: stroke-dashoffset 1.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  stroke: #818cf8;
}

.progress-text {
  position: relative;
  color: #e2e8f0;
  font-size: 1.5rem;
  font-weight: 700;
  font-family: 'Inter', sans-serif;
  z-index: 1;
}

.skill-level-bar {
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}

.skill-level-fill {
  height: 100%;
  background: linear-gradient(90deg, #818cf8, #4f46e5);
  border-radius: 3px;
  transition: width 1.5s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
}

.skill-level-fill::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 100%;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 0 3px 3px 0;
}

/* Animaciones */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.skill-card {
  animation: fadeInUp 0.6s ease-out forwards;
}

.skill-card:nth-child(1) { animation-delay: 0.1s; }
.skill-card:nth-child(2) { animation-delay: 0.2s; }
.skill-card:nth-child(3) { animation-delay: 0.3s; }
.skill-card:nth-child(4) { animation-delay: 0.4s; }
.skill-card:nth-child(5) { animation-delay: 0.5s; }
.skill-card:nth-child(6) { animation-delay: 0.6s; }

/* Responsive */
@media (max-width: 768px) {
  .skills-section {
    padding: 2rem 1rem;
  }

  .skills-header h2 {
    font-size: 2.5rem;
  }

  .skills-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .skill-card {
    padding: 1.5rem;
  }

  .skill-progress {
    width: 100px;
    height: 100px;
  }

  .progress-text {
    font-size: 1.2rem;
  }
}

@media (max-width: 480px) {
  .skills-header h2 {
    font-size: 2rem;
  }

  .skill-card h4 {
    font-size: 1.1rem;
  }
}
</style>