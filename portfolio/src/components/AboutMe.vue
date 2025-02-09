<template>
  <section class="about-me">
    <div class="about-content">
      <div class="separator"></div>
      <h2 class="title">Sobre Mí</h2>
      <p class="description">
        Soy un Ingeniero Informático apasionado por el desarrollo de software y la creación de soluciones tecnológicas innovadoras. Con experiencia en desarrollo fullstack y un enfoque en crear aplicaciones que impacten positivamente a los usuarios.
      </p>
    </div>

    <div class="image-containers">
      <div class="image-box">
        <h3>Mi Experiencia</h3>
        <div class="experience-content">
          <div class="experience-item">
            <h4>CEO y Backend Developer</h4>
            <p class="experience-description">
              Actualmente soy CEO y responsable del desarrollo backend de NoEstoy.
            </p>
          </div>
          <div class="experience-item">

            <h4>Programador Fullstack - Gestión Tributaria Territorial</h4>
            <p class="experience-description">
              Durante 2 años, trabajé como desarrollador fullstack en el equipo de Gestión Tributaria Territorial, donde utilicé diversas tecnologías como XML, JavaScript, C# y PL/SQL para desarrollar soluciones robustas y eficientes.
            </p>
          </div>
        </div>
      </div>

      <div class="image-box">
        <h3>Mis Proyectos</h3>
        <div class="projects-content">
          <div class="project-item">
            <h4><a href="https://noestoy.app" target="_blank" rel="noopener noreferrer">noestoy.app</a></h4>
            <p class="project-description">
              Una aplicación innovadora donde lidero el desarrollo backend y la dirección estratégica como CEO. El proyecto representa mi visión de cómo la tecnología puede mejorar la vida cotidiana de las personas.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Aquí irán los imports y la lógica del componente
</script>

<style scoped>
.about-me {
  min-height: 100vh;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
  position: relative;
}

.about-content {
  text-align: center;
  max-width: 800px;
  padding-top: 8rem;
}

.title {
  font-size: 3rem;
  margin-bottom: 1.5rem;
  background: linear-gradient(135deg, #818cf8 0%, #4f46e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.description {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #94a3b8;
}

.image-containers {
  display: flex;
  flex-direction: column;
  gap: 6rem;
  width: 100%;
}

.image-box {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  transition: transform 0.3s ease;
}

.image-box h3 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #e2e8f0;
  text-align: center;
  background: linear-gradient(135deg, #818cf8 0%, #4f46e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.image-placeholder {
  width: 100%;
  height: 400px;
  background: rgba(51, 65, 85, 0.3);
  border-radius: 1rem;
  margin: 2rem 0;
  transition: transform 0.3s ease;
}

.image-placeholder:hover {
  transform: scale(1.02);
}

.image-description {
  font-size: 1.1rem;
  color: #94a3b8;
  line-height: 1.8;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.experience-content,
.projects-content {
  background: rgba(51, 65, 85, 0.3);
  border-radius: 1rem;
  padding: 2rem;
  margin: 2rem 0;
}

.experience-item,
.project-item {
  margin-bottom: 2rem;
}

.experience-item:last-child,
.project-item:last-child {
  margin-bottom: 0;
}

h4 {
  font-size: 1.5rem;
  color: #e2e8f0;
  margin-bottom: 1rem;
}

.experience-description,
.project-description {
  font-size: 1.1rem;
  color: #94a3b8;
  line-height: 1.8;
}

a {
  color: #818cf8;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #4f46e5;
}

@media (max-width: 768px) {
  .about-me {
    padding: 1rem;
    gap: 3rem;
  }

  .title {
    font-size: 2.5rem;
  }

  .image-box h3 {
    font-size: 1.8rem;
  }

  .image-placeholder {
    height: 300px;
  }

  h4 {
    font-size: 1.3rem;
  }

  .experience-content,
  .projects-content {
    padding: 1.5rem;
  }
}

.separator {
  width: 50px;
  height: 2px;
  background: linear-gradient(135deg, #818cf8 0%, #4f46e5 100%);
  position: absolute;
  top: 4rem;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0.7;
}
</style> 