<template>
  <div>
        <div v-for="notification in notifications" :key="notification.type" 
            :class="getNotificationClass(notification.type)">
            {{ notification.message }}
        </div>
  </div>
</template>

<script lang="ts">

import Vue from "vue";

export default Vue.extend({

    props:{
        notifications: Array
    },

    methods:{
        getNotificationClass(notification:string): string {
            return 'alert alert-' + notification
        }  
    }

});

</script>

<style>

</style>