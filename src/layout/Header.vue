<template>
  <div class="sticky-top" style="width: 100%;">
    <div class="header px-4">
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
      {{this.$route.name}}
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
.header{
  background-color: #1b2038;
  color: white;
  min-height: 50px;
  width: 100%;
  display: flex;
  align-items: center;
}
.dropdown{
  float: right;
  right: 15px;
  position: absolute;
}
.breadcumb{
  background-color: #1b2038;
  color: white;
  padding: 1px 2%;
  font-style: italic;
}
</style>