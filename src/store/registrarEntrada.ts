//import httpClient from '../../../api/index'

const registro =  {
  
  namespaced:true,

  getters:{
      
  },
  mutations: {
    insereRegistro(payload: Array<string>){       
      /*return httpClient.post("/registrarentrada-novo", payload)
      .then(() => {
              console.log('Registro cadastrado com sucesso!')
      })
      .catch((error) => {
              console.log(error);
      });*/
      console.log(payload)

    },
    
  },
  actions:{
    insereRegistro({commit}:any, payload: Array<string>): void {
        commit('insereRegistro',payload)
    }      
  }
}
export default registro
