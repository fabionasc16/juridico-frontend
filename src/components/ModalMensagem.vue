<template>
    <div>
      <b-modal id="modal-mensagem" :title="title" hide-footer>
        <p class="my-4">{{pergunta}}</p>

        <b-button @click="$bvModal.hide('modal-mensagem')" class="mr-2">Fechar</b-button>
        <slot name="buttons"></slot>      
      </b-modal>
    </div>
</template>

<script lang="ts">

import Vue from "vue";

export default Vue.extend({

    props: ['pergunta', 'title'],     

    methods: { 

    }

});

</script>
