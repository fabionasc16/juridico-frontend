<template>
  <div class="mask">
    <!--enter-active-class="animate__animated animate__bounceIn"-->
    <transition appear leave-active-class="animate__animated animate__bounceOut">
      <div class="card-message"  align="center">
        <div class="head">

         <!-- alert & error -->   
         <svg v-if="message[0].type =='alert'" xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="red" class="bi bi-exclamation-circle"
            viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path
              d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
         </svg>
         
         <!-- success -->   
         <svg v-if="message[0].type =='success'" xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="green" class="bi bi-check-circle"
            viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
            <path
              d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
         </svg>

        </div>
        <div class="body">
          {{ message[0].message }}
        </div>
        <div class="foot">
          <b-button class="bordered" variant="success" @click="fechaAlert()">Ok</b-button>
        </div>
      </div>
    </transition>

   
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "ReturnMessage",
  props: {
    message: Array,
    fechaAlert: Function,
  },
});
</script>

<style scoped>
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
  /* overflow: auto; */
  /* width: 25%;*/
  /* overflow:hidden; */
  z-index: 3;
  display: table;
  /* display: flex;
    flex-direction: column; */
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
</style>
