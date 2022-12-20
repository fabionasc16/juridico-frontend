<template>
    <div>        
            <div class="col-12">
                <b-form @submit.prevent="submit">
                                        
                    <notifications :notifications="Notificacao"></notifications>      

                    <div v-if="alert">
                        <ReturnMessage :message="Message" :fechaAlert="fechaAlert"></ReturnMessage>
                    </div>          

                    <div v-if="loading">
                        <LoadingSpinner></LoadingSpinner>
                    </div>
                    
                    <div class="row">
                       
                        <div class="col-10">   
                            <b-form-group class="font">                                
                                <label>Tipo de Processo: <span class="text-danger">*</span></label>
                                <b-form-input class="bordered margin-field" type="text" v-model="form.desc_tipoprocesso"
                                        :disabled="disabledAll" required></b-form-input>                          
                            </b-form-group>
                        </div>                      
                   </div>
                        
                    <div class="py-2 mt-10" align="right">                        
                       <slot name="buttons"></slot>
                       <b-button v-if="!disabledAll" class="bordered ml-2" type="submit" variant="success">Salvar</b-button>
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
import { TipoProcesso } from '@/type/tipoProcesso';

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
    },
    props: ["id", "tipo"],
    data() {
        return {
            disabledAll: false as boolean,
            show: false as boolean, 
            isLoading: true as boolean,           
            Notificacao: [] as Array<Notificacao>,
            Message: [] as Array<Notificacao>,
            loading: false as boolean,
            alert: false as boolean,  
            form: {} as TipoProcesso,  
        }
    },    

    mounted() {
        this.isLoading = false
    
        if(this.tipo == 'editar') {
            this.carregarDados();   
        }      

        if(this.tipo == 'visualizar'){
            this.carregarDados();  
            this.disabledAll = true; 
        }      
    }, 
            
    methods: {
        submit() {
            let acao = this.id ? "put" : "post"
            let url = "tipos-processo";

            this.loading = true  

            if (this.validarCampos()) { 

              console.log('JSON: ',JSON.stringify(this.form))
            
              RestApiService.salvar(url, this.form, acao, this.form.id_tipoprocesso)
                .then((res) => {
                    if (acao == "put") {
                        this.adicionarAlert(
                            "success",
                            "Atualização realizada com sucesso!"
                        );
                    } else {
                        this.adicionarAlert(
                            "success",
                            "Cadastro realizado com sucesso!"
                        );
                    }                   
                }) 
                .catch((e) => {
                        if (e.message === "Network Error") {
                            this.adicionarAlert(
                            "alert",
                            "Sem conexão de rede. Verifique sua conexão!"
                            );
                        } else if (
                            e &&
                            e.response &&
                            e.response.data &&
                            e.response.data.message
                        ) {
                            this.adicionarAlert(
                            "alert",
                            e.response.data.message
                            );                       
                        } else {
                            this.adicionarAlert(
                            "alert",
                            "Houve um erro ao salvar. Verifique o formulário e tente novamente!"
                            );                      
                        }              
                })
                .finally(() => {
                    this.loading = false;
                });

            }else{
                this.adicionarAlert(
                    "alert",
                    "Realize as validações exibidas no topo desta página!"
                );
            }                  
        },

        carregarDados(): void {
            this.loading = true;          
            
            RestApiService.get("tipos-processo/id", this.id)
                .then((res: any) => {                 
                this.form =  res.data                
            })
            .catch((e) => {
                this.adicionarAlert(
                    "alert",
                    "Houve um erro ao carregar os dados. Tente novamente!"
                );
          
            })
            .finally(() => {
                this.loading = false;
            });
        },

        validarCampos(): boolean {     
            
            if(!this.form.desc_tipoprocesso){
                this.adicionarNotificacao(
                "danger",
                "Campo Tipo de Processo é obrigatório!"
                );
            }          

            if (this.Notificacao.length > 0) {
                    this.loading = false;
                    //ir para o início da página onde aparecem as mensagens
                    window.scrollTo(0, 0);               

                    this.adicionarAlert(
                        "alert",
                        "Realize as validações exibidas no topo desta página!"
                    );

                    setTimeout(() => {
                    this.Notificacao = [];
                    }, 10000);
                    return false;
                } else {
                    return true;
            }
        },       

        adicionarAlert(tipo: string, mensagem: string): void {
            this.Message = []        
            this.Message.push({
                type: tipo,
                message: mensagem,
            });
            this.alert = true;
        },

        adicionarNotificacao(tipo: string, mensagem: string): void {
            this.Notificacao.push({
                type: tipo,
                message: mensagem,
            });
        },

        fechaAlert(): void {
            this.alert = false;
            
             if(this.Message[0].type == 'success') {
                this.$bvModal.hide('modal-cadastro-tipoprocesso')
                this.$bvModal.hide('modal-editar-tipoprocesso')
                this.$emit("listarTiposProcesso");
             }
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
