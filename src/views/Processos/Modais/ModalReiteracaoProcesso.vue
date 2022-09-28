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
                      <!--  <detalhes-processo  ref='formDetalhes' />    -->
                        <reiteracao-processo ref='formReiteracao'/>
                    </div>                                 
                        
                    <div class="py-2 mt-10" align="right">                        
                       <slot name="buttons"></slot>
                       <b-button class="bordered ml-2" type="submit" variant="success">Salvar</b-button>
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
import ReiteracaoProcesso from "../../../components/ReiteracaoProcesso.vue";


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
    ReiteracaoProcesso
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
            formDadosProcesso: {} as any,  
            formDadosReiteracao: {} as any,  
            carregarForm: {} as Processo,  
        }
    },    

    mounted() {
        this.isLoading = false
        //pega os dados do componente filho (detalhes do processo)
        this.formDadosProcesso = this.$refs.formDetalhes
        this.formDadosReiteracao = this.$refs.formReiteracao

           /* const path = this.$route.path;
            const acao = "/editar";

            if (path.includes(acao)) {
                this.carregarDados();            
            }*/

        this.carregarDadosProcesso();   
        this.carregarDadosReiteracao();            
    
    }, 
            
    methods: {
        submit() {
            let acao = this.id ? "put" : "post"
            let url = this.id ? "processo/update" : "processo";

            //pegar todos os valores já para armazenar
            this.formDadosReiteracao.getValues()           

            if (this.validarCampos()) { 

              console.log('JSON: ',JSON.stringify(this.formDadosReiteracao.form))
              
              this.loading = true  
            
              RestApiService.salvar(url, this.formDadosReiteracao.form, acao)
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

        carregarDadosProcesso(): void {
            this.loading = true;

            //this.formDados.form.objeto = 'abc'
            //console.log('carregar: ',this.formDados.form )
            
            
            RestApiService.get("processo/listid", this.id)
                .then((res: any) => {

                this.formDadosProcesso.form.idProcesso =   res.data.idProcesso 
                this.formDadosProcesso.form.numProcedimento = res.data.numProcedimento
                this.formDadosProcesso.form.idTipoProcesso =  res.data.idTipoProcesso
                this.formDadosProcesso.form.prazoTotal = res.data.prazoTotal
                this.formDadosProcesso.form.idOrgaoDemandante = res.data.orgaoSelecionado.value
                this.formDadosProcesso.form.dataProcesso = res.data.dataProcesso
                this.formDadosProcesso.form.dataRecebimento = res.data.dataRecebimento
                this.formDadosProcesso.form.horaRecebimento =  res.data.horaRecebimento
                this.formDadosProcesso.form.idAssunto =  res.data.value
                this.formDadosProcesso.form.idClassificacao = res.data.idClassificacao
                this.formDadosProcesso.form.objeto =  res.data.objeto
                this.formDadosProcesso.form.requerSIGED = res.data.requerSIGED
                this.formDadosProcesso.form.numProcessoSIGED = res.data.numProcessoSIGED
                this.formDadosProcesso.form.dataProcessoSIGED = res.data.dataProcessoSIGED
                this.formDadosProcesso.form.permanenciaSIGED = res.data.permanenciaSIGED
                this.formDadosProcesso.form.caixaAtualSIGED =  res.data.caixaAtualSIGED
                this.formDadosProcesso.form.tramitacaoSIGED =  res.data.tramitacaoSIGED
                this.formDadosProcesso.form.idResponsavel = res.data.value
                this.formDadosProcesso.form.descricao = res.data.descricao
                this.formDadosProcesso.form.dataLimitePrazo =  res.data.dataLimitePrazo
                this.formDadosProcesso.form.diasPercorridos =  res.data.diasPercorridos
                this.formDadosProcesso.form.diasExpirados = res.data.diasExpirados
                this.formDadosProcesso.form.statusPrazo =  res.data.statusPrazo
                this.formDadosProcesso.form.statusProcesso = res.data.statusProcesso
                this.formDadosProcesso.form.sigiloso = res.data.sigiloso
                this.formDadosProcesso.form.observacao = res.data.observacao    
                
                //formatar datas para formato br
                this.formDadosProcesso.formatDatasEnToBr()
            })
            .catch((e) => {
              /*  this.adicionarAlert(
                    "alert",
                    "Houve um erro ao carregar os dados. Tente novamente!"
                );*/
          
            })
            .finally(() => {
                this.loading = false;
            });
        },

        carregarDadosReiteracao(): void {
            this.loading = true;         
            
            RestApiService.get("reiteracao/listid", this.id)
                .then((res: any) => {

                this.formDadosReiteracao.form.idProcesso =   res.data.idProcesso 
                this.formDadosReiteracao.form.numProcedimento = res.data.numProcedimento        
                this.formDadosReiteracao.form.prazoTotal = res.data.prazoTotal            
                this.formDadosReiteracao.form.dataProcesso = res.data.dataProcesso
                this.formDadosReiteracao.form.dataRecebimento = res.data.dataRecebimento
                this.formDadosReiteracao.form.horaRecebimento =  res.data.horaRecebimento                
                this.formDadosReiteracao.form.numProcessoSIGED = res.data.numProcessoSIGED              
                this.formDadosReiteracao.form.reiteracao = res.data.reiteracao
                this.formDadosReiteracao.form.dataLimitePrazo =  res.data.dataLimitePrazo              
                this.formDadosReiteracao.form.statusPrazo =  res.data.statusPrazo  
                
                //formatar datas para formato br
                this.formDadosReiteracao.formatDatasEnToBr()
            })
            .catch((e) => {
              /*  this.adicionarAlert(
                    "alert",
                    "Houve um erro ao carregar os dados. Tente novamente!"
                );*/
          
            })
            .finally(() => {
                this.loading = false;
            });
        },

        validarCampos(): boolean {

            if (!this.formDadosReiteracao.form.numProcedimento) {
                this.adicionarNotificacao(
                "danger",
                "Nº Procedimento é obrigatório!"
                );
            }

           if(!this.formDadosReiteracao.form.prazoTotal){
                this.adicionarNotificacao(
                "danger",
                "Prazo Total é obrigatório!"
                );
            }             
         
            if(!this.formDadosReiteracao.validarDataProcesso()){
                this.adicionarNotificacao(
                "danger",
                "Data do Processo informada é inválida!"
                );
            }

            if(!this.formDadosReiteracao.validarDataRecebimento()){
                this.adicionarNotificacao(
                "danger",
                "Data do Recebimento informada é inválida!"
                );
            }  
            
            if(!this.formDadosReiteracao.validarDataFinalLimite()){
                this.adicionarNotificacao(
                "danger",
                "Data Final Limite informada é inválida!"
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
