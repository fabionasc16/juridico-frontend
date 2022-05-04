<template>
	<div class="container">
		<b-form class="row">
			<b-form-group v-for="(c,index) in caracteristicas" :key="index" :label="c.categoria" class="font col-sm-3 col-md-3 col-lg-3">
				<b-form-select size="sm" v-model="form.caracteristicas[c.label]" >
					<b-form-select-option :value="t" v-for="t in c.tipos" :key="t">
						{{t}}
					</b-form-select-option>
				</b-form-select>
			</b-form-group>
		</b-form>
	</div>
</template>
<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { CaracteristicaSeeder } from '@/type/caracteristicas'
export default Vue.extend({
	data(){
		return {
			form:{
				caracteristicas:{}
			},
			caracteristicas: CaracteristicaSeeder
		}
	},
	computed:{
		...mapGetters('caracteristicas',['getTeste'])
	}
})
</script>