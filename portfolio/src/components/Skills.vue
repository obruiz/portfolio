<template>
  <section class="skills-section">
    <div class="skills-container">
      <div class="skills-category" v-for="(skills, category) in skillCategories" :key="category">
        <div class="category-header">
          <h3>{{ category }}</h3>
        </div>
        <div class="skills-list">
          <div class="skill-card" v-for="skill in skills" :key="skill.name">
            <div class="skill-header">
              <div class="skill-icon">
                <i :class="skill.icon"></i>
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
            <div class="skill-details">
              <p>{{ skill.description }}</p>
              <div class="tags">
                <span v-for="tag in skill.tags" :key="tag" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const skillCategories = {
  'Desarrollo Backend': [
    {
      name: 'Backend Serverless',
      level: 90,
      description: 'Arquitectura serverless con Turso y Cloudflare, optimización de rendimiento y escalabilidad.',
      tags: ['Turso', 'Cloudflare', 'API', 'NoEstoy.app'],
      icon: 'i-carbon-cloud'
    },
    {
      name: 'PL/SQL',
      level: 85,
      description: 'Desarrollo y optimización de bases de datos, procedimientos almacenados y consultas complejas.',
      tags: ['GTT', 'Optimización', 'Stored Procedures'],
      icon: 'i-carbon-database'
    }
  ],
  'DevOps & Cloud': [
    {
      name: 'CI/CD',
      level: 80,
      description: 'Implementación de pipelines de integración continua y despliegue automático.',
      tags: ['GitHub Actions', 'Jenkins', 'Automatización'],
      icon: 'i-carbon-delivery'
    },
    {
      name: 'Docker',
      level: 80,
      description: 'Containerización de aplicaciones y servicios, gestión de entornos.',
      tags: ['Containers', 'Docker Compose', 'Microservicios'],
      icon: 'i-carbon-container-software'
    }
  ],
  'Lenguajes & Frameworks': [
    {
      name: 'JavaScript/TypeScript',
      level: 90,
      description: 'Desarrollo fullstack, implementación de APIs y lógica de negocio.',
      tags: ['Vue', 'Node.js', 'Express', 'React'],
      icon: 'i-carbon-javascript'
    },
    {
      name: 'Python',
      level: 75,
      description: 'Scripts de automatización y herramientas de procesamiento de datos.',
      tags: ['Automation', 'Data Processing', 'Scripts'],
      icon: 'i-carbon-logo-python'
    },
    {
      name: 'C++',
      level: 70,
      description: 'Desarrollo de aplicaciones de alto rendimiento y sistemas.',
      tags: ['Performance', 'Systems', 'Optimization'],
      icon: 'i-carbon-cpp'
    }
  ]
}
</script>

<style scoped>
.skills-section {
  width: 100%;
  padding: 2rem;
  background: rgba(15, 23, 42, 0.3);
  position: relative;
  height: 100vh;
  overflow-y: auto;
}

.skills-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding-bottom: 4rem;
}

.skills-category {
  background: rgba(30, 41, 59, 0.4);
  border-radius: 1rem;
  padding: 2rem;
  backdrop-filter: blur(10px);
}

.category-header h3 {
  font-size: 1.8rem;
  color: #e2e8f0;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #818cf8 0%, #4f46e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.skills-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.skill-card {
  background: rgba(51, 65, 85, 0.4);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-2px);
  background: rgba(51, 65, 85, 0.6);
}

.skill-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}

.skill-icon {
  font-size: 2rem;
  color: #818cf8;
}

.skill-card h4 {
  font-size: 1.2rem;
  color: #e2e8f0;
  margin: 0;
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
  transition: stroke-dashoffset 1s ease;
  stroke: #818cf8;
}

.progress-text {
  position: relative;
  color: #e2e8f0;
  font-size: 1.5rem;
  font-weight: 600;
  font-family: 'Outfit', sans-serif;
  z-index: 1;
}

.skill-details {
  width: 100%;
}

.skill-details p {
  color: #94a3b8;
  font-size: 0.9rem;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: rgba(129, 140, 248, 0.2);
  color: #818cf8;
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .skills-section {
    padding: 1rem;
  }

  .skills-category {
    padding: 1.5rem;
  }

  .category-header h3 {
    font-size: 1.5rem;
  }

  .skills-list {
    grid-template-columns: 1fr;
  }
}
</style>