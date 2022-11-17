<template>
    <div>
        <!-- CARD DE CADASTRO -->
        <div class="card">
            <div class="col-12">

                  <notifications :notifications="Notificacao"></notifications>      

                    <div v-if="alert">
                        <ReturnMessage :message="Message" :fechaAlert="fechaAlert"></ReturnMessage>
                    </div>          

                    <div v-if="loading">
                        <LoadingSpinner></LoadingSpinner>
                    </div>

                <b-form @submit.prevent="submit">                   

                    <!-- 1ª LINHA (CPF + NOME) -->
                    <div class="col-10">   
                            <b-form-group class="font">                                
                                <label>Classificação: <span class="text-danger">*</span></label>
                                <b-form-input class="bordered margin-field" type="text" v-model="form.descClassificacao"
                                        :disabled="disabledAll" required></b-form-input>                          
                            </b-form-group>
                        </div>                 

                    <div class="py-2 mt-10" align="right">                        
                       <slot name="buttons"></slot>
                       <b-button v-if="!disabledAll" class="bordered ml-2" type="submit" variant="success">Salvar</b-button>
                    </div>

                </b-form>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import Vue from "vue";
import HeaderPage from '@/components/HeaderPage.vue';
import { mask } from "vue-the-mask";
import Notifications from "@/components/Notifications.vue";
import { BIconSearch, BIconPlusCircle, BIconInfoCircle, BIconJournalPlus } from 'bootstrap-vue'
import { Classificacao } from '@/type/classificacao';1
import { Notificacao } from "@/type/notificacao";1
import ReturnMessage from "@/components/ReturnMessage.vue";1
import RestApiService from "@/services/rest/service";1
import LoadingSpinner from "@/components/LoadingSpinner.vue";1
import DetalhesProcesso from "@/components/DetalhesProcesso.vue";

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
        DetalhesProcesso
    },
    props: ['id', 'tipo'],
    data() {
        return {
            disabledAll: false as boolean,
            rows: 100,
            currentPage: 1,
            stickyHeader: true as boolean,
            noCollapse: true as boolean,
            show: false as boolean,
            form: {} as Classificacao,      
            Notificacao: [] as Array<Notificacao>,
            Message: [] as Array<Notificacao>,
            loading: false as boolean,
            alert: false as boolean,     
            isLoading: false as boolean,
        };
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
            let url = "classificacoes";       
                                            
            if (this.validarCampos()) { 

              console.log('JSON: ',JSON.stringify(this.form))
              
              this.loading = true
            
              RestApiService.salvar(url, this.form, acao, this.form.id_classificacao)
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
            
            RestApiService.get("classificacoes/id", this.id)
                .then((res: any) => {                 
                this.form.descClassificacao =  res.data.desc_classificacao               
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
            this.Notificacao = [];

            if (!this.form.descClassificacao) {
                this.adicionarNotificacao(
                "danger",
                "Campo Classificação é obrigatório!"
                );
            }          
          
            if (this.Notificacao.length > 0) {
                //ir para o início da página onde aparecem as mensagens
                window.scrollTo(0, 0);               

                this.adicionarAlert(
                    "alert",
                     "Realize as validações exibidas no topo desta página!"
                );

                setTimeout(() => {
                this.Notificacao = [];
                }, 5000);
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
                this.$bvModal.hide('modal-cadastro-classificacao')
                this.$bvModal.hide('modal-editar-classificacao')
                this.$emit("listarClassificacao");
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
