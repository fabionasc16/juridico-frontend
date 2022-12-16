import Vue from 'vue'
import Vuex from 'vuex'

/* modules */
import caracteristicas from './caracteristicas'
import RegistrarEntrada from './registrarEntrada'
import usuario from "./usuario";

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    caracteristicas,
    RegistrarEntrada,
    usuario,
  }
})
