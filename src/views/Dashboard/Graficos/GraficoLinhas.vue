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
      <LineChart v-bind="lineChartProps" />
      <img style="width: 300px" v-if="imgData" :src="imgData" />
    </div>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI)

import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { LineChart, useLineChart} from "vue-chart-3";
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
    const legendTop = ref(true);
    const imgData = ref(null);

    const getData = computed<ChartData<"line">>(() => ({
      labels: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      datasets: [
        {
          label: "Linha 1",
          data: [50, 40, 65, 55, 25, 10, 20, 40, 10, 10, 80, 90],
          fill: false,
          backgroundColor: "#A3A500",
        },
        {
          label: "Linha 2",
          data: [30, 65, 55, 25, 65, 55, 25, 40, 50, 70, 80],
          fill: false,
          backgroundColor: "#000000",
        },
      ],
    }));

    const options = computed<ChartOptions<"line">>(() => ({
      plugins: {
        legend: {
          display: false,
        },
      },
    }));


    const { lineChartProps } = useLineChart({ 
      options,
      chartData: getData,
    });

    return { getData, lineChartProps, imgData };
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