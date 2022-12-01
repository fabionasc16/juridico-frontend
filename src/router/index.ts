import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/', name: 'Login', meta: { layout: "Unlogged", requiresAuth: false }, component: () => import('../views/Auth/Login.vue') },
  { path: '/home', name: 'Home', meta: { layout: "logged", requiresAuth: false}, component: () => import('../views/PaginaInicial.vue') },
  { path: '/usuarios', name: 'Usuários', meta: { layout: "logged", requiresAuth: false}, component: () => import(/* webpackChunkName: "about" */ '../views/Usuarios/Usuarios.vue') },
  { path: '/processos', name: 'Processos', meta: { layout: "logged", requiresAuth: false}, component: () => import('../views/Processos/Processos.vue') },
  { path: '/dashboard', name: 'Dashboard', meta: { layout: "logged", requiresAuth: false}, component: () => import('../views/Dashboard/Dashboard.vue') },
  { path: '/graficoColunas', name: 'Gráfico de Colunas', meta: { layout: "logged", requiresAuth: false}, component: () => import('../views/Dashboard/Graficos/GraficoColunas.vue') },
  { path: '/graficoLinha', name: 'Gráfico de Linha', meta: { layout: "logged", requiresAuth: false}, component: () => import('../views/Dashboard/Graficos/GraficoLinha.vue') },
  { path: '/graficoLinhas', name: 'Gráfico de Linhas', meta: { layout: "logged", requiresAuth: false}, component: () => import('../views/Dashboard/Graficos/GraficoLinhas.vue') },
  { path: '/graficoPizza', name: 'Gráfico de Pizza', meta: { layout: "logged", requiresAuth: false}, component: () => import('../views/Dashboard/Graficos/GraficoPizza.vue') },
  { path: '/responsaveis', name: 'Responsáveis', meta: { layout: "logged", requiresAuth: false}, component: () => import('../views/Responsaveis/Responsaveis.vue') },
  { path: '/feriados', name: 'Feriados', meta: { layout: "logged", requiresAuth: false}, component: () => import('../views/Feriados/Feriados.vue') },
  { path: '/orgaos', name: 'Órgãos Demandantes', meta: { layout: "logged", requiresAuth: false}, component: () => import('../views/Orgaos/Orgaos.vue') },
  { path: '/tiposprocesso', name: 'Tipos Processo', meta: { layout: "logged", requiresAuth: false}, component: () => import('../views/TiposProcesso/TiposProcesso.vue') },

  { path: '/assuntos', name: 'Assuntos', meta: { layout: "logged", requiresAuth: false}, component: () => import('../views/Assuntos/Assuntos.vue') },

  { path: '/classificacoes', name: 'Classificação', meta: { layout: "logged", requiresAuth: false}, component: () => import('../views/Classificacao/Classificacao.vue') },

]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
