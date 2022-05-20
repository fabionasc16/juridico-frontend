<template>
  <div id="app" style="width: 400px">
  
    <BarChart v-bind="barChartProps" />
    <img style="width: 300px" v-if="imgData" :src="imgData" />
  </div>
</template>

<script>
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
  components: {
    BarChart,
  },
  setup() {
    const data = ref([30, 40, 60, 70, 5]);
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
      labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
      datasets: [
        {
          data: data.value,
          backgroundColor: [
            "#77CEFF",
            "#0079AF",
            "#123E6B",
            "#97B0C4",
            "#A5C8ED",
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
