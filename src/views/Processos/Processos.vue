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

            

                <b-form-group append="m" class="font col-sm-3 col-md-3 col-lg-3">
                   
                  <b-form-checkbox switch class="font" v-model="checkedProcessoSiged">                      
                    <label v-if="checkedProcessoSiged">Nº Procedimento:</label> 
                    <label v-else>Nº SIGED:</label>                       
                  </b-form-checkbox>                            

                  <b-form-input size="md" type="text" v-model="form.nProcesso" v-mask="'######/####-##'" autofocus></b-form-input>
                </b-form-group>

                <b-form-group label="Assunto:" append="m" class="font col-sm-5 col-md-5 col-lg-5">
                  <v-select style="font-size: 0.85rem" :options="optionsAssunto" class="font" label="texto"
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
                <div class="h2" type="button" style="color: gray;" @click="submit">
                  <b-icon-search v-b-tooltip.hover.topleft="'Consultar'"></b-icon-search>
                </div>
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
                <b-form-group label="Tipo do Processo:" append="m" class="font col-sm-3 col-md-3 col-lg-3"
                  v-show="exibirMaisDetalhes">                
                  <v-select style="font-size: 0.85rem" :options="optionsTipoProcesso" class="font" label="texto"
                                        v-model="tipoProcessoSelecionado"/>
                </b-form-group>

                <b-form-group label="Status Processo:" append="m" class="font col-sm-3 col-md-3 col-lg-3"
                  v-show="exibirMaisDetalhes">                 
                  <v-select style="font-size: 0.85rem" :options="optionsStatusProcesso" class="font" label="texto"
                                        v-model="statusProcessoSelecionado"/>
                </b-form-group>

                 <b-form-group label="Status Prazo:" append="m" class="font col-sm-3 col-md-3 col-lg-3"
                  v-show="exibirMaisDetalhes">               
                  <v-select style="font-size: 0.85rem" :options="optionsStatusPrazo" class="font" label="texto"
                                        v-model="statusPrazoSelecionado"/>
                </b-form-group>

                <b-form-group label="Órgão Demandante:" append="m" class="font col-sm-3 col-md-3 col-lg-3"
                  v-show="exibirMaisDetalhes">
                   <v-select style="font-size: 0.85rem" :options="optionsOrgaoDemandante" class="font" label="texto"
                                        v-model="orgaoDemandanteSelecionado"/>            
                </b-form-group>

                <b-form-group label="Classificação:" append="m" class="font col-sm-3 col-md-3 col-lg-3"
                  v-show="exibirMaisDetalhes">
                  <v-select style="font-size: 0.85rem" :options="optionsClassificacao" class="font" label="texto"
                                        v-model="classificacaoSelecionada"/>  
                </b-form-group>

                 <b-form-group label="Responsável:" append="m" class="font col-sm-3 col-md-3 col-lg-3"
                  v-show="exibirMaisDetalhes">
                  <v-select style="font-size: 0.85rem" :options="optionsResponsavel" class="font" label="texto"
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
//import axios from "axios";
import HeaderPage from '@/components/HeaderPage.vue';
import ModalTramitacoesProcesso from './Modais/ModalTramitacoesProcesso.vue';
import ModalCadastroProcesso from './Modais/ModalCadastroProcesso.vue';
import ModalDetalhesProcesso from './Modais/ModalDetalhesProcesso.vue';
import ModalReiterarProcesso from './Modais/ModalReiterarProcesso.vue';
import ModalDuplicarProcesso from './Modais/ModalDuplicarProcesso.vue';
import { mask } from "vue-the-mask";
import Notifications from "@/components/Notifications.vue";
import { Notificacao } from "@/type/notificacao";
//import { GrauParentescoSeeder } from "@/type/parentesco";
//import { mapActions } from 'vuex';
import { Processo } from '@/type/processo';
import { TableProcessoSeeder } from '@/type/tableProcesso';
import { BIconSearch, BIconPlusCircle, BIconInfoCircle, BIconJournalText } from 'bootstrap-vue'
import { TipoProcessoSeeder } from "@/type/tipoProcesso";
import { StatusProcessoSeeder } from "@/type/statusProcesso";
import { StatusPrazoSeeder } from "@/type/statusPrazo";
import { OrgaosSeeder } from "@/type/orgaos";
import { ClassificacaoSeeder } from "@/type/classificacao";
import { ResponsavelSeeder } from "@/type/responsavel";
import { AssuntoSeeder } from "@/type/assunto";
import { CaixaSigedSeeder } from "@/type/caixaSiged";
import { FieldsTableProcesso } from "@/type/tableProcesso";

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
      form: {} as Processo,
      checkedProcessoSiged: false as boolean,
      maisDetalhes: false as boolean,
      fields: FieldsTableProcesso, //nome das colunas da tabela
      items: TableProcessoSeeder, // lista de processos
      optionsTipoProcesso: TipoProcessoSeeder,
      optionsStatusProcesso: StatusProcessoSeeder,
      optionsStatusPrazo: StatusPrazoSeeder,
      optionsOrgaoDemandante: OrgaosSeeder, 
      optionsClassificacao: ClassificacaoSeeder, 
      optionsResponsavel: ResponsavelSeeder, 
      optionsAssunto: AssuntoSeeder, 
      optionsCaixa: CaixaSigedSeeder,  
      tipoProcessoSelecionado: {
        texto: "Selecione um tipo de processo" as string,
        value: "" as string,
      },
      statusProcessoSelecionado: {
        texto: "Selecione status processo" as string,
        value: "" as string,
      },
      statusPrazoSelecionado: {
        texto: "Selecione status prazo" as string,
        value: "" as string,
      },
      orgaoDemandanteSelecionado: {
        texto: "Selecione órgão demandante" as string,
        value: "" as string,
      },
      classificacaoSelecionada: {
        texto: "Selecione uma classificação" as string,
        value: "" as string,
      },
      responsavelSelecionado: {
        texto: "Selecione um responsável" as string,
        value: "" as string,
      },
      assuntoSelecionado: {
        texto: "Selecione um assunto" as string,
        value: "" as string,
      },
      caixaSigedSelecionada: {
        texto: "Selecione caixa SIGED" as string,
        value: "" as string,
      },    
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

            if(prazo >= 0 && prazo < 4) {
              return "danger"
            }

            if(prazo >= 4 && prazo < 6 ) {
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
