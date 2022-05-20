<template>
  <div class="container">
    <b-form>  <!-- FORMULÁRIO DE CONSULTA -->
      <div class="row"> <!-- 1ª LINHA (3 CAIXAS + ÍCONE) -->
        <div class="col-10"> <!-- 1ª LINHA (3 CAIXAS) -->
          <div class="row">
            <b-form-group label="Nº Processo:" append="m" class="font col-sm-3 col-md-3 col-lg-3">
              <b-form-input size="md" type="text" v-model="form.nProcesso" v-mask="'######/####-##'"></b-form-input>
            </b-form-group>

            <b-form-group label="Assunto:" append="m" class="font col-sm-5 col-md-5 col-lg-5">
              <b-form-input size="md" type="text" v-model="form.assunto" v-mask=""></b-form-input>
            </b-form-group>

            <b-form-group label="Caixa SIGED:" append="m" class="font col-sm-4 col-md-4 col-lg-4">
              <b-form-input size="md" type="text" v-model="form.caixaSIGED" v-mask=""></b-form-input>
            </b-form-group>
          </div>
        </div>
        <div class="col-2"> <!-- ÍCONE DA LUPA -->
          <div class="justify-content-center">
            <br/>
            <svg type="button" @click="submit" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-search font col-sm-12 col-md-12 col-lg-12" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </div>
        </div>
      </div>

      <div class="row" align-h="between"> <!-- 2ª LINHA (2 BOTÕES) -->
        <div class="col-6">
          <b-form-checkbox switch class="font">
            Consultar Nº de Processo Externo
          </b-form-checkbox>
        </div>
        <div class="col-6">
          <b-form-checkbox v-model="form.maisDetalhes" @change="exibeMaisDetalhes()" switch class="font text-end">
          + Filtros
          </b-form-checkbox>
        </div>
      </div>

      <div class="row"> <!-- 3ª LINHA (CAMPOS OCULTOS) -->
        <div class="col-12">
          <div class="row">
            <b-form-group label="Tipo do Processo:" append="m" class="font col-sm-3 col-md-3 col-lg-3" v-show="exibirMaisDetalhes">
              <b-form-input size="md" type="text" v-model="form.tipoProcesso" v-mask=""></b-form-input>
            </b-form-group>

            <b-form-group label="Status:" append="m" class="font col-sm-3 col-md-3 col-lg-3" v-show="exibirMaisDetalhes">
              <b-form-input size="md" type="text" v-model="form.status" v-mask=""></b-form-input>
            </b-form-group>

            <b-form-group label="Órgão Demandante:" append="m" class="font col-sm-3 col-md-3 col-lg-3" v-show="exibirMaisDetalhes">
              <b-form-input size="md" type="text" v-model="form.orgaoDemanda" v-mask=""></b-form-input>
            </b-form-group>

            <b-form-group label="Classificação:" append="m" class="font col-sm-3 col-md-3 col-lg-3" v-show="exibirMaisDetalhes">
              <b-form-input size="md" type="text" v-model="form.classificacao" v-mask=""></b-form-input>
            </b-form-group>
          </div>
        </div>
      </div>
    </b-form>
<!-- Simulação de Banco de Dados

      <b-form-group v-for="(c, index) in caracteristicas" :key="index" :label="c.categoria" class="font col-sm-3 col-md-3 col-lg-3">
        <b-form-select size="sm" v-model="form.caracteristicas[c.label]" class="selectCaracteristicas">
          <b-form-select-option :value="t" v-for="t in c.tipos" :key="t">
            {{ t }}
          </b-form-select-option>
        </b-form-select>
      </b-form-group>
-->
<!-- Outros campos da tela original

      <b-form-group label="Estatura aproximada:" append="m" class="font col-sm-3 col-md-3 col-lg-3" description="Em metros">
        <b-form-input size="sm" type="text" v-model="form.nProcessoExterno" v-mask="'#.##'"></b-form-input>
      </b-form-group>

      <b-form-group label="Peso aproximado:" class="font col-sm-3 col-md-3 col-lg-3" description="Em quilos">
        <b-form-input size="sm" type="text" v-model="form.pesoAproximado"></b-form-input>
      </b-form-group>

      <b-form-group label="Idade aproximada:" class="font col-sm-3 col-md-3 col-lg-3" description="Em anos">
        <b-form-input size="sm" type="number" v-model="form.idadeAproximada"></b-form-input>
      </b-form-group>

      <b-form-group style="margin-top: 40px" class="font col-sm-3 col-md-3 col-lg-3">
        <b-form-checkbox-group>
          <b-form-checkbox value="barba" v-model="form.barba">Barba</b-form-checkbox>
          <b-form-checkbox value="bigode" v-model="form.bigode">Bigode</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>

      <b-form-group v-show="exibirPalavrasChave" label="Palavras-chave:" description=" (tatuagem, cicatriz, marcas, acessórios que usava, alguma deficiência etc.)" class="font col-sm-8 col-md-8 col-lg-8">
        <b-form-input size="sm" type="text" v-model="form.palavasChave"></b-form-input>
      </b-form-group>      
-->
    <div class="card mt-1"> <!-- CARD DA TABELA -->
      <div class="card-header" align="right"> <!-- CABEÇALHO DA TABELA (Espaço reservado para incluir ícones -->
        <b-button type="button" variant="primary" @click="submit">+ Processo</b-button>
      </div>
      <div> <!-- TABELA -->
        <b-table small striped hover responsive sticky-header head-variant="dark" type="table" :items="items" :fields="fields"></b-table>
      </div>
    </div>
    
  </div> <!-- //container -->
</template>
<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { mask } from "vue-the-mask";
import { CaracteristicaSeeder } from "@/type/caracteristicas";
export default Vue.extend({
  directives: { mask },
  data() {
    return {
      form: {
        caracteristicas: {},
        nProcessoExterno: "" as string,
        nProcessoSIGED: "" as string,
        nProcesso: "" as string,
        maisDetalhes: false as boolean,
        pesoAproximado: "" as string,
        idadeAproximada: "" as string,
        barba: "" as string,
        bigode: "" as string,
        palavasChave: "" as string
      },
      exibirMaisDetalhes: false as boolean,
      caracteristicas: CaracteristicaSeeder,
      exibirPalavrasChave: false as boolean, 
      fields: [
          {
            key: 'nProcessoExterno',
            label: 'Nº Externo',
            sortable: true
          },
          {
            key: 'nProcessoSIGED',
            label: 'Nº SIGED',
            sortable: true
          },
          {
            key: 'tipoProcesso',
            label: 'Tipo Processo',
            sortable: true,
          },
          {
            key: 'status',
            label: 'Status',
            sortable: true,
          },
          {
            key: 'assunto',
            label: 'Assunto',
            sortable: true,
          },
          {
            key: 'orgaoDemandante',
            label: 'Órgão Demandante',
            sortable: true,
          },
          {
            key: 'classificacao',
            label: 'Classificação',
            sortable: true,
          },
          {
            key: 'caixaSIGED',
            label: 'Caixa SIGED',
            sortable: true,
          },
        ],
        items: [
          { isActive: true, nProcessoExterno: "111111/1111-11", nProcessoSIGED: "111111/1111-11", tipoProcesso: 'Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'JURÍDICO' },
          { isActive: true, nProcessoExterno: "222222/2222-22", nProcessoSIGED: "222222/2222-22", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "333333/3333-33", nProcessoSIGED: "333333/3333-33", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "444444/4444-44", nProcessoSIGED: "444444/4444-44", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "555555/5555-55", nProcessoSIGED: "555555/5555-55", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "666666/6666-66", nProcessoSIGED: "666666/6666-66", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "777777/7777-77", nProcessoSIGED: "777777/7777-77", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "888888/8888-88", nProcessoSIGED: "888888/8888-88", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "999999/9999-99", nProcessoSIGED: "999999/9999-99", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "123456/7890-12", nProcessoSIGED: "123456/7890-12", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "154875/8754-87", nProcessoSIGED: "154875/8754-87", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "789456/2022-01", nProcessoSIGED: "789456/2022-01", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "754812/2020-10", nProcessoSIGED: "754812/2020-10", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "111111/1111-11", nProcessoSIGED: "111111/1111-11", tipoProcesso: 'Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'JURÍDICO' },
          { isActive: true, nProcessoExterno: "222222/2222-22", nProcessoSIGED: "222222/2222-22", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "333333/3333-33", nProcessoSIGED: "333333/3333-33", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "444444/4444-44", nProcessoSIGED: "444444/4444-44", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "555555/5555-55", nProcessoSIGED: "555555/5555-55", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "666666/6666-66", nProcessoSIGED: "666666/6666-66", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "777777/7777-77", nProcessoSIGED: "777777/7777-77", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "888888/8888-88", nProcessoSIGED: "888888/8888-88", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "999999/9999-99", nProcessoSIGED: "999999/9999-99", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "123456/7890-12", nProcessoSIGED: "123456/7890-12", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "154875/8754-87", nProcessoSIGED: "154875/8754-87", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "789456/2022-01", nProcessoSIGED: "789456/2022-01", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "754812/2020-10", nProcessoSIGED: "754812/2020-10", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "111111/1111-11", nProcessoSIGED: "111111/1111-11", tipoProcesso: 'Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'JURÍDICO' },
          { isActive: true, nProcessoExterno: "222222/2222-22", nProcessoSIGED: "222222/2222-22", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "333333/3333-33", nProcessoSIGED: "333333/3333-33", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "444444/4444-44", nProcessoSIGED: "444444/4444-44", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "555555/5555-55", nProcessoSIGED: "555555/5555-55", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "666666/6666-66", nProcessoSIGED: "666666/6666-66", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "777777/7777-77", nProcessoSIGED: "777777/7777-77", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "888888/8888-88", nProcessoSIGED: "888888/8888-88", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "999999/9999-99", nProcessoSIGED: "999999/9999-99", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "123456/7890-12", nProcessoSIGED: "123456/7890-12", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "154875/8754-87", nProcessoSIGED: "154875/8754-87", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "789456/2022-01", nProcessoSIGED: "789456/2022-01", tipoProcesso: 'Extra-Judicial', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'RH' },
          { isActive: true, nProcessoExterno: "754812/2020-10", nProcessoSIGED: "754812/2020-10", tipoProcesso: 'ASDF', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'DETIN' },
          { isActive: true, nProcessoExterno: "017101/2019-20", nProcessoSIGED: "017101/2019-20", tipoProcesso: 'zxcv', status: 'Cadastrado', assunto: 'Processo', orgaoDemandante: 'Ministério Público', classificacao: 'Classificado', caixaSIGED: 'COMPRAS' }
        ]
    };
  },
  computed: {
    ...mapGetters("caracteristicas", ["getTeste"]),

  },
  methods: {
    submit(): void {
        this.exibirPalavrasChave = true
        console.log(JSON.stringify(this.form))
    },
    exibeMaisDetalhes(): void {
      if (
        this.form.maisDetalhes === true
      ) {
        this.exibirMaisDetalhes = true;
      } else {
        this.exibirMaisDetalhes = false;
      }
    },    
    voltar(): void {
      this.$router.push("/");
    },
  },
});
</script>
