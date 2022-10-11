<template>
  <div>
    <b-container fluid>
      <div class="row">
        <b-form-group class="titulo m-0" label="Consulta de Órgão Demandante" label-size="lg">
          <hr />
        </b-form-group>

          <!-- NOTIFICAÇÕES -->       
         <notifications :notifications="Notificacao"></notifications>      

        <div v-if="alert">
            <ReturnMessage :message="Message" :fechaAlert="fechaAlert"></ReturnMessage>
        </div>          

        <div v-if="loading">
            <LoadingSpinner></LoadingSpinner>
        </div>

        <!-- FORMULÁRIO DE CONSULTA -->       
        <b-form @submit.prevent="submit" class="mb-5">

            <div class="row">               
                <!-- (NOME) -->
                <div class="col-4"> 
                  <b-form-group label="Nome:" class="font">
                    <b-form-input :placeholder="'Digite Nome do Órgão Demandante'" type="text" v-model="form.orgaoDemandante">
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
        <div class="card p-0 m-0">
          <!-- CABEÇALHO DA TABELA (Espaço reservado para incluir ícones) -->
          <div class="card-header" align="right">
            <div class="row">
                <!-- ÍCONE Journal-text -->
                <div class="col-1 text-blue h2 p0m0" align="center" label="Responsáveis Cadastrados">
                  <b-icon-journal-text>
                  </b-icon-journal-text>
                </div>                
              <!-- TÍTULO -->
              <div class="col-10 mt-1" align="start">
                <div class="row position-relative">
                  <h5>Órgãos Cadastrados</h5>
                </div>
              </div>
              <!-- ÍCONE Plus-Circle -->
              <div class="col-1 position-relative" align="center"> 
                <b-form-group label="" class="btn text-primary position-absolute top-50 start-50 translate-middle">
                  <div class="h3">
                    <b-icon-plus-circle v-b-modal.modal-cadastro-orgao v-b-tooltip.hover.topleft="'Adicionar Órgão'"></b-icon-plus-circle>
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
                     class="btn-light btn-outline-dark m-0 p-1" @click="editarOrgao(data.item.id_orgao)">
                    Editar
                  </b-list-group-item>  
                  <b-list-group-item block 
                     @click="visualizarOrgao(data.item.id_orgao)"
                     class="btn-light btn-outline-dark m-0 p-1">
                    Visualizar
                  </b-list-group-item>                 
                  <b-list-group-item block class="btn-light text-dark btn-outline-danger m-0 p-1" @click="excluir(data.item.id_orgao, data.item.orgao_demandante)">
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
              <b-pagination pills align="right" size="sm" v-model="currentPage" 
                @change="listarOrgaos"              
                :total-rows="totalRows" :per-page="perPage"  v-show="totalRows">
              </b-pagination>               
            </div>           
          </div>
          <div>&nbsp <b>Total Registros:</b> {{totalRows}}</div>    
             
        </div>       
        
         <!-- MODAL -->

        <b-modal id="modal-cadastro-orgao" size="lg" centered title="Cadastro do Órgão Demandante" hide-footer>
          <ModalCadastroOrgao  @listarOrgaos="listarOrgaos(currentPage)" tipo="cadastrar"> 
            <template v-slot:buttons> 
                <b-button class="bordered" @click="$bvModal.hide('modal-cadastro-orgao')">Fechar</b-button>
            </template>           
          </ModalCadastroOrgao>
        </b-modal>

        <b-modal id="modal-editar-orgao" size="lg" centered title="Editar Órgão Demandante" hide-footer>
          <ModalCadastroOrgao @listarOrgaos="listarOrgaos(currentPage)" tipo="editar" :id="idOrgao">  
            <template v-slot:buttons> 
                <b-button class="bordered" @click="$bvModal.hide('modal-editar-orgao')">Fechar</b-button>
            </template>           
          </ModalCadastroOrgao>
        </b-modal>

        <b-modal id="modal-visualizar-orgao" size="lg" centered title="Visualizar Órgão Demandante" hide-footer>
          <ModalCadastroOrgao tipo="visualizar" :id="idOrgao"> 
            <template v-slot:buttons> 
                <b-button class="bordered" @click="$bvModal.hide('modal-visualizar-orgao')">Fechar</b-button>
            </template>           
          </ModalCadastroOrgao>
        </b-modal>

        <!-- //MODAL -->


      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
//import axios from "axios";
import HeaderPage from '@/components/HeaderPage.vue';
import ModalCadastroOrgao from './Modais/ModalCadastroOrgao.vue';
import { mask } from "vue-the-mask";
import { Orgaos } from '@/type/orgaos';
import { FieldsTableOrgao } from "@/type/tableOrgaos";
import { BIconSearch, BIconPlusCircle, BIconInfoCircle, BIconJournalText } from 'bootstrap-vue'

import Notifications from "@/components/Notifications.vue";
import { Notificacao } from "@/type/notificacao";
import ReturnMessage from "@/components/ReturnMessage.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

import RestApiService from "@/services/rest/service";

export default Vue.extend({
  directives: { mask },
  components: {
    HeaderPage,   
    BIconSearch,
    BIconJournalText,
    BIconPlusCircle,
    BIconInfoCircle,
    Notifications,
    ModalCadastroOrgao,
    ReturnMessage,
    LoadingSpinner,
  },
  data() {
    return {
      idOrgao: null as any, //para modal
      rows: 100,
      currentPage: 1,
      totalRows: null as any,
      perPage: 10,
      items: [] as Array<String>,  
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      form: {} as Orgaos,
      fields: FieldsTableOrgao, //nome das colunas da tabela     
      stickyHeader: true,
      noCollapse: true,

      Notificacao: [] as Array<Notificacao>,
      Message: [] as Array<Notificacao>,
      loading: false as boolean,
      alert: false as boolean,   
    };
  },
  mounted() {
    this.listarOrgaos(this.currentPage)
  },
  methods: {
    submit() {
      alert("pesquisar");
      
      console.log(JSON.stringify(this.form))
    },  

    editarOrgao(id: number): void {
        this.idOrgao = id
        this.$bvModal.show('modal-editar-orgao')       
    },

    visualizarOrgao(id: number): void {
        this.idOrgao = id
        this.$bvModal.show('modal-visualizar-orgao')
    },

    listarOrgaos(currentpage: number) : void {
      this.loading = true
      RestApiService.get("orgaos-demandantes", `?currentPage=${currentpage}`)
        .then((response: any) => {
          this.items = response.data.data
          this.perPage = response.data.perPage
          this.totalRows = response.data.total          
        })
        .catch((e: Error) => {
          console.log(e)
          this.adicionarNotificacao('danger', 'Não foi possível carregar a listagem!')         
          return false;
        })
        .finally(() => {
           this.loading = false;
        });

    },
   
    voltar(): void {
      this.$router.push("/");
    },

    excluir(id: any, nome: string): void {
    
      let message = 'Deseja realmente excluir órgão demandante ' + nome + '?'

      if(confirm(message)) {
        RestApiService.delete("orgaos-demandantes", id)
          .then((response: any) =>{
              this.loading = true
              this.adicionarAlert(
                  "success",
                  "Exclusão realizada com sucesso!"
              );

             this.listarOrgaos(this.currentPage)
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
