import { Caracteristica } from "@/type/caracteristicas"
const caracteristicas = {
    namespaced:true,
    state:{
        caracteristicas: [] as Array<Caracteristica>
    },
    getters:{
        getCaracteristicas(state: {caracteristicas: Array<Caracteristica>}){
            return state.caracteristicas
        }
    }
}
export default caracteristicas