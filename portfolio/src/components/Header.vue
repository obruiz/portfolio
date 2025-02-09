<template>
  <header>
    <div class="logo">obruiz</div>
    <nav class="nav" :style="{ '--index': getActiveIndex }">
      <router-link 
        v-for="(item, index) in navItems" 
        :key="item.title"
        :to="item.href"
        class="nav_link material-symbols-outlined"
        :class="{ active: activeSection === item.title }"
        @click.native="setActiveSection(item.title, index)"
      >
        {{ item.icon }}
      </router-link>
      <div class="nav_title">{{ activeSection }}</div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeSection = ref('home')
const activeIndex = ref(0)

const getActiveIndex = computed(() => activeIndex.value)

const navItems = [
  { title: 'home', href: '/', icon: 'home' },
  { title: 'about', href: '/about', icon: 'person' },
  { title: 'skills', href: '/skills', icon: 'code' },
  { title: 'projects', href: '/projects', icon: 'work' },
  { title: 'contact', href: '/contact', icon: 'mail' }
]

const setActiveSection = (section: string, index: number) => {
  activeSection.value = section
  activeIndex.value = index
}
</script>

<style scoped>
.logo {
  position: fixed;
  top: 1.5rem;
  left: 3.5rem;
  font-size: clamp(1.5rem, 4vw, 2rem);
  font-weight: 600;
  color: var(--primary-color);
  font-family: 'Outfit', sans-serif;
  z-index: 1000;
  background: linear-gradient(45deg, var(--secondary-color), var(--primary-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: 1px;
  text-transform: lowercase;
}

.nav {
  display: flex;
  background: rgba(30, 41, 59, 0.8);
  font-family: arial;
  border-radius: 12px;
  position: fixed;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  --nav-link-width: clamp(70px, 15vw, 100px);
  padding: 0.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  backdrop-filter: blur(10px);
}

.nav_title {
  position: absolute;
  bottom: 10px;
  width: var(--nav-link-width);
  font-size: clamp(12px, 2.5vw, 15px);
  text-align: center;
  text-transform: capitalize;
  transform: translateX(calc(var(--nav-link-width) * var(--index)));
  transition: transform 0.3s ease;
  color: var(--primary-color);
}

.nav_link {
  display: inline-block;
  color: #64748b;
  text-decoration: none;
  width: var(--nav-link-width);
  text-align: center;
  padding: 20px 0 30px 0;
  font-size: clamp(18px, 3vw, 24px);
  transition: 0.2s ease-in;
  position: relative;
  text-shadow: 0 0 0 #0000;
}

.nav_link:hover {
  color: #94a3b8;
}

.nav_link.active {
  color: var(--primary-color);
  font-size: 22px;
  text-shadow: 4px 0 4px rgba(129, 140, 248, 0.3);
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  .nav {
    background: rgba(17, 24, 39, 0.9);
    backdrop-filter: blur(5px);
  }

  .nav_link {
    color: #9ca3af;
  }

  .nav_link:hover {
    color: #e5e7eb;
  }

  .nav_link.active {
    color: #818cf8;
    text-shadow: 4px 0 4px rgba(129, 140, 248, 0.3);
  }

  .nav_title {
    color: #818cf8;
  }
}

/* Mobile responsiveness */
@media (max-width: 600px) {
  .nav {
    padding: 0.3rem;
  }

  .nav_link {
    padding: 15px 0 25px 0;
  }

  .nav_link.active {
    font-size: 0.9em;
  }

  .logo {
    top: 1rem;
    left: 1.5rem;
  }
}
</style>

