export type Usuario = {
    id: string;
    unidadeUsuario: any;
    nome: string;
    dataNascimento: string;
    cpf: string;
    email: string;
    telefone: string;
    matriculaUsuario: string;
    cargoUsuario: string;
    //perfilUsuario: string;
    perfilUsuario: Array<string>;
    genero: string,
    generoOutro: string,
    cep: string,
    logradouro: string,
    numero: string,
    bairro: string,
    complemento: string,
    estadoCivil: string
  };
  