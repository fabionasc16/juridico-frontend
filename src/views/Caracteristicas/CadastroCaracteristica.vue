<template>
  <div class="container-fluid" style="padding: 5% 3% 3% 2%">
    <div class="animate__animated animate__fadeIn slower">
      <h2>Cadastro de características</h2>
      <p style="color: grey; font-size: 0.9em">
        Adicione características ao sistema
      </p>
      <hr />
      <br />
      <div class="row">
        <div class="col-sm-8 col-md-8 col-lg-8">
          <b-form>
            <b-form-group
              class="font"
              id="fieldset"
              label="Informe o nome da categoria"
              label-for="categoria"
            >
              <b-form-input
                id="categoria"
                v-model="categoria"
                :placeholder="'Exemplo: cor dos olhos'"
              />
            </b-form-group>
            <b-form-group
              class="font"
              id="fieldset2"
              label="Informe o(s) tipo(s) da categoria (adicione mais campos se achar necessário)"
              label-for="tipo"
            >
              <b-form-input
                class="mb-2"
                v-model="tipos[0]"
                :placeholder="'Exemplo: Tipo 1'"
              />
              <b-form-input
                class="mb-2"
                v-model="tipos[i + 1]"
                :placeholder="'Exemplo: Tipo ' + (i + 2)"
                v-for="(qtd, i) in qtd_inputs"
                :key="qtd"
              />
            </b-form-group>
            <div class="py-2">
              <b-button
                class="mr-2"
                variant="primary"
                @click="quantidadeInput('add')"
              >
                Adicionar
              </b-button>
              <b-button
                variant="danger"
                @click="quantidadeInput('remove')"
                v-show="qtd_inputs > 0"
              >
                Remover
              </b-button>
            </div>
            <hr />
            <div class="py-2">
              <b-button class="mr-2" variant="secondary" @click="voltar()"
                >Voltar</b-button
              >
              <b-button variant="success">Salvar</b-button>
            </div>
          </b-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Caracteristica} from '@/type/caracteristicas'

export default Vue.extend({
  components: {},
  data() {
    return {
      qtd_inputs: 0 as number,
      categoria: "" as string,
      tipos: [] as Array<string>,
    };
  },
  methods: {
    quantidadeInput(acao: string) {
      if (acao == "add") {
        this.qtd_inputs++;
      }
      if (acao == "remove") {
        if (this.qtd_inputs > 0) {
          this.qtd_inputs--;
        }
      }
    },
    voltar(): void {
      this.$router.push("/");
    },
  },
});
</script>

<style scoped>
.font {
  font-family: "Mulish", sans-serif;
}
</style>
