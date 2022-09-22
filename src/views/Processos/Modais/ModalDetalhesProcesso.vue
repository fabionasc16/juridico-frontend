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
                                         
                    <!--<template class="py-2 mt-10" align="right">  -->
                        
                    <template>  
                        <!--<b-button class="mr-3" @click="$bvModal.hide('modal-detalhes-processo')">Fechar</b-button>  -->
                     <!--  <slot name="buttons"></slot>-->
                       <b-button class="bordered" type="submit" variant="success">Salvar</b-button>
                    </template>

                
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
            carregarForm: {} as Processo,  
        }
    },    

    mounted() {
        this.isLoading = false
        //pega os dados do componente filho (detalhes do processo)
        this.formDados = this.$refs.formDetalhes

           /* const path = this.$route.path;
            const acao = "/editar";

            if (path.includes(acao)) {
                this.carregarDados();            
            }*/

        this.carregarDados();            
    
    }, 
            
    methods: {
        submit() {
            let acao = this.id ? "put" : "post"
            let url = this.id ? "processo/update" : "processo";

            //pegar todos os valores já para armazenar
            this.formDados.getValues()           

            if (this.validarCampos()) { 

              console.log('JSON: ',JSON.stringify(this.formDados.form))
              
              this.loading = true  
            
              RestApiService.salvar(url, this.formDados.form, acao)
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

            //this.formDados.form.objeto = 'abc'
            //console.log('carregar: ',this.formDados.form )
            
            
            RestApiService.get("processo/listid", this.id)
                .then((res: any) => {

                this.formDados.form.idProcesso =   res.data.idProcesso 
                this.formDados.form.numProcedimento = res.data.numProcedimento
                this.formDados.form.idTipoProcesso =  res.data.idTipoProcesso
                this.formDados.form.prazoTotal = res.data.prazoTotal
                this.formDados.form.idOrgaoDemandante = res.data.orgaoSelecionado.value
                this.formDados.form.dataProcesso = res.data.dataProcesso
                this.formDados.form.dataRecebimento = res.data.dataRecebimento
                this.formDados.form.horaRecebimento =  res.data.horaRecebimento
                this.formDados.form.idAssunto =  res.data.value
                this.formDados.form.idClassificacao = res.data.idClassificacao
                this.formDados.form.objeto =  res.data.objeto
                this.formDados.form.requerSIGED = res.data.requerSIGED
                this.formDados.form.numProcessoSIGED = res.data.numProcessoSIGED
                this.formDados.form.dataProcessoSIGED = res.data.dataProcessoSIGED
                this.formDados.form.permanenciaSIGED = res.data.permanenciaSIGED
                this.formDados.form.caixaAtualSIGED =  res.data.caixaAtualSIGED
                this.formDados.form.tramitacaoSIGED =  res.data.tramitacaoSIGED
                this.formDados.form.idResponsavel = res.data.value
                this.formDados.form.descricao = res.data.descricao
                this.formDados.form.dataLimitePrazo =  res.data.dataLimitePrazo
                this.formDados.form.diasPercorridos =  res.data.diasPercorridos
                this.formDados.form.diasExpirados = res.data.diasExpirados
                this.formDados.form.statusPrazo =  res.data.statusPrazo
                this.formDados.form.statusProcesso = res.data.statusProcesso
                this.formDados.form.sigiloso = res.data.sigiloso
                this.formDados.form.observacao = res.data.observacao    
                
                //formatar datas para formato br
                this.formDados.formatDatasEnToBr()
            })
            .catch((e) => {
              /*  this.adicionarAlert(
                    "alert",
                    "Houve um erro ao carregar os dados do paciente. Tente novamente!"
                );*/
          
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
