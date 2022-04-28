<template>
  <div class="container-fluid">
    <div class="row py-3">
      <div class="col-12">
        <b-button variant="danger">Voltar</b-button>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <b-form >
          <b-form-group id="fieldset" label="Informe o nome da categoria" label-for="categoria">    
            <b-form-input id="categoria" v-model="categoria" />
          </b-form-group>

          <b-form-group id="fieldset2" label="Informe o(s) tipo(s) da categoria (adicione mais campos se achar necessário)" label-for="tipo"> 
            <div class="py-2" >
                <b-button class="mr-2" variant="primary" @click="quantidadeInput('add')">
                  Adicionar
                </b-button>
                <b-button variant="danger" @click="quantidadeInput('remove')" v-show="qtd_inputs>0">
                  Remover
                </b-button>
            </div>
            <b-form-input class="mb-2" v-model="tipos[0]"  :placeholder="'Tipo 1'" />  
            <b-form-input class="mb-2" v-model="tipos[i+1]" :placeholder="'Tipo '+(i+2) " v-for="(qtd, i) in qtd_inputs" :key="qtd" />
          </b-form-group>     

          <div class="text-center">
              <b-button variant="success">Salvar</b-button>
          </div>
        </b-form>
      </div>
    </div>

  
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Categoria, Tipo } from '@/type/caracteristicas'

export default Vue.extend({
  components: {  
  },
  data() {
      return {
          qtd_inputs: 0 as number,
          categoria: '' as Categoria,
          tipos: [] as Array<string> 
      }      
  },
  methods: {
      quantidadeInput(acao: string) {
        if(acao == 'add') {
          this.qtd_inputs++
        }
        if(acao == 'remove') {
          if(this.qtd_inputs > 0 ){
              this.qtd_inputs--
          }
        }
      }
  }
})
</script>
