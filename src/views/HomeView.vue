<template>
  <div class="home">
    <div class="container-fluid" style="padding: 5% 3% 3% 2%">
      <div class="animate__animated animate__fadeIn slower">
        <div class="text-center">
          <img alt="Vue logo" width="10%" src="../assets/logo.png">
        </div>
        <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default Vue.extend({
  name: 'HomeView',
  components: {
    HelloWorld,
  },
});
</script>
