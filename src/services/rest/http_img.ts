
import axios from "axios"
import { environment } from "../../environments/environment"
import store from "@/store"
import usuario from "@/store/usuario"
import router from '@/router'

const apiUrl = environment.apiURLImagem;

const http2 = axios.create({
    baseURL: `${apiUrl}`,
    headers: { "Content-Type": "multipart/form-data" },
});

http2.interceptors.request.use(
    (config:any) => {
      const token = store.getters['usuario/getUsuarioToken']
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }  
      return config //requisição é enviada
    },  
    (error:any) => {
      alert(error)
      return Promise.reject(error)
    }
);

http2.interceptors.response.use(
    (response:any) => {   
      return Promise.resolve(response)      
    },
    (err:any) => {
      if (err.response.status === 401) {  
        //deslogar o usuario 
        usuario.actions["usuario/deslogarUsuario"];     
        localStorage.clear(); 
        router.push({ name: 'Login' })   
      }
      return Promise.reject(err) // Returns the error information returned by the interface     
   }
)

export default http2;

