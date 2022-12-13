<template>
  <div>
    <div v-if="loading">
      <LoadingSpinner></LoadingSpinner>
    </div>
    <div class="half">
      <div class="contents order-2 order-md-1">
        <div class="container">
          <div class="row align-items-center justify-content-center">
            <div class="col-md-5">
              <div class="form-block">
                <div class="text-center mb-4" style="margin-top: 5%">
                  <h5>
                    <span><strong>Informe a nova senha e sua confirmação</strong></span>
                  </h5>
                </div>
                <div style="margin-top: 5%">
                  <form @submit.prevent="submit" autocomplete="off">
                    <b-form-group label="Senha:" class="font text-left">
                      <b-form-input class="inputs font" type="password" v-model.trim="form.password">
                      </b-form-input>
                    </b-form-group>
                    <b-form-group label="Confirmação de senha:" class="font text-left">
                      <b-form-input class="inputs font" type="password" v-model.trim="conf_password">
                      </b-form-input>
                    </b-form-group>
                    <div class="text-center mb-2" style="padding-top: 4%">
                      <input type="submit" value="Alterar" class="button-enter" />
                    </div>
                  </form>
                </div>
              </div>
              <br>
              <div>
                  <b-alert show variant="warning" class="sm">
                    A senha deverá:<br>
                    * Conter no mínimo 8 caracteres<br>
                    * Pelo menos uma letra minúscula<br>
                    * Pelo menos uma letra maiúscula<br>
                    * Pelo menos um número<br>
                    * Pelo menos um caracter especial
                  </b-alert>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mask } from "vue-the-mask";
import "vue-select/dist/vue-select.css";
import RestApiService from "@/services/rest/service";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ValidarSenhaMixin from "@/mixins/validarSenha";
import { mapActions } from "vuex";

export default Vue.extend({
  mixins: [ValidarSenhaMixin],
  directives: { mask },  
  components: {
    LoadingSpinner,
  },
  data() {
    return {
      loading: false as boolean,
      conf_password: "" as string,
      form: {
        password: "" as string,
      },
    };
  },
  methods: {
    submit() {
      if (this.form.password && this.conf_password) {
        if (this.form.password === this.conf_password) {
          this.loading = true;
          var senhaMsg = ValidarSenhaMixin.methods.validarSenha(this.form.password,this.conf_password)
          if (senhaMsg === 'OK'){
            RestApiService.postResetPass('auth/reset-pass',this.form)
                .then((res:any) => {
                   alert("Senha alterada com sucesso. Realize o login com a nova senha!")
                   this.logOut()
                })   
                .catch((e:any) => {                  
                  alert(e.response.data.message)
                  if (e.response.data.message == 'Token inválido'){
                    this.logOut()
                  }      
            })           
          }else{
            alert(senhaMsg)
          }
          this.loading = false;
        } else {
            alert("As senhas não conferem!")
        }
      } else {
        alert("Por favor, preencha todos os campos!")
      }         
    }, 
    ...mapActions("usuario", ["deslogarUsuario"]),

    logOut() {
      this.deslogarUsuario(), this.$router.push({ name: "Login" });
    },   
  },
});
</script>

<style scoped>
body {
  font-family: "Roboto", sans-serif;
  background-color: #fff;
}

p {
  color: #b3b3b3;
  font-weight: 300;
}

.content {
  padding: 7rem 0;
}

.half,
.half .container>.row {
  height: 100vh;
  min-height: 700px;
}

.half .bg {
  height: 200px;
}

@media (max-width: 991.98px) {
  .half .bg {
    height: 200px;
  }
}

.half .contents {
  background: #f6f7fc;
}

.half .contents,
.half .bg {
  width: 100%;
}

@media (max-width: 1199.98px) {

  .half .contents,
  .half .bg {
    width: 100%;
  }
}

.half .contents .form-control,
.half .bg .form-control {
  border: none;
  border-radius: 4px;
  /*height: 54px;*/
  background: #efefef;
}

.half .contents .form-control:active,
.half .contents .form-control:focus,
.half .bg .form-control:active,
.half .bg .form-control:focus {
  outline: none;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.half .bg {
  background-size: cover;
  background-position: center;
}

.half a {
  color: #888;
  text-decoration: underline;
}

.half .btn {
  height: 54px;
  padding-left: 30px;
  padding-right: 30px;
}

.half .forgot-pass {
  position: relative;
  top: 2px;
  font-size: 14px;
}

.form-block {
  background: #fff;
  padding: 20px;
  margin-top: -180px;
  border-radius: 15px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

@media (max-width: 991.98px) {
  .form-block {
    padding: 25px;
  }
}

.alert-warning{
  font-size: 0.8rem;
}

.control {
  display: block;
  position: relative;
  padding-left: 30px;
  margin-bottom: 15px;
  cursor: pointer;
  font-size: 14px;
}

.control .caption {
  position: relative;
  top: 0.2rem;
  color: #888;
}

.control input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.button-enter {
  background-image: linear-gradient(140deg, #1625ff 40%, #00a0fc);
  color: #fff;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width: 25%;
  border-radius: 5px;
  border: none;
  min-width: 23%;
  width: auto;
  display: inline-block;
  white-space: normal;
  text-align: center;
}
</style>
