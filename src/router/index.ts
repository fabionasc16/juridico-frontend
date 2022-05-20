import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/processos', name: 'Processos', component: () => import('../views/Processos/CadastroProcesso.vue') },
  { path: '/usuarios', name: 'Usuários', component: () => import(/* webpackChunkName: "about" */ '../views/Usuarios/CadastroUsuario.vue') },
  { path: '/dashboard', name: 'Dashboard', component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard/BarChart.vue') },
  { path: '/registroEntrada', name: 'Registro de Entrada', component: () => import('../views/Entrada/FormRegistro.vue') },
  { path: '/registroSaida', name: 'Registro de Saída', component: () => import('../views/Saida/FormRegistro.vue') },
  { path: '/registroIdentificadoInternado', name: 'Registro de Paciente Internado e Identificado', component: () => import('../views/Entrada/Internado/FormRegistro.vue') },
  { path: '/listaRegistroEntrada', name: 'Lista de Registro de Entrada', component: () => import('../views/Entrada/ListaRegistro.vue') },
  { path: '/processos', name: 'Cadastro de Processos', component: () => import('../views/Processos/CadastroProcesso.vue') },
  { path: '/processos/consulta', name: 'Consulta de Processos', component: () => import('../views/Processos/Consulta.vue') },
  { path: '/caracteristicas', name: 'Características', component: () => import('../views/Caracteristicas/CadastroCaracteristica.vue') },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
