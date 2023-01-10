import axios from "axios";
import { environment } from "../../environments/environment";
import store from "@/store";

const apiUrl = environment.apiURLSSO;

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
    alert(error);
    return Promise.reject(error);
  }
);


http.interceptors.response.use(
    (response:any) => {   
      return Promise.resolve(response)      
    },
    (err:any) => {
      return Promise.reject(err) // Returns the error information returned by the interface     
   }
  )


export default http

