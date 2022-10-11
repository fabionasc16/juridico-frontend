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
                       
                        <div class="col-6">   
                            <b-form-group class="font">                                
                                <label>Data: <span class="text-danger">*</span></label>
                                <b-form-input class="bordered margin-field" type="text" v-model="dataFeriadoBR" placeholder="dd/mm/aaaa"
                                        v-mask="'##/##/####'" :disabled="disabledAll" required></b-form-input>                          
                            </b-form-group>
                        </div>

                        <div class="col-6">   
                            <b-form-group label="Tipo:" class="font">
                                    <b-form-select v-model="form.tipoFeriado" :disabled="disabledAll">
                                        <b-form-select-option value="">-- Selecione --</b-form-select-option>
                                        <b-form-select-option v-for="option in optionsTipoFeriado" :value="option.value"
                                        :key="option.value"> {{ option.texto }}
                                        </b-form-select-option>                                
                                    </b-form-select>
                            </b-form-group> 
                        </div>      
                </div>

                <div class="row">
                        <div class="col-12">
                            <div class="row">
                                <b-form-group label="Descrição:" class="font col-sm-12 col-md-12 col-lg-12">
                                    <b-form-textarea rows="2" max-rows="2" v-model="form.descFeriado" :disabled="disabledAll"></b-form-textarea>
                                </b-form-group>
                            </div>
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
import DetalhesProcesso from "../../../components/DetalhesProcesso.vue";
import { Processo } from '@/type/processo';
import { CadastroFeriado } from "@/type/feriado";
import { TipoFeriadoSeeder } from "@/type/tipoFeriado";

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
            form: {} as CadastroFeriado,  
            carregarForm: {} as Processo,  
            dataFeriadoBR: "" as string,
            optionsTipoFeriado: TipoFeriadoSeeder,      
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
            let url = "feriados";

            this.loading = true  

            if (this.validarCampos()) { 

                this.form.dataFeriado = this.dataFeriadoBR ? 
                   dataMixin.methods.dataFormatEn(this.dataFeriadoBR) : "";

                 console.log('JSON: ',JSON.stringify(this.form))
            
              RestApiService.salvar(url, this.form, acao, this.form.id_feriado)
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
            
            RestApiService.get("feriado/listid", this.id)
                .then((res: any) => {

                this.form.id_feriado =   res.data.idProcesso 
                this.form.tipoFeriado =  res.data.idTipoFeriado
                this.form.dataFeriado = res.data.data
                this.form.descFeriado = res.data.descricao    

                //formatar datas para formato br
                this.dataFeriadoBR = res.data.data ? 
                   dataMixin.methods.formatarDataBr(res.data.data) : "";              
               
            })
            .catch((e) => {
                this.adicionarAlert(
                    "alert",
                    "Houve um erro ao carregar os dados do feriado. Tente novamente!"
                );
          
            })
            .finally(() => {
                this.loading = false;
            });
        },

        validarCampos(): boolean {     
            
            if(!this.dataFeriadoBR){
                this.adicionarNotificacao(
                "danger",
                "Campo Data é obrigatório!"
                );
            }

            if(!this.form.tipoFeriado){
                this.adicionarNotificacao(
                "danger",
                "Campo Tipo é obrigatório!"
                );
            }

            if(!this.form.descFeriado){
                this.adicionarNotificacao(
                "danger",
                "Campo Descrição é obrigatório!"
                );
            }

            if(this.dataFeriadoBR && !dataMixin.methods.validarData(this.dataFeriadoBR) ) {
                    this.adicionarNotificacao(
                        "danger",
                        "A data informada é inválida."
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
                this.$bvModal.hide('modal-cadastro-feriado')
                this.$bvModal.hide('modal-editar-feriado')
                this.$emit("listarFeriados");
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
