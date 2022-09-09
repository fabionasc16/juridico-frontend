<template>
    <div>
        <!-- CARD DE EDIÇÃO -->
            <div class="col-12">
                <b-form>
                    <b-form-group class="titulo m-0 p-0" label="Informações de entrada do processo" label-size="lg">
                        <hr />
                    </b-form-group>

                    <div class="row">
                        <b-form-group label="Nº Procedimento:" class="font col-sm-3 col-md-3 col-lg-3">
                            <b-form-input type="text" v-model="form.nProcedimento"></b-form-input>
                        </b-form-group>

                        <b-form-group label="Nº Expediente:" class="font col-sm-3 col-md-3 col-lg-3">
                            <b-form-input type="text" v-model="form.nExpediente"></b-form-input>
                        </b-form-group>

                        <b-form-group label="Tipo:" class="font col-sm-3 col-md-3 col-lg-3">
                            <b-form-select v-model="form.tipoProcesso">
                                <b-form-select-option value="null">-- Selecione --</b-form-select-option>
                                <b-form-select-option value="administrativo">Administrativo</b-form-select-option>
                                <b-form-select-option value="extraJudicial">Extra-Judicial</b-form-select-option>
                                <b-form-select-option value="judicial">Judicial</b-form-select-option>
                                <b-form-select-option value="orgaoControle">Órgãos de Controle</b-form-select-option>
                            </b-form-select>
                        </b-form-group>

                        <b-form-group label="Prazo total:" class="font col-sm-3 col-md-3 col-lg-3">
                            <b-form-input type="text" v-model="form.qtdDiasPrazo" required></b-form-input>
                        </b-form-group>
                    </div>

                    <div class="row">
                        <b-form-group label="Órgão Demandante:" class="font col-sm-3 col-md-3 col-lg-3">
                            <b-form-select size="sm" v-model="form.orgaoDemandante">
                                <b-form-select-option value="null">-- Selecione --</b-form-select-option>
                                <b-form-select-option value="DPE">DPE</b-form-select-option>
                                <b-form-select-option value="DelPolicia">Delegacia de Polícia</b-form-select-option>
                                <b-form-select-option value="FVS">FVS</b-form-select-option>
                                <b-form-select-option value="SPA">SPA</b-form-select-option>
                                <b-form-select-option value="TCE">TCE</b-form-select-option>
                                <b-form-select-option value="MPC">MPC</b-form-select-option>
                                <b-form-select-option value="MPE">MPE</b-form-select-option>
                                <b-form-select-option value="MPF">MPF</b-form-select-option>
                                <b-form-select-option value="MPT">MPT</b-form-select-option>
                                <b-form-select-option value="TCU">TCU</b-form-select-option>
                                <b-form-select-option value="Minist.Saude">Ministério da Saúde</b-form-select-option>
                                <b-form-select-option value="CRM">CRM</b-form-select-option>
                                <b-form-select-option value="CEMA">CEMA</b-form-select-option>
                                <b-form-select-option value="DPU">DPU</b-form-select-option>
                                <b-form-select-option value="CasaCivil">Casa Civil</b-form-select-option>
                                <b-form-select-option value="ALEAM">ALEAM</b-form-select-option>
                                <b-form-select-option value="SEINFRA">SEINFRA</b-form-select-option>
                                <b-form-select-option value="Serv.Social">Serviço Social</b-form-select-option>
                                <b-form-select-option value="SEJUSC">SEJUSC</b-form-select-option>
                                <b-form-select-option value="SESAI">SESAI</b-form-select-option>
                                <b-form-select-option value="HPSPlataoAraujo">HPS Platão Araújo</b-form-select-option>
                                <b-form-select-option value="HPS28Agosto">HPS 28 de Agosto</b-form-select-option>
                                <b-form-select-option value="PGE">PGE</b-form-select-option>
                                <b-form-select-option value="CGE">CGE</b-form-select-option>
                                <b-form-select-option value="CGJ">CGJ</b-form-select-option>
                                <b-form-select-option value="CGU">CGU</b-form-select-option>
                                <b-form-select-option value="ALEAMcpiSaude">ALEAM - CPI da Saúde</b-form-select-option>
                                <b-form-select-option value="PeticaoADV">Petição Advogado</b-form-select-option>
                                <b-form-select-option value="CamaraDepFed">Camara dos Deputados Federais
                                </b-form-select-option>
                                <b-form-select-option value="PolFed">Polícia Federal</b-form-select-option>
                                <b-form-select-option value="ComiteCriseCOVID">Comitê de Crise - COVID 19
                                </b-form-select-option>
                                <b-form-select-option value="CamaraMunManaus">Câmara Municipal de Manaus
                                </b-form-select-option>
                                <b-form-select-option value="ConselhoTutelar">Conselho Tutelar</b-form-select-option>
                            </b-form-select>
                        </b-form-group>

                        <b-form-group label="Data do Processo:" class="font col-sm-3 col-md-3 col-lg-3">
                            <b-form-input type="date" v-model="form.dataProcesso"></b-form-input>
                        </b-form-group>

                        <b-form-group label="Data Recebimento:" class="font col-sm-3 col-md-3 col-lg-3">
                            <b-form-input type="date" v-model="form.dataRecebimento"></b-form-input>
                        </b-form-group>

                        <b-form-group label="Hora Recebimento:" class="font col-sm-3 col-md-3 col-lg-3">
                            <b-form-input type="time" v-model="form.horaRecebimento"></b-form-input>
                        </b-form-group>
                    </div>

                    <div class="row">
                        <b-form-group label="Assunto:" class="font col-sm-7 col-md-7 col-lg-7">
                            <b-form-input type="text" v-model="form.assunto"></b-form-input>
                        </b-form-group>

                        <b-form-group label="Classificação:" class="font col-sm-5 col-md-5 col-lg-5">
                            <b-form-select size="sm" v-model="form.classificacao">
                                <b-form-select-option value="class1">Classificação 1</b-form-select-option>
                                <b-form-select-option value="class2">Classificação 2</b-form-select-option>
                                <b-form-select-option value="class3">Classificação 3</b-form-select-option>
                            </b-form-select>
                        </b-form-group>
                    </div>

                    <div class="row">
                        <div class="col-7">
                            <div class="row">
                                <b-form-group label="Objeto:" class="font col-sm-12 col-md-12 col-lg-12">
                                    <b-form-textarea rows="2" max-rows="2" v-model="form.objeto"></b-form-textarea>
                                </b-form-group>
                            </div>
                            <div class="row">
                                <b-form-group label="Responsável:" class="font col-sm-12 col-md-12 col-lg-12">
                                    <b-form-select size="sm" v-model="form.responsavel">
                                        <b-form-select-option value="resp.Heleno">Heleno</b-form-select-option>
                                        <b-form-select-option value="resp.Viviane">Viviane</b-form-select-option>
                                        <b-form-select-option value="resp.Natacha">Natacha</b-form-select-option>
                                        <b-form-select-option value="resp.Alice">Alice</b-form-select-option>
                                        <b-form-select-option value="resp.Milena">Milena</b-form-select-option>
                                        <b-form-select-option value="resp.Fabrício">Fabrício</b-form-select-option>
                                        <b-form-select-option value="resp.Davi">Davi</b-form-select-option>
                                        <b-form-select-option value="resp.Lara">Lara</b-form-select-option>
                                        <b-form-select-option value="resp.Joao">João</b-form-select-option>
                                        <b-form-select-option value="resp.Jessica">Jéssica</b-form-select-option>
                                        <b-form-select-option value="resp.Carlos">Carlos</b-form-select-option>
                                        <b-form-select-option value="resp.CamilaNogueira">Camila Nogueira
                                        </b-form-select-option>
                                        <b-form-select-option value="resp.Karol">Karol</b-form-select-option>
                                        <b-form-select-option value="resp.Louise">Louise</b-form-select-option>
                                        <b-form-select-option value="resp.Sabrina">Sabrina</b-form-select-option>
                                    </b-form-select>
                                </b-form-group>
                            </div>
                            <div class="row">
                                <b-form-group label="Descrição:" class="font col-sm-12 col-md-12 col-lg-12">
                                    <b-form-textarea rows="4" max-rows="4" v-model="form.observacao"></b-form-textarea>
                                </b-form-group>
                            </div>
                        </div>

                        <!-- ÁREA DO SIGED -->
                        <div class="col-5">
                            <div class="row">
                                <b-form-checkbox v-model="form.requerSIGED" @change="exibirCampoSIGED()" switch
                                    class="font col-sm-2 col-md-2 col-lg-2">Requer SIGED
                                </b-form-checkbox>

                                <b-form-group label="" class="ml-4 mt-2 mb-0 font col-sm-9 col-md-9 col-lg-9"
                                    v-show="exibirRegistroSIGED">
                                    <b-form-input :placeholder="'Nº SIGED'" type="text" v-model="form.nSIGED" required>
                                    </b-form-input>
                                </b-form-group>
                            </div>
                            <div class="row">
                                <b-form-group class="titulo col-sm-12 col-md-12 col-lg-12" label="Dados do SIGED:"
                                    label-size="lg">
                                    <hr />
                                </b-form-group>
                                <div class="col-12">
                                    <div class="row">
                                        <b-form-group label="Data Processo:" class="font col-sm-6 col-md-6 col-lg-6">
                                            <b-form-input disabled type="date" v-model="form.dataCadSIGED">
                                            </b-form-input>
                                        </b-form-group>

                                        <b-form-group label="Permanência:" class="font col-sm-6 col-md-6 col-lg-6">
                                            <b-form-input disabled type="text" v-model="form.permanencia">
                                            </b-form-input>
                                        </b-form-group>
                                    </div>
                                    <div class="row">
                                        <b-form-group label="Caixa Atual:" class="font col-sm-6 col-md-6 col-lg-6">
                                            <b-form-input disabled type="text" v-model="form.caixaAtual"></b-form-input>
                                        </b-form-group>

                                        <b-form-group label="Tramitação:" class="font col-sm-6 col-md-6 col-lg-6">
                                            <b-form-input disabled type="text" v-model="form.tramitacao"></b-form-input>
                                        </b-form-group>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </b-form>
            </div>

    </div>
</template>

<script lang="ts">
import Vue from "vue";
import HeaderPage from '@/components/HeaderPage.vue';
import { mask } from "vue-the-mask";
import Notifications from "@/components/Notifications.vue";
import { BIconSearch, BIconPlusCircle, BIconInfoCircle, BIconJournalPlus } from 'bootstrap-vue'


export default Vue.extend({
    directives: { mask },
    data() {
        return {
            show: false as boolean,
            exibirMaisDetalhes: false as boolean,
            exibirRegistroPrazo: false as boolean,
            exibirRegistroSIGED: false as boolean,
            form: {
                nProcedimento: "" as string,
                nExpediente: "" as string,
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
        BIconJournalPlus,
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
