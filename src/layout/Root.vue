<template>
    <div class="root container-fluid">
        <div class="row">
            <div class="sidebar" :class="sidebarClass">
                <sidebar />
            </div>
            <div class="content" :class="contentClass">
                <div class="content">
                    <content-header>
                       <b-btn class="d-none d-lg-block" variant="primary" @click="retraido = !retraido">
                           ...
                       </b-btn>
                        <b-nav class="listagem" :class="menuHeaderClass">
                            <router-link class="ml-2 px-3" v-for="(r,index) in commonMenus" :key="index" :to="r.path">
                                {{r.name}}  
                            </router-link>
                        </b-nav>
                    </content-header>
                    <div class="content-body">
                        <slot></slot>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Sidebar from './Sidebar.vue'
import ContentHeader from './Header.vue'
import {menusMixin} from '../mixins/menu'
import Vue from 'vue'
export default Vue.extend({
    components:{
        ContentHeader,
        Sidebar
    },
    mixins:[
        menusMixin
    ],
    data(){
        return {
            retraido: false as boolean
        }
    },
    computed:{
        sidebarClass(): string{
            return !this.retraido? "d-none d-lg-block col-2" : "d-none" 
        },
        contentClass(): string{
            return !this.retraido? "col-12 col-lg-10 " : "col-12" 
        },
        menuHeaderClass(): string{
            return !this.retraido? "d-block d-lg-none": "d-block" 
        }

    }
})
</script>

<style>
    .root .row{
        min-height: 100vh;  
    }
    .sidebar{
        background-color: #1b2038;
    }
    .content{
        background-color: white;
        padding: 0;
    }
    .content-body{
        padding: 1%;
    }
    .botao-retrair{
        padding: 2%;   
    }
    .listagem a{
        color:white;
        font-weight: bold;
    }
    .listagem a:hover{
        background-color:rgb(76, 138, 138);
        text-decoration: none;
    }
</style>