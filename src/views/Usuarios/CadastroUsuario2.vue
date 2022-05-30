<template>
  <div>
    <b-container>
      <div class="row">
        <b-form-group class="titulo m-0" label="Consulta de Usuário" label-size="lg">
          <hr />
        </b-form-group>

        <div class="row"> <!-- 1ª LINHA (CPF + NOME + BOTÃO) -->
          <div class="col-3"> <!-- (CPF) -->
            <b-form-group label="CPF:" class="font">
              <b-form-input :placeholder="'Digite seu CPF '" type="text" v-model="form.cpfUsuario"
                v-mask="'###.###.###-##'"></b-form-input>
            </b-form-group>
          </div>
          <div class="col-4"> <!-- (NOME) -->
            <b-form-group label="Nome completo:" class="font">
              <b-form-input :placeholder="'Digite seu Nome Completo'" type="text" v-model="form.nomeUsuario">
              </b-form-input>
            </b-form-group>
          </div>
          <div class="col-5">  <!-- (BOTÃO) -->
            <b-form-group label="Consultar" class="font text-white">
              <b-icon-search v-b-tooltip.hover.topleft="'Consultar'" type="button" @click="submit" font-scale="2" style="color: gray;"></b-icon-search>
            </b-form-group>
          </div>
        </div>

        <div class="card p-0 m-0"> <!-- CARD DA TABELA DE USUÁRIOS-->
          <div class="card-header" align="right"> <!-- CABEÇALHO DA TABELA (Espaço reservado para incluir ícones) -->
            <div class="row">
              <div class="col-1" align="center"> <!-- TÍTULO -->
                <b-icon-person-plus v-b-modal.modal-cadastro-usuario v-b-tooltip.hover.topleft="'Adicionar Usuário'" font-scale="2" class="text-blue" label="Usuários Cadastrados"></b-icon-person-plus>
              </div>
              <div class="col-10 mt-1" align="start">
                <div class="row position-relative">
                  <h5>Usuários Cadastrados</h5>
                </div>
              </div>
              <div class="col-1 position-relative" align="center"> <!-- ÍCONE Plus-Circle -->
                <b-form-group label="" class="btn text-primary position-absolute top-50 start-50 translate-middle">
                  <b-icon-plus-circle v-b-modal.modal-cadastro-usuario v-b-tooltip.hover.topleft="'Adicionar Usuário'" font-scale="2"></b-icon-plus-circle>
                </b-form-group>
              </div>
            </div>
          </div>
          <div> <!-- TABELA -->
            <b-table-lite small striped hover responsive class="m-0" head-variant="dark" :sticky-header="stickyHeader" :no-border-collapse="noCollapse" :items="items" :fields="fields"></b-table-lite>
          </div>
          <div class="card-footer m-0 px-1 pt-1"> <!-- RODAPÉ DA TABELA (Espaço reservado para incluir ícones) -->
              <div class="col-12 m-0 px-1 pt-1"> <!-- PAGINAÇÃO -->
                <b-pagination pills align="right" size="sm" v-model="currentPage" :total-rows="rows"></b-pagination>
              </div>
          </div>
        </div>

        <!-- MODAL -->
        <b-modal id="modal-cadastro-usuario" size="lg" centered title="Cadastro de Usuários">
          <div class="card"><!-- TELA DE CADASTRO -->
            <div class="col-12">
              <b-form @submit.prevent="submit">

                <b-form-group class="titulo" label="Informações pessoais" label-size="lg">
                  <hr />
                </b-form-group>

                <div class="row">
                  <!-- 1ª LINHA (CPF + NOME) -->
                  <b-form-group label="CPF:" class="font col-sm-5 col-md-5 col-lg-5">
                    <b-form-input :placeholder="'Digite seu CPF '" type="text" v-model="form.cpfUsuario"
                      v-mask="'###.###.###-##'"></b-form-input>
                  </b-form-group>

                  <b-form-group label="Nome completo:" class="font col-sm-7 col-md-7 col-lg-7">
                    <b-form-input :placeholder="'Digite seu Nome Completo'" type="text" v-model="form.nomeUsuario">
                    </b-form-input>
                  </b-form-group>
                </div>
                <div class="row">
                  <!-- 2ª LINHA (MATRÍCULA + CARGO) -->
                  <b-form-group label="Matrícula:" class="font col-sm-5 col-md-5 col-lg-5">
                    <b-form-input :placeholder="'Digite sua Matrícula'" type="text" v-model="form.matriculaUsuario"
                      v-mask="'###.###.###-##'"></b-form-input>
                  </b-form-group>

                  <b-form-group label="Cargo:" class="font col-sm-7 col-md-7 col-lg-7">
                    <b-form-input :placeholder="'Digite seu Cargo'" type="text" v-model="form.cargoUsuario">
                    </b-form-input>
                  </b-form-group>
                </div>

                <b-form-group class="titulo" label="Acesso ao Sistema" label-size="lg">
                  <hr />
                </b-form-group>

                <div class="row"><!-- (LOGIN + SENHA + SENHA) -->
                  <b-form-group label="Login:" class="font col-sm-4 col-md-4 col-lg-4">
                    <b-form-input :placeholder="'Login = CPF'" type="text" v-model="form.loginUsuario"></b-form-input>
                  </b-form-group>

                  <b-form-group label="Senha:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-input :placeholder="'Digite sua Senha'" type="text" v-model="form.senhaUsuario">
                    </b-form-input>
                  </b-form-group>

                  <b-form-group label="Repita a Senha:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-input :placeholder="'Digite a Senha novamente'" type="text" v-model="form.senhaUsuario">
                    </b-form-input>
                  </b-form-group>
                </div>
              </b-form>
            </div>
          </div>

          <template #modal-footer> <!-- MODAL FOOTER -->
            <div class="py-2"> <!-- BOTÃO (LOGIN + SENHA + SENHA) -->
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
import HeaderPage from '@/components/HeaderPage.vue';
import Notifications from "@/components/Notifications.vue";
import { Notificacao } from "@/type/notificacao";
import { mask } from "vue-the-mask";
import { BIconSearch, BIconPlusCircle, BIconPersonPlus} from 'bootstrap-vue';


export default Vue.extend({
  directives: { mask },
  data() {
    return {
      rows: 100,
      currentPage: 1,
      stickyHeader: true,
      noCollapse: true,
      show: false as boolean,
      form: {
        cpfUsuario: "" as string,
        nomeUsuario: "" as string,
        matriculaUsuario: "" as string,
        cargoUsuario: "" as string,
        loginUsuario: "" as string,
        senhaUsuario: "" as string,
      },
      fields: [
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

      ]
    };
  },
  mounted() { },
  methods: {
    submit() {
      alert("enviar");
    },
    voltar(): void {
      this.$router.push("/");
    }
  },
  components: {
    HeaderPage,
    Notifications,
    BIconSearch,
    BIconPlusCircle,
    BIconPersonPlus
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
