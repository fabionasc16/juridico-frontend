import { RouteConfig } from "vue-router"
const menusMixin = {
	data() {
		return {
			commonMenus: [
			{
				name: "Página Inicial",
				path: "/",
				meta: { menu: "" }
			},
			{
				name: "Dashboard",
				path: "/dashboard",
				meta: { menu: "" }
			},
			{
				name: "Processos",
				path: "/processos",
				meta: { menu: "" }
			},
			{
				name: "Responsáveis",
				path: "/responsaveis",
				meta: { menu: "Cadastros" }
			},
			{
				name: "Feriados",
				path: "/feriados",
				meta: { menu: "Cadastros" }
			},
			{
				name: "Orgãos",
				path: "/orgaos",
				meta: { menu: "Cadastros" }
			},
			{
				name: "Tipos Processo",
				path: "/tiposprocesso",
				meta: { menu: "Cadastros" }
			},
			{
				name: "Usuários",
				path: "/usuarios",
				meta: { menu: "Cadastros" }
			},
			{
<<<<<<< HEAD
				name: "Assuntos",
				path: "/assuntos",
				meta: { menu: "Cadastros"}
=======
				name: "Classificação",
				path: "/classificacoes",
				meta: { menu: "Cadastros" }
>>>>>>> 0e83e4861b9a08b5317d8c198b0fa38e9e3c9adb
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