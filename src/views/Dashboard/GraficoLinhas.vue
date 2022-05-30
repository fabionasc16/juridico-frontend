<template>
  <div>
    <h3 align="center">Gráfico de Linhas</h3>  
    <button class="float-right" @click="goTo('/dashboard')" v-show="!locationDash">Dashboard</button>
    <div id="app2" style="width: 90%;">
      <LineChart v-bind="lineChartProps" />
      <img style="width: 300px" v-if="imgData" :src="imgData" />
    </div>
</div>

</template>

<script>
import Vue from "vue";
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)

import { Chart, registerables } from 'chart.js';
import { LineChart, useLineChart } from "vue-chart-3";
import { ref, computed, defineComponent } from "@vue/composition-api";
import { shuffle } from "lodash";

Chart.register(...registerables);

//export default Vue.extend({

export default defineComponent({
  name: "App",
  components: {
    LineChart,
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
    const data = ref([50, 40, 65, 55, 25, 0, 0, 0, 0, 0, 0, 0]);
    const data2 = ref([30, 65, 55, 25, 65, 55, 25, 0, 0, 0, 0]);
    const legendTop = ref(true);
    const imgData = ref(null);

    const options = computed(() => ({
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    }));

    const chartData = computed(() => ({
      labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      datasets: [
        {
          data: data.value,
          label: "Linha 1",
          backgroundColor: [
            "#A3A500",
          ],
        },
        {
          data: data2.value,
          label: "Linha 2",
          backgroundColor: [
            "#000000",
          ],
        },
      ],
    }));

    const { lineChartProps, lineChartRef } = useLineChart({
      chartData,
      options,
    });

return { lineChartProps, lineChartRef, imgData };
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