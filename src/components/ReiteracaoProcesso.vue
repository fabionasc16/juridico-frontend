<template>
    <div style="background-color: #e5e4e2;">

            <div class="p-3"> 
                 <div class="row">
                        <b-form-group class="font col-sm-5 col-md-5 col-lg-3">
                            <label>Nº Procedimento: <span class="text-danger">*</span></label>
                            <b-form-input type="text" v-model="form.numProcedimento" required
                             placeholder="Procedimento/Expediente" title="Procedimento/Expediente"></b-form-input>                             
                        </b-form-group>     
                          
                        <b-form-group label="Data do Processo:" class="font col-sm-3 col-md-3 col-lg-3">
                            <b-form-input class="bordered margin-field" type="text" v-model="datas.dataProcessoBR" placeholder="dd/mm/aaaa"
                                v-mask="'##/##/####'"></b-form-input>                          
                        </b-form-group>

                        <b-form-group class="font col-sm-3 col-md-3 col-lg-3">
                            <label>Prazo total: <span class="text-danger">*</span></label>
                            <b-form-input type="text" v-model="form.prazoTotal" required
                            v-mask="'######'"
                            placeholder="em dias úteis"></b-form-input>
                        </b-form-group>

                        <b-form-group label="Data Final Limite:" class="font col-sm-3 col-md-3 col-lg-3">
                            <b-form-input class="bordered margin-field" type="text" v-model="datas.dataLimitePrazoBR" placeholder="dd/mm/aaaa"
                                v-mask="'##/##/####'"></b-form-input>                          
                        </b-form-group>
                    </div>

                    <div class="row">                                         
                        <b-form-group label="Data Recebimento:" class="font col-sm-3 col-md-3 col-lg-3">
                            <b-form-input class="bordered margin-field" type="text" v-model="datas.dataRecebimentoBR" placeholder="dd/mm/aaaa"
                                v-mask="'##/##/####'"></b-form-input>                          
                        </b-form-group>

                        <b-form-group label="Hora Recebimento:" class="font col-sm-3 col-md-3 col-lg-3">
                            <b-form-input type="time" v-model="form.horaRecebimento"></b-form-input>
                        </b-form-group>    
                        
                        <b-form-group label="Nº SIGED" class="font col-sm-3 col-md-3 col-lg-3">
                                    <b-form-input :placeholder="'Nº SIGED'" type="text" v-model="form.numProcessoSIGED">
                                    </b-form-input>
                        </b-form-group>
                    </div>                  

                    <div class="row">
                        <div class="col-12">
                            <div class="row">
                                <b-form-group label="Descrição:" class="font col-sm-12 col-md-12 col-lg-12">
                                    <b-form-textarea rows="3" max-rows="4" v-model="form.reiteracao"></b-form-textarea>
                                </b-form-group>
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

export default Vue.extend({
    directives: { mask },
    components: {       
        BIconSearch,
        BIconJournalPlus,
        BIconPlusCircle,
        BIconInfoCircle, 
        VueNumeric
    },
    mixins: [        
        dataMixin,
    ],    
    data() {
        return {  
            datas: {
                dataProcessoBR: "" as string,
                dataRecebimentoBR: "" as string,
                dataLimitePrazoBR: "" as string,
            },           
            form: {} as Processo, 
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
                   dataMixin.methods.formatarDataBr(this.form.dataProcesso) : "";

            this.datas.dataRecebimentoBR = this.form.dataRecebimento ? 
                   dataMixin.methods.formatarDataBr(this.form.dataRecebimento) : "";

            this.datas.dataLimitePrazoBR = this.form.dataLimitePrazo ? 
                   dataMixin.methods.formatarDataBr(this.form.dataLimitePrazo) : "";
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
                this.form.numProcessoSIGED = this.form.numProcessoSIGED ? this.form.numProcessoSIGED: ""
             
               
                this.form.reiteracao = this.form.reiteracao ?  this.form.reiteracao: ""
                this.form.dataLimitePrazo =  this.form.dataLimitePrazo? this.form.dataLimitePrazo: ""
                
                this.form.statusPrazo =  this.form.statusPrazo ?  this.form.statusPrazo: ""
                //this.form.statusProcesso = this.form.statusProcesso ? this.form.statusProcesso : ""                          
            
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
