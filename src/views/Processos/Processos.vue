<template>
  <div>
    <b-container fluid>
      <div class="row">
        <b-form-group class="titulo m-0" label="Consulta de Processos" label-size="lg">
          <hr />
        </b-form-group>

        <!-- FORMULÁRIO DE CONSULTA DO PROCESSO -->
        <b-form>
          <!-- 1ª LINHA (3 CAIXAS + ÍCONE) -->
          <div class="row">
            <!-- 1ª LINHA (3 CAIXAS) -->
            <div class="col-10">
              <div class="row">
                <b-form-group label="Nº Processo:" append="m" class="font col-sm-3 col-md-3 col-lg-3">
                  <b-form-input size="md" type="text" v-model="form.nProcesso" v-mask="'######/####-##'"></b-form-input>
                </b-form-group>

                <b-form-group label="Assunto:" append="m" class="font col-sm-5 col-md-5 col-lg-5">
                  <b-form-input size="md" type="text" v-model="form.assunto" v-mask=""></b-form-input>
                </b-form-group>

                <b-form-group label="Caixa SIGED:" append="m" class="font col-sm-4 col-md-4 col-lg-4">
                  <b-form-input size="md" type="text" v-model="form.caixaSIGED" v-mask=""></b-form-input>
                </b-form-group>
              </div>
            </div>
            <!-- ÍCONE DA LUPA -->
            <div class="col-2 justify-content-center">
              <b-form-group label="Consultar" class="font text-white">
                <div class="h2" type="button" style="color: gray;" @click="submit">
                  <b-icon-search v-b-tooltip.hover.topleft="'Consultar'"></b-icon-search>
                </div>
              </b-form-group>
            </div>
          </div>

          <!-- 2ª LINHA (2 BOTÕES) -->
          <div class="row" align-h="between">
            <div class="col-6">
              <b-form-checkbox switch class="font">
                Consultar Nº de Processo Externo
              </b-form-checkbox>
            </div>
            <div class="col-6">
              <b-form-checkbox v-model="form.maisDetalhes" @change="exibeMaisDetalhes()" switch class="font text-end">
                + Filtros
              </b-form-checkbox>
            </div>
          </div>

          <!-- 3ª LINHA (CAMPOS OCULTOS) -->
          <div class="row">
            <div class="col-12">
              <div class="row">
                <b-form-group label="Tipo do Processo:" append="m" class="font col-sm-3 col-md-3 col-lg-3"
                  v-show="exibirMaisDetalhes">
                  <b-form-input size="md" type="text" v-model="form.tipoProcesso" v-mask=""></b-form-input>
                </b-form-group>

                <b-form-group label="Status:" append="m" class="font col-sm-3 col-md-3 col-lg-3"
                  v-show="exibirMaisDetalhes">
                  <b-form-input size="md" type="text" v-model="form.status" v-mask=""></b-form-input>
                </b-form-group>

                <b-form-group label="Órgão Demandante:" append="m" class="font col-sm-3 col-md-3 col-lg-3"
                  v-show="exibirMaisDetalhes">
                  <b-form-input size="md" type="text" v-model="form.orgaoDemandante" v-mask=""></b-form-input>
                </b-form-group>

                <b-form-group label="Classificação:" append="m" class="font col-sm-3 col-md-3 col-lg-3"
                  v-show="exibirMaisDetalhes">
                  <b-form-input size="md" type="text" v-model="form.classificacao" v-mask=""></b-form-input>
                </b-form-group>
              </div>
            </div>
          </div>
        </b-form>

        <!-- CARD DA TABELA DO PROCESSO -->
        <div class="card p-0 m-0">
          <!-- CABEÇALHO DA TABELA (Espaço reservado para incluir ícones) -->
          <div class="card-header" align="right">
            <div class="row">
                <!-- ÍCONE Journal-text -->
                <div class="col-1 text-blue h2 p0m0" align="center" label="Processos Cadastrados">
                  <b-icon-journal-text>
                  </b-icon-journal-text>
                </div>
              <!-- TÍTULO -->
              <div class="col-10 mt-1" align="start">
                <div class="row position-relative">
                  <h5>Processos Cadastrados</h5>
                </div>
              </div>
              <!-- ÍCONE Plus-Circle -->
              <div class="col-1 position-relative" align="center"> 
                <b-form-group label="" class="btn text-primary position-absolute top-50 start-50 translate-middle">
                  <div class="h3">
                    <b-icon-plus-circle v-b-modal.modal-cadastro-processo v-b-tooltip.hover.topleft="'Adicionar Processo'"></b-icon-plus-circle>
                  </div>
                </b-form-group>
              </div>
            </div>
          </div>
          <!-- TABELA -->
          <div>
            <b-table-lite small striped hover responsive class="m-0" head-variant="dark" :current-page="currentPage"
              :per-page="perPage" :sticky-header="stickyHeader" :no-border-collapse="noCollapse" :items="items"
              :fields="fields">

              <template v-slot:cell(statusProcesso)="data">
                <b-badge :variant="colorStatusProcesso(data.item.statusProcesso)">{{data.item.statusProcesso}}</b-badge>
              </template>

              <template v-slot:cell(diasRestantes)="data">
                <b-badge :variant="colorDiasRestantes(data.item.diasRestantes)">
                   {{data.item.diasRestantes}} dias <br>({{statusDiasRestantes(data.item.diasRestantes)}})
                </b-badge>
              </template>

              <template v-slot:cell(qtdReiteracao)="data">  
                  <b-badge variant="light">{{data.item.qtdReiteracao}} </b-badge>             
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
                  <b-list-group-item block v-b-modal.modal-detalhes-processo class="btn-light btn-outline-dark m-0 p-1">
                    Detalhar
                  </b-list-group-item>
                  <b-list-group-item block v-b-modal.modal-tramitacoes-processo class="btn-light btn-outline-dark m-0 p-1">
                    Tramitações
                  </b-list-group-item>
                  <b-list-group-item block v-b-modal.modal-reiterar-processo class="btn-light btn-outline-dark m-0 p-1">
                    Reiterar
                  </b-list-group-item>
                  <b-list-group-item block v-b-modal.modal-duplicar-processo class="btn-light btn-outline-dark m-0 p-1">
                    Duplicar
                  </b-list-group-item>
                  <b-list-group-item block class="btn-light text-dark btn-outline-success m-0 p-1">
                    Arquivar
                  </b-list-group-item>
                  <b-list-group-item block class="btn-light text-dark btn-outline-danger m-0 p-1">
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
              <b-pagination pills align="right" size="sm" v-model="currentPage" :total-rows="rows" :per-page="perPage">
              </b-pagination>
            </div>
          </div>
        </div>

        <!-- MODAL -->
        <!-- CADASTRO DO PROCESSO -->
        <b-modal id="modal-cadastro-processo" size="lg" centered title="Cadastro do Processo">
          <ModalCadastroProcesso>
          </ModalCadastroProcesso>
        </b-modal>
        <!-- DETALHES DO PROCESSO -->
        <b-modal id="modal-detalhes-processo" size="lg" centered title="Detalhes do Processo" hide-footer>
          <ModalDetalhesProcesso>
          </ModalDetalhesProcesso>
        </b-modal>
        <!-- TRAMITAÇÕES DO PROCESSO -->
        <b-modal id="modal-tramitacoes-processo" size="lg" centered title="Tramitações do Processo">
          <ModalTramitacoesProcesso>
          </ModalTramitacoesProcesso>
        </b-modal>
        <!-- REITERAR PROCESSO -->
        <b-modal id="modal-reiterar-processo" size="lg" centered title="Reiterar Processo">
          <ModalReiterarProcesso>
          </ModalReiterarProcesso>
        </b-modal>
        <!-- DUPLICAR PROCESSO -->
        <b-modal id="modal-duplicar-processo" size="lg" centered title="Duplicar Processo">
          <ModalDuplicarProcesso>
          </ModalDuplicarProcesso>
        </b-modal>
        <!-- //modal -->

      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import HeaderPage from '@/components/HeaderPage.vue';
import ModalTramitacoesProcesso from './Modais/ModalTramitacoesProcesso.vue';
import ModalCadastroProcesso from './Modais/ModalCadastroProcesso.vue';
import ModalDetalhesProcesso from './Modais/ModalDetalhesProcesso.vue';
import ModalReiterarProcesso from './Modais/ModalReiterarProcesso.vue';
import ModalDuplicarProcesso from './Modais/ModalDuplicarProcesso.vue';
import { mask } from "vue-the-mask";
import Notifications from "@/components/Notifications.vue";
import { Notificacao } from "@/type/notificacao";
import { GrauParentescoSeeder } from "@/type/parentesco";
import { mapActions } from 'vuex';
import { BIconSearch, BIconPlusCircle, BIconInfoCircle, BIconJournalText } from 'bootstrap-vue'


export default Vue.extend({
  directives: { mask },
  data() {
    return {
      rows: 100,
      currentPage: 1,
      stickyHeader: true,
      noCollapse: true,
      show: false as boolean,
      exibirMaisDetalhes: false as boolean,
      exibirRegistroPrazo: false as boolean,
      exibirRegistroSIGED: false as boolean,
      totalRows: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      form: {
        nProcesso: "" as string,
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
          key: 'botaoAction',
          label: 'Ações',
          sortable: false,
        },
        {
          key: 'nProcessoExterno',
          label: 'Nº Externo',
          sortable: true
        },
        {
          key: 'nProcessoSIGED',
          label: 'Nº SIGED',
          sortable: true
        },
       /* {
          key: 'tipoProcesso',
          label: 'Tipo Processo',
          sortable: true,
        },       
        {
          key: 'assunto',
          label: 'Assunto',
          sortable: true,
        }, */
        {
          key: 'orgaoDemandante',
          label: 'Órgão Demandante',
          sortable: true,
        },
        {
          key: 'classificacao',
          label: 'Classificação',
          sortable: true,
        },
        {
          key: 'caixaSIGED',
          label: 'Caixa SIGED',
          sortable: true,
        },
        {
          key: 'statusProcesso',
          label: 'Status',
          sortable: true,
        },  
        {
          key: 'prazo',
          label: 'Prazo (Dias Úteis)',
          sortable: true,
        },  
        {
          key: 'diasRestantes',
          label: 'Dias Restantes (Corridos)',
          sortable: true,
        }, 
        {
          key: 'qtdReiteracao',
          label: 'Reiteração',
          sortable: true,
        }, 

      ],
      items: [    //DADOS DA TABELA
        { isActive: true, nProcessoExterno: "111111/1111-11", nProcessoSIGED: "111111/1111-11", tipoProcesso: 'Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', prazo: '10', diasRestantes: '4', caixaSIGED: 'JURÍDICO', qtdReiteracao: '1' },
        { isActive: true, nProcessoExterno: "222222/2222-22", nProcessoSIGED: "222222/2222-22", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Respondendo', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', prazo: '10', diasRestantes: '3', caixaSIGED: 'RH', qtdReiteracao: '2' },
        { isActive: true, nProcessoExterno: "333333/3333-33", nProcessoSIGED: "333333/3333-33", tipoProcesso: 'ASDF', statusProcesso: 'Arquivado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '2', caixaSIGED: 'DETIN', qtdReiteracao: '5' },
        { isActive: true, nProcessoExterno: "444444/4444-44", nProcessoSIGED: "444444/4444-44", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Distribuído', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '10', caixaSIGED: 'RH', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "555555/5555-55", nProcessoSIGED: "555555/5555-55", tipoProcesso: 'ASDF', statusProcesso: 'Distribuído', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '0', caixaSIGED: 'DETIN', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "666666/6666-66", nProcessoSIGED: "666666/6666-66", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Tramitando', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'RH', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "777777/7777-77", nProcessoSIGED: "777777/7777-77", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '-1', caixaSIGED: 'DETIN', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "888888/8888-88", nProcessoSIGED: "888888/8888-88", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'RH', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "999999/9999-99", nProcessoSIGED: "999999/9999-99", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '3', caixaSIGED: 'DETIN', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "123456/7890-12", nProcessoSIGED: "123456/7890-12", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '2', caixaSIGED: 'RH', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "154875/8754-87", nProcessoSIGED: "154875/8754-87", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'DETIN', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "789456/2022-01", nProcessoSIGED: "789456/2022-01", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'RH', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "754812/2020-10", nProcessoSIGED: "754812/2020-10", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'DETIN', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "111111/1111-11", nProcessoSIGED: "111111/1111-11", tipoProcesso: 'Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'JURÍDICO', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "222222/2222-22", nProcessoSIGED: "222222/2222-22", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'RH', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "333333/3333-33", nProcessoSIGED: "333333/3333-33", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'DETIN', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "444444/4444-44", nProcessoSIGED: "444444/4444-44", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', prazo: '10', diasRestantes: '4', caixaSIGED: 'RH', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "555555/5555-55", nProcessoSIGED: "555555/5555-55", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'DETIN', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "666666/6666-66", nProcessoSIGED: "666666/6666-66", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'RH', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "777777/7777-77", nProcessoSIGED: "777777/7777-77", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'DETIN', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "888888/8888-88", nProcessoSIGED: "888888/8888-88", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'RH', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "999999/9999-99", nProcessoSIGED: "999999/9999-99", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'DETIN', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "123456/7890-12", nProcessoSIGED: "123456/7890-12", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'RH', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "154875/8754-87", nProcessoSIGED: "154875/8754-87", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'DETIN', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "789456/2022-01", nProcessoSIGED: "789456/2022-01", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'RH', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "754812/2020-10", nProcessoSIGED: "754812/2020-10", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'DETIN', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "111111/1111-11", nProcessoSIGED: "111111/1111-11", tipoProcesso: 'Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'JURÍDICO', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "222222/2222-22", nProcessoSIGED: "222222/2222-22", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'RH', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "333333/3333-33", nProcessoSIGED: "333333/3333-33", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', prazo: '10', diasRestantes: '4', caixaSIGED: 'DETIN', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "444444/4444-44", nProcessoSIGED: "444444/4444-44", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', prazo: '10', diasRestantes: '4', caixaSIGED: 'RH', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "555555/5555-55", nProcessoSIGED: "555555/5555-55", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'DETIN', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "666666/6666-66", nProcessoSIGED: "666666/6666-66", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'RH', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "777777/7777-77", nProcessoSIGED: "777777/7777-77", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', prazo: '10', diasRestantes: '4', caixaSIGED: 'DETIN', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "888888/8888-88", nProcessoSIGED: "888888/8888-88", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'RH', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "999999/9999-99", nProcessoSIGED: "999999/9999-99", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'DETIN', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "123456/7890-12", nProcessoSIGED: "123456/7890-12", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'RH', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "154875/8754-87", nProcessoSIGED: "154875/8754-87", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', prazo: '10', diasRestantes: '4', caixaSIGED: 'DETIN', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "789456/2022-01", nProcessoSIGED: "789456/2022-01", tipoProcesso: 'Extra-Judicial', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', prazo: '10', diasRestantes: '4', caixaSIGED: 'RH', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "754812/2020-10", nProcessoSIGED: "754812/2020-10", tipoProcesso: 'ASDF', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', prazo: '10', diasRestantes: '4', caixaSIGED: 'DETIN', qtdReiteracao: '0' },
        { isActive: true, nProcessoExterno: "017101/2019-20", nProcessoSIGED: "017101/2019-20", tipoProcesso: 'zxcv', statusProcesso: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado',  prazo: '10', diasRestantes: '4', caixaSIGED: 'COMPRAS', qtdReiteracao: '0' }
      ]
    };
  },
  mounted() {
    this.totalRows = this.items.length
  },
  methods: {
    submit() {
      alert("enviar");
    },
    //dias corridos
    colorDiasRestantes(prazo: any) : any {

            if(prazo < 0) {
              return "dark"
            }

            if(prazo >= 0 && prazo <= 3) {
              return "danger"
            }

            if(prazo >= 4 && prazo <= 5 ) {
              return "warning"
            }

            if(prazo >= 6) {
              return "success"
            }
  
            return ""
            
    },
    statusDiasRestantes(prazo: any) : any {

            if(prazo < 0) {
              return "Expirado"
            }

            if(prazo >= 0 && prazo <= 3) {
              return "A Expirar"
            }

            if(prazo >= 4 && prazo <= 5 ) {
              return "Próximo a expirar"
            }

            if(prazo >= 6) {
              return "Dentro do Prazo"
            }
  
            return ""
            
    },
    colorStatusProcesso(status: string) : any {

          switch(status){
                case "Tramitando": return "warning"; break;
                case "Distribuído": return "info"; break;
                case "Arquivado": return "dark"; break;
                case "Respondendo": return "primary"; break;
                default: ""; break;
          }        
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
    ModalTramitacoesProcesso,
    ModalCadastroProcesso,
    ModalDetalhesProcesso,
    ModalReiterarProcesso,
    ModalDuplicarProcesso,
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
