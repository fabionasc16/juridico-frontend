<template>
<div class="container fluid">
    <div class="row">
        <div class="col-12" style="margin-top: 20px">
            <b-form-group class="titulo m-0" label="Consulta de Órgão Demandante" label-size="lg">
            <hr />
           </b-form-group>
        </div>
     </div>
          <!-- NOTIFICAÇÕES -->       
          <notifications :notifications="Notificacao"></notifications>      

          <div v-if="alert">
              <ReturnMessage :message="Message" :fechaAlert="fechaAlert"></ReturnMessage>
          </div>          

          <div v-if="loading">
              <LoadingSpinner></LoadingSpinner>
          </div>
   

     <!-- FORMULÁRIO DE CONSULTA -->       
     <b-form @submit.prevent="search" class="mb-5">
          <div class="row">               
              <!-- (NOME) -->
              <div class="col-md-6 col-lg-6"> 
                <b-form-group label="Nome:" class="font">
                  <b-form-input :placeholder="'Digite Nome do Órgão Demandante'" type="text" v-model="nomepesquisa">
                  </b-form-input>
                </b-form-group>
              </div>
              <b-form-group class="font col-md-6 col-lg-6">
                            <label>Sigla<span class="text-danger">*</span>:</label>
                            <b-form-input type="text"
                                v-model="siglapesquisa"></b-form-input>
              </b-form-group>

              <b-form-group class="font col-md-6 col-lg-6">
                  <label>Esfera<span class="text-danger">*</span>:</label>
                  <b-form-input type="text"
                      v-model="esferapesquisa"></b-form-input>
              </b-form-group>
              <!-- ÍCONE DA LUPA -->
             
                <b-form-group class="font text-white col-lg-1 button-search">                    
                    <b-button type="submit">
                      <b-icon-search v-b-tooltip.hover.topleft="'Consultar'"></b-icon-search>
                    </b-button>               
                </b-form-group>               
           
              
          </div>
     </b-form>

     <!-- CARD DA TABELA -->
      <div class="card-table p-0 m-0">    
          <!-- TOPO TABELA-->
          <div class="topo-table">
       
            <div class="desc-topo-table">
              <b-icon-journal-text class="icon-topo-table"></b-icon-journal-text> 
              <span class="title-topo-table">Órgãos Cadastrados</span>
            </div>                      

            <div class="button-topo-table">
              <b-icon-plus-circle v-b-modal.modal-cadastro-orgao v-b-tooltip.hover.topleft="'Adicionar Órgão'"></b-icon-plus-circle>
            </div>

          </div> 
          <!-- TABELA -->
          <div>
            <b-table-lite small striped hover class="m-0" head-variant="dark" :current-page="currentPage"
              :per-page="perPage" :no-border-collapse="noCollapse" :items="items"
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
                  <b-list-group-item block
                     class="btn-light btn-outline-dark m-0 p-1" @click="editarOrgao(data.item.id_orgao)">
                    Editar
                  </b-list-group-item>  
                  <b-list-group-item block 
                     @click="visualizarOrgao(data.item.id_orgao)"
                     class="btn-light btn-outline-dark m-0 p-1">
                    Visualizar
                  </b-list-group-item>                 
                  <!--<b-list-group-item block class="btn-light text-dark btn-outline-danger m-0 p-1" @click="excluir(data.item.id_orgao, data.item.orgao_demandante)">
                    Excluir
                  </b-list-group-item>-->
                  <b-list-group-item block                     
                       @click="abrirModal('modal-excluir', data.item.id_orgao, data.item.orgao_demandante)"
                       class="btn-light text-dark btn-outline-danger m-0 p-1"                 
                       @listarOrgaos="listarOrgaos(currentPage)">                      
                     Excluir
                   </b-list-group-item>
                </b-dropdown>
              </template>                                 
            </b-table-lite>
          </div>

          <div class="m-3 text-center" v-if="totalRows==0">
               <label>Nenhum registro encontrado.</label>
          </div>       

          <!-- RODAPÉ DA TABELA (Espaço reservado para incluir ícones) -->
          <div class="card-footer m-0 px-1 pt-1">
            <!-- PAGINAÇÃO -->
            <div class="col-12 m-0 px-1 pt-1">              
              <b-pagination pills align="right" size="sm" v-model="currentPage" 
                @change="listarOrgaos"              
                :total-rows="totalRows" :per-page="perPage"  v-show="totalRows">
              </b-pagination>               
            </div>           
          </div>
          <div>&nbsp <b>Total Registros:</b> {{totalRows}}</div>  
     </div>       
        
      <!-- MODAL -->
      <b-modal id="modal-cadastro-orgao" size="lg" centered title="Cadastro do Órgão Demandante" hide-footer>
          <ModalCadastroOrgao  @listarOrgaos="listarOrgaos(currentPage)" tipo="cadastrar"> 
            <template v-slot:buttons> 
                <b-button class="bordered" @click="$bvModal.hide('modal-cadastro-orgao')">Fechar</b-button>
            </template>           
          </ModalCadastroOrgao>
        </b-modal>

        <b-modal id="modal-editar-orgao" size="lg" centered title="Editar Órgão Demandante" hide-footer>
          <ModalCadastroOrgao @listarOrgaos="listarOrgaos(currentPage)" tipo="editar" :id="idOrgao">  
            <template v-slot:buttons> 
                <b-button class="bordered" @click="$bvModal.hide('modal-editar-orgao')">Fechar</b-button>
            </template>           
          </ModalCadastroOrgao>
        </b-modal>

        <b-modal id="modal-visualizar-orgao" size="lg" centered title="Visualizar Órgão Demandante" hide-footer>
          <ModalCadastroOrgao tipo="visualizar" :id="idOrgao"> 
            <template v-slot:buttons> 
                <b-button class="bordered" @click="$bvModal.hide('modal-visualizar-orgao')">Fechar</b-button>
            </template>           
          </ModalCadastroOrgao>
        </b-modal>

        <ModalExcluir :pergunta="`o òrgão ${nomeOrgaoModal}`">
            <template v-slot:buttons>
                 <b-button variant="danger" class="bordered" 
                 @click="excluir(idOrgao)"
                 >Excluir</b-button>
             </template>   
         </ModalExcluir>
      <!-- //MODAL -->

</div> <!--container fluid-->
  
</template>

<script lang="ts">
import Vue from "vue";
import HeaderPage from '@/components/HeaderPage.vue';
import ModalCadastroOrgao from './Modais/ModalCadastroOrgao.vue';
import { mask } from "vue-the-mask";
import { Orgaos } from '@/type/orgaos';
import { FieldsTableOrgao } from "@/type/tableOrgaos";
import Notifications from "@/components/Notifications.vue";
import { Notificacao } from "@/type/notificacao";
import ReturnMessage from "@/components/ReturnMessage.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import RestApiService from "@/services/rest/service";
import ModalExcluir from "@/components/ModalExcluir.vue"

export default Vue.extend({
  directives: { mask },
  components: {
    HeaderPage, 
    Notifications,
    ModalCadastroOrgao,
    ReturnMessage,
    LoadingSpinner,
    ModalExcluir,
  },
  data() {
    return {
      idOrgao: null as any, //para modal
      rows: 100,
      currentPage: 1,
      nomepesquisa: "" as string,
      siglapesquisa: "" as string,
      esferapesquisa: "" as string,
      totalRows: null as any,
      perPage: 10,
      items: [] as Array<String>,  
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      form: {} as Orgaos,
      fields: FieldsTableOrgao, //nome das colunas da tabela     
      stickyHeader: true,
      noCollapse: true,

      Notificacao: [] as Array<Notificacao>,
      Message: [] as Array<Notificacao>,
      loading: false as boolean,
      alert: false as boolean,  
      
      nomeOrgaoModal: "" as string,
      titleModal: "" as string,
      totalPageSearch: 0, //total de registros na paginacao corrente    
    };
  },
  mounted() {
    this.listarOrgaos(this.currentPage)
  },
  methods: {
    search() {       
        this.loading = true             

        let busca = { 
          orgaoDemandante: this.nomepesquisa? this.nomepesquisa : "",
          siglaOrgao: this.siglapesquisa? this.siglapesquisa : "",
          esferaOrgao: this.esferapesquisa? this.esferapesquisa : "",        
        }  

        if(!this.nomepesquisa && !this.siglapesquisa && !this.esferapesquisa){       
          this.currentPage = 1
        }  

        RestApiService.post(
          "orgaos-demandantes/list",
           busca
        )
          .then((response: any) => {
            this.perPage = response.data.perPage;
            this.items = response.data.data;
            this.totalRows = response.data.total;
            this.totalPageSearch = response.data.length           
          })
          .catch((e) => {
            this.adicionarAlert(
                            "alert",
                            "Ocorreu um erro ao realizar a pesquisa!"
                            );         
          })
          .finally(() => {
            this.loading = false          
          });
      
    },
    editarOrgao(id: number): void {
        this.idOrgao = id
        this.$bvModal.show('modal-editar-orgao')       
    },

    visualizarOrgao(id: number): void {
        this.idOrgao = id
        this.$bvModal.show('modal-visualizar-orgao')
    },

    listarOrgaos(currentpage: number) : void {
      this.loading = true
      let busca={}
      RestApiService.post3("orgaos-demandantes/list", `?currentPage=${currentpage}`, busca)
        .then((response: any) => {         
          this.items = response.data.data
          this.perPage = response.data.perPage
          this.totalRows = response.data.total  
          this.totalPageSearch = response.data.data.length               
        })
        .catch((e: Error) => {
          console.log(e)
          this.adicionarNotificacao('danger', 'Não foi possível carregar a listagem!')         
          return false;
        })
        .finally(() => {
           this.loading = false;
        });

    },
    
    abrirModal(modalname: string, idOrgao: number, nomeOrgao?: any){      
        this.titleModal = ''
        this.idOrgao = idOrgao            
        this.nomeOrgaoModal = nomeOrgao
        this.$bvModal.show(modalname)            
    },

    excluir(id: any): void {

        this.$bvModal.hide('modal-excluir') 
     
        RestApiService.delete("orgaos-demandantes", id)
          .then((response: any) =>{
              this.loading = true
              this.adicionarAlert(
                  "success",
                  "Exclusão realizada com sucesso!"
              );

            //se excluir último registro de uma página, retornar para a primeira
            if(this.totalPageSearch == 1) {
              this.currentPage = 1
            }  

            this.listarOrgaos(this.currentPage)
          })
          .catch((e: Error) => {
             this.adicionarAlert(
                  "alert",
                  "Ocorreu um erro ao excluir registro!"
              );
          })
          .finally(() => {
            this.loading = false
          });      
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

/* Cabeçalho da tabela */
.topo-table {
  display: flex;
  justify-content: space-between;  
  align-items: center;
  padding: 1px 10px; /* top bottom / right left */
  background-color: rgba(0, 0, 0, .03);
  border: 1px solid rgba(0,0,0, .125); 
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.icon-topo-table { 
  font-size: 2rem;  
}

.title-topo-table {
  font-size: 1.2rem;
  padding-left: 10px;
  font-weight: 100;
  flex-grow: 1;  
  font-family: "Mulish", sans-serif;
  align-self: center;
}

.button-topo-table {
  font-size: 2.2rem;
  color: #007bff;
  cursor: pointer;
  text-decoration: none;
}

.button-topo-table:hover {
  color: #5cabff;
}


@media(min-width: 992px)
  {
    .button-search {
      margin-top: 32px
    }
  }


</style>
