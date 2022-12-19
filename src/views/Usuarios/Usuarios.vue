<template>

<div class="container fluid">
      <div class="row">
          <div class="col-12" style="margin-top: 20px">
            <b-form-group class="titulo m-0" label="Consulta de Usuário" label-size="lg">
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

       <!-- 1ª LINHA (CPF + NOME + BOTÃO) -->
       <b-form @submit.prevent="listarUsuarios(currentPage)" class="mb-5">
          <div class="row">
              <!-- (CPF) -->
              <div class="col-3">
                <b-form-group label="CPF:" class="font">
                  <b-form-input :placeholder="'Digite seu CPF '" type="text" v-model="form.cpf"
                    v-mask="'###.###.###-##'"></b-form-input>
                </b-form-group>
              </div>
              <!-- (NOME) -->
              <div class="col-4"> 
                <b-form-group label="Nome completo:" class="font">
                  <b-form-input :placeholder="'Digite seu Nome Completo'" type="text" v-model="form.nome">
                  </b-form-input>
                </b-form-group>
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
        </b-form>



        <!-- CARD DA TABELA DE USUÁRIOS-->
        <div class="card p-0 m-0"> 
          <!-- CABEÇALHO DA TABELA (Espaço reservado para incluir ícones) -->
          <div class="card-header" align="right"> 
            <div class="row">
              <!-- TÍTULO -->
              <div class="col-1 text-blue h2" align="center" label="Usuários Cadastrados"> 
                <b-icon-person v-b-modal.modal-cadastro-usuario v-b-tooltip.hover.topleft="'Adicionar Usuário'"></b-icon-person>
              </div>
              <div class="col-10 mt-1" align="start">
                <div class="row position-relative">
                  <h5>Usuários Cadastrados</h5>
                </div>
              </div>
              <!-- ÍCONE Plus-Circle -->
              <div class="col-1 position-relative" align="center"> 
                <b-form-group label="" class="btn text-primary position-absolute top-50 start-50 translate-middle">
                  <div class="h3">
                    <b-icon-plus-circle v-b-modal.modal-cadastro-usuario v-b-tooltip.hover.topleft="'Adicionar Usuário'"></b-icon-plus-circle>
                  </div>
                </b-form-group>
              </div>
            </div>
          </div>
          <!-- TABELA -->
          <div> 
            <b-table-lite small striped hover responsive class="m-0" head-variant="dark" :current-page="currentPage"
             :per-page="perPage" :sticky-header="stickyHeader" 
            :no-border-collapse="noCollapse" :items="items" :fields="fields">
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
                    @click="editarUsuario(data.item.id)">
                    Editar
                  </b-list-group-item>  
                   <b-list-group-item block 
                     @click="visualizarUsuario(data.item.id)"
                     class="btn-light btn-outline-dark m-0 p-1">
                    Visualizar
                   </b-list-group-item>          
                  <b-list-group-item block class="btn-light text-dark btn-outline-danger m-0 p-1" @click="excluir(data.item.id, data.item.descricaoAssunto)">
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
                <b-pagination pills align="right" size="sm" v-model="currentPage" 
                @change="listarUsuarios" 
                :total-rows="totalRows" :per-page="perPage"  v-show="totalRows">
                </b-pagination>
              </div>
          </div>
          <div>&nbsp <b>Total Registros:</b> {{totalRows}}</div>
        </div>


        <!-- MODAL -->

        <b-modal id="modal-cadastro-usuario" centered title="Cadastro de Usuário" class="modal-usuario" hide-footer>
          <ModalCadastroUsuario  class="modal-usuario"  @listarUsuarios="listarUsuarios(currentPage)" > 
            <template v-slot:buttons tipo="cadastrar"> 
                <b-button class="bordered" @click="$bvModal.hide('modal-cadastro-usuario')">Fechar</b-button>
            </template>           
          </ModalCadastroUsuario>
        </b-modal>

        <b-modal id="modal-editar-usuario" centered title="Editar Usuário" hide-footer>
          <ModalCadastroUsuario  @listarUsuarios="listarUsuarios(currentPage)"  tipo="editar" :id="id_usuario">  
            <template v-slot:buttons> 
                <b-button class="bordered" @click="$bvModal.hide('modal-editar-usuario')">Fechar</b-button>
            </template>           
          </ModalCadastroUsuario>
        </b-modal>   
        
        <b-modal id="modal-visualizar-usuario" centered title="Visualizar Usuário" hide-footer>
          <ModalCadastroUsuario tipo="visualizar" :id="id_usuario">  
            <template v-slot:buttons> 
                <b-button class="bordered" @click="$bvModal.hide('modal-visualizar-usuario')">Fechar</b-button>
            </template>           
          </ModalCadastroUsuario>
        </b-modal> 
        <!-- Modal -->

</div><!-- container fluid -->


</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import ModalCadastroUsuario from './Modais/ModalCadastroUsuario.vue';
import HeaderPage from '@/components/HeaderPage.vue';
import Notifications from "@/components/Notifications.vue";
import { Notificacao } from "@/type/notificacao";
import { mask } from "vue-the-mask";
import { Usuario } from "@/type/usuario";
import RestApiService from "@/services/rest/service";
import { BIconSearch, BIconPlusCircle, BIconPerson} from 'bootstrap-vue';
import { FieldsTableUsuario} from "@/type/tableUsuario";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ReturnMessage from "@/components/ReturnMessage.vue";
import ModalExcluir from "@/components/ModalExcluir.vue";
import formatarDataBrMixin from "@/mixins/formatarDataBr";
import ValidarDataMixin from "@/mixins/validarData";
import ValidarCpfMixin from "@/mixins/validarCpfMixin";




export default Vue.extend({
  directives: { mask },
  components: {
    HeaderPage,
    Notifications,
    ModalCadastroUsuario,
    BIconSearch,
    BIconPlusCircle,
    BIconPerson,
    LoadingSpinner,
    ReturnMessage,
    ModalExcluir,
  },
  mixins: [        
    ValidarCpfMixin, ValidarDataMixin, formatarDataBrMixin
  ],
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
      /*form: {
        cpfUsuario: "" as string,
        nomeUsuario: "" as string,
        matriculaUsuario: "" as string,
        cargoUsuario: "" as string,
        loginUsuario: "" as string,
        senhaUsuario: "" as string,
      },*/
      /*fields: [
        {
          key: 'botaoAction',
          label: 'Ações',
          sortable: false,
        },
        {
          key: 'cpfUsuario',
          label: 'CPF',
          sortable: true
        },
        {
          key: 'nomeUsuario',
          label: 'Nome Completo',
          sortable: true
        },
        {
          key: 'matriculaUsuario',
          label: 'Matrícula',
          sortable: true,
        },
        {
          key: 'cargoUsuario',
          label: 'Cargo',
          sortable: true,
        },
      ],
      items: [
        { isActive: true, cpfUsuario: "123.145.147-11", nomeUsuario: "Thaís Condida", matriculaUsuario: "12345-A", cargoUsuario: 'Advogado' },
        { isActive: true, cpfUsuario: "154.478.459-89", nomeUsuario: "Chico Cunha", matriculaUsuario: "54321-A", cargoUsuario: 'Auxiliar' },
        { isActive: true, cpfUsuario: "521.845.987.-14", nomeUsuario: "Pacífico Armando Guerra", matriculaUsuario: "12345-A", cargoUsuario: 'Estagiário' },
        { isActive: true, cpfUsuario: "458.987.589-99", nomeUsuario: "Um Dois Três de Oliveira Quatro", matriculaUsuario: "12345-A", cargoUsuario: 'Diretor' },
        { isActive: true, cpfUsuario: "154.623.352-13", nomeUsuario: "Vicente Mais ou  Menos de Souza", matriculaUsuario: "12345-A", cargoUsuario: 'Gerente' },
        { isActive: true, cpfUsuario: "154.623.352-13", nomeUsuario: "Vicente Mais ou  Menos de Souza", matriculaUsuario: "12345-A", cargoUsuario: 'Gerente' },
        { isActive: true, cpfUsuario: "154.623.352-13", nomeUsuario: "Vicente Mais ou  Menos de Souza", matriculaUsuario: "12345-A", cargoUsuario: 'Gerente' },
        { isActive: true, cpfUsuario: "225.112.002-09", nomeUsuario: "Deyde Costa", matriculaUsuario: "12345-A", cargoUsuario: 'Advogada' },
        { isActive: true, cpfUsuario: "007.007.007-07", nomeUsuario: "James Bond", matriculaUsuario: "007-A", cargoUsuario: 'Agente Secreto' }

      ]*/
    };
  },
  mounted() {
    this.listarUsuarios(this.currentPage);
   },
  methods: {
    submit() {
      const cpf =  this.form.cpf ? 
           this.form.cpf.replace(/[^\d]+/g, "") : ""

      let busca = {
        cpfResponsavel : cpf,
        nomeResponsavel : this.form.nome ? this.form.nome : "",      
      }      
 
      console.log("busca ", JSON.stringify(busca))
      

        RestApiService.post("usuarios", busca)
          .then((response: any) => {            
            this.items = response.data.data;
            this.perPage = response.data.perPage;
            this.totalRows = response.data.total;
          })
          .catch((e) => {
            if (e.message.length > 0) {
              this.Notificacao.push({
                type: "danger",
                message: e.response.data.message,
              });              
              return false;
            }
          })
          .finally(() => {
            this.loading = false          
          });      
     
      
    },
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
      
       RestApiService.get(
         //"usuarios/all", `?currentPage=${currentpage}`)
         "usuarios/all", '?nomeSistema=SAPEJ')
         .then((response: any) => {
           this.items = response.data.data;
           console.log(response.data)
           this.perPage = response.data.perPage;
           this.totalRows = response.data.total;

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
    excluir(id: any): void {
    
    let message = 'Deseja realmente excluir o usuário ? '

    if(confirm(message)) {
    
      RestApiService.delete("usuarios", id)
        .then((response: any) => {
          this.loading = true;

          this.adicionarAlert(
                  "success",
                  "Exclusão realizada com sucesso!"
          );  
          
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
      }
    },
    adicionarNotificacao(tipo: string, mensagem: string): void {
        this.Notificacao.push({
            type: tipo,
            message: mensagem,
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
#modal-cadastro-usuario___BV_modal_content_ {
  min-width: 950px;
  right: 40%;
}

.modal-usuario {
  min-width: 900px;
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
