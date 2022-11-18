<template>
  <div class="container fluid">
      <div class="row">
          <div class="col-12" style="margin-top: 20px">
            <b-form-group class="titulo m-0" label="Consulta de assuntos" label-size="lg">
              <hr />
            </b-form-group>
          </div>
      </div>

            <!-- NOTIFICAÇÕES -->       
        <notifications :notifications="Notificacao"></notifications>      

        <div v-if="alert">
            <ReturnMessage :message="Message" :fechaAlert="fechaAlert"></ReturnMessage>
        </div>          

        <div v-if="loading">
            <LoadingSpinner></LoadingSpinner>
        </div>
       

       <!-- FORMULÁRIO DE CONSULTA -->       
       <b-form @submit.prevent="listarAssuntos" class="mb-5">
            <div class="row">               
                <!--<div class="col-3">
                  <b-form-group label="Data:" class="font">
                      <b-form-input class="bordered margin-field" type="text" v-model="dataFeriadoBR" placeholder="dd/mm/aaaa"
                                v-mask="'##/##/####'"></b-form-input>   
                  </b-form-group>
                </div>   --> 
                <div class="col-3">
                  <!--<b-form-group label="Assunto:" class="font">
                    <b-form-select :options="optionsAssunto" 
                                class="font" 
                                label="desc_assunto"
                                value="id_assunto"    
                                placeholder="--Selecione--"      
                                v-model="assuntoSelecionado"/>                                          
                  </b-form-group>   -->          
                  <b-form-group label="Assunto:" class="font">
                      <b-form-select v-model="form.id_assunto">
                          <b-form-select-option value="">-- Selecione --</b-form-select-option>
                          <b-form-select-option v-for="option in optionsTipoAssunto" :value="option.value"
                              :key="option.texto"> {{ option.texto }}
                          </b-form-select-option>                                
                      </b-form-select>
                  </b-form-group>
                </div>      
                <!--<div class="col-2">
                  <b-form-group label="Ano:" class="font">
                      <b-form-input class="bordered margin-field" type="text" v-model="form.ano" placeholder="aaaa"
                                v-mask="'####'"></b-form-input>   
                  </b-form-group>
                </div> -->
                
                <!-- ÍCONE DA LUPA -->
                <div class="col-2 justify-content-center">
                  <b-form-group label="Consultar" class="font text-white">                    
                      <b-button class="h2" type="submit">
                        <b-icon-search v-b-tooltip.hover.topleft="'Consultar'"></b-icon-search>
                      </b-button>               
                  </b-form-group>               
            </div>
            </div>
        </b-form>

        <!-- CARD DA TABELA -->
        <div class="card p-0 m-0">
          <!-- CABEÇALHO DA TABELA (Espaço reservado para incluir ícones) -->
          <div class="card-header" align="right">
            <div class="row">
                <!-- ÍCONE Journal-text -->
                <div class="col-1 text-blue h2 p0m0" align="center" label="Assuntos Cadastrados">
                  <b-icon-journal-text>
                  </b-icon-journal-text>
                </div>
              <!-- TÍTULO -->
              <div class="col-10 mt-1" align="start">
                <div class="row position-relative">
                  <h5>Assuntos Cadastrados</h5>
                </div>
              </div>
              <!-- ÍCONE Plus-Circle -->
              <div class="col-1 position-relative" align="center"> 
                <b-form-group label="" class="btn text-primary position-absolute top-50 start-50 translate-middle">
                  <div class="h3">
                    <b-icon-plus-circle v-b-modal.modal-cadastro-assunto v-b-tooltip.hover.topleft="'Adicionar Assunto'"></b-icon-plus-circle>
                  </div>
                </b-form-group>
              </div>
            </div>
          </div>
          <!-- TABELA -->
          <div>
            <b-table-lite small striped hover class="m-0" head-variant="dark" :current-page="currentPage"
              :per-page="perPage" :no-border-collapse="noCollapse" :items="items"
              :fields="fields">      

              <!-- DATA FERIADO -->
              <template v-slot:cell(data_feriado)="data">
                 {{formatarDataBr(data.item.data_assunto)}}
              </template>   
                           
              <!-- BOTÕES DE AÇÕES -->
              <template v-slot:cell(botaoAction)="data">

                <!-- BOTÃO DROPDOWN -->
                <b-dropdown variant="dark" class="p0m0" size="sm">
                  <!-- CONFIG. ICON HAMBURGUER -->
                  <template #button-content>
                    &#x2261;<span class="sr-only"></span>
                  </template>

                  <!-- ITENS DO DROPDOWN -->                
                  <b-list-group-item block class="btn-light btn-outline-dark m-0 p-1"
                    @click="editarAssunto(data.item.id_assunto)">
                    Editar
                  </b-list-group-item>  
                   <b-list-group-item block 
                     @click="visualizarAssunto(data.item.id_assunto)"
                     class="btn-light btn-outline-dark m-0 p-1">
                    Visualizar
                   </b-list-group-item>          
                  <b-list-group-item block class="btn-light text-dark btn-outline-danger m-0 p-1" @click="excluir(data.item.id_assunto, data.item.descricaoAssunto)">
                    Excluir
                  </b-list-group-item>
                </b-dropdown>
              </template>
            </b-table-lite>
          </div>
          <!-- RODAPÉ DA TABELA (Espaço reservado para incluir ícones) -->
          <div class="card-footer m-0 px-1 pt-1">
            <!-- PAGINAÇÃO -->
            <div class="col-12 m-0 px-1 pt-1">
              <b-pagination pills align="right" size="sm" v-model="currentPage" :total-rows="totalRows" 
                :per-page="perPage" @change="listarAssuntos" v-show="totalRows">
              </b-pagination>
            </div>
          </div>
           <div>&nbsp <b>Total Registros:</b> {{totalRows}}</div>  
        </div>       
        
         <!-- MODAL -->

         <b-modal id="modal-cadastro-assunto" centered title="Cadastro de Assunto" hide-footer>
          <ModalCadastroAssunto  @listarAssuntos="listarAssuntos(currentPage)" > 
            <template v-slot:buttons tipo="cadastrar"> 
                <b-button class="bordered" @click="$bvModal.hide('modal-cadastro-assunto')">Fechar</b-button>
            </template>           
          </ModalCadastroAssunto>
        </b-modal>

        <b-modal id="modal-editar-assunto" centered title="Editar Assunto" hide-footer>
          <ModalCadastroAssunto  @listarAssuntos="listarAssuntos(currentPage)"  tipo="editar" :id="idAssunto">  
            <template v-slot:buttons> 
                <b-button class="bordered" @click="$bvModal.hide('modal-editar-assunto')">Fechar</b-button>
            </template>           
          </ModalCadastroAssunto>
        </b-modal>   
        
        <b-modal id="modal-visualizar-assunto" centered title="Visualizar Assunto" hide-footer>
          <ModalCadastroAssunto tipo="visualizar" :id="idAssunto">  
            <template v-slot:buttons> 
                <b-button class="bordered" @click="$bvModal.hide('modal-visualizar-assunto')">Fechar</b-button>
            </template>           
          </ModalCadastroAssunto>
        </b-modal>   
        <!-- //MODAL -->

  </div> <!--container fluid-->
</template>

<script lang="ts">
import Vue from "vue";
//import axios from "axios";
import HeaderPage from '@/components/HeaderPage.vue';
import { mask } from "vue-the-mask";
import { Assunto } from "@/type/assunto";
import { FieldsTableAssunto } from "@/type/tableAssunto";
import { BIconSearch, BIconPlusCircle, BIconInfoCircle, BIconJournalText } from 'bootstrap-vue'
import dataMixin from "@/mixins/dataMixin";
import { TipoAssuntoSeeder } from "@/type/tipoAssunto";
import RestApiService from "@/services/rest/service";

import Notifications from "@/components/Notifications.vue";
import { Notificacao } from "@/type/notificacao";
import ReturnMessage from "@/components/ReturnMessage.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ModalCadastroAssunto from "./Modais/ModalCadastroAssunto.vue";
import ModalExcluir from "@/components/ModalExcluir.vue";


export default Vue.extend({
  directives: { mask },
  components: {
    HeaderPage,
    BIconSearch,
    BIconJournalText,
    BIconPlusCircle,
    BIconInfoCircle,
    Notifications,
    ReturnMessage,
    LoadingSpinner,  
    ModalCadastroAssunto,
    ModalExcluir
},
  mixins: [        
        dataMixin,
  ],  
  data() {
    return {
      idAssunto: null as any, //para modal
      rows: 100,
      currentPage: 1,
      totalRows: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],     
      form: {} as Assunto,
      fields: FieldsTableAssunto, //nome das colunas da tabela
     
      stickyHeader: true,
      noCollapse: true,
      dataFeriadoBR: "" as string,
      optionsTipoAssunto: TipoAssuntoSeeder,

      items: [] as Array<Assunto>,

      Notificacao: [] as Array<Notificacao>,
      Message: [] as Array<Notificacao>,
      loading: false as boolean,
      alert: false as boolean,       
      
    };
  },
  mounted() {   
    this.listarAssuntos(this.currentPage);
     
  },
  methods: {
    editarAssunto(id: number): void {
        this.idAssunto = id
        this.$bvModal.show('modal-editar-assunto')      

    },

    visualizarAssunto(id: number): void {
        this.idAssunto = id
        this.$bvModal.show('modal-visualizar-assunto')
    },

    listarAssuntos(currentpage: number) : void { 
     
      this.loading = true;  
       
        //RestApiService.get("feriados", `?currentPage=${currentpage}`)

        let busca = {}

        RestApiService.get("assuntos", `?currentPage=${currentpage}`)
          .then((response: any) => {
            this.optionsTipoAssunto = response.data.data;
            this.items = response.data.data;
            this.perPage = response.data.perPage;
            this.totalRows = response.data.total;

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
                            "Houve um erro. Não foi possível carregar a listagem!"
                            );                      
                        }      
          })
          .finally(() => {
            this.loading = false;          
          });
      
    },

    validarCampos(): boolean {     

      if(this.dataFeriadoBR && !dataMixin.methods.validarData(this.dataFeriadoBR) ) {
              this.adicionarNotificacao(
                    "danger",
                    "A data informada é inválida."
                );
      }

      if (this.Notificacao.length > 0) {
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
   
    voltar(): void {
      this.$router.push("/");
    },

    excluir(id: any): void {
    
      let message = 'Deseja realmente excluir o assunto ? '

      if(confirm(message)) {
      
        RestApiService.delete("assuntos", id)
          .then((response: any) => {
            this.loading = true;

            this.adicionarAlert(
                    "success",
                    "Exclusão realizada com sucesso!"
            );  
            
            this.listarAssuntos(this.currentPage)
          })
          .catch((e: Error) => {    
             this.adicionarAlert(
                    "alert",
                    "Ocorreu um erro ao excluir registro!"
            );
          })
          .finally(() => {
            this.loading = false;
          });         
      }
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
