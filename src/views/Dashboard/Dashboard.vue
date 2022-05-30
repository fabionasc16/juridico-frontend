<template>
    <b-container fluid>
        <!-- CABEÇALHO -->
        <div class="row">
            <!-- TÍTULO -->
            <div class="col">
                <b-form-group class="titulo m-0" label="Acompanhamento de Processos" label-size="lg"></b-form-group>
            </div>
            <!-- DATA HORA -->
            <div class="col-3">
                <button v-b-tooltip.hover.bottom title="Atualizar Dashboard">
                    <div align="center">
                        <b-icon-watch> </b-icon-watch>
                        26/05/2022 - 13:26
                    </div>
                </button>
            </div>
            <hr />
        </div>
        <!-- FILTROS -->
        <div class="row">
            <!-- 1ª LINHA (3 CAIXAS) -->
            <div class="col-10">
                <div class="row">
                    <b-form-group label="Responsável:" class="font col-sm-3 col-md-3 col-lg-3">
                        <b-form-select size="sm">
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
                            <b-form-select-option value="resp.CamilaNogueira">CamilaNogueira</b-form-select-option>
                            <b-form-select-option value="resp.Karol">Karol</b-form-select-option>
                            <b-form-select-option value="resp.Louise">Louise</b-form-select-option>
                            <b-form-select-option value="resp.Sabrina">Sabrina</b-form-select-option>
                        </b-form-select>
                    </b-form-group>

                    <b-form-group label="Órgão Demandante:" class="font col-sm-3 col-md-3 col-lg-3">
                        <b-form-select size="sm">
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
                            <b-form-select-option value="CamaraDepFed">Camara dos Deputados Federais</b-form-select-option>
                            <b-form-select-option value="PolFed">Polícia Federal</b-form-select-option>
                            <b-form-select-option value="ComiteCriseCOVID">Comitê de Crise - COVID 19</b-form-select-option>
                            <b-form-select-option value="CamaraMunManaus">Câmara Municipal de Manaus</b-form-select-option>
                            <b-form-select-option value="ConselhoTutelar">Conselho Tutelar</b-form-select-option>
                        </b-form-select>
                    </b-form-group>

                    <b-form-group label="Prazo" append="m" class="font col-sm-3 col-md-3 col-lg-3">
                        <b-form-select size="sm">
                            <b-form-select-option value="null">-- Selecione --</b-form-select-option>
                            <b-form-select-option class="bg-success text-light" value="Verde">Verde</b-form-select-option>
                            <b-form-select-option class="bg-warning text-light" value="Amarelo">Amarelo</b-form-select-option>
                            <b-form-select-option class="bg-danger text-light" value="Vermelho">Vermelho</b-form-select-option>
                            <b-form-select-option class="bg-dark text-light" value="Preto">Preto</b-form-select-option>
                        </b-form-select>
                    </b-form-group>

                    <b-form-group label="Assunto:" append="m" class="font col-sm-5 col-md-5 col-lg-5">
                        <b-form-input size="md" type="text" v-mask=""></b-form-input>
                    </b-form-group>

                    <b-form-group label="Caixa SIGED:" append="m" class="font col-sm-4 col-md-4 col-lg-4">
                        <b-form-input size="md" type="text" v-mask=""></b-form-input>
                    </b-form-group>
                </div>
            </div>
            <!-- ÍCONE DA LUPA -->
            <div class="col-2">
                <div class="justify-content-center">
                    <b-form-group label="Consultar" class="font text-white">
                        <b-icon-search v-b-tooltip.hover.topleft="'Consultar'" type="button" font-scale="2" style="color: gray;"></b-icon-search>
                    </b-form-group>
                </div>
            </div>
        </div>
        <!-- DASHBOARD -->
        <div class="row">
            <!-- GRÁFICO LINHA -->
            <div class="col-12">
                <div class="card mt-2" type="button" @click="goTo('/graficoLinha')">
                    <div class="card-body" align="center">
                        <div id="app2" style="width: 100%">
                            <GraficoLinha :locationDash="true"></GraficoLinha>
                            <img style="width: 300px" v-if="imgData" :src="imgData" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- GRÁFICO COLUNAS -->
            <div class="col-6">
                <div class="card mt-2" type="button" @click="goTo('/graficoColunas')">
                    <div class="card-body" align="center">
                        <div id="app2" style="width: 90%">
                            <GraficoColunas :locationDash="true"></GraficoColunas>
                            <img style="width: 300px" v-if="imgData" :src="imgData" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- GRÁFICO PIZZA -->
            <div class="col-6">
                <div class="card mt-2" type="button" @click="goTo('/graficoPizza')">
                    <div class="card-body" align="center">
                        <div id="app2" style="width: 90%">
                            <GraficoPizza :locationDash="true"></GraficoPizza>
                            <img style="width: 300px" v-if="imgData" :src="imgData" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- GRÁFICO LINHAS -->
            <div class="col-6">
                <div class="card mt-2" type="button" @click="goTo('/graficoLinhas')">
                    <div class="card-body" align="center">
                        <div id="app2" style="width: 90%">
                            <GraficoLinhas :locationDash="true"></GraficoLinhas>
                            <img style="width: 300px" v-if="imgData" :src="imgData" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- TABELÃO -->
            <div class="col-12">
                <div class="card mt-2" type="button">
                    <div class="card-body" align="center">
                        <div>
                            <b-table-lite small striped hover responsive head-variant="dark"
                                :sticky-header="stickyHeader" :no-border-collapse="noCollapse" :items="items"
                                :fields="fields">
                            </b-table-lite>
                            <img style="width: 300px" v-if="imgData" :src="imgData" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </b-container>
</template>
<script>
import GraficoColunas from "./GraficoColunas";
import GraficoLinha from "./GraficoLinha";
import GraficoLinhas from "./GraficoLinhas";
import GraficoPizza from "./GraficoPizza";
import { BIconWatch, BIconSearch } from 'bootstrap-vue';

export default {
    data() {
        return {
            stickyHeader: true,
            noCollapse: true,
            fields: [ //NOMES DAS COLUNAS
                {
                    key: "nProcessoExterno",
                    label: "Nº Externo",
                    sortable: true,
                },
                {
                    key: "nProcessoSIGED",
                    label: "Nº SIGED",
                    sortable: true,
                },
                {
                    key: "tipoProcesso",
                    label: "Tipo Processo",
                    sortable: true,
                },
                {
                    key: "status",
                    label: "Status",
                    sortable: true,
                },
                {
                    key: "assunto",
                    label: "Assunto",
                    sortable: true,
                },
                {
                    key: "orgaoDemandante",
                    label: "Órgão Demandante",
                    sortable: true,
                },
                {
                    key: "classificacao",
                    label: "Classificação",
                    sortable: true,
                },
                {
                    key: "caixaSIGED",
                    label: "Caixa SIGED",
                    sortable: true,
                },
            ],
            items: [ //DADOS DA TABELA
                {
                    nProcessoExterno: "111111/1111-11",
                    nProcessoSIGED: "111111/1111-11",
                    tipoProcesso: "Judicial",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "JURÍDICO",
                },
                {
                    nProcessoExterno: "222222/2222-22",
                    nProcessoSIGED: "222222/2222-22",
                    tipoProcesso: "Extra-Judicial",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "RH",
                },
                {
                    nProcessoExterno: "333333/3333-33",
                    nProcessoSIGED: "333333/3333-33",
                    tipoProcesso: "ASDF",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "DETIN",
                },
                {
                    nProcessoExterno: "444444/4444-44",
                    nProcessoSIGED: "444444/4444-44",
                    tipoProcesso: "Extra-Judicial",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "RH",
                },
                {
                    nProcessoExterno: "555555/5555-55",
                    nProcessoSIGED: "555555/5555-55",
                    tipoProcesso: "ASDF",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "DETIN",
                },
                {
                    nProcessoExterno: "666666/6666-66",
                    nProcessoSIGED: "666666/6666-66",
                    tipoProcesso: "Extra-Judicial",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "RH",
                },
                {
                    nProcessoExterno: "777777/7777-77",
                    nProcessoSIGED: "777777/7777-77",
                    tipoProcesso: "ASDF",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "DETIN",
                },
                {
                    nProcessoExterno: "888888/8888-88",
                    nProcessoSIGED: "888888/8888-88",
                    tipoProcesso: "Extra-Judicial",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "RH",
                },
                {
                    nProcessoExterno: "999999/9999-99",
                    nProcessoSIGED: "999999/9999-99",
                    tipoProcesso: "ASDF",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "DETIN",
                },
                {
                    nProcessoExterno: "123456/7890-12",
                    nProcessoSIGED: "123456/7890-12",
                    tipoProcesso: "Extra-Judicial",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "RH",
                },
                {
                    nProcessoExterno: "154875/8754-87",
                    nProcessoSIGED: "154875/8754-87",
                    tipoProcesso: "ASDF",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "DETIN",
                },
                {
                    nProcessoExterno: "789456/2022-01",
                    nProcessoSIGED: "789456/2022-01",
                    tipoProcesso: "Extra-Judicial",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "RH",
                },
                {
                    nProcessoExterno: "754812/2020-10",
                    nProcessoSIGED: "754812/2020-10",
                    tipoProcesso: "ASDF",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "DETIN",
                },
                {
                    nProcessoExterno: "111111/1111-11",
                    nProcessoSIGED: "111111/1111-11",
                    tipoProcesso: "Judicial",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "JURÍDICO",
                },
                {
                    nProcessoExterno: "222222/2222-22",
                    nProcessoSIGED: "222222/2222-22",
                    tipoProcesso: "Extra-Judicial",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "RH",
                },
                {
                    nProcessoExterno: "333333/3333-33",
                    nProcessoSIGED: "333333/3333-33",
                    tipoProcesso: "ASDF",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "DETIN",
                },
                {
                    nProcessoExterno: "444444/4444-44",
                    nProcessoSIGED: "444444/4444-44",
                    tipoProcesso: "Extra-Judicial",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "RH",
                },
                {
                    nProcessoExterno: "555555/5555-55",
                    nProcessoSIGED: "555555/5555-55",
                    tipoProcesso: "ASDF",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "DETIN",
                },
                {
                    nProcessoExterno: "666666/6666-66",
                    nProcessoSIGED: "666666/6666-66",
                    tipoProcesso: "Extra-Judicial",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "RH",
                },
                {
                    nProcessoExterno: "777777/7777-77",
                    nProcessoSIGED: "777777/7777-77",
                    tipoProcesso: "ASDF",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "DETIN",
                },
                {
                    nProcessoExterno: "888888/8888-88",
                    nProcessoSIGED: "888888/8888-88",
                    tipoProcesso: "Extra-Judicial",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "RH",
                },
                {
                    nProcessoExterno: "999999/9999-99",
                    nProcessoSIGED: "999999/9999-99",
                    tipoProcesso: "ASDF",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "DETIN",
                },
                {
                    nProcessoExterno: "123456/7890-12",
                    nProcessoSIGED: "123456/7890-12",
                    tipoProcesso: "Extra-Judicial",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "RH",
                },
                {
                    nProcessoExterno: "154875/8754-87",
                    nProcessoSIGED: "154875/8754-87",
                    tipoProcesso: "ASDF",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "DETIN",
                },
                {
                    nProcessoExterno: "789456/2022-01",
                    nProcessoSIGED: "789456/2022-01",
                    tipoProcesso: "Extra-Judicial",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "RH",
                },
                {
                    nProcessoExterno: "754812/2020-10",
                    nProcessoSIGED: "754812/2020-10",
                    tipoProcesso: "ASDF",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "DETIN",
                },
                {
                    nProcessoExterno: "111111/1111-11",
                    nProcessoSIGED: "111111/1111-11",
                    tipoProcesso: "Judicial",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "JURÍDICO",
                },
                {
                    nProcessoExterno: "222222/2222-22",
                    nProcessoSIGED: "222222/2222-22",
                    tipoProcesso: "Extra-Judicial",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "RH",
                },
                {
                    nProcessoExterno: "333333/3333-33",
                    nProcessoSIGED: "333333/3333-33",
                    tipoProcesso: "ASDF",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "DETIN",
                },
                {
                    nProcessoExterno: "444444/4444-44",
                    nProcessoSIGED: "444444/4444-44",
                    tipoProcesso: "Extra-Judicial",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "RH",
                },
                {
                    nProcessoExterno: "555555/5555-55",
                    nProcessoSIGED: "555555/5555-55",
                    tipoProcesso: "ASDF",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "DETIN",
                },
                {
                    nProcessoExterno: "666666/6666-66",
                    nProcessoSIGED: "666666/6666-66",
                    tipoProcesso: "Extra-Judicial",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "RH",
                },
                {
                    nProcessoExterno: "777777/7777-77",
                    nProcessoSIGED: "777777/7777-77",
                    tipoProcesso: "ASDF",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "DETIN",
                },
                {
                    nProcessoExterno: "888888/8888-88",
                    nProcessoSIGED: "888888/8888-88",
                    tipoProcesso: "Extra-Judicial",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "RH",
                },
                {
                    nProcessoExterno: "999999/9999-99",
                    nProcessoSIGED: "999999/9999-99",
                    tipoProcesso: "ASDF",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "DETIN",
                },
                {
                    nProcessoExterno: "123456/7890-12",
                    nProcessoSIGED: "123456/7890-12",
                    tipoProcesso: "Extra-Judicial",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "RH",
                },
                {
                    nProcessoExterno: "154875/8754-87",
                    nProcessoSIGED: "154875/8754-87",
                    tipoProcesso: "ASDF",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "DETIN",
                },
                {
                    nProcessoExterno: "789456/2022-01",
                    nProcessoSIGED: "789456/2022-01",
                    tipoProcesso: "Extra-Judicial",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "RH",
                },
                {
                    nProcessoExterno: "754812/2020-10",
                    nProcessoSIGED: "754812/2020-10",
                    tipoProcesso: "ASDF",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "DETIN",
                },
                {
                    nProcessoExterno: "017101/2019-20",
                    nProcessoSIGED: "017101/2019-20",
                    tipoProcesso: "zxcv",
                    status: "Cadastrado",
                    assunto: "Processo",
                    orgaoDemandante: "Ministério Público",
                    classificacao: "Classificado",
                    caixaSIGED: "COMPRAS",
                },
            ],
        };
    },
    components: {
        GraficoColunas,
        GraficoLinha,
        GraficoLinhas,
        GraficoPizza,
        BIconWatch,
        BIconSearch,
    },
    methods: {
        goTo(caminho) {
            this.$router.push(caminho);
        },
    },
};
</script>
