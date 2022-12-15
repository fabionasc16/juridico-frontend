import RestApiService from "@/services/rest/service";

const usuario = {
  namespaced: true,
  state: {
    _id: "" as string,
    cpf: "" as string,
    nome: "" as string,
    unidade: "" as string,
    idUnidade: "" as string,
    token: "" as string,
    roles: [] as Array<String>,
  },
  mutations: {
    ATRIBUIR_ID(state: any, Payload: string) {
      state._id = Payload;
    },
    ATRIBUIR_CPF(state: any, Payload: string) {
      state.cpf = Payload;
    },
    ATRIBUIR_NOME(state: any, Payload: string) {
      state.nome = Payload;
    },
    ATRIBUIR_UNIDADE(state: any, Payload: string) {
      state.unidade = Payload;
    },
    ATRIBUIR_ID_UNIDADE(state: any, Payload: string) {
      state.idUnidade = Payload;
    },
    ATRIBUIR_TOKEN(state: any, Payload: string) {
      state.token = Payload;
    },
    ATRIBUIR_ROLES(state: any, Payload: string) {
      state.roles = Payload;
    },
    DESLOGAR_USUARIO(state: any) {
      (state._id = ""),
        (state.cpf = ""),
        (state.nome = ""),
        (state.unidade = ""),
        (state.idUnidade = ""),
        (state.token = ""),
        (state.roles = []),
        window.localStorage.removeItem("_id"),
        window.localStorage.removeItem("cpf"),
        window.localStorage.removeItem("nome"),
        window.localStorage.removeItem("unidade"),
        window.localStorage.removeItem("idUnidade"),
        window.localStorage.removeItem("token"),
        window.localStorage.removeItem("roles");
    },
  },
  actions: {
    deslogarUsuario({ commit }: any) {
      commit("DESLOGAR_USUARIO");
    },
    efetuarLogin({ dispatch }: any, Payload: any) {
      return new Promise((resolve, reject) => {
        RestApiService.postLogin("auth", Payload)
          .then((response) => {
            dispatch("atribuirToken", response.data.user.access_token); //CHAMA OUTRA ACTION
            dispatch("atribuirId", response.data.user.user_id);
            dispatch("atribuirNome", response.data.user.user_name);
            dispatch("atribuirCpf", response.data.user.user_cpf);
            dispatch("atribuirUnidade", response.data.user.user_unit);
            dispatch("atribuirIdUnidade", response.data.user.user_unit_id);
            dispatch("atribuirRoles", response.data.user.roles);
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    atribuirToken({ commit }: any, Payload: string) {
      window.localStorage.setItem("token", Payload);
      commit("ATRIBUIR_TOKEN", Payload);
    },
    atribuirId({ commit }: any, Payload: string) {
      window.localStorage.setItem("_id", Payload);
      commit("ATRIBUIR_ID", Payload);
    },
    atribuirNome({ commit }: any, Payload: string) {
      window.localStorage.setItem("nome", Payload);
      commit("ATRIBUIR_NOME", Payload);
    },
    atribuirCpf({ commit }: any, Payload: string) {
      window.localStorage.setItem("cpf", Payload);
      commit("ATRIBUIR_CPF", Payload);
    },
    atribuirUnidade({ commit }: any, Payload: string) {
      window.localStorage.setItem("unidade", Payload);
      commit("ATRIBUIR_UNIDADE", Payload);
    },
    atribuirIdUnidade({ commit }: any, Payload: string) {
      window.localStorage.setItem("idUnidade", Payload);
      commit("ATRIBUIR_ID_UNIDADE", Payload);
    },
    atribuirRoles({ commit }: any, Payload: string) {
      window.localStorage.setItem("roles", JSON.stringify(Payload));
      commit("ATRIBUIR_ROLES", Payload);
    },
  },
  getters: {
    getUsuarioID(state: any) {
      return state._id;
    },
    getUsuarioCpf(state: any) {
      return state.cpf;
    },
    getUsuarioNome(state: any) {
      return state.nome;
    },
    getUsuarioUnidade(state: any) {
      return state.unidade;
    },
    getUsuarioIdUnidade(state: any) {
      return state.idUnidade;
    },
    getUsuarioToken(state: any) {
      return state.token;
    },
    getUsuarioRoles(state: any) {
      return state.roles;
    },
  },
};
export default usuario;

