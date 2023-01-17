import store from "@/store";
import usuario from "@/store/usuario";
import axios from "axios";
import { environment } from "../../environments/environment";

async function refreshToken(myInterval?) {

    //Para refresh_token
    const apiUrl = environment.apiURL; 
    const token = store.getters["usuario/getUsuarioToken"];
    const http = axios.create({
      baseURL: `${apiUrl}`,
      headers: { "Content-Type": "application/json",  "Authorization": `Bearer ${token}` },
    });

    return new Promise((resolve, reject) => {  
      
      try {
        //const token = localStorage.getItem("token");      
        //const access_token =  token;

        const parameters = {
          method: "POST",        
        };
        const body = {      
         // access_token,       
        };
        http.post(
             "auth/refresh-token",
            body,
            parameters
          )
          .then(async (res) => {  
            //Atribuir refresh token na store e localSotrage
            localStorage.setItem("token", res.data.token.trim());             
            usuario.state.token = res.data.token.trim()    

            // Fazer algo caso seja feito o refresh token
            return resolve(res);
          })
          .catch((err) => {   
             //para não continuar rodando o setinterval com refresh token            
             window.localStorage.removeItem("refresh");    
             if(myInterval) {
              window.clearInterval(myInterval);   
             }
               
             // Fazer algo caso não seja feito o refresh token                 
             return reject(err);
          });
      } catch (err) {       
        return reject(err);
      }      
    
    });
}
//referencia https://www.zappts.com/blog/refresh-token-usando-axios-interceptors/
export default refreshToken;