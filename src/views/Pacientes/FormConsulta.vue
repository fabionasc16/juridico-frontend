<template>
  <div class="container">
    <b-form class="row">
      <b-form-group
        v-for="(c, index) in caracteristicas"
        :key="index"
        :label="c.categoria"
        class="font col-sm-3 col-md-3 col-lg-3"
      >
        <b-form-select size="sm" v-model="form.caracteristicas[c.label]">
          <b-form-select-option :value="t" v-for="t in c.tipos" :key="t">
            {{ t }}
          </b-form-select-option>
        </b-form-select>
      </b-form-group>

      <b-form-group
        label="Estatura aproximada:"
        append="m"
        class="font col-sm-3 col-md-3 col-lg-3"
        description="Em metros"
      >
        <b-form-input
          size="sm"
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
          size="sm"
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
          size="sm"
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

      <b-form-group
        label="Sinais particulares:"
        description=" (tatuagem, cicatriz, marcas etc.)"
        class="font col-sm-8 col-md-8 col-lg-8"
      >
        <b-form-input
          size="sm"
          type="text"
          v-model="form.sinaisParticulares"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Acessórios utilizados:"
        description="(anel, cordão, relógio etc)"
        class="font col-sm-8 col-md-8 col-lg-8"
      >
        <b-form-input
          size="sm"
          type="text"
          v-model="form.acessoriosUtilizados"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label="Deficiência, amputações e/ou deformações? Se sim, qual(is)?"
        class="font col-sm-8 col-md-8 col-lg-8"
      >
        <b-form-input
          size="sm"
          type="text"
          v-model="form.deficiencia"
        ></b-form-input>
      </b-form-group>
      <br />
    </b-form>
    <br />
    <div>
      <b-button class="mr-2" variant="secondary" @click="voltar()"
        >Voltar</b-button
      >
      <b-button type="submit" variant="primary">Consultar</b-button>
    </div>
	<br />
	<br />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import { CaracteristicaSeeder } from "@/type/caracteristicas";
export default Vue.extend({
  data() {
    return {
      form: {
        caracteristicas: {},
        estaturaAproximada: "" as string,
        pesoAproximado: "" as string,
        idadeAproximada: "" as string,
        barba: "" as string,
        bigode: "" as string,
        sinaisParticulares: "" as string,
        acessoriosUtilizados: "" as string,
        deficiencia: "" as string,
      },
      caracteristicas: CaracteristicaSeeder,
    };
  },
  computed: {
    ...mapGetters("caracteristicas", ["getTeste"]),
  },
  methods: {
    voltar(): void {
      this.$router.push("/");
    },
  },
});
</script>
