<template>
  <div>
    <header-page
      :titulo="'Registro de Entrada'"
      descricao="Adicione novos pacientes ao sistema"
    />
    <b-container>
      <div class="row">
        <div class="col-12">
          <b-form @submit.prevent="submit">
            <b-form-group
              class="titulo"
              label="Informações de entrada do paciente"
              label-size="lg"
            >
              <hr />
            </b-form-group>

            <div class="row">
              <b-form-group
                label="Número do Prontuário:"
                class="font col-sm-3 col-md-3 col-lg-3"
              >
                <b-form-input
                  type="text"
                  v-model="form.numPronturario"
                ></b-form-input>
              </b-form-group>

               <b-form-group
                label="Status:"
                class="font col-sm-3 col-md-3 col-lg-3"
              >
                <b-form-select size="sm" v-model="form.statusRegistro" disabled style="color:blue">
                  <b-form-select-option value="1" 
                    >Não Identificado</b-form-select-option
                  >                  
                </b-form-select>
              </b-form-group>

            </div>

            <div class="row">
              <b-form-group
                label="Data de entrada na unidade:"
                class="font col-sm-3 col-md-3 col-lg-3"
              >
                <b-form-input
                  type="date"
                  v-model="form.dataEntrada"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Hora de entrada:"
                class="font col-sm-2 col-md-2 col-lg-2"
              >
                <b-form-input
                  type="time"
                  v-model="form.horaEntrada"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Entrada através de:"
                class="font col-sm-3 col-md-3 col-lg-3"
              >
                <b-form-select
                  v-model="form.entradaAtraves"
                  @change="exibirCampo()"
                >
                  <b-form-select-option value="null"
                    >-- Selecione --</b-form-select-option
                  >
                  <b-form-select-option value="terceiros"
                    >Terceiros</b-form-select-option
                  >
                  <b-form-select-option value="meios_proprios"
                    >Meios próprios</b-form-select-option
                  >
                  <b-form-select-option value="samu">SAMU</b-form-select-option>
                  <b-form-select-option value="policia"
                    >Polícia</b-form-select-option
                  >
                </b-form-select>
              </b-form-group>

              <b-form-group
                label="Registro No.:"
                class="font col-sm-3 col-md-3 col-lg-3"
                v-show="exibirRegistro"
              >
                <b-form-input
                  type="text"
                  v-model="form.numRegistroExterno"
                ></b-form-input>
              </b-form-group>
            </div>

            <div class="row">
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

            <div class="row">
              <b-form-group
                label="Vestimentas que usava:"
                class="font col-sm-8 col-md-8 col-lg-8"
              >
                <b-form-input
                  type="text"
                  v-model="form.vestimentas"
                ></b-form-input>
              </b-form-group>
            </div>

            <div class="row">
              <b-form-group
                label="Condições em que se encontrava:"
                class="font col-sm-8 col-md-8 col-lg-8"
              >
                <b-form-textarea
                  rows="3"
                  max-rows="6"
                  v-model="form.condicoesEncontrada"
                ></b-form-textarea>
              </b-form-group>
            </div>


              <b-form-group
              class="titulo"
              label="Pessoa de Contato:"
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
                  type="text"
                  v-model="form.nomeContato"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Graud de parentesco:"
                class="font col-sm-3 col-md-3 col-lg-3"
              >
                <b-form-select size="sm" v-model="form.grauParentesco">
                  <b-form-select-option value="null">-- Selecione --</b-form-select-option>  
                  <b-form-select-option value="nenhum">Nenhum</b-form-select-option>
                  <b-form-select-option value="Pai">Pai</b-form-select-option>
                  <b-form-select-option value="Mãe">Mãe</b-form-select-option>
                  <b-form-select-option value="Avô(ó)">Avô(ó)</b-form-select-option>
                  <b-form-select-option value="Filho(a)">Filho(a)</b-form-select-option>
                  <b-form-select-option value="Neto(a)">Neto(a)</b-form-select-option>
                  <b-form-select-option value="Tio(a)">Tio(a)</b-form-select-option>
                  <b-form-select-option value="Primo(a)">Primo(a)</b-form-select-option>
                  <b-form-select-option value="Irmão(ã)">Irmão(ã)</b-form-select-option>
                  <b-form-select-option value="Sobrinho(a)">Sobrinho(a)</b-form-select-option>
                  <b-form-select-option value="Companheiro(a)">Companheiro(a)</b-form-select-option>
                  <b-form-select-option value="Conjuge">Conjuge</b-form-select-option>
                </b-form-select>
              </b-form-group>
            </div>
            <div class="row">
              <b-form-group
                label="Telefone:"
                class="font col-sm-3 col-md-3 col-lg-3"
              >
                <b-form-input
                  type="text"
                  v-model="form.telefoneContato"
                  :placeholder="'Exemplo: (99)9999-9999'"
                  v-mask="'(##)#####-####'"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="CPF:"
                class="font col-sm-3 col-md-3 col-lg-3"
              >
                <b-form-input
                  :placeholder="'Exemplo: 000.000.000-00'"
                  type="text"
                  v-model="form.cpfContato"
                  v-mask="'###.###.###-##'"
                ></b-form-input>
              </b-form-group>              
            </div>

            <div class="py-2">
              <b-button class="mr-2" variant="secondary" @click="voltar()"
                >Voltar</b-button
              >
              <b-button type="submit" variant="success">Salvar</b-button>
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
//import axios from 'axios'
import HeaderPage from "@/components/HeaderPage.vue";

export default Vue.extend({
  directives: { mask },
  data() {
    return {
      form: {
        numProntuario: "" as string,
        statusRegistro: "1",
        dataEntrada: "" as string,
        horaEntrada: "" as string,
        entradaAtraves: "" as string,
        numRegistroExterno: "" as string,
        sexo: "" as string,
        vestimentas: "" as string,
        condicoesEncontrada: "" as string,
        nomeContato: "" as string,
        telefoneContato: "" as string,
        cpfContato: "" as string,
        grauParentesco: "" as string,        
      },
      exibirRegistro: false as boolean,
    };
  },
  mounted() {
    this.form.dataEntrada = this.defaultData();
  },

  methods: {
    defaultData(): string {
      let hoje = new Date();
      let month = ("0" + (hoje.getMonth() + 1)).slice(-2);
      let day = ("0" + hoje.getDate()).slice(-2);
      let year = hoje.getFullYear();
      return year + "-" + month + "-" + day;
    },
    exibirCampo(): void {
      this.form.numRegistro = "";
      if (this.form.entradaAtraves == "samu" || this.form.entradaAtraves == "policia" ) {
        this.exibirRegistro = true;
      } else {
        this.exibirRegistro = false;
      }
    },

    submit() {
      /* axios.post('https://paciente/post', this.form)
           .then(response => {
              console.log(response);
            })
            .catch(function () {
              console.log("falha!!");
            });*/
    },

    voltar(): void {
      this.$router.push("/");
    },
  },
  components: {
    HeaderPage,
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
