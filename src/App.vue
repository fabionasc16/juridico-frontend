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
export default Vue.extend({
  components:{
    Layout
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
