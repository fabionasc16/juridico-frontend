<template>
    <div class="root container-fluid grey-background">
      <slot></slot>
    </div>
  </template>
  
  <script lang="ts">
  import Vue from "vue";
  
  export default Vue.extend({});
  </script>
  
  <style scoped>
  .root {
    min-height: 100vh;
  }
  
  #root-row {
    min-height: 100vh;
  }
  
  .grey-background {
    background-color: rgb(23, 36, 94);
  }
  </style>
