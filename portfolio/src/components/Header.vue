<template>
  <div id="nav-bar">
    <input id="nav-toggle" type="checkbox" v-model="isExpanded" />
    <div id="nav-header">
      <a id="nav-title" href="/" @click.prevent="navigateTo('/')">
        <div class="logo-icon">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 17L12 22L22 17" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <span class="nav-title-text">Portfolio</span>
      </a>
      <label for="nav-toggle">
        <span id="nav-toggle-burger"></span>
      </label>
      <hr />
    </div>
    <div id="nav-content">
      <div id="nav-content-highlight"></div>
      <div class="nav-section">
        <div class="nav-button" :class="{ active: $route.path === '/' }" @click="navigateTo('/')">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="9 22 9 12 15 12 15 22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Home</span>
        </div>
        <div class="nav-button" :class="{ active: $route.path === '/projects' }" @click="navigateTo('/projects')">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Projects</span>
        </div>
        <div class="nav-button" :class="{ active: $route.path === '/about' }" @click="navigateTo('/about')">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>About</span>
        </div>
        <div class="nav-button" :class="{ active: $route.path === '/contact' }" @click="navigateTo('/contact')">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <polyline points="22,6 12,13 2,6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>Contact</span>
        </div>
      </div>
      <hr />
      <div class="nav-section settings">
        <div class="section-label">Settings</div>
        <div class="nav-button" @click="$emit('toggle-theme')">
          <svg v-if="isDark" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>{{ isDark ? 'Light Mode' : 'Dark Mode' }}</span>
        </div>
        <div class="nav-button" @click="$emit('toggle-font')">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polyline points="4 7 4 4 20 4 20 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="9" y1="20" x2="15" y2="20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>{{ isMonospaced ? 'Sans Font' : 'Mono Font' }}</span>
        </div>
      </div>
    </div>
    <div id="nav-footer">
      <div id="nav-footer-heading">
        <div id="nav-footer-avatar">
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
            <path d="M12 16v-4m0-4h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <div id="nav-footer-titlebox">
          <div class="user-name">Omar B.</div>
          <div class="user-status">Online</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

defineProps<{
  isDark: boolean
  isMonospaced: boolean
}>()

defineEmits<{
  'toggle-theme': []
  'toggle-font': []
}>()

const router = useRouter()
const isExpanded = ref(false)

const navigateTo = (path: string) => {
  router.push(path)
  isExpanded.value = false
}
</script>

<style scoped>
:root {
  --background: #9c88ff;
  --navbar-width: 380px;
  --navbar-width-min: 80px;
  --navbar-dark-primary: #18283b;
  --navbar-dark-secondary: #2c3e50;
  --navbar-light-primary: #f5f6fa;
  --navbar-light-secondary: #8392a5;
  --navbar-hover: #9c88ff;
  --navbar-hover-bg: rgba(156, 136, 255, 0.15);
  --navbar-active-bg: rgba(156, 136, 255, 0.25);
}

#nav-bar {
  position: fixed;
  left: 1.5rem;
  top: 1.5rem;
  height: calc(100vh - 3rem);
  background: #ffffff;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  color: #1a1a1a;
  overflow: hidden;
  user-select: none;
  z-index: 1000;
  width: var(--navbar-width);
  transition: width 0.2s;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

#nav-bar hr {
  margin: 0;
  position: relative;
  left: 16px;
  width: calc(100% - 32px);
  border: none;
  border-top: solid 1px #e5e5e5;
}

#nav-bar a {
  color: inherit;
  text-decoration: inherit;
}

#nav-bar input[type="checkbox"] {
  display: none;
}

#nav-toggle:checked ~ #nav-header {
  width: calc(var(--navbar-width-min) - 16px);
}

#nav-toggle:checked ~ #nav-content,
#nav-toggle:checked ~ #nav-footer {
  width: var(--navbar-width-min);
}

#nav-toggle:checked ~ #nav-header #nav-title {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.1s;
}

#nav-toggle:checked ~ #nav-header label[for="nav-toggle"] {
  left: calc(50% - 8px);
  transform: translate(-50%);
}

#nav-toggle:checked ~ #nav-header #nav-toggle-burger {
  background: var(--navbar-light-primary);
}

#nav-toggle:checked ~ #nav-header #nav-toggle-burger::before,
#nav-toggle:checked ~ #nav-header #nav-toggle-burger::after {
  width: 16px;
  background: var(--navbar-light-secondary);
  transform: translate(0, 0) rotate(0deg);
}

#nav-toggle:checked ~ #nav-content .nav-button span {
  opacity: 0;
  transition: opacity 0.1s;
}

#nav-toggle:checked ~ #nav-content .nav-button svg {
  min-width: calc(100% - 16px);
}

#nav-toggle:checked ~ #nav-footer #nav-footer-avatar {
  margin-left: 0;
  left: 50%;
  transform: translate(-50%);
}

#nav-toggle:checked ~ #nav-footer #nav-footer-titlebox,
#nav-toggle:checked ~ #nav-footer label[for="nav-footer-toggle"] {
  opacity: 0;
  transition: opacity 0.1s;
  pointer-events: none;
}

#nav-header {
  position: relative;
  left: 16px;
  width: calc(var(--navbar-width) - 16px);
  min-height: 80px;
  background: #ffffff;
  border-radius: 16px;
  z-index: 2;
  display: flex;
  align-items: center;
  transition: width 0.2s;
}

#nav-header hr {
  position: absolute;
  bottom: 0;
}

#nav-title {
  font-size: 1.5rem;
  transition: opacity 1s;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: inherit;
}

.logo-icon {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--background), #7c68d8);
  border-radius: 10px;
  flex-shrink: 0;
}

.logo-icon svg {
  width: 20px;
  height: 20px;
  color: white;
}

.nav-title-text {
  font-weight: 600;
}

label[for="nav-toggle"] {
  position: absolute;
  right: 0;
  width: 3rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

#nav-toggle-burger {
  position: relative;
  width: 16px;
  height: 2px;
  background: #1a1a1a;
  border-radius: 99px;
  transition: background 0.2s;
}

#nav-toggle-burger::before,
#nav-toggle-burger::after {
  content: '';
  position: absolute;
  top: -6px;
  width: 10px;
  height: 2px;
  background: #1a1a1a;
  border-radius: 99px;
  transform: translate(2px, 8px) rotate(30deg);
  transition: 0.2s;
}

#nav-toggle-burger::after {
  top: 6px;
  transform: translate(2px, -8px) rotate(-30deg);
}

#nav-content {
  margin: -16px 0;
  padding: 16px 0;
  position: relative;
  flex: 1;
  width: var(--navbar-width);
  background: #ffffff;
  box-shadow: 0 0 0 16px #ffffff;
  direction: rtl;
  overflow-x: hidden;
  transition: width 0.2s;
}

#nav-content::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

#nav-content::-webkit-scrollbar-thumb {
  border-radius: 99px;
  background-color: var(--background);
}

#nav-content::-webkit-scrollbar-button {
  height: 16px;
}

#nav-content-highlight {
  position: absolute;
  left: 16px;
  top: -70px;
  width: calc(100% - 16px);
  height: 54px;
  background: var(--background);
  border-radius: 16px 0 0 16px;
  transition: top 0.2s ease;
  pointer-events: none;
  z-index: 0;
}

#nav-content-highlight::before,
#nav-content-highlight::after {
  content: '';
  position: absolute;
  right: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #ffffff;
}

#nav-content-highlight::before {
  top: -32px;
  box-shadow: 16px 16px 0 var(--background);
}

#nav-content-highlight::after {
  bottom: -32px;
  box-shadow: 16px -16px 0 var(--background);
}

.nav-section {
  direction: ltr;
}

.section-label {
  padding: 8px 16px;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #8392a5;
  direction: ltr;
}

.nav-button {
  position: relative;
  margin-left: 16px;
  height: 54px;
  display: flex;
  align-items: center;
  color: #1a1a1a;
  direction: ltr;
  cursor: pointer;
  z-index: 1;
  transition: all 0.2s ease;
  border-radius: 0 16px 16px 0;
}

.nav-button span {
  transition: opacity 1s;
}

.nav-button svg {
  min-width: 3rem;
  width: 20px;
  height: 20px;
  transition: min-width 0.2s;
}

.nav-button:hover {
  color: #ffffff;
}

.nav-button.active {
  color: #ffffff;
  font-weight: 600;
}

.nav-button:nth-of-type(1):hover ~ #nav-content-highlight {
  top: 16px;
}

.nav-button:nth-of-type(2):hover ~ #nav-content-highlight {
  top: calc(54px + 16px);
}

.nav-button:nth-of-type(3):hover ~ #nav-content-highlight {
  top: calc(108px + 16px);
}

.nav-button:nth-of-type(4):hover ~ #nav-content-highlight {
  top: calc(162px + 16px);
}

.nav-button:nth-of-type(5):hover ~ #nav-content-highlight {
  top: calc(216px + 16px);
}

.nav-button:nth-of-type(6):hover ~ #nav-content-highlight {
  top: calc(270px + 16px);
}

.nav-button:nth-of-type(7):hover ~ #nav-content-highlight {
  top: calc(324px + 16px);
}

.nav-button:nth-of-type(8):hover ~ #nav-content-highlight {
  top: calc(378px + 16px);
}

.nav-button.active:nth-of-type(1) ~ #nav-content-highlight {
  top: 16px;
}

.nav-button.active:nth-of-type(2) ~ #nav-content-highlight {
  top: calc(54px + 16px);
}

.nav-button.active:nth-of-type(3) ~ #nav-content-highlight {
  top: calc(108px + 16px);
}

.nav-button.active:nth-of-type(4) ~ #nav-content-highlight {
  top: calc(162px + 16px);
}

.nav-button.active:nth-of-type(5) ~ #nav-content-highlight {
  top: calc(216px + 16px);
}

.nav-button.active:nth-of-type(6) ~ #nav-content-highlight {
  top: calc(270px + 16px);
}

#nav-footer {
  position: relative;
  width: var(--navbar-width);
  height: 54px;
  background: #f5f6fa;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  z-index: 2;
  transition: width 0.2s, height 0.2s;
}

#nav-footer-heading {
  position: relative;
  width: 100%;
  height: 54px;
  display: flex;
  align-items: center;
}

#nav-footer-avatar {
  position: relative;
  margin: 11px 0 11px 16px;
  left: 0;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  transform: translate(0);
  transition: 0.2s;
  background: linear-gradient(135deg, var(--background), #7c68d8);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar svg {
  width: 20px;
  height: 20px;
  color: white;
}

#nav-footer-titlebox {
  position: relative;
  margin-left: 16px;
  width: 10px;
  display: flex;
  flex-direction: column;
  transition: opacity 1s;
  flex: 1;
}

.user-name {
  font-size: 0.9rem;
  font-weight: 600;
}

.user-status {
  color: #8392a5;
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-status::before {
  content: '';
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
  display: inline-block;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

label[for="nav-footer-toggle"] {
  position: absolute;
  right: 0;
  width: 3rem;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

#nav-footer-content {
  margin: 0 16px 16px 16px;
  border-top: solid 1px #e5e5e5;
  padding: 16px 0;
  color: #8392a5;
  font-size: 0.8rem;
  overflow: auto;
}

#nav-footer-content::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

#nav-footer-content::-webkit-scrollbar-thumb {
  border-radius: 99px;
  background-color: var(--background);
}

@media (max-width: 768px) {
  #nav-bar {
    width: var(--navbar-width-min);
    left: 1rem;
    top: 1rem;
    height: calc(100vh - 2rem);
  }

  #nav-header {
    width: calc(var(--navbar-width-min) - 16px);
  }

  #nav-title {
    opacity: 0;
  }

  #nav-content {
    width: var(--navbar-width-min);
  }

  .nav-button span {
    opacity: 0;
  }

  .nav-button svg {
    min-width: calc(100% - 16px);
  }

  #nav-footer {
    width: var(--navbar-width-min);
  }

  #nav-footer-titlebox {
    opacity: 0;
  }

  #nav-toggle:checked ~ #nav-bar {
    width: var(--navbar-width);
  }

  #nav-toggle:checked ~ #nav-header {
    width: calc(var(--navbar-width) - 16px);
  }

  #nav-toggle:checked ~ #nav-header #nav-title {
    opacity: 1;
  }

  #nav-toggle:checked ~ #nav-content {
    width: var(--navbar-width);
  }

  #nav-toggle:checked ~ #nav-content .nav-button span {
    opacity: 1;
  }

  #nav-toggle:checked ~ #nav-content .nav-button svg {
    min-width: 3rem;
  }

  #nav-toggle:checked ~ #nav-footer {
    width: var(--navbar-width);
  }

  #nav-toggle:checked ~ #nav-footer #nav-footer-titlebox {
    opacity: 1;
  }
}
</style>

