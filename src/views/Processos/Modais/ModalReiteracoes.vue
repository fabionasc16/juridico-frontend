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

                    <div style="background-color: #e5e4e2;">
                    <div class="p-3">                       
                    
                        <div class="row">
                                <b-form-group class="font col-sm-6 col-md-6 col-lg-6">
                                    <label>Nº Procedimento: <span class="text-danger">*</span></label>
                                    <b-form-input type="text" v-model="form.numeroProcedimento" required
                                    placeholder="Procedimento/Expediente" title="Procedimento/Expediente"
                                    :disabled="disabledAll"></b-form-input>                             
                                </b-form-group>     
                                
                                <b-form-group class="font col-sm-3 col-md-3 col-lg-3">
                                    <label>Data do Processo: <span class="text-danger">*</span></label>
                                    <b-form-input class="bordered margin-field" type="text" v-model="datas.dataProcessoBR" 
                                    placeholder="dd/mm/aaaa"
                                    :disabled="disabledAll"
                                     v-mask="'##/##/####'" required></b-form-input>                          
                                </b-form-group>

                                <b-form-group class="font col-sm-3 col-md-3 col-lg-3">
                                    <label>Prazo total: <span class="text-danger">*</span></label>
                                    <b-form-input type="number" v-model="form.prazoProcesso" required                                   
                                    placeholder="em dias úteis" :disabled="disabledAll"></b-form-input>
                                </b-form-group>                               
                            </div>

                            <div class="row">    
                                <b-form-group label="Nº SIGED" class="font col-sm-6 col-md-6 col-lg-6">
                                            <b-form-input :placeholder="'Nº SIGED'" type="text" v-model="form.numeroSIGED"
                                            v-mask="'##.##.######.######/####-##'" :disabled="disabledAll">
                                            </b-form-input>
                                </b-form-group> <!-- @blur="buscarDadosSiged" -->                                     
                                <b-form-group class="font col-sm-3 col-md-3 col-lg-3">
                                    <label>Data Recebimento: <span class="text-danger">*</span></label>
                                    <b-form-input class="bordered margin-field" type="text" v-model="datas.dataRecebimentoBR" placeholder="dd/mm/aaaa"
                                        v-mask="'##/##/####'" required :disabled="disabledAll"></b-form-input>                          
                                </b-form-group>
                                <b-form-group class="font col-sm-3 col-md-3 col-lg-3">
                                    <label>Hora Recebimento: <span class="text-danger">*</span></label>
                                    <b-form-input type="time" v-model="form.horaRecebimento" required :disabled="disabledAll"></b-form-input>
                                </b-form-group>                               
                            </div>                  

                            <div class="row">
                                <div class="col-12">
                                    <div class="row">
                                        <b-form-group label="Reiteração:" class="font col-sm-12 col-md-12 col-lg-12">
                                            <b-form-textarea rows="3" max-rows="4" v-model="form.reiteracao" :disabled="disabledAll"></b-form-textarea>
                                        </b-form-group>
                                    </div>                            
                                </div> 
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

    </div>
</template>

<script lang="ts">
import Vue from "vue";
import HeaderPage from '@/components/HeaderPage.vue';
import { mask } from "vue-the-mask";
import dataMixin from "@/mixins/dataMixin";

import Notifications from "@/components/Notifications.vue";
import { Notificacao } from "@/type/notificacao";
import ReturnMessage from "@/components/ReturnMessage.vue";
import RestApiService from "@/services/rest/service";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ValidarCpfMixin from "@/mixins/validarCpfMixin";

import { Reiteracao } from '@/type/reiteracao';
import VueNumeric from 'vue-numeric'
Vue.use(VueNumeric)


export default Vue.extend({
    directives: { mask },
    mixins: [ValidarCpfMixin, dataMixin],
    components: {
        HeaderPage,      
        Notifications,
        ReturnMessage,
        LoadingSpinner,
        VueNumeric
    },
    props: ['idProcesso', 'idReiteracao', 'tipo'],    
    data() {
        return {
            disabledAll: false as boolean,
            rows: 100,
            currentPage: 1,
            stickyHeader: true as boolean,
            noCollapse: true as boolean,
            show: false as boolean,
           
            Notificacao: [] as Array<Notificacao>,
            Message: [] as Array<Notificacao>,
            loading: false as boolean,
            alert: false as boolean,     
            isLoading: false as boolean,

            datas: {
                dataProcessoBR: "" as string,
                dataRecebimentoBR: "" as string,
            },           
            form: {} as Reiteracao, 
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
        formatDatasBrToEn() {
            this.form.dataProcesso = this.datas.dataProcessoBR ? 
                   dataMixin.methods.dataFormatEn(this.datas.dataProcessoBR) : "";

            this.form.dataRecebimento = this.datas.dataRecebimentoBR ? 
                   dataMixin.methods.dataFormatEn(this.datas.dataRecebimentoBR) : ""; 
           
        },

        formatDatasEnToBr() {
            this.datas.dataProcessoBR = this.form.dataProcesso ? 
                   dataMixin.methods.formatarDataBr(this.form.dataProcesso) : "";

            this.datas.dataRecebimentoBR = this.form.dataRecebimento ? 
                   dataMixin.methods.formatarDataBr(this.form.dataRecebimento) : "";
          
        },

        validarDataProcesso(){
             if(this.datas.dataProcessoBR && !dataMixin.methods.validarData(this.datas.dataProcessoBR) ) {
                 return false
             }
             return true
        },

        validarDataRecebimento(){
             if(this.datas.dataRecebimentoBR && !dataMixin.methods.validarData(this.datas.dataRecebimentoBR) ) {
                 return false
             }
             return true
        },

        /*buscarDadosSiged(){ 
            
            if(!this.form.numProcessoSIGED){
                 this.datas.dataProcessoSIGEDBR = ""
                 this.form.permanenciaSIGED = ""
                 this.form.caixaAtualSIGED = ""
                 this.form.tramitacaoSIGED = ""
                 this.messageSiged=""
                 this.showMessageSiged = false
            }
            else{ 
                 RestApiService.buscarProcessoSiged(this.form.numProcessoSIGED)
                 .then((response) => { 
                             this.datas.dataProcessoSIGEDBR = response.data.dataProcesso ? 
                                 dataMixin.methods.formatarDataBr(response.data.dataProcesso) : "";  
                             this.form.permanenciaSIGED = response.data.tempoPermanencia
                             this.form.caixaAtualSIGED = response.data.caixaAtual
                             this.form.tramitacaoSIGED = response.data.eventoTramitacao
                         })
                         .catch((e) => {
                            this.showMessageSiged = true                           
                            this.messageSiged= 'Ocorreu um erro ao buscar dados do SIGED.'
                            
                            console.log( e.message )
                 })
            }
 
         }, */

       
        //pegar valores para mandar na request
        /*getValues() {
                this.formatDatasBrToEn()               

                this.form.idProcesso =   this.form.idProcesso ? this.form.idProcesso : ""
                this.form.numProcedimento = this.form.numProcedimento ? this.form.numProcedimento: ""               
                this.form.prazoTotal =  this.form.prazoTotal ? this.form.prazoTotal : ""               
                this.form.dataProcesso = this.form.dataProcesso ? this.form.dataProcesso: ""
                this.form.dataRecebimento = this.form.dataRecebimento ? this.form.dataRecebimento: ""
                this.form.horaRecebimento =  this.form.horaRecebimento ? this.form.horaRecebimento  : "" 
                this.form.numProcessoSIGED = this.form.numProcessoSIGED ? this.form.numProcessoSIGED: ""
             
               
                this.form.reiteracao = this.form.reiteracao ?  this.form.reiteracao: ""
                this.form.dataLimitePrazo =  this.form.dataLimitePrazo? this.form.dataLimitePrazo: ""
                
                this.form.statusPrazo =  this.form.statusPrazo ?  this.form.statusPrazo: ""
                //this.form.statusProcesso = this.form.statusProcesso ? this.form.statusProcesso : ""                          
            
        },*/




       //Antes *********
         submit() {
            let acao = this.idReiteracao ? "put" : "post"
            let url = "reiteracoes";    
            
            this.form.idStatus = 15 //Ativo
            this.form.idProcesso = this.idProcesso
            this.form.prazoProcesso = Number(this.form.prazoProcesso)      

            this.form.dataProcesso = this.datas.dataProcessoBR ? 
                   dataMixin.methods.dataFormatEn(this.datas.dataProcessoBR) : "";

            this.form.dataRecebimento = this.datas.dataRecebimentoBR ? 
                   dataMixin.methods.dataFormatEn(this.datas.dataRecebimentoBR) : "";
                                                   
            if (this.validarCampos()) { 

              console.log('JSON: ',JSON.stringify(this.form))            
              
              this.loading = true  
            
              RestApiService.salvar(url, this.form, acao, this.idReiteracao)
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

            }             
        },

        carregarDados(): void {
            this.loading = true;       
                        
            RestApiService.get("reiteracoes/id", this.idReiteracao)
                .then((res: any) => {          

                this.form.numeroProcedimento = res.data.num_procedimento
                this.form.dataProcesso = res.data.data_processo
                this.form.prazoProcesso = res.data.prazo
                this.form.numeroSIGED = res.data.numero_siged
                this.form.reiteracao = res.data.reiteracao  

                this.form.dataRecebimento = res.data.data_recebimento
                this.form.horaRecebimento = res.data.hora_recebimento
               
                this.datas.dataProcessoBR = res.data.data_processo ? dataMixin.methods.formatarDataBr(res.data.data_processo) : ''
                this.datas.dataRecebimentoBR = res.data.data_recebimento ? dataMixin.methods.formatarDataBr(res.data.data_recebimento) : ''              
               
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

            if (!this.form.numeroProcedimento) {
                this.adicionarNotificacao(
                "danger",
                "Campo Nº Procedimento é obrigatório!"
                );
            }

            if (!this.form.prazoProcesso) {
                this.adicionarNotificacao(
                "danger",
                "Campo Prazo total é obrigatório!"
                );
            }

            if (!this.form.dataProcesso) {
                this.adicionarNotificacao(
                "danger",
                "Campo Data do Processo é obrigatório!"
                );
            }

            if (!this.form.dataRecebimento) {
                this.adicionarNotificacao(
                "danger",
                "Campo Data Recebimento é obrigatório!"
                );
            }

            if (!this.form.horaRecebimento) {
                this.adicionarNotificacao(
                "danger",
                "Campo Hora Recebimento é obrigatório!"
                );
            }          

            if(!this.validarDataProcesso()){
                this.adicionarNotificacao(
                "danger",
                "Data do Processo informada é inválida!"
                );
            }

            if(!this.validarDataRecebimento()){
                this.adicionarNotificacao(
                "danger",
                "Data do Recebimento informada é inválida!"
                );
            }  

            if(this.form.dataRecebimento < this.form.dataProcesso){
                this.adicionarNotificacao(
                "danger",
                "Data de Recebimento não pode ser menor que a data do processo!"
                );
            }                   
          
            if (this.Notificacao.length > 0) {
                //ir para o início da página onde aparecem as mensagens
                window.scrollTo(0, 0);               

                /*this.adicionarAlert(
                    "alert",
                     "Realize as validações exibidas no topo desta página!"
                );*/

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
                this.$bvModal.hide('modal-cadastro-reiteracao')
                this.$bvModal.hide('modal-editar-reiteracao')
                this.$emit("listarReiteracoes");
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
