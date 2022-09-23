<template>
    <div>
                    <div class="row">
                        <b-form-group class="font col-sm-5 col-md-5 col-lg-5">
                            <label>Nº Procedimento: <span class="text-danger">*</span></label>
                            <b-form-input type="text" v-model="form.numProcedimento" required
                             placeholder="Procedimento/Expediente"></b-form-input>                             
                        </b-form-group> 

                        <b-form-group label="Tipo:" class="font col-sm-3 col-md-3 col-lg-3">
                            <b-form-select v-model="form.idTipoProcesso">
                                <b-form-select-option value="">-- Selecione --</b-form-select-option>
                                <b-form-select-option v-for="option in optionsTipoProcesso" :value="option.value"
                                   :key="option.value"> {{ option.texto }}
                                </b-form-select-option>                                
                            </b-form-select>
                        </b-form-group>

                        <b-form-group class="font col-sm-3 col-md-3 col-lg-3">
                            <label>Prazo total: <span class="text-danger">*</span></label>
                            <b-form-input type="text" v-model="form.prazoTotal" required
                            v-mask="'######'"
                            placeholder="em dias úteis"></b-form-input>
                        </b-form-group>
                    </div>

                    <div class="row">
                        <b-form-group label="Órgão Demandante:" class="font col-sm-5 col-md-5 col-lg-5">
                            <v-select style="font-size: 0.85rem" :options="optionsOrgaos" class="font" label="texto"
                                        v-model="orgaoSelecionado"/>
                        </b-form-group>                       
                          
                        <b-form-group label="Data do Processo:" class="font col-sm-3 col-md-3 col-lg-3">
                            <b-form-input class="bordered margin-field" type="text" v-model="datas.dataProcessoBR" placeholder="dd/mm/aaaa"
                                v-mask="'##/##/####'"></b-form-input>                          
                        </b-form-group>

                        <b-form-group label="Data Recebimento:" class="font col-sm-3 col-md-3 col-lg-3">
                            <b-form-input class="bordered margin-field" type="text" v-model="datas.dataRecebimentoBR" placeholder="dd/mm/aaaa"
                                v-mask="'##/##/####'"></b-form-input>                          
                        </b-form-group>

                        <b-form-group label="Hora Recebimento:" class="font col-sm-3 col-md-3 col-lg-3">
                            <b-form-input type="time" v-model="form.horaRecebimento"></b-form-input>
                        </b-form-group>

                        <b-form-group label="Data Final Limite:" class="font col-sm-3 col-md-3 col-lg-3">
                            <b-form-input class="bordered margin-field" type="text" v-model="datas.dataLimitePrazoBR" placeholder="dd/mm/aaaa"
                                v-mask="'##/##/####'"></b-form-input>                          
                        </b-form-group>

                       <!--  <b-form-group label="Valor Multa:" class="font col-sm-3 col-md-3 col-lg-3">
                               <CurrencyInput 
                                    v-model="form.valorMulta"
                                    :options="optionsMoney"
                                />                            
                         </b-form-group> -->
                         

                    </div>

                    <div class="row">
                        <b-form-group label="Assunto:" class="font col-sm-7 col-md-7 col-lg-7">                           
                             <v-select style="font-size: 0.85rem" :options="optionsAssunto" class="font" label="texto"
                                        v-model="assuntoSelecionado"/>
                        </b-form-group>

                        <b-form-group label="Classificação:" class="font col-sm-5 col-md-5 col-lg-5">
                            <b-form-select size="sm" v-model="form.idClassificacao">                               
                                 <b-form-select-option value="">-- Selecione --</b-form-select-option>
                                 <b-form-select-option v-for="option in optionsClassificacao" :value="option.value"
                                   :key="option.value"> {{ option.texto }}
                                </b-form-select-option>
                            </b-form-select>
                        </b-form-group>
                    </div>

                    <div class="row">
                        <div class="col-7">
                            <div class="row">
                                <b-form-group label="Objeto:" class="font col-sm-12 col-md-12 col-lg-12">
                                    <b-form-textarea rows="2" max-rows="2" v-model="form.objeto"></b-form-textarea>
                                </b-form-group>
                            </div>
                            <div class="row">
                                <b-form-group label="Responsável:" class="font col-sm-12 col-md-12 col-lg-12">                                   
                                    <v-select style="font-size: 0.85rem" :options="optionsResponsavel" class="font" label="nome"
                                        value="idResponsavel" v-model="responsavelSelecionado"/>
                                </b-form-group>
                            </div>
                            <div class="row">
                                <b-form-group label="Descrição:" class="font col-sm-12 col-md-12 col-lg-12">
                                    <b-form-textarea rows="4" max-rows="4" v-model="form.descricao"></b-form-textarea>
                                </b-form-group>
                            </div>
                            
                        </div>


                        <!-- ÁREA DO SIGED -->
                        <div class="col-5">

                             <div class="row mb-3">
                                <b-form-checkbox v-model="form.sigiloso" switch
                                    class="font col-sm-12 col-md-12 col-lg-12">Processo sigiloso?
                                </b-form-checkbox>
                             </div>

                            <div class="row">
                                <b-form-checkbox v-model="form.requerSIGED" @change="exibirCampoSIGED()" switch
                                    class="font col-sm-2 col-md-2 col-lg-2">Requer SIGED
                                </b-form-checkbox>

                                <b-form-group label="" class="ml-4 mt-2 mb-0 font col-sm-9 col-md-9 col-lg-9"
                                    v-show="exibirRegistroSIGED">
                                    <b-form-input :placeholder="'Nº SIGED'" type="text" v-model="form.numProcessoSIGED">
                                    </b-form-input>
                                </b-form-group>
                            </div>
                            <div class="row">
                                <b-form-group class="titulo col-sm-12 col-md-12 col-lg-12" label="Dados do SIGED:"
                                    label-size="lg">
                                    <hr />
                                </b-form-group>
                                <div class="col-12">
                                    <div class="row">
                                        <b-form-group label="Data Processo:" class="font col-sm-6 col-md-6 col-lg-6">
                                            <b-form-input disabled v-model="form.dataProcessoSIGED" placeholder="dd/mm/aaaa">
                                            </b-form-input>
                                        </b-form-group>      
                                        <b-form-group label="Permanência:" class="font col-sm-6 col-md-6 col-lg-6">
                                            <b-form-input disabled type="text" v-model="form.permanenciaSIGED">
                                            </b-form-input>
                                        </b-form-group>
                                    </div>
                                    <div class="row">
                                        <b-form-group label="Caixa Atual:" class="font col-sm-6 col-md-6 col-lg-6">
                                            <b-form-input disabled type="text" v-model="form.caixaAtualSIGED"></b-form-input>
                                        </b-form-group>

                                        <b-form-group label="Tramitação:" class="font col-sm-6 col-md-6 col-lg-6">
                                            <b-form-input disabled type="text" v-model="form.tramitacaoSIGED"></b-form-input>
                                        </b-form-group>
                                    </div>

                                </div>
                            </div>                            

                        </div>

                        <div class="col-12">
                            <div class="row">
                                <b-form-group label="Observação:" class="font col-sm-12 col-md-12 col-lg-12">
                                    <b-form-textarea rows="2" max-rows="2" v-model="form.observacao"></b-form-textarea>
                                </b-form-group>
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
import { TipoProcessoSeeder } from "@/type/tipoProcesso";
import { OrgaosSeeder } from "@/type/orgaos";
import { AssuntoSeeder } from "@/type/assunto";
import { ClassificacaoSeeder } from "@/type/classificacao";
import { ResponsavelSeeder } from "@/type/responsavel";
import { Processo } from '@/type/processo';
//import CurrencyInput from './CurrencyInput.vue'

export default Vue.extend({
    directives: { mask },
    components: {       
        BIconSearch,
        BIconJournalPlus,
        BIconPlusCircle,
        BIconInfoCircle, 
        //CurrencyInput
    },
    mixins: [        
        dataMixin,
    ],    
    data() {
        return {            
            show: false as boolean,
            exibirMaisDetalhes: false as boolean,
            exibirRegistroPrazo: false as boolean,
            exibirRegistroSIGED: false as boolean, 
            optionsTipoProcesso: TipoProcessoSeeder,   
            optionsOrgaos: OrgaosSeeder, 
            optionsAssunto: AssuntoSeeder, 
            optionsClassificacao: ClassificacaoSeeder,   
            optionsResponsavel: ResponsavelSeeder,    
            responsavelSelecionado: {
                    nome: "Selecione um responsável" as string,
                    idResponsavel: "" as string,
            },  
            orgaoSelecionado: {
                    texto: "Selecione um órgão demandante" as string,
                    value: "" as string,
            },  
            assuntoSelecionado: {
                    texto: "Selecione um assunto" as string,
                    value: "" as string,
            },    
            datas: {
                dataProcessoBR: "" as string,
                dataRecebimentoBR: "" as string,
                dataLimitePrazoBR: "" as string,
            },           
            form: {} as Processo,     
            optionsMoney: {
                locale: 'pt-BR',
                currency: 'BRL',
                //currencyDisplay: 'hidden',
                precision: 2,
                hideCurrencySymbolOnFocus: true,
                hideGroupingSeparatorOnFocus: true,
                hideNegligibleDecimalDigitsOnFocus: true,
                autoDecimalDigits: false,
                exportValueAsInteger: false,
                autoSign: false,
                useGrouping: true
             }        
          
        }       
    },  

    methods: {
        formatDatasBrToEn() {
            this.form.dataProcesso = this.datas.dataProcessoBR ? 
                   dataMixin.methods.dataFormatEn(this.datas.dataProcessoBR) : "";

            this.form.dataRecebimento = this.datas.dataRecebimentoBR ? 
                   dataMixin.methods.dataFormatEn(this.datas.dataRecebimentoBR) : ""; 

            this.form.dataLimitePrazo = this.datas.dataLimitePrazoBR ? 
            dataMixin.methods.dataFormatEn(this.datas.dataLimitePrazoBR) : ""; 
        },

        formatDatasEnToBr() {
            this.datas.dataProcessoBR = this.form.dataProcesso ? 
                   dataMixin.methods.dataFormatEn(this.form.dataProcesso) : "";

            this.datas.dataRecebimentoBR = this.form.dataRecebimento ? 
                   dataMixin.methods.dataFormatEn(this.form.dataRecebimento) : "";

            this.datas.dataLimitePrazoBR = this.form.dataLimitePrazo ? 
                   dataMixin.methods.dataFormatEn(this.form.dataLimitePrazo) : "";
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
                this.form.idTipoProcesso =  this.form.idTipoProcesso ? this.form.idTipoProcesso: ""
                this.form.prazoTotal =  this.form.prazoTotal ? this.form.prazoTotal : ""
                this.form.idOrgaoDemandante = this.orgaoSelecionado.value ? this.orgaoSelecionado.value : ""
                this.form.dataProcesso = this.form.dataProcesso ? this.form.dataProcesso: ""
                this.form.dataRecebimento = this.form.dataRecebimento ? this.form.dataRecebimento: ""
                this.form.horaRecebimento =  this.form.horaRecebimento ? this.form.horaRecebimento  : ""
                this.form.idAssunto =  this.assuntoSelecionado.value ? this.assuntoSelecionado.value : ""
                this.form.idClassificacao = this.form.idClassificacao ? this.form.idClassificacao : ""
                this.form.objeto =  this.form.objeto ? this.form.objeto : ""
                this.form.requerSIGED =  this.form.requerSIGED ? this.form.requerSIGED: false
                this.form.numProcessoSIGED = this.form.numProcessoSIGED ? this.form.numProcessoSIGED: ""
                this.form.dataProcessoSIGED = this.form.dataProcessoSIGED ?  this.form.dataProcessoSIGED : ""
                this.form.permanenciaSIGED = this.form.permanenciaSIGED ? this.form.permanenciaSIGED: ""
                this.form.caixaAtualSIGED =  this.form.caixaAtualSIGED ?  this.form.caixaAtualSIGED : ""
                this.form.tramitacaoSIGED =  this.form.tramitacaoSIGED ? this.form.tramitacaoSIGED : ""
                this.form.idResponsavel = this.responsavelSelecionado.idResponsavel ? this.responsavelSelecionado.idResponsavel : ""
                this.form.descricao = this.form.descricao ?  this.form.descricao: ""
                this.form.dataLimitePrazo =  this.form.dataLimitePrazo? this.form.dataLimitePrazo: ""
                this.form.diasPercorridos =  this.form.diasPercorridos ? this.form.diasPercorridos: ""
                this.form.diasExpirados = this.form.diasExpirados ? this.form.diasExpirados: ""
                this.form.statusPrazo =  this.form.statusPrazo ?  this.form.statusPrazo: ""
                this.form.statusProcesso = this.form.statusProcesso ? this.form.statusProcesso : ""
                this.form.sigiloso = this.form.sigiloso ? this.form.sigiloso: false
                this.form.observacao = this.form.observacao ? this.form.observacao: ""       
            
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
