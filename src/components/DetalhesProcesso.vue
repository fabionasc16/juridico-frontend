<template>
    <div>
                    <div class="row">
                        <b-form-group class="font col-sm-5 col-md-5 col-lg-5">
                            <label>Nº Procedimento: <span class="text-danger">*</span></label>
                            <b-form-input type="text" v-model="form.nProcedimento" required
                             placeholder="Procedimento/Expediente"></b-form-input>                             
                        </b-form-group> 

                        <b-form-group label="Tipo:" class="font col-sm-3 col-md-3 col-lg-3">
                            <b-form-select v-model="form.tipoProcesso">
                                <b-form-select-option value="">-- Selecione --</b-form-select-option>
                                <b-form-select-option v-for="option in optionsTipoProcesso" :value="option.value"
                                   :key="option.value"> {{ option.texto }}
                                </b-form-select-option>                                
                            </b-form-select>
                        </b-form-group>

                        <b-form-group class="font col-sm-3 col-md-3 col-lg-3">
                            <label>Prazo total: <span class="text-danger">*</span></label>
                            <b-form-input type="text" v-model="form.qtdDiasPrazo" required
                            v-mask="'######'"
                            placeholder="em dias úteis"></b-form-input>
                        </b-form-group>
                    </div>

                    <div class="row">
                        <b-form-group label="Órgão Demandante:" class="font col-sm-5 col-md-5 col-lg-5">
                            <b-form-select size="sm" v-model="form.orgaoDemandante">
                                <b-form-select-option value="">-- Selecione --</b-form-select-option>
                                 <b-form-select-option v-for="option in optionsOrgaos" :value="option.value"
                                   :key="option.value"> {{ option.texto }}
                                </b-form-select-option>
                            </b-form-select>
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
                            <b-form-input class="bordered margin-field" type="text" v-model="datas.dataLimiteBR" placeholder="dd/mm/aaaa"
                                v-mask="'##/##/####'"></b-form-input>                          
                        </b-form-group>

                    </div>

                    <div class="row">
                        <b-form-group label="Assunto:" class="font col-sm-7 col-md-7 col-lg-7">
                            <b-form-input type="text" v-model="form.assunto"></b-form-input>
                        </b-form-group>

                        <b-form-group label="Classificação:" class="font col-sm-5 col-md-5 col-lg-5">
                            <b-form-select size="sm" v-model="form.classificacao">                               
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
                                    <!--<b-form-select size="sm" v-model="form.responsavel">
                                        <b-form-select-option value="">-- Selecione --</b-form-select-option>
                                        <b-form-select-option v-for="option in optionsResponsavel" :value="option.value"
                                        :key="option.value"> {{ option.texto }}
                                        </b-form-select-option>
                                    </b-form-select>-->
                                    <v-select style="font-size: 0.85rem" :options="optionsResponsavel" class="font" label="texto"
                                        v-model="responsavelSelecionado"/>
                                </b-form-group>
                            </div>
                            <div class="row">
                                <b-form-group label="Descrição:" class="font col-sm-12 col-md-12 col-lg-12">
                                    <b-form-textarea rows="4" max-rows="4" v-model="form.observacao"></b-form-textarea>
                                </b-form-group>
                            </div>
                        </div>

                        <!-- ÁREA DO SIGED -->
                        <div class="col-5">
                            <div class="row">
                                <b-form-checkbox v-model="form.requerSIGED" @change="exibirCampoSIGED()" switch
                                    class="font col-sm-2 col-md-2 col-lg-2">Requer SIGED
                                </b-form-checkbox>

                                <b-form-group label="" class="ml-4 mt-2 mb-0 font col-sm-9 col-md-9 col-lg-9"
                                    v-show="exibirRegistroSIGED">
                                    <b-form-input :placeholder="'Nº SIGED'" type="text" v-model="form.nSIGED">
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
                                            <b-form-input disabled v-model="form.dataCadSIGED" placeholder="dd/mm/aaaa">
                                            </b-form-input>
                                        </b-form-group>      
                                        <b-form-group label="Permanência:" class="font col-sm-6 col-md-6 col-lg-6">
                                            <b-form-input disabled type="text" v-model="form.permanencia">
                                            </b-form-input>
                                        </b-form-group>
                                    </div>
                                    <div class="row">
                                        <b-form-group label="Caixa Atual:" class="font col-sm-6 col-md-6 col-lg-6">
                                            <b-form-input disabled type="text" v-model="form.caixaAtual"></b-form-input>
                                        </b-form-group>

                                        <b-form-group label="Tramitação:" class="font col-sm-6 col-md-6 col-lg-6">
                                            <b-form-input disabled type="text" v-model="form.tramitacao"></b-form-input>
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
import { TipoProcessoSeeder } from "@/type/tipoProcesso";
import { OrgaosSeeder } from "@/type/orgaos";
import { ClassificacaoSeeder } from "@/type/classificacao";
import { ResponsavelSeeder } from "@/type/responsavel";
import { Processo } from '@/type/processo';

export default Vue.extend({
    directives: { mask },
    components: {       
        BIconSearch,
        BIconJournalPlus,
        BIconPlusCircle,
        BIconInfoCircle,  
    },
    mixins: [        
        dataMixin,
    ],    
    data() {
        return {
            teste: 'abc' as string,
            show: false as boolean,
            exibirMaisDetalhes: false as boolean,
            exibirRegistroPrazo: false as boolean,
            exibirRegistroSIGED: false as boolean, 
            optionsTipoProcesso: TipoProcessoSeeder,   
            optionsOrgaos: OrgaosSeeder, 
            optionsClassificacao: ClassificacaoSeeder,   
            optionsResponsavel: ResponsavelSeeder,    
            responsavelSelecionado: {
                    texto: "Selecione um responsável" as string,
                    value: "" as string,
            },    
            datas: {
                dataProcessoBR: "" as string,
                dataRecebimentoBR: "" as string,
            },           
            form: {} as Processo,
          
              
            /*form: {                
                nProcedimento: "" as string,
                nExpediente: "" as string,
                assunto: "" as string,
                caixaSIGED: "" as string,
                tipoProcesso: "" as string,
                status: "" as string,
                orgaoDemandante: "" as string,
                classificacao: "" as string,
                qtdDiasPrazo: "" as string,
                dataProcesso: "" as string,
                dataRecebimento: "" as string,
                horaRecebimento: "" as string,
                objeto: "" as string,
                responsavel: "" as string,
                observacao: "" as string,
                nSIGED: "" as string,
                dataCadSIGED: "" as string,
                permanencia: "" as string,
                caixaAtual: "" as string,
                tramitacao: "" as string,
                requerSIGED: false as boolean,
                monitoraPrazo: "" as string,
                maisDetalhes: false as boolean,
            }, */
        }
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
