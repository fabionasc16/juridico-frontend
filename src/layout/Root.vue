<template>
    <div class="root container-fluid">
      <div id="root-row" class="row">
        <div class="sidebar" :class="sidebarClass">
          <sidebar />
        </div>
        <div class="content px-0" :class="contentClass">
          <div class="content">
            <content-header>
              <b-btn class="d-none d-lg-block" variant="primary" @click="retraido = !retraido">
                            ...
              </b-btn>                
              
             <b-navbar toggleable="sm" class="listagem" :class="menuHeaderClass"> 
                <b-navbar-toggle style="background-color: white" target="nav-text-collapse">
                </b-navbar-toggle>              

                <b-collapse id="nav-text-collapse" is-nav>                 
                  <div class="menu-retraido">                 
                    <b-dropdown class="dropdown" size="sm" variant="outline-light">
                          <template #button-content>        
                            <span>
                            Menu
                            </span>        
                          </template>
                     
                          <b-dropdown-divider />

                          <router-link style="color: black;" class="ml-2 px-3" v-for="(r, index) in commonMenus" :key="index"
                            :to="r.path">
                            {{ r.name }}
                          </router-link>                   
                      </b-dropdown>    
                  </div>     

                </b-collapse>
              </b-navbar>

              <span class="text-center system-name">Sistema de Acompanhamento de Processos Extra Judiciais</span>
              <span class="text-center system-sigla">SAPEJ</span>
            
            </content-header>

         
            <div class="content-body p-3 p-lg-1">
              <slot></slot>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from "vue";
  import Sidebar from "./Sidebar.vue";
  import ContentHeader from "./Header.vue";
  import { menusMixin } from "../mixins/menu";
  
  export default Vue.extend({
    components: {
      ContentHeader,
      Sidebar,
    },
    mixins: [menusMixin],
    data() {
      return {
        retraido: false as boolean,
      };
    },
    computed: {
      sidebarClass(): string {
        return !this.retraido ? "d-none d-lg-block col-2" : "d-none";
      },
      contentClass(): string {
        return !this.retraido ? "col-12 col-lg-10 " : "col-12";
      },
      menuHeaderClass(): string {
        return !this.retraido ? "d-block d-lg-none" : "d-block";
      },
    },
  });
  </script>
  
  <style>
  .root {
    min-height: 100vh;
  }
  
  #root-row {
    min-height: 100vh;
  }
  
  .sidebar {
    background-color: #081570;
    /* background-color: #293258; */
  }
  
  .content {
    background-color: white;
    padding: 0;
  }
  
  .botao-retrair {
    padding: 2%;
  }
  
  .listagem a {
    color: white;
    font-weight: bold;
  }
  
  .listagem a {
    box-shadow: inset 0 0 0 0 #03a8ff;
    /* box-shadow: inset 0 0 0 0 #00bac0; */
    color: white;
    font-weight: bold;
    transition: color 0.3s ease-in-out, box-shadow;
    border-radius: 15px;
  }
  
  .listagem a:hover {
    text-decoration: none;
    box-shadow: inset 300px 0 0 0 #03a8ff;
    /* box-shadow: inset 300px 0 0 0 #00bac0; */
    color: white;
    border-radius: 15px;
  }

  .system-sigla{
    flex-grow: 1;/* p que o titulo possa crescer dentro desse flex container que é o header */
  }

  .system-name{
    flex-grow: 1;/* p que o titulo possa crescer dentro desse flex container que é o header */
  }

  @media(max-width: 830px)
  {
    .system-name
    {
      display: none;
    }
  }

  @media(min-width: 829px)
  {
    .system-sigla
    {
      display: none;
    }
  }


 

  </style>
  