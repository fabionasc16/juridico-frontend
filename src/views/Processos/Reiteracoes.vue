<template>
    <div>   
    

    <!-- CARD DA TABELA DO PROCESSO -->
    <div class="card p-0 mt-10">
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
                        <h5>123456/7890-12</h5>
                    </div>
                </div>
                <!-- ÍCONE Plus-Circle -->
                <div class="col-1 position-relative mt-3 mb-3" align="center"> 
                    <b-form-group label="" class="btn text-primary position-absolute top-50 start-50 translate-middle">
                    <div class="h3">
                        <b-icon-plus-circle v-b-modal.modal-cadastro-reiteracao v-b-tooltip.hover.topleft="'Adicionar Reiteração'"></b-icon-plus-circle>
                    </div>
                    </b-form-group>
                </div>
            </div>
        </div>
        <!-- TABELA -->
        <div>
            <b-table-lite small striped hover responsive class="m-0" head-variant="dark"
                :current-page="currentPage" :per-page="perPage" :sticky-header="stickyHeader"
                :no-border-collapse="noCollapse" :items="items" :fields="fields">

              <!-- BOTÕES DE AÇÕES -->
              <template v-slot:cell(botaoAction)="data">

                    <!-- BOTÃO DROPDOWN -->
                    <b-dropdown variant="dark" class="p0m0" size="sm">
                    <!-- CONFIG. ICON HAMBURGUER -->
                    <template #button-content>
                        &#x2261;<span class="sr-only"></span>
                    </template>

                    <!-- ITENS DO DROPDOWN -->                
                    <b-list-group-item block v-b-modal.modal-editar-reiteracao 
                      class="btn-light btn-outline-dark m-0 p-1">
                        Editar
                    </b-list-group-item>

                    </b-dropdown>
                    </template>
            </b-table-lite>

            <div class="m-3 text-center" v-if="!items">
              <label>Nenhum registro encontrado.</label>
            </div>  
        </div>
        <!-- RODAPÉ DA TABELA (Espaço reservado para incluir ícones) -->
        <div class="card-footer m-0 px-1 pt-1">
            <!-- PAGINAÇÃO -->
            <div class="col-12 m-0 px-1 pt-1">
                <b-pagination pills align="right" size="sm" v-model="currentPage" :total-rows="rows"
                    :per-page="perPage">
                </b-pagination>
            </div>
        </div>

        <div class="py-2 mt-10 mr-3" align="right">                        
            <b-button class="bordered" @click="$bvModal.hide('modal-visualizar-reiteracao')">Fechar</b-button>
        </div>
    </div>     
   </div>     
</template>

<script lang="ts">
import Vue from "vue";
import HeaderPage from '@/components/HeaderPage.vue';
import { mask } from "vue-the-mask";
import Notifications from "@/components/Notifications.vue";
import { BIconSearch, BIconPlusCircle, BIconInfoCircle, BIconJournalText } from 'bootstrap-vue'
import {FieldsTableReiteracao} from "@/type/tableReiteracao"
import {TableReiteracaoSeeder} from "@/type/tableReiteracao"
import RestApiService from "@/services/rest/service";

export default Vue.extend({
    directives: { mask },
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
        };
    },
    mounted(){
        this.listarReiteracoes(this.currentPage)
    },
    methods: {    
        
    listarReiteracoes(currentpage: number): void {
    //  this.loading = true

      RestApiService.get("reiteracoes", `?currentPage=${currentpage}`)
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
         // this.loading = false
         // this.limparNotificacao();
        })
    },
     
    },
    components: {
        HeaderPage,
        BIconSearch,
        BIconJournalText,
        BIconPlusCircle,
        BIconInfoCircle,
        Notifications,
    }
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
