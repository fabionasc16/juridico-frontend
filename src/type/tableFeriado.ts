/*export type TableFeriado = { 
        idFeriado?: string,
        data: string,
        descricao: string,
        tipo: string,  
};*/

import { Value } from "sass";

export const FieldsTableFeriado = 
    [   //NOMES DAS COLUNAS
        {
          key: 'botaoAction',
          label: 'Ações',
          sortable: false,
        },
        {
          key: 'data_feriado',
          label: 'Data',
          sortable: true
        },
        {
          key: 'desc_feriado',
          label: 'Descrição',
          sortable: true
        },       
        {
          key: 'tipo_feriado',
          label: 'Tipo',
          sortable: true,
          formatter: value => value == 'MOVEL' ? 'MÓVEL' : value,
        },    
        
      ];
/*
export const TableFeriadoSeeder: Array<TableFeriado> = [
 
    { data: "15/04/2022", descricao: " Sexta-feira Santa", tipo: 'nacional' },
    { data: "28/09/2022", descricao: "Carnaval", tipo: 'ponto facultativo' },
    { data: "28/10/2022", descricao: "Dia do Servidor Público", tipo: 'ponto facultativo' },
    { data: "25/12/2022", descricao: "Natal", tipo: 'nacional' },
        
];
*/