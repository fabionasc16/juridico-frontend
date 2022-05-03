import { RouteConfig } from "vue-router"
const menusMixin = {
	data() {
		return {
			commonMenus: [
			{
				name: "Página Inicial",
				path: "/"
			},
			{
				name: "Cadastro de Pacientes",
				path: "/pacientes"
			},
			{
				name: "Consulta de Pacientes",
				path: "/pacientes/consulta"
			},
			{
				name: "Cadastro de Características",
				path: "/caracteristicas"
			}			
			] as Array<RouteConfig>
		}
	},
	methods:{
		isActiveRoute(route:string, name: string): boolean{
			return route == name
		}
	}
}
export { menusMixin }