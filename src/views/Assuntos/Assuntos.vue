<template>
  <div class="container fluid">
      <div class="row">
          <div class="col-12" style="margin-top: 20px">
            <b-form-group class="titulo m-0" label="Consulta de Assuntos" label-size="lg">
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
       <b-form @submit.prevent="search" class="mb-2">
            <div class="row col-12">               
              
                <div class="col-sm-10 col-md-6 col-lg-4">
                  <b-form-group label="Assunto:" class="font">
                      <b-form-input class="bordered margin-field" type="text" v-model="assuntoPesquisa"
                            ></b-form-input>   
                  </b-form-group>
                </div>
                            
                <!-- ÍCONE DA LUPA -->
                <div class="col-2 justify-content-center">
                  <b-form-group label="Consultar" class="font text-white">                    
                      <b-button type="submit">
                        <b-icon-search v-b-tooltip.hover.topleft="'Consultar'"></b-icon-search>
                      </b-button>               
                  </b-form-group>               
              </div>  
            </div>        
        </b-form>

        <!-- CARD DA TABELA -->
        <div class="card-table p-0 m-0">    
          <!-- TOPO TABELA-->
          <div class="topo-table">
       
            <div class="desc-topo-table">
              <b-icon-journal-text class="icon-topo-table"></b-icon-journal-text> 
              <span class="title-topo-table">Assuntos Cadastrados</span>
            </div>                      

            <div class="button-topo-table">
              <b-icon-plus-circle v-b-modal.modal-cadastro-assunto v-b-tooltip.hover.topleft="'Adicionar Assunto'"></b-icon-plus-circle>
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
                  <b-list-group-item block class="btn-light btn-outline-dark m-0 p-1"
                    @click="editarAssunto(data.item.id_assunto)">
                    Editar
                  </b-list-group-item>  
                   <b-list-group-item block 
                     @click="visualizarAssunto(data.item.id_assunto)"
                     class="btn-light btn-outline-dark m-0 p-1">
                    Visualizar
                   </b-list-group-item> 
                  <b-list-group-item block                     
                       @click="abrirModal('modal-excluir', data.item.id_assunto, data.item.desc_assunto)"
                       class="btn-light text-dark btn-outline-danger m-0 p-1"                 
                       @listarAssuntos="listarAssuntos(currentPage)">                      
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
              <b-pagination pills align="right" size="sm" v-model="currentPage" :total-rows="totalRows" 
                :per-page="perPage" @change="listarAssuntos" v-show="totalRows">
              </b-pagination>
            </div>
          </div>
           <div>&nbsp <b>Total Registros:</b> {{totalRows}}</div>  
        </div>       
        
         <!-- MODAL -->
         <b-modal id="modal-cadastro-assunto" centered title="Cadastro de Assunto" hide-footer>
          <ModalCadastroAssunto  @listarAssuntos="listarAssuntos(currentPage)" > 
            <template v-slot:buttons tipo="cadastrar"> 
                <b-button class="bordered" @click="$bvModal.hide('modal-cadastro-assunto')">Fechar</b-button>
            </template>           
          </ModalCadastroAssunto>
        </b-modal>

        <b-modal id="modal-editar-assunto" centered title="Editar Assunto" hide-footer>
          <ModalCadastroAssunto  @listarAssuntos="listarAssuntos(currentPage)"  tipo="editar" :id="idAssunto">  
            <template v-slot:buttons> 
                <b-button class="bordered" @click="$bvModal.hide('modal-editar-assunto')">Fechar</b-button>
            </template>           
          </ModalCadastroAssunto>
        </b-modal>   
        
        <b-modal id="modal-visualizar-assunto" centered title="Visualizar Assunto" hide-footer>
          <ModalCadastroAssunto tipo="visualizar" :id="idAssunto">  
            <template v-slot:buttons> 
                <b-button class="bordered" @click="$bvModal.hide('modal-visualizar-assunto')">Fechar</b-button>
            </template>           
          </ModalCadastroAssunto>
        </b-modal>   

        <ModalExcluir :pergunta="`o assunto ${nomeAssuntoModal}`">
            <template v-slot:buttons>
                 <b-button variant="danger" class="bordered" 
                 @click="excluir(idAssunto)"
                 >Excluir</b-button>
             </template>   
         </ModalExcluir>  
        <!-- //MODAL -->

  </div> <!--container fluid-->
</template>

<script lang="ts">
import Vue from "vue";
import HeaderPage from '@/components/HeaderPage.vue';
import { mask } from "vue-the-mask";
import { Assunto } from "@/type/assunto";
import { FieldsTableAssunto } from "@/type/tableAssunto";
import dataMixin from "@/mixins/dataMixin";
import { TipoAssuntoSeeder } from "@/type/tipoAssunto";
import RestApiService from "@/services/rest/service";
import Notifications from "@/components/Notifications.vue";
import { Notificacao } from "@/type/notificacao";
import ReturnMessage from "@/components/ReturnMessage.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ModalCadastroAssunto from "./Modais/ModalCadastroAssunto.vue";
import ModalExcluir from "@/components/ModalExcluir.vue";


export default Vue.extend({
  directives: { mask },
  components: {
    HeaderPage,    
    Notifications,
    ReturnMessage,
    LoadingSpinner,  
    ModalCadastroAssunto,
    ModalExcluir
},
  mixins: [        
        dataMixin,
  ],  
  data() {
    return {
      idAssunto: null as any, //para modal
      rows: 100,
      currentPage: 1,
      totalRows: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],     
      form: {} as Assunto,
      fields: FieldsTableAssunto, //nome das colunas da tabela     
      stickyHeader: true,
      noCollapse: true,
      optionsAssunto: [] as Array<String>,
      dataFeriadoBR: "" as string,
      perPageListagens:30000,
      items: [] as Array<Assunto>,
      Notificacao: [] as Array<Notificacao>,
      Message: [] as Array<Notificacao>,
      loading: false as boolean,
      alert: false as boolean,  
      totalPageSearch: 0, //total de registros na paginacao corrente    
      assuntoPesquisa: "" as string,
      nomeAssuntoModal: "" as string,
      titleModal: "" as string,
      
    };
  },
  mounted() {   
    this.listarAssuntos(this.currentPage); 
  },
  methods: {
    search() {
      let busca = {      
        descricaoAssunto : this.assuntoPesquisa ? this.assuntoPesquisa : "",                
      }            
      
      RestApiService.post("assuntos/list", busca)
            .then((response: any) => {              
              this.items = response.data.data;
              this.perPage = response.data.perPage;
              this.totalRows = response.data.total;
              this.totalPageSearch = response.data.data.length  
            })
            .catch((e) => {
              if (e.message.length > 0) {
                this.Notificacao.push({
                  type: "danger",
                  message: e.response.data.message,
                });              
                return false;
              }else if (
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
                            "Houve um erro. Não foi possível carregar a listagem!"
                            );                      
                        } 
            })
            .finally(() => {
              this.loading = false
              this.limparNotificacao();
            });      
    },
    editarAssunto(id: number): void {
        this.idAssunto = id
        this.$bvModal.show('modal-editar-assunto') 
    },

    visualizarAssunto(id: number): void {
        this.idAssunto = id
        this.$bvModal.show('modal-visualizar-assunto')
    },

    listarAssuntos(currentpage: number) : void { 
     
      this.loading = true;         
        
      let busca = {             
      }            
      
        RestApiService.post3("assuntos/list", `?currentPage=${currentpage}`, busca)
          .then((response: any) => {    
            this.items = response.data.data;
            this.perPage = response.data.perPage;
            this.totalRows = response.data.total;
            this.totalPageSearch = response.data.data.length    

          })
          .catch((e) => {
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
                            "Houve um erro. Não foi possível carregar a listagem!"
                            );                      
                        }      
          })
          .finally(() => {
            this.loading = false;          
          });      
    },

    validarCampos(): boolean {     

      if(this.dataFeriadoBR && !dataMixin.methods.validarData(this.dataFeriadoBR) ) {
              this.adicionarNotificacao(
                    "danger",
                    "A data informada é inválida."
                );
      }

      if (this.Notificacao.length > 0) {
                //ir para o início da página onde aparecem as mensagens
                window.scrollTo(0, 0);               

                this.adicionarAlert(
                    "alert",
                     "Realize as validações exibidas no topo desta página!"
                );

                setTimeout(() => {
                this.Notificacao = [];
                }, 10000);
                return false;
            } else {
                return true;
      }
      
    },
    
    limparNotificacao(): void {
      if (this.Notificacao.length > 0) {
        setTimeout(() => {
          this.Notificacao = [];
        }, 3000);
      }
    },

    abrirModal(modalname: string, idAssunto: number, nomeAssunto?: any){      
        this.titleModal = ''
        this.idAssunto = idAssunto            
        this.nomeAssuntoModal = nomeAssunto
        this.$bvModal.show(modalname)            
    },

    excluir(id: any): void {        
        this.$bvModal.hide('modal-excluir')  

        RestApiService.delete("assuntos", id)
          .then((response: any) => {
            this.loading = true;

            this.adicionarAlert(
                    "success",
                    "Exclusão realizada com sucesso!"
            );  

             //se excluir último registro de uma página, retornar para a primeira
             if(this.totalPageSearch == 1) {
              this.currentPage = 1
            }  
            
            this.listarAssuntos(this.currentPage)
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
</style>
