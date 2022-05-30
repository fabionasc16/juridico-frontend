import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/processos', name: 'Processos', component: () => import('../views/Processos/CadastroProcesso.vue') },
  { path: '/usuarios', name: 'Usuários', component: () => import(/* webpackChunkName: "about" */ '../views/Usuarios/CadastroUsuario.vue') },
  { path: '/usuarios2', name: 'Página de Usuários', component: () => import(/* webpackChunkName: "about" */ '../views/Usuarios/CadastroUsuario2.vue') },
  { path: '/processos', name: 'Processos', component: () => import('../views/Processos/CadastroProcesso.vue') },
  { path: '/processos2', name: 'Processos 2', component: () => import('../views/Processos/CadastroProcesso2.vue') },
  { path: '/processos3', name: 'Processos 3', component: () => import('../views/Processos/CadastroProcesso3.vue') },
  { path: '/dashboard', name: 'Dashboard', component: () => import('../views/Dashboard/Dashboard.vue') },
  { path: '/graficoColunas', name: 'Gráfico de Colunas', component: () => import('../views/Dashboard/GraficoColunas.vue') },
  { path: '/graficoLinha', name: 'Gráfico de Linha', component: () => import('../views/Dashboard/GraficoLinha.vue') },
  { path: '/graficoLinhas', name: 'Gráfico de Linhas', component: () => import('../views/Dashboard/GraficoLinhas.vue') },
  { path: '/graficoPizza', name: 'Gráfico de Pizza', component: () => import('../views/Dashboard/GraficoPizza.vue') },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
