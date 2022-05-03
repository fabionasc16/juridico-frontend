import Vue from 'vue'
import Vuex from 'vuex'

/* modules */
import caracteristicas from './caracteristicas'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    caracteristicas
  }
})
