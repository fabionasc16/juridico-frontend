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
				name: "Cadastro de Usuários",
				path: "/usuarios"
			},
			{
				name: "Cadastro de Características",
				path: "/caracteristicas"
			},
			{
				name: "About",
				path: "/about"
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