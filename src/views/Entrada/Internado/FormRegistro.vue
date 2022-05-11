<template>
  <div>
    <header-page
      :titulo="'Registro de Paciente Internado e Identificado'"
      descricao="Registre a identificação do Paciente"
    />

    <b-container>
      <div class="row">
        <div class="col-12">
          <b-form @submit.prevent="submit">
            <notifications :notifications="this.Notificacao"></notifications>
            <b-form-group
              class="titulo"
              label="Informações de saída do paciente"
              label-size="lg"
            >
              <hr />
            </b-form-group>

            <div class="row"></div>

            <div class="row">
              <b-form-group
                label="Data de Identificação:"
                class="font col-sm-3 col-md-3 col-lg-3"
              >
                <b-form-input
                  type="date"
                  v-model="form.dataIdentificacao"
                ></b-form-input>
              </b-form-group>     

               <b-form-group
                label="Status:"
                class="font col-sm-3 col-md-3 col-lg-3"
              >
                <b-form-select
                  size="sm"
                  v-model="form.statusRegistro"
                  disabled
                  style="color: blue"
                >
                  <b-form-select-option value="2"
                    >Identificado</b-form-select-option
                  >
                </b-form-select>
              </b-form-group>

              <b-form-group
                label="Situação:"
                class="font col-sm-3 col-md-3 col-lg-3"
              >
                <b-form-select
                  size="sm"
                  v-model="form.internado"
                  disabled
                  style="color: blue"
                >
                  <b-form-select-option value="Internado"
                    >Internado</b-form-select-option
                  >
                </b-form-select>
              </b-form-group>
            </div>        

            <div>
              <b-form-group
                class="titulo"
                label="Identificação do paciente"
                label-size="lg"
              >
                <hr />
              </b-form-group>
              <div class="row">
                <b-form-group
                  label="Nome:"
                  class="font col-sm-6 col-md-6 col-lg-6"
                >
                  <b-form-input
                    :placeholder="'Nome completo'"
                    type="text"
                    v-model="form.nomePaciente"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  label="Nome da mãe:"
                  class="font col-sm-6 col-md-6 col-lg-6"
                >
                  <b-form-input
                    :placeholder="'Nome completo da mãe'"
                    type="text"
                    v-model="form.nomeMae"
                  ></b-form-input>
                </b-form-group>
              </div>

              <div class="row">
                <b-form-group
                  label="Data de nascimento:"
                  class="font col-sm-3 col-md-3 col-lg-3"
                >
                  <b-form-input
                    type="date"
                    v-model="form.dataNascimento"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  label="RG:"
                  class="font col-sm-3 col-md-3 col-lg-3"
                >
                  <b-form-input
                    :placeholder="'Exemplo: 0000000-0'"
                    type="text"
                    v-model="form.rg"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  label="CPF:"
                  class="font col-sm-3 col-md-3 col-lg-3"
                >
                  <b-form-input
                    :placeholder="'Exemplo: 000.000.000-00'"
                    type="text"
                    v-model="form.cpf"
                    v-mask="'###.###.###-##'"
                  ></b-form-input>
                </b-form-group>

                <b-form-group
                  label="CNS:"
                  class="font col-sm-3 col-md-3 col-lg-3"
                >
                  <b-form-input
                    :placeholder="'Exemplo: 000.0000.0000.0000'"
                    type="text"
                    v-model="form.cns"
                    v-mask="'###.####.####.####'"
                  ></b-form-input>
                </b-form-group>
              </div>

              <div class="row">
                <b-form-group
                  label="Nacionalidade:"
                  class="font col-sm-3 col-md-3 col-lg-3"
                >
                  <b-form-select v-model="form.nacionalidade">
                    <b-form-select-option value="brasileiro"
                      >Brasileira</b-form-select-option
                    >
                    <b-form-select-option value="estrangeiro"
                      >Estrangeira</b-form-select-option
                    >
                  </b-form-select>
                </b-form-group>

                <b-form-group
                  label="Sexo:"
                  class="font col-sm-3 col-md-3 col-lg-3"
                >
                  <b-form-select size="sm" v-model="form.sexo">
                    <b-form-select-option value="masculino"
                      >Masculino</b-form-select-option
                    >
                    <b-form-select-option value="feminino"
                      >Feminino</b-form-select-option
                    >
                    <b-form-select-option value="não_especificado"
                      >Não especificado</b-form-select-option
                    >
                  </b-form-select>
                </b-form-group>
              </div>
            </div>

            <div class="py-2">
              <b-button class="mr-2" variant="secondary" @click="voltar()"
                >Voltar</b-button
              >
              <b-button type="submit" variant="success" 
                >Salvar</b-button
              >
            </div>
          </b-form>
        </div>
      </div>
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mask } from "vue-the-mask";
import Notifications from "@/components/Notifications.vue";
import HeaderPage from "@/components/HeaderPage.vue";
import { Notificacao } from "@/type/notificacao";

export default Vue.extend({
  directives: { mask },
  components: {
    Notifications,
    HeaderPage,
  },
  data() {
    return {
      form: {
        dataIdentificacao: "" as string,
        statusRegistro: "2" as string,
        internado: "Internado" as string,
        nomePaciente: "" as string,
        nomeMae: "" as string,
        dataNascimento: "" as string,
        rg: "" as string,
        cpf: "" as string,
        cns: "" as string,
        nacionalidade: "" as string,
        sexo: "" as string,
      },
      Notificacao: [] as Array<Notificacao>
    };
  },
  mounted() {
    this.form.dataIdentificacao = this.defaultData();
  },

  methods: {
    defaultData(): string {
      let hoje = new Date();
      let month = ("0" + (hoje.getMonth() + 1)).slice(-2);
      let day = ("0" + hoje.getDate()).slice(-2);
      let year = hoje.getFullYear();
      return year + "-" + month + "-" + day;
    },

    submit() {
     // if (this.validarCamposObrigatorios()) {
     //   alert(JSON.stringify(this.form));
     // }
      this.$router.push("/listaRegistroEntrada");
    },

    voltar(): void {
      this.$router.push("/listaRegistroEntrada");
    },

    limparCamposIdentificacao(): void {
      this.form.nomePaciente = "";
      this.form.nomeMae = "";
      this.form.dataNascimento = "";
      this.form.rg = "";
      this.form.cpf = "";
      this.form.cns = "";
      this.form.nacionalidade = "";
      this.form.sexo = "";
    },

    validarCamposObrigatorios(): boolean {
      if (!this.form.dataIdentificacao) {
        this.Notificacao.push({
          type: "danger",
          message: "Data de saída é obrigatório!",
        });
      }
      if (!this.form.statusRegistro) {
        this.Notificacao.push({
          type: "danger",
          message: "Status Paciente é obrigatório!",
        });
      }
      if (
        this.form.statusRegistro == "2" &&
        (!this.form.nomePaciente ||
          !this.form.nomeMae ||
          !this.form.dataNascimento ||
          !this.form.rg ||
          !this.form.cpf ||
          !this.form.cns ||
          !this.form.nacionalidade ||
          !this.form.sexo)
      ) {
        //identificado
        this.Notificacao.push({
          type: "danger",
          message: "Preencha todos os campos de Identificação do Paciente!",
        });
      }
      if (this.Notificacao.length > 0) {
        setTimeout(() => {
          this.Notificacao = [];
        }, 5000);
        return false;
      } else {
        return true;
      }
    },
  },
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
