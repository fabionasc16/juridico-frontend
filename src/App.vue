<template>
  <layout>
    <transition name="slide-fade" >
      <router-view route="/home"></router-view>
    </transition>
  </layout>
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
</style>
