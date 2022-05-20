<template>
  <div>
    <header-page
      :titulo="'Lista de Pacientes Não Identificados'"
      descricao="Lista de pacientes registrados na entrada"
    />

    <b-container>
          <notifications :notifications="this.Notificacao"></notifications>
    </b-container>
    
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Notifications from "@/components/Notifications.vue";
import HeaderPage from "@/components/HeaderPage.vue";
import { Notificacao } from "@/type/notificacao";


export default Vue.extend({

  components: {
    Notifications,
    HeaderPage,
  },
  data() {
    return {
      Notificacao: [] as Array<Notificacao>,
    };
  },
  mounted() {

  },
  methods: {
    },
  
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

</style>
