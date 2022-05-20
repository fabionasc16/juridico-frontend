<template>
    <div>
        <header-page titulo="Consulta de Processos" descricao="Módulo de busca dos processos cadastrados no sistema"/>
        <form-consulta></form-consulta>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import HeaderPage from '@/components/HeaderPage.vue'
import FormConsulta from './FormConsulta.vue'
export default Vue.extend({
    components:{
        HeaderPage,
        FormConsulta
    }
})
</script>
<style scoped>
</style>