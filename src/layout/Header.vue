<template>
  <div>
    <div class="header px-4">
      <slot></slot>
      <b-dropdown class="dropdown" size="sm" variant="outline-light">
          <template #button-content>
            <span>
              Nome do usuario
            </span>
          </template>
          <b-dropdown-divider />
          <b-dropdown-item>
            Logout
          </b-dropdown-item>
      </b-dropdown>
    </div>
    <div class="breadcumb">
      {{this.$route.name}}
    </div>
  </div>
</template>
<script lang="ts">
import Vue from "vue";

export default Vue.extend({

});
</script>
<style scoped>
.header {
  background-color: #1b2038;
  color: white;
  min-height: 50px;
  display: flex;
  align-items: center;
}
.dropdown{
  float: right;
  right: 15px;
  position: fixed;
}
.breadcumb{
  background-color: #1b2038;
  color: white;
  padding: 1px 2%;
  font-style: italic;
}
</style>