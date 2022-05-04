<template>
    <b-container fluid style="padding: 1% 3% 1% 2%">
        <b-row>
            <div class="animate__animated animate__fadeIn slower col-12">
                <h2>{{titulo}}</h2>
                <p style="color: grey; font-size: 0.9em">
                    {{descricao}}
                </p>
                <hr>
            </div>
        </b-row>
    </b-container>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    props:{
        titulo: String,
        descricao: String 
    }
})
</script>