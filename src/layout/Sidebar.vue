<template>
    <div class="sticky-top">
      <!-- Identificação do sistema -->
      <div class="logo text-center">
        <h3>SAPEJ</h3>
      </div>
      <!-- Listagem das rotas -->
      <nav class="listagem pt-5">
        <router-link class="d-block p-2" v-for="(r, index) in commonMenus" :key="index" :to="r.path"
            v-if="r.meta.menu!='Cadastros'">
          <p style="font-weight: 600">{{ r.name }}</p>
        </router-link>
      </nav>

      <b-dropdown class="dropdown" size="sm" variant="outline-light">
                <template #button-content>
                   <span>
                    Cadastros
                   </span>
               </template>

               <b-dropdown-item v-for="(r,index) in commonMenus" :key="index" v-if="r.meta.menu=='Cadastros'"> 
                   <router-link class="d-block p-2" :to="r.path" style="margin-bottom:-20px;" >
                        <label style="font-weight: 600;">{{r.name}}</label> 
                    </router-link>
            </b-dropdown-item>
        </b-dropdown>


      <div class="footer">
        <p class="justify-center" style="color: white; font-weight: 600">
          Secretaria de Saúde
        </p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from "vue";
  import { menusMixin } from "../mixins/menu";
  
  export default Vue.extend({
    mixins: [
      menusMixin as Object, // Mixin com menus utilizáveis
    ],
    computed: {
      currentRoute() {
        return this.$route.name;
      },
    },
  });
  </script>
  
  <style scoped>
  .logo {
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.5rem;
    color: white;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .footer {
    position: fixed;
    bottom: 20px;
    color: white;
  }
  </style>
  