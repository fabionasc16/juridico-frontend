<template>
    <nav class="navbar navbar-expand-md fixed-top bg-gov">
      <img class="img-responsive" src="@/assets/img/logo/thumbnail_logo_right.png" height="130" />
      <div style="width: 50px"></div>
      <div class="text-center d-flex p-2">
        <h5 style="color: white; font-size: 1.3em; top: 0">
          SIPAH - Sistema de Identificação de Pacientes no Ambiente Hospitalar
        </h5>
      </div>
    </nav>
  </template>
  <script lang="ts">
  import Vue from "vue";
  //import {ip} from '@/environments/ip'
  
  export default Vue.extend({
    methods: {
      /*imagem(caminho:string): string{
        return ip.ipURL + caminho
      },*/
    },
  });
  </script>
  <style scoped>
  .bg-gov {
    background-color: #17245e;
    border-bottom: 4px;
    align-content: center;
    width: 100%;
    justify-content: flex-start;
  }
  </style>
