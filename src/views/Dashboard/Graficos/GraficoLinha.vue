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
    <div id="app" class="row lineChart">
      <LineChart class="lineChart" :chartData="testData" />
      <img style="width: 300px" v-if="imgData" :src="imgData" />
    </div>
  </b-container>

</template>

<script lang="ts">
import Vue from "vue";
import VueCompositionAPI from '@vue/composition-api';
import { Chart, registerables } from 'chart.js';
import { LineChart } from "vue-chart-3";
import { ref, computed, defineComponent } from "@vue/composition-api";
import { shuffle } from "lodash";
Vue.use(VueCompositionAPI);
Chart.register(...registerables);

//export default Vue.extend({

export default defineComponent({
  name: "GraficoLinha",
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
    const testData = {
      labels: ['1º', '2', '3', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'],
      label: "Processos por dia",
      datasets: [
        {
          data: [5, 35, 50, 30, 42, 62, 34, 25, 62, 34, 25, 42, 54, 34, 25, 52, 62, 34, 25, 42, 54, 34, 34, 25, 54, 34, 25, 42, 62, 34, 25, 25, 42, 62, 34, 25, 62, 34 ],
          backgroundColor: ['#1452FF'],
        },
      ],
    };

    return { testData };
    const options = computed(() => ({
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    }));
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
  margin-top: 10px;
}
.lineChart {
  width: 100%;
  margin-top: -50px;
  height: 200px;
  padding: -10px;
}
</style>