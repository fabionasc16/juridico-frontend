export type Classificacao = {
    texto: string;
    value: string;
};

export const ClassificacaoSeeder: Array<Classificacao> = [
    { texto: "Paciente", value: "1" },
    { texto: "Covid", value: "2" },  
    { texto: "Outros", value: "3" },    
];