export type TableFeriado = { 
        idFeriado?: string,
        data: string,
        descricao: string,
        tipo: string,  
};

export const FieldsTableFeriado = 
    [   //NOMES DAS COLUNAS
        {
          key: 'botaoAction',
          label: 'Ações',
          sortable: false,
        },
        {
          key: 'data',
          label: 'Data',
          sortable: true
        },
        {
          key: 'descricao',
          label: 'Descrição',
          sortable: true
        },       
        {
          key: 'tipo',
          label: 'Tipo',
          sortable: true,
        },    
        
      ];

export const TableFeriadoSeeder: Array<TableFeriado> = [
 
    { data: "15/04/2022", descricao: " Sexta-feira Santa", tipo: 'nacional' },
    { data: "28/09/2022", descricao: "Carnaval", tipo: 'ponto facultativo' },
    { data: "28/10/2022", descricao: "Dia do Servidor Público", tipo: 'ponto facultativo' },
    { data: "25/12/2022", descricao: "Natal", tipo: 'nacional' },
 
   
         
];