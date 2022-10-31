<template>
    <div>      
    <!-- CARD DA TABELA DO PROCESSO -->
    <div class="card p-0 mt-10">

            <!-- NOTIFICAÇÕES -->       
            <notifications :notifications="Notificacao"></notifications>      

            <div v-if="alert">
                <ReturnMessage :message="Message" :fechaAlert="fechaAlert"></ReturnMessage>
            </div>          

            <div v-if="loading">
                <LoadingSpinner></LoadingSpinner>
            </div>        
        
        <!-- CABEÇALHO DA TABELA (Espaço reservado para incluir ícones) -->
        <div class="card-header" align="right">
            <div class="row">
                <!-- ÍCONE Journal-Text -->
                <div class="col-1 text-blue h2 p0m0" align="center" label="Reiterações">
                    <b-icon-journal-text></b-icon-journal-text>
                </div>
                <!-- TÍTULO -->
                <div class="col-10 mt-1" align="start">
                    <div class="row position-relative">
                        <h5>Reiterações</h5>
                    </div>
                </div>
                <!-- ÍCONE Plus-Circle -->
                <div  align="center"><!--position-relative class="col-1 mt-3 mb-3"-->
                    <b-form-group label="" class="btn text-primary position-absolute">
                    <div class="h3">
                        <b-icon-plus-circle v-b-modal.modal-cadastro-reiteracao v-b-tooltip.hover.topleft="'Adicionar Reiteração'">
                        </b-icon-plus-circle>
                    </div>
                    </b-form-group>
                </div>
            </div>
        </div>
        <!-- TABELA -->
        <div>            
            <b-table-lite small striped hover class="m-0" head-variant="dark"
                :current-page="currentPage" :per-page="perPage" 
                :no-border-collapse="noCollapse" :items="items" :fields="fields">

             <template v-slot:cell(data_processo)="data">
                 {{data.item.data_processo ? formatarDataBr(data.item.data_processo) : ''}}
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
                    @click="abrirModal('modal-editar-reiteracao', data.item.id_reiteracao)"  
                    tipo="editar"> 
                    Editar
                  </b-list-group-item>

                  <b-list-group-item block class="btn-light btn-outline-dark m-0 p-1"                 
                    @click="abrirModal('modal-visualizar-reiteracao', data.item.id_reiteracao)"
                    tipo="visualizar"> 
                    Visualizar
                  </b-list-group-item>                 

                  <!--<b-list-group-item block class="btn-light text-dark btn-outline-danger m-0 p-1"                 
                      @listarProcesso="listarReiteracoes(currentPage)"                     
                      @click="excluir(data.item.id_reiteracao, data.item.num_procedimento)">
                    Excluir
                  </b-list-group-item>-->

                  <b-list-group-item block                     
                      @click="abrirModal('modal-excluir', data.item.id_reiteracao, data.item.num_procedimento)"
                      class="btn-light text-dark btn-outline-danger m-0 p-1"                 
                      @listarReiteracoes="listarReiteracoes(currentPage)">                      
                    Excluir
                  </b-list-group-item>
                  
                </b-dropdown>
                </template>
            </b-table-lite>

            <div class="m-3 text-center" v-if="items.length==0">
              <label>Nenhum registro encontrado</label>
            </div>  
        </div>
        <!-- RODAPÉ DA TABELA (Espaço reservado para incluir ícones) -->
        <div class="card-footer m-0 px-1 pt-1">
            <!-- PAGINAÇÃO -->
            <div class="col-12 m-0 px-1 pt-1">
                <b-pagination pills align="right" size="sm" v-model="currentPage" 
                @change="listarReiteracoes"
                :total-rows="totalRows" :per-page="perPage" v-show="totalRows">
                </b-pagination>
            </div>
        </div>

        <div class="py-2 mt-10 mr-3" align="right">                        
            <b-button class="bordered" v-show="tipo=='editar'"
               @click="$bvModal.hide('modal-editar-processo')">Fechar</b-button>
            <b-button class="bordered"
              v-show="tipo=='visualizar'"
              @click="$bvModal.hide('modal-visualizar-processo')">Fechar</b-button>
        </div>
    </div> 

    <!-- Modal Reiteracoes -->
    <b-modal id="modal-cadastro-reiteracao" size="lg" centered title="Cadastro - Reiterar Processo" hide-footer>
              <ModalReiteracoes :idProcesso="idProcesso"  @listarReiteracoes=listarReiteracoes(currentPage)> 
                  <template v-slot:buttons>
                      <b-button class="bordered" @click="$bvModal.hide('modal-cadastro-reiteracao')">Fechar</b-button>
                  </template>     
              </ModalReiteracoes>
    </b-modal>
    <b-modal id="modal-editar-reiteracao" size="lg" centered title="Edição - Reiterar Processo" hide-footer>
          <ModalReiteracoes  :idProcesso="idProcesso"  @listarReiteracoes=listarReiteracoes(currentPage)
             :idReiteracao="idReiteracaoModal"
             tipo="editar"> 
            <template v-slot:buttons>
                <b-button class="bordered" @click="$bvModal.hide('modal-editar-reiteracao')">Fechar</b-button>
            </template>            
          </ModalReiteracoes>
        </b-modal>

        <b-modal id="modal-visualizar-reiteracao" size="lg" centered title="Reiterações do Processo" hide-footer>
          <ModalReiteracoes :idProcesso="idProcesso" 
            :idReiteracao="idReiteracaoModal"
            tipo="visualizar">  
            <template v-slot:buttons>
                <b-button class="bordered" @click="$bvModal.hide('modal-visualizar-reiteracao')">Fechar</b-button>
            </template>            
          </ModalReiteracoes>
        </b-modal>  
        
        <ModalExcluir :pergunta="`o processo ${numProcedimentoModal}`">
           <template v-slot:buttons>
                <b-button variant="danger" class="bordered" 
                @click="excluir(idReiteracaoModal)"
                >Excluir</b-button>
            </template>   
        </ModalExcluir>


   </div>     
</template>

<script lang="ts">
import Vue from "vue";
import HeaderPage from '@/components/HeaderPage.vue';
import { mask } from "vue-the-mask";
import { BIconSearch, BIconPlusCircle, BIconInfoCircle, BIconJournalText } from 'bootstrap-vue'
import {FieldsTableReiteracao} from "@/type/tableReiteracao"
import dataMixin from "@/mixins/dataMixin";

import RestApiService from "@/services/rest/service";
import Notifications from "@/components/Notifications.vue";
import { Notificacao } from "@/type/notificacao";
import ReturnMessage from "@/components/ReturnMessage.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

import ModalReiteracoes from "./Modais/ModalReiteracoes.vue";
import ModalExcluir from "@/components/ModalExcluir.vue"

export default Vue.extend({
    directives: { mask },
    mixins: [        
        dataMixin,
    ], 
    components: {
        HeaderPage,
        BIconSearch,
        BIconJournalText,
        BIconPlusCircle,
        BIconInfoCircle,        
        ModalReiteracoes,
        Notifications,
        ReturnMessage,
        LoadingSpinner,
        ModalExcluir
    },
    data() {
        return {           
            rows: 100,
            currentPage: 1,
            stickyHeader: true,
            noCollapse: true,
            totalRows: 1,
            perPage: 10,
            pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],     
            fields: FieldsTableReiteracao,
            items: [] as Array<String>,
            idReiteracaoModal: null as any,
            numProcedimentoModal: null as any,

            Notificacao: [] as Array<Notificacao>,
            Message: [] as Array<Notificacao>,
            loading: false as boolean,
            alert: false as boolean,            
        };
    },
    props: ['idProcesso', 'tipo'],
    mounted(){
        this.listarReiteracoes(this.currentPage)
    },
    methods: {    
    abrirModal(modalname: string, idReiteracao: number, dado?:any){  
            this.$bvModal.show(modalname) 
            this.idReiteracaoModal = idReiteracao 
            this.numProcedimentoModal = dado    
    },
        
    listarReiteracoes(currentpage: number): void {        
       
        RestApiService.get("reiteracoes/processo", `${this.idProcesso}?currentPage=${currentpage}`)
        .then((response: any) => {
          console.log("Resp> ", response.data)
          this.items = response.data.data
          this.perPage = response.data.perPage
          this.totalRows = response.data.total
        })
        .catch((e) => {
          /*this.Notificacao.push({
            type: "danger",
            message: "Não foi possível carregar a listagem!"            
          })*/
          console.log(e)
        })
        .finally(() => {        
         // this.limparNotificacao();
        })
    },   
    
        excluir(id: any): void {   
            this.$bvModal.hide('modal-excluir')  

            RestApiService.delete("reiteracoes", id)
                .then((response: any) => {
              
              
                this.adicionarAlert(
                  "success",
                  "Exclusão realizada com sucesso!"
                ); 

                   /* this.Notificacao.push({
                        type: "success",
                        message: "Exclusão realizada com sucesso!"            
                    }) */
                
                    this.listarReiteracoes(this.currentPage)
                })
                .catch((e: Error) => {   
                    this.adicionarAlert(
                        "alert",
                        "Ocorreu um erro ao excluir registro!"
                    );

                   /* this.Notificacao.push({
                        type: "danger",
                        message: "Ocorreu um erro ao excluir registro!"            
                    })    */               
                })
                .finally(() => {                
                    this.limparNotificacao();
                });               
        },

        limparNotificacao(): void {
            if (this.Notificacao.length > 0) {
                setTimeout(() => {
                this.Notificacao = [];
                }, 3000);
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
