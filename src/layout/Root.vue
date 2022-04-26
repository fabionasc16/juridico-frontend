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
import Vue from 'vue'
export default Vue.extend({
    components:{
        ContentHeader,
        Sidebar
    },
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

    }
})
</script>

<style scoped>
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
</style>