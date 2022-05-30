<template>
  <div>
    <h3 align="center">Gráfico de Pizza</h3>  
    <button class="float-right" @click="goTo('/dashboard')" v-show="!locationDash">Dashboard</button>
    <div id="app2" style="width: 90%;">
      <PieChart :chartData="testData" />
      <img style="width: 300px" v-if="imgData" :src="imgData" />
    </div>
  </div>

</template>

<script>
import Vue from "vue";
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)


import { Chart, registerables } from 'chart.js';
import { PieChart } from "vue-chart-3";
import { ref, computed, defineComponent } from "@vue/composition-api";
import { shuffle } from "lodash";

Chart.register(...registerables);

//export default Vue.extend({

export default defineComponent({
  name: "App",
  components: {
    PieChart,
  },
  props: {
    locationDash: Boolean
  },
  methods:{
      goTo(caminho){
          this.$router.push(caminho)
      }
  },
  setup() {
    const testData = {
      labels: ['Verde', 'Amarelo', 'Vermelho', 'Preto'],
      datasets: [
        {
          data: [60, 20, 12, 8],
          backgroundColor: ['#27AE60', '#F4D03F', '#E74C3C', '#212F3D'],
        },
      ],
    };

    return { testData };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>