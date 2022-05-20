<template>
  <div>
    <header-page :titulo="'Processos'" :descricao="'Cadastro, Consulta, Edição'" />
    <b-container>
      <div class="row">

        <b-form-group class="titulo" label="Consulta de Processos" label-size="lg">
          <hr />
        </b-form-group>

    <b-form>  <!-- FORMULÁRIO DE CONSULTA DO PROCESSO -->
      <div class="row"> <!-- 1ª LINHA (3 CAIXAS + ÍCONE) -->
        <div class="col-10"> <!-- 1ª LINHA (3 CAIXAS) -->
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
        <div class="col-2"> <!-- ÍCONE DA LUPA -->
          <div class="justify-content-center">
            <br/>
              <b-icon-search  @click="submit" type="button" font-scale="2.5"></b-icon-search>
          </div>
        </div>
      </div>

      <div class="row" align-h="between"> <!-- 2ª LINHA (2 BOTÕES) -->
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

      <div class="row"> <!-- 3ª LINHA (CAMPOS OCULTOS) -->
        <div class="col-12">
          <div class="row">
            <b-form-group label="Tipo do Processo:" append="m" class="font col-sm-3 col-md-3 col-lg-3" v-show="exibirMaisDetalhes">
              <b-form-input size="md" type="text" v-model="form.tipoProcesso" v-mask=""></b-form-input>
            </b-form-group>

            <b-form-group label="Status:" append="m" class="font col-sm-3 col-md-3 col-lg-3" v-show="exibirMaisDetalhes">
              <b-form-input size="md" type="text" v-model="form.status" v-mask=""></b-form-input>
            </b-form-group>

            <b-form-group label="Órgão Demandante:" append="m" class="font col-sm-3 col-md-3 col-lg-3" v-show="exibirMaisDetalhes">
              <b-form-input size="md" type="text" v-model="form.orgaoDemandante" v-mask=""></b-form-input>
            </b-form-group>

            <b-form-group label="Classificação:" append="m" class="font col-sm-3 col-md-3 col-lg-3" v-show="exibirMaisDetalhes">
              <b-form-input size="md" type="text" v-model="form.classificacao" v-mask=""></b-form-input>
            </b-form-group>
          </div>
        </div>
      </div>
    </b-form>

        <b-form-group class="titulo" label="Processos Cadastrados" label-size="lg">
          <hr />
        </b-form-group>

    <div class="card"> <!-- CARD DA TABELA DO PROCESSO -->
      <div class="card-header" align="right"> <!-- CABEÇALHO DA TABELA (Espaço reservado para incluir ícones -->
            <b-button v-b-modal.modal-cadastro-processo  @click="show=true" class="mr-3" type="submit" variant="primary">Cadastrar</b-button>
      </div>
      <div> <!-- TABELA -->
        <b-table small striped hover responsive sticky-header head-variant="dark" type="table" :items="items" :fields="fields"></b-table>
      </div>
    </div>
<hr />
        <!-- MODAL -->
        <b-modal id="modal-cadastro-processo" size="lg" centered title="Cadastro de Processo">
          <div class="card"><!-- TELA DE CADASTRO -->
            <div class="col-12">
              <b-form>
                <notifications :notifications="this.Notificacao"></notifications>
                <b-form-group class="titulo" label="Informações de entrada do processo" label-size="lg">
                  <hr/>
                </b-form-group>

                <div class="row">
                  <b-form-group label="Nº Processo:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-input type="text" v-model="form.nProcesso"></b-form-input>
                  </b-form-group>

                  <b-form-group label="Tipo do Processo:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-select v-model="form.tipoProcesso">
                      <b-form-select-option value="null">-- Selecione --</b-form-select-option>
                      <b-form-select-option value="administrativo">Administrativo</b-form-select-option>
                      <b-form-select-option value="extraJudicial">Extra-Judicial</b-form-select-option>
                      <b-form-select-option value="judicial">Judicial</b-form-select-option>
                      <b-form-select-option value="orgaoControle">Órgãos de Controle</b-form-select-option>
                    </b-form-select>
                  </b-form-group>

                  <b-form-group label="Monitora Prazo:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-select v-model="form.monitoraPrazo" @change="exibirCampoPrazo()">
                      <b-form-select-option value="null">-- Selecione --</b-form-select-option>
                      <b-form-select-option value="sim">Sim</b-form-select-option>
                      <b-form-select-option value="nao">Não</b-form-select-option>
                    </b-form-select>
                  </b-form-group>

                  <b-form-group label="Prazo total:" class="font col-sm-3 col-md-3 col-lg-3" v-show="exibirRegistroPrazo">
                    <b-form-input type="text" v-model="form.qtdDiasPrazo" required></b-form-input>
                  </b-form-group>
                </div>

                <div class="row">
                  <b-form-group label="Órgão Demandante:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-select size="sm" v-model="form.orgaoDemandante">
                      <b-form-select-option value="null">-- Selecione --</b-form-select-option>
                      <b-form-select-option value="ministerioPublico">Ministerio Publico</b-form-select-option>
                      <b-form-select-option value="tribunalContas">Tribunal de Contas</b-form-select-option>
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
                  <div class="col-8">
                    <div class="row">
                      <b-form-group label="Objeto:" class="font col-sm-12 col-md-12 col-lg-12">
                        <b-form-textarea rows="2" max-rows="2" v-model="form.objeto"></b-form-textarea>
                      </b-form-group>
                    </div>
                    <div class="row">
                      <b-form-group label="Advogado Responsável:" class="font col-sm-12 col-md-12 col-lg-12">
                        <b-form-input type="text" v-model="form.advogadoResponsavel" required></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="row">
                      <b-form-group label="Observação:" class="font col-sm-12 col-md-12 col-lg-12">
                        <b-form-textarea rows="4" max-rows="4" v-model="form.observacao"></b-form-textarea>
                      </b-form-group>
                    </div>

    <!--
                    <div class="py-2">
                      <b-button class="mr-2" variant="secondary" @click="voltar()">Voltar</b-button>
                      <b-button type="button" variant="success" @click="submit">Salvar</b-button>
                    </div>
    -->
                  </div>

    <!--
                      <b-form-group label="Requer SIGED?" class="font col-sm-12 col-md-12 col-lg-12">
                        <b-form-select v-model="form.requerSIGED" @change="exibirCampoSIGED()">
                          <b-form-select-option value="null">-- Selecione --</b-form-select-option>
                          <b-form-select-option value="sim">Sim</b-form-select-option>
                          <b-form-select-option value="nao">Não</b-form-select-option>
                        </b-form-select>
                      </b-form-group>
    -->

                  <div class="col-4">
                    <div class="row">
                      <b-form-checkbox v-model="form.requerSIGED" @change="exibirCampoSIGED()" switch class="font col-sm-2 col-md-2 col-lg-2">Requer SIGED
                      </b-form-checkbox>

                      <b-form-group label="Nº SIGED" class="ml-4 font col-sm-9 col-md-9 col-lg-9" v-show="exibirRegistroSIGED">
                        <b-form-input type="text" v-model="form.nSIGED" required></b-form-input>
                      </b-form-group>
                    </div>
                    <div class="row">
                      <b-form-group class="titulo col-sm-12 col-md-12 col-lg-12" label="Dados do SIGED:" label-size="lg">
                        <hr/>
                      </b-form-group>
                      <div class="col-12">
                        <div class="row">
                          <b-form-group label="Data Cad. SIGED:" class="font col-sm-6 col-md-6 col-lg-6">
                            <b-form-input :placeholder="'12/05/2020'" type="date" v-model="form.dataCadSIGED"></b-form-input>
                          </b-form-group>

                          <b-form-group label="Permanência:" class="font col-sm-6 col-md-6 col-lg-6">
                            <b-form-input :placeholder="'57'" type="text" v-model="form.permanencia"></b-form-input>
                          </b-form-group>
                        </div>
                        <div class="row">
                          <b-form-group label="Caixa Atual:" class="font col-sm-6 col-md-6 col-lg-6">
                            <b-form-input :placeholder="'Jurídico'" type="text" v-model="form.caixaAtual"></b-form-input>
                          </b-form-group>

                          <b-form-group label="Tramitação:" class="font col-sm-6 col-md-6 col-lg-6">
                            <b-form-input :placeholder="'Em andamento'" type="text" v-model="form.tramitacao"></b-form-input>
                          </b-form-group>
                        </div>
      <!--
                        <div class="row">
                            <b-button type="button" variant="info" @click="modalDetalhes">Detalhes</b-button>
                        </div>
      -->
                      </div>
                    </div>
                  </div>
                </div>
              </b-form>
            </div>
          </div>

          <template #modal-footer> <!-- MODAL FOOTER -->
            <div class="py-2"> <!-- BOTÕES  -->
              <b-button class="mr-2" variant="secondary" @click="show=false">Voltar</b-button>
              <b-button type="submit" variant="success">Salvar</b-button>
            </div>
          </template>
        </b-modal>
        <!-- //modal -->

      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import HeaderPage from '@/components/HeaderPage.vue'
import { mask } from "vue-the-mask";
import Notifications from "@/components/Notifications.vue";
import { Notificacao } from "@/type/notificacao";
import { GrauParentescoSeeder } from "@/type/parentesco";
import { mapActions } from 'vuex'
import { BIconSearch} from 'bootstrap-vue'


export default Vue.extend({
  directives: { mask },
  data() {
    return {
      show: false as boolean,
      form: {
        nProcesso: "" as string,
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
        advogadoResponsavel: "" as string,
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
      exibirMaisDetalhes: false as boolean,
      exibirRegistroPrazo: false as boolean,
      exibirRegistroSIGED: false as boolean,
      fields: [   //NOMES DAS COLUNAS
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
          {
            key: 'tipoProcesso',
            label: 'Tipo Processo',
            sortable: true,
          },
          {
            key: 'status',
            label: 'Status',
            sortable: true,
          },
          {
            key: 'assunto',
            label: 'Assunto',
            sortable: true,
          },
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
        ],
        items: [    //DADOS DA TABELA
          { isActive: true, nProcessoExterno: "111111/1111-11", nProcessoSIGED: "111111/1111-11", tipoProcesso: 'Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'JURÍDICO' },
          { isActive: true, nProcessoExterno: "222222/2222-22", nProcessoSIGED: "222222/2222-22", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "333333/3333-33", nProcessoSIGED: "333333/3333-33", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "444444/4444-44", nProcessoSIGED: "444444/4444-44", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "555555/5555-55", nProcessoSIGED: "555555/5555-55", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "666666/6666-66", nProcessoSIGED: "666666/6666-66", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "777777/7777-77", nProcessoSIGED: "777777/7777-77", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "888888/8888-88", nProcessoSIGED: "888888/8888-88", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "999999/9999-99", nProcessoSIGED: "999999/9999-99", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "123456/7890-12", nProcessoSIGED: "123456/7890-12", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "154875/8754-87", nProcessoSIGED: "154875/8754-87", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "789456/2022-01", nProcessoSIGED: "789456/2022-01", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "754812/2020-10", nProcessoSIGED: "754812/2020-10", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "111111/1111-11", nProcessoSIGED: "111111/1111-11", tipoProcesso: 'Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'JURÍDICO' },
          { isActive: true, nProcessoExterno: "222222/2222-22", nProcessoSIGED: "222222/2222-22", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "333333/3333-33", nProcessoSIGED: "333333/3333-33", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "444444/4444-44", nProcessoSIGED: "444444/4444-44", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "555555/5555-55", nProcessoSIGED: "555555/5555-55", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "666666/6666-66", nProcessoSIGED: "666666/6666-66", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "777777/7777-77", nProcessoSIGED: "777777/7777-77", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "888888/8888-88", nProcessoSIGED: "888888/8888-88", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "999999/9999-99", nProcessoSIGED: "999999/9999-99", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "123456/7890-12", nProcessoSIGED: "123456/7890-12", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "154875/8754-87", nProcessoSIGED: "154875/8754-87", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "789456/2022-01", nProcessoSIGED: "789456/2022-01", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "754812/2020-10", nProcessoSIGED: "754812/2020-10", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "111111/1111-11", nProcessoSIGED: "111111/1111-11", tipoProcesso: 'Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'JURÍDICO' },
          { isActive: true, nProcessoExterno: "222222/2222-22", nProcessoSIGED: "222222/2222-22", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "333333/3333-33", nProcessoSIGED: "333333/3333-33", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "444444/4444-44", nProcessoSIGED: "444444/4444-44", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "555555/5555-55", nProcessoSIGED: "555555/5555-55", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "666666/6666-66", nProcessoSIGED: "666666/6666-66", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "777777/7777-77", nProcessoSIGED: "777777/7777-77", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "888888/8888-88", nProcessoSIGED: "888888/8888-88", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "999999/9999-99", nProcessoSIGED: "999999/9999-99", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "123456/7890-12", nProcessoSIGED: "123456/7890-12", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "154875/8754-87", nProcessoSIGED: "154875/8754-87", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "789456/2022-01", nProcessoSIGED: "789456/2022-01", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "754812/2020-10", nProcessoSIGED: "754812/2020-10", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "017101/2019-20", nProcessoSIGED: "017101/2019-20", tipoProcesso: 'zxcv', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'COMPRAS' }
      ]
    };
  },
  mounted() { },
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
    Notifications,
  }
});
</script>

<style scope>
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
