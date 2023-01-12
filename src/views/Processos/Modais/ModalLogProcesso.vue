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

          <!-- TOPO TABELA-->
          <div class="topo-table p-2">       
            <div class="desc-topo-table">
              <b-icon-journal-text class="icon-topo-table"></b-icon-journal-text> 
              <span class="title-topo-table">{{numProcedimento}}</span>
            </div>  
          </div>  
    
        <!-- TABELA -->
        <div>
            <b-table-lite small striped hover responsive class="m-0" head-variant="dark"
                :current-page="currentPage" :per-page="perPage" :sticky-header="stickyHeader"
                :no-border-collapse="noCollapse" :items="items" :fields="fields">

              <!-- DATA -->
              <template v-slot:cell(entrada_no_setor)="data">
                 {{formatarDataBr(data.item.entrada_no_setor)}}
              </template> 

            </b-table-lite>
        </div>
        <div class="m-3 text-center" v-if="items.length==0">
               <label>Nenhum registro encontrado.</label>
        </div>       
        <!-- RODAPÉ DA TABELA (Espaço reservado para incluir ícones) --><!-- PAGINAÇÃO -->
       <!-- <div class="card-footer m-0 px-1 pt-1">            
            <div class="col-12 m-0 px-1 pt-1">
                <b-pagination pills align="right" size="sm" v-model="currentPage" :total-rows="rows"
                    :per-page="perPage">
                </b-pagination>
            </div>
        </div> -->       
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
import RestApiService from "@/services/rest/service";
import { Log } from '@/type/LogProcesso';
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
            perPage: 5,           
            fields: FieldsTableLog,        
            loading: false as boolean,
            form: {} as Log,
            items: [] as Array<Log>,
            Message: [] as Array<Notificacao>, 
            Notificacao: [] as Array<Notificacao>,
            alert: false as boolean, 
        };
    },
    mounted() {
        this.carregarDados()
    },   
    methods: {       
        carregarDados(): void {
            this.loading = true;       
                        
            RestApiService.get("processos/movimentacoes-processo", "?numero_processo="+this.numProcedimento)            
                .then((response: any) => {                  
                this.items = response.data; 
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
