<template>
    <div>
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
                <b-form-group class="font col-sm-6 col-md-6 col-lg-6">
                        <label>Nº Procedimento: <span class="text-danger">*</span></label>
                        <b-form-input type="text" v-model="form.numProcedimento" required
                            placeholder="Procedimento/Expediente" autofocus :disabled="disabledAll"></b-form-input>                             
                </b-form-group>  
                <b-form-group class="font col-sm-6 col-md-6 col-lg-6">
                        <label>Tipo Processo: <span class="text-danger">*</span></label>
                        <v-select style="font-size: 0.85rem" :options="optionsTipoProcesso" class="font" label="desc_tipoprocesso"
                                    v-model="tipoProcessoSelecionado" :disabled="disabledAll" required/>
                </b-form-group>    
            </div>

            <div class="row">
                <b-form-group class="font col-sm-6 col-md-7 col-lg-8">                            
                    <label>Órgão Demandante: <span class="text-danger">*</span></label>
                    <v-select style="font-size: 0.85rem" :options="optionsOrgaos" class="font" label="orgao_demandante"
                                v-model="orgaoSelecionado" :disabled="disabledAll" required/>
                </b-form-group> 
                <b-form-group label="Valor Multa:" class="font col-sm-6 col-md-5 col-lg-4">
                    <vue-numeric currency="R$" separator="." :precision='precision' class="form-control bordered margin-field" 
                    prefix="R$" v-model="form.valorMulta" :allow-clear="allowclear" :disabled="disabledAll"
                    placeholder="R$ 0,00"></vue-numeric>                
                </b-form-group>     
            </div>

            <div class="row">   
                <b-form-group class="font col-sm-6 col-md-6 col-lg-3">
                    <label>Data do Processo: <span class="text-danger">*</span></label>
                    <b-form-input class="bordered margin-field" v-model="datas.dataProcessoBR" placeholder="dd/mm/aaaa"
                     v-mask="'##/##/####'" :disabled="disabledAll" required></b-form-input>                          
                </b-form-group> 
                <b-form-group class="font col-sm-6 col-md-6 col-lg-3">
                    <label>Data Recebimento: <span class="text-danger">*</span></label>
                    <b-form-input class="bordered margin-field" v-model="datas.dataRecebimentoBR" placeholder="dd/mm/aaaa"
                        v-mask="'##/##/####'" :disabled="disabledAll" required></b-form-input>                          
                </b-form-group>
                <b-form-group class="font col-sm-6 col-md-6 col-lg-3">
                    <label>Hora Recebimento: <span class="text-danger">*</span></label>
                    <b-form-input type="time" v-model="form.horaRecebimento" :disabled="disabledAll" required></b-form-input>
                </b-form-group>
                <b-form-group class="font col-sm-6 col-md-6 col-lg-3">
                    <label>Prazo total: <span class="text-danger">*</span></label>
                    <b-form-input type="text" v-model="form.prazoTotal" required
                    v-mask="'######'" 
                    placeholder="" :disabled="disabledAll"></b-form-input>                
                </b-form-group>
                <b-form-group class="font col-sm-6 col-md-6 col-lg-3">
                    <b-form-checkbox v-model="form.diasCorridos" switch :disabled="disabledAll"
                        class="font">Dias corridos
                    </b-form-checkbox> 
                </b-form-group>
                <b-form-group label="Data Final Limite:" class="font col-sm-6 col-md-6 col-lg-3">
                    <b-form-input class="bordered margin-field" type="text" v-model="datas.dataLimitePrazoBR" placeholder="dd/mm/aaaa"
                        v-mask="'##/##/####'" disabled ></b-form-input>                          
                </b-form-group>            
            </div>

            <div class="row">
                <b-form-group class="font col-sm-6 col-md-7 col-lg-7">   
                        <label>Assunto: <span class="text-danger">*</span></label>   
                        <v-select style="font-size: 0.85rem" :options="optionsAssunto" class="font" label="desc_assunto"
                                v-model="assuntoSelecionado" :disabled="disabledAll" required/>
                </b-form-group>                       

                <b-form-group class="font col-sm-6 col-md-5 col-lg-5">                            
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
                            <b-form-textarea rows="2" max-rows="2" v-model="form.objetoProcesso" :disabled="disabledAll" required></b-form-textarea>
                        </b-form-group>
                    </div>
                    <div class="row">
                        <b-form-group class="font col-sm-12 col-md-12 col-lg-12">  
                            <label>Responsável: </label>                                 
                            <v-select style="font-size: 0.85rem" :options="optionsResponsavel" class="font" label="nome_responsavel"
                                value="id_responsavel" v-model="responsavelSelecionado" :disabled="disabledAll"/>
                        </b-form-group>
                    </div>
                    <div class="row">
                        <b-form-group class="font col-sm-12 col-md-12 col-lg-12">
                            <label>Descrição: <span class="text-danger">*</span></label>        
                            <b-form-textarea rows="4" max-rows="4" v-model="form.descricaoProcesso" 
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
                    </div>
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
                <!-- FIM ÁREA DO SIGED -->               
            </div>

            <div class="py-2 mt-10" align="right">                                                 
                <slot name="buttons"> </slot>
                <b-button class="bordered ml-2" type="button" variant="secondary" 
                @click="cancelar" >Cancelar</b-button> 
                <b-button class="bordered ml-2" type="submit" variant="success" 
                v-if="!disabledAll">Salvar</b-button>                                                                
            </div>  
        </b-form>

    </div>
</template>

<script lang="ts">
import Vue from "vue";
import RestApiService from "@/services/rest/service";
import { Processo } from '@/type/processo';
import { Notificacao } from "@/type/notificacao";
import Notifications from "@/components/Notifications.vue";
import ReturnMessage from "@/components/ReturnMessage.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import dataMixin from "@/mixins/dataMixin";

export default Vue.extend({
    components: { 
        Notifications,    
        ReturnMessage,
        LoadingSpinner  
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
            form: {} as Processo,  
            disabledAll: false as boolean,
            perPageListagens:30000,
            optionsTipoProcesso: [] as Array<string>, 
            optionsOrgaos: [] as Array<string>, 
            optionsAssunto: [] as Array<string>,    
            optionsClassificacao: [] as Array<string>,
            optionsResponsavel: [] as Array<string>,  
            exibirRegistroSIGED: false as boolean, 
            messageSiged: "" as string,
            showMessageSiged: false as boolean,  
            opcaoDuplicar: false as boolean,  
            statusProcessoRecebido : 10 as number,  
            buttonDisabled: false as boolean, 

            //MENSAGENS
            loading: false as boolean,
            alert: false as boolean,  
            Notificacao: [] as Array<Notificacao>,
            Message: [] as Array<Notificacao>,
           
            //para o campo valor multa
            allowclear: true as boolean,
            precision: 2 as number,

            datas: {
                dataProcessoBR: "" as string,
                dataRecebimentoBR: "" as string,
                dataLimitePrazoBR: "" as string,
                dataProcessoSIGEDBR: "" as string,
            },   

            tipoProcessoSelecionado: {
                desc_tipoprocesso: "Selecione" as string,
                id_tipoprocesso: null as any,
            },   
            orgaoSelecionado: {
                orgao_demandante: "Selecione" as string,
                id_orgao: null as any,
            }, 
            assuntoSelecionado: {
                desc_assunto: "Selecione" as string,
                id_assunto: "" as string,
            },
            classificacaoSelecionada: {
                desc_classificacao: "Selecione" as string,
                id_classificacao: null as any,
            }, 
            responsavelSelecionado: {
                nome_responsavel: "Selecione" as string,
                id_responsavel: "" as string,
            },            
            
        }
    },
    mounted(){
        if(this.tipo == 'visualizar') {
            this.disabledAll = true
            this.buttonDisabled = true
            this.carregarDados();
            return;
        }       
        if(this.tipo == 'editar') {           
            this.carregarDados();   
        }     
        if(!this.form.idTipoProcesso){
            this.form.idTipoProcesso = ""
        }
        if(!this.form.idClassificacao){
            this.form.idClassificacao = ""
        }    
        this.listarTipoProcesso()
        this.listarOrgaos()
        this.listarAssuntos()    
        this.listarClassificacoes()
        this.listarResponsaveis()   
     
    },
    methods:{
        carregarDados(): void {
            this.loading = true;            
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
                this.form.dataProcesso = res.data.data_processo
                this.form.dataRecebimento = res.data.data_recebimento
                this.form.horaRecebimento =  res.data.hora_recebimento                              
                this.form.objetoProcesso =  res.data.objeto
                this.form.requerSIGED = res.data.requer_siged
                this.form.numProcessoSIGED = res.data.numero_siged
                this.form.dataProcessoSIGED = res.data.data_processo_siged
                this.form.permanenciaSIGED = res.data.permanencia_siged
                this.form.caixaAtualSIGED =  res.data.caixa_atual_siged
                this.form.tramitacaoSIGED =  res.data.tramitacao_siged              
                this.form.descricaoProcesso = res.data.descricao
                this.form.dataLimitePrazo =  res.data.dia_limite_prazo
                this.form.diasPercorridos =  res.data.dias_percorridos
                this.form.diasExpirados = res.data.dias_expirados 
                this.form.diasCorridos = res.data.dias_corridos  
                this.form.sigiloso = res.data.sigiloso  
                this.form.observacao = res.data.observacao 
                this.form.valorMulta = res.data.valor_multa

                //vue-select
                this.orgaoSelecionado.id_orgao = res.data.orgaoDemandante.id_orgao
                this.orgaoSelecionado.orgao_demandante = res.data.orgaoDemandante.orgao_demandante

                this.assuntoSelecionado.id_assunto = res.data.assunto.id_assunto
                this.assuntoSelecionado.desc_assunto = res.data.assunto.desc_assunto
            
                this.responsavelSelecionado.id_responsavel = res.data.responsavel? res.data.responsavel.id_responsavel : ""
                this.responsavelSelecionado.nome_responsavel = res.data.responsavel? res.data.responsavel.nome_responsavel : ""

                this.tipoProcessoSelecionado.id_tipoprocesso = res.data.tipoProcesso.id_tipoprocesso
                this.tipoProcessoSelecionado.desc_tipoprocesso = res.data.tipoProcesso.desc_tipoprocesso
                
                this.classificacaoSelecionada.id_classificacao = res.data.classificacao.id_classificacao
                this.classificacaoSelecionada.desc_classificacao = res.data.classificacao.desc_classificacao
             
                this.form.diasCorridos =                    
                   (res.data.dias_corridos && res.data.dias_corridos=='S' ? true : false)   

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
            this.formatDatasBrToEn()       
            this.form.diasCorridos = this.form.diasCorridos ? this.form.diasCorridos: false     
            this.form.requerSIGED =  this.form.requerSIGED ? this.form.requerSIGED: false
            this.form.sigiloso = this.form.sigiloso ? this.form.sigiloso: false                  
            this.form.valorMulta = this.form.valorMulta ? this.form.valorMulta: 0
            //vue-select
            this.form.idResponsavel = this.responsavelSelecionado && this.responsavelSelecionado.id_responsavel ? this.responsavelSelecionado.id_responsavel : ""
            this.form.idOrgaoDemandante = this.orgaoSelecionado && this.orgaoSelecionado.id_orgao ? this.orgaoSelecionado.id_orgao : null
            this.form.idTipoProcesso = this.tipoProcessoSelecionado && this.tipoProcessoSelecionado.id_tipoprocesso ? this.tipoProcessoSelecionado.id_tipoprocesso : null
            this.form.idClassificacao = this.classificacaoSelecionada && this.classificacaoSelecionada.id_classificacao ? this.classificacaoSelecionada.id_classificacao : null
            this.form.idAssunto =  this.assuntoSelecionado && this.assuntoSelecionado.id_assunto ? this.assuntoSelecionado.id_assunto : ""    
            
            //enviar dados do siged vazio, pois null ocorre erro no back
            this.form.caixaAtualSIGED = this.form.caixaAtualSIGED ? this.form.caixaAtualSIGED : ""
            this.form.dataProcessoSIGED = this.form.dataProcessoSIGED ? this.form.dataProcessoSIGED  : "" 
            this.form.numProcessoSIGED = this.form.numProcessoSIGED ? this.form.numProcessoSIGED : ""
            this.form.permanenciaSIGED = this.form.permanenciaSIGED ? this.form.permanenciaSIGED.toString() : ""
            this.form.tramitacaoSIGED =  this.form.tramitacaoSIGED ?  this.form.tramitacaoSIGED : ""


            let acao = (!this.idProcesso || this.opcaoDuplicar) ? "post" : "put"
            let url ="processos"

            if(acao == 'post') {
                this.form.statusProcesso = this.statusProcessoRecebido                           
            } 
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
            if(this.form.requerSIGED === true && this.form.numProcessoSIGED
               && (!this.form.dataProcessoSIGED || !this.form.permanenciaSIGED || 
                !this.form.caixaAtualSIGED || !this.form.tramitacaoSIGED)){
                this.adicionarNotificacao(
                "danger",
                "Não é possível salvar registro sem dados do SIGED, "+
                "quando o campo 'Requer SIGED' for selecionado!"
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
            /*if(!this.validarDataFinalLimite()){
                this.adicionarNotificacao(
                "danger",
                "Data Final Limite informada é inválida!"
                );
            }*/
            if(this.form.dataRecebimento < this.form.dataProcesso){
                this.adicionarNotificacao(
                "danger",
                "Data de Recebimento não pode ser menor que a data do processo!"
                );
            }       
            /*if(this.form.dataLimitePrazo && (this.form.dataLimitePrazo < this.form.dataProcesso)){
                this.adicionarNotificacao(
                "danger",
                "Data Final Limite não pode ser menor que a data do processo!"
                );
            } */
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
        listarTipoProcesso(){            
            RestApiService.get1("tipos-processo/list")
              .then((response) => {
                  this.optionsTipoProcesso = response.data                 
              }) 
        },
        listarOrgaos(){
            let busca = {}            
            RestApiService.get1("orgaos-demandantes/list")
            .then((response) => {
                this.optionsOrgaos = response.data               
            })                     
        },
        listarAssuntos(){  
            let busca ={}   
            RestApiService.get1("assuntos/list")
                .then((response: any) => {         
                this.optionsAssunto = response.data
                
            })
            .catch((e) => {
            console.log(e)
            })  
        },       
        listarClassificacoes() {
            RestApiService.get1("classificacoes/list")            
                .then((response) => {
                    this.optionsClassificacao = response.data                    
                })                    
        },
        listarResponsaveis() { 
            let busca = {}
            RestApiService.get1("responsaveis/list")                        
                .then((response) => {                    
                    this.optionsResponsavel = response.data                  
                })                         
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
        apagarDadosSiged() {
            this.datas.dataProcessoSIGEDBR = ""
            this.form.permanenciaSIGED = ""
            this.form.caixaAtualSIGED = ""
            this.form.tramitacaoSIGED = ""
            this.messageSiged=""
            this.showMessageSiged = false
        },
        buscarDadosSiged(){ 
            this.apagarDadosSiged()          
            this.loading = true;                
                RestApiService.buscarProcessoSiged(this.form.numProcessoSIGED)
                .then((response) => { 
                            this.datas.dataProcessoSIGEDBR = response.data.dataProcesso ? 
                                dataMixin.methods.formatarDataBr(response.data.dataProcesso) : "";  
                            this.form.permanenciaSIGED = response.data.tempoPermanencia
                            this.form.caixaAtualSIGED = response.data.caixaAtual
                            this.form.tramitacaoSIGED = response.data.eventoTramitacao
                        })
                        .catch((e) => {
                           if(this.form.numProcessoSIGED) {  
                            this.showMessageSiged = true                           
                            this.messageSiged= 'Ocorreu um erro ao buscar dados do SIGED. Verifique se o número informado está correto e existe no SIGED.'    
                           }
                })
                .finally(() => {
                    this.loading = false;          
            });
        },  
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
                this.$bvModal.hide('modal-visualizar-processo')
                this.$emit("listarProcesso");
            }   
        },  
        cancelar(): void {            
            this.$bvModal.hide('modal-cadastro-processo')
            this.$bvModal.hide('modal-editar-processo')
            this.$bvModal.hide('modal-visualizar-processo')
        },          
    }
})
</script>


<style scope>
.row {
    min-height: 0vh;
}
.font {
    font-family: "Mulish", sans-serif;
}
</style>
