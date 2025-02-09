<template>
  <div class="app">
    <div class="spotlight"></div>
    <Header />
    <main>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import { onMounted, onUnmounted } from 'vue'

const handleMouseMove = (e: MouseEvent) => {
  const spotlight = document.querySelector('.spotlight') as HTMLElement;
  if (spotlight) {
    const x = e.clientX;
    const y = e.clientY;
    spotlight.style.background = `
      radial-gradient(
        250px circle at ${x}px ${y}px,
        rgba(129, 140, 248, 0.5),
        rgba(129, 140, 248, 0.2) 25%,
        transparent 50%
      )
    `;
  }
};

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<style>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

main {
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
}

header {
  position: relative;
  z-index: 10;
}
</style>
