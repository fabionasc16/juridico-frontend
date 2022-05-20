<template>
    <div>
        <header-page :titulo="'Processos'" :descricao="'Cadastro, Consulta, Edição'" />

        <b-container>
            <div class="row">

                <b-form-group class="titulo" label="Consulta de Processos" label-size="lg">
                    <hr />
                </b-form-group>

            </div>
        </b-container>
    </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import HeaderPage from '@/components/HeaderPage.vue'
import { mask } from "vue-the-mask";
import Notifications from "@/components/Notifications.vue";
import { Notificacao } from "@/type/notificacao";
import { GrauParentescoSeeder } from "@/type/parentesco";
import { mapActions } from 'vuex'
import { BIconSearch } from 'bootstrap-vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    name: 'BarChart',
    components: {
        HeaderPage,
        Bar
    },
    props: {
        chartId: {
            type: String,
            default: 'bar-chart'
        },
        datasetIdKey: {
            type: String,
            default: 'label'
        },
        width: {
            type: Number,
            default: 400
        },
        height: {
            type: Number,
            default: 400
        },
        cssClasses: {
            default: '',
            type: String
        },
        styles: {
            type: Object,
            default: () => { }
        },
        plugins: {
            type: Object,
            default: () => { }
        }
    },
    data() {
        return {
            chartData: {
                labels: ['January', 'February', 'March'],
                datasets: [{ data: [40, 20, 12] }]
            },
            chartOptions: {
                responsive: true
            }
        }
    }
}
</script>