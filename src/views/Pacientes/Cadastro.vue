<template>
  <div>
    <header-page :titulo="'Cadastro de pacientes'" descricao="Adicione novos pacientes ao sistema" />
    <b-container>
      <div class="row">
        <div class="col-12">
          <b-form @submit.prevent="submit" enctype="multipart/form-data">
            <b-form-group
              class="titulo"
              label="Informações de entrada do paciente"
              label-size="lg"
            >
              <hr />
            </b-form-group>

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
                class="font col-sm-3 col-md-3 col-lg-3"
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
                  v-model="form.registro"
                ></b-form-input>
              </b-form-group>
            </div>

            <b-form-group
              class="titulo"
              label="Informações do paciente"
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

              <b-form-group label="RG:" class="font col-sm-3 col-md-3 col-lg-3">
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

            <b-form-group
              class="titulo"
              label="Características do paciente"
              label-size="lg"
            >
              <hr />
            </b-form-group>

            <div class="row">
              <b-form-group
                label="Raça/Etnia:"
                class="font col-sm-3 col-md-3 col-lg-3"
              >
                <b-form-select size="sm" v-model="form.raca">
                  <b-form-select-option value=""
                    >Amarela (asiática)</b-form-select-option
                  >
                  <b-form-select-option value="">Branca</b-form-select-option>
                  <b-form-select-option value="">Indígena</b-form-select-option>
                  <b-form-select-option value="">Negra</b-form-select-option>
                  <b-form-select-option value="">Parda</b-form-select-option>
                </b-form-select>
              </b-form-group>

              <b-form-group
                label="Cor dos olhos:"
                class="font col-sm-3 col-md-3 col-lg-3"
              >
                <b-form-select size="sm" v-model="form.corOlhos">
                  <b-form-select-option value=""
                    >Castanhos claros</b-form-select-option
                  >
                  <b-form-select-option value=""
                    >Castanhos escuros</b-form-select-option
                  >
                  <b-form-select-option value="">Azul</b-form-select-option>
                  <b-form-select-option value="">Verde</b-form-select-option>
                  <b-form-select-option value="">Preto</b-form-select-option>
                  <b-form-select-option value="">Cinzento</b-form-select-option>
                  <b-form-select-option value=""
                    >Desiguais na cor (heterocromia)</b-form-select-option
                  >
                </b-form-select>
              </b-form-group>
              <b-form-group
                label="Biotipo:"
                class="font col-sm-3 col-md-3 col-lg-3"
              >
                <b-form-select size="sm" v-model="form.biotipo">
                  <b-form-select-option value="">Magro</b-form-select-option>
                  <b-form-select-option value=""
                    >Sobrepeso</b-form-select-option
                  >
                  <b-form-select-option value="">Troncudo</b-form-select-option>
                </b-form-select>
              </b-form-group>
            </div>

            <div class="row">
              <b-form-group
                label="Cor dos cabelos:"
                class="font col-sm-3 col-md-3 col-lg-3"
              >
                <b-form-select size="sm" v-model="form.corCabelo">
                  <b-form-select-option value="">Pretos</b-form-select-option>
                  <b-form-select-option value=""
                    >Castanhos escuros</b-form-select-option
                  >
                  <b-form-select-option value=""
                    >Castanhos claros</b-form-select-option
                  >
                  <b-form-select-option value=""
                    >Loiro claro</b-form-select-option
                  >
                  <b-form-select-option value=""
                    >Loiro escuro</b-form-select-option
                  >
                  <b-form-select-option value="">Ruivo</b-form-select-option>
                  <b-form-select-option value=""
                    >Grisalhos parcial</b-form-select-option
                  >
                  <b-form-select-option value=""
                    >Grisalhos total</b-form-select-option
                  >
                  <b-form-select-option value=""
                    >Calvo parcial</b-form-select-option
                  >
                  <b-form-select-option value=""
                    >Calvo total</b-form-select-option
                  >
                  <b-form-select-option value="">Tingido</b-form-select-option>
                </b-form-select>
              </b-form-group>

              <b-form-group
                label="Tipo do cabelo:"
                class="font col-sm-3 col-md-3 col-lg-3"
              >
                <b-form-select size="sm" v-model="form.tipoCabelo">
                  <b-form-select-option value="">Liso</b-form-select-option>
                  <b-form-select-option value="">Ondulado</b-form-select-option>
                  <b-form-select-option value="">Cacheado</b-form-select-option>
                  <b-form-select-option value="">Raspado</b-form-select-option>
                  <b-form-select-option value="">Calvo</b-form-select-option>
                </b-form-select>
              </b-form-group>

              <b-form-group
                label="Corte do cabelo:"
                class="font col-sm-3 col-md-3 col-lg-3"
              >
                <b-form-select size="sm" v-model="form.corteCabelo">
                  <b-form-select-option value=""
                    >Raspado/careca</b-form-select-option
                  >
                  <b-form-select-option value="">Curto</b-form-select-option>
                  <b-form-select-option value="">Médio</b-form-select-option>
                  <b-form-select-option value="">Longo</b-form-select-option>
                </b-form-select>
              </b-form-group>
            </div>

            <div class="row">
              <b-form-group
                label="Estatura aproximada:"
                append="m"
                class="font col-sm-3 col-md-3 col-lg-3"
                description="Em metros"
              >
                <b-form-input
                  type="text"
                  v-model="form.estaturaAproximada"
                  v-mask="'#.##'"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Peso aproximado:"
                class="font col-sm-3 col-md-3 col-lg-3"
                description="Em quilos"
              >
                <b-form-input
                  type="text"
                  v-model="form.pesoAproximado"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Idade aproximada:"
                class="font col-sm-3 col-md-3 col-lg-3"
                description="Em anos"
              >
                <b-form-input
                  type="text"
                  v-model="form.idadeAproximada"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                style="margin-top: 40px"
                class="font col-sm-3 col-md-3 col-lg-3"
              >
                <b-form-checkbox-group>
                  <b-form-checkbox value="barba" v-model="form.barba"
                    >Barba</b-form-checkbox
                  >
                  <b-form-checkbox value="bigode" v-model="form.bigode"
                    >Bigode</b-form-checkbox
                  >
                </b-form-checkbox-group>
              </b-form-group>
            </div>

            <div class="row">
              <b-form-group
                label="Sinais particulares:"
                description=" (tatuagem, cicatriz, marcas etc.)"
                class="font col-sm-10 col-md-10 col-lg-10"
              >
                <b-form-input
                  type="text"
                  v-model="form.sinaisParticulares"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Acessórios utilizados:"
                description="(anel, cordão, relógio etc)"
                class="font col-sm-10 col-md-10 col-lg-10"
              >
                <b-form-input
                  type="text"
                  v-model="form.acessoriosUtilizados"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Deficiência, amputações e/ou deformações? Se sim, qual(is)?"
                class="font col-sm-10 col-md-10 col-lg-10"
              >
                <b-form-input
                  type="text"
                  v-model="form.deficiencia"
                ></b-form-input>
              </b-form-group>
            </div>
            <b-form-group
              class="titulo"
              label="Circunstâncias em que foi encontrado(a)"
              label-size="lg"
            >
              <hr />
            </b-form-group>
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

              <b-form-group
                label="Local onde foi encontrado(a):"
                class="font col-sm-8 col-md-8 col-lg-8"
                description="(rua, ponto de referência etc)"
              >
                <b-form-input
                  type="text"
                  v-model="form.localEncontrado"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Bairro:"
                class="font col-sm-8 col-md-8 col-lg-8"
              >
                <b-form-input
                  type="text"
                  v-model="form.bairroEncontrado"
                ></b-form-input>
              </b-form-group>

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

              <b-form-group
                label="Foto do Paciente:"
                class="font col-sm-8 col-md-8 col-lg-8"
              >
                <b-form-file
                  id="file"
                  accept=".jpg, .png"
                  v-model="form.file"
                  placeholder="Selecione uma foto"
                  drop-placeholder="Drop file here..."
                  @change="handleFileUpload"
                ></b-form-file>
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
import HeaderPage from '@/components/HeaderPage.vue'

export default Vue.extend({
  directives: { mask },
  data() {
    return {
      form: {
        dataEntrada: "" as string,
        horaEntrada: "" as string,
        entradaAtraves: "" as string,
        nomePaciente: "" as string,
        nomeMae: "" as string,
        dataNascimento: "" as string,
        rg: "" as string,
        cpf: "" as string,
        cns: "" as string,
        nacionalidade: "" as string,
        sexo: "" as string,
        raca: "" as string,
        corOlhos: "" as string,
        corCabelos: "" as string,
        tipoCabelo: "" as string,
        corteCabelo: "" as string,
        biotipo: "" as string,
        estaturaAproximada: "" as string,
        pesoAproximado: "" as string,
        idadeAproximada: "" as string,
        barba: "" as string,
        bigode: "" as string,
        sinaisParticulares: "" as string,
        acessoriosUtilizados: "" as string,
        deficiencia: "" as string,
        vestimentas: "" as string,
        localEncontrado: "" as string,
        bairroEncontrado: "" as string,
        condicoesEncontrada: "" as string,
        registro: "" as string,
        file: "",
      },
      exibirRegistro: false as boolean,
    };
  },
  mounted() {
    this.form.dataEntrada = this.defaultData();
    //this.form.horaEntrada = this.defaultHora();
  },

  methods: {
    defaultData(): string {
      let hoje = new Date();
      let month = ("0" + (hoje.getMonth() + 1)).slice(-2);
      let day = ("0" + hoje.getDate()).slice(-2);
      let year = hoje.getFullYear();
      return year + "-" + month + "-" + day;
    },
   /* defaultHora(): string {
      let hoje = new Date();
      let hora = ("0" + hoje.getHours()).slice(-2);
      var min = ("0" + hoje.getMinutes()).slice(-2);
      return hora + ":" + min;
    },*/
    exibirCampo(): void {
      this.form.registro = ""
      if (this.form.entradaAtraves != "null"){
        this.exibirRegistro = true
      }else{
        this.exibirRegistro = false
      }      
    },

    handleFileUpload(event:any): void {
      this.form.file = event.target.files[0];
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
  components:{
    HeaderPage
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
