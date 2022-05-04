<template>
  <b-container fluid style="padding: 5% 3% 3% 2%">
    <div class="animate__animated animate__fadeIn slower">
      <h2>Cadastro de usuários</h2>
      <p style="color: grey; font-size: 0.9em">
        Cadastre-se no sistema preenchendo o formulário
      </p>
      <hr />
      <div class="row">
        <div class="col-12">
          <b-form @submit.prevent="submit">
            <b-form-group
              class="titulo"
              label="Informações pessoais"
              label-size="lg"
            >
              <hr />
            </b-form-group>

            <div class="row">
              <b-form-group
                label="Primeiro nome:"
                class="font col-sm-6 col-md-6 col-lg-6"
              >
                <b-form-input
                  :placeholder="'Primeiro nome'"
                  type="text"
                  v-model="form.priNome"
                ></b-form-input>
              </b-form-group>
            </div>

            <div class="row">
              <b-form-group
                label="Nome completo:"
                class="font col-sm-6 col-md-6 col-lg-6"
              >
                <b-form-input
                  :placeholder="'Nome completo'"
                  type="text"
                  v-model="form.nomeUsuario"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Nome da mãe (se aplicável):"
                class="font col-sm-6 col-md-6 col-lg-6"
              >
                <b-form-input
                  :placeholder="'Nome completo da mãe'"
                  type="text"
                  v-model="form.nomeMae"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Nome do pai (se aplicável):"
                class="font col-sm-6 col-md-6 col-lg-6"
              >
                <b-form-input
                  :placeholder="'Nome completo do pai'"
                  type="text"
                  v-model="form.nomePai"
                ></b-form-input>
              </b-form-group>

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
                label="Estado civil:"
                class="font col-sm-3 col-md-3 col-lg-3"
              >
                <b-form-select size="sm" v-model="form.estadoCivil">
                  <b-form-select-option value="solteiro"
                    >Solteiro</b-form-select-option
                  >
                  <b-form-select-option value="casado"
                    >Casado</b-form-select-option
                  >
                  <b-form-select-option value="separado"
                    >Separado</b-form-select-option
                  >
                  <b-form-select-option value="divorciado"
                    >Divorciado</b-form-select-option
                  >
                  <b-form-select-option value="viuvo"
                    >Viúvo</b-form-select-option
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
            </div>

            <div class="row">
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

              <b-form-group label="RG:" class="font col-sm-3 col-md-3 col-lg-3">
                <b-form-input
                  :placeholder="'Exemplo: 0000000-0'"
                  type="text"
                  v-model="form.rg"
                ></b-form-input>
              </b-form-group>
            </div>

            <b-form-group class="titulo" label="Endereço" label-size="lg">
              <hr />
            </b-form-group>

            <div class="row">
              <b-form-group
                label="CEP:"
                class="font col-sm-3 col-md-3 col-lg-3"
              >
                <b-form-input
                  id="cep"
                  :placeholder="'Exemplo: 00000-000'"
                  type="text"
                  v-model="form.cep"
                  v-mask="'#####-###'"
                ></b-form-input>
              </b-form-group>
            </div>

            <div class="row">
              <b-form-group
                label="Logradouro:"
                class="font col-sm-6 col-md-6 col-lg-6"
              >
                <b-form-input
                  id="logradouro"
                  :placeholder="'Exemplo: Avenida Boulevard'"
                  type="text"
                  v-model="form.logradouro"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Número:"
                class="font col-sm-3 col-md-3 col-lg-3"
              >
                <b-form-input
                  id="numero"
                  :placeholder="'Exemplo: 35A'"
                  type="text"
                  v-model="form.numero"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Bairro:"
                class="font col-sm-3 col-md-3 col-lg-3"
              >
                <b-form-input
                  id="bairro"
                  :placeholder="'Exemplo: Alvorada'"
                  type="text"
                  v-model="form.bairro"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Município:"
                class="font col-sm-4 col-md-4 col-lg-4"
              >
                <b-form-input
                  id="municipio"
                  :placeholder="'Exemplo: Manaus'"
                  type="text"
                  v-model="form.municipio"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Estado:"
                class="font col-sm-4 col-md-4 col-lg-4"
              >
                <b-form-select id="estado" size="sm" v-model="form.estado">
                  <b-form-select-option value="AC">Acre</b-form-select-option>
                  <b-form-select-option value="AL"
                    >Alagoas</b-form-select-option
                  >
                  <b-form-select-option value="AP">Amapá</b-form-select-option>
                  <b-form-select-option value="AM"
                    >Amazonas</b-form-select-option
                  >
                  <b-form-select-option value="BA">Bahia</b-form-select-option>
                  <b-form-select-option value="CE">Ceará</b-form-select-option>
                  <b-form-select-option value="DF"
                    >Distrito Federal</b-form-select-option
                  >
                  <b-form-select-option value="ES"
                    >Espírito Santo</b-form-select-option
                  >
                  <b-form-select-option value="GO">Goiás</b-form-select-option>
                  <b-form-select-option value="MA"
                    >Maranhão</b-form-select-option
                  >
                  <b-form-select-option value="MT"
                    >Mato Grosso</b-form-select-option
                  >
                  <b-form-select-option value="MS"
                    >Mato Grosso do Sul</b-form-select-option
                  >
                  <b-form-select-option value="MG"
                    >Minas Gerais</b-form-select-option
                  >
                  <b-form-select-option value="PA">Pará</b-form-select-option>
                  <b-form-select-option value="PB"
                    >Paraíba</b-form-select-option
                  >
                  <b-form-select-option value="PR">Paraná</b-form-select-option>
                  <b-form-select-option value="PE"
                    >Pernambuco</b-form-select-option
                  >
                  <b-form-select-option value="PI">Piauí</b-form-select-option>
                  <b-form-select-option value="RJ"
                    >Rio de Janeiro</b-form-select-option
                  >
                  <b-form-select-option value="RN"
                    >Rio Grande do Norte</b-form-select-option
                  >
                  <b-form-select-option value="RS"
                    >Rio Grande do Sul</b-form-select-option
                  >
                  <b-form-select-option value="RO"
                    >Rondônia</b-form-select-option
                  >
                  <b-form-select-option value="RR"
                    >Roraima</b-form-select-option
                  >
                  <b-form-select-option value="SC"
                    >Santa Catarina</b-form-select-option
                  >
                  <b-form-select-option value="SP"
                    >São Paulo</b-form-select-option
                  >
                  <b-form-select-option value="SE"
                    >Sergipe</b-form-select-option
                  >
                  <b-form-select-option value="TO"
                    >Tocantins</b-form-select-option
                  >
                </b-form-select>
              </b-form-group>
            </div>
            <br />
            <div class="py-2">
              <b-button class="mr-2" variant="secondary" @click="voltar()"
                >Voltar</b-button
              >
              <b-button type="submit" variant="success">Salvar</b-button>
            </div>
          </b-form>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import { mask } from "vue-the-mask";

export default Vue.extend({
  directives: { mask },
  data() {
    return {
      form: {
        priNome: "" as string,
        nomeUsuario: "" as string,
        nomeMae: "" as string,
        nomePai: "" as string,
        sexo: [] as Array<string>,
        estadoCivil: [] as Array<string>,
        raca: [] as Array<string>,
        dataNascimento: new Date() as Date,
        nacionalidade: [] as Array<string>,
        rg: "" as string,
        cpf: "" as string,
        cep: "" as string,
        logradouro: "" as string,
        numero: "" as string,
        bairro: "" as string,
        municipio: "" as string,
        estado: [] as Array<string>,
      },
    };
  },
  mounted() {},
  methods: {
    submit() {
      alert("enviar");
    },
    voltar(): void {
      this.$router.push("/");
    }
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
