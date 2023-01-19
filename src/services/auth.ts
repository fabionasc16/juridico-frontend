import store from "@/store";

class AuthService {
  public possuiPermissao(permissao: string): boolean {
    const user_roles = JSON.parse(localStorage.getItem("roles") || "{}");

    permissao = permissao ? permissao.toUpperCase() : "";

    for (let i = 0; i < user_roles.length; i++) {
      if (user_roles[i] == permissao) {
        return true;
      }
    }
    return false;
  }

  public possuiPermissaoMenuCadastro(): boolean {
    const user_roles = JSON.parse(localStorage.getItem("roles") || "{}");

 
    let menuCadastro = ['SAPEJ_RESPONSAVEL', 'SAPEJ_FERIADO', 'SAPEJ_ORGAO', 'SAPEJ_TIPO_PROCESSO',
    'SAPEJ_USUARIO', 'SAPEJ_ASSUNTO', 'SAPEJ_CLASSIFICACAO', 'SAPEJ_DASHBOARD', 'SAPEJ_ADMINISTRADOR'];

    for (let i = 0; i < user_roles.length; i++) {

      // menuCadastro.includes(user_roles[i])); nao funciona no IE
       if(menuCadastro.indexOf(user_roles[i]) >= 0) {
        return true;
       }
   
    }
    return false;
  }

  public userIsAdmin() {
    return this.possuiPermissao("SAPEJ_ADMINISTRADOR");
  }

  public unidadeUserLogado() {
    return localStorage.getItem("idUnidade") || "";
  }
}

export default new AuthService();