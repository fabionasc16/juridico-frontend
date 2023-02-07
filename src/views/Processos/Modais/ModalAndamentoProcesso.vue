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
                        <b-form-group append="m" class="font col-7 col-sm-7 col-md-7 col-lg-7"
                        >  
                            <label><b>Nº Procedimento:</b></label> 
                            {{numProcedimento}}
                        </b-form-group>
                    </div>                        
                    <div class="row"> 
                        <b-form-group class="font col-7 col-sm-7 col-md-7 col-lg-7">                            
                            <label>Status Processo:<span class="text-danger">*</span></label>
                            <v-select style="font-size: 0.85rem" 
                                :options="optionsStatusProcesso" class="font" label="desc_status"
                                        v-model="statusProcessoSelecionado" required 
                                        @input="alteraStatus"/>
                        </b-form-group>                           
                    </div>
                    <div class="row" v-if="exibirData">    
                        <div class="col-7" style="margin-bottom:-10px">    
                            <b-form-group class="font">                                
                                <label>Data Arquivamento SIGED: <span class="text-danger">*</span></label>
                                <b-form-input class="bordered margin-field" type="text" v-model="dataArquivamentoBR" placeholder="dd/mm/aaaa"
                                        v-mask="'##/##/####'"></b-form-input>                          
                            </b-form-group>
                        </div>  
                        <div class="col-12 mt-0">    
                            <b-form-group class="font">                   
                                <small>Após <b>arquivamento</b> não será possível editar processo.</small>
                            </b-form-group>
                        </div>                                                  
                    </div>       
                    <div class="row" v-if="statusProcessoSelecionado.id_status==statusDistribuido">
                        <b-form-group class="font col-sm-12 col-md-12 col-lg-12">  
                            <label>Responsável: <span class="text-danger">*</span></label>                                 
                            <v-select style="font-size: 0.85rem" :options="optionsResponsavel" class="font" label="nome_responsavel"
                                value="id_responsavel" v-model="responsavelSelecionado" required/>
                        </b-form-group>
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
import { Processo } from '@/type/processo';
import { StatusProcesso } from "@/type/statusProcesso";

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
    mixins: [        
        dataMixin,
    ],
    props: ["idProcesso", "numProcedimento"],
    data() {
        return {
            show: false as boolean, 
            isLoading: true as boolean,           
            Notificacao: [] as Array<Notificacao>,
            Message: [] as Array<Notificacao>,
            loading: false as boolean,
            alert: false as boolean,  
            form: {} as Processo,  
           // carregarForm: {} as Processo,  
            dataArquivamentoBR: "" as string,
            optionsStatusProcesso: [] as Array<String>, 
            statusProcessoSelecionado: {
                    desc_status: "Selecione" as string,
                    id_status: null as any,
            }, 
            perPageListagens:1000,    
            exibirData: false as boolean, 
            statusAtual: null as any,
            optionsResponsavel: [] as Array<string>,  
            responsavelSelecionado: {
                nome_responsavel: "Selecione" as string,
                id_responsavel: "" as string,
            }, 
            statusDistribuido: '11' as string,
            statusRecebido: '10' as string,
            statusArquivado: '14' as string,
            responsavelBD: null as any, //responsavel que vem diretamente no BD, antes do usuario alterar na tela
        }
    },    

    beforeMount() {
        this.isLoading = false
        this.carregarDados() 
        this.carregarStatusPrazo() 
        this.listarResponsaveis()         
    }, 
            
    methods: {         
        alteraStatus(): void {
            this.dataArquivamentoBR = ""
            this.form.dataArquivamento = ""
            this.statusProcessoSelecionado.id_status == this.statusArquivado ? this.exibirData = true : this.exibirData = false             
        },
        carregarDados(): void {       
            this.loading = true;          
            
            RestApiService.get("processos/id", this.idProcesso)
                .then((res: any) => {
                    this.form.numProcedimento = res.data.num_procedimento                   
                    this.form.idProcesso =   res.data.idProcesso               
                    this.form.dataArquivamento = res.data.dataArquivamento
                    this.form.idStatusProcesso = res.data.status.id_status
                    this.statusAtual = res.data.status.id_status
                    this.form.statusProcesso = res.data.status.desc_status

                    //formatar datas para formato br
                    this.dataArquivamentoBR = res.data.dataArquivamento ? 
                    dataMixin.methods.formatarDataBr(res.data.dataArquivamento) : "";
                    
                    this.responsavelSelecionado.id_responsavel = res.data.responsavel.id_responsavel
                    this.responsavelSelecionado.nome_responsavel = res.data.responsavel.nome_responsavel
                    this.responsavelBD = res.data.responsavel.id_responsavel

                    this.statusProcessoSelecionado.id_status = res.data.status.id_status
                    this.statusProcessoSelecionado.desc_status = res.data.status.desc_status
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
        carregarStatusProcesso(): void {
            this.loading = true   
        
                RestApiService.get(
                "status/aplicacaostatUs",
                `?aplicaA=PROCESSO`
                )
                .then((response: any) => {                
                this.optionsStatusProcesso = response.data                
                })
                .catch((e) => {          
                console.log(e)
                })
                .finally(() => {
                this.loading = false               
            })
        },   
        listarResponsaveis() { 
            let busca = {}
            RestApiService.post3("responsaveis/list", `?currentPage=1&perPage=300000`, busca)                        
                .then((response) => {                    
                    this.optionsResponsavel = response.data.data                    
                })                         
        },
        submit() {            
            let url = "processos/atualiza-status?idProcesso="+this.idProcesso;
            this.form.idProcesso = this.idProcesso
            
            this.loading = true  
           
            if (this.validarCampos()) {      
                                
                this.form.dataArquivamento = this.dataArquivamentoBR ? 
                   dataMixin.methods.dataFormatEn(this.dataArquivamentoBR) : "";
                
                this.form.idStatusProcesso = this.statusProcessoSelecionado.id_status  
           
                //Quando Distribuído
                if(this.form.idStatusProcesso == this.statusDistribuido){
                    this.form.idResponsavel = this.responsavelSelecionado.id_responsavel
                }else{
                    //enviar o responsável que já estava no BD
                    this.form.idResponsavel = this.responsavelBD
                }            
              
              RestApiService.patch(url, this.form )
                .then((res) => {                   
                        this.adicionarAlert(
                            "success",
                            "Atualização realizada com sucesso!"
                        );                                
                }) 
                .catch((e) => {
                    this.loading = false;

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
        carregarStatusPrazo(): void {
            this.loading = true   
                RestApiService.get(
                "status/aplicacaostatus",
                `?aplicaA=PROCESSO&currentPage=1&perPage=${this.perPageListagens}`
                )
                .then((response: any) => {        
                    this.optionsStatusProcesso = response.data                   
                })
                .catch((e) => {          
                    console.log(e)
                })
                .finally(() => {
                    this.loading = false               
                })
        },        

        validarCampos(): boolean {    
            this.Notificacao = [];           

            if(!this.statusProcessoSelecionado.id_status){
                this.adicionarNotificacao(
                "danger",
                "Campo Status Processo é obrigatório!"
                );
            }    

            if(this.statusAtual != this.statusRecebido && this.statusProcessoSelecionado.id_status == this.statusRecebido) {
                this.adicionarNotificacao(
                "danger",
                "Não é possível retornar ao status Recebido!"
                );
            }            
            
            if( this.statusProcessoSelecionado.id_status==this.statusArquivado && !this.dataArquivamentoBR){
                this.adicionarNotificacao(
                "danger",
                "Campo Data é obrigatório!"
                );
            }    
            
            if( this.statusProcessoSelecionado.id_status==this.statusDistribuido && !this.responsavelSelecionado){
                this.adicionarNotificacao(
                "danger",
                "Campo Responsável é obrigatório!"
                );
            }    

            if(this.dataArquivamentoBR && !dataMixin.methods.validarData(this.dataArquivamentoBR) ) {
                    this.adicionarNotificacao(
                        "danger",
                        "A data informada é inválida."
                    );
            }

            if (this.Notificacao.length > 0) {
                    this.loading = false;
                    //ir para o início da página onde aparecem as mensagens
                    window.scrollTo(0, 0);  

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
                this.$bvModal.hide('modal-andamento-processo')               
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
