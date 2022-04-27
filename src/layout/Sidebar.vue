<template>
    <div>
        <!-- Identificação do sistema -->
        <div class="logo text-center">
            Ticados
        </div>
        <!-- Listagem das rotas -->
        <nav class="listagem pt-5">
            <router-link class="d-block p-2" v-for="(r,index) in commonMenus" :key="index" :to="r.path">
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
import {menusMixin} from '../mixins/menu'
export default Vue.extend({
    mixins:[
        menusMixin as Object // Mixin com menus utilizáveis
    ],
    data(){
        return {
            currentRoute: this.$route.name
        }
    },
    computed:{
        currentRoute(){ return this.$route.name}
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

.footer{
    position: fixed;
    bottom: 20px;
    color: white;
}
</style>