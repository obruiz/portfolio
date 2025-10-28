import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

createApp(App)
  .use(router)
  .mount('#app')

// Eliminar cualquier imagen de fondo residual
if (typeof window !== 'undefined') {
  window.addEventListener('DOMContentLoaded', () => {
    document.body.style.backgroundImage = 'none'
    document.body.style.background = getComputedStyle(document.documentElement).getPropertyValue('--vscode-bg')
    document.documentElement.style.backgroundImage = 'none'
    document.documentElement.style.background = getComputedStyle(document.documentElement).getPropertyValue('--vscode-bg')
  })
}
