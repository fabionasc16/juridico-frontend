<template>
  <div>    

    <b-container>
      <div class="row">
        <div class="col-12" style="margin-top: 2%">
         
          <notifications :notifications="Notificacao"></notifications> 
            <div v-if="alert">
                  <ReturnMessage :message="Message" :fechaAlert="fechaAlert"></ReturnMessage>
            </div> 
            <div v-if="loading">
                <LoadingSpinner></LoadingSpinner>
            </div>
         
          <b-form @submit.prevent="submit">           
           
            <div class="row">
              <b-form-group class="font col-sm-6 col-md-6 col-lg-6">
                <label>CPF <span class="text-danger">*</span></label>
                <b-form-input :disabled="disabledAll || tipo == 'editar'" class="bordered" required :placeholder="'000.000.000-00'"
                  @focusout="verificaCpf"
                  type="text" v-model="form.cpf" v-mask="'###.###.###-##'">
                </b-form-input>
                <small style="color: blue;">Preencha primeiro o CPF</small>
              </b-form-group>

                <b-form-group class="font col-sm-5 col-md-5 col-lg-4">
                  <label>Perfil de usuário  <span class="text-danger">*</span></label>
                 <template>
                    <b-form-select :disabled="disabledAll" class="bordered" size="sm" v-model="perfilSelecionado" required>
                      <b-form-select-option value="">Selecione...</b-form-select-option>
                      <b-form-select-option v-for="perfil in optionsPerfis" :value="perfil.id" :key="perfil.id">
                        {{ perfil.profile_name == 'RECEPCAO'? 'RECEPÇÃO' :  perfil.profile_name}}
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

              <b-form-group class="font col-sm-6 col-md-6 col-lg-3">
                <label>Estado civil <span class="text-danger">*</span></label>
                <b-form-select :disabled="disabledAll" class="bordered" size="sm" v-model="form.estadoCivil">
                  <b-form-select-option value="">Selecione...</b-form-select-option>
                  <b-form-select-option v-for="option in optionsEstadoCivil" :value="option.value" :key="option.value">
                    {{ option.texto }}
                  </b-form-select-option>
                </b-form-select>
              </b-form-group>

              <b-form-group class="font col-sm-6 col-md-6 col-lg-3">
                <label>Gênero <span class="text-danger">*</span></label>                
                <b-form-select @change="alterarGenero()" v-model="generoSelecionado" :options="optionsGenero"  
                :disabled="disabledAll" class="bordered" size="sm"  
                value-field="value"            
                text-field="texto"
                > </b-form-select>    
              </b-form-group>              
                      
              <b-form-group v-show="generoSelecionado == 'autointitulado'" 
                class="font col-sm-6 col-md-6 col-lg-4 animate__animated animate__backInRight">
                <label>Informe o gênero <span class="text-danger">*</span></label>
                <b-form-input :disabled="disabledAll" class="bordered" :placeholder="'Exemplo: Não-binário'" type="text"
                  v-model="form.generoOutro"></b-form-input>
              </b-form-group>               
            </div>

            <h5 class="titulo2">Informações de contato</h5>
            <hr class="mt-0" />

            <div class="row">
              <b-form-group class="font col-sm-6 col-md-6 col-lg-6">
                <label>E-mail <span class="text-danger">*</span></label>
                <b-form-input :disabled="disabledAll" class="bordered" required :placeholder="'Exemplo: mail@email.com'"
                  type="email" v-model="form.email"></b-form-input>
                <small style="color: blue;">E-mail utilizado para envio de dados de acesso, alteração de senha
                e informações.</small>
              </b-form-group>

              <b-form-group class="font col-sm-6 col-md-6 col-lg-4">
                <label>Telefone/celular <span class="text-danger">*</span></label>
                <b-form-input :disabled="disabledAll" class="bordered" required
                  :placeholder="'Exemplo: (00) 00000-0000'" type="text" v-model="form.telefone"
                  v-mask="'(##) #####-####'">
                </b-form-input>
              </b-form-group>
            </div>

            <h5 class="titulo2">Informações de endereço</h5>
            <hr class="mt-0" />

            <div class="row">
              <b-form-group label="CEP" class="font col-sm-5 col-md-5 col-lg-3">
                <b-form-input :disabled="disabledAll" class="bordered" id="cep" :placeholder="'Exemplo: 00000-000'"
                  type="text" @focusout="searchCep()" v-model="form.cep" v-mask="'#####-###'"></b-form-input>
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
  components: {
    HeaderPage,
    LoadingSpinner, 
    Notifications,
    ReturnMessage,
  },
  props: ["id", 'tipo'], 
  data() {
    return {
      invalidCEP: "" as string,
      loading: false as boolean,
      alert: false as boolean,
      success: false as boolean,
      //message: "" as string,
      showBotaoSalvar: true as boolean,   
      optionsEstadoCivil: EstadoCivilSeeder,
      optionsGenero: GeneroSeeder,     
      generoSelecionado: "" as string,
      dataNascimentoBR: "" as string,
      perfilSelecionado: "" as string,
      form: {} as Usuario,      
      disabledAll: false as boolean,
      optionsPerfis: [],         
      Notificacao: [] as Array<Notificacao>,
      Message: [] as Array<Notificacao>,
      unidadeUser: ["6399e95caa133b62db284f5d"] as Array<any>, //SES-AM
    };
  },
  mounted() { 
    this.listarPerfis();

    if(this.tipo == 'editar') {
        this.carregarDados();
        this.showBotaoSalvar = false;     
    }      

    if(this.tipo == 'visualizar'){
        this.carregarDados();
        this.showBotaoSalvar = false;  
        this.disabledAll = true; 
    }
  },

  methods: {
    alterarGenero() {
      this.form.generoOutro = ""
    },
    submit() {
            let acao = this.id || this.form.id ? "put" : "post"             

            if (this.validarCampos()) {            

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
        !this.generoSelecionado ||
        !this.dataNascimentoBR ||
        !this.form.cpf ||
        !this.form.email ||
        !this.form.telefone ||   
        (this.generoSelecionado === "autointitulado" && !this.form.generoOutro)
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
      
      this.form.genero = this.generoSelecionado ? this.generoSelecionado : ""
    
      let perfil = [] as string[]
      perfil.push(this.perfilSelecionado)

      this.form.perfilUsuario = perfil

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
                            "Cadastro realizado com sucesso! Os dados de acesso foram enviados para o e-mail informado!"                                                   
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
  
    listarPerfis(): void {

      /*RestApiService.getSSO(
        'profiles', 'system?nomeSistema=SAPEJ'
          )*/       
      RestApiService.get(
          'auth/profiles/sapej', ""
      )
      .then((response: any) => {         
        this.optionsPerfis = response.data;       
      })
      .catch((e: Error) => {        
        this.adicionarAlert(
                  "alert",
                  "Não foi possível carregar a listagem de perfis."
        );
        });
      },

    carregarDados() {

      let idUser = this.id 
      RestApiService.get("usuarios/detalhes", idUser)
        .then((response: any) => {          
          //this.form.unidadeUsuario = response.data.unit_id; 
          this.form.id = idUser || response.data.id;         
          this.form.nome = response.data.nome;
          this.form.perfilUsuario = response.data.perfilUsuario;     
          this.perfilSelecionado =  response.data.perfilUsuario; 
          this.form.dataNascimento = response.data.dataNascimento;
          this.dataNascimentoBR = response.data.dataNascimento
            ? formatarDataBrMixin.methods.formatarDataBr(
              response.data.dataNascimento
            )
            : "";
          this.form.estadoCivil = response.data.estadoCivil;
          this.form.genero = response.data.genero;          
          this.generoSelecionado = response.data.genero;
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
            this.adicionarAlert(
                            "alert",
                            "Houve um erro. Tente novamente!"
                            );
        });
    },

    searchCep() {

        this.loading = true
        var cep = this.form.cep.replace(/[^0-9]/g, "");

        if (cep.length == 8) {
          axios.get(`https://viacep.com.br/ws/${cep}/json/`).then((res) => {
            if (!res.data.erro) {
              this.invalidCEP = "";
              this.form.logradouro = res.data.logradouro;
              this.form.bairro = res.data.bairro;  
                   
            } else {
              this.loading = false;
              this.invalidCEP = "Este CEP parece inválido!";
            }
          }).finally(() => {
            this.loading = false;
          }); 
        }else{
          this.loading = false;
        }
    },

    verificaCpf():void {

      this.loading = true

      if(this.form && this.form.cpf && this.form.cpf.length == 14){  
         
         RestApiService.get('usuarios/cpf', `${this.form.cpf}` )          
        .then((response: any) => {         
          
          this.form.id = response.data._id;         
          this.form.nome = response.data.nome;
          this.form.perfilUsuario = response.data.perfilUsuario;    //     
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
          this.limparCampos()
        })
        .finally(() => {
            this.loading = false;
        });       
      }else{
        this.limparCampos()
        this.loading = false;        
      }
    },

    limparCampos(){
          this.form.id = ""       
          this.form.nome = ""
          //this.form.perfilUsuario = ""
          this.form.perfilUsuario = []
          this.form.dataNascimento = ""
          this.dataNascimentoBR = ""            
          this.form.estadoCivil = ""
          this.form.genero = ""
          this.generoSelecionado = ""
          this.form.generoOutro = ""                
          this.form.email = ""
          this.form.telefone = ""
          this.form.cep = ""
          this.form.logradouro = ""
          this.form.numero = ""
          this.form.bairro = ""
          this.form.complemento = ""
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
      //(this.form.id = ""), (this.form.perfilUsuario = "");
      (this.form.id = ""), (this.form.perfilUsuario = []);
      //this.form.setorUsuario = ""
      //this.form.unidadeUsuario = ""
      this.form.nome = "";
      this.form.dataNascimento = "";
      this.form.estadoCivil = "";      
      this.form.genero = "";
      this.generoSelecionado = "";
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
