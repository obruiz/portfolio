<template>
  <section class="contact-section">
    <div class="content-wrapper">
      <div class="about-section">
        <h2 class="section-title">Sobre mí</h2>
        <p class="about-text">
          Soy un Ingeniero Informático apasionado por el desarrollo de software y la creación de soluciones tecnológicas innovadoras. 
          Actualmente, lidero el desarrollo backend de NoEstoy.app, donde combino mi experiencia técnica con una visión estratégica 
          para crear productos que impacten positivamente en la vida de las personas.
        </p>
      </div>

      <div class="contact-content">
        <h2 class="section-title">Contacto</h2>
        <p class="description">
          ¿Tienes un proyecto en mente? ¡Me encantaría escucharlo!
        </p>
        <div class="contact-info">
          <div class="contact-item">
            <i class="i-carbon-email"></i>
            <a href="mailto:tu@email.com" class="contact-link">tu@email.com</a>
          </div>
          <div class="contact-item">
            <i class="i-carbon-location"></i>
            <span>Alicante, España</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  width: 100%;
  padding: 4rem 0;
}

.content-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 6rem;
  justify-content: center;
}

.about-section {
  text-align: left;
  max-width: min(380px, 90vw);
  flex-shrink: 0;
}

.about-text {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #94a3b8;
  margin-top: 1.5rem;
}

.contact-content {
  text-align: left;
  max-width: min(700px, 90vw);
}

.section-title {
  font-size: 2.5rem;
  background: linear-gradient(135deg, #818cf8 0%, #4f46e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.2rem;
  color: #94a3b8;
  margin-bottom: 3rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.1rem;
  color: #e2e8f0;
}

.contact-item i {
  font-size: 1.5rem;
  color: #818cf8;
}

.contact-link {
  color: #e2e8f0;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #818cf8;
}

@media (max-width: 1024px) {
  .content-wrapper {
    gap: 4rem;
  }
}

@media (max-width: 768px) {
  .contact-section {
    padding: 2rem 0;
  }

  .content-wrapper {
    flex-direction: column;
    gap: 3rem;
    align-items: center;
  }

  .about-section,
  .contact-content {
    text-align: center;
  }

  .section-title {
    font-size: 2rem;
  }

  .about-text,
  .description {
    font-size: 1.1rem;
  }

  .contact-info {
    align-items: center;
  }
}
</style> 