<template>
    <div class="root container-fluid">
        <div id="root-row" class="row">
            <div class="sidebar" :class="sidebarClass">
                <sidebar />
            </div>
            <div class="content px-0" :class="contentClass">
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
                    <div class="content-body p-3 p-lg-1">
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
    .root{
        min-height: 100vh;  
    }
    #root-row{
        min-height: 100vh;  
    }
    .sidebar{
        background-color: #293258;
    }
    .content{
        background-color: white;
        padding: 0;
    }
    .botao-retrair{
        padding: 2%;   
    }
    .listagem a{
        color:white;
        font-weight: bold;
    }
    .listagem a{
        box-shadow: inset 0 0 0 0 #00bac0;
        color:white;
        font-weight: bold;
        transition: color .3s ease-in-out, box-shadow;
        border-radius: 15px;
    }
    .listagem a:hover{
        text-decoration: none;
        box-shadow: inset 300px 0 0 0 #00bac0;
        color:white;
        border-radius: 15px;
    }
</style>