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

                   <!-- <b-form-group class="titulo" label="Informações pessoais" label-size="lg">
                        <hr />
                    </b-form-group> -->

                   
                    <!-- 1ª LINHA (CPF + NOME) -->
                    <div class="row mt-3" >
                        <b-form-group class="font col-sm-5 col-md-5 col-lg-5">
                           <label>CPF {{ form.idUsuario }}<span class="text-danger">*</span>:</label>
                            <b-form-input :placeholder="'Digite seu CPF '" type="text" 
                                v-model="form.cpfResponsavel"
                                @focusout="verificaCpf"
                                v-mask="'###.###.###-##'" required :disabled="disabledAll||tipo=='editar'"></b-form-input>
                        </b-form-group>

                        <b-form-group class="font col-sm-7 col-md-7 col-lg-7">
                            <label>Nome completo<span class="text-danger">*</span>:</label>
                            <b-form-input :placeholder="'Digite seu Nome Completo'" type="text"
                                v-model="form.nomeResponsavel" required :disabled="disabledAll || disableMenosCPF">
                            </b-form-input>
                        </b-form-group>
                    </div>
                    <div class="row">
                        <!-- 2ª LINHA  -->
                        <b-form-group class="font col-sm-5 col-md-5 col-lg-5">
                            <label>Telefone<span class="text-danger">*</span>:</label>
                            <b-form-input :placeholder="'(00) 00000-0000'" type="text"
                                v-model="form.telefone" v-mask="'(##) #####-####'" required :disabled="disabledAll || disableMenosCPF"></b-form-input>
                        </b-form-group>

                        <b-form-group class="font col-sm-7 col-md-7 col-lg-7">
                            <label>Email<span class="text-danger">*</span>:</label>
                            <b-form-input :placeholder="'Digite seu Email'" type="email" v-model="form.email" required
                              :disabled="disabledAll || disableMenosCPF">
                            </b-form-input>
                        </b-form-group>
                    </div>
                    <div class="row">
                        <!-- 3ª LINHA  -->                      
                        <b-form-group class="font col-sm-5 col-md-5 col-lg-5">
                             <label>Registro OAB:<span class="text-danger">*</span>:</label>
                            <b-form-input :placeholder="'Digite seu Registro OAB'" type="text" v-model="form.registroOAB"
                             required :disabled="disabledAll || disableMenosCPF">
                            </b-form-input>
                        </b-form-group>
                    </div>

                    <div class="py-2 mt-10" align="right">                         
                       <slot name="buttons"></slot>
                       <b-button v-if="!disabledAll" 
                       class="bordered ml-2" type="submit" variant="success"
                       :disabled="disableMenosCPF">Salvar</b-button>
                    </div>
                    <div class="row p-3"> 
                        <small>* O responsável deve estar cadastrado como usuário do sistema.</small>              
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
import { ResponsavelCadastro } from '@/type/responsavel';
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
    props: ['id', 'tipo'],
    data() {
        return {
            disabledAll: false as boolean,
            disableMenosCPF: false as boolean,
            rows: 100,
            currentPage: 1,
            stickyHeader: true as boolean,
            noCollapse: true as boolean,
            show: false as boolean,
            form: {} as ResponsavelCadastro,      
            Notificacao: [] as Array<Notificacao>,
            Message: [] as Array<Notificacao>,
            loading: false as boolean,
            alert: false as boolean,     
            isLoading: false as boolean,
        };
    },
    mounted() {
        this.isLoading = false

        if(this.tipo == 'cadastrar') {
            this.disableMenosCPF = true;   
        } 

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
            let url = "responsaveis";           
                    
            if (this.validarCampos()) {   
              this.loading = true  
            
              RestApiService.salvar(url, this.form, acao, this.form.idResponsavel)
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

        //limpar campos que são preenchidos após CPF
        limparCampos(){
            this.form.nomeResponsavel = ""
            this.form.telefone = ""
            this.form.email = ""
            this.form.registroOAB = ""
            this.form.idUsuario = ""
        },

        verificaCpf():void {  
            this.Notificacao = []; 

            this.form.idUsuario = ""

            if(this.form && this.form.cpfResponsavel && this.form.cpfResponsavel.length == 14){                 
                    if(this.form.cpfResponsavel && !ValidarCpfMixin.methods.validarCpf(this.form.cpfResponsavel)){
                        this.limparCampos()
                        this.disableMenosCPF = true
                        this.adicionarNotificacao(
                        "danger",
                        "CPF inválido!"
                        );
                        return;
                    }    

                    RestApiService.get('usuarios/cpf', `${this.form.cpfResponsavel}` )          
                    .then((response: any) => {    
                        this.form.idUsuario = response.data._id                          
                        this.form.nomeResponsavel = response.data.nome   
                        this.form.telefone = response.data.telefone
                        this.form.email = response.data.email 
                        this.disableMenosCPF=false                                                    
                    })
                    .catch((e) => {        
                        this.limparCampos()         
                        this.disableMenosCPF = true  
                        if (e && e.response.status &&  e.response.status == 404) {                                                   
                           this.adicionarAlert(
                                "alert",
                                "Erro! O responsável deve estar cadastrado como usuário do sistema!"
                            );
                        }                    
                    });
                }else{
                    this.limparCampos()
                    this.disableMenosCPF = true
                }            
        },

         carregarDados(): void {
            this.loading = true;       
                        
            RestApiService.get("responsaveis/id", this.id)
                .then((res: any) => {          

                console.log(res.data)

                this.form.idResponsavel =  res.data.id_responsavel 
                this.form.nomeResponsavel = res.data.nome_responsavel
                this.form.cpfResponsavel =  res.data.cpf_responsavel
                this.form.telefone = res.data.telefone
                this.form.email = res.data.email
                this.form.registroOAB = res.data.registro_oab               
               
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

            if (!this.form.nomeResponsavel) {
                this.adicionarNotificacao(
                "danger",
                "Nome é obrigatório!"
                );
            }

           if(!this.form.cpfResponsavel){
                this.adicionarNotificacao(
                "danger",
                "CPF é obrigatório!"
                );
            }     
        
            if(this.form.cpfResponsavel && !ValidarCpfMixin.methods.validarCpf(this.form.cpfResponsavel)){
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
             if(this.Message[0].type == 'success') {
                this.$bvModal.hide('modal-cadastro-responsavel')
                this.$bvModal.hide('modal-editar-responsavel')
                this.$emit("listarResponsaveis");
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
