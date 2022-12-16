import { RouteConfig } from "vue-router"
const menusMixin = {
	data() {
		return {
			commonMenus: [
			/*{
				name: "Página Inicial",
				path: "/home",
				meta: { menu: "" }
			},
			{
				name: "Dashboard",
				path: "/dashboard",
				meta: { menu: "" }
			},*/
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
			
				name: "Assuntos",
				path: "/assuntos",
				meta: { menu: "Cadastros"}
			},
			{
				name: "Classificação",
				path: "/classificacoes",
				meta: { menu: "Cadastros" }
				
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