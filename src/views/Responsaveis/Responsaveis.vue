<template>
  <div>
    <b-container fluid>
      <div class="row">
        <b-form-group class="titulo m-0" label="Consulta de Responsáveis" label-size="lg">
          <hr />
        </b-form-group>

        <!-- FORMULÁRIO DE CONSULTA -->       
        <b-form @submit.prevent="submit" class="mb-5">

            <div class="row">
                <!-- (CPF) -->
                <div class="col-3">
                  <b-form-group label="CPF:" class="font">
                    <b-form-input :placeholder="'Digite seu CPF '" type="text" v-model="form.cpfUsuario"
                      v-mask="'###.###.###-##'"></b-form-input>
                  </b-form-group>
                </div>
                <!-- (NOME) -->
                <div class="col-4"> 
                  <b-form-group label="Nome:" class="font">
                    <b-form-input :placeholder="'Digite seu Nome'" type="text" v-model="form.nomeUsuario">
                    </b-form-input>
                  </b-form-group>
                </div>
                <!-- ÍCONE DA LUPA -->
                <div class="col-2 justify-content-center">
                  <b-form-group label="Consultar" class="font text-white">                    
                      <b-button class="h2" type="submit">
                        <b-icon-search v-b-tooltip.hover.topleft="'Consultar'"></b-icon-search>
                      </b-button>               
                  </b-form-group>               
          </div>
        </div>
        </b-form>


        <!-- CARD DA TABELA -->
        <div class="card p-0 m-0">
          <!-- CABEÇALHO DA TABELA (Espaço reservado para incluir ícones) -->
          <div class="card-header" align="right">
            <div class="row">
                <!-- ÍCONE Journal-text -->
                <div class="col-1 text-blue h2 p0m0" align="center" label="Responsáveis Cadastrados">
                  <b-icon-journal-text>
                  </b-icon-journal-text>
                </div>
              <!-- TÍTULO -->
              <div class="col-10 mt-1" align="start">
                <div class="row position-relative">
                  <h5>Responsáveis Cadastrados</h5>
                </div>
              </div>
              <!-- ÍCONE Plus-Circle -->
              <div class="col-1 position-relative" align="center"> 
                <b-form-group label="" class="btn text-primary position-absolute top-50 start-50 translate-middle">
                  <div class="h3">
                    <b-icon-plus-circle v-b-modal.modal-cadastro-responsavel v-b-tooltip.hover.topleft="'Adicionar Responsável'"></b-icon-plus-circle>
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
                    Editar
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

        <b-modal id="modal-cadastro-responsavel" size="lg" centered title="Cadastro do Responsável" hide-footer>
          <ModalCadastroResponsavel>            
          </ModalCadastroResponsavel>
        </b-modal>

        <!-- //MODAL -->


      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
//import axios from "axios";
import HeaderPage from '@/components/HeaderPage.vue';
import ModalCadastroResponsavel from './Modais/ModalCadastroResponsavel.vue';
import { mask } from "vue-the-mask";
import Notifications from "@/components/Notifications.vue";
import { Notificacao } from "@/type/notificacao";
import { Responsavel } from '@/type/responsavel';
import { TableResponsaveisSeeder } from '@/type/tableResponsavel';
import { FieldsTableResponsavel } from "@/type/tableResponsavel";
import { BIconSearch, BIconPlusCircle, BIconInfoCircle, BIconJournalText } from 'bootstrap-vue'

export default Vue.extend({
  directives: { mask },
  components: {
    HeaderPage,   
    BIconSearch,
    BIconJournalText,
    BIconPlusCircle,
    BIconInfoCircle,
    Notifications,
    ModalCadastroResponsavel
  },
  data() {
    return {
      rows: 100,
      currentPage: 1,
      totalRows: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      form: {} as Responsavel,
      fields: FieldsTableResponsavel, //nome das colunas da tabela
      items:  TableResponsaveisSeeder, 
      stickyHeader: true,
      noCollapse: true,
    };
  },
  mounted() {
    this.totalRows = this.items.length
     
  },
  methods: {
    submit() {
      alert("pesquisar");
      
      console.log(JSON.stringify(this.form))
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
