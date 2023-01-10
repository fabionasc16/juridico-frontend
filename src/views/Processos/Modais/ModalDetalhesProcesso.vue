<template>       
    <div>        
        <!-- CARD DE EDIÇÃO -->
            <div class="col-12"> 
                        <b-tabs content-class="mt-3">
                            <b-tab title="Processo" active>                                 
                                <ProcessoForm :tipo="tipo" :idProcesso="idProcesso" 
                                  @alterarTitulo="alterarTitulo" @listarProcesso="listarProcesso"
                                  @ocultarAbaReiteracao="ocultarAbaReiteracao"/> 
                            </b-tab>                          
                            <b-tab title="Reiteração" v-if="idProcesso && !ocultarReiteracao">
                                <reiteracoes :idProcesso="idProcesso" 
                                  :tipo="tipo"> </reiteracoes>
                            </b-tab>  
                        </b-tabs>
            </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import HeaderPage from '@/components/HeaderPage.vue';
import { mask } from "vue-the-mask";
import ProcessoForm from "./ProcessoForm.vue";
import Reiteracoes from "@/views/Processos/Reiteracoes.vue"

export default Vue.extend({
    directives: { mask },
    components: {
        HeaderPage,      
        ProcessoForm,
        Reiteracoes
    },
    mixins: [       
    
    ],
    props: {
        tipo: String,
        idProcesso: Number,
        idReiteracaoModal: Number
    }, 
    data() {
        return {  
            ocultarReiteracao: false                       
        }
    },
    mounted() {          
    }, 
            
    methods: { 
        alterarTitulo(title: string) {     
            this.$emit('alterarTitulo', 'Duplicar Processo') 
        },
        listarProcesso() {     
            this.$emit('listarProcesso') 
        },
        ocultarAbaReiteracao(){
            this.ocultarReiteracao = true
        }
    },   
});
</script>

<style scope>
.p0m0 {
    margin: 0;
    padding: 0;
}

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
