<template>
  <div class="container fluid">
    <div class="row">
        <div class="col-12" style="margin-top: 20px">
          <b-form-group class="titulo m-0" label="Consulta de Responsáveis" label-size="lg">
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
        <b-form @submit.prevent="search" class="mb-5">
            <div class="row">
                <!-- (CPF) -->
                <div class="col-xs-6 col-sm-4 col-md-4">
                  <b-form-group label="CPF:" class="font">
                    <b-form-input :placeholder="'Digite seu CPF '" type="text" v-model="form.cpf_responsavel"
                      v-mask="'###.###.###-##'"></b-form-input>
                  </b-form-group>
                </div>
                <!-- (NOME) -->
                <div class="col-xs-6 col-sm-6 col-md-6">
                  <b-form-group label="Nome:" class="font">
                    <b-form-input :placeholder="'Digite seu Nome'" type="text" v-model="form.nome_responsavel">
                    </b-form-input>
                  </b-form-group>
                </div>
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
        <div class="card-table p-0 m-0">    
          <!-- TOPO TABELA-->
          <div class="topo-table">
       
            <div class="desc-topo-table">
              <b-icon-journal-text class="icon-topo-table"></b-icon-journal-text> 
              <span class="title-topo-table">Responsáveis Cadastrados</span>
            </div>                      

            <div class="button-topo-table">
              <b-icon-plus-circle v-b-modal.modal-cadastro-responsavel v-b-tooltip.hover.topleft="'Adicionar Responsável'"></b-icon-plus-circle>
            </div>

          </div>      
          <!-- TABELA -->
          <div>
            <b-table-lite small striped hover class="m-0" head-variant="dark" :current-page="currentPage"
              :per-page="perPage" :no-border-collapse="noCollapse" :items="items"
              :fields="fields">            
            
              <template v-slot:cell(cpf_responsavel)="data">               
                      {{formatCnpjCpf(data.item.cpf_responsavel)}}      
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
                  <b-list-group-item block
                     class="btn-light btn-outline-dark m-0 p-1" @click="editarResponsavel(data.item.id_responsavel)">
                    Editar
                  </b-list-group-item>  
                  <b-list-group-item block 
                     @click="visualizarResponsavel(data.item.id_responsavel)"
                     class="btn-light btn-outline-dark m-0 p-1">
                    Visualizar
                  </b-list-group-item>                 
                 <!-- <b-list-group-item block class="btn-light text-dark btn-outline-danger m-0 p-1" @click="excluir(data.item.id_responsavel, data.item.nome_responsavel)">
                    Excluir
                  </b-list-group-item>-->

                  <b-list-group-item block                     
                      @click="abrirModal('modal-excluir', data.item.id_responsavel, data.item.nome_responsavel)"
                      class="btn-light text-dark btn-outline-danger m-0 p-1"                 
                      @listarResponsaveis="listarResponsaveis(currentPage)"
                      >                      
                    Excluir
                  </b-list-group-item>                    

                </b-dropdown>
                  
              </template>                                 
            </b-table-lite>
          </div>

          <div class="m-3 text-center" v-if="totalRows==0">
               <label>Nenhum registro encontrado.</label>
          </div>
                 
          <!-- RODAPÉ DA TABELA (Espaço reservado para incluir ícones) -->
          <div class="card-footer m-0 px-1 pt-1">
            <!-- PAGINAÇÃO -->
            <div class="col-12 m-0 px-1 pt-1">              
              <b-pagination pills align="right" size="sm" v-model="currentPage" 
                @change="listarResponsaveis"              
                :total-rows="totalRows" :per-page="perPage"  v-show="totalRows">
              </b-pagination>               
            </div>           
          </div>
          <div>&nbsp <b>Total Registros:</b> {{totalRows}}</div>
        <!-- table -->
    </div><!-- card -->

        <!-- MODAL -->
        <b-modal id="modal-cadastro-responsavel" size="lg" centered title="Cadastro do Responsável" hide-footer>
          <ModalCadastroResponsavel  @listarResponsaveis="listarResponsaveis(currentPage)" tipo="cadastrar"> 
            <template v-slot:buttons> 
                <b-button class="bordered" @click="$bvModal.hide('modal-cadastro-responsavel')">Fechar</b-button>
            </template>           
          </ModalCadastroResponsavel>
        </b-modal>

        <b-modal id="modal-editar-responsavel" size="lg" centered title="Editar Responsável" hide-footer>
          <ModalCadastroResponsavel @listarResponsaveis="listarResponsaveis(currentPage)" tipo="editar" :id="idResponsavel">  
            <template v-slot:buttons> 
                <b-button class="bordered" @click="$bvModal.hide('modal-editar-responsavel')">Fechar</b-button>
            </template>           
          </ModalCadastroResponsavel>
        </b-modal>

        <b-modal id="modal-visualizar-responsavel" size="lg" centered title="Visualizar Responsável" hide-footer>
          <ModalCadastroResponsavel tipo="visualizar" :id="idResponsavel"> 
            <template v-slot:buttons> 
                <b-button class="bordered" @click="$bvModal.hide('modal-visualizar-responsavel')">Fechar</b-button>
            </template>           
          </ModalCadastroResponsavel>
        </b-modal>

        <ModalExcluir :pergunta="`o responsável ${nomeResponsavelModal}`">
                    <template v-slot:buttons>
                          <b-button variant="danger" class="bordered" 
                          @click="excluir(idResponsavel)"
                          >Excluir</b-button>
                      </template>   
        </ModalExcluir>
        <!-- //MODAL -->


</div><!-- container fluid -->



</template>

<script lang="ts">
import Vue from "vue";
//import axios from "axios";
import HeaderPage from '@/components/HeaderPage.vue';
import ModalCadastroResponsavel from './Modais/ModalCadastroResponsavel.vue';
import { mask } from "vue-the-mask";
import { Responsavel } from '@/type/responsavel';
import { FieldsTableResponsavel } from "@/type/tableResponsavel";
import { BIconSearch, BIconPlusCircle, BIconInfoCircle, BIconJournalText } from 'bootstrap-vue'

import Notifications from "@/components/Notifications.vue";
import { Notificacao } from "@/type/notificacao";
import ReturnMessage from "@/components/ReturnMessage.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

import RestApiService from "@/services/rest/service";

import ModalExcluir from "@/components/ModalExcluir.vue"
import formataCpfMixin from "@/mixins/formataCpfMixin";

export default Vue.extend({
  directives: { mask },
  components: {
    HeaderPage,   
    BIconSearch,
    BIconJournalText,
    BIconPlusCircle,
    BIconInfoCircle,
    Notifications,
    ModalCadastroResponsavel,
    ReturnMessage,
    LoadingSpinner,
    ModalExcluir
  },
  mixins: [        
    formataCpfMixin,
  ], 
  data() {
    return {
      idResponsavel: null as any, //para modal
      nomeResponsavelModal: "" as string,
      rows: 100,
      currentPage: 1,
      totalRows: null as any,
      perPage: 10,
      items: [] as Array<String>,  
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      form: {} as Responsavel,
      fields: FieldsTableResponsavel, //nome das colunas da tabela     
      stickyHeader: true,
      noCollapse: true,

      Notificacao: [] as Array<Notificacao>,
      Message: [] as Array<Notificacao>,
      loading: false as boolean,
      alert: false as boolean,   

      totalPageSearch: 0, //total de registros na paginacao corrente   
    };
  },
  mounted() {
    this.listarResponsaveis(this.currentPage)
  },
  methods: {  
    abrirModal(modalname: string, idResponsavel: number, dado?: any){
     
       this.idResponsavel = idResponsavel         
       this.nomeResponsavelModal = dado
       this.$bvModal.show(modalname)            
    },

    editarResponsavel(id: number): void {
        this.idResponsavel = id
        this.$bvModal.show('modal-editar-responsavel')       
    },

    visualizarResponsavel(id: number): void {
        this.idResponsavel = id
        this.$bvModal.show('modal-visualizar-responsavel')
    },

    listarResponsaveis(currentpage: number) : void {
      this.loading = true
      //RestApiService.get("responsaveis", `?currentPage=${currentpage}`)
      const cpf =  this.form.cpf_responsavel ? 
           this.form.cpf_responsavel.replace(/[^\d]+/g, "") : ""

      let busca = {
        cpfResponsavel : cpf,
        nomeResponsavel : this.form.nome_responsavel ? this.form.nome_responsavel : "",
      }

      RestApiService.post3("responsaveis/list", `?currentPage=${currentpage}`, busca) 
        .then((response: any) => {
          this.items = response.data.data
          this.perPage = response.data.perPage
          this.totalRows = response.data.total    
          this.totalPageSearch = response.data.data.length          
        })
        .catch((e: Error) => {
          console.log(e)
          //this.adicionarNotificacao('danger', 'Não foi possível carregar a listagem!') 
          this.Notificacao.push({
            type: "danger",
            message: "Não foi possível carregar a listagem!"            
          })        
          return false;
        })
        .finally(() => {
           this.loading = false;       
        });
    },

    search() {      

      const cpf =  this.form.cpf_responsavel ? 
           this.form.cpf_responsavel.replace(/[^\d]+/g, "") : ""

      let busca = {
        cpfResponsavel : cpf,
        nomeResponsavel : this.form.nome_responsavel ? this.form.nome_responsavel : "",      
      }   
      
      if(!this.form.cpf_responsavel   && !this.form.nome_responsavel ){       
          this.currentPage = 1        
        }    
     
        RestApiService.post("responsaveis/list", busca)
          .then((response: any) => {            
            this.items = response.data.data;
            this.perPage = response.data.perPage;
            this.totalRows = response.data.total;
            this.totalPageSearch = response.data.data.length      
          })
          .catch((e) => {
            if (e.message.length > 0) {
              this.Notificacao.push({
                type: "danger",
                message: e.response.data.message,
              });              
              return false;
            }
          })
          .finally(() => {
            this.loading = false          
          });      
     },

   
    

    excluir(id: any){
    this.$bvModal.hide('modal-excluir')  

    RestApiService.delete("responsaveis", id)
        .then((response: any) => {
          this.loading = true;

          this.adicionarAlert(
                  "success",
                  "Exclusão realizada com sucesso!"
          ); 

          //se excluir último registro de uma página, retornar para a primeira
          if(this.totalPageSearch == 1) {
            this.currentPage = 1
          }  
          
          this.listarResponsaveis(this.currentPage)
        })
        .catch((e: Error) => {    
           this.adicionarAlert(
                  "alert",
                  "Ocorreu um erro ao excluir registro! O registro pode estar sendo utilizado em outro cadastro."
          );
        })
        .finally(() => {
          this.loading = false;
        }); 
   },

   /* excluir(id: any, nome: string): void {
    
      let message = 'Deseja realmente excluir responsável ' + nome + '?'

      if(confirm(message)) {
        RestApiService.delete("responsaveis", id)
          .then((response: any) =>{
              this.loading = true
              this.adicionarAlert(
                  "success",
                  "Exclusão realizada com sucesso!"
              );

             this.listarResponsaveis(this.currentPage)
          })
          .catch((e: Error) => {
             this.adicionarAlert(
                  "alert",
                  "Ocorreu um erro ao excluir registro!"
              );
          })
          .finally(() => {
            this.loading = false
          });
      }
    },*/

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

/* Cabeçalho da tabela */
.topo-table {
  display: flex;
  justify-content: space-between;  
  align-items: center;
  padding: 1px 10px; /* top bottom / right left */
  background-color: rgba(0, 0, 0, .03);
  border: 1px solid rgba(0,0,0, .125); 
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.icon-topo-table { 
  font-size: 2rem;  
}

.title-topo-table {
  font-size: 1.2rem;
  padding-left: 10px;
  font-weight: 100;
  flex-grow: 1;  
  font-family: "Mulish", sans-serif;
  align-self: center;
}

.button-topo-table {
  font-size: 2.2rem;
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
}

.button-topo-table:hover {
  color: #5cabff;
}

</style>
