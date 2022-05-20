<template>
  <div>
    <header-page :titulo="'Dash'" :descricao="'Informações, Gráficos e muito mais...'" />
    <b-container>
      <div class="row">

        <b-form-group class="titulo" label="Consulta de Processos" label-size="lg">
          <hr />
        </b-form-group>
  <highcharts :constructor-type="'stockChart'" :options="chartOptions"></highcharts>

        <b-form-group class="titulo" label="Processos Cadastrados" label-size="lg">
          <hr />
        </b-form-group>

      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import HeaderPage from '@/components/HeaderPage.vue'
import { mask } from "vue-the-mask";
import Notifications from "@/components/Notifications.vue";
import { Notificacao } from "@/type/notificacao";
import { GrauParentescoSeeder } from "@/type/parentesco";
import { mapActions } from 'vuex'
import { BIconSearch} from 'bootstrap-vue'


export default Vue.extend({
  directives: { mask },
  data() {
    return {
      title: '',
      points: [10, 0, 8, 2, 6, 4, 5, 5],
      chartType: 'Spline',
      seriesColor: '#6fcd98',
      colorInputIsSupported: null,
      chartOptions: {
        chart: {
          type: 'spline'
        },
        title: {
          text: 'Sin chart'
        },
        series: [{
          data: [10, 0, 8, 2, 6, 4, 5, 5],
          color: '#6fcd98'
        }]
      }
      };
    },
  mounted() { },
  methods: {
    submit() {
      alert("enviar");
    },
    voltar(): void {
      this.$router.push("/");
    }
  },
  components: {
    HeaderPage,
    BIconSearch
  }
});
</script>

<style scope>

.root .row {
  min-height: 0vh;
}

.row {
  min-height: 0vh;
}

.font {
  font-family: "Mulish", sans-serif;
}

.titulo {
  color: #293258;
  margin-top: 20px;
  font-family: "Mulish", sans-serif;
}

.custom-select-sm {
  height: calc(2em + 0.5rem + 2px);
}
</style>
