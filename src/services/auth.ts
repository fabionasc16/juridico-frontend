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

  public userIsAdmin() {
    return this.possuiPermissao("SAPEJ_ADMINISTRADOR");
  }

  public unidadeUserLogado() {
    return localStorage.getItem("idUnidade") || "";
  }
}

export default new AuthService();