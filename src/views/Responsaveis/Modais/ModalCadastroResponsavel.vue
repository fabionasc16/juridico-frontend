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

                    <b-form-group class="titulo" label="Informações pessoais" label-size="lg">
                        <hr />
                    </b-form-group>

                    <!-- 1ª LINHA (CPF + NOME) -->
                    <div class="row">
                        <b-form-group class="font col-sm-5 col-md-5 col-lg-5">
                           <label>CPF<span class="text-danger">*</span>:</label>
                            <b-form-input :placeholder="'Digite seu CPF '" type="text" v-model="form.cpf"
                                v-mask="'###.###.###-##'" required></b-form-input>
                        </b-form-group>

                        <b-form-group class="font col-sm-7 col-md-7 col-lg-7">
                            <label>Nome completo<span class="text-danger">*</span>:</label>
                            <b-form-input :placeholder="'Digite seu Nome Completo'" type="text"
                                v-model="form.nome" required>
                            </b-form-input>
                        </b-form-group>
                    </div>
                    <div class="row">
                        <!-- 2ª LINHA  -->
                        <b-form-group label="Telefone:" class="font col-sm-5 col-md-5 col-lg-5">
                            <b-form-input :placeholder="'(00) 00000-0000'" type="text"
                                v-model="form.telefone" v-mask="'(##) #####-####'"></b-form-input>
                        </b-form-group>

                        <b-form-group label="Email:" class="font col-sm-7 col-md-7 col-lg-7">
                            <b-form-input :placeholder="'Digite seu Email'" type="email" v-model="form.email">
                            </b-form-input>
                        </b-form-group>
                    </div>
                    <div class="row">
                        <!-- 3ª LINHA  -->                      
                        <b-form-group label="Registro OAB:" class="font col-sm-5 col-md-5 col-lg-5">
                            <b-form-input :placeholder="'Digite seu Registro OAB'" type="text" v-model="form.registroOAB">
                            </b-form-input>
                        </b-form-group>
                    </div>

                    <div class="py-2 mt-10" align="right">                        
                       <slot name="buttons"></slot>
                       <b-button class="bordered ml-2" type="submit" variant="success">Salvar</b-button>
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
import { BIconSearch, BIconPlusCircle, BIconInfoCircle, BIconJournalPlus } from 'bootstrap-vue'
import { Responsavel } from '@/type/responsavel';
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
        BIconSearch,
        BIconJournalPlus,
        BIconPlusCircle,
        BIconInfoCircle,
        Notifications,
        ReturnMessage,
        LoadingSpinner,
    },
    props: ['id'],
    data() {
        return {
            rows: 100,
            currentPage: 1,
            stickyHeader: true,
            noCollapse: true,
            show: false as boolean,
            form: {} as Responsavel,      
            Notificacao: [] as Array<Notificacao>,
            Message: [] as Array<Notificacao>,
            loading: false as boolean,
            alert: false as boolean,     
            isLoading: false as boolean,
        };
    },
    mounted() {
        this.isLoading = false
        
           /* const path = this.$route.path;
            const acao = "/editar";

            if (path.includes(acao)) {
                this.carregarDados();            
            }*/          
    }, 
    methods: {
         submit() {
            let acao = this.id ? "put" : "post"
            let url = "responsaveis";
            //let url = this.id ? "responsavel/update" : "responsavel";
                    
            if (this.validarCampos()) { 

              console.log('JSON: ',JSON.stringify(this.form))
              
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
                        
            RestApiService.get("responsavel/listid", this.id)
                .then((res: any) => {          

                this.form.id_responsavel =  res.data.idResponsavel 
                this.form.nome_responsavel = res.data.nome
                this.form.cpf_responsavel =  res.data.cpf
                this.form.telefone = res.data.telefone
                this.form.email = res.data.email
                this.form.registro_oab = res.data.registroOAB               
               
            })
            .catch((e) => {
                /*  this.adicionarAlert(
                    "alert",
                    "Houve um erro ao carregar os dados. Tente novamente!"
                );*/
          
            })
            .finally(() => {
                this.loading = false;
            });
        },
       

        validarCampos(): boolean {
            this.Notificacao = [];

            if (!this.form.nome_responsavel) {
                this.adicionarNotificacao(
                "danger",
                "Nome é obrigatório!"
                );
            }

           if(!this.form.cpf_responsavel){
                this.adicionarNotificacao(
                "danger",
                "CPF é obrigatório!"
                );
            }     
        
            if(this.form.cpf_responsavel && !ValidarCpfMixin.methods.validarCpf(this.form.cpf_responsavel)){
                this.adicionarNotificacao(
                "danger",
                "CPF inválido!"
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
