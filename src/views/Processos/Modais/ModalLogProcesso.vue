<template>

    <!-- CARD DA TABELA DO PROCESSO -->
    <div class="card-table p-0 m-0">  
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
                <b-form-group label="Usuário:" class="font">
                    
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

          <!-- TOPO TABELA-->
          <div class="topo-table p-2">       
            <div class="desc-topo-table">
              <b-icon-journal-text class="icon-topo-table"></b-icon-journal-text> 
              <span class="title-topo-table">{{numProcedimento}}</span>
            </div>  
          </div>  
    
        <!-- TABELA -->
        <div>
            <b-table-lite small striped hover class="m-0" head-variant="dark"
                :current-page="currentPage" :per-page="perPage" :sticky-header="stickyHeader"
                :no-border-collapse="noCollapse" :items="items" :fields="fields">


              <!-- DATA FERIADO -->
              <template v-slot:cell(date)="data">
                 {{formatarDateTimeBr(data.item.date)}}
              </template> 
             
            </b-table-lite>
        </div>
        <div class="m-3 text-center" v-if="items.length==0">
               <label>Nenhum registro encontrado.</label>
        </div>       
       <!-- RODAPÉ DA TABELA (Espaço reservado para incluir ícones) --><!-- PAGINAÇÃO -->
       <div class="card-footer m-0 px-1 pt-1">            
            <div class="col-12 m-0 px-1 pt-1">
                <b-pagination pills align="right" size="sm" v-model="currentPage" :total-rows="rows"
                    :per-page="perPage" v-show="totalRows" @change="carregarDados">
                </b-pagination>
            </div>
        </div>       
        <div>&nbsp <b>Total Registros:</b> {{totalRows}}</div> 
        <div class="py-2 mt-10 mr-3" align="right">                        
            <b-button class="bordered" @click="$bvModal.hide('modal-log-processo')">Fechar</b-button>
        </div>
    </div>  
</template>

<script lang="ts">
import Vue from "vue";
import HeaderPage from '@/components/HeaderPage.vue';
import { mask } from "vue-the-mask";
import Notifications from "@/components/Notifications.vue";
import {FieldsTableLog} from "@/type/tableLogProcesso"
import {TableLogProcesso} from "@/type/tableLogProcesso";
import RestApiService from "@/services/rest/service";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { Notificacao } from "@/type/notificacao";
import ReturnMessage from "@/components/ReturnMessage.vue";
import dataMixin from "@/mixins/dataMixin";

export default Vue.extend({
    directives: { mask },
    components: {
        HeaderPage,      
        Notifications,
        LoadingSpinner,
        ReturnMessage
    },
    mixins: [        
        dataMixin,
    ], 
    props: ['idProcesso', 'numProcedimento'],
    data() {
        return {           
            rows: 100,
            currentPage: 1,
            stickyHeader: true,
            noCollapse: true,
            totalRows: 1,
            perPage: 10,  
            pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
            busca: "" as string,         
            fields: FieldsTableLog,        
            loading: false as boolean,
            form: {} as TableLogProcesso,
            items: [] as Array<TableLogProcesso>,
            Message: [] as Array<Notificacao>, 
            Notificacao: [] as Array<Notificacao>,
            alert: false as boolean, 
            totalPageSearch: 0, //total de registros na paginacao corrente   
        };
    },
    mounted() {
        this.carregarDados(this.currentPage)
    },   
    methods: {  
        search(): void {
            this.loading = true

            if(!this.busca){       
            this.currentPage = 1
            }  

            RestApiService.get(
                "logs",
                `?idProcesso=${this.idProcesso}&search=${this.busca}`
            )
                .then((response: any) => {
                this.perPage = response.data.perPage;
                this.items = response.data.data;
                this.totalRows = response.data.total;
                this.totalPageSearch = response.data.data.length  
                })
                .catch((e) => {
                this.adicionarAlert(
                                "alert",
                                "Ocorreu um erro ao realizar a pesquisa!"
                                );         
                })
                .finally(() => {
                this.loading = false          
                });
        },

        carregarDados(currentpage: number): void {
            this.loading = true;       
           
            RestApiService.get("logs", `?idProcesso=${this.idProcesso}&currentPage=${currentpage}`)            
                .then((response: any) => {                  
                this.items = response.data; 
                this.perPage = response.data.perPage;              
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

        adicionarAlert(tipo: string, mensagem: string): void {
            this.Message = []        
            this.Message.push({
                type: tipo,
                message: mensagem,
            });
            this.alert = true;
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
