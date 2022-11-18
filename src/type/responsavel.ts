export type Responsavel = { 
    id_responsavel: string;
    nome_responsavel: string;
    cpf_responsavel: string;
    telefone?: string;
    email?: string;
    registro_oab?: string;
};

export type ResponsavelCadastro = { 
    idResponsavel: string;
    nomeResponsavel: string;
    cpfResponsavel: string;
    telefone?: string;
    email?: string;
    registroOAB?: string;
};

/*export const ResponsavelSeeder: Array<Responsavel> = [
    { nome: "Heleno", idResponsavel: "1", cpf: "83318572080" },
    { nome: "Viviane", idResponsavel: "2", cpf: "21250663008" },
    { nome: "Natacha", idResponsavel: "3", cpf: "02671675046" },
    { nome: "Alice", idResponsavel: "4", cpf: "45865187074" },
    { nome: "Milena", idResponsavel: "5", cpf: "78699410000"},
    { nome: "Fabrício", idResponsavel: "6", cpf: "19255181084" },
    { nome: "Davi", idResponsavel: "7", cpf: "76546395037"},
    { nome: "Lara", idResponsavel: "8", cpf: "25330957028"},
    { nome: "João", idResponsavel: "9", cpf: "19824783067"},
    { nome: "Jéssica", idResponsavel: "10", cpf: "68385684034"},
    { nome: "Carlos", idResponsavel: "11", cpf: "53096683069"},
    { nome: "Camila Nogueira", idResponsavel: "12", cpf: "81133592066" },
    { nome: "Karol", idResponsavel: "13", cpf: "93220294049" },
    { nome: "Louise", idResponsavel: "14", cpf: "77583398088"},
    { nome: "Sabrina", idResponsavel: "15", cpf: "85441053003"},

];*/