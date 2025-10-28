<template>
  <div class="home-container">
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="hero-content">
        <div class="greeting">Hola, soy</div>
        <h1 class="name">{{ profile?.fullName || 'Omar Bouaouda Ruiz' }}</h1>
        <h2 class="title">{{ profile?.title || 'Designer & Developer' }}</h2>
        <p class="description">
          {{ profile?.description || 'Creando experiencias digitales minimalistas y funcionales que combinan diseño elegante con código limpio.' }}
        </p>
        
        <div class="cta-buttons">
          <router-link to="/projects" class="btn btn-primary">
            <IconFolder />
            <span>Ver Proyectos</span>
          </router-link>
          <router-link to="/contact" class="btn btn-secondary">
            <IconMail />
            <span>Contactar</span>
          </router-link>
        </div>

        <div class="social-links">
          <a 
            v-if="profile?.linkedin" 
            :href="profile.linkedin" 
            target="_blank" 
            rel="noopener noreferrer"
            class="social-link"
            title="LinkedIn"
          >
            <IconLinkedIn />
          </a>
          <a 
            v-if="profile?.email" 
            :href="`mailto:${profile.email}`" 
            class="social-link"
            title="Email"
          >
            <IconMail />
          </a>
        </div>
      </div>

      <div class="hero-visual">
        <div class="visual-card">
          <div class="card-header">
            <div class="card-dots">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <span class="card-title">Portfolio.app</span>
          </div>
          <div class="card-content">
            <div class="stat-item">
              <div class="stat-value">{{ projects.length }}+</div>
              <div class="stat-label">Proyectos</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">100%</div>
              <div class="stat-label">Dedicación</div>
            </div>
            <div class="stat-item">
              <div class="stat-value">∞</div>
              <div class="stat-label">Creatividad</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Skills Section -->
    <div class="skills-section">
      <h3 class="section-title">Tecnologías & Habilidades</h3>
      <div class="skills-grid">
        <div v-for="skill in skills" :key="skill.name" class="skill-card">
          <div class="skill-icon" :style="{ color: skill.color }">{{ skill.icon }}</div>
          <div class="skill-name">{{ skill.name }}</div>
        </div>
      </div>
    </div>

    <!-- Quick Links -->
    <div class="quick-links-section">
      <h3 class="section-title">Explorar</h3>
      <div class="links-grid">
        <router-link to="/projects" class="link-card">
          <IconFolder class="link-icon" />
          <div class="link-content">
            <div class="link-title">Proyectos</div>
            <div class="link-desc">Explora mi trabajo reciente</div>
          </div>
          <IconChevron direction="right" class="link-arrow" />
        </router-link>
        
        <router-link to="/about" class="link-card">
          <IconFile class="link-icon" />
          <div class="link-content">
            <div class="link-title">Sobre Mí</div>
            <div class="link-desc">Conoce mi trayectoria</div>
          </div>
          <IconChevron direction="right" class="link-arrow" />
        </router-link>
        
        <router-link to="/contact" class="link-card">
          <IconTerminal class="link-icon" />
          <div class="link-content">
            <div class="link-title">Contacto</div>
            <div class="link-desc">Hablemos de tu proyecto</div>
          </div>
          <IconChevron direction="right" class="link-arrow" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { apiService, type Profile } from '../services/api'
import IconFolder from './icons/IconFolder.vue'
import IconFile from './icons/IconFile.vue'
import IconTerminal from './icons/IconTerminal.vue'
import IconMail from './icons/IconMail.vue'
import IconLinkedIn from './icons/IconLinkedIn.vue'
import IconChevron from './icons/IconChevron.vue'

// Estado reactivo
const profile = ref<Profile | null>(null)

const projects = ref([
  { id: 1, name: 'E-commerce Platform' },
  { id: 2, name: 'Task Manager' },
  { id: 3, name: 'Weather Dashboard' },
  { id: 4, name: 'Portfolio Redesign' }
])

const skills = ref([
  { name: 'Vue.js', icon: '⚡', color: '#42b883' },
  { name: 'TypeScript', icon: '📘', color: '#007acc' },
  { name: 'Node.js', icon: '🟢', color: '#68a063' },
  { name: 'React', icon: '⚛️', color: '#61dafb' },
  { name: 'UI/UX', icon: '🎨', color: '#ff6b6b' },
  { name: 'Git', icon: '🔧', color: '#f05032' },
  { name: 'Design', icon: '✨', color: '#ffd93d' },
  { name: 'DevOps', icon: '🚀', color: '#00d9ff' }
])

// Métodos
const loadProfile = async () => {
  try {
    profile.value = await apiService.getProfile()
  } catch (error) {
    console.error('Error loading profile:', error)
    // En caso de error, usar datos por defecto
    profile.value = {
      id: '1',
      fullName: 'Omar Bouaouda Ruiz',
      title: 'Designer & Developer',
      description: 'Creando experiencias digitales minimalistas y funcionales que combinan diseño elegante con código limpio.',
      email: 'omar@example.com',
      linkedin: 'https://linkedin.com/in/omar',
      updatedAt: new Date().toISOString()
    }
  }
}

// Lifecycle
onMounted(() => {
  loadProfile()
})
</script>

<style scoped>
.home-container {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: var(--vscode-editor-bg);
  padding: 60px 40px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Hero Section */
.hero-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
  margin-bottom: 80px;
  min-height: 400px;
}

.hero-content {
  animation: fadeInUp 0.6s ease-out;
}

.greeting {
  font-size: 18px;
  color: var(--vscode-accent);
  font-weight: 500;
  margin-bottom: 12px;
}

.name {
  font-size: 48px;
  font-weight: 700;
  color: var(--vscode-text);
  margin: 0 0 8px 0;
  line-height: 1.2;
}

.title {
  font-size: 32px;
  font-weight: 400;
  color: var(--vscode-text-secondary);
  margin: 0 0 24px 0;
  line-height: 1.3;
}

.description {
  font-size: 16px;
  line-height: 1.7;
  color: var(--vscode-text-secondary);
  margin-bottom: 32px;
  max-width: 90%;
}

.cta-buttons {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
}

.btn :deep(svg) {
  width: 18px;
  height: 18px;
}

.btn-primary {
  background: var(--vscode-accent);
  color: #ffffff;
  border: 2px solid var(--vscode-accent);
}

.btn-primary:hover {
  background: var(--vscode-accent-hover);
  border-color: var(--vscode-accent-hover);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 122, 204, 0.3);
}

.btn-secondary {
  background: transparent;
  color: var(--vscode-text);
  border: 2px solid var(--vscode-border);
}

.btn-secondary:hover {
  background: var(--vscode-border);
  border-color: var(--vscode-accent);
  color: var(--vscode-accent);
  transform: translateY(-2px);
}

.social-links {
  display: flex;
  gap: 12px;
}

.social-link {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--vscode-sidebar-bg);
  color: var(--vscode-text-secondary);
  transition: all 0.2s;
  text-decoration: none;
}

.social-link:hover {
  background: var(--vscode-accent);
  color: #ffffff;
  transform: translateY(-2px);
}

.social-link :deep(svg) {
  width: 20px;
  height: 20px;
}

/* Hero Visual */
.hero-visual {
  animation: fadeInUp 0.6s ease-out 0.2s backwards;
  display: flex;
  justify-content: center;
  align-items: center;
}

.visual-card {
  width: 100%;
  max-width: 400px;
  background: var(--vscode-sidebar-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: var(--vscode-tab-bg);
  border-bottom: 1px solid var(--vscode-border);
}

.card-dots {
  display: flex;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot.red {
  background: #ff5f57;
}

.dot.yellow {
  background: #febc2e;
}

.dot.green {
  background: #28c840;
}

.card-title {
  font-size: 12px;
  color: var(--vscode-text-secondary);
  font-weight: 600;
}

.card-content {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 40px 20px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 36px;
  font-weight: 700;
  color: var(--vscode-accent);
  margin-bottom: 8px;
}

.stat-label {
  font-size: 12px;
  color: var(--vscode-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Skills Section */
.skills-section {
  margin-bottom: 80px;
  animation: fadeInUp 0.6s ease-out 0.4s backwards;
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--vscode-text);
  margin-bottom: 32px;
  text-align: center;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
}

.skill-card {
  background: var(--vscode-sidebar-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  transition: all 0.2s;
  cursor: default;
}

.skill-card:hover {
  border-color: var(--vscode-accent);
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.skill-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.skill-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--vscode-text);
}

/* Quick Links Section */
.quick-links-section {
  animation: fadeInUp 0.6s ease-out 0.6s backwards;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 24px;
  background: var(--vscode-sidebar-bg);
  border: 1px solid var(--vscode-border);
  border-radius: 8px;
  text-decoration: none;
  transition: all 0.2s;
  cursor: pointer;
}

.link-card:hover {
  border-color: var(--vscode-accent);
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.link-icon {
  width: 40px;
  height: 40px;
  min-width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--vscode-editor-bg);
  border-radius: 8px;
  color: var(--vscode-accent);
}

.link-icon :deep(svg) {
  width: 20px;
  height: 20px;
}

.link-content {
  flex: 1;
}

.link-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--vscode-text);
  margin-bottom: 4px;
}

.link-desc {
  font-size: 13px;
  color: var(--vscode-text-secondary);
}

.link-arrow {
  width: 20px;
  height: 20px;
  color: var(--vscode-text-secondary);
  transition: transform 0.2s;
}

.link-card:hover .link-arrow {
  transform: translateX(4px);
  color: var(--vscode-accent);
}

.link-arrow :deep(svg) {
  width: 20px;
  height: 20px;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 968px) {
  .home-container {
    padding: 40px 24px;
  }

  .hero-section {
    grid-template-columns: 1fr;
    gap: 40px;
    margin-bottom: 60px;
  }

  .name {
    font-size: 36px;
  }

  .title {
    font-size: 24px;
  }

  .description {
    max-width: 100%;
  }
}

@media (max-width: 640px) {
  .home-container {
    padding: 24px 16px;
  }

  .name {
    font-size: 32px;
  }

  .title {
    font-size: 20px;
  }

  .cta-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }

  .card-content {
    padding: 30px 16px;
  }

  .stat-value {
    font-size: 28px;
  }

  .skills-grid {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 12px;
  }

  .skill-card {
    padding: 16px;
  }

  .links-grid {
    grid-template-columns: 1fr;
  }
}
</style> 