<template>
    <div>
        <b-container fluid>
            <div class="row">
                <b-form-group class="titulo m-0" label="Página Inicial" label-size="lg">
                    <hr />
                </b-form-group>
            </div>
            <div class="row" style="border: 2px solid red;">
                <div class="col">
                    <div class="card">
                        <div class="card-header">Card 1</div>
                        <div class="card-body"></div>
                        <div class="card-footer"></div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-header">Card 2</div>
                        <div class="card-body"></div>
                        <div class="card-footer"></div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-header">Card 3</div>
                        <div class="card-body"></div>
                        <div class="card-footer"></div>
                    </div>
                </div>
                <div class="col">
                    <div class="card">
                        <div class="card-header">Card 4</div>
                        <div class="card-body"></div>
                        <div class="card-footer"></div>
                    </div>
                </div>
            </div>
        </b-container>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default Vue.extend({
    name: 'HomeView',
    components: {
        HelloWorld,
    },
});
</script>
