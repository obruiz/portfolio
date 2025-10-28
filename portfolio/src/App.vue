<template>
  <VSCodeLayout :is-dark="isDark" @toggle-theme="toggleTheme">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </VSCodeLayout>
</template>

<script setup lang="ts">
import VSCodeLayout from './components/VSCodeLayout.vue'
import { ref, watch } from 'vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

// Cargar preferencias
if (typeof window !== 'undefined') {
  isDark.value = localStorage.getItem('theme') === 'dark'
}

// Aplicar clase al body
watch(isDark, () => {
  if (isDark.value) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
}, { immediate: true })
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
