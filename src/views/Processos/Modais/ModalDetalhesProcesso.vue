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
                    
                    <!--<b-form-group class="titulo m-0 p-0" label="Informações de entrada do processo" label-size="lg">
                        <hr />
                    </b-form-group>-->

                    <div v-show="!isLoading"> 
                        
                        <b-tabs content-class="mt-3">
                            <b-tab title="Processo" active> 
                                <div class="py-2 mt-10" align="right">                         
                                    <b-button class="bordered ml-2 mr-2 btn-sm" type="button" 
                                    variant="primary" v-if="!formDados.disabledAll && tipo == 'editar' && !opcaoDuplicar"
                                    @click="duplicar()">Duplicar</b-button>                                                         
                                </div>   
                                <detalhes-processo  ref='formDetalhes' />                               
                            
                                <div class="py-2 mt-10" align="right">                                                 
                                    <slot name="buttons"></slot>
                                    <b-button class="bordered ml-2" type="submit" variant="success" 
                                    v-if="!formDados.disabledAll">Salvar</b-button>                                               
                                </div> 
                            </b-tab>
                          
                            <b-tab title="Reiteração" v-if="idProcesso && !opcaoDuplicar">
                                <reiteracoes :idProcesso="idProcesso" :tipo="tipo"> </reiteracoes>
                            </b-tab>                          
                        </b-tabs>                      
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

import Reiteracoes from "@/views/Processos/Reiteracoes.vue"

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
        Reiteracoes
    },
    mixins: [        
        dataMixin,
    ],
    props: {
    tipo: String,
    idProcesso: Number,
    idReiteracaoModal: Number
    },
    data() {
        return {
            show: false as boolean,           
            isLoading: true as boolean,           
            Notificacao: [] as Array<Notificacao>,
            Message: [] as Array<Notificacao>,
            loading: false as boolean,
            alert: false as boolean,  
            formDados: {} as any,  
            carregarForm: {} as Processo,
            buttonDisabled: false as boolean,    
            opcaoDuplicar: false as boolean,               
        }
    },
    mounted() {
        this.isLoading = false

        //pega os dados do componente filho (detalhes do processo)
        this.formDados = this.$refs.formDetalhes   
        
       // console.log("> ",this.formDados)

        if(this.tipo == 'visualizar') {
            this.formDados.disabledAll = true
            this.buttonDisabled = true
            this.carregarDados();
            return;
        }       

        if(this.tipo == 'editar') {           
            this.carregarDados();   
        }       
    }, 
            
    methods: {
        duplicar() {          
            this.formDados =  this.$refs.formDetalhes                             
            this.formDados.limparDadosAoDuplicar()    
            this.formDados.ocultarCampoSIGED()       
            this.opcaoDuplicar = true  
            this.$emit('alterarTitulo', 'Duplicar Processo') 
        },
        submit() {            
            //pegar todos os valores já para armazenar
            this.formDados.getValues() 

            let acao = (!this.idProcesso || this.opcaoDuplicar) ? "post" : "put"
            let url ="processos"

            if(acao == 'post') {
                this.formDados.form.statusProcesso = 10 
                this.formDados.form.statusPrazo = "TESTE APAGAR" //apagar quando André deixar padrão               
            }

     
            if (this.validarCampos()) { 

              console.log('JSON: ',JSON.stringify(this.formDados.form))
              
              this.loading = true  
            
              RestApiService.salvar(url, this.formDados.form, acao, this.idProcesso)
                .then((res) => {
                    if(this.opcaoDuplicar) {
                        this.adicionarAlert(
                            "success",
                            "Registro duplicado com sucesso!"
                        );
                    }
                    else if (acao == "put") {
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

            //this.formDados.form.objeto = 'abc'
            //console.log('carregar: ',this.formDados.form )           
            
            RestApiService.get("processos/id", this.idProcesso)
                .then((res: any) => {

                //console.log("edit",res.data)

                this.formDados.form.idProcesso =   res.data.id_processo                
                this.formDados.form.numProcedimento = res.data.num_procedimento
                this.formDados.form.idTipoProcesso =  res.data.fk_tipoprocesso
                this.formDados.form.prazoTotal = res.data.prazo_total
                
                this.formDados.form.idOrgaoDemandante = res.data.fk_orgaodemandante
                this.formDados.form.idAssunto =  res.data.fk_assunto
                this.formDados.form.idResponsavel = res.data.fk_responsavel

                this.formDados.insereSelectOrgaoDemandante(res.data.orgaoDemandante)
                this.formDados.insereSelectAssunto(res.data.assunto)
                this.formDados.insereSelectResponsavel(res.data.responsavel)

                this.formDados.form.dataProcesso = res.data.data_processo
                this.formDados.form.dataRecebimento = res.data.data_recebimento
                this.formDados.form.horaRecebimento =  res.data.hora_recebimento
               
                this.formDados.form.idClassificacao = res.data.fk_classificacao
                this.formDados.form.objeto =  res.data.objeto
                this.formDados.form.requerSIGED = res.data.requer_siged
                this.formDados.form.numProcessoSIGED = res.data.numero_siged
                this.formDados.form.dataProcessoSIGED = res.data.data_processo_siged
                this.formDados.form.permanenciaSIGED = res.data.permanencia_siged
                this.formDados.form.caixaAtualSIGED =  res.data.caixa_atual_siged
                this.formDados.form.tramitacaoSIGED =  res.data.tramitacao_siged              
                this.formDados.form.descricao = res.data.descricao
                this.formDados.form.dataLimitePrazo =  res.data.dia_limite_prazo
                this.formDados.form.diasPercorridos =  res.data.dias_percorridos
                this.formDados.form.diasExpirados = res.data.dias_expirados
                // this.formDados.form.statusPrazo =  res.data.status_prazo
                // this.formDados.form.statusProcesso = res.data.fk_status
                this.formDados.form.sigiloso = res.data.sigiloso
                this.formDados.form.observacao = res.data.observacao    

                this.formDados.form.valorMulta = res.data.valor_multa

                this.formDados.form.sigiloso =                    
                   (res.data.sigiloso && res.data.sigiloso=='S' ? true : false)

                this.formDados.form.requerSIGED =                    
                (res.data.requer_siged && res.data.requer_siged=='S' ? true : false)

                this.formDados.exibirRegistroSIGED = 
                (res.data.requer_siged && res.data.requer_siged=='S' ? true : false)
                
                //formatar datas para formato br
                this.formDados.formatDatasEnToBr()
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

            if (!this.formDados.form.numProcedimento) {
                this.adicionarNotificacao(
                "danger",
                "Nº Procedimento é obrigatório!"
                );
            }

           if(!this.formDados.form.prazoTotal){
                this.adicionarNotificacao(
                "danger",
                "Prazo Total é obrigatório!"
                );
            }

              if(this.formDados.form.requerSIGED === true && !this.formDados.form.numProcessoSIGED){
                this.adicionarNotificacao(
                "danger",
                "Nº SIGED é obrigatório quando o campo 'Requer SIGED' for selecionado!"
                );
            }
         
            if(!this.formDados.validarDataProcesso()){
                this.adicionarNotificacao(
                "danger",
                "Data do Processo informada é inválida!"
                );
            }

            if(!this.formDados.validarDataRecebimento()){
                this.adicionarNotificacao(
                "danger",
                "Data do Recebimento informada é inválida!"
                );
            }  
            
            if(!this.formDados.validarDataFinalLimite()){
                this.adicionarNotificacao(
                "danger",
                "Data Final Limite informada é inválida!"
                );
            }   
            
            if(this.formDados.form.dataRecebimento < this.formDados.form.dataProcesso){
                this.adicionarNotificacao(
                "danger",
                "Data de Recebimento não pode ser menor que a data do processo!"
                );
            }  
                      
            if(this.formDados.form.dataLimitePrazo && (this.formDados.form.dataLimitePrazo < this.formDados.form.dataProcesso)){
                this.adicionarNotificacao(
                "danger",
                "Data Final Limite não pode ser menor que a data do processo!"
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
                this.$bvModal.hide('modal-cadastro-processo')
                this.$bvModal.hide('modal-editar-processo')
                this.$emit("listarProcesso");
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
