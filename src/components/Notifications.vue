<template>
    <div>
        <div v-for="notification in notifications" :key="notification.message"
            :class="getNotificationClass(notification.type)">
            {{ notification.message }}
        </div>
    </div>
</template>

<script lang="ts">

import Vue from "vue";

export default Vue.extend({

    props: {
        notifications: Array,           
    },

    methods: {
        getNotificationClass(notification: string): string {
            return 'alert alert-' + notification
        },
        
    }

});

</script>


<style scoped>


/***** Style Message *****/
.mask {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
  align-items: center;
  height: 100%;
  object-fit: contain;
  z-index: 3;
}
.card-message {
  align-items: center;
  vertical-align: middle;  
  z-index: 3;
  display: table; 
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  background-color: white;
  border-radius: 15px;
  padding-bottom: 1%;
}

@media (min-width: 601px) {
  .card-message {
    width: 25%;
  }
}

@media (max-width: 600px) {
  .card-message {
    width: 50%;
  }
}

.head {
  margin-top: 12%;
  text-align: center;
  align-items: center;
  vertical-align: middle;
}

.body {
  width: 90%;
  margin-top: 10%;
  text-align: center;
  align-items: center;
  vertical-align: middle;
}

.foot {
  width: 90%;
  margin-top: 10%;
  text-align: center;
  align-items: center;
  vertical-align: middle;
}

/***** Fim Style Message *****/

</style>
