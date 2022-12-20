<template>
    <div class="col-12">

        <notifications :notifications="Notificacao"></notifications>      

        <div v-if="alert">
            <ReturnMessage :message="Message" :fechaAlert="fechaAlert"></ReturnMessage>
        </div>         
       
        <div v-if="loading">
            <LoadingSpinner></LoadingSpinner>
        </div>    

     <b-form @submit.prevent="submit">
       
            <div class="py-2 mt-10" align="right">                         
                                    <b-button class="bordered ml-2 mr-2 btn-sm" type="button" 
                                    variant="primary" v-if="!disabledAll && tipo == 'editar' && !opcaoDuplicar"
                                    @click="duplicar()">Duplicar</b-button>                                                        
                                </div>   

            <div class="row">
                <b-form-group class="font col-sm-5 col-md-5 col-lg-6">
                    <label>Nº Procedimento: <span class="text-danger">*</span></label>
                    <b-form-input type="text" v-model="form.numProcedimento" required
                        placeholder="Procedimento/Expediente" autofocus :disabled="disabledAll"></b-form-input>                             
                </b-form-group>                         

                <b-form-group class="font col-sm-4 col-md-4 col-lg-6">
                    <label>Tipo Processo: <span class="text-danger">*</span></label>
                    <v-select style="font-size: 0.85rem" :options="optionsTipoProcesso" class="font" label="desc_tipoprocesso"
                                v-model="tipoProcessoSelecionado" :disabled="disabledAll" required/>
                </b-form-group>                  
            </div>

            <div class="row">
                <b-form-group class="font col-sm-5 col-md-5 col-lg-8">                            
                    <label>Órgão Demandante: <span class="text-danger">*</span></label>
                    <v-select style="font-size: 0.85rem" :options="optionsOrgaos" class="font" label="orgao_demandante"
                                v-model="orgaoSelecionado" :disabled="disabledAll" required/>
                </b-form-group>   

                <b-form-group label="Valor Multa:" class="font col-sm-4 col-md-4 col-lg-4">
                    <vue-numeric currency="R$" separator="." :precision='precision' class="form-control bordered margin-field" 
                    prefix="R$" v-model="form.valorMulta" :allow-clear="allowclear" :disabled="disabledAll"
                    placeholder="R$ 0,00"></vue-numeric>                
                </b-form-group>                  
            </div>

            <div class="row">   
                <b-form-group class="font col-sm-3 col-md-3 col-lg-3">
                    <label>Data do Processo: <span class="text-danger">*</span></label>
                    <b-form-input class="bordered margin-field" type="data" v-model="datas.dataProcessoBR" placeholder="dd/mm/aaaa"
                        v-mask="'##/##/####'" :disabled="disabledAll" required></b-form-input>                          
                </b-form-group> 

                <b-form-group class="font col-sm-3 col-md-3 col-lg-3">
                    <label>Data Recebimento: <span class="text-danger">*</span></label>
                    <b-form-input class="bordered margin-field" type="text" v-model="datas.dataRecebimentoBR" placeholder="dd/mm/aaaa"
                        v-mask="'##/##/####'" :disabled="disabledAll" required></b-form-input>                          
                </b-form-group>

                <b-form-group class="font col-sm-3 col-md-3 col-lg-3">
                    <label>Hora Recebimento: <span class="text-danger">*</span></label>
                    <b-form-input type="time" v-model="form.horaRecebimento" :disabled="disabledAll" required></b-form-input>
                </b-form-group>

                <b-form-group class="font col-sm-3 col-md-3 col-lg-3">
                    <label>Prazo total: <span class="text-danger">*</span>                              

                    </label>
                    <b-form-input type="text" v-model="form.prazoTotal" required
                    v-mask="'######'" 
                    placeholder="" :disabled="disabledAll"></b-form-input>                
                </b-form-group>

                <b-form-group class="font col-sm-6 col-md-6 col-lg-3">
                    <b-form-checkbox v-model="form.diasCorridos" switch :disabled="disabledAll"
                        class="font">Dias corridos
                    </b-form-checkbox> 
                </b-form-group>

                <b-form-group label="Data Final Limite:" class="font col-sm-3 col-md-3 col-lg-3">
                    <b-form-input class="bordered margin-field" type="text" v-model="datas.dataLimitePrazoBR" placeholder="dd/mm/aaaa"
                        v-mask="'##/##/####'" disabled ></b-form-input>                          
                </b-form-group>                                    
            </div>

            <div class="row">
                <b-form-group class="font col-sm-7 col-md-7 col-lg-7">   
                        <label>Assunto: <span class="text-danger">*</span></label>   
                        <v-select style="font-size: 0.85rem" :options="optionsAssunto" class="font" label="desc_assunto"
                                v-model="assuntoSelecionado" :disabled="disabledAll" required/>
                </b-form-group>                       

                <b-form-group class="font col-sm-5 col-md-5 col-lg-5">                            
                    <label>Classificação: <span class="text-danger">*</span></label> 
                    <v-select style="font-size: 0.85rem" :options="optionsClassificacao" class="font" label="desc_classificacao"
                                v-model="classificacaoSelecionada" :disabled="disabledAll" required/>
                </b-form-group>  
            </div>

            <div class="row">
                <div class="col-7">
                    <div class="row">
                        <b-form-group class="font col-sm-12 col-md-12 col-lg-12">
                            <label>Objeto: <span class="text-danger">*</span></label>
                            <b-form-textarea rows="2" max-rows="2" v-model="form.objeto" :disabled="disabledAll" required></b-form-textarea>
                        </b-form-group>
                    </div>
                    <div class="row">
                        <b-form-group class="font col-sm-12 col-md-12 col-lg-12">  
                            <label>Responsável: <span class="text-danger">*</span></label>                                 
                            <v-select style="font-size: 0.85rem" :options="optionsResponsavel" class="font" label="nome_responsavel"
                                value="id_responsavel" v-model="responsavelSelecionado" :disabled="disabledAll" required/>
                        </b-form-group>
                    </div>
                    <div class="row">
                        <b-form-group class="font col-sm-12 col-md-12 col-lg-12">
                            <label>Descrição: <span class="text-danger">*</span></label>        
                            <b-form-textarea rows="4" max-rows="4" v-model="form.descricao" 
                                :disabled="disabledAll" required></b-form-textarea>
                        </b-form-group>
                    </div>                            
                        <div class="row">
                            <b-form-group label="Observação:" class="font col-sm-12 col-md-12 col-lg-12">
                                <b-form-textarea rows="4" max-rows="2" v-model="form.observacao" :disabled="disabledAll"></b-form-textarea>
                            </b-form-group>
                        </div>                           
                </div>


                <!-- ÁREA DO SIGED -->
                <div class="col-5">
                        <div class="row mb-3">
                        <b-form-checkbox switch :disabled="disabledAll"
                        v-model="form.sigiloso"                       
                        name="check-sigiloso"                              
                            class="font col-sm-12 col-md-12 col-lg-12">Processo sigiloso?
                        </b-form-checkbox>
                        </div> <!-- v-model="sigiloso"
                         :value="true"
                        :unchecked-value="false" -->

                    <div class="row">
                        <b-form-checkbox v-model="form.requerSIGED" @change="exibirCampoSIGED()" switch :disabled="disabledAll"
                            class="mt-2  font col-sm-2 col-md-2 col-lg-2">Requer SIGED
                        </b-form-checkbox>                                                            
                    </div>

                    <div class="row">
                        <b-form-group label="" class="ml-4 mt-2 mb-0 font col-sm-11 col-md-11 col-lg-11"
                            v-show="exibirRegistroSIGED">
                            <b-form-input :placeholder="'Nº SIGED'" type="text" v-model="form.numProcessoSIGED"                                     
                            @blur="buscarDadosSiged"  v-mask="'##.##.######.######/####-##'"
                            :disabled="disabledAll">                           
                            </b-form-input> <!--v-mask="'######/####-##'"-->

                            <b-alert variant="danger" :show="showMessageSiged">{{messageSiged}}</b-alert>
                        
                        </b-form-group>
                    </div>

                    <div class="row">                              
                        <h5 class="mt-3">Dados do SIGED:</h5>
                            <hr />

                        <div class="col-12">
                            <div class="row">                                     
                                <b-form-group label="Data Processo:" class="font col-sm-12 col-md-12 col-lg-12">
                                    <b-form-input disabled v-model="datas.dataProcessoSIGEDBR"
                                    placeholder="dd/mm/aaaa">
                                    </b-form-input>
                                </b-form-group>  

                                <b-form-group label="Permanência (dias):" class="font col-sm-12 col-md-12 col-lg-12">
                                    <b-form-input disabled type="text" v-model="form.permanenciaSIGED">
                                    </b-form-input>
                                </b-form-group>
                            </div>
                            <div class="row">
                                <b-form-group label="Caixa Atual:" class="font col-sm-12 col-md-12 col-lg-12">
                                    <b-form-input disabled type="text" v-model="form.caixaAtualSIGED"></b-form-input>
                                </b-form-group>

                                <b-form-group label="Tramitação:" class="font col-sm-12 col-md-12 col-lg-12">
                                    <b-form-input disabled type="text" v-model="form.tramitacaoSIGED"></b-form-input>
                                </b-form-group>
                            </div>

                        </div>
                    </div>                          

                </div>
            </div>      
            <div class="py-2 mt-10" align="right">                                                 
                                    <slot name="buttons"></slot>
                                    <b-button class="bordered ml-2" type="submit" variant="success" 
                                    v-if="!disabledAll" >Salvar</b-button>                                               
            </div>  
    </b-form>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mask } from "vue-the-mask";
import { BIconSearch, BIconPlusCircle, BIconInfoCircle, BIconJournalPlus } from 'bootstrap-vue'
import { Processo } from '@/type/processo';
import VueNumeric from 'vue-numeric'
Vue.use(VueNumeric)
import RestApiService from "@/services/rest/service";
import Notifications from "@/components/Notifications.vue";
import { Notificacao } from "@/type/notificacao";
import dataMixin from "@/mixins/dataMixin";
import prazoMixin from "@/mixins/prazoMixin";
import ReturnMessage from "@/components/ReturnMessage.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default Vue.extend({
    directives: { mask },
    components: {       
        BIconSearch,
        BIconJournalPlus,
        BIconPlusCircle,
        BIconInfoCircle, 
        VueNumeric,  
        Notifications,    
        ReturnMessage,
        LoadingSpinner  
    },
    mixins: [        
        dataMixin,
        prazoMixin
    ],    
    props: {
    tipo: String,
    idProcesso: Number,
    idReiteracaoModal: Number
    },
    data() {
        return {            
            show: false as boolean,
            showMessageSiged: false as boolean,
            messageSiged: "" as string,
            currentPage: 1 as number,
            disabledAll: false as boolean,
            exibirMaisDetalhes: false as boolean,
            exibirRegistroPrazo: false as boolean,
            exibirRegistroSIGED: false as boolean, 
            optionsTipoProcesso: [] as Array<string>,    
            optionsOrgaos: [] as Array<string>, 
            optionsAssunto: [] as Array<string>,    
            optionsClassificacao: [] as Array<string>,   
            optionsResponsavel: [] as Array<string>,    
            perPageListagens:30000,
            responsavelSelecionado: {
                    nome_responsavel: "Selecione" as string,
                    id_responsavel: "" as string,
            },  
            orgaoSelecionado: {
                    orgao_demandante: "Selecione" as string,
                    id_orgao: null as any,
            }, 
            tipoProcessoSelecionado: {
                desc_tipoprocesso: "Selecione" as string,
                id_tipoprocesso: null as any,
            },     
            classificacaoSelecionada: {
                desc_classificacao: "Selecione" as string,
                id_classificacao: null as any,
            },             
            assuntoSelecionado: {
                    desc_assunto: "Selecione" as string,
                    id_assunto: "" as string,
            },    
            datas: {
                dataProcessoBR: "" as string,
                dataRecebimentoBR: "" as string,
                dataLimitePrazoBR: "" as string,
                dataProcessoSIGEDBR: "" as string,
            },           
            form: {} as Processo,     
                
            //para o campo valor multa
            allowclear: true as boolean,
            precision: 2 as number,

            isLoading: true as boolean,         
            buttonDisabled: false as boolean, 
            opcaoDuplicar: false as boolean,    
            Notificacao: [] as Array<Notificacao>,
            Message: [] as Array<Notificacao>,
            loading: false as boolean,
            alert: false as boolean,  
        }       
    },  

    mounted(){
        this.isLoading = false
     
        if(this.tipo == 'visualizar') {
            this.disabledAll = true
            this.buttonDisabled = true
            this.carregarDados();
            return;
        }       

        if(this.tipo == 'editar') {           
            this.carregarDados();   
        }     

        this.listarOrgaos()
        this.listarAssuntos()
        this.listarTipoProcesso()
        this.listarClassificacoes()
        this.listarResponsaveis()        
        
        if(!this.form.idTipoProcesso){
            this.form.idTipoProcesso = ""
        }

        if(!this.form.idClassificacao){
            this.form.idClassificacao = ""
        }
        
    },
    methods: {   
        duplicar() {                 
            this.limparDadosAoDuplicar()    
            this.ocultarCampoSIGED()       
            this.opcaoDuplicar = true  
            this.$emit('alterarTitulo', 'Duplicar Processo') 
            this.$emit('ocultarAbaReiteracao')
        },
        limparDadosAoDuplicar(){     
            this.form.numProcessoSIGED = ""   
            this.datas.dataProcessoSIGEDBR = ""
            this.form.permanenciaSIGED = ""
            this.form.caixaAtualSIGED = ""
            this.form.tramitacaoSIGED = ""

            this.form.numProcedimento = ""
           
            this.exibirRegistroSIGED = false
  
            //acao para atualizar dados na tela
            this.form.requerSIGED = true
            this.exibirCampoSIGED()
            this.form.requerSIGED = false
            this.exibirCampoSIGED()
        },
        carregarDados(): void {
            this.loading = true;

            //this.formDados.form.objeto = 'abc'
            //console.log('carregar: ',this.formDados.form )           
            
            RestApiService.get("processos/id", this.idProcesso)
                .then((res: any) => {               

                this.form.idProcesso =   res.data.id_processo                
                this.form.numProcedimento = res.data.num_procedimento              
                this.form.prazoTotal = res.data.prazo_total
                
                this.form.idOrgaoDemandante = res.data.fk_orgaodemandante
                this.form.idAssunto =  res.data.fk_assunto
                this.form.idResponsavel = res.data.fk_responsavel
                this.form.idTipoProcesso =  res.data.fk_tipoprocesso
                this.form.idClassificacao = res.data.fk_classificacao

                this.insereSelectOrgaoDemandante(res.data.orgaoDemandante)
                this.insereSelectAssunto(res.data.assunto)
                this.insereSelectResponsavel(res.data.responsavel)
                this.insereSelectTipoProcesso(res.data.tipoProcesso)
                this.insereSelectClassificacao(res.data.classificacao)

                this.form.dataProcesso = res.data.data_processo
                this.form.dataRecebimento = res.data.data_recebimento
                this.form.horaRecebimento =  res.data.hora_recebimento
                              
                this.form.objeto =  res.data.objeto
                this.form.requerSIGED = res.data.requer_siged
                this.form.numProcessoSIGED = res.data.numero_siged
                this.form.dataProcessoSIGED = res.data.data_processo_siged
                this.form.permanenciaSIGED = res.data.permanencia_siged
                this.form.caixaAtualSIGED =  res.data.caixa_atual_siged
                this.form.tramitacaoSIGED =  res.data.tramitacao_siged              
                this.form.descricao = res.data.descricao
                this.form.dataLimitePrazo =  res.data.dia_limite_prazo
                this.form.diasPercorridos =  res.data.dias_percorridos
                this.form.diasExpirados = res.data.dias_expirados
                // this.formDados.form.statusPrazo =  res.data.status_prazo
                // this.formDados.form.statusProcesso = res.data.fk_status

                this.form.diasCorridos = res.data.diasCorridos

                this.form.sigiloso = res.data.sigiloso
                this.form.observacao = res.data.observacao    

                this.form.valorMulta = res.data.valor_multa

                this.form.diasCorridos =                    
                   (res.data.diasCorridos && res.data.diasCorridos=='S' ? true : false)   

                /*this.formDados.form.sigiloso =                    
                   (res.data.sigiloso && res.data.sigiloso=='S' ? true : false)*/

                   this.form.sigiloso =                    
                   (res.data.sigiloso && res.data.sigiloso=='S' ? true : false)

                this.form.requerSIGED =                    
                (res.data.requer_siged && res.data.requer_siged=='S' ? true : false)

                this.exibirRegistroSIGED = 
                (res.data.requer_siged && res.data.requer_siged=='S' ? true : false)
                
                //formatar datas para formato br
                this.formatDatasEnToBr()
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
        submit() {     
            
            //pegar todos os valores já para armazenar
            this.getValues() 

            let acao = (!this.idProcesso || this.opcaoDuplicar) ? "post" : "put"
            let url ="processos"

            if(acao == 'post') {
                this.form.statusProcesso = 10 //recebido                            
            }

            this.form.statusPrazo = ""+prazoMixin.methods.statusPrazo(Number(this.form.prazoTotal))

             if (this.validarCampos()) {          
              
              this.loading = true  
            
              RestApiService.salvar(url, this.form, acao, this.idProcesso)
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
        validarCampos(): boolean {

        if (!this.form.numProcedimento) {
            this.adicionarNotificacao(
            "danger",
            "Nº Procedimento é obrigatório!"
            );
        }

        if(!this.form.prazoTotal){
            this.adicionarNotificacao(
            "danger",
            "Prazo Total é obrigatório!"
            );
        }

        if(this.form.requerSIGED === true && !this.form.numProcessoSIGED){
            this.adicionarNotificacao(
            "danger",
            "Nº SIGED é obrigatório quando o campo 'Requer SIGED' for selecionado!"
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

        if(!this.validarDataFinalLimite()){
            this.adicionarNotificacao(
            "danger",
            "Data Final Limite informada é inválida!"
            );
        }   

        if(this.form.dataRecebimento < this.form.dataProcesso){
            this.adicionarNotificacao(
            "danger",
            "Data de Recebimento não pode ser menor que a data do processo!"
            );
        }  
                
        if(this.form.dataLimitePrazo && (this.form.dataLimitePrazo < this.form.dataProcesso)){
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

        buscarDadosSiged(){ 
            
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

        },        
        listarOrgaos(){

            RestApiService.get(
                "orgaos-demandantes",
                `?currentPage=1&perPage=${this.perPageListagens}`
            )
            .then((response) => {
                this.optionsOrgaos = response.data.data                  
            })
            .catch((e) => {
                // alert("Houve um erro ao carregar listagem")
            })
            
        },
        listarAssuntos(){

            RestApiService.get(
                "assuntos",
                `?currentPage=1&perPage=${this.perPageListagens}`
            )            
            .then((response) => {
                this.optionsAssunto = response.data.data                   
            })
            .catch((e) => {
                // alert("Houve um erro ao carregar listagem")
            })
            
        },
        listarTipoProcesso(){
            
              RestApiService.get(
                "tipos-processo",
                `?currentPage=1&perPage=${this.perPageListagens}`
                )
                .then((response) => {
                    this.optionsTipoProcesso = response.data.data                   
                })
                .catch((e) => {
                  // alert("Houve um erro ao carregar listagem")
                })
            
        },
        listarClassificacoes() {

             RestApiService.get(
                "classificacoes",
                `?currentPage=1&perPage=${this.perPageListagens}`
                )            
                .then((response) => {
                    this.optionsClassificacao = response.data.data                    
                })
                .catch((e) => {
                  // alert("Houve um erro ao carregar listagem")
                })           
        },
        listarResponsaveis() {            

            let busca = {}

            RestApiService.post("responsaveis/list?currentPage=1&perPage=30000", busca)             
                .then((response) => {                    
                    this.optionsResponsavel = response.data.data                    
                })
                .catch((e) => {
                  // alert("Houve um erro ao carregar listagem")
                })           
        },
        formatDatasBrToEn() {
            this.form.dataProcesso = this.datas.dataProcessoBR ? 
                   dataMixin.methods.dataFormatEn(this.datas.dataProcessoBR) : "";

            this.form.dataRecebimento = this.datas.dataRecebimentoBR ? 
                   dataMixin.methods.dataFormatEn(this.datas.dataRecebimentoBR) : ""; 

            this.form.dataLimitePrazo = this.datas.dataLimitePrazoBR ? 
            dataMixin.methods.dataFormatEn(this.datas.dataLimitePrazoBR) : ""; 

             this.form.dataProcessoSIGED = this.datas.dataProcessoSIGEDBR ? 
            dataMixin.methods.dataFormatEn(this.datas.dataProcessoSIGEDBR) : ""; 
        },

        formatDatasEnToBr() {
            this.datas.dataProcessoBR = this.form.dataProcesso ? 
                   dataMixin.methods.formatarDataBr(this.form.dataProcesso) : "";

            this.datas.dataRecebimentoBR = this.form.dataRecebimento ? 
                   dataMixin.methods.formatarDataBr(this.form.dataRecebimento) : "";

            this.datas.dataLimitePrazoBR = this.form.dataLimitePrazo ? 
                   dataMixin.methods.formatarDataBr(this.form.dataLimitePrazo) : "";

            this.datas.dataProcessoSIGEDBR = this.form.dataProcessoSIGED ? 
            dataMixin.methods.formatarDataBr(this.form.dataProcessoSIGED) : ""; 
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

        validarDataFinalLimite(){
             if(this.datas.dataLimitePrazoBR && !dataMixin.methods.validarData(this.datas.dataLimitePrazoBR) ) {
                 return false
             }
             return true
        },     

        //pegar valores para mandar na request
        getValues() {
                this.formatDatasBrToEn()               

                this.form.idProcesso =   this.form.idProcesso ? this.form.idProcesso : ""
                this.form.numProcedimento = this.form.numProcedimento ? this.form.numProcedimento: ""               
                this.form.prazoTotal =  this.form.prazoTotal ? this.form.prazoTotal : ""
                this.form.diasCorridos = this.form.diasCorridos ? this.form.diasCorridos: false               
                this.form.dataProcesso = this.form.dataProcesso ? this.form.dataProcesso: ""
                this.form.dataRecebimento = this.form.dataRecebimento ? this.form.dataRecebimento: ""
                this.form.horaRecebimento =  this.form.horaRecebimento ? this.form.horaRecebimento  : ""
                                         
                this.form.objeto =  this.form.objeto ? this.form.objeto : ""
                this.form.requerSIGED =  this.form.requerSIGED ? this.form.requerSIGED: false
                this.form.numProcessoSIGED = this.form.numProcessoSIGED ? this.form.numProcessoSIGED: ""
                this.form.dataProcessoSIGED = this.form.dataProcessoSIGED ?  this.form.dataProcessoSIGED : ""
                this.form.permanenciaSIGED = this.form.permanenciaSIGED ? ""+this.form.permanenciaSIGED: ""
                this.form.caixaAtualSIGED =  this.form.caixaAtualSIGED ?  this.form.caixaAtualSIGED : ""
                this.form.tramitacaoSIGED =  this.form.tramitacaoSIGED ? this.form.tramitacaoSIGED : ""

                this.form.idResponsavel = this.responsavelSelecionado && this.responsavelSelecionado.id_responsavel ? this.responsavelSelecionado.id_responsavel : ""
                this.form.descricao = this.form.descricao ?  this.form.descricao: ""
                this.form.dataLimitePrazo =  this.form.dataLimitePrazo? this.form.dataLimitePrazo: ""
                this.form.diasPercorridos =  this.form.diasPercorridos ? this.form.diasPercorridos: ""
                this.form.diasExpirados = this.form.diasExpirados ? this.form.diasExpirados: ""
                this.form.statusPrazo =  this.form.statusPrazo ?  this.form.statusPrazo: ""
                               
                this.form.sigiloso = this.form.sigiloso ? this.form.sigiloso: false                  
                this.form.valorMulta = this.form.valorMulta ? this.form.valorMulta: 0 
               
                this.form.idOrgaoDemandante = this.orgaoSelecionado && this.orgaoSelecionado.id_orgao ? this.orgaoSelecionado.id_orgao : null
                this.form.idTipoProcesso = this.tipoProcessoSelecionado && this.tipoProcessoSelecionado.id_tipoprocesso ? this.tipoProcessoSelecionado.id_tipoprocesso : null
                this.form.idClassificacao = this.classificacaoSelecionada && this.classificacaoSelecionada.id_classificacao ? this.classificacaoSelecionada.id_classificacao : null
                this.form.idAssunto =  this.assuntoSelecionado && this.assuntoSelecionado.id_assunto ? this.assuntoSelecionado.id_assunto : ""    
                this.form.statusProcesso = this.form.statusProcesso ? this.form.statusProcesso : ""
                this.form.observacao = this.form.observacao ? this.form.observacao: ""                
            
        },

        //inserir valores no vue-select
        insereSelectOrgaoDemandante(orgao: any): void {
            this.orgaoSelecionado.id_orgao = orgao.id_orgao
            this.orgaoSelecionado.orgao_demandante = orgao.orgao_demandante
        },

        insereSelectClassificacao(classificacao: any): void {
            this.classificacaoSelecionada.id_classificacao = classificacao.id_classificacao
            this.classificacaoSelecionada.desc_classificacao = classificacao.desc_classificacao
        },


        insereSelectTipoProcesso(tipoProcesso: any): void {
            this.tipoProcessoSelecionado.id_tipoprocesso = tipoProcesso.id_tipoprocesso
            this.tipoProcessoSelecionado.desc_tipoprocesso = tipoProcesso.desc_tipoprocesso
        },

        insereSelectAssunto(assunto: any): void {
            this.assuntoSelecionado.id_assunto = assunto.id_assunto
            this.assuntoSelecionado.desc_assunto = assunto.desc_assunto
        },

        insereSelectResponsavel(responsavel: any): void {
            this.responsavelSelecionado.id_responsavel = responsavel.id_responsavel
            this.responsavelSelecionado.nome_responsavel = responsavel.nome_responsavel
        },
        

        exibirCampoSIGED(): void {
            if (
                this.form.requerSIGED === true
            ) {
                this.exibirRegistroSIGED = true;
            } else {
                this.exibirRegistroSIGED = false;
                this.limparDadosSIGED()
            }
        },     
        
        ocultarCampoSIGED(): void {           
            this.exibirRegistroSIGED = false;
        },   
        
        limparDadosSIGED(){     
            this.form.numProcessoSIGED = ""   
            this.datas.dataProcessoSIGEDBR = ""
            this.form.permanenciaSIGED = ""
            this.form.caixaAtualSIGED = ""
            this.form.tramitacaoSIGED = "" 
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
