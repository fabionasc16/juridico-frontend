<template>
  <div>
    <header-page
      :titulo="'Entrada de Processos'"
      descricao="Adicione o processo no sistema"
    />

    <b-container>
      <div class="row">
        <div class="col-12">
          <b-form>
            <notifications :notifications="this.Notificacao"></notifications>
            <b-form-group class="titulo" label="Informações de entrada do processo" label-size="lg">
              <hr/>
            </b-form-group>

            <div class="row">
              <b-form-group label="Nº Processo:" class="font col-sm-3 col-md-3 col-lg-3">
                <b-form-input type="text" v-model="form.numProcesso"></b-form-input>
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
                <b-form-select size="sm" v-model="form.sexo">
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

                <div class="py-2">
                  <b-button class="mr-2" variant="secondary" @click="voltar()">Voltar</b-button>
                  <b-button type="button" variant="success" @click="submit">Salvar</b-button>
                </div>
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
                        <b-form-input :placeholder="'Em andamento'" type="text" v-model="form.caixaAtual"></b-form-input>
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
    </b-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mask } from "vue-the-mask";
import Notifications from "@/components/Notifications.vue";
import HeaderPage from "@/components/HeaderPage.vue";
import { Notificacao } from "@/type/notificacao";
import { GrauParentescoSeeder } from "@/type/parentesco";
import { mapActions } from 'vuex'



export default Vue.extend({
  directives: { mask },
  components: {
    Notifications,
    HeaderPage,
  },
  data() {
    return {
      form: {
        numProntuario: "" as string,
        statusRegistro: "1",
        dataEntrada: "" as string,
        horaEntrada: "" as string,
        entradaAtraves: "" as string,
        requerSIGED: false as boolean,
        monitoraPrazo: "" as string,
        qtdDiasPrazo: "" as string,
        numRegistroExterno: "" as string,
        sexo: "" as string,
        vestimentas: "" as string,
        condicoesEncontrada: "" as string,
        nomeContato: "" as string,
        telefoneContato: "" as string,
        cpfContato: "" as string,
        grauParentescoSelected: "" as string,
      },
      exibirRegistroPrazo: false as boolean,
      exibirRegistroSIGED: false as boolean,
      Notificacao: [] as Array<Notificacao>,
      optionsGrauParentesco: GrauParentescoSeeder,
    };
  },
  mounted() {
    this.form.dataEntrada = this.defaultData();
  },

  

  methods: {
    ...mapActions(['insereRegistro']),

    defaultData(): string {
      let hoje = new Date();
      let month = ("0" + (hoje.getMonth() + 1)).slice(-2);
      let day = ("0" + hoje.getDate()).slice(-2);
      let year = hoje.getFullYear();
      return year + "-" + month + "-" + day;
    },
    exibirCampoPrazo(): void {
      this.form.numRegistroExterno = "";
      if (
        this.form.monitoraPrazo == "sim"
      ) {
        this.exibirRegistroPrazo = true;
      } else {
        this.exibirRegistroPrazo = false;
      }
    },
    exibirCampoSIGED(): void {
      this.form.numRegistroExterno = "";
      if (
        this.form.requerSIGED === true
      ) {
        this.exibirRegistroSIGED = true;
      } else {
        this.exibirRegistroSIGED = false;
      }
    },
    // exibirCampoSIGED(): void {
    //   this.form.numRegistroExterno = "";
    //   this.form.requerSIGED = !this.form.requerSIGED
      
    // },

    submit():void {
      /*if (this.validarCamposObrigatorios()) {
        this.insereRegistro(this.form)
        this.$router.push("/listarRegistroEntrada");
      }*/
      this.$router.push("/listaRegistroEntrada");
    },

    voltar(): void {
      this.$router.push("/");
    },

    validarCamposObrigatorios(): boolean {
      if (!this.form.numProntuario) {
        this.Notificacao.push({
          type: "danger",
          message: "Número de Prontuário é obrigatório!",
        });
      }
      if (!this.form.dataEntrada) {
        this.Notificacao.push({
          type: "danger",
          message: "Data de entrada é obrigatório!",
        });
      }
      if (
        (this.form.entradaAtraves &&
          this.form.entradaAtraves == "samu" &&
          !this.form.numRegistroExterno) ||
        (this.form.entradaAtraves &&
          this.form.entradaAtraves == "policia" &&
          !this.form.numRegistroExterno)
      ) {
        this.Notificacao.push({
          type: "danger",
          message: "Registro No. é obrigatório!",
        });
      }
      if (!this.form.horaEntrada) {
        this.Notificacao.push({
          type: "danger",
          message: "Hora de entrada é obrigatório!",
        });
      }
      if (!this.form.entradaAtraves) {
        this.Notificacao.push({
          type: "danger",
          message: "Entrada através é obrigatório!",
        });
      }
      if (!this.form.sexo) {
        this.Notificacao.push({
          type: "danger",
          message: "Sexo é obrigatório!",
        });
      }
      if (!this.form.vestimentas) {
        this.Notificacao.push({
          type: "danger",
          message: "Vestimentas é obrigatório!",
        });
      }
      if (!this.form.condicoesEncontrada) {
        this.Notificacao.push({
          type: "danger",
          message: "Condições em que se encontrava é obrigatório!",
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
