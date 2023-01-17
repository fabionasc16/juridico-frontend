<template>
 <component :is="this.$route.meta.layout">
    <transition appear enter-active-class="animate__animated animate__fadeIn">
      <router-view />
    </transition>
  </component>
</template>
<script lang="ts">
import Vue from 'vue'
import Layout from './layout/Root.vue'
import { mapGetters, mapActions } from "vuex";
import refreshToken from "@/services/rest/refresh_token";
import { environment } from "@/environments/environment";

export default Vue.extend({
  components:{
    Layout
  },
  //para manter o estado no store ao dar refresh na pagina
  created() {  

    if (window.localStorage.token && window.localStorage.cpf) {
      this.atribuirToken(window.localStorage.token);
      this.atribuirId(window.localStorage._id);
      this.atribuirCpf(window.localStorage.cpf);
      this.atribuirNome(window.localStorage.nome);
      this.atribuirUnidade(window.localStorage.unidade);
      this.atribuirIdUnidade(window.localStorage.idUnidade);
      this.atribuirRoles(JSON.parse(window.localStorage.roles));
      
      let refresh = window.localStorage.getItem("refresh");       
      let myInterval;

      if(refresh && refresh == '1') {
        myInterval = setInterval(() => {                      
                        let token = localStorage.getItem("token");
                        if(token) {                                      
                          const response = refreshToken(myInterval); 
                        }
                      }, environment.timerUpdateRefreshToken)
      }
       
    }
  },

  methods: {
    ...mapActions("usuario", [
      "atribuirToken",
      "atribuirId",
      "atribuirNome",
      "atribuirCpf",
      "atribuirUnidade",
      "atribuirRoles",
      "atribuirIdUnidade",
    ]),
  }

})
</script>

<style>

  @import url('https://fonts.googleapis.com/css2?family=Mulish:wght@400;500&display=swap');
  hr {
    border: none;
    height: 1px;
    color: rgb(197, 197, 197);
    background-color: rgb(197, 197, 197); 
  }
  h1 {
    font-family: 'Mulish', sans-serif;
  }
  h2, h3, h4, h5, h6 {
    font-family: 'Mulish', sans-serif;
  }
  p {
    font-family: 'Mulish', sans-serif;
    font-weight: 500;
  }
  a {
    color: #00bac0;
  }

</style>
