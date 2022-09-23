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
				name: "Responsáveis",
				path: "/responsaveis"
			},
			{
				name: "Usuários",
				path: "/usuarios"
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