<template>
  <div>
    <div class="container fluid">
      <div class="row">
          <div class="col-12" style="margin-top: 20px">
            <b-form-group class="titulo m-0" label="Consulta de Usuários" label-size="lg">
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
                <div class="col-xs-3 col-md-3">
                    <b-form-group label="CPF:" class="font">
                    <b-form-input :placeholder="'Digite seu CPF '" type="text" v-model="form.cpf"
                      v-mask="'###.###.###-##'"></b-form-input>
                  </b-form-group>
                </div>    
                <div class="col-xs-3 col-md-4">             
                    <b-form-group label="Nome completo:" class="font">
                    <b-form-input :placeholder="'Digite seu Nome Completo'" type="text" v-model="form.nome">
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
        <div class="card-table p-0 m-0 table-responsive">    
          <!-- TOPO TABELA-->
          <div class="topo-table">
       
            <div class="desc-topo-table">
              <b-icon-journal-text class="icon-topo-table"></b-icon-journal-text> 
              <span class="title-topo-table">Usuários Cadastrados</span>
            </div>                      

            <div class="button-topo-table">
              <b-icon-plus-circle v-b-modal.modal-cadastro-usuario v-b-tooltip.hover.topleft="'Adicionar Usuário'"></b-icon-plus-circle>
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
                    @click="editarUsuario(data.item._id)">
                    Editar
                  </b-list-group-item>  
                   <b-list-group-item block 
                     @click="visualizarUsuario(data.item._id)"
                     class="btn-light btn-outline-dark m-0 p-1">
                    Visualizar
                  </b-list-group-item>                 
                  <!--<b-list-group-item block class="btn-light text-dark btn-outline-danger m-0 p-1" 
                    @click="excluir(data.item._id, data.item.user_name)"
                    v-if="getUsuarioID != data.item._id">
                    Excluir
                  </b-list-group-item>-->

                  <b-list-group-item block                     
                       @click="abrirModal('modal-excluir', data.item._id, data.item.user_name)"
                       class="btn-light text-dark btn-outline-danger m-0 p-1"                 
                       @listarUsuarios="listarUsuarios(currentPage)"
                       v-if="getUsuarioID != data.item._id">                      
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
                :per-page="perPage" @change="listarUsuarios" v-show="totalRows">
              </b-pagination>
            </div>
          </div>
           <div>&nbsp <b>Total Registros:</b> {{totalRows}}</div>  
        </div> 
        
      </div> 

      <div>  
         <!-- MODAL -->

         <b-modal id="modal-cadastro-usuario" size="lg" centered title="Cadastro de Usuário" hide-footer>
          <ModalCadastroUsuario @listarUsuarios="listarUsuarios(currentPage)" tipo="cadastrar"> 
            <template v-slot:buttons> 
                <b-button class="bordered" @click="$bvModal.hide('modal-cadastro-usuario')">Fechar</b-button>
            </template>           
          </ModalCadastroUsuario>
        </b-modal>

        <b-modal id="modal-editar-usuario" size="lg" centered title="Editar Usuário" hide-footer>
          <ModalCadastroUsuario  @listarUsuario="listarUsuarios(currentPage)"  tipo="editar" :id="id_usuario">  
            <template v-slot:buttons> 
                <b-button class="bordered" @click="$bvModal.hide('modal-editar-usuario')">Fechar</b-button>
            </template>           
          </ModalCadastroUsuario>
        </b-modal>   
        
        <b-modal id="modal-visualizar-usuario" size="lg" centered title="Visualizar Usuário" hide-footer>
          <ModalCadastroUsuario tipo="visualizar" :id="id_usuario">  
            <template v-slot:buttons> 
                <b-button class="bordered" @click="$bvModal.hide('modal-visualizar-usuario')">Fechar</b-button>
            </template>           
          </ModalCadastroUsuario>
        </b-modal>   

         <ModalExcluir :pergunta="`o usuário ${nomeUsuarioModal}`">
            <template v-slot:buttons>
                 <b-button variant="danger" class="bordered" 
                 @click="excluir(id_usuario)"
                 >Excluir</b-button>
             </template>   
         </ModalExcluir>  
        <!-- //MODAL -->
  </div>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import HeaderPage from '@/components/HeaderPage.vue';
import { mask } from "vue-the-mask";
import { Usuario } from '@/type/usuario';
import { FieldsTableUsuario } from "@/type/tableUsuario";
import dataMixin from "@/mixins/dataMixin";
import RestApiService from "@/services/rest/service";
import Notifications from "@/components/Notifications.vue";
import { Notificacao } from "@/type/notificacao";
import ReturnMessage from "@/components/ReturnMessage.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ModalCadastroUsuario from "./Modais/ModalCadastroUsuario.vue";
import { mapGetters, mapActions } from "vuex";
import ModalExcluir from "@/components/ModalExcluir.vue"

export default Vue.extend({
  directives: { mask },
  components: {
    HeaderPage,
    Notifications,
    ReturnMessage,
    LoadingSpinner,  
    ModalCadastroUsuario,
    ModalExcluir
  },
  mixins: [        
        dataMixin,
  ],  
  computed: {
    ...mapGetters("usuario", ["getUsuarioID"]),
  },
  data() {
    return {
      id_usuario: null as any, //para modal
      rows: 100,
      currentPage: 1,
      stickyHeader: true,
      noCollapse: true,
      perPage: 10,
      show: false as boolean,
      Notificacao: [] as Array<Notificacao>,
      Message: [] as Array<Notificacao>,
      alert: false as boolean,
      loading: false as boolean,
      fields: FieldsTableUsuario,
      totalRows: null as any,
      form: {} as Usuario,
      items: [] as Array<Usuario>,    
      totalPageSearch: 0, //total de registros na paginacao corrente 
      nomeUsuarioModal: "" as string,
      titleModal: "" as string,
    };
  },
  mounted() {   
    this.listarUsuarios(this.currentPage);
     
  },
  methods: {
    editarUsuario(id: number): void {
        this.id_usuario = id
        this.$bvModal.show('modal-editar-usuario')       
    },

    visualizarUsuario(id: number): void {
        this.id_usuario = id
        this.$bvModal.show('modal-visualizar-usuario')
    },
 
    listarUsuarios(currentpage: number) : void { 
     
      this.loading = true; 
      let busca = {
          nomeSistema : "SAPEJ",       
        }   
      //RestApiService.get("usuarios/all/?nomeSistema=SAPEJ",  `?currentPage=${currentpage}`) 
      let url =  "usuarios/all"+ `?currentPage=${currentpage}&perPage=10`
      RestApiService.post(url, busca)     
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
     
      search() {  
        const cpf =  this.form.cpf ? 
            this.form.cpf.replace(/[^\d]+/g, "") : ""

        let busca = {
          nomeSistema : "SAPEJ", 
          cpfUsuario : cpf,
          nomeUsuario : this.form.nome ? this.form.nome : "",      
        }    

        let url =  "usuarios/all?currentPage=1&perPage=10"
        RestApiService.post(url, busca)
      //  RestApiService.post("usuarios/?nomeSistema=SAPEJ", busca)
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
            });      
    },    

    abrirModal(modalname: string, idUsuario: number, nomeUsuario?: any){      
        this.titleModal = ''
        this.id_usuario = idUsuario            
        this.nomeUsuarioModal = nomeUsuario
        this.$bvModal.show(modalname)            
    },

    excluir(id: any): void {
      this.$bvModal.hide('modal-excluir')  
              
      RestApiService.delete("usuarios", id)
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

            this.listarUsuarios(this.currentPage)
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
