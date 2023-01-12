import axios from "axios";
import { environment } from "../../environments/environment";
import store from "@/store";
import usuario from "@/store/usuario"
import router from '@/router'

const apiUrl = environment.apiURL;

const http = axios.create({
  baseURL: `${apiUrl}`,  
  headers: { "Content-Type": "application/json" },
});

http.interceptors.request.use(
  (config: any) => {
    const token = store.getters["usuario/getUsuarioToken"];
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config; //requisição é enviada
  },
  (error: any) => {  
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
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

export default http

