<template>
    <div>
      <b-modal id="modal-excluir" title="Excluir">
        <p class="my-4">Deseja excluir {{pergunta}}?</p>
      </b-modal>
    </div>
</template>

<script lang="ts">

import Vue from "vue";

export default Vue.extend({

    props: ['pergunta'],
     

    methods: {     
        
    }

});

</script>
