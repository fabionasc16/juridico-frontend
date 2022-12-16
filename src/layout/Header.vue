<template>
  <div class="sticky-top">
    <div class="header px-4">
      <span class="text-center col-12">Sistema de Acompanhamento de Processos Extra Judicais</span>
      <slot></slot>      
      <b-dropdown class="dropdown" size="sm" variant="outline-light">
        <template #button-content>
          <span>
              Nome do usuario
            </span>
          </template>
          <b-dropdown-divider />
        <b-dropdown-item to="/alterarSenha"> Alterar Senha </b-dropdown-item>
        <b-dropdown-item @click="logOut"> Logout </b-dropdown-item>
      </b-dropdown>    
      </div>
    <div class="breadcumb">
      {{ this.$route.name }}
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

export default Vue.extend({
  data() {
    return {
      usuario: [],
    };
  },
   computed: {
    ...mapGetters("usuario", ["getUsuarioNome"]),
  },
  methods: {
    ...mapActions("usuario", ["deslogarUsuario"]),

    logOut() {
      this.deslogarUsuario(), this.$router.push({ name: "Login" });
    },
  },
});
</script>
<style scoped>
.header {
  background-color: #081550;
  /* background-color: #1b2038; */
  color: white;
  min-height: 50px;
  display: flex;
  align-items: center;
}

.dropdown {
  float: right;
  right: 15px;
  position: absolute;
}

.breadcumb {
  background-color: #081550;
  /* background-color: #1b2038; */
  color: white;
  padding: 1px 2%;
  font-style: italic;
}
</style>