import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/', name: 'Home', component: () => import('../views/PaginaInicial.vue') },
  { path: '/usuarios', name: 'Usuários', component: () => import(/* webpackChunkName: "about" */ '../views/Usuarios/Usuarios.vue') },
  { path: '/processos', name: 'Processos', component: () => import('../views/Processos/Processos.vue') },
  { path: '/dashboard', name: 'Dashboard', component: () => import('../views/Dashboard/Dashboard.vue') },
  { path: '/graficoColunas', name: 'Gráfico de Colunas', component: () => import('../views/Dashboard/Graficos/GraficoColunas.vue') },
  { path: '/graficoLinha', name: 'Gráfico de Linha', component: () => import('../views/Dashboard/Graficos/GraficoLinha.vue') },
  { path: '/graficoLinhas', name: 'Gráfico de Linhas', component: () => import('../views/Dashboard/Graficos/GraficoLinhas.vue') },
  { path: '/graficoPizza', name: 'Gráfico de Pizza', component: () => import('../views/Dashboard/Graficos/GraficoPizza.vue') },
  { path: '/responsaveis', name: 'Responsáveis', component: () => import('../views/Responsaveis/Responsaveis.vue') },
  { path: '/feriados', name: 'Feriados', component: () => import('../views/Feriados/Feriados.vue') },
  { path: '/orgaos', name: 'Órgãos Demandantes', component: () => import('../views/Orgaos/Orgaos.vue') },
  { path: '/tiposprocesso', name: 'Tipos Processo', component: () => import('../views/TiposProcesso/TiposProcesso.vue') },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
