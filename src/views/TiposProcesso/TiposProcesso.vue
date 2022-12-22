<template>
  <div class="container fluid">
      <div class="row">
          <div class="col-12" style="margin-top: 20px">
            <b-form-group class="titulo m-0" label="Consulta de Tipos de Processo" label-size="lg">
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
              <div class="col-3">
                <b-form-group label="Tipo Processo:" class="font">
                    
                      <b-input-group>  
                        <b-form-input class="bordered margin-field" type="text"
                                  v-model="busca"
                        ></b-form-input>   

                        <b-input-group-append>                
                          <b-input-group-text @click="busca=''">
                            <b-icon icon="x" />
                          </b-input-group-text>
                        </b-input-group-append>
                      </b-input-group>

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
          <!-- TOPO TABELA-->
          <div class="topo-table">
       
            <div class="desc-topo-table">
              <b-icon-journal-text class="icon-topo-table"></b-icon-journal-text> 
              <span class="title-topo-table">Tipos de Processo Cadastrados</span>
            </div>                      

            <div class="button-topo-table">
              <b-icon-plus-circle v-b-modal.modal-cadastro-tipoprocesso v-b-tooltip.hover.topleft="'Adicionar Tipo de Processo'"></b-icon-plus-circle>
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
                  <b-list-group-item block class="btn-light btn-outline-dark m-0 p-1"
                    @click="editarTipoProcesso(data.item.id_tipoprocesso)">
                    Editar
                  </b-list-group-item>  
                   <b-list-group-item block 
                     @click="visualizarTipoProcesso(data.item.id_tipoprocesso)"
                     class="btn-light btn-outline-dark m-0 p-1">
                    Visualizar
                  </b-list-group-item>                 
               <!--   <b-list-group-item block class="btn-light text-dark btn-outline-danger m-0 p-1" @click="excluir(data.item.id_tipoprocesso, data.item.desc_tipoprocesso)">
                    Excluir
                  </b-list-group-item> -->

                  <b-list-group-item block                     
                      @click="abrirModal('modal-excluir', data.item.id_tipoprocesso, data.item.desc_tipoprocesso)"
                      class="btn-light text-dark btn-outline-danger m-0 p-1"                 
                      @listarTiposProcesso="listarTiposProcesso(currentPage)">                      
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
                 :total-rows="totalRows" :per-page="perPage" v-show="totalRows"
                  @change="listarTiposProcesso">
              </b-pagination>              
            </div>
          </div> 
           <div>&nbsp <b>Total Registros:</b> {{totalRows}}</div>  
        </div>    
      

         <!-- MODAL -->

         <b-modal id="modal-cadastro-tipoprocesso" centered title="Cadastro de Tipo de Processo" hide-footer>
          <ModalCadastroTipoProcesso  @listarTiposProcesso="listarTiposProcesso(currentPage)" > 
            <template v-slot:buttons tipo="cadastrar"> 
                <b-button class="bordered" @click="$bvModal.hide('modal-cadastro-tipoprocesso')">Fechar</b-button>
            </template>           
          </ModalCadastroTipoProcesso>
        </b-modal>

        <b-modal id="modal-editar-tipoprocesso" centered title="Editar Tipo de Processo" hide-footer>
          <ModalCadastroTipoProcesso  @listarTiposProcesso="listarTiposProcesso(currentPage)" tipo="editar" :id="idTipoProcesso">  
            <template v-slot:buttons> 
                <b-button class="bordered" @click="$bvModal.hide('modal-editar-tipoprocesso')">Fechar</b-button>
            </template>           
          </ModalCadastroTipoProcesso>
        </b-modal> 
        
        <b-modal id="modal-visualizar-tipoprocesso" centered title="Visualizar Tipo de Processo" hide-footer>
          <ModalCadastroTipoProcesso  @listarTiposProcesso="listarTiposProcesso(currentPage)" tipo="visualizar" :id="idTipoProcesso">  
            <template v-slot:buttons> 
                <b-button class="bordered" @click="$bvModal.hide('modal-visualizar-tipoprocesso')">Fechar</b-button>
            </template>           
          </ModalCadastroTipoProcesso>
        </b-modal>     

        <ModalExcluir :pergunta="`o tipo de processo ${tipoProcessoModal}`">
           <template v-slot:buttons>
                <b-button variant="danger" class="bordered" 
                @click="excluir(idTipoProcesso)"
                >Excluir</b-button>
            </template>   
        </ModalExcluir>

        <!-- //MODAL -->

  </div><!--container fluid-->
 
</template>

<script lang="ts">
import Vue from "vue";
import HeaderPage from '@/components/HeaderPage.vue';
import { mask } from "vue-the-mask";
import { TipoProcesso } from '@/type/tipoProcesso';
import { FieldsTableTipoProcesso } from "@/type/tableTipoProcesso";
import dataMixin from "@/mixins/dataMixin";
import RestApiService from "@/services/rest/service";

import Notifications from "@/components/Notifications.vue";
import { Notificacao } from "@/type/notificacao";
import ReturnMessage from "@/components/ReturnMessage.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

import ModalCadastroTipoProcesso from "./Modais/ModalCadastroTipoProcesso.vue";
import ModalExcluir from "@/components/ModalExcluir.vue"

export default Vue.extend({
  directives: { mask },
  components: {
    HeaderPage,   
    Notifications,
    ReturnMessage,
    LoadingSpinner,  
    ModalCadastroTipoProcesso,
    ModalExcluir
},
  mixins: [        
        dataMixin,
  ],  
  data() {
    return {
      idTipoProcesso: null as any, //para modal
      tipoProcessoModal: "" as string, //para modal
      rows: 100,
      currentPage: 1,
      totalRows: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],      
      busca: "" as string,
      fields: FieldsTableTipoProcesso, //nome das colunas da tabela
     
      stickyHeader: true,
      noCollapse: true,
           
      items: [] as Array<TipoProcesso>,

      Notificacao: [] as Array<Notificacao>,
      Message: [] as Array<Notificacao>,
      loading: false as boolean,
      alert: false as boolean,      
      
    };
  },
  mounted() {   
    this.listarTiposProcesso(this.currentPage);
     
  },
  methods: {
    abrirModal(modalname: string, idTipoProcesso: number, dado?: any){
       
       this.idTipoProcesso = idTipoProcesso            
       this.tipoProcessoModal = dado
       this.$bvModal.show(modalname)            
    },
    editarTipoProcesso(id: number): void {
        this.idTipoProcesso = id
        this.$bvModal.show('modal-editar-tipoprocesso')       
    },

    visualizarTipoProcesso(id: number): void {
        this.idTipoProcesso = id
        this.$bvModal.show('modal-visualizar-tipoprocesso')
    },
   
    search():void {

      console.log(JSON.stringify(this.busca))

      if (!this.busca) {
        this.listarTiposProcesso(this.currentPage);
      } else {
        RestApiService.get(
          "tipos-processo",
          `?currentPage=${this.currentPage}&search=${this.busca}`
        )
          .then((response: any) => {
            this.perPage = response.data.perPage;
            this.items = response.data.data;
            this.totalRows = response.data.total;
          })
          .catch((e) => {
            this.adicionarAlert(
                            "alert",
                            "Ocorreu um erro ao realizar a pesquisa!"
                            );         
          });
      }
    },


    listarTiposProcesso(currentpage: number) : void {
     
      this.loading = true;  
       
        RestApiService.get(
          "tipos-processo", `?currentPage=${currentpage}`)
          .then((response: any) => {
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

    excluir(id: any, data: any): void {    
        this.$bvModal.hide('modal-excluir')  
      
        RestApiService.delete("tipos-processo", id)
          .then((response: any) => {
            this.loading = true;

            this.adicionarAlert(
                    "success",
                    "Exclusão realizada com sucesso!"
            );  
            
            this.listarTiposProcesso(this.currentPage)
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
