import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Skills from '../components/Skills.vue'
import Projects from '../components/Projects.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/skills',
    name: 'skills',
    component: Skills
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 