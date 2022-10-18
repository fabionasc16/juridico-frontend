<template>
    <div>
                    <div class="row">
                        <b-form-group class="font col-sm-5 col-md-5 col-lg-5">
                            <label>Nº Procedimento: <span class="text-danger">*</span></label>
                            <b-form-input type="text" v-model="form.numProcedimento" required
                             placeholder="Procedimento/Expediente" autofocus :disabled="disabledAll"></b-form-input>                             
                        </b-form-group> 

                        <b-form-group class="font col-sm-3 col-md-3 col-lg-3">
                            <label>Tipo Processo: <span class="text-danger">*</span></label>
                            <b-form-select v-model="form.idTipoProcesso" :disabled="disabledAll" required>
                                <b-form-select-option value="">-- Selecione --</b-form-select-option>
                                <b-form-select-option v-for="option in optionsTipoProcesso" :value="option.id_tipoprocesso"
                                   :key="option.id_tipoprocesso"> {{ option.desc_tipoprocesso }}
                                </b-form-select-option>                                
                            </b-form-select>
                        </b-form-group>

                        <b-form-group class="font col-sm-3 col-md-3 col-lg-3">
                            <label>Prazo total: <span class="text-danger">*</span></label>
                            <b-form-input type="text" v-model="form.prazoTotal" required
                            v-mask="'######'" 
                            placeholder="em dias úteis" :disabled="disabledAll"></b-form-input>
                        </b-form-group>
                    </div>

                    <div class="row">
                        <b-form-group class="font col-sm-5 col-md-5 col-lg-5">                            
                            <label>Órgão Demandante: <span class="text-danger">*</span></label>
                            <v-select style="font-size: 0.85rem" :options="optionsOrgaos" class="font" label="orgao_demandante"
                                        v-model="orgaoSelecionado" :disabled="disabledAll" required/>
                        </b-form-group>                       
                          
                        <b-form-group class="font col-sm-3 col-md-3 col-lg-3">
                            <label>Data do Processo: <span class="text-danger">*</span></label>
                            <b-form-input class="bordered margin-field" type="text" v-model="datas.dataProcessoBR" placeholder="dd/mm/aaaa"
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

                        <b-form-group label="Data Final Limite:" class="font col-sm-3 col-md-3 col-lg-3">
                            <b-form-input class="bordered margin-field" type="text" v-model="datas.dataLimitePrazoBR" placeholder="dd/mm/aaaa"
                                v-mask="'##/##/####'" :disabled="disabledAll"></b-form-input>                          
                        </b-form-group>

                        <b-form-group label="Valor Multa:" class="font col-sm-4 col-md-4 col-lg-4">
                            <vue-numeric currency="R$" separator="." :precision='precision' class="form-control bordered margin-field" 
                            prefix="R$" v-model="form.valorMulta" :allow-clear="allowclear" :disabled="disabledAll"
                            placeholder="R$ 0,00"></vue-numeric>                
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
                            <b-form-select size="sm" v-model="form.idClassificacao" :disabled="disabledAll" required>                               
                                 <b-form-select-option value="">-- Selecione --</b-form-select-option>
                                 <b-form-select-option v-for="option in optionsClassificacao" :value="option.id_classificacao"
                                   :key="option.id_classificacao"> {{ option.desc_classificacao }}
                                </b-form-select-option>
                            </b-form-select>
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
                                <b-form-checkbox v-model="form.sigiloso" switch :disabled="disabledAll"
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
                                <!-- <b-form-group class="titulo col-sm-12 col-md-12 col-lg-12" label="Dados do SIGED:"
                                    label-size="lg">
                                    <hr />
                                </b-form-group>-->
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
                </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mask } from "vue-the-mask";
import { BIconSearch, BIconPlusCircle, BIconInfoCircle, BIconJournalPlus } from 'bootstrap-vue'
import dataMixin from "@/mixins/dataMixin";
import { Processo } from '@/type/processo';
import VueNumeric from 'vue-numeric'
Vue.use(VueNumeric)
import RestApiService from "@/services/rest/service";

export default Vue.extend({
    directives: { mask },
    components: {       
        BIconSearch,
        BIconJournalPlus,
        BIconPlusCircle,
        BIconInfoCircle, 
        VueNumeric,
        
    },
    mixins: [        
        dataMixin,
    ],    
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
                    nome_responsavel: "Selecione um responsável" as string,
                    id_responsavel: "" as string,
            },  
            orgaoSelecionado: {
                    orgao_demandante: "Selecione um órgão demandante" as string,
                    id_orgao: null as any,
            },  
            assuntoSelecionado: {
                    desc_assunto: "Selecione um assunto" as string,
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
          
        }       
    },  

    mounted(){
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

             RestApiService.get(
                "responsaveis",
                `?currentPage=1&perPage=${this.perPageListagens}`
                )                 
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
            
                this.form.dataProcesso = this.form.dataProcesso ? this.form.dataProcesso: ""
                this.form.dataRecebimento = this.form.dataRecebimento ? this.form.dataRecebimento: ""
                this.form.horaRecebimento =  this.form.horaRecebimento ? this.form.horaRecebimento  : ""
                                         
                this.form.objeto =  this.form.objeto ? this.form.objeto : ""
                this.form.requerSIGED =  this.form.requerSIGED ? this.form.requerSIGED: false
                this.form.numProcessoSIGED = this.form.numProcessoSIGED ? this.form.numProcessoSIGED: ""
                this.form.dataProcessoSIGED = this.form.dataProcessoSIGED ?  this.form.dataProcessoSIGED : ""
                this.form.permanenciaSIGED = this.form.permanenciaSIGED ? this.form.permanenciaSIGED: ""
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
               
                this.form.idClassificacao = this.form.idClassificacao ? this.form.idClassificacao : ""
                this.form.idOrgaoDemandante = this.orgaoSelecionado && this.orgaoSelecionado.id_orgao ? this.orgaoSelecionado.id_orgao : null
                this.form.idTipoProcesso =  this.form.idTipoProcesso ? this.form.idTipoProcesso: ""
                this.form.idAssunto =  this.assuntoSelecionado && this.assuntoSelecionado.id_assunto ? this.assuntoSelecionado.id_assunto : ""    
                this.form.statusProcesso = this.form.statusProcesso ? this.form.statusProcesso : ""
                this.form.observacao = this.form.observacao ? this.form.observacao: ""                
            
        },

        //inserir valores no vue-select
        insereSelectOrgaoDemandante(orgao: any): void {
            this.orgaoSelecionado.id_orgao = orgao.id_orgao
            this.orgaoSelecionado.orgao_demandante = orgao.orgao_demandante
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
            }
        },     
        
        ocultarCampoSIGED(): void {           
            this.exibirRegistroSIGED = false;
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
