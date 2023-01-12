<template>
    <div class="importar col-6"> 
        <b-form-group class="input-upload">
            <label>Importar Feriados:</label>
            <b-form-file type="text" placeholder="arquivo .CSV"  
             class="label-uplad col-sm-6 col-md-6 col-lg-12"
             accept=".csv" v-model="feriadoFile"
             drop-placeholder="Drop file here..." @change=""
              />           
        </b-form-group>
        <b-button variant="primary" class="button-upload" v-b-tooltip.hover="'Importar'">
            <b-icon icon="cloud-upload" aria-hidden="true"></b-icon>
        </b-button>  
        <b-button class="bordered button-reset" @click="feriadoFile = ''">Resetar</b-button>      

    </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
    name: 'UploadFeriado',
    data() {
        return {
            feriadoFile: '' as string
        }
    }
})
</script>

<style>
    .importar{
        display: flex;
        align-items: center;        
    }
    .button-upload {
        width: 55px;
        align-self: center;
        margin-left: 15px;
        margin-top: 15px;
    }
    .input-upload {
        flex-grow: 1;  
    }
    .button-reset {
        width: 150px;
        align-self: center;
        margin-left: 15px;
        margin-top: 15px;
    }

</style>