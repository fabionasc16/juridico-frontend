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
                        <h5>123456/7890-12</h5>
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
    </div>


</template>

<script lang="ts">
import Vue from "vue";
import HeaderPage from '@/components/HeaderPage.vue';
import { mask } from "vue-the-mask";
import Notifications from "@/components/Notifications.vue";
import { BIconSearch, BIconPlusCircle, BIconInfoCircle, BIconJournalText } from 'bootstrap-vue'


export default Vue.extend({
    directives: { mask },
    data() {
        return {
            show: false as boolean,
            exibirMaisDetalhes: false as boolean,
            exibirRegistroPrazo: false as boolean,
            exibirRegistroSIGED: false as boolean,
            rows: 100,
            currentPage: 1,
            stickyHeader: true,
            noCollapse: true,
            totalRows: 1,
            perPage: 5,
            pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
            form: {
                nProcedimento: "" as string,
                assunto: "" as string,
                caixaSIGED: "" as string,
                tipoProcesso: "" as string,
                status: "" as string,
                orgaoDemandante: "" as string,
                classificacao: "" as string,
                qtdDiasPrazo: "" as string,
                dataProcesso: "" as string,
                dataRecebimento: "" as string,
                horaRecebimento: "" as string,
                objeto: "" as string,
                responsavel: "" as string,
                observacao: "" as string,
                nSIGED: "" as string,
                dataCadSIGED: "" as string,
                permanencia: "" as string,
                caixaAtual: "" as string,
                tramitacao: "" as string,
                requerSIGED: false as boolean,
                monitoraPrazo: "" as string,
                maisDetalhes: false as boolean,
            },
            fields: [   //NOMES DAS COLUNAS
                {
                    key: 'caixaSIGED',
                    label: 'Caixa SIGED',
                    sortable: true,
                },
                {
                    key: 'eventoTramitacao',
                    label: 'Evento Tramitação',
                    sortable: true
                },
                {
                    key: 'entradaSetor',
                    label: 'Entrada no Setor',
                    sortable: true,
                },
                {
                    key: 'permanencia',
                    label: 'Permanência',
                    sortable: true,
                },
            ],
            items: [    //DADOS DA TABELA
                { isActive: true, caixaSIGED: 'JURÍDICO', eventoTramitacao: 'Para Assinatura', entradaSetor: '03/06/2022', permanencia: '0' },
                { isActive: true, caixaSIGED: 'CONTRATOS', eventoTramitacao: 'Aguardar Pagamento', entradaSetor: '01/06/2022', permanencia: '2' },
                { isActive: true, caixaSIGED: 'COMPRAS', eventoTramitacao: 'Tramitando', entradaSetor: '28/05/2022', permanencia: '4' },
                { isActive: true, caixaSIGED: 'DETIN', eventoTramitacao: 'Conhecimento e Providências', entradaSetor: '26/05/2022', permanencia: '2' },
                { isActive: true, caixaSIGED: 'RECURSOS HUMANOS', eventoTramitacao: 'Validar Registro', entradaSetor: '20/05/2022', permanencia: '6' },
                { isActive: true, caixaSIGED: 'DIREÇÃO', eventoTramitacao: 'Conhecimento e Providências', entradaSetor: '16/05/2022', permanencia: '4' },
                { isActive: true, caixaSIGED: 'JURÍDICO', eventoTramitacao: 'Para Assinatura Digital', entradaSetor: '16/05/2022', permanencia: '0' },
                { isActive: true, caixaSIGED: 'PROTOCOLO', eventoTramitacao: 'Tramitando', entradaSetor: '15/05/2022', permanencia: '1' },
            ]
        };
    },
    methods: {
        submit() {
            alert("enviar");
        },
        exibeMaisDetalhes(): void {
            if (
                this.form.maisDetalhes === true
            ) {
                this.exibirMaisDetalhes = true;
            } else {
                this.exibirMaisDetalhes = false;
            }
        },
        exibirCampoPrazo(): void {
            if (
                this.form.monitoraPrazo == "sim"
            ) {
                this.exibirRegistroPrazo = true;
            } else {
                this.exibirRegistroPrazo = false;
            }
        },
        exibirCampoSIGED(): void {
            if (
                this.form.requerSIGED === true
            ) {
                this.exibirRegistroSIGED = true;
            } else {
                this.exibirRegistroSIGED = false;
            }
        },
        voltar(): void {
            this.$router.push("/");
        }
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
