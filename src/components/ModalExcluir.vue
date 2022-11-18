<template>
    <div>
      <b-modal id="modal-excluir" title="Excluir" hide-footer>
        <p class="my-4">Deseja excluir {{pergunta}}?</p>

        <b-button @click="$bvModal.hide('modal-excluir')" class="mr-2">Fechar</b-button>
        <slot name="buttons"></slot>
        <!--<b-button @click="excluir()">Excluir</b-button>-->
      </b-modal>
    </div>
</template>

<script lang="ts">

import Vue from "vue";

export default Vue.extend({

    props: ['pergunta'],     

    methods: {     
      /* excluir(): void {    
        //Chama o metodo do componente pai
        this.$emit('excluir')
      },*/

    }

});

</script>
