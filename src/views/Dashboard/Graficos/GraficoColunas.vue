<template>
  <b-container fluid>
    <!-- CABEÇALHO -->
    <div class="row">
        <!-- TÍTULO -->
        <div class="col-10">
          <div align="left">
              <b-form-group class="m-0" label="Gráfico de Linha" label-size="lg"></b-form-group>
          </div>
        </div>
        <div class="col-2">
          <div align="center">
            <button @click="goTo('/dashboard')" v-show="!locationDash">Dashboard</button>
          </div>
        </div>
        <hr />
    </div>
    
    <!-- GRÁFICO -->
    <div id="app2" style="width: 90%;">
      <BarChart v-bind="barChartProps" />
      <img style="width: 300px" v-if="imgData" :src="imgData" />
    </div>
  </b-container>

</template>

<script lang="ts">
import Vue from "vue";
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)

import { Chart, registerables } from 'chart.js';
import { BarChart, useBarChart } from "vue-chart-3";
import { ref, computed, defineComponent } from "@vue/composition-api";
import { shuffle } from "lodash";

Chart.register(...registerables);

//export default Vue.extend({

export default defineComponent({
  name: "App",
  props: {
    locationDash: Boolean
  },
  components: {
    BarChart,
  },
  methods:{
      goTo(caminho){
          this.$router.push(caminho)
      }
  },
  setup() {
    const data = ref([50, 40, 65, 55, 25, 0, 0, 0, 0, 0, 0, 0]);
    const data2 = ref([5, 40, 65, 55, 25, 0, 0, 0, 0, 0, 0, 0]);
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
          backgroundColor: [
            "#A3A500",
          ],
        },
        {
          data: data2.value,
          backgroundColor: [
            "#A3A500",
          ],
        },
      ],
    }));

    const { barChartProps, barChartRef } = useBarChart({
      chartData,
      options,
    });

return { barChartProps, barChartRef, imgData };
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