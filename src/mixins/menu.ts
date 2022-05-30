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
				name: "Dashboard",
				path: "/dashboard"
			},
			{
				name: "Processos",
				path: "/processos"
			},
			{
				name: "Usuários",
				path: "/usuarios"
			},
			{
				name: "Processos (Melhorias)",
				path: "/processos2"
			},
			{
				name: "Processos (Melhorias3)",
				path: "/processos3"
			},
			{
				name: "Usuários (Melhorias)",
				path: "/usuarios2"
			},
			// {
			// 	name: "Gráfico de Colunas",
			// 	path: "/graficoColunas"
			// },
			// {
			// 	name: "Gráfico de Pizza",
			// 	path: "/graficoPizza"
			// },
			// {
			// 	name: "Gráfico de Linha",
			// 	path: "/graficoLinha"
			// },
			// {
			// 	name: "Gráfico de Linhas",
			// 	path: "/graficoLinhas"
			// },
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