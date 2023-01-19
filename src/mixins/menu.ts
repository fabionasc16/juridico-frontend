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
				meta: { menu: "" , permission: "SAPEJ_DASHBOARD" }
			},*/
			{
				name: "Processos",
				path: "/processos",
				meta: { menu: "", permission: "SAPEJ_PROCESSO"  }
			},
			{
				name: "Responsáveis",
				path: "/responsaveis",
				meta: { menu: "Cadastros" , permission: "SAPEJ_RESPONSAVEL" }
			},
			{
				name: "Feriados",
				path: "/feriados",
				meta: { menu: "Cadastros", permission: "SAPEJ_FERIADO"  }
			},
			{
				name: "Orgãos",
				path: "/orgaos",
				meta: { menu: "Cadastros" , permission: "SAPEJ_ORGAO" }
			},
			{
				name: "Tipos Processo",
				path: "/tiposprocesso",
				meta: { menu: "Cadastros" , permission: "SAPEJ_TIPO_PROCESSO" }
			},
			{
				name: "Usuários",
				path: "/usuarios",
				meta: { menu: "Cadastros" , permission: "SAPEJ_USUARIO" }
			},
			{
			
				name: "Assuntos",
				path: "/assuntos",
				meta: { menu: "Cadastros", permission: "SAPEJ_ASSUNTO" }
			},
			{
				name: "Classificação",
				path: "/classificacoes",
				meta: { menu: "Cadastros" , permission: "SAPEJ_CLASSIFICACAO" }
				
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