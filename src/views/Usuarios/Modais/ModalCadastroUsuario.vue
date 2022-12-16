<template>
  <div>
      <!-- CARD DE CADASTRO -->
      <div class="card">
          <div class="col-12">
              
                  <notifications :notifications="Notificacao"></notifications>      

                  <div v-if="alert">
                      <ReturnMessage :message="Message" :fechaAlert="fechaAlert"></ReturnMessage>
                  </div>          

                  <div v-if="loading">
                      <LoadingSpinner></LoadingSpinner>
                  </div>

                  <!--<b-form-group class="titulo" label="Informações pessoais" label-size="lg">
                      <hr />
                  </b-form-group>-->
                  
                <b-form @submit.prevent="submit">    
                  <h5 class="titulo2">Informações pessoais</h5>
                  <hr class="mt-0" />
                  


                  <!-- 1ª LINHA (CPF + NOME) -->
                <div class="row">
                  <b-form-group class="font col-sm-5 col-md-5 col-lg-5">
                    <label>Nome completo <span class="text-danger">*</span></label>
                    <b-form-input :disabled="disabledAll" class="bordered" :placeholder="'Insira o nome completo'"
                      type="text" v-model="form.nome" required>
                    </b-form-input>
                  </b-form-group>

                  <b-form-group class="font col-sm-3 col-md-3 col-lg-3">
                    <label>Data de nascimento <span class="text-danger">*</span></label>
                    <b-form-input class="bordered" type="text" v-model="form.dataNascimentoBR" placeholder="00/00/0000"
                      v-mask="'##/##/####'" :disabled="disabledAll" required></b-form-input>
                  </b-form-group>                  
                
                  <b-form-group class="font col-sm-3 col-md-3 col-lg-3">
                    <label>CPF <span class="text-danger">*</span></label>
                    <b-form-input :disabled="disabledAll" @keyup="vericaCpf" class="bordered" required :placeholder="'Exemplo: 000.000.000-00'"
                      type="tel" v-model="form.cpf" v-mask="'###.###.###-##'">
                    </b-form-input>
                  </b-form-group>
                  
                </div>
                <div class="row">
                  <b-form-group class="font col-sm-6 col-md-6 col-lg-6">
                    <label>Matrícula <span class="text-danger">*</span></label>
                    <b-form-input :disabled="disabledAll" class="bordered" required :placeholder="'Digite sua matrícula'"
                      type="tel" v-model="form.matriculaUsuario" v-mask="'###.###.###-##'">
                    </b-form-input>
                  </b-form-group>   

                  <!--<b-form-group class="font col-sm-4 col-md-4 col-lg-4">
                    <template>Perfil de usuário <span class="text-danger">*</span>
                    <b-form-select :disabled="disabledAll" style="margin-top: 1.8%" class="bordered" size="sm"
                      v-model="form.perfilUsuario" required>
                      <b-form-select-option value="">Selecione...</b-form-select-option>
                      <b-form-select-option value="SAPEJ_ADMINISTRADOR">Administrador</b-form-select-option>
                      <b-form-select-option value="SAPEJ_RECEPCAO">Recepção</b-form-select-option>
                      <b-form-select-option value="SAPEJ_ADVOGADO">Serviço social</b-form-select-option>
                    </b-form-select>
                    </template>
                  </b-form-group>-->

              <b-form-group class="font col-sm-4 col-md-4 col-lg-4">
                  <template>Perfil de usuário <span class="text-danger">*</span>
                    <b-form-select :disabled="disabledAll" style="margin-top: 1.8%" class="bordered" size="sm" v-model="form.perfilUsuario" required>
                      <b-form-select-option value="">Selecione...</b-form-select-option>
                      <b-form-select-option v-for="perfil in optionsPerfis" :value="perfil._id" :key="perfil._id">
                        {{ perfil.profile_name }}
                      </b-form-select-option>
                    </b-form-select>
                  </template>
                </b-form-group>



                  
                  <b-form-group class="font col-sm-6 col-md-6 col-lg-6">
                    <label>Cargo <span class="text-danger">*</span></label>
                    <b-form-input :disabled="disabledAll" class="bordered" required :placeholder="'Digite seu cargo'"
                      type="tel" v-model="form.cargoUsuario" >
                    </b-form-input>
                  </b-form-group> 
                </div>

                  <!-- 2ª LINHA (MATRÍCULA + CARGO) -->
                  <h5 class="titulo2">Informações de contato</h5>
                  <hr class="mt-0" />

                <div class="row">
                  <b-form-group class="font col-sm-6 col-md-6 col-lg-6">
                      <label>E-mail <span class="text-danger">*</span></label>
                      <b-form-input :disabled="disabledAll" class="bordered" required :placeholder="'Exemplo: mail@email.com'"
                        type="email" v-model="form.email"></b-form-input>
                    </b-form-group>

                  <b-form-group class="font col-sm-6 col-md-6 col-lg-6">
                    <label>Telefone/celular <span class="text-danger">*</span></label>
                    <b-form-input :disabled="disabledAll" class="bordered" required
                      :placeholder="'Exemplo: (00) 00000-0000'" type="tel" v-model="form.telefone"
                      v-mask="'(##) #####-####'">
                    </b-form-input>
                  </b-form-group>
                </div>                              

                  <div class="py-2 mt-10" align="right">                        
                     <slot name="buttons"></slot>
                     <b-button v-if="!disabledAll" class="bordered ml-2" type="submit" variant="success">Salvar</b-button>
                  </div>     
              </b-form>              
            </div>
          </div>
      </div>   
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import HeaderPage from '@/components/HeaderPage.vue';
import { mask } from "vue-the-mask";
import Notifications from "@/components/Notifications.vue";
import RestApiService from "@/services/rest/service";
import { BIconSearch, BIconPlusCircle, BIconInfoCircle, BIconJournalPlus } from 'bootstrap-vue'
import ReturnMessage from "@/components/ReturnMessage.vue";
import { Notificacao } from "@/type/notificacao";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ValidarCpfMixin from "@/mixins/validarCpfMixin";
import { Usuario } from "@/type/usuario";
import ValidarDataMixin from "@/mixins/validarData";
import formatarDataBrMixin from "@/mixins/formatarDataBr"

export default Vue.extend({
  directives: { mask },
  mixins: [ValidarCpfMixin, ValidarDataMixin, formatarDataBrMixin],
  components: {
      HeaderPage,
      BIconSearch,
      BIconJournalPlus,
      BIconPlusCircle,
      BIconInfoCircle,
      Notifications,
      ReturnMessage,
      LoadingSpinner,
  },
  props: ['id', 'tipo'],
  data() {
      return {
          disabledAll: false as boolean,
          rows: 100,
          currentPage: 1,
          stickyHeader: true,
          success: false as boolean,
          message: "" as string,
          noCollapse: true,
          show: false as boolean,
          Message: [] as Array<Notificacao>,
          Notificacao: [] as Array<Notificacao>,
          loading: false as boolean,
          alert: false as boolean,
          isLoading: false as boolean,
          form: {} as Usuario,
          showBotaoSalvar: true as boolean,
          optionsPerfis: [],
          dataNascimentoBR: "" as string, 
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

  if (this.id) {
    //editar e visualizar
    this.carregarDados(this.id);
  }
},

methods: {
  submit() {
    let acao = this.id ? "put" : "post";
    let url = "usuarios";

    this.loading = true

    if (this.validarCampos()) {     

    console.log(JSON.stringify(this.form))
    RestApiService.salvar(url, this.form, acao, this.form.id)
    .then((res) => {
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
            } else if (
                e &&
                e.response &&
                e.response.data &&
                e.response.data.message
            ) {
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
    }else{
      this.adicionarAlert(
          "alert",
          "Realize as validações exibidas no topo desta página!"
                );   
            }
  },

  /*salvar(acao: string): void {
    RestApiService.salvar("usuarios", this.form, acao)
      .then((res) => {
        this.message = "Cadastro realizado com sucesso!";
        this.success = true;
      })
      .catch((e) => {
        if (e.message === "Network Error") {
          this.message = "Sem conexão de rede. Verifique sua conexão!";
          this.alert = true;
        }
        if (e && e.response.data) {
          this.message = e.response.data.message;
          this.alert = true;
        } else {
          this.message =
            "Houve um erro ao efetuar o cadastro. Verifique o formulário e tente novamente!";
          this.alert = true;
        }
      })
      .finally(() => {
        this.loading = false;
      });
  },*/
  
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
    this.form.dataNascimentoBR = "";
    this.form.matriculaUsuario = "";
    this.form.cargoUsuario = "";
    this.form.perfilUsuario = "";
    this.form.cpf = "";
    this.form.email = "";
    this.form.telefone = "";
    this.form.unit_id = "";

    //redireciona para a listagem
    this.$router.push("/usuarios/lista");
  },

      carregarDados(id: string) {
        this.loading = true;
        RestApiService.get("usuario/auth", this.id)
          .then((response: any) => {
          
          this.form.id = response.data.id; 
          this.form.unit_id = response.data.unit_id; 
          this.form.nome = response.data.nome;
          //this.form.setorUsuario = response.data.setorUsuario
          //this.form.unidadeUsuario = response.data.unidadeUsuario          
          //this.form.dataNascimento = response.data.dataNascimento;
          this.dataNascimentoBR = response.data.dataNascimento ? formatarDataBrMixin.methods.formatarDataBr(response.data.dataNascimento) : '';                    
          this.form.cpf = response.data.cpf;
          this.form.email = response.data.email;
          this.form.telefone = response.data.telefone;
          this.form.perfilUsuario = response.data.perfilUsuario
          
          })

          .catch((e) => {
              this.adicionarAlert(
                      "alert",
                  "Houve um erro ao carregar os dados. Tente novamente!"
              );
        
          })
          .finally(() => {
              this.loading = false;
          });
      },

      validarCampos(): boolean {     
          
          /*if(!this.form.id){
              this.adicionarNotificacao(
              "danger",
              "Campo Assunto é obrigatório!"
              );
          }     */
          
          if(!this.form.nome){
              this.adicionarNotificacao(
              "danger",
              "Campo Nome é obrigatório!"
              );
          }

          if(!this.form.dataNascimentoBR){
              this.adicionarNotificacao(
              "danger",
              "Campo Data de nascimento é obrigatório!"
              );          
          }  

          if (this.form.dataNascimentoBR && !ValidarDataMixin.methods.validarData(this.form.dataNascimentoBR)) {
              this.adicionarNotificacao(
              "danger",
              "A data de nascimento informada é inválida."
              );
          }
          
          if(!this.form.cpf){
              this.adicionarNotificacao(
              "danger",
              "Campo CPF é obrigatório!"
              );            
          }

          if(this.form.cpf && !ValidarCpfMixin.methods.validarCpf(this.form.cpf)){
              this.adicionarNotificacao(
              "danger",
              "CPF inválido!"
              );
          }  

          if(!this.form.email){
              this.adicionarNotificacao(
              "danger",
              "Campo E-mail é obrigatório!"
              );            
          }

          if(!this.form.telefone){
              this.adicionarNotificacao(
              "danger",
              "Campo Telefone/celular é obrigatório!"
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

      vericaCpf():void {
      if(this.form && this.form.cpf){       
      if(this.form.cpf.length == 14){
        console.log(this.form.cpf);
        console.log(this.form.cpf.length);
        RestApiService.getSSO('user/exists', `${this.form.cpf}` )          
      .then((response: any) => {          
        this.carregarDados(response.data.id);
      })
      .catch((e: Error) => {
       // this.message = "Usuário não existe na base de dados.";
       // this.alert = true;
      });
    }
  }
},
    

      voltar(): void {
          this.$router.push("/");
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
  },  
});
</script>

<style scope>
.p0m0 {
  margin: 0;
  padding: 0;
}

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

.custom-select-sm {
  height: calc(2em + 0.5rem + 2px);
}
</style>
