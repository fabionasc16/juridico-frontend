<template>
  <div>
    <div v-if="loading">
      <LoadingSpinner></LoadingSpinner>
    </div>

    <div v-if="alert">
      <ReturnMessage :message="message" :fechaAlert="fechaAlert"></ReturnMessage>
    </div>

    <div v-if="success">
      <SuccessAlert :message="message" :fechaSuccess="fechaSuccess"></SuccessAlert>
    </div>
    <b-card class="card-reset-pass">
      <b-card-title style="padding-top: 2%" class="text-center">Informe os dados para a redefinição de senha
      </b-card-title>

      <div style="padding: 5% 0% 2% 0%">
        <b-form @submit.prevent="submit">
          <b-form-group label="Email" class="font">
            <b-form-input class="inputs" required type="email" v-model="form.email">
            </b-form-input>
          </b-form-group>

          <div class="text-center">
            <b-button type="submit" class="button-enter">Solicitar senha</b-button>
          </div>
        </b-form>
      </div>

      <div class="text-center" style="padding-top: 2%">
        <b-button class="button-return" to="/">Voltar</b-button>
      </div>
    </b-card>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mask } from "vue-the-mask";
import SuccessAlert from "@/components/SuccessAlert.vue";
import ReturnMessage from "@/components/ReturnMessage.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import RestApiService from "@/services/rest/service";


export default Vue.extend({
  directives: { mask },
  props: {
    type: { type: String, default: "text" },
  },
  components: {
    LoadingSpinner,
    ReturnMessage,
    SuccessAlert,
  },
  data() {
    return {
      loading: false as boolean,
      alert: false as boolean,
      success: false as boolean,
      message: "" as string,
      form: {
        email: "" as string,
      },
    };
  },
  methods: {
    submit() {
      if (this.form.email) {
        RestApiService.postForgotPass('auth/forgotpassword', this.form)
              .then((res: any) => {
                alert("Senha enviada para o email informado!")
                this.$router.push("/");
              });
      } else {
        this.message = "Por favor, preencha todos os campos!";
        this.alert = true;
      }

    },
    fechaAlert(): void {
      this.alert = false;
    },
    fechaSuccess(): void {
      this.success = false;
      // this.$router.push("/alterarSenha");
    },
  },
});
</script>

<style scoped>
.card-reset-pass {
  align-items: center;
  vertical-align: middle;
  height: 35%;
  min-width: 35%;
  z-index: 2;
  position: fixed;
  display: table;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  border-radius: 15px;
  padding-bottom: 0.5%;
  box-shadow: rgba(0, 110, 255, 0.63) 5px 5px, rgba(0, 110, 255, 0.3) 10px 10px;
}

.font {
  font-family: "Mulish", sans-serif;
}

.inputs {
  border-radius: 10px;
  background-color: #e7e7e7;
}

.button-enter {
  background-image: linear-gradient(140deg, #1625ff 40%, #00a0fc);
  color: #fff;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 25%;
  border-radius: 15px;
  border: none;
  min-width: 23%;
  width: auto;
  display: inline-block;
  white-space: normal;
}

.button-return {
  background-image: linear-gradient(140deg, #575757 40%, #a5a5a5);
  color: #fff;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 25%;
  border-radius: 15px;
  border: none;
  display: inline-block;
  width: auto;
  white-space: normal;
}
</style>
