export type TableResponsavel = { 
  nome: string;
  cpf: string;    
};

export const FieldsTableResponsavel = 
    [   //NOMES DAS COLUNAS
        {
          key: 'botaoAction',
          label: 'Ações',
          sortable: false,
        },
        {
          key: 'nome_responsavel',
          label: 'Nome',
          sortable: true
        },
        {
          key: 'cpf_responsavel',
          label: 'CPF',
          sortable: true
        },
      ];
/*
export const TableResponsaveisSeeder: Array<TableResponsavel> = [
 
  { nome: "Heleno",  cpf: "83318572080" },
  { nome: "Viviane", cpf: "21250663008" },
  { nome: "Natacha", cpf: "02671675046" },
  { nome: "Alice",   cpf: "45865187074" },
  { nome: "Milena",  cpf: "78699410000"},
  { nome: "Fabrício",cpf: "19255181084" },
  { nome: "Davi",    cpf: "76546395037"},
  { nome: "Lara",    cpf: "25330957028"},
  { nome: "João",    cpf: "19824783067"},
  { nome: "Jéssica", cpf: "68385684034"},
  { nome: "Carlos",  cpf: "53096683069"},
  { nome: "Camila Nogueira", cpf: "81133592066" },
  { nome: "Karol",   cpf: "93220294049" },
  { nome: "Louise",  cpf: "77583398088"},
  { nome: "Sabrina", cpf: "85441053003"},
         
];*/