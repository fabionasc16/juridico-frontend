<template>
    <div>
        <!-- Identificação do sistema -->
        <div class="logo text-center">
            Ticados
        </div>
        <!-- Listagem das rotas -->
        <nav class="listagem">
            <router-link class="d-block py-2" v-for="(r,index) in routes" :key="index" :to="r.path">
                {{r.name}}
            </router-link>
        </nav>
        <div class="footer">
            <p class="justify-center">
                Secretaria de Saúde 
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { RouteConfig } from 'vue-router'
export default Vue.extend({
    data(){
        return {
            routes:[
                {
                  name: "Página Inicial",
                  path: "/"
                },
                {
                  name: "About",
                  path: "/about"
                }
            ] as Array<RouteConfig>
        }
    }
})
</script>

<style scoped>
.logo{
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 1.5rem;
    color: white;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.listagem{
    list-style-type:none;
    margin-top: 20px;
}
.listagem a{
    color:white;
}
.footer{
    position: fixed;
    bottom: 20px;
    color: white;
}
</style>