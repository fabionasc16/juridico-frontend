<template>
    <div>
        <!-- CARD DE CADASTRO -->
        <div class="card">
            <div class="col-12">

                  <notifications :notifications="Notificacao"></notifications>      

                    <div v-if="alert">
                        <ReturnMessage :message="Message" :fechaAlert="fechaAlert"></ReturnMessage>
                    </div>          

                    <div v-if="loading">
                        <LoadingSpinner></LoadingSpinner>
                    </div>

                <b-form @submit.prevent="submit">                   

                    <!-- 1ª LINHA (CPF + NOME) -->
                    <div class="row mt-3"> 
                        <b-form-group class="font col-sm-10 col-md-10 col-lg-10">
                            <label>Nome<span class="text-danger">*</span>:</label>
                            <b-form-input :placeholder="'Digite o Nome do Órgão'" type="text" autofocus
                                v-model="form.orgaoDemandante" :disabled="disabledAll" required>
                            </b-form-input>
                        </b-form-group>                        
                    </div>

                    <div class="row">
                        <b-form-group class="font col-sm-5 col-md-5 col-lg-5">
                            <label>Sigla<span class="text-danger">*</span>:</label>
                            <b-form-input type="text"
                                v-model="form.siglaOrgao" :disabled="disabledAll" required></b-form-input>
                        </b-form-group>

                        <b-form-group class="font col-sm-5 col-md-5 col-lg-5">
                            <label>Esfera<span class="text-danger">*</span>:</label>
                            <b-form-input type="text"
                                v-model="form.esferaOrgao" :disabled="disabledAll" required></b-form-input>
                        </b-form-group>
                    </div>

                    <div class="row">
                        <!-- 2ª LINHA  -->
                         <b-form-group class="font col-sm-6 col-md-6 col-lg-6">
                                <b-form-checkbox v-model="form.orgaoControle" switch :disabled="disabledAll"
                                    class="font col-sm-12 col-md-12 col-lg-12">Órgão de Controle?
                               </b-form-checkbox>
                          </b-form-group>                                           
                    </div>

                    <div class="row"> 
                           <b-form-group class="font col-sm-6 col-md-6 col-lg-6">
                                <b-form-checkbox v-model="form.orgaoJustica" switch :disabled="disabledAll"
                                    class="font col-sm-12 col-md-12 col-lg-12">Órgão de Justiça?
                               </b-form-checkbox>
                          </b-form-group>                       
                    </div>
                   

                    <div class="py-2 mt-10" align="right">                        
                       <slot name="buttons"></slot>
                       <b-button v-if="!disabledAll" class="bordered ml-2" type="submit" variant="success">Salvar</b-button>
                    </div>

                </b-form>
            </div>
        </div>

    </div>
</template>

<script lang="ts">
import Vue from "vue";
import HeaderPage from '@/components/HeaderPage.vue';
import { mask } from "vue-the-mask";
import Notifications from "@/components/Notifications.vue";
import { OrgaoCadastro } from '@/type/orgaos';
import { Notificacao } from "@/type/notificacao";
import ReturnMessage from "@/components/ReturnMessage.vue";
import RestApiService from "@/services/rest/service";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ValidarCpfMixin from "@/mixins/validarCpfMixin";

export default Vue.extend({
    directives: { mask },
    mixins: [ValidarCpfMixin],
    components: {
        HeaderPage,
        Notifications,
        ReturnMessage,
        LoadingSpinner,
    },
    props: ['id', 'tipo'],
    data() {
        return {
            disabledAll: false as boolean,
            rows: 100,
            currentPage: 1,
            stickyHeader: true as boolean,
            noCollapse: true as boolean,
            show: false as boolean,
            form: {} as OrgaoCadastro,      
            Notificacao: [] as Array<Notificacao>,
            Message: [] as Array<Notificacao>,
            loading: false as boolean,
            alert: false as boolean,     
            isLoading: false as boolean,
        };
    },
    mounted() {
        this.isLoading = false

        if(this.tipo == 'editar') {
            this.carregarDados();   
        }      

        if(this.tipo == 'visualizar'){
            this.carregarDados();  
            this.disabledAll = true; 
        }
    }, 
    methods: {
         submit() {
            let acao = this.id ? "put" : "post"
            let url = "orgaos-demandantes";       
                                            
            if (this.validarCampos()) {             
              
              this.loading = true  

              this.form.orgaoControle = this.form.orgaoControle ? 'S' : 'N'
              this.form.orgaoJustica = this.form.orgaoJustica ? 'S' : 'N'

            
              RestApiService.salvar(url, this.form, acao, this.form.idOrgao)
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
                        
            RestApiService.get("orgaos-demandantes/id", this.id)
                .then((res: any) => {   
                this.form.idOrgao =  res.data.id_orgao 
                this.form.orgaoDemandante = res.data.orgao_demandante
                this.form.siglaOrgao =  res.data.sigla_orgao
                this.form.esferaOrgao = res.data.esfera_orgao
                this.form.orgaoControle = res.data.orgao_controle == 'S' ? true : false
                this.form.orgaoJustica = res.data.orgao_justica == 'S' ? true : false  
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
             
        validarCampos(): boolean {
            this.Notificacao = [];

            if (!this.form.orgaoDemandante) {
                this.adicionarNotificacao(
                "danger",
                "Campo Nome é obrigatório!"
                );
            }

            if (!this.form.siglaOrgao) {
                this.adicionarNotificacao(
                "danger",
                "Campo Sigla é obrigatório!"
                );
            }

             if (!this.form.esferaOrgao) {
                this.adicionarNotificacao(
                "danger",
                "Campo Esfera é obrigatório!"
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
                }, 5000);
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
                this.$bvModal.hide('modal-cadastro-orgao')
                this.$bvModal.hide('modal-editar-orgao')
                this.$emit("listarOrgaos");
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
