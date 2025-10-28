<template>
  <footer>
    <div class="footer-content">
      <div class="links">
        <a href="https://linkedin.com/in/tu-perfil" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <a href="https://github.com/tu-usuario" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="mailto:tu@email.com">Email</a>
      </div>
      <div class="copyright">
        © {{ currentYear }}
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style scoped>
footer {
  border-top: 1px solid var(--border-light);
  padding: 2rem 0;
  margin-top: 6rem;
}

.dark footer {
  border-top-color: var(--border-dark);
}

.footer-content {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.links {
  display: flex;
  gap: 2rem;
}

.links a {
  font-size: 0.9rem;
  color: var(--secondary-text-light);
  text-decoration: none;
  transition: color 0.2s;
}

.dark .links a {
  color: var(--secondary-text-dark);
}

.links a:hover {
  color: var(--text-light);
}

.dark .links a:hover {
  color: var(--text-dark);
}

.copyright {
  font-size: 0.9rem;
  color: var(--secondary-text-light);
}

.dark .copyright {
  color: var(--secondary-text-dark);
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
    padding: 0 1.5rem;
  }

  .links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-content {
    padding: 0 1rem;
  }

  .links {
    flex-direction: column;
    gap: 1rem;
  }
}
</style> 