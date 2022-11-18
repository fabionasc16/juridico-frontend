import Vue from 'vue'
import './plugins/bootstrap-vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
//import { BIconSearch, BIconPlusCircle, BIconInfoCircle, BIconJournalText, BIconX } from 'bootstrap-vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import App from './App.vue'
import router from './router'
import store from './store'
import 'animate.css'
import 'axios'

//import HighchartsVue from 'highcharts-vue'
import vSelect from 'vue-select'
Vue.component('v-select', vSelect)

import VueCompositionAPI from '@vue/composition-api'
Vue.use(VueCompositionAPI)

/*import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'*/
import 'vue-select/dist/vue-select.css';

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')