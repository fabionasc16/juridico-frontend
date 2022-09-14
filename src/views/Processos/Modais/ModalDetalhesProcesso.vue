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

                    <div class="row">
                        <b-form-group class="font col-sm-3 col-md-3 col-lg-3">
                            <label>Nº Procedimento: <span class="text-danger">*</span></label>
                            <b-form-input type="text" v-model="form.nProcedimento" required></b-form-input>
                        </b-form-group> 

                        <b-form-group label="Nº Expediente:" class="font col-sm-3 col-md-3 col-lg-3">
                            <b-form-input type="text" v-model="form.nExpediente"></b-form-input>
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
                            placeholder="em dias"></b-form-input>
                        </b-form-group>
                    </div>

                    <div class="row">
                        <b-form-group label="Órgão Demandante:" class="font col-sm-3 col-md-3 col-lg-3">
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
                                    <b-form-select size="sm" v-model="form.responsavel">
                                        <b-form-select-option value="">-- Selecione --</b-form-select-option>
                                        <b-form-select-option v-for="option in optionsResponsavel" :value="option.value"
                                        :key="option.value"> {{ option.texto }}
                                        </b-form-select-option>
                                    </b-form-select>
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

            <div class="py-2 mt-3" align="right">     
                <b-button class="mr-3" @click="$bvModal.hide('modal-detalhes-processo')">Fechar</b-button>  
                <b-button class="bordered" type="submit" variant="success">Salvar</b-button>
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
import { TipoProcessoSeeder } from "@/type/tipoProcesso";
import { OrgaosSeeder } from "@/type/orgaos";
import { ClassificacaoSeeder } from "@/type/classificacao";
import { ResponsavelSeeder } from "@/type/responsavel";

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
        LoadingSpinner
    },
    mixins: [        
        dataMixin,
    ],
    props: ["id"],
    data() {
        return {
            show: false as boolean,
            exibirMaisDetalhes: false as boolean,
            exibirRegistroPrazo: false as boolean,
            exibirRegistroSIGED: false as boolean,   
            Notificacao: [] as Array<Notificacao>,
            Message: [] as Array<Notificacao>,
            loading: false as boolean,
            alert: false as boolean,  
            optionsTipoProcesso: TipoProcessoSeeder,   
            optionsOrgaos: OrgaosSeeder, 
            optionsClassificacao: ClassificacaoSeeder,   
            optionsResponsavel: ResponsavelSeeder,        
            datas: {
                dataProcessoBR: "" as string,
                dataRecebimentoBR: "" as string,
            },
            form: {                
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
            }, 
        }
    },  

    mounted() {
            const path = this.$route.path;
            const acao = "/editar";

            if (path.includes(acao)) {
                this.carregarDados();            
            }
    },  
       
    methods: {
        submit() {
            let acao = this.id ? "put" : "post"
            let url = this.id ? "processo/update" : "processo";

            if (this.validarCampos()) {            

              //formatar datas para salvar no banco de dados  
              this.formatDatasBrToEn()  
              
              console.log(JSON.stringify(this.form))

              
              this.loading = true  

              RestApiService.salvar(url, this.form, acao)
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

            RestApiService.get("processo/listid", this.id)
                .then((res: any) => {
              
                this.form.nProcedimento = res.data.nProcedimento
                this.form.nExpediente = res.data.nExpediente
                this.form.assunto = res.data.assunto
                this.form.caixaSIGED = res.data.caixaSIGED
                this.form.tipoProcesso = res.data.tipoProcesso
                this.form.status = res.data.status
                this.form.orgaoDemandante = res.data.orgaoDemandante
                this.form.classificacao = res.data.classificacao
                this.form.qtdDiasPrazo = res.data.qtdDiasPrazo
                this.form.dataProcesso = res.data.dataProcesso
                this.form.dataRecebimento = res.data.dataRecebimento
                this.form.horaRecebimento = res.data.horaRecebimento
                this.form.objeto = res.data.objeto
                this.form.responsavel = res.data.responsavel
                this.form.observacao = res.data.observacao
                this.form.nSIGED = res.data.nSIGED
                this.form.dataCadSIGED = res.data.dataCadSIGED
                this.form.permanencia = res.data.permanencia
                this.form.caixaAtual = res.data.caixaAtual
                this.form.tramitacao = res.data.tramitacao
                this.form.requerSIGED = res.data.requerSIGED
                this.form.monitoraPrazo = res.data.monitoraPrazo
                this.form.maisDetalhes = res.data.maisDetalhes

                //formatar datas para formato br
                this.formatDatasEnToBr()

            })
            .catch((e) => {
                this.adicionarAlert(
                    "alert",
                    "Houve um erro ao carregar os dados do paciente. Tente novamente!"
                );
          
            })
            .finally(() => {
                this.loading = false;
            });
        },

        fechaAlert(): void {
            this.alert = false;
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

        formatDatasBrToEn() {
            this.form.dataProcesso = this.datas.dataProcessoBR ? 
                   dataMixin.methods.dataFormatEn(this.datas.dataProcessoBR) : "";

            this.form.dataRecebimento = this.datas.dataRecebimentoBR ? 
                   dataMixin.methods.dataFormatEn(this.datas.dataRecebimentoBR) : ""; 
        },

        formatDatasEnToBr() {
            this.datas.dataProcessoBR = this.form.dataProcesso ? 
                   dataMixin.methods.dataFormatEn(this.form.dataProcesso) : "";

            this.datas.dataRecebimentoBR = this.form.dataRecebimento ? 
                   dataMixin.methods.dataFormatEn(this.form.dataRecebimento) : "";
        },
        
        validarCampos(): boolean {

            if (!this.form.nProcedimento) {
                this.adicionarNotificacao(
                "danger",
                "Nº Procedimento é obrigatório!"
                );
            }

            if(!this.form.qtdDiasPrazo){
                this.adicionarNotificacao(
                "danger",
                "Prazo Total é obrigatório!"
                );
            }

            if(this.form.requerSIGED === true && !this.form.nSIGED){
                this.adicionarNotificacao(
                "danger",
                "Nº SIGED é obrigatório quando o campo 'Requer SIGED' for selecionado!"
                );
            }

            if(this.datas.dataProcessoBR && !dataMixin.methods.validarData(this.datas.dataProcessoBR) ) {
                this.adicionarNotificacao(
                "danger",
                "Data do Processo informada é inválida!"
                );
            }

            if(this.datas.dataRecebimentoBR && !dataMixin.methods.validarData(this.datas.dataRecebimentoBR) ) {
                this.adicionarNotificacao(
                "danger",
                "Data do Recebimento informada é inválida!"
                );
            }

            if (this.Notificacao.length > 0) {
                //ir para o início da página onde aparecem as mensagens
                window.scrollTo(0, 0);
                setTimeout(() => {
                this.Notificacao = [];
                }, 5000);
                return false;
            } else {
                return true;
            }
        },

        exibeMaisDetalhes(): void {
            if (
                this.form.maisDetalhes === true
            ) {
                this.exibirMaisDetalhes = true;
            } else {
                this.exibirMaisDetalhes = false;
            }
        },
        exibirCampoPrazo(): void {
            if (
                this.form.monitoraPrazo == "sim"
            ) {
                this.exibirRegistroPrazo = true;
            } else {
                this.exibirRegistroPrazo = false;
            }
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
        voltar(): void {
            this.$router.push("/");
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
