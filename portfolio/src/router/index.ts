import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import Projects from '../components/Projects.vue'
import AboutMe from '../components/AboutMe.vue'
import Contact from '../components/Contact.vue'
import Admin from '../components/Admin.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/projects',
    name: 'projects',
    component: Projects
  },
  {
    path: '/about',
    name: 'about',
    component: AboutMe
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact
  },
  {
    path: '/admin',
    name: 'admin',
    component: Admin
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