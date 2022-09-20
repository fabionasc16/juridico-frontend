export type Classificacao = {
    texto: string;
    value: string;
};

export const ClassificacaoSeeder: Array<Classificacao> = [
    { texto: "Normal", value: "1" },
    { texto: "Próximo à expiração", value: "2" },
    { texto: "Expirado", value: "3" },   
];