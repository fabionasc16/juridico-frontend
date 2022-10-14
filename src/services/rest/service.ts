import "axios";
import { environment } from "../../environments/environment";
import http3 from "./http_sipah";
import http2 from "./http_img";
import http from "./http_sso";

class RestApiService {
  private apiUrl = environment.apiURL;

  public postLogin(uri: string, data: any): Promise<any> {
    return http.post(`/${uri}`, JSON.stringify(data));
  }

  public getUnidades(uri: string, params: any): Promise<any> {
    return http.get(`/${uri}/${params}`);
  }

  public postResetPass(uri: string, data: any): Promise<any> {
    return http.post(`/${uri}`, JSON.stringify(data));
  }

  public post(uri: string, data: any): Promise<any> {
    return http.post(`/${uri}`, JSON.stringify(data));
  }

  public postParams(uri: string, params: any): Promise<any> {
    return http.post(`/${uri}/${params}`);
  }

  public get(uri: string, params: any): Promise<any> {
    return http.get(`/${uri}/${params}`);
  }

  public buscarProcessoSiged(params: any): Promise<any> {
    return http.get(`/processos/busca-processo?numero_processo=${params}`);
  }   
  
  public getCpf(uri: string, params: any): Promise<any> {
    return http.get(`/${uri}/cpf/query?cpf_usuario=${params}`);
  }

  public getFeatures(uri: string): Promise<any> {
    return http.get(`/${uri}`);
  } 

  public update(uri: string, data: any): Promise<any> {
    return http.put(`/${uri}/${data.id}`, JSON.stringify(data));
  }

  public upload(uri: string, data: any): Promise<any> {
    return http.put(`/${uri}/${data.id}`);
  }

  public salvar(uri: string, data: any, acao: string, id?:any): Promise<any> {
    if (acao == "post") return http.post(`/${uri}`, JSON.stringify(data));
    
    else if(acao == "put" && id)
       return http.put(`/${uri}/${id}`, JSON.stringify(data));//quando o id vem do back com outro nome

    else return http.put(`/${uri}/${data.id}`, JSON.stringify(data));
  }

  public delete(uri: string, id: string): Promise<any> {
    return http.delete(`/${uri}/${id}`);
  }

  public put(uri: string, data: any): Promise<any> {
    return http.put(`/${uri}/${data}`);
  }

  public put_json(uri: string, id: string, data: any): Promise<any> {   
    return http.put(`/${uri}/${id}`, JSON.stringify(data));
  }

  public postUpload(uri: string, data: any): Promise<any> {
    return http2.post(`/${uri}`, data);
  }

  public getUrlFoto(id: any): string {
    return `${this.apiUrl}/paciente/openimage/${id}`;
  }
}

export default new RestApiService();
