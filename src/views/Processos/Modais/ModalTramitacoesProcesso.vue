<template>

    <!-- CARD DA TABELA DO PROCESSO -->
    <div class="card p-0 m-0">
        <!-- CABEÇALHO DA TABELA (Espaço reservado para incluir ícones) -->
        <div class="card-header" align="right">
            <div class="row">
                <!-- ÍCONE Journal-Text -->
                <div class="col-1 text-blue h2 p0m0" align="center" label="Tramitações do Processo">
                    <b-icon-journal-text></b-icon-journal-text>
                </div>
                <!-- TÍTULO -->
                <div class="col-10 mt-1" align="start">
                    <div class="row position-relative">
                        <h5>{{numProcessoSIGED}}</h5>
                    </div>
                </div>
            </div>
        </div>
        <!-- TABELA -->
        <div>
            <b-table-lite small striped hover responsive class="m-0" head-variant="dark"
                :current-page="currentPage" :per-page="perPage" :sticky-header="stickyHeader"
                :no-border-collapse="noCollapse" :items="items" :fields="fields">
            </b-table-lite>
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
        c57nq0
        <div class="py-2 mt-10 mr-3" align="right">                        
            <b-button class="bordered" @click="$bvModal.hide('modal-tramitacoes-processo')">Fechar</b-button>
        </div>

    </div>     


</template>

<script lang="ts">
import Vue from "vue";
import HeaderPage from '@/components/HeaderPage.vue';
import { mask } from "vue-the-mask";
import Notifications from "@/components/Notifications.vue";
import { BIconSearch, BIconPlusCircle, BIconInfoCircle, BIconJournalText } from 'bootstrap-vue'
import {FieldsTableTramitacao} from "@/type/tableTramitacao"
import {TableTramitacaoSeeder} from "@/type/tableTramitacao"
import RestApiService from "@/services/rest/service";
import { Tramitacao } from '@/type/tramitacao';

export default Vue.extend({
    directives: { mask },
    props: ['idProcesso'],
    data() {
        return {           
            rows: 100,
            currentPage: 1,
            stickyHeader: true,
            noCollapse: true,
            totalRows: 1,
            perPage: 5,
            pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],     
            fields: FieldsTableTramitacao,
            items: TableTramitacaoSeeder,
            loading: false as boolean,
            form: {} as Tramitacao,
        };
    },
    methods: {       
        carregarDados(): void {
            this.loading = true;       
                        
            RestApiService.get("processos/movimentacoes-processo", this.idProcesso)
                .then((res: any) => {          

                this.form.caixaSIGED = res.data.num_procedimento
                this.form.eventoTramitacao = res.data.data_processo
                this.form.entradaSetor = res.data.prazo
                this.form.permanencia = res.data.numero_siged
                this.form.reiteracao = res.data.reiteracao  

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
    },
    components: {
        HeaderPage,
        BIconSearch,
        BIconJournalText,
        BIconPlusCircle,
        BIconInfoCircle,
        Notifications,
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
