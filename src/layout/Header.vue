<template>
  <div class="sticky-top">
    <div class="header px-4">  
          <slot></slot>      
          <b-dropdown class="dropdown" size="sm" variant="outline-light">
            <template #button-content>        
              <span v-if="getUsuarioNome != ''">
                {{ getUsuarioNome }}
              </span>        
            </template>
            <b-dropdown-divider />
           <!-- <b-dropdown-item to="/alterarSenha"> Alterar Senha </b-dropdown-item> -->
            <b-dropdown-item @click="logOut"> Logout </b-dropdown-item>
          </b-dropdown>  
    </div>
    <div class="breadcumb">
      {{ $route.name }}
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
    ...mapGetters("usuario", ["getUsuarioNome", "getUsuarioUnidade"]),
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
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #081550;
  color: white;
  padding-top: 1%;
}

.breadcumb {
  background-color: #081550;
  /* background-color: #1b2038; */
  color: white;  
  font-style: italic;
  /*padding: 1px 2%;*/
  padding: 15px 2% 4px 2%; /* top right bottom left */
}
</style>