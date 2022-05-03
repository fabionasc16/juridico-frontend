import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/pacientes', name: 'Pacientes', component: () => import('../views/Pacientes/Cadastro.vue') },
  { path: '/pacientes/consulta', name: 'Consulta de paciente', component: () => import('../views/Pacientes/Consulta.vue') },
  { path: '/caracteristicas', name: 'Características', component: () => import('../views/Caracteristicas/CadastroCaracteristica.vue') },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
