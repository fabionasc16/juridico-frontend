<template>
  <div>    

    <b-container>
      <div class="row">
        <div class="col-12" style="margin-top: 2%">
          <b-form @submit.prevent="submit">

            <notifications :notifications="Notificacao"></notifications>      

            <div v-if="alert">
                <ReturnMessage :message="Message" :fechaAlert="fechaAlert"></ReturnMessage>
            </div>          

            <div v-if="loading">
                <LoadingSpinner></LoadingSpinner>
            </div>

            <div class="row">
                <b-form-group class="font col-sm-5 col-md-5 col-lg-4">
                 <template>Perfil de usuário <span class="text-danger">*</span>
                    <b-form-select :disabled="disabledAll" style="margin-top: 1.8%" class="bordered" size="sm" v-model="form.perfilUsuario" required>
                      <b-form-select-option value="">Selecione...</b-form-select-option>
                      <b-form-select-option v-for="perfil in optionsPerfis" :value="perfil._id" :key="perfil._id">
                        {{ perfil.profile_name }}
                      </b-form-select-option>
                    </b-form-select>
                  </template>
                </b-form-group>
            </div>

            <h5 class="titulo2">Informações pessoais</h5>
            <hr class="mt-0" />

            <div class="row">
              <b-form-group class="font col-sm-7 col-md-6 col-lg-6">
                <label>Nome completo <span class="text-danger">*</span></label>
                <b-form-input :disabled="disabledAll" class="bordered" :placeholder="'Insira o nome completo'"
                  type="text" v-model="form.nome" required>
                </b-form-input>
              </b-form-group>

              <b-form-group class="font col-sm-5 col-md-6 col-lg-6">
                <label>Data de nascimento <span class="text-danger">*</span></label>
                <b-form-input class="bordered" type="text" v-model="dataNascimentoBR" placeholder="00/00/0000"
                  v-mask="'##/##/####'" :disabled="disabledAll" required></b-form-input>
              </b-form-group>

              <b-form-group label="Estado civil" class="font col-sm-6 col-md-6 col-lg-3">
                <b-form-select :disabled="disabledAll" class="bordered" size="sm" v-model="form.estadoCivil">
                  <b-form-select-option value="">Selecione...</b-form-select-option>
                  <b-form-select-option v-for="option in optionsEstadoCivil" :value="option.value" :key="option.value">
                    {{ option.texto }}
                  </b-form-select-option>
                </b-form-select>
              </b-form-group>

              <b-form-group class="font col-sm-6 col-md-6 col-lg-3">
                <label>Gênero <span class="text-danger">*</span></label>
                <b-form-select :disabled="disabledAll" class="bordered" size="sm" v-model="form.genero" required>
                  <b-form-select-option value="">Selecione...</b-form-select-option>
                  <b-form-select-option v-for="option in optionsGenero" :value="option.value" :key="option.value">
                    {{ option.texto }}
                  </b-form-select-option>
                </b-form-select>
              </b-form-group>

              <b-form-group v-if="form.genero === 'autointitulado'"
                class="font col-sm-6 col-md-6 col-lg-4 animate__animated animate__backInRight">
                <label>Informe o gênero <span class="text-danger">*</span></label>
                <b-form-input :disabled="disabledAll" class="bordered" :placeholder="'Exemplo: Não-binário'" type="text"
                  v-model="form.generoOutro" required></b-form-input>
              </b-form-group>                   

              <b-form-group class="font col-sm-6 col-md-6 col-lg-3">
                <label>CPF <span class="text-danger">*</span></label>
                <b-form-input :disabled="disabledAll" class="bordered" required :placeholder="'000.000.000-00'"
                  type="tel" v-model="form.cpf" v-mask="'###.###.###-##'">
                </b-form-input>
              </b-form-group>
            </div>

            <h5 class="titulo2">Informações de contato</h5>
            <hr class="mt-0" />

            <div class="row">
              <b-form-group class="font col-sm-6 col-md-6 col-lg-6">
                <label>E-mail <span class="text-danger">*</span></label>
                <b-form-input :disabled="disabledAll" class="bordered" required :placeholder="'Exemplo: mail@email.com'"
                  type="email" v-model="form.email"></b-form-input>
              </b-form-group>

              <b-form-group class="font col-sm-6 col-md-6 col-lg-4">
                <label>Telefone/celular <span class="text-danger">*</span></label>
                <b-form-input :disabled="disabledAll" class="bordered" required
                  :placeholder="'Exemplo: (00) 00000-0000'" type="tel" v-model="form.telefone"
                  v-mask="'(##) #####-####'">
                </b-form-input>
              </b-form-group>
            </div>

            <h5 class="titulo2">Informações de endereço</h5>
            <hr class="mt-0" />

            <div class="row">
              <b-form-group label="CEP" class="font col-sm-5 col-md-5 col-lg-3">
                <b-form-input :disabled="disabledAll" class="bordered" id="cep" :placeholder="'Exemplo: 00000-000'"
                  type="tel" @keyup="searchCep()" v-model="form.cep" v-mask="'#####-###'"></b-form-input>
                <span v-if="invalidCEP" style="color: red; font-size: 12px; padding-left: 1%">{{ invalidCEP }}</span>
              </b-form-group>

              <b-form-group label="Logradouro" class="font col-sm-7 col-md-7 col-lg-9">
                <b-form-input :disabled="disabledAll" class="bordered" id="logradouro"
                  :placeholder="'Exemplo: Avenida Boulevard'" type="text" v-model="form.logradouro"></b-form-input>
              </b-form-group>
            </div>
            <div class="row">
              <b-form-group label="Número" class="font col-sm-3 col-md-3 col-lg-3">
                <b-form-input :disabled="disabledAll" class="bordered" id="numero" :placeholder="'Exemplo: 35A'"
                  type="text" v-model="form.numero">
                </b-form-input>
              </b-form-group>

              <b-form-group label="Bairro" class="font col-sm-9 col-md-9 col-lg-9">
                <b-form-input :disabled="disabledAll" class="bordered" id="bairro" :placeholder="'Exemplo: Alvorada'"
                  type="text" v-model="form.bairro">
                </b-form-input>
              </b-form-group>

              <b-form-group label="Complemento" class="font col-sm-12 col-md-12 col-lg-12">
                <b-form-input :disabled="disabledAll" class="bordered" id="complemento"
                  :placeholder="'Exemplo: Próximo à Via Verde e Padaria X'" type="text" v-model="form.complemento">
                </b-form-input>
              </b-form-group>                
            </div>
            <br />

            <div class="py-2 mt-10" align="right">                        
                <slot name="buttons"></slot>
                <b-button v-if="!disabledAll" class="bordered ml-2" type="submit" variant="success">Salvar</b-button>
            </div> 
            <br />
          </b-form>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { mask } from "vue-the-mask";
import { Usuario } from "@/type/usuario";
import { GeneroSeeder } from "@/type/genero";
import ValidarCpfMixin from "@/mixins/validarCpfMixin";
import ValidarDataMixin from "@/mixins/validarData";
import RestApiService from "@/services/rest/service";
import HeaderPage from "@/components/HeaderPage.vue";
import { EstadoCivilSeeder } from "@/type/estado_civil";
import formatarDataBrMixin from "@/mixins/formatarDataBr";
import dataFormatEnMixin from "@/mixins/dataFormatyyyymmdd";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import Notifications from "@/components/Notifications.vue";
import { Notificacao } from "@/type/notificacao";
import ReturnMessage from "@/components/ReturnMessage.vue";


export default Vue.extend({
  name: "CadastroUsuario",
  mixins: [
    ValidarCpfMixin,
    formatarDataBrMixin,
    dataFormatEnMixin,
    ValidarDataMixin,
  ],
  directives: { mask },
  components: {
    HeaderPage,
    LoadingSpinner,
    Notifications,
    ReturnMessage,
  },

  props: ["id", "acao"], 
  data() {
    return {
      invalidCEP: "" as string,
      loading: false as boolean,
      alert: false as boolean,
      success: false as boolean,
      message: "" as string,
      showBotaoSalvar: true as boolean,   
      optionsEstadoCivil: EstadoCivilSeeder,
      optionsGenero: GeneroSeeder,     
      dataNascimentoBR: "" as string,
      form: {} as Usuario,
      disabledAll: false as boolean,
      optionsPerfis: [],         
      Notificacao: [] as Array<Notificacao>,
      Message: [] as Array<Notificacao>,
      unidadeUser: ["6399e95caa133b62db284f5d"] as Array<any>, //SES-AM
    };
  },
  mounted() {
    const path = this.$route.path;
    const acao = "/visualizar";
    this.listarPerfis();

    if (path.includes(acao)) {
      this.showBotaoSalvar = false;
      this.disabledAll = true;
    }
    this.carregarDados(this.id);
    if (this.id) {
      //editar e visualizar
      this.carregarDados(this.id);
    }
  },

  methods: {
    submit() {
            let acao = this.id ? "put" : "post" 

            if (this.validarCampos()) {
                this.form.id = this.id ? this.id : "";

                this.form.dataNascimento = dataFormatEnMixin.methods.dataFormatEn(
                this.dataNascimentoBR );
               
                this.form.unidadeUsuario = this.unidadeUser

                this.salvar(acao);
            }
    },
    validarCampos(): boolean { 
      if (
        !this.form.perfilUsuario ||
        !this.form.nome ||
        !this.form.genero ||
        !this.dataNascimentoBR ||
        !this.form.cpf ||
        !this.form.email ||
        !this.form.telefone ||   
        (this.form.genero === "autointitulado" && !this.form.generoOutro)
      ){
        this.adicionarNotificacao(
                "danger",
                "Um ou mais campos obrigatórios não foram preenchidos!"
          );       
      }

      if (this.form.cpf && !ValidarCpfMixin.methods.validarCpf(this.form.cpf)) {
          this.adicionarNotificacao(
                "danger",
                "CPF inválido!"
          );          
      } else if (
        this.dataNascimentoBR &&
        !ValidarDataMixin.methods.validarData(this.dataNascimentoBR)
      ) {      
        this.adicionarNotificacao(
                "danger",
                "A data de nascimento informada é inválida."
        );
      }

      if (this.Notificacao.length > 0) {
                    this.loading = false;
                    //ir para o início da página onde aparecem as mensagens
                    window.scrollTo(0, 0);               

                    this.adicionarAlert(
                        "alert",
                        "Realize as validações exibidas no topo desta página!"
                    );

                    setTimeout(() => {
                    this.Notificacao = [];
                    }, 10000);
                    return false;
                } else {
                    return true;
                }           
    },
    

    salvar(acao: string): void {
      this.loading = true       

      RestApiService.salvar("usuarios", this.form, acao, this.form.id)
        .then((res) => {         

            if(acao == "post" && res && res.status && res.status == 204) {
              this.adicionarAlert(
                            "alert",
                            "Não foi possível salvar os dados!"
                            );    
            } 
            else
            if (acao == "put") {
                        this.adicionarAlert(
                            "success",
                            "Atualização realizada com sucesso!"
                        );
                    } else {
                        this.adicionarAlert(
                            "success",
                            "Cadastro realizado com sucesso!"
                        );
            } 
           
        })
        .catch((e) => {
          if (e.message === "Network Error") {           
            this.adicionarAlert(
                            "alert",
                            "Sem conexão de rede. Verifique sua conexão!"
                            );   
          }
          if (e && e.response.data && e.response.data.message) {
              console.log(e.response.data)
              this.adicionarAlert(
                            "alert",
                            e.response.data.message
                            );     
          } else {
            this.adicionarAlert(
                            "alert",
                            "Houve um erro ao salvar. Verifique o formulário e tente novamente!"
                            );            
          }
        })
        .finally(() => {
          this.loading = false;
        });
    },
    searchCep() {
      var cep = this.form.cep.replace(/[^0-9]/g, "");

      if (cep.length == 8) {
        axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((res) => {
          if (!res.data.erro) {
            this.invalidCEP = "";
            this.form.logradouro = res.data.logradouro;
            this.form.bairro = res.data.bairro;          
          } else {
            this.invalidCEP = "Este CEP parece inválido!";
          }
        });
      }
    },
  
    listarPerfis(): void {
        RestApiService.getSSO(
        'profiles', 'system?nomeSistema=SAPEJ'
          )
      .then((response: any) => {
        console.log(response.data)
        this.optionsPerfis = response.data;
      })
      .catch((e: Error) => {
        this.message = "Não foi possível carregar a listagem de perfis.";
        this.alert = true;
        });
      },

    carregarDados(id: string) {
      RestApiService.get("usuarios", id)
        .then((response: any) => {

          //this.form.id = response.data.id; 
          //this.form.unidadeUsuario = response.data.unit_id; 
          this.form.nome = response.data.nome;
          this.form.perfilUsuario = response.data.perfilUsuario;         
          this.form.dataNascimento = response.data.dataNascimento;
          this.dataNascimentoBR = response.data.dataNascimento
            ? formatarDataBrMixin.methods.formatarDataBr(
              response.data.dataNascimento
            )
            : "";
          this.form.estadoCivil = response.data.estadoCivil;
          this.form.genero = response.data.genero;
          this.form.generoOutro = response.data.generoOutro;        
          this.form.cpf = response.data.cpf;
          this.form.email = response.data.email;
          this.form.telefone = response.data.telefone;
          this.form.cep = response.data.cep;
          this.form.logradouro = response.data.logradouro;
          this.form.numero = response.data.numero;
          this.form.bairro = response.data.bairro;
          this.form.complemento = response.data.complemento;         
        })
        .catch((e: Error) => {
          this.message = "Houve um erro. Tente novamente!";
          this.alert = true;
        });
    },

    adicionarAlert(tipo: string, mensagem: string): void {
            this.Message = []        
            this.Message.push({
                type: tipo,
                message: mensagem,
            });
            this.alert = true;
    },

    adicionarNotificacao(tipo: string, mensagem: string): void {
            this.Notificacao.push({
                type: tipo,
                message: mensagem,
            });
    },
    fechaAlert(): void {
      this.alert = false;
            
            if(this.Message[0].type == 'success') {
               this.$bvModal.hide('modal-cadastro-usuario')
               this.$bvModal.hide('modal-editar-usuario')
               this.$emit("listarUsuarios");
            }
    },
    
    fechaSuccess(): void {
      this.success = false;
      //reseta o form
      (this.form.id = ""), (this.form.perfilUsuario = "");
      //this.form.setorUsuario = ""
      //this.form.unidadeUsuario = ""
      this.form.nome = "";
      this.form.dataNascimento = "";
      this.form.estadoCivil = "";      
      this.form.genero = "";
      this.form.generoOutro = "";
      this.form.cpf = "";
      this.form.email = "";
      this.form.telefone = "";
      this.form.cep = "";
      this.form.logradouro = "";
      this.form.numero = "";
      this.form.bairro = "";
      this.form.complemento = "";     

      //redireciona para a listagem
      this.$router.push("/usuarios/lista");
    },

  },
});
</script>

<style scoped>
.root .row {
  min-height: 0vh;
}
.row {
  min-height: 0vh;
}
.font {
  font-family: "Mulish", sans-serif;
}
.titulo {
  color: #293258;
  margin-top: 20px;
  font-family: "Mulish", sans-serif;
}
.titulo2 {
  color: #293258;
  font-family: "Mulish", sans-serif;
}
.custom-select-sm {
  height: calc(2em + 0.5rem + 2px);
}
.bordered {
  border-radius: 10px;
}
</style>
