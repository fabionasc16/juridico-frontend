<template>
    <div>
        <!-- CARD DE EDIÇÃO -->
            <div class="col-12">
                <b-form @submit.prevent="submit">
                                        
                    <notifications :notifications="Notificacao"></notifications>      

                    <div v-if="alert">
                        <ReturnMessage :message="Message" :fechaAlert="fechaAlert"></ReturnMessage>
                    </div>          

                    <div v-if="loading">
                        <LoadingSpinner></LoadingSpinner>
                    </div>
                    
                    <b-form-group class="titulo m-0 p-0" label="Informações de entrada do processo" label-size="lg">
                        <hr />
                    </b-form-group>

                        <div v-show="!isLoading"> 
                            <detalhes-processo  ref='formDetalhes' />       
                        </div>
                                 
                     
                    
            <div class="py-2 mt-3" align="right">     
                <b-button class="mr-3" @click="$bvModal.hide('modal-detalhes-processo')">Fechar</b-button>  
                <b-button class="bordered" type="submit" variant="success">Salvar</b-button>
            </div>

                </b-form>
            </div>

    </div>
</template>

<script lang="ts">
import Vue from "vue";
import HeaderPage from '@/components/HeaderPage.vue';
import { mask } from "vue-the-mask";
import Notifications from "@/components/Notifications.vue";
import { BIconSearch, BIconPlusCircle, BIconInfoCircle, BIconJournalPlus } from 'bootstrap-vue'
import { Notificacao } from "@/type/notificacao";
import ReturnMessage from "@/components/ReturnMessage.vue";
import dataMixin from "@/mixins/dataMixin";
import RestApiService from "@/services/rest/service";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import DetalhesProcesso from "../../../components/DetalhesProcesso.vue";



export default Vue.extend({
    directives: { mask },
    components: {
        HeaderPage,
        BIconSearch,
        BIconJournalPlus,
        BIconPlusCircle,
        BIconInfoCircle,
        Notifications,
        ReturnMessage,
        LoadingSpinner,
        DetalhesProcesso,
    },
    mixins: [        
        dataMixin,
    ],
    props: ["id"],
    data() {
        return {
            show: false as boolean, 
            isLoading: true as boolean,           
            Notificacao: [] as Array<Notificacao>,
            Message: [] as Array<Notificacao>,
            loading: false as boolean,
            alert: false as boolean,  
            formDados: {} as any,
            //form: {} as Processo,           
                   
        }
    },  

   /* methods: {
        submit() {

             console.log(this.$refs.meuForm);
            //console.log(this.optionsOrgaos)
        }
    }*/

    mounted() {
        this.isLoading = false
        console.log(this.$refs.formDetalhes);
        this.formDados = this.$refs.formDetalhes
      /*  this.$nextTick(() => {
          
        });*/
    },
    
       
    methods: {
        submit() {
            let acao = this.id ? "put" : "post"
            let url = this.id ? "processo/update" : "processo";

            console.log(this.formDados.form)

            // console.log(this.$refs.formDetalhes);

         //    console.log(this.$refs.formDetalhes[`form`]);
            
          //  this.formDados = this.$refs.formDetalhes
             

            //pegar o id do responsavel selecionado   
          //  this.formDados.responsavel = this.formDados.responsavelSelecionado.value   

     //       this.form.responsavel = this.responsavelSelecionado.value   

                  

        },
 
       

       
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
