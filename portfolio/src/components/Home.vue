<template>
  <div class="home-wrapper" ref="homeWrapper">
    <div class="container">
      <section class="home" :style="{ opacity: homeOpacity }">
        <div class="content-wrapper">
          <div class="left-column">
            <div class="profile-image">
              <img src="../assets/profile.jpg" alt="Omar Bouaouda Ruiz" />
              <div class="image-backdrop"></div>
            </div>
            <div class="about-section">
              <h2 class="section-title">Sobre mí</h2>
              <p class="about-text">
                Soy un Ingeniero Informático apasionado por el desarrollo de software y la creación de soluciones tecnológicas innovadoras. 
                Actualmente, lidero el desarrollo backend de NoEstoy.app, donde combino mi experiencia técnica con una visión estratégica 
                para crear productos que impacten positivamente en la vida de las personas.
              </p>
            </div>
          </div>
          <div class="right-column">
            <div class="content">
              <div class="title-wrapper">
                <span class="greeting">¡Hola! Soy</span>
                <h1>Omar Bouaouda Ruiz</h1>
                <h2>Ingeniero Informático</h2>
              </div>
              <p class="description">
                Desarrollando soluciones digitales innovadoras y creando experiencias web únicas.
              </p>
              <div class="cta-buttons">
                <a href="#contact" class="btn primary">Contactar</a>
                <a href="#projects" class="btn secondary">Ver Proyectos</a>
              </div>
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
        </div>
        <div class="scroll-indicator">
          <div class="mouse">
            <div class="wheel"></div>
          </div>
          <div class="arrow"></div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

const homeWrapper = ref<HTMLElement | null>(null);
const homeOpacity = ref(1);

const handleScroll = () => {
  if (!homeWrapper.value) return;
  
  const scrollPosition = homeWrapper.value.scrollTop;
  const windowHeight = window.innerHeight;
  
  homeOpacity.value = Math.max(0, 1 - (scrollPosition / (windowHeight * 0.7)));
};

onMounted(() => {
  if (homeWrapper.value) {
    homeWrapper.value.addEventListener('scroll', handleScroll);
  }
});

onUnmounted(() => {
  if (homeWrapper.value) {
    homeWrapper.value.removeEventListener('scroll', handleScroll);
  }
});
</script>

<style scoped>
.home-wrapper {
  height: 100vh;
  overflow-y: auto;
  scroll-behavior: smooth;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 0;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.container {
  max-width: 1400px;
  width: 100%;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  z-index: 1;
}

.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  position: relative;
  font-family: 'Outfit', sans-serif;
  overflow: hidden;
  transition: opacity 0.3s ease;
}

.content-wrapper {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 6rem;
  justify-content: center;
}

.left-column, .right-column {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.left-column {
  flex-shrink: 0;
  width: min(380px, 90vw);
}

.right-column {
  flex: 1;
  max-width: min(700px, 90vw);
}

.profile-image {
  width: 100%;
  height: min(480px, 110vw);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.profile-image::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(0, 0, 0, 0.2)
  );
  z-index: 1;
}

.profile-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
  border-radius: 16px;
}

.image-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.1);
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.profile-image:hover {
  transform: translateY(-5px);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
}

.profile-image:hover img {
  transform: scale(1.02);
}

.profile-image:hover .image-backdrop {
  opacity: 1;
}

.content {
  text-align: left;
  padding-top: 2rem;
}

.title-wrapper {
  margin-bottom: 2rem;
}

.greeting {
  font-size: clamp(1.1rem, 3vw, 1.3rem);
  color: var(--primary-color);
  display: block;
  margin-bottom: -0.5rem;
  font-weight: 500;
  letter-spacing: 2px;
}

h1 {
  font-size: clamp(2.8rem, 5vw, 3.5rem);
  font-weight: 700;
  margin-bottom: 0.2rem;
  background: linear-gradient(45deg, var(--secondary-color), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
  letter-spacing: 1px;
  font-stretch: 105%;
}

h2 {
  font-size: clamp(1.4rem, 3vw, 1.8rem);
  color: var(--text-color);
  margin-bottom: 0.8rem;
  font-weight: 500;
  letter-spacing: 1px;
}

.description {
  font-size: clamp(1.1rem, 2.5vw, 1.2rem);
  color: #94a3b8;
  margin-bottom: 2rem;
  line-height: 1.8;
  font-weight: 300;
  letter-spacing: 0.5px;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-start;
  margin-bottom: 3rem;
}

.btn {
  padding: clamp(0.5rem, 2vw, 0.75rem) clamp(1.5rem, 3vw, 2rem);
  border-radius: 12px;
  font-weight: 500;
  transition: all 0.3s ease;
  text-decoration: none;
  font-size: clamp(0.9rem, 2.5vw, 1rem);
  font-family: 'Outfit', sans-serif;
}

.btn.primary {
  background: var(--secondary-color);
  color: white;
  box-shadow: 0 4px 15px rgba(129, 140, 248, 0.2);
}

.btn.primary:hover {
  background: #4338ca;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(129, 140, 248, 0.3);
}

.btn.secondary {
  border: 2px solid var(--secondary-color);
  color: var(--primary-color);
}

.btn.secondary:hover {
  background: rgba(129, 140, 248, 0.1);
  transform: translateY(-2px);
}

.section-title {
  font-size: 2.5rem;
  background: linear-gradient(135deg, #818cf8 0%, #4f46e5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.about-text {
  font-size: 1.2rem;
  line-height: 1.8;
  color: #94a3b8;
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

.scroll-indicator {
  position: absolute;
  bottom: 5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  opacity: 0.7;
  transition: opacity 0.3s ease;
  margin-top: 2rem;
  z-index: 20;
}

.scroll-indicator:hover {
  opacity: 1;
}

.mouse {
  width: 30px;
  height: 45px;
  border: 2px solid var(--primary-color);
  border-radius: 20px;
  position: relative;
}

.wheel {
  width: 4px;
  height: 8px;
  background-color: var(--primary-color);
  border-radius: 2px;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll 1.5s ease-in-out infinite;
}

.arrow {
  width: 10px;
  height: 10px;
  border-right: 2px solid var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
  transform: rotate(45deg);
  animation: arrow 1.5s ease-in-out infinite;
}

@keyframes scroll {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
}

@keyframes arrow {
  0% {
    opacity: 0;
    transform: rotate(45deg) translate(-5px, -5px);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: rotate(45deg) translate(5px, 5px);
  }
}

@media (max-width: 1024px) {
  .content-wrapper {
    gap: 4rem;
  }
}

@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    gap: 3rem;
    align-items: center;
  }

  .left-column, .right-column {
    width: 100%;
    align-items: center;
    text-align: center;
  }

  .content {
    text-align: center;
    padding-top: 0;
  }

  .cta-buttons {
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    margin-bottom: 2rem;
  }

  .btn {
    width: 100%;
    text-align: center;
  }

  .scroll-indicator {
    bottom: 2rem;
  }

  .mouse {
    width: 24px;
    height: 35px;
  }
}

@media (max-width: 350px) {
  .container {
    padding: 0 1rem;
  }
}
</style> 