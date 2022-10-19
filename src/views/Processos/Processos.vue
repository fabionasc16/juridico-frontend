<template>
  <div>
    <b-container fluid>
      <div class="row">
        <b-form-group class="titulo m-0" label="Consulta de Processos" label-size="lg">
          <hr />
        </b-form-group>

         <!-- NOTIFICAÇÕES -->       
         <notifications :notifications="Notificacao"></notifications>      

        <div v-if="alert">
            <ReturnMessage :message="Message" :fechaAlert="fechaAlert"></ReturnMessage>
        </div>          

        <div v-if="loading">
            <LoadingSpinner></LoadingSpinner>
        </div>


        <!-- FORMULÁRIO DE CONSULTA DO PROCESSO -->
        <b-form  @submit.prevent="submit">
          <!-- 1ª LINHA (3 CAIXAS + ÍCONE) -->
          <div class="row">
            <!-- 1ª LINHA (3 CAIXAS) -->
            <div class="col-10">
              <div class="row">            

                <b-form-group append="m" class="font col-sm-3 col-md-3 col-lg-3">
                   
                  <b-form-checkbox switch class="font" v-model="checkedProcessoSiged" @change="alterarProced">                      
                    <label v-if="checkedProcessoSiged">Nº Procedimento:</label> 
                    <label v-else>Nº SIGED:</label>                       
                  </b-form-checkbox>                            

                  <b-form-input v-if="checkedProcessoSiged" size="md" type="text" v-model="form.numProcedimento" autofocus></b-form-input>
                  <b-form-input v-else size="md" type="text" v-model="form.numProcessoSIGED" v-mask="'######/####-##'" autofocus></b-form-input>
                </b-form-group>

                <b-form-group label="Assunto:" append="m" class="font col-sm-5 col-md-5 col-lg-5">
                  <v-select style="font-size: 0.85rem" :options="optionsAssunto" 
                                class="font" 
                                label="desc_assunto"
                                value="id_assunto"    
                                placeholder="--Selecione--"      
                                v-model="assuntoSelecionado"/>                                          
                </b-form-group>

                <b-form-group label="Caixa SIGED:" append="m" class="font col-sm-4 col-md-4 col-lg-4">
                  <v-select style="font-size: 0.85rem" :options="optionsCaixa" class="font" label="texto"
                                        v-model="caixaSigedSelecionada"/>
                  <!--<b-form-input size="md" type="text" v-model="form.caixaSIGED" v-mask=""></b-form-input>-->                 
                </b-form-group>
              </div>
            </div>
            <!-- ÍCONE DA LUPA -->
            <div class="col-2 justify-content-center">
              <b-form-group label="Consultar" class="font text-white">
  
                <b-button class="h2" type="submit">
                  <b-icon-search v-b-tooltip.hover.topleft="'Consultar'"></b-icon-search>
                </b-button>

                <!--<div class="h2" type="button" style="color: gray;" @click="submit">
                    <b-icon-search v-b-tooltip.hover.topleft="'Consultar'"></b-icon-search>
                </div>-->
              </b-form-group>
            </div>
          </div>

          <!-- 2ª LINHA (2 BOTÕES) -->
          <div class="row" align-h="between">
            <!--<div class="col-6">
              <b-form-checkbox switch class="font">
                Consultar Nº de Processo Externo
              </b-form-checkbox>
            </div>-->
            <div class="col-11 mb-3">
              <b-form-checkbox v-model="maisDetalhes" @change="exibeMaisDetalhes()" switch class="font text-end">
                + Filtros
              </b-form-checkbox>
            </div>
          </div>

          <!-- 3ª LINHA (CAMPOS OCULTOS) -->
          <div class="row">
            <div class="col-12">
              <div class="row">

                <b-form-group label="Órgão Demandante:" append="m" class="font col-sm-3 col-md-3 col-lg-3"
                  v-show="exibirMaisDetalhes">  
                    <v-select style="font-size: 0.85rem" :options="optionsOrgaoDemandante" 
                                        class="font" 
                                        label="orgao_demandante"
                                        value="id_orgao"    
                                        placeholder="--Selecione--"                                     
                                        v-model="orgaoDemandanteSelecionado"/>         
                </b-form-group>

                <b-form-group label="Tipo do Processo:" append="m" class="font col-sm-3 col-md-3 col-lg-3"
                  v-show="exibirMaisDetalhes"> 
                   <v-select style="font-size: 0.85rem" :options="optionsTipoProcesso" 
                                        class="font" 
                                        label="desc_tipoprocesso"
                                        value="id_tipoprocesso"    
                                        placeholder="--Selecione--"                                     
                                        v-model="tipoProcessoSelecionado"/>  
                </b-form-group>

                <b-form-group label="Status Processo:" append="m" class="font col-sm-3 col-md-3 col-lg-3"
                  v-show="exibirMaisDetalhes">                 
                  <v-select style="font-size: 0.85rem" :options="optionsStatusProcesso" class="font" label="texto"
                                        v-model="statusProcessoSelecionado"/>
                </b-form-group>

                 <b-form-group append="m" class="font col-sm-3 col-md-3 col-lg-3"
                  v-show="exibirMaisDetalhes">  
                  
                   <!-- <b-form-checkbox switch class="font" v-model="checkedExpiraHoje">                                         
                      <label v-if="checkedExpiraHoje">Expira Hoje</label>    
                      <label v-else>Status Prazo:</label>                           
                    </b-form-checkbox> -->

                  <label>Status Prazo:</label>   
                  <v-select v-if="!checkedExpiraHoje" style="font-size: 0.85rem" :options="optionsStatusPrazo" class="font" label="texto"
                                        v-model="statusPrazoSelecionado"/>
                </b-form-group>
                

                <b-form-group label="Classificação:" append="m" class="font col-sm-3 col-md-3 col-lg-3"
                  v-show="exibirMaisDetalhes">
                  <v-select style="font-size: 0.85rem" :options="optionsClassificacao" 
                                        class="font" 
                                        label="desc_classificacao"
                                        value="id_classificacao"    
                                        placeholder="--Selecione--"                                     
                                        v-model="classificacaoSelecionada"/>
                </b-form-group>

                 <b-form-group label="Responsável:" append="m" class="font col-sm-3 col-md-3 col-lg-3"
                  v-show="exibirMaisDetalhes">
                  <v-select style="font-size: 0.85rem" :options="optionsResponsavel" 
                                        class="font" 
                                        label="nome_responsavel"
                                        value="id_responsavel"    
                                        placeholder="--Selecione--"                                     
                                        v-model="responsavelSelecionado"/>
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
            <b-table-lite small striped hover responsive class="m-0 table-responsive" head-variant="dark" 
              :current-page="currentPage"
              :per-page="perPage"  :items="items"
              :fields="fields">

              <template v-slot:cell(statusProcesso)="data">
                <b-badge :variant="colorStatusProcesso(data.item.statusProcesso)">{{data.item.statusProcesso}}</b-badge>            
              </template>

              <template v-slot:cell(diasRestantes)="data">
                <b-badge :variant="colorDiasRestantes(data.item.diasRestantes)">
                   {{data.item.diasRestantes}}
                </b-badge>
              </template>

              <template v-slot:cell(qtdReiteracao)="data">  
                  <b-badge :variant="colorReiteracao(data.item.qtdReiteracao)">{{data.item.qtdReiteracao}}</b-badge>
                  <!--<a href="#" v-b-modal.modal-visualizar-reiteracao>
                     <b-badge :variant="colorReiteracao(data.item.qtdReiteracao)">{{data.item.qtdReiteracao}}</b-badge>
                  </a>-->
              </template>
             
              <!-- BOTÕES DE AÇÕES -->
              <template v-slot:cell(botaoAction)="data">

              

                <!-- BOTÃO DROPDOWN -->
                <b-dropdown variant="dark" class="p0m0" size="sm"  data-toggle="dropdown" >
                  <!-- CONFIG. ICON HAMBURGUER -->
                  <template #button-content>
                    &#x2261;<span class="sr-only"></span>
                  </template>

                  <!-- ITENS DO DROPDOWN -->

                  <!--status diferente de arquivado(14) -->                  
                  <b-list-group-item block class="btn-light btn-outline-dark m-0 p-1"
                  v-if="data.item.status.id_status!='14'" 
                    @click="abrirModal('modal-editar-processo', data.item.id_processo)"
                    @listarProcesso="listarProcesso(currentPage)"
                    >
                    Editar
                  </b-list-group-item>

                  <b-list-group-item block 
                  @click="abrirModal('modal-visualizar-processo', data.item.id_processo)"
                  class="btn-light btn-outline-dark m-0 p-1">
                    Visualizar
                  </b-list-group-item>

                  <!--status diferente de arquivado(14) --> 
                  <b-list-group-item block class="btn-light btn-outline-dark m-0 p-1"
                   v-if="data.item.status.id_status!='14'"  
                    @listarProcesso="listarProcesso(currentPage)"
                    @click="abrirModal('modal-andamento-processo', data.item.id_processo)">
                    Alterar Situação
                  </b-list-group-item>

                  <b-list-group-item block v-b-modal.modal-tramitacoes-processo 
                     @listarProcesso="listarProcesso(currentPage)" class="btn-light btn-outline-dark m-0 p-1">
                    Tramitações
                  </b-list-group-item>  

                  <b-list-group-item block v-b-modal.modal-visualizar-reiteracao 
                     @listarProcesso="listarProcesso(currentPage)" class="btn-light btn-outline-dark m-0 p-1">
                    Reiterações
                  </b-list-group-item>

                  <!--<b-list-group-item block v-b-modal.modal-duplicar-processo 
                     @listarProcesso="listarProcesso(currentPage)" class="btn-light btn-outline-dark m-0 p-1">
                    Duplicar
                  </b-list-group-item>-->
                  
                   <!--status diferente de arquivado(14) --> 
                 <!-- <b-list-group-item block v-b-modal.modal-arquivar-processo 
                     class="btn-light text-dark btn-outline-success m-0 p-1"
                     v-if="data.item.status.id_status!='14'">
                    Arquivar
                  </b-list-group-item>--> 

                  <!--status igual arquivado(14) --> 
                  <b-list-group-item block class="btn-light text-dark btn-outline-danger m-0 p-1"
                        v-if="data.item.status.id_status=='14'" 
                         @listarProcesso="listarProcesso(currentPage)"
                      @click="desarquivar(data.item)">
                    Desarquivar
                  </b-list-group-item>

                  <!--status igual a recebido (10) --> 
                  <b-list-group-item block class="btn-light text-dark btn-outline-danger m-0 p-1"                 
                      @listarProcesso="listarProcesso(currentPage)"
                      v-if="data.item.status.id_status=='10'"
                      @click="excluir(data.item.id_processo, data.item.num_procedimento, data.item.status.id_status)">
                    Excluir {{data.item.desc_status}}
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
              <b-pagination pills align="right" size="sm" v-model="currentPage" 
                @change="listarProcesso"
                :total-rows="totalRows" :per-page="perPage" v-show="totalRows">
              </b-pagination>
            </div>
          </div>
        </div>

        <!-- MODAL -->
        <!-- CADASTRO DO PROCESSO -->
        <b-modal id="modal-cadastro-processo" size="lg" centered title="Cadastro do Processo" hide-footer>       
           <ModalDetalhesProcesso tipo="cadastrar" @listarProcesso="listarProcesso(currentPage)">
              <template v-slot:buttons>
                 <b-button class="bordered" @click="$bvModal.hide('modal-cadastro-processo')">Fechar</b-button>
              </template>
           </ModalDetalhesProcesso>
          
        </b-modal>
        <!-- DETALHES DO PROCESSO -->
        <b-modal id="modal-editar-processo" size="lg" centered :title="titleModal || 'Editar Processo'" hide-footer>
          <ModalDetalhesProcesso tipo="editar" :idProcesso="idProcessoModal"
          @alterarTitulo="alterarTitulo" 
          @listarProcesso="listarProcesso(currentPage)">
            <template v-slot:buttons>
                <b-button class="bordered" @click="$bvModal.hide('modal-editar-processo')">Fechar</b-button>
            </template>
          </ModalDetalhesProcesso>
        </b-modal>

          <b-modal id="modal-visualizar-processo" size="lg" centered title="Visualizar Processo" hide-footer>
          <ModalDetalhesProcesso tipo="visualizar" :idProcesso="idProcessoModal">
            <template v-slot:buttons>
                <b-button class="bordered" @click="$bvModal.hide('modal-visualizar-processo')">Fechar</b-button>
            </template>
          </ModalDetalhesProcesso>
        </b-modal>

        <!-- ANDAMENTO PROCESSO - ALTERAR STATUS -->
        <b-modal id="modal-andamento-processo" centered title="Alterar Situação do Processo" hide-footer>         
            <ModalAndamentoProcesso  @listarProcesso="listarProcesso(currentPage)"
              :idProcesso="idProcessoModal">
            <template v-slot:buttons>
                <b-button class="bordered" @click="$bvModal.hide('modal-andamento-processo')">Fechar</b-button>
            </template>
          </ModalAndamentoProcesso> 
        </b-modal>
            
        
        <!-- TRAMITAÇÕES DO PROCESSO -->
        <b-modal id="modal-tramitacoes-processo" size="lg" centered title="Tramitações do Processo" hide-footer>
          <ModalTramitacoesProcesso >             
          </ModalTramitacoesProcesso>
        </b-modal>
        <!-- REITERAR PROCESSO -->        
        <b-modal id="modal-cadastro-reiteracao" size="lg" centered title="Cadastro - Reiterar Processo" hide-footer>
          <ModalReiteracaoProcesso  @listarProcesso="listarProcesso(currentPage)"> 
            <template v-slot:buttons>
                <b-button class="bordered" @click="$bvModal.hide('modal-cadastro-reiteracao')">Fechar</b-button>
            </template>            
          </ModalReiteracaoProcesso>
        </b-modal>

        <b-modal id="modal-editar-reiteracao" size="lg" centered title="Edição - Reiterar Processo" hide-footer>
          <ModalReiteracaoProcesso  @listarProcesso="listarProcesso(currentPage)"> 
            <template v-slot:buttons>
                <b-button class="bordered" @click="$bvModal.hide('modal-editar-reiteracao')">Fechar</b-button>
            </template>            
          </ModalReiteracaoProcesso>
        </b-modal>

        <b-modal id="modal-visualizar-reiteracao" size="lg" centered title="Reiterações do Processo" hide-footer>
          <ModalVisualizarReiteracao> 
            <template v-slot:buttons>
                <b-button class="bordered" @click="$bvModal.hide('modal-visualizar-reiteracao')">Fechar</b-button>
            </template>            
          </ModalVisualizarReiteracao>
        </b-modal>        

        <!-- ARQUIVAR PROCESSO -->
         <!-- <b-modal id="modal-arquivar-processo" centered title="Arquivar Processo" hide-footer>         
            <ModalArquivarProcesso @listarProcesso="listarProcesso(currentPage)">
            <template v-slot:buttons>
                <b-button class="bordered" @click="$bvModal.hide('modal-arquivar-processo')">Fechar</b-button>
            </template>
          </ModalArquivarProcesso> 
        </b-modal>-->

        <!-- //modal -->
        <!-- DUPLICAR PROCESSO -->
        <!--<b-modal id="modal-duplicar-processo" size="lg" centered title="Duplicar Processo" hide-footer>
         
            <ModalDetalhesProcesso tipo="duplicar">
            <template v-slot:buttons>
                <b-button class="bordered" @click="$bvModal.hide('modal-duplicar-processo')">Fechar</b-button>
            </template>
          </ModalDetalhesProcesso>
        </b-modal> -->
      
      
      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import HeaderPage from '@/components/HeaderPage.vue';
import ModalTramitacoesProcesso from './Modais/ModalTramitacoesProcesso.vue';
//import ModalArquivarProcesso from './Modais/ModalArquivarProcesso.vue';
import ModalDetalhesProcesso from './Modais/ModalDetalhesProcesso.vue';
import { mask } from "vue-the-mask";
import { Processo } from '@/type/processo';
import { StatusProcessoSeeder } from "@/type/statusProcesso";
import { StatusPrazoSeeder } from "@/type/statusPrazo";
import { CaixaSigedSeeder } from "@/type/caixaSiged";
import { FieldsTableProcesso } from "@/type/tableProcesso";
import ModalReiteracaoProcesso from './Modais/ModalReiteracaoProcesso.vue';
import ModalVisualizarReiteracao from './Modais/ModalVisualizarReiteracao.vue';
import ModalAndamentoProcesso from './Modais/ModalAndamentoProcesso.vue';
import RestApiService from "@/services/rest/service";

import Notifications from "@/components/Notifications.vue";
import { Notificacao } from "@/type/notificacao";
import ReturnMessage from "@/components/ReturnMessage.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default Vue.extend({
  directives: { mask },
  components: {
    HeaderPage,
    ModalTramitacoesProcesso,   
    ModalDetalhesProcesso,
  //ModalArquivarProcesso,
    Notifications,
    ModalReiteracaoProcesso,
    ModalVisualizarReiteracao,
    ModalAndamentoProcesso,
    ReturnMessage,
    LoadingSpinner,
  }, 
  data() {
    return {
      placeholderItem: '--Selecione--',
      titleModal: "" as string,
      idProcessoModal: null as any,     
      rows: 100,
      totalRows: null as any,
      perPage: 10,
      currentPage: 1,
      stickyHeader: true,
      noCollapse: true,
      show: false as boolean,
      exibirMaisDetalhes: false as boolean,
      exibirRegistroPrazo: false as boolean,
      exibirRegistroSIGED: false as boolean,      
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      form: {} as Processo,
      formDesarquivado: {} as Processo,
      checkedProcessoSiged: false as boolean,
      checkedExpiraHoje: false as boolean,
      maisDetalhes: false as boolean,
      fields: FieldsTableProcesso, //nome das colunas da tabela  
      items: [] as Array<String>,
      
      optionsStatusProcesso: StatusProcessoSeeder,
      optionsStatusPrazo: StatusPrazoSeeder,    
      optionsCaixa: CaixaSigedSeeder,  

      optionsOrgaoDemandante: [] as Array<String>,
      optionsTipoProcesso: [] as Array<String>,
      optionsAssunto: [] as Array<String>,
      optionsClassificacao: [] as Array<String>,
      optionsResponsavel: [] as Array<String>,

      Notificacao: [] as Array<Notificacao>,
      Message: [] as Array<Notificacao>,
      loading: false as boolean,
      alert: false as boolean,   

      perPageListagens:30000,

      tipoProcessoSelecionado: {
        desc_tipoprocesso: "-- Selecione --" as string,
        id_tipoprocesso: "" as any,
      },
      statusProcessoSelecionado: {
        texto: "-- Selecione --" as string,
        value: "" as any,
      },
      statusPrazoSelecionado: {
        texto: "-- Selecione --" as string,
        value: "" as string,
      },
      orgaoDemandanteSelecionado: {
        orgao_demandante: "-- Selecione --" as string,
        id_orgao: "" as any,
      },
      classificacaoSelecionada: {     
        id_classificacao: "" as string,
        desc_classificacao: "-- Selecione --" as string,
      },
      responsavelSelecionado: {
        nome_responsavel: "-- Selecione --" as string,
        id_responsavel: "" as string,
      },
      assuntoSelecionado: {
        id_assunto: "" as string,
        desc_assunto: "-- Selecione --" as string,        
      },
      caixaSigedSelecionada: {
        texto: "-- Selecione --" as string,
        value: "" as string,
      },    
    };
  },
    
  mounted() {
    this.listarProcesso(this.currentPage)
    this.carregarResponsavel()
    this.carregarClassificacao()
    this.carregarAssunto()
    this.carregarOrgaosDemandantes()
    this.carregarTipoProcesso()
  },
  methods: {
    alterarTitulo(nome:string):void {
      this.titleModal = nome
    },
    abrirModal(modalname: string, idProcesso: number){
       // this.$refs[modalname]?.show()
       this.titleModal = ''
       this.idProcessoModal = idProcesso            
     
       this.$bvModal.show(modalname)      
    },
    alterarProced(){
     this.form.numProcessoSIGED=""
     this.form.numProcedimento=""
    },
    submit() {
      alert("enviar");

      //pegar o id dos options   
      this.form.idTipoProcesso = this.tipoProcessoSelecionado.id_tipoprocesso
      this.form.statusProcesso = this.statusProcessoSelecionado.value
      this.form.statusPrazo    = this.statusPrazoSelecionado.value
    
      this.form.idOrgaoDemandante = this.orgaoDemandanteSelecionado.id_orgao
      this.form.idClassificacao   = this.classificacaoSelecionada.id_classificacao
      this.form.idResponsavel   = this.responsavelSelecionado.id_responsavel
      this.form.idAssunto       = this.assuntoSelecionado.id_assunto
      this.form.caixaAtualSIGED = this.caixaSigedSelecionada.value
     
      console.log(JSON.stringify(this.form))
    },

    listarProcesso(currentpage: number): void {
      this.loading = true

      RestApiService.get("processos", `?currentPage=${currentpage}`)
        .then((response: any) => {
          console.log("Resp ", response.data)
          this.items = response.data.data
          this.perPage = response.data.perPage
          this.totalRows = response.data.total
        })
        .catch((e) => {
          this.Notificacao.push({
            type: "danger",
            message: "Não foi possível carregar a listagem!"            
          })
          console.log(e)
        })
        .finally(() => {
          this.loading = false
          this.limparNotificacao();
        })
    },

     carregarResponsavel(): void {
      this.loading = true   

        RestApiService.get(
          "responsaveis",
          `?currentPage=1&perPage=${this.perPageListagens}`
        )
        .then((response: any) => {        
          this.optionsResponsavel = response.data.data     
        })
        .catch((e) => {          
          console.log(e)
        })
        .finally(() => {
          this.loading = false
          this.limparNotificacao();
        })
    },

    carregarClassificacao(): void {
      this.loading = true
    
      RestApiService.get(
          "classificacoes",
          `?currentPage=1&perPage=${this.perPageListagens}`
        )
        .then((response: any) => {         
          this.optionsClassificacao = response.data.data
        
        })
        .catch((e) => {         
          console.log(e)
        })
        .finally(() => {
          this.loading = false
          this.limparNotificacao();
        })
    },

    carregarAssunto(): void {
      this.loading = true
     
      RestApiService.get(
          "assuntos",
          `?currentPage=1&perPage=${this.perPageListagens}`
        )
        .then((response: any) => {         
          this.optionsAssunto = response.data.data
        
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          this.loading = false
          this.limparNotificacao();
        })
    },

     carregarOrgaosDemandantes(): void {
      this.loading = true

        RestApiService.get(
          "orgaos-demandantes",
          `?currentPage=1&perPage=${this.perPageListagens}`
        )      
        .then((response: any) => {         
          this.optionsOrgaoDemandante = response.data.data
        
        })
        .catch((e) => {          
          console.log(e)
        })
        .finally(() => {
          this.loading = false
          this.limparNotificacao();
        })
    },

     carregarTipoProcesso(): void {
      this.loading = true

        RestApiService.get(
          "tipos-processo",
          `?currentPage=1&perPage=${this.perPageListagens}`
        )      
        .then((response: any) => {         
          this.optionsTipoProcesso = response.data.data       
        
        })
        .catch((e) => {          
          console.log(e)
        })
        .finally(() => {
          this.loading = false
          this.limparNotificacao();
        })
    },

    limparNotificacao(): void {
      if (this.Notificacao.length > 0) {
        setTimeout(() => {
          this.Notificacao = [];
        }, 3000);
      }
    },

    desarquivar(dadosForm: any): void {     
    
    let message = 'Deseja realmente desarquivar processo Nº ' + dadosForm.num_procedimento + '?'
      
    this.formDesarquivado.idProcesso = dadosForm.id_processo
    this.formDesarquivado.dataArquivamento = ""
    this.formDesarquivado.idStatusProcesso = 12 //Tramitando

    let url = "processos/atualiza-status?idProcesso="+dadosForm.id_processo;
           
    if(confirm(message) && (dadosForm.status.id_status == '14' )) {
    
      RestApiService.patch(url, this.formDesarquivado)   
        .then((response: any) => {
          this.loading = true;          
          this.adicionarAlert(
                  "success",
                  "Processo Desarquivado com sucesso!"
          );     
          this.listarProcesso(this.currentPage)     
        })
        .catch((e) => {
                    this.loading = false;

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
                            "Ocorreu um erro ao desarquivar processo! Contacte o administrador do sistema."
                            );                      
                        }              
                })
          .finally(() => {
            this.loading = false;
          });        
    }
   },


    excluir(id: any, data: any, status: string): void {
    
    let message = 'Deseja realmente excluir processo Nº ' + data + '?'

    //status recebido
    if(confirm(message) && (status == '10')) {
    
      RestApiService.delete("processos", id)
        .then((response: any) => {
          this.loading = true;

          this.adicionarAlert(
                  "success",
                  "Exclusão realizada com sucesso!"
          ); 
          
          this.listarProcesso(this.currentPage)
        })
        .catch((e: Error) => {    
           this.adicionarAlert(
                  "alert",
                  "Ocorreu um erro ao excluir registro!"
          );
        })
        .finally(() => {
          this.loading = false;
        });  
    } 
   },

    colorReiteracao(reiteracao: any) : any {
            if(reiteracao > 0) {
              return 'info'
            }
            
            return "light"            
    },
    //dias corridos
    colorDiasRestantes(prazo: any) : any {

            if(prazo < 0) {
              return "dark" 
            }

            if(prazo >= 0 && prazo < 4) {
              return "danger" //desc_status = atenção
            }

            if(prazo >= 4 && prazo < 6 ) {
              return "warning" //desc_status = atenção
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
              return "Crítico"
            }

            if(prazo >= 4 && prazo <= 5 ) {
              return "Atenção"
            }

            if(prazo >= 6) {
              return "Normal"
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
        this.maisDetalhes === true
      ) {
        this.exibirMaisDetalhes = true;
      } else {
        this.exibirMaisDetalhes = false;
      }
    },
   /*  exibirCampoPrazo(): void {
      if (
        this.form.monitoraPrazo == "sim"
      ) {
        this.exibirRegistroPrazo = true;
      } else {
        this.exibirRegistroPrazo = false;
      }
    }, */
    exibirCampoSIGED(): void {
      if (
        this.form.requerSIGED === true
      ) {
        this.exibirRegistroSIGED = true;
      } else {
        this.exibirRegistroSIGED = false;
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

    voltar(): void {
      this.$router.push("/");
    }
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
