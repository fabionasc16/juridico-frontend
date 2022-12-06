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

                    <!--<b-form-group class="titulo" label="Informações pessoais" label-size="lg">
                        <hr />
                    </b-form-group>-->
                    
                <b-form @submit.prevent="submit">    
                    <h5 class="titulo2">Informações pessoais</h5>
                    <hr class="mt-0" />
                    


                    <!-- 1ª LINHA (CPF + NOME) -->
                  <div class="row">
                    <b-form-group class="font col-sm-5 col-md-5 col-lg-5">
                      <label>Nome completo <span class="text-danger">*</span></label>
                      <b-form-input :disabled="disabledAll" class="bordered" :placeholder="'Insira o nome completo'"
                        type="text" v-model="form.nome" required>
                      </b-form-input>
                    </b-form-group>

                    <b-form-group class="font col-sm-3 col-md-3 col-lg-3">
                      <label>Data de nascimento <span class="text-danger">*</span></label>
                      <b-form-input class="bordered" type="text" v-model="form.dataNascimento" placeholder="00/00/0000"
                        v-mask="'##/##/####'" :disabled="disabledAll" required></b-form-input>
                    </b-form-group>
                   

                    <!--<b-form-group label="Estado civil" class="font col-sm-3 col-md-3 col-lg-3">
                      <b-form-select :disabled="disabledAll" class="bordered" size="sm" v-model="form.estadoCivil">
                        <b-form-select-option value="">Selecione...</b-form-select-option>
                        <b-form-select-option v-for="option in optionsEstadoCivil" :value="option.value" :key="option.value">
                          {{ option.texto }}
                        </b-form-select-option>
                      </b-form-select>
                    </b-form-group>
                  
                  <div class="row">
                    <b-form-group label="Nome da mãe" class="font col-sm-6 col-md-6 col-lg-6">
                      <b-form-input :disabled="disabledAll" class="bordered" :placeholder="'Nome completo da mãe'" type="text"
                        v-model="form.nomeMae">
                      </b-form-input>
                    </b-form-group>

                    <b-form-group label="Nome do pai (se aplicável)" class="font col-sm-6 col-md-6 col-lg-6">
                      <b-form-input :disabled="disabledAll" class="bordered" :placeholder="'Nome completo do pai'" type="text"
                        v-model="form.nomePai"></b-form-input>
                    </b-form-group>
                  </div>-->
                  <!--<div class="row">
                    <b-form-group class="font col-sm-2 col-md-2 col-lg-2">
                      <label>Gênero <span class="text-danger">*</span></label>
                      <b-form-select :disabled="disabledAll" class="bordered" size="sm" v-model="form.genero" required>
                        <b-form-select-option value="">Selecione...</b-form-select-option>
                        <b-form-select-option v-for="option in optionsGenero" :value="option.value" :key="option.value">
                          {{ option.texto }}
                        </b-form-select-option>
                      </b-form-select>
                    </b-form-group>
                  
                    <b-form-group v-if="form.genero === 'autointitulado'"
                      class="font col-sm-3 col-md-3 col-lg-3 animate__animated animate__backInRight">
                      <label>Informe o gênero <span class="text-danger">*</span></label>
                      <b-form-input :disabled="disabledAll" class="bordered" :placeholder="'Exemplo: Não-binário'" type="text"
                        v-model="form.generoOutro" required></b-form-input>
                    </b-form-group>-->
                  
                  <!--<div class="row">
                    <b-form-group label="Nacionalidade" class="font col-sm-5 col-md-5 col-lg-5">
                      <b-form-select :disabled="disabledAll" class="bordered" size="sm" v-model="form.nacionalidade">
                        <b-form-select-option value="">Selecione...</b-form-select-option>
                        <b-form-select-option v-for="option in optionsNacionalidade" :value="option.value"
                          :key="option.value">
                          {{ option.texto }}
                        </b-form-select-option>
                      </b-form-select>
                    </b-form-group>

                    <b-form-group v-if="form.nacionalidade === 'Estrangeiro'" label="País:"
                      class="font col-sm-3 col-md-3 col-lg-3 animate__animated animate__backInRight">
                      <b-form-select :disabled="disabledAll" class="bordered" size="sm" v-model="form.pais">
                        <b-form-select-option value="">Selecione...</b-form-select-option>
                        <b-form-select-option v-for="option in optionsPaises" :value="option.value" :key="option.value">
                          {{ option.texto }}
                        </b-form-select-option>
                      </b-form-select>
                    </b-form-group>-->
                  
                    <b-form-group class="font col-sm-4 col-md-4 col-lg-4">
                      <label>CPF <span class="text-danger">*</span></label>
                      <b-form-input :disabled="disabledAll" class="bordered" required :placeholder="'Exemplo: 000.000.000-00'"
                        type="tel" v-model="form.cpf" v-mask="'###.###.###-##'">
                      </b-form-input>
                    </b-form-group>                  
                  </div>
                  <div class="row">
                    <b-form-group class="font col-sm-6 col-md-6 col-lg-6">
                      <label>Matrícula <span class="text-danger">*</span></label>
                      <b-form-input :disabled="disabledAll" class="bordered" required :placeholder="'Digite sua matrícula'"
                        type="tel" v-model="form.matriculaUsuario" v-mask="'###.###.###-##'">
                      </b-form-input>
                    </b-form-group>   
                    
                    <b-form-group class="font col-sm-6 col-md-6 col-lg-6">
                      <label>Cargo <span class="text-danger">*</span></label>
                      <b-form-input :disabled="disabledAll" class="bordered" required :placeholder="'Digite seu cargo'"
                        type="tel" v-model="form.cargoUsuario" >
                      </b-form-input>
                    </b-form-group> 
                  </div>

                    <!-- 2ª LINHA (MATRÍCULA + CARGO) -->
                    <h5 class="titulo2">Informações de contato</h5>
                    <hr class="mt-0" />

                  <div class="row">
                    <b-form-group class="font col-sm-6 col-md-6 col-lg-6">
                        <label>E-mail <span class="text-danger">*</span></label>
                        <b-form-input :disabled="disabledAll" class="bordered" required :placeholder="'Exemplo: mail@email.com'"
                          type="email" v-model="form.email"></b-form-input>
                      </b-form-group>

                    <b-form-group class="font col-sm-6 col-md-6 col-lg-6">
                      <label>Telefone/celular <span class="text-danger">*</span></label>
                      <b-form-input :disabled="disabledAll" class="bordered" required
                        :placeholder="'Exemplo: (00) 00000-0000'" type="tel" v-model="form.telefone"
                        v-mask="'(##) #####-####'">
                      </b-form-input>
                    </b-form-group>
                  </div>

                  <h5 class="titulo2">Acesso ao sistema</h5>
                    <hr class="mt-0" />

                  <div class="row">                    
                    <b-form-group label="Senha:" class="font col-sm-3 col-md-3 col-lg-3">
                        <b-form-input :placeholder="'Digite sua Senha'" type="text" v-model="form.senhaUsuario">
                        </b-form-input>
                      </b-form-group>

                    <b-form-group label="Senha:" class="font col-sm-3 col-md-3 col-lg-3">
                        <b-form-input :placeholder="'Repita sua senha'" type="text" v-model="form.confirmarSenha">
                        </b-form-input>
                    </b-form-group>
                  </div>

                    <!--<b-form-group class="titulo" label="Acesso ao Sistema" label-size="lg">
                        <hr />
                    </b-form-group>-->

                    <!-- (LOGIN + SENHA + SENHA) -->
                    <!--<h5 class="titulo2">Informações de endereço</h5>
                        <hr class="mt-0" />

                  <div class="row">
                    <b-form-group label="CEP" class="font col-sm-3 col-md-3 col-lg-3">
                      <b-form-input :disabled="disabledAll" class="bordered" id="cep" :placeholder="'Exemplo: 00000-000'"
                        type="tel" @keyup="searchCep()" v-model="form.cep" v-mask="'#####-###'"></b-form-input>
                      <span v-if="invalidCEP" style="color: red; font-size: 12px; padding-left: 1%">{{ invalidCEP }}</span>
                    </b-form-group>

                    <b-form-group label="Logradouro" class="font col-sm-6 col-md-6 col-lg-6">
                      <b-form-input :disabled="disabledAll" class="bordered" id="logradouro"
                        :placeholder="'Exemplo: Avenida Boulevard'" type="text" v-model="form.logradouro"></b-form-input>
                    </b-form-group>
                  </div>
                  <div class="row">
                    <b-form-group label="Número" class="font col-sm-2 col-md-2 col-lg-2">
                      <b-form-input :disabled="disabledAll" class="bordered" id="numero" :placeholder="'Exemplo: 35A'"
                        type="text" v-model="form.numero">
                      </b-form-input>
                    </b-form-group>

                    <b-form-group label="Bairro" class="font col-sm-3 col-md-3 col-lg-3">
                      <b-form-input :disabled="disabledAll" class="bordered" id="bairro" :placeholder="'Exemplo: Alvorada'"
                        type="text" v-model="form.bairro">
                      </b-form-input>
                    </b-form-group>

                    <b-form-group label="Complemento" class="font col-sm-6 col-md-6 col-lg-6">
                      <b-form-input :disabled="disabledAll" class="bordered" id="complemento"
                        :placeholder="'Exemplo: Próximo à Via Verde e Padaria X'" type="text" v-model="form.complemento">
                      </b-form-input>
                    </b-form-group>

                    <b-form-group label="Município" class="font col-sm-4 col-md-4 col-lg-4">
                      <b-form-input :disabled="disabledAll" class="bordered" id="municipio" :placeholder="'Exemplo: Manaus'"
                        type="text" v-model="form.municipio">
                      </b-form-input>
                    </b-form-group>
                    
                    <b-form-group label="Estado" class="font col-sm-4 col-md-4 col-lg-4">
                      <b-form-select :disabled="disabledAll" class="bordered" id="estado" size="sm" v-model="form.estado">
                        <b-form-select-option value="">Selecione...</b-form-select-option>
                        <b-form-select-option v-for="option in optionsEstado" :value="option.value" :key="option.value">
                          {{ option.texto }}
                        </b-form-select-option>
                      </b-form-select>
                    </b-form-group>
                  </div>-->

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
import axios from "axios";
import HeaderPage from '@/components/HeaderPage.vue';
import { mask } from "vue-the-mask";
import Notifications from "@/components/Notifications.vue";
import RestApiService from "@/services/rest/service";
import { BIconSearch, BIconPlusCircle, BIconInfoCircle, BIconJournalPlus } from 'bootstrap-vue'
import ReturnMessage from "@/components/ReturnMessage.vue";
import { Notificacao } from "@/type/notificacao";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import ValidarCpfMixin from "@/mixins/validarCpfMixin";
import { Usuario } from "@/type/usuario";


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
        LoadingSpinner,
    },
    props: ['id', 'tipo'],
    data() {
        return {
            disabledAll: false as boolean,
            rows: 100,
            currentPage: 1,
            stickyHeader: true,
            noCollapse: true,
            show: false as boolean,
            Message: [] as Array<Notificacao>,
            Notificacao: [] as Array<Notificacao>,
            loading: false as boolean,
            alert: false as boolean,
            isLoading: false as boolean,
            form: {} as Usuario,
                /*id: "" as string,
                perfilUsuario: "",
                setorUsuario: "" as string,
                nome: "" as string,
                nomeMae: "" as string,
                nomePai: "" as string,
                estadoCivil: "",
                dataNascimento: "" as string,
                nacionalidade: "",
                cpf: "" as string,
                email: "" as string,
                telefone: "" as string,
                cep: "" as string,
                logradouro: "" as string,
                complemento: "" as string,
                numero: "" as string,
                bairro: "" as string,
                municipio: "" as string,
                estado: "",
                pais: "",
                generoOutro: "" as string,
                genero: "",

                /*cpfUsuario: "" as string,
                nomeUsuario: "" as string,
                matriculaUsuario: "" as string,
                cargoUsuario: "" as string,
                loginUsuario: "" as string,
                senhaUsuario: "" as string,
            },*/
            
            /*fields: [
                {
                    key: 'cpfUsuario',
                    label: 'CPF',
                    sortable: true
                },
                {
                    key: 'nomeUsuario',
                    label: 'Nome Completo',
                    sortable: true
                },
                {
                    key: 'matriculaUsuario',
                    label: 'Matrícula',
                    sortable: true,
                },
                {
                    key: 'cargoUsuario',
                    label: 'Cargo',
                    sortable: true,
                },
            ],*/
            /*items: [
                { isActive: true, cpfUsuario: "123.145.147-11", nomeUsuario: "Thaís Condida", matriculaUsuario: "12345-A", cargoUsuario: 'Advogado' },
                { isActive: true, cpfUsuario: "154.478.459-89", nomeUsuario: "Chico Cunha", matriculaUsuario: "54321-A", cargoUsuario: 'Auxiliar' },
                { isActive: true, cpfUsuario: "521.845.987.-14", nomeUsuario: "Pacífico Armando Guerra", matriculaUsuario: "12345-A", cargoUsuario: 'Estagiário' },
                { isActive: true, cpfUsuario: "458.987.589-99", nomeUsuario: "Um Dois Três de Oliveira Quatro", matriculaUsuario: "12345-A", cargoUsuario: 'Diretor' },
                { isActive: true, cpfUsuario: "154.623.352-13", nomeUsuario: "Vicente Mais ou  Menos de Souza", matriculaUsuario: "12345-A", cargoUsuario: 'Gerente' },
                { isActive: true, cpfUsuario: "154.623.352-13", nomeUsuario: "Vicente Mais ou  Menos de Souza", matriculaUsuario: "12345-A", cargoUsuario: 'Gerente' },
                { isActive: true, cpfUsuario: "154.623.352-13", nomeUsuario: "Vicente Mais ou  Menos de Souza", matriculaUsuario: "12345-A", cargoUsuario: 'Gerente' },
                { isActive: true, cpfUsuario: "225.112.002-09", nomeUsuario: "Deyde Costa", matriculaUsuario: "12345-A", cargoUsuario: 'Advogada' },
                { isActive: true, cpfUsuario: "007.007.007-07", nomeUsuario: "James Bond", matriculaUsuario: "007-A", cargoUsuario: 'Agente Secreto' }

            ]*/
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
            let url = "/auth";
            //alert("enviar");
            if (this.validarCampos()) {
              console.log('JSON: ',JSON.stringify(this.form))              
              this.loading = true  

              //this.form.orgaoControle = this.form.orgaoControle ? 'S' : 'N'
              //this.form.orgaoJustica = this.form.orgaoJustica ? 'S' : 'N'

            
              RestApiService.salvar(url, this.form, acao, this.form.id)
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
            }
        },
        carregarDados(): void {
          this.loading = true;
          RestApiService.get("usuario/detalhes", this.id)
            .then((response: any) => {
            
            this.form.id = response.data.id;  
            this.form.nome = response.data.nome;
            //this.form.setorUsuario = response.data.setorUsuario
            //this.form.unidadeUsuario = response.data.unidadeUsuario          
            this.form.dataNascimento = response.data.dataNascimento;
            //this.dataNascimentoBR = response.data.dataNascimento ? formatarDataBrMixin.methods.formatarDataBr(response.data.dataNascimento) : '';                    
            this.form.cpf = response.data.cpf;
            this.form.email = response.data.email;
            this.form.telefone = response.data.telefone;
            
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
            
            /*if(!this.form.id){
                this.adicionarNotificacao(
                "danger",
                "Campo Assunto é obrigatório!"
                );
            }     */
            
            if(!this.form.nome){
                this.adicionarNotificacao(
                "danger",
                "Campo Nome é obrigatório!"
                );
            }

            if(!this.form.dataNascimento){
                this.adicionarNotificacao(
                "danger",
                "Campo Data de nascimento é obrigatório!"
                );            
            }

            if(!this.form.cpf){
                this.adicionarNotificacao(
                "danger",
                "Campo CPF é obrigatório!"
                );            
            }

            if(!this.form.email){
                this.adicionarNotificacao(
                "danger",
                "Campo E-mail é obrigatório!"
                );            
            }

            if(!this.form.telefone){
                this.adicionarNotificacao(
                "danger",
                "Campo Telefone/celular é obrigatório!"
                );            
            }

            /*if(!this.form.loginUsuario){
                this.adicionarNotificacao(
                "danger",
                "Campo Login é obrigatório!"
                );            
            }*/

            if(!this.form.senhaUsuario){
                this.adicionarNotificacao(
                "danger",
                "Campo senha é obrigatório!"
                );            
            }

            

            if (this.Notificacao.length > 0) {
                    this.loading = false;
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
        voltar(): void {
            this.$router.push("/");
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
                this.$bvModal.hide('modal-cadastro-usuario')
                this.$bvModal.hide('modal-editar-usuario')
                this.$emit("listarUsuarios");
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
