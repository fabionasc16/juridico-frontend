<template>
    <div>
      <div class="d-flex flex-column align-items-center">
        <div class="p-1">
          <img class="img-responsive" style="background-size: cover" src="@/assets/img/logo/thumbnail_logo_right.png"
            height="100" />
        </div>
        <div class="p-1 text-center">
          <h5 style="color: white; font-size: 1.2em; word-wrap: normal">
            SAPEJ - Sistema de Acompanhamento de Processos Extra Judiciais
          </h5>
        </div>
      </div>
      <div class="half">
        <div class="contents order-2 order-md-1">
          <div class="container">
            <div class="row align-items-center justify-content-center">
              <div class="col-md-5">
                <div class="form-block">
                  <div class="text-center mb-4">
                    <h5><strong>Informe seus dados para acesso</strong></h5>                  
                  </div>
                  <div>
                      <b-alert :show="showError"
                      dismissible
                      variant="danger">                    
                        {{message}}                     
                      </b-alert>
                    </div>
                  <form @submit.prevent="submit">
                  
                    <b-form-group label="CPF:" class="font text-left">
                      <b-form-input class="inputs font" type="text" v-model="form.user_formatado"
                        v-mask="'###.###.###-##'" autocomplete="off">
                      </b-form-input>
                    </b-form-group>
                    <b-form-group label="Senha:" class="font text-left">
                      <b-form-input class="inputs font" type="password" v-model.trim="form.password">
                      </b-form-input>
                    </b-form-group>
                    <div class="mb-3 text-right">
                      <router-link style="color: grey; text-decoration: underline" to="/esqueciSenha">Esqueci a senha
                      </router-link>
                    </div>
                    <div class="text-center mb-2">
                      <input type="submit" value="Entrar" class="button-enter" />
                    </div>
                  </form>
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
  import vSelect from "vue-select";
  import { mapActions } from "vuex";
  import { mask } from "vue-the-mask";
  import "vue-select/dist/vue-select.css";
  import RestApiService from "@/services/rest/service";
  import LoadingSpinner from "@/components/LoadingSpinner.vue";
  import HeaderPageLogin from "@/components/HeaderPageLogin.vue";
  
  Vue.component("v-select", vSelect);
  
  export default Vue.extend({
    directives: { mask },
    props: {
      type: { type: String, default: "text" },
    },
    components: {
      "vue-select": require("vue-select"),
      LoadingSpinner,
      HeaderPageLogin,
    },
    data() {
      return {
        loading: false as boolean,
        alert: false as boolean,
        success: false as boolean,
        message: "" as string,
        showError: false as boolean,
        totalRow: 0 as number,
        perPage: 1000 as number,
        currentPage: 1 as number,
        optionsUnidade: [] as Array<String>,
        form: {
          user: "" as string,
          password: "" as string,
          user_unit: "" as string,
          user_formatado: "" as string,
        }
      };
    },
    mounted() {
      
    },
    methods: {
      ...mapActions("usuario", ["efetuarLogin"]),
  
      submit() {
        this.showError = false;
        let cpf = this.form.user_formatado.replace(/[^\d]+/g, '')
        this.form.user = cpf
        if (!this.form.user || !this.form.password) {
          this.message = 'Preencha todos os campos!';
          this.showError = true;
          //alert('Preencha todos os campos!')
          return false
        } else {
          this.form.user = cpf
          this.form.user_unit = '6399e95caa133b62db284f5d'
          this.efetuarLogin(this.form)
            .then((res) => {
              this.$router.push({ path: '/processos' })
            })
            .catch(error => {
             if(error.response.status == '404'){
                this.message = 'Ocorreu um erro na conexão do sistema.'  
                this.showError = true;
                return;               
              }          
              
              this.message = error.response.data.message
              this.showError = true;   
              
            })
        }
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
  