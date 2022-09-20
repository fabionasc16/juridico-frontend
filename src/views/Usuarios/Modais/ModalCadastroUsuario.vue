<template>
    <div>
        <!-- CARD DE CADASTRO -->
        <div class="card">
            <div class="col-12">
                <b-form @submit.prevent="submit">

                    <b-form-group class="titulo" label="Informações pessoais" label-size="lg">
                        <hr />
                    </b-form-group>

                    <!-- 1ª LINHA (CPF + NOME) -->
                    <div class="row">
                        <b-form-group label="CPF:" class="font col-sm-5 col-md-5 col-lg-5">
                            <b-form-input :placeholder="'Digite seu CPF '" type="text" v-model="form.cpfUsuario"
                                v-mask="'###.###.###-##'"></b-form-input>
                        </b-form-group>

                        <b-form-group label="Nome completo:" class="font col-sm-7 col-md-7 col-lg-7">
                            <b-form-input :placeholder="'Digite seu Nome Completo'" type="text"
                                v-model="form.nomeUsuario">
                            </b-form-input>
                        </b-form-group>
                    </div>
                    <div class="row">
                        <!-- 2ª LINHA (MATRÍCULA + CARGO) -->
                        <b-form-group label="Matrícula:" class="font col-sm-5 col-md-5 col-lg-5">
                            <b-form-input :placeholder="'Digite sua Matrícula'" type="text"
                                v-model="form.matriculaUsuario" v-mask="'###.###.###-##'"></b-form-input>
                        </b-form-group>

                        <b-form-group label="Cargo:" class="font col-sm-7 col-md-7 col-lg-7">
                            <b-form-input :placeholder="'Digite seu Cargo'" type="text" v-model="form.cargoUsuario">
                            </b-form-input>
                        </b-form-group>
                    </div>

                    <b-form-group class="titulo" label="Acesso ao Sistema" label-size="lg">
                        <hr />
                    </b-form-group>

                    <!-- (LOGIN + SENHA + SENHA) -->
                    <div class="row">
                        <b-form-group label="Login:" class="font col-sm-4 col-md-4 col-lg-4">
                            <b-form-input :placeholder="'Login = CPF'" type="text" v-model="form.loginUsuario">
                            </b-form-input>
                        </b-form-group>

                        <b-form-group label="Senha:" class="font col-sm-3 col-md-3 col-lg-3">
                            <b-form-input :placeholder="'Digite sua Senha'" type="text" v-model="form.senhaUsuario">
                            </b-form-input>
                        </b-form-group>

                        <b-form-group label="Repita a Senha:" class="font col-sm-3 col-md-3 col-lg-3">
                            <b-form-input :placeholder="'Digite a Senha novamente'" type="text"
                                v-model="form.senhaUsuario">
                            </b-form-input>
                        </b-form-group>
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


export default Vue.extend({
    directives: { mask },
    data() {
        return {
            rows: 100,
            currentPage: 1,
            stickyHeader: true,
            noCollapse: true,
            show: false as boolean,
            form: {
                cpfUsuario: "" as string,
                nomeUsuario: "" as string,
                matriculaUsuario: "" as string,
                cargoUsuario: "" as string,
                loginUsuario: "" as string,
                senhaUsuario: "" as string,
            },
            fields: [
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
            ],
            items: [
                { isActive: true, cpfUsuario: "123.145.147-11", nomeUsuario: "Thaís Condida", matriculaUsuario: "12345-A", cargoUsuario: 'Advogado' },
                { isActive: true, cpfUsuario: "154.478.459-89", nomeUsuario: "Chico Cunha", matriculaUsuario: "54321-A", cargoUsuario: 'Auxiliar' },
                { isActive: true, cpfUsuario: "521.845.987.-14", nomeUsuario: "Pacífico Armando Guerra", matriculaUsuario: "12345-A", cargoUsuario: 'Estagiário' },
                { isActive: true, cpfUsuario: "458.987.589-99", nomeUsuario: "Um Dois Três de Oliveira Quatro", matriculaUsuario: "12345-A", cargoUsuario: 'Diretor' },
                { isActive: true, cpfUsuario: "154.623.352-13", nomeUsuario: "Vicente Mais ou  Menos de Souza", matriculaUsuario: "12345-A", cargoUsuario: 'Gerente' },
                { isActive: true, cpfUsuario: "154.623.352-13", nomeUsuario: "Vicente Mais ou  Menos de Souza", matriculaUsuario: "12345-A", cargoUsuario: 'Gerente' },
                { isActive: true, cpfUsuario: "154.623.352-13", nomeUsuario: "Vicente Mais ou  Menos de Souza", matriculaUsuario: "12345-A", cargoUsuario: 'Gerente' },
                { isActive: true, cpfUsuario: "225.112.002-09", nomeUsuario: "Deyde Costa", matriculaUsuario: "12345-A", cargoUsuario: 'Advogada' },
                { isActive: true, cpfUsuario: "007.007.007-07", nomeUsuario: "James Bond", matriculaUsuario: "007-A", cargoUsuario: 'Agente Secreto' }

            ]
        };
    },
    methods: {
        submit() {
            alert("enviar");
        },
        voltar(): void {
            this.$router.push("/");
        }
    },
    components: {
        HeaderPage,
        BIconSearch,
        BIconJournalPlus,
        BIconPlusCircle,
        BIconInfoCircle,
        Notifications,
    }
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
